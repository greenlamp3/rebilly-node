'use strict';

var rebilly = require('../testUtils').getSpyableRebilly();
var expect = require('chai').expect;

describe('Tokens Resource', function() {

  describe('create', function() {

    it('Sends the correct request', function() {

      rebilly.tokens.create({
        card: { number: 123 }
      });
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v2.1/tokens',
        headers: {},
        data: { card: { number: 123 } }
      });

    });

  });

  describe('retrieve', function() {

    it('Sends the correct request', function() {

      rebilly.tokens.retrieve('tokenId1');
      expect(rebilly.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v2.1/tokens/tokenId1',
        headers: {},
        data: {}
      });

    });

  });

});
