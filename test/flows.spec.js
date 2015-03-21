'use strict';

var testUtils = require('./testUtils');
var chai = require('chai');
var Promise = require('bluebird');
var rebilly = require('../lib/rebilly')(
  testUtils.getUserRebillyKey(),
  'latest'
);
var config = require('./local');

var expect = chai.expect;

var CUSTOMER_DETAILS = {
  email: 'email' + '_' + new Date().getTime() + '@company.com'
};
var CARD_DETAILS = {
  pan: '4242424242424242',
  expYear: '2015',
  expMonth: '12',
  cvv: '123',
  billingContact: '1'
}

var CURRENCY = 'USD';

describe('Flows', function() {

  var cleanup = new testUtils.CleanupUtility();
  this.timeout(30000);

  describe('Plan+Subscription flow', function() {

    it('Allows me to: Create a plan and subscribe a customer to it', function() {

      var plan = null;
      var customer = null;

      return expect(
        Promise.join(
          rebilly.contacts.create({
            firstName: 'first',
            lastName: 'last'
          }),
          rebilly.customers.create(CUSTOMER_DETAILS),
          rebilly.plans.create({
            name: 'plan' + +new Date,
            currency: CURRENCY,
            recurringAmount: 1,
            recurringPeriodUnit: 'day',
            recurringPeriodLength: 1
          })
        ).then(function(j) {

          var contact = j[0];
          customer = j[1];
          plan = j[2];

          CARD_DETAILS.billingContact = contact.id;
          return rebilly.customers.createCard(customer.id, CARD_DETAILS);  

        }).then(function(card) {

          return rebilly.customers.update(customer.id, {
            defaultCard: card.id
          });

        }).then(function(customer) {

          // cleanup.deleteCustomer(customer.id);
          // cleanup.deletePlan(plan.id);

          return rebilly.customers.createSubscription(customer.id, {
            plan: plan.id,
            website: config.website
          });

        })
      ).to.eventually.have.property('status', 'Active');

    });

    it('Allows me to: Create a plan and subscribe a customer to it, and update subscription (multi-subs API)', function() {
      
      var plan = null;
      var customer = null;

      return expect(
        Promise.join(
          rebilly.contacts.create({
            firstName: 'first',
            lastName: 'last'
          }),
          rebilly.customers.create(CUSTOMER_DETAILS),
          rebilly.plans.create({
            name: 'plan' + +new Date,
            currency: CURRENCY,
            recurringAmount: 1,
            recurringPeriodUnit: 'day',
            recurringPeriodLength: 1
          })
        ).then(function(j) {

          var contact = j[0];
          customer = j[1];
          plan = j[2];

          CARD_DETAILS.billingContact = contact.id;
          return rebilly.customers.createCard(customer.id, CARD_DETAILS);  

        }).then(function(card) {

          return rebilly.customers.update(customer.id, {
            defaultCard: card.id
          });

        }).then(function(customer) {

          // cleanup.deleteCustomer(customer.id);
          // cleanup.deletePlan(plan.id);

          return rebilly.customers.createSubscription(customer.id, {
            plan: plan.id,
            website: config.website
          });

        }).then(function(subscription) {
          return rebilly.customers.updateSubscription(customer.id, subscription.id, {
            plan: plan.id, quantity: 3
          });
        }).then(function(subscription) {
          return [subscription.status, subscription.quantity];
        })
      ).to.eventually.deep.equal(['Active', 3]);

    });

    it('Errors when I attempt to subscribe a customer to a non-existent plan', function() {

      return expect(
        rebilly.customers.create(CUSTOMER_DETAILS)
          .then(function(customer) {

            // cleanup.deleteCustomer(customer.id);

            return rebilly.customers.updateSubscription(customer.id, 'someNonExistentSubscription' + +new Date, {
              plan: 'someNonExistentPlan' + +new Date
            }).then(null, function(err) {
              // Resolve with the error so we can inspect it below
              return err;
            });

          })
      ).to.eventually.satisfy(function(err) {
        return err.type === 'RebillyAPIError' &&
          err.raw.response.status === 404;
      });

    });

    it('Allows me to: subscribe then cancel with `AT_NEXT_REBILL` defined', function() {

      var plan = null;
      var customer = null;

      return expect(
        Promise.join(
          rebilly.contacts.create({
            firstName: 'first',
            lastName: 'last'
          }),
          rebilly.customers.create(CUSTOMER_DETAILS),
          rebilly.plans.create({
            name: 'plan' + +new Date,
            currency: CURRENCY,
            recurringAmount: 1,
            recurringPeriodUnit: 'day',
            recurringPeriodLength: 1
          })
        ).then(function(j) {

          var contact = j[0];
          customer = j[1];
          plan = j[2];

          // cleanup.deleteCustomer(customer.id);
          // cleanup.deletePlan(plan.id);

          CARD_DETAILS.billingContact = contact.id;
          return rebilly.customers.createCard(customer.id, CARD_DETAILS);  

        }).then(function(card) {

          return rebilly.customers.update(customer.id, {
            defaultCard: card.id
          });

        }).then(function(customer) {

          return rebilly.customers.createSubscription(customer.id, {
            plan: plan.id,
            website: config.website
          });

        }).then(function(subscription) {
          return rebilly.customers.cancelSubscription(customer.id, subscription.id, {
            policy: 'NOW_WITHOUT_REFUND'
          });
        })
      ).to.eventually.have.property('status', 'Cancelled');

    });

    describe('Plan name variations', function() {
      [
        '34535355453' + +new Date,
        'TEST239291' + +new Date,
        'TEST_a-i' + +new Date,
        'foobarbazteston###etwothree' + +new Date
      ].forEach(function(planName) {
        it('Allows me to create and retrieve plan with name: ' + planName, function() {
          return expect(
            rebilly.plans.create({
              name: planName,
              currency: CURRENCY,
              recurringAmount: 1,
              recurringPeriodUnit: 'day',
              recurringPeriodLength: 1
            }).then(function(plan) {
              cleanup.deletePlan(plan.id);
              return rebilly.plans.retrieve(plan.id);
            })
          ).to.eventually.have.property('name', planName);
        });
      });
    });

  });

});
