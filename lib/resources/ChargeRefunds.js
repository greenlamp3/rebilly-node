'use strict';

var RebillyResource = require('../RebillyResource');

/**
 * ChargeRefunds is a unique resource in that, upon instantiation,
 * requires a chargeId, and therefore each of its methods only
 * require the refundId argument.
 *
 * This streamlines the API specifically for the case of accessing refunds
 * on a returned charge object.
 *
 * E.g. chargeObject.refunds.retrieve(refundId)
 * (As opposed to the also-supported rebilly.charges.retrieveRefund(chargeId,
 * refundId))
 */
module.exports = RebillyResource.extend({
  path: 'charges/{chargeId}/refunds',
  includeBasic: ['create', 'list', 'retrieve', 'update']
});
