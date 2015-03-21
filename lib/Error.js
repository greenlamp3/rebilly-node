'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by rebilly
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Rebilly's REST API)
 */
var RebillyError = _Error.RebillyError = _Error.extend({
  type: 'RebillyError',
  populate: function(raw) {

    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;
              
    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;

  }
});

/**
 * Helper factory which takes raw rebilly errors and outputs wrapping instances
 */
RebillyError.generate = function(rawRebillyError) {
  
  switch (rawRebillyError.type) {
    case 'card_error':
      return new _Error.RebillyCardError(rawRebillyError);
    case 'invalid_request_error':
      return new _Error.RebillyInvalidRequestError(rawRebillyError);
    case 'api_error':
      return new _Error.RebillyAPIError(rawRebillyError);
  }
  return new _Error(rawRebillyError.error, rawRebillyError.details.join(', '));
};

// Specific Rebilly Error types:
_Error.RebillyCardError = RebillyError.extend({ type: 'RebillyCardError' });
_Error.RebillyInvalidRequestError = RebillyError.extend({ type: 'RebillyInvalidRequest' });
_Error.RebillyAPIError = RebillyError.extend({ type: 'RebillyAPIError' });
_Error.RebillyAuthenticationError = RebillyError.extend({ type: 'RebillyAuthenticationError' });
_Error.RebillyConnectionError = RebillyError.extend({ type: 'RebillyConnectionError' });
