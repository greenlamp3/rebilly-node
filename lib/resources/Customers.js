'use strict';

var RebillyResource = require('../RebillyResource');
var utils = require('../utils');
var rebillyMethod = RebillyResource.method;

module.exports = RebillyResource.extend({

  path: 'customers',
  includeBasic: [
    'create', 'list', 'retrieve', 'update',
    'setMetadata', 'getMetadata'
  ],

  /**
   * Customer: Subscription methods
   */

  _legacyCancelSubscription: rebillyMethod({
    method: 'POST',
    path: '{customerId}/subscription',
    urlParams: ['customerId']
  }),

  _newstyleCancelSubscription: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/subscriptions/{subscriptionId}',
    urlParams: ['customerId', 'subscriptionId']
  }),

  createSubscription: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/subscriptions',
    urlParams: ['customerId']
  }),

  listSubscriptions: rebillyMethod({
    method: 'GET',
    path: '/{customerId}/subscriptions',
    urlParams: ['customerId']
  }),

  retrieveSubscription: rebillyMethod({
    method: 'GET',
    path: '/{customerId}/subscriptions/{subscriptionId}',
    urlParams: ['customerId', 'subscriptionId']
  }),

  updateSubscription: rebillyMethod({
    method: 'PUT',
    path: '/{customerId}/subscriptions/{subscriptionId}',
    urlParams: ['customerId', 'subscriptionId']
  }),

  switchSubscription: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/subscriptions/{subscriptionId}/switch',
    urlParams: ['customerId', 'subscriptionId']
  }),

  cancelSubscription: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/subscriptions/{subscriptionId}/cancel',
    urlParams: ['customerId', 'subscriptionId']
  }),

  /**
   * Customer: Card methods
   */

  createCard: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/payment-cards',
    urlParams: ['customerId']
  }),

  createCardWithID: rebillyMethod({
    method: 'PUT',
    path: '/{customerId}/payment-cards/{cardId}',
    urlParams: ['customerId', 'cardId']
  }),

  listCards: rebillyMethod({
    method: 'GET',
    path: '/{customerId}/payment-cards',
    urlParams: ['customerId']
  }),

  retrieveCard: rebillyMethod({
    method: 'GET',
    path: '/{customerId}/payment-cards/{cardId}',
    urlParams: ['customerId', 'cardId']
  }),

  updateCard: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/payment-cards/{cardId}',
    urlParams: ['customerId', 'cardId']
  }),

  deleteCard: rebillyMethod({
    method: 'DELETE',
    path: '/{customerId}/payment-cards/{cardId}',
    urlParams: ['customerId', 'cardId']
  }),

  authorizeCard: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/payment-cards/{cardId}/authorization',
    urlParams: ['customerId', 'cardId']
  }),

  deactivateCard: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/payment-cards/{cardId}/deactivation',
    urlParams: ['customerId', 'cardId']
  }),

  /**
   * Customer: Source methods
   */

  createSource: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/sources',
    urlParams: ['customerId']
  }),

  listSources: rebillyMethod({
    method: 'GET',
    path: '/{customerId}/sources',
    urlParams: ['customerId']
  }),

  retrieveSource: rebillyMethod({
    method: 'GET',
    path: '/{customerId}/sources/{sourceId}',
    urlParams: ['customerId', 'sourceId']
  }),

  updateSource: rebillyMethod({
    method: 'POST',
    path: '/{customerId}/sources/{sourceId}',
    urlParams: ['customerId', 'sourceId']
  }),

  deleteSource: rebillyMethod({
    method: 'DELETE',
    path: '/{customerId}/sources/{sourceId}',
    urlParams: ['customerId', 'sourceId']
  }),

  /**
   * Customer: Discount methods
   */

  deleteDiscount: rebillyMethod({
    method: 'DELETE',
    path: '/{customerId}/discount',
    urlParams: ['customerId']
  }),

  deleteSubscriptionDiscount: rebillyMethod({
    method: 'DELETE',
    path: '/{customerId}/subscriptions/{subscriptionId}/discount',
    urlParams: ['customerId', 'subscriptionId']
  })

});
