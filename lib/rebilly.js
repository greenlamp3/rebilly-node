'use strict';

Rebilly.DEFAULT_HOST = 'api-sandbox.rebilly.com';
Rebilly.DEFAULT_PORT = '443';
Rebilly.DEFAULT_BASE_PATH = '/v2.1/';
Rebilly.DEFAULT_API_VERSION = null;

// Use node's default timeout:
Rebilly.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Rebilly.PACKAGE_VERSION = require('../package.json').version;

Rebilly.USER_AGENT = {
  bindings_version: Rebilly.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'rebilly',
  uname: null
};

Rebilly.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {

  Charges: require('./resources/Charges'),
  Contacts: require('./resources/Contacts'),
  Customers: require('./resources/Customers'),
  Plans: require('./resources/Plans'),
  Tokens: require('./resources/Tokens'),
  Invoices: require('./resources/Invoices'),
  Payments: require('./resources/Payments'),
  Layouts: require('./resources/Layouts'),

  // The following rely on pre-filled IDs:
  CustomerCards: require('./resources/CustomerCards'),
  CustomerSubscriptions: require('./resources/CustomerSubscriptions'),
  ChargeRefunds: require('./resources/ChargeRefunds'),
  CustomerInvoices: require('./resources/CustomerInvoices'),

  // https://www.rebilly.com/sandbox/api/documentation/v2.1/#introduction-Authentication
  Signature: require('./resources/Signature')

};

Rebilly.RebillyResource = require('./RebillyResource');
Rebilly.resources = resources;

Rebilly.ENV_SANDBOX = 'sandbox';
Rebilly.ENV_LIVE = 'live';

Rebilly.endpoints = {};
Rebilly.endpoints[Rebilly.ENV_SANDBOX] = 'api-sandbox.rebilly.com';
Rebilly.endpoints[Rebilly.ENV_LIVE] = 'api.rebilly.com';

function Rebilly(key, version) {

  if (!(this instanceof Rebilly)) {
    return new Rebilly(key, version);
  }

  this._api = {
    auth: null,
    host: Rebilly.DEFAULT_HOST,
    port: Rebilly.DEFAULT_PORT,
    basePath: Rebilly.DEFAULT_BASE_PATH,
    version: Rebilly.DEFAULT_API_VERSION,
    timeout: Rebilly.DEFAULT_TIMEOUT,
    agent: null,
    dev: false
  };

  this._prepResources();
  this.setApiKey(key);
  this.setApiVersion(version);
}

Rebilly.prototype = {

  setHost: function(host, port, protocol) {
    this._setApiField('host', host);
    if (port) this.setPort(port);
    if (protocol) this.setProtocol(protocol);
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        key
      );
    }
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Rebilly.DEFAULT_TIMEOUT : timeout
    );
  },

  setHttpAgent: function(agent) {
    this._setApiField('agent', agent);
  },

  setEnvironment: function(env){
    this._setApiField('host', Rebilly.endpoints[env]);
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return Rebilly[c];
  },

  getClientUserAgent: function(cb) {
    if (Rebilly.USER_AGENT_SERIALIZED) {
      return cb(Rebilly.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function(err, uname) {
      Rebilly.USER_AGENT.uname = uname || 'UNKNOWN';
      Rebilly.USER_AGENT_SERIALIZED = JSON.stringify(Rebilly.USER_AGENT);
      cb(Rebilly.USER_AGENT_SERIALIZED);
    });
  },

  _prepResources: function() {

    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }

  }

};

module.exports = Rebilly;
