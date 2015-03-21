'use strict';

var rebilly = require('../testUtils').getSpyableRebilly();
var expect = require('chai').expect;
var Promise = require('bluebird');

var config = require('./../local');
var TEST_AUTH_KEY = config.apiKey;

describe('Customers Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      rebilly.customers.retrieve('cus_2dkAb792h1mfa4');
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v2.1/customers/cus_2dkAb792h1mfa4',
        headers: {},
        data: {}
      });

    });

  });

  describe('create', function() {

    it('Sends the correct request', function() {

      var email = 'email' + '_' + new Date().getTime() + '@company.com';
      rebilly.customers.create({ email:  email });
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v2.1/customers',
        headers: {},
        data: { email: email }
      });

    });

  });

  describe('update', function() {

    it('Sends the correct request', function() {

      var email = 'email' + '_' + new Date().getTime() + '@company.com';

      rebilly.customers.update('cus_2dkAb792h1mfa4', {
        email: email
      });
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'PUT',
        url: '/v2.1/customers/cus_2dkAb792h1mfa4',
        headers: {},
        data: { email: email }
      });

    });

  });

  // describe('del', function() {

  //   it('Sends the correct request', function() {

  //     rebilly.customers.del('cus_2dkAb792h1mfa4');
  //     expect(rebilly.LAST_REQUEST).to.deep.equal({
  //       method: 'DELETE',
  //       url: '/v2.1/customers/cus_2dkAb792h1mfa4',
  //       headers: {},
  //       data: {}
  //     });

  //   });

  // });

  describe('list', function() {

    it('Sends the correct request', function() {

      rebilly.customers.list();
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v2.1/customers',
        headers: {},
        data: {}
      });

    });

  });

  describe('Subscription methods', function() {

    describe('updateSubscription', function() {

      it('Sends the correct request', function() {

        rebilly.customers.updateSubscription('customerIdFoo321', 'subscriptionIdFoo987', {
          plan: 'fooPlan'
        });
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'PUT',
          url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo987',
          headers: {},
          data: { plan: 'fooPlan' }
        });

      });

    });

    describe('cancelSubscription', function() {

      it('Sends the correct request', function() {

        rebilly.customers.cancelSubscription('customerIdFoo321', 'subscriptionIdFoo987');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo987/cancel',
          headers: {},
          data: { }
        });

      });

      describe('With policy defined', function() {
        it('Sends the correct request', function() {

          rebilly.customers.cancelSubscription('customerIdFoo321', 'subscriptionIdFoo987', {policy: 'AT_NEXT_REBILL'});
          expect(rebilly.LAST_REQUEST).to.deep.equal({
            method: 'POST',
            url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo987/cancel',
            headers: {},
            data: { policy: 'AT_NEXT_REBILL' }
          });

        });
      });

    });

  });

  describe('Card methods', function() {

    describe('retrieveCard', function() {

      it('Sends the correct request', function() {

        rebilly.customers.retrieveCard('customerIdFoo321', 'cardIdFoo456');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/v2.1/customers/customerIdFoo321/payment-cards/cardIdFoo456',
          headers: {},
          data: {}
        });

      });

    });

    describe('createCard', function() {

      it('Sends the correct request', function() {

        rebilly.customers.createCard('customerIdFoo321', {
          number: '123456', exp_month: '12'
        });
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/v2.1/customers/customerIdFoo321/payment-cards',
          headers: {},
          data: { number: '123456', exp_month: '12' }
        });

      });

    });

    describe('updateCard', function() {

      it('Sends the correct request', function() {

        rebilly.customers.updateCard('customerIdFoo321', 'cardIdFoo456', {
          name: 'Bob M. Baz'
        });
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/v2.1/customers/customerIdFoo321/payment-cards/cardIdFoo456',
          headers: {},
          data: { name: 'Bob M. Baz' }
        });

      });

    });

    describe('deleteCard', function() {

      it('Sends the correct request', function() {

        rebilly.customers.deleteCard('customerIdFoo321', 'cardIdFoo456');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'DELETE',
          url: '/v2.1/customers/customerIdFoo321/payment-cards/cardIdFoo456',
          headers: {},
          data: {}
        });

      });

    });

    describe('listCards', function() {

      it('Sends the correct request', function() {

        rebilly.customers.listCards('customerIdFoo321');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/v2.1/customers/customerIdFoo321/payment-cards',
          headers: {},
          data: {}
        });

      });

    });

  });

  describe('Subscription methods', function() {

    describe('retrieveSubscription', function() {

      it('Sends the correct request', function() {

        rebilly.customers.retrieveSubscription('customerIdFoo321', 'subscriptionIdFoo456');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo456',
          headers: {},
          data: {}
        });

      });

    });

    describe('createSubscription', function() {

      it('Sends the correct request', function() {

        rebilly.customers.createSubscription('customerIdFoo321', {
          plan: 'gold', quantity: '12'
        });
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/v2.1/customers/customerIdFoo321/subscriptions',
          headers: {},
          data: { plan: 'gold', quantity: '12' }
        });

      });

    });

    describe('updateSubscription', function() {

      it('Sends the correct request', function() {

        rebilly.customers.updateSubscription('customerIdFoo321', 'subscriptionIdFoo456', {
          quantity: '2'
        });
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'PUT',
          url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo456',
          headers: {},
          data: { quantity: '2' }
        });

      });

    });

    describe('cancelSubscription', function() {

      it('Sends the correct request', function() {

        rebilly.customers.cancelSubscription('customerIdFoo321', 'subscriptionIdFoo456');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo456/cancel',
          headers: {},
          data: {}
        });

      });

      describe('With policy defined', function() {
        it('Sends the correct request', function() {

          rebilly.customers.cancelSubscription('customerIdFoo321', 'subscriptionIdFoo456', {policy: 'AT_NEXT_REBILL'});
          expect(rebilly.LAST_REQUEST).to.deep.equal({
            method: 'POST',
            url: '/v2.1/customers/customerIdFoo321/subscriptions/subscriptionIdFoo456/cancel',
            headers: {},
            data: { policy: 'AT_NEXT_REBILL' }
          });

        });
      });

    });

    describe('listSubscriptions', function() {

      it('Sends the correct request', function() {

        rebilly.customers.listSubscriptions('customerIdFoo321');
        expect(rebilly.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/v2.1/customers/customerIdFoo321/subscriptions',
          headers: {},
          data: {}
        });

      });

    });

  });

});
