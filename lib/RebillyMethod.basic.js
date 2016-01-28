'use strict';

var rebillyMethod = require('./RebillyMethod');
var utils = require('./utils');

module.exports = {

  create: rebillyMethod({
    method: 'POST'
  }),

  list: rebillyMethod({
    method: 'GET',
    urlParams: ['optional!limit', 'optional!filter']
  }),

  retrieve: rebillyMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id']
  }),

  update: rebillyMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  // Avoid 'delete' keyword in JS
  del: rebillyMethod({
    method: 'DELETE',
    path: '{id}',
    urlParams: ['id']
  }),

  setMetadata: function(id, key, value, auth, cb) {

    var self = this;
    var data = key;
    var isObject = utils.isObject(key);
    // We assume null for an empty object
    var isNull = data === null || (isObject && !Object.keys(data).length);

    // Allow optional passing of auth & cb:
    if ((isNull || isObject) && typeof value == 'string') auth = value;
    else if (typeof auth != 'string') {
      if (!cb && typeof auth == 'function') {
        cb = auth;
      }
      auth = null;
    }

    var urlData = this.createUrlData();
    var deferred = this.createDeferred(cb);
    var path = this.createFullPath('/' + id, urlData);

    if (isNull) {
      // Reset metadata:
      sendMetadata(null, auth);
    } else if (!isObject) {
      // Set individual metadata property:
      var metadata = {};
      metadata[key] = value;
      sendMetadata(metadata, auth);
    } else {
      // Set entire metadata object after resetting it:
      this._request('POST', path, {
        metadata: null
      }, auth, {}, function(err, response) {
        if (err) return deferred.reject(err);
        sendMetadata(data, auth);
      });
    }

    function sendMetadata(metadata, auth) {
      self._request('POST', path, {
        metadata: metadata
      }, auth, {}, function(err, response) {
        if (err) deferred.reject(err);
        else deferred.resolve(response.metadata);
      });
    }

    return deferred.promise;

  },

  getMetadata: function(id, auth, cb) {

    if (!cb && typeof auth == 'function') {
      cb = auth;
      auth = null;
    }

    var urlData = this.createUrlData();
    var deferred = this.createDeferred(cb);
    var path = this.createFullPath('/' + id, urlData);

    this._request('GET', path, {}, auth, {}, function(err, response) {
      if (err) deferred.reject(err);
      else deferred.resolve(
        response.metadata
      );
    });

    return deferred.promise;

  }

};
