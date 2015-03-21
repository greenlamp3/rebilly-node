'use strict';

var rebilly = require('../testUtils').getSpyableRebilly();
var expect = require('chai').expect;

describe('Plans Resource', function() {

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      rebilly.plans.retrieve('planId1');
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v2.1/plans/planId1',
        headers: {},
        data: {}
      });

    });

  });

  describe('create', function() {

    it('Sends the correct request', function() {

      rebilly.plans.create({
        amount: 200, currency: 'usd'
      });
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v2.1/plans',
        headers: {},
        data: { amount: 200, currency: 'usd' }
      });

    });

  });

  describe('update', function() {

    it('Sends the correct request', function() {

      rebilly.plans.update('planId3', {
        amount: 1900, currency: 'usd'
      });
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'PUT',
        url: '/v2.1/plans/planId3',
        headers: {},
        data: { amount: 1900, currency: 'usd' }
      });

    });

  });

  describe('del', function() {

    it('Sends the correct request', function() {

      rebilly.plans.del('planId4');
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'DELETE',
        url: '/v2.1/plans/planId4',
        headers: {},
        data: {}
      });

    });

  });

  describe('list', function() {

    it('Sends the correct request', function() {

      rebilly.plans.list();
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v2.1/plans',
        headers: {},
        data: {}
      });

    });

  });

});
