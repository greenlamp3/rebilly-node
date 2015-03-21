'use strict';

var http = require('http');
var https = require('https');
var path = require('path');
var Promise = require('bluebird');
var _ = require('lodash');

var utils = require('./utils');
var Error = require('./Error');

var hasOwn = {}.hasOwnProperty;

var BLACKLISTED_FINGERPRINTS = require('fs').readFileSync(
  path.join(__dirname, '../data/blacklisted_fingerprints'), 'utf8'
).replace(/^\s+|\s+$/g, '').split('\n');

// Provide extension mechanism for Rebilly Resource Sub-Classes
RebillyResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
RebillyResource.method = require('./RebillyMethod');
RebillyResource.BASIC_METHODS = require('./RebillyMethod.basic');

/**
 * Encapsulates request logic for a Rebilly Resource
 */
function RebillyResource(rebilly, urlData) {

  this._rebilly = rebilly;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(rebilly.getApiField('basePath'));
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = RebillyResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);

}

RebillyResource.prototype = {

  path: '',

  initialize: function() {},

  // Function to override the default data processor. This allows full control
  // over how a RebillyResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,

  // String that overrides the base API endpoint. If `overrideHost` is not null
  // then all requests for a particular resource will be sent to a base API
  // endpoint as defined by `overrideHost`.
  overrideHost: null,

  createFullPath: function(commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function() {
    var urlData = {};
    // Merge in baseData
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }
    return urlData;
  },

  createDeferred: function(callback) {
      var deferred = Promise.defer();

      if (callback) {
        // Callback, if provided, is a simply translated to Promise'esque:
        // (Ensure callback is called outside of promise stack)
        deferred.promise.then(function(res) {
          setTimeout(function(){ callback(null, res) }, 0);
        }, function(err) {
          setTimeout(function(){ callback(err, null); }, 0);
        });
      }

      return deferred;
  },

  _timeoutHandler: function(timeout, req, callback) {
    var self = this;
    return function() {
      var timeoutErr = new Error('ETIMEDOUT');
      timeoutErr.code = 'ETIMEDOUT';

      req._isAborted = true;
      req.abort();

      callback.call(
        self,
        new Error.RebillyConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    }
  },

  _responseHandler: function(req, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        try {
          // console.log('response:' + JSON.stringify(response));
          if(response){
            response = JSON.parse(response);
            // console.log('response:' + JSON.stringify(response));
            if (response && response.error) {
              var err;
              if (res.statusCode === 401) {
                err = new Error.RebillyAuthenticationError(response.error);
              } else {
                err = Error.RebillyError.generate(response);
              }
              return callback.call(self, err, null);
            }
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.RebillyAPIError({
              message: 'Invalid JSON received from the Rebilly API',
              response: response,
              exception: e
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function(req, callback) {
    var self = this;
    return function(error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new Error.RebillyConnectionError({
          message: 'An error occurred with our connection to Rebilly',
          detail: error
        }),
        null
      );
    }
  },

  _request: function(method, path, data, auth, options, callback) {
    var requestData = JSON.stringify(data || {});
    var self = this;
    var requestData;

    // console.log('self.requestDataProcessor:' + JSON.stringify(self.requestDataProcessor));
    // console.log('data:' + JSON.stringify(data));

    if (self.requestDataProcessor) {
      requestData = self.requestDataProcessor(method, data, options.headers);
    } else {
      requestData = JSON.stringify(data || {});
    }

    var apiVersion = this._rebilly.getApiField('version');

    var headers = {
      // Use specified auth token:
      'REB-APIKEY': this._rebilly.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': requestData.length,
      'User-Agent': 'Rebilly NodeBindings/' + this._rebilly.getConstant('PACKAGE_VERSION')
    };

    // console.log('headers:' + JSON.stringify(headers));

    if (apiVersion) {
      headers['Rebilly-Version'] = apiVersion;
    }

    // Grab client-user-agent before making the request:
    this._rebilly.getClientUserAgent(function(cua) {
      headers['X-Rebilly-Client-User-Agent'] = cua;

      if (options.headers) {
        headers = _.extend(headers, options.headers);
      }

      makeRequest();
    });


    function makeRequest() {

      var timeout = self._rebilly.getApiField('timeout');
      var isInsecureConnection = self._rebilly.getApiField('protocol') == 'http';

      var host = self.overrideHost || self._rebilly.getApiField('host');

      var req = (
        isInsecureConnection ? http : https
      ).request({
        host: host,
        port: self._rebilly.getApiField('port'),
        path: path,
        method: method,
        agent: self._rebilly.getApiField('agent'),
        headers: headers,
        ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5"
      });

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      // req.on('error', self._errorHandler(req, callback));
      req.on('error', function(e){
        console.log('ERROR');
        console.log(e);
      })

      req.on('socket', function(socket) {
        socket.on((isInsecureConnection ? 'connect' : 'secureConnect'), function() {
          if (!isInsecureConnection &&
            BLACKLISTED_FINGERPRINTS.indexOf(socket.getPeerCertificate().fingerprint) > -1) {

            req.abort();
            return callback.call(self,
              new Error.RebillyError({
                message: 'Revoked SSL Certificate',
                detail: 'Invalid server certificate. You tried to connect to a server that has a revoked SSL certificate, which means we cannot securely send data to that server.'
              })
            );
          }
          // Send payload; we're safe:
          // console.log('requestData:' + JSON.stringify(requestData));
          req.write(requestData);
          req.end();
        });
      });

    }

  }

};

module.exports = RebillyResource;
