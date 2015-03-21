'use strict';

var RebillyResource = require('../RebillyResource');
var rebillyMethod = RebillyResource.method;

module.exports = RebillyResource.extend({

  path: 'charges',

  includeBasic: [
    'create', 'list', 'retrieve', 'update',
    'setMetadata', 'getMetadata'
  ],

  capture: rebillyMethod({
    method: 'POST',
    path: '/{id}/capture',
    urlParams: ['id']
  }),

  refund: rebillyMethod({
    method: 'POST',
    path: '/{id}/refund',
    urlParams: ['id']
  }),

  updateDispute: rebillyMethod({
    method: 'POST',
    path: '/{id}/dispute',
    urlParams: ['id']
  }),

  closeDispute: rebillyMethod({
    method: 'POST',
    path: '/{id}/dispute/close',
    urlParams: ['id']
  }),


  /**
   * Charge: Refund methods
   */
  createRefund: rebillyMethod({
    method: 'POST',
    path: '/{chargeId}/refunds',
    urlParams: ['chargeId']
  }),

  listRefunds: rebillyMethod({
    method: 'GET',
    path: '/{chargeId}/refunds',
    urlParams: ['chargeId']
  }),

  retrieveRefund: rebillyMethod({
    method: 'GET',
    path: '/{chargeId}/refunds/{refundId}',
    urlParams: ['chargeId', 'refundId']
  }),

  updateRefund: rebillyMethod({
    method: 'POST',
    path: '/{chargeId}/refunds/{refundId}',
    urlParams: ['chargeId', 'refundId']
  }),

  markAsSafe: function(chargeId) {
    return this.update(chargeId, {'fraud_details': {'user_report': 'safe'}})
  },

  markAsFraudulent: function(chargeId) {
    return this.update(chargeId, {'fraud_details': {'user_report': 'fraudulent'}})
  }
});
