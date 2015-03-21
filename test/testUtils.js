'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));

var config = require('./local');

var utils = module.exports = {

  getUserRebillyKey: function() {
    var key = process.env.REBILLY_TEST_API_KEY || config.apiKey;

    return key;
  },

  getSpyableRebilly: function() {
    // Provide a testable rebilly instance
    // That is, with mock-requests built in and hookable

    var Rebilly = require('../lib/rebilly');
    var rebillyInstance = Rebilly('fakeAuthToken');

    rebillyInstance.REQUESTS = [];

    for (var i in rebillyInstance) {
      if (rebillyInstance[i] instanceof Rebilly.RebillyResource) {

        // Override each _request method so we can make the params
        // available to consuming tests (revealing requests made on
        // REQUESTS and LAST_REQUEST):
        rebillyInstance[i]._request = function(method, url, data, auth, options, cb) {
          var req = rebillyInstance.LAST_REQUEST = {
            method: method,
            url: url,
            data: data,
            headers: options.headers || {},
          };
          if (auth) req.auth = auth;
          rebillyInstance.REQUESTS.push(req);
          cb.call(this, null, {});
        };

      }
    }

    return rebillyInstance;

  },

  /**
   * A utility where cleanup functions can be registered to be called post-spec.
   * CleanupUtility will automatically register on the mocha afterEach hook,
   * ensuring its called after each descendent-describe block.
   */
  CleanupUtility: (function() {

    CleanupUtility.DEFAULT_TIMEOUT = 20000;

    function CleanupUtility(timeout) {
      var self = this;
      this._cleanupFns = [];
      this._rebilly = require('../lib/rebilly')(
        utils.getUserRebillyKey(),
        'latest'
      );
      afterEach(function(done) {
        this.timeout(timeout || CleanupUtility.DEFAULT_TIMEOUT);
        return self.doCleanup(done);
      });
    }

    CleanupUtility.prototype = {

      doCleanup: function(done) {
        var cleanups = this._cleanupFns;
        var total = cleanups.length;
        var completed = 0;
        for (var fn; fn = cleanups.shift();) {
          var promise = fn.call(this);
          if (!promise || !promise.then) {
            throw new Error('CleanupUtility expects cleanup functions to return promises!');
          }
          promise.then(function() {
            // cleanup successful
            ++completed;
            if (completed === total) {
              done();
            }
          }, function(err) {
            // not successful
            throw err;
          });
        }
        if (total === 0) done();
      },
      add: function(fn) {
        this._cleanupFns.push(fn);
      },
      deleteCustomer: function(custId) {
        // not implemented via API
        // this.add(function() {
        //   return this._rebilly.customers.del(custId);
        // });
      },
      deletePlan: function(pId) {
        this.add(function() {
          return this._rebilly.plans.del(pId);
        });
      },
      deleteCoupon: function(cId) {
        this.add(function() {
          return this._rebilly.coupons.del(cId);
        });
      },
      deleteInvoiceItem: function(iiId) {
        this.add(function() {
          return this._rebilly.invoiceItems.del(iiId);
        });
      }
    };

    return CleanupUtility;

  }())

};



