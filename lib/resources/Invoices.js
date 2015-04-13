'use strict';

var RebillyResource = require('../RebillyResource');
var rebillyMethod = RebillyResource.method;

module.exports = require('../RebillyResource').extend({
  path: 'invoices',
  includeBasic: ['create', 'retrieve', 'update'],

  modify: rebillyMethod({
    method: 'PUT',
    path: '/{invoiceId}',
    urlParams: ['invoiceId']
  }),

  void: rebillyMethod({
    method: 'POST',
    path: '/{invoiceId}/void',
    urlParams: ['invoiceId']
  }),

  abandon: rebillyMethod({
    method: 'POST',
    path: '/{invoiceId}/abandon',
    urlParams: ['invoiceId']
  }),

  issue: rebillyMethod({
    method: 'POST',
    path: '/{invoiceId}/issue',
    urlParams: ['invoiceId']
  }),

  createItem: rebillyMethod({
    method: 'POST',
    path: '/{invoiceId}/items',
    urlParams: ['invoiceId']
  }),

  retrieveItems: rebillyMethod({
    method: 'GET',
    path: '/{invoiceId}/items',
    urlParams: ['invoiceId']
  })


});

