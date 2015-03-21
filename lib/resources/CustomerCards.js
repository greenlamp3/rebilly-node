'use strict';

var RebillyResource = require('../RebillyResource');

/**
 * CustomerCard is a unique resource in that, upon instantiation,
 * requires a customerId, and therefore each of its methods only
 * require the cardId argument.
 *
 * This streamlines the API specifically for the case of accessing cards
 * on a returned customer object.
 *
 * E.g. customerObject.cards.retrieve(cardId)
 * (As opposed to the also-supported rebilly.customers.retrieveCard(custId, cardId))
 */
module.exports = RebillyResource.extend({
  path: 'customers/{customerId}/payment-cards',
  includeBasic: ['create', 'list', 'retrieve', 'update', 'del']
});
