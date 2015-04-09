'use strict';

var RebillyResource = require('../RebillyResource');

/**
 * CustomerInvoice
 */
module.exports = RebillyResource.extend({
  path: 'customers/{customerId}/invoices',
  includeBasic: ['list']
});
