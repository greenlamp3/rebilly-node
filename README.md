# Rebilly node.js bindings [![Build Status](https://travis-ci.org/greenlamp-social/rebilly-node.png?branch=master)](https://travis-ci.org/greenlamp-social/rebilly-node)

(Inspired by [stripe-node](https://github.com/stripe/stripe-node))

## Installation

`npm install rebilly`

## Documentation

Documentation is available at https://www.rebilly.com/api/documentation/v2.1/.

## API Overview

Every resource is accessed via your `rebilly` instance:

```js
var rebilly = require('rebilly')(' your rebilly API key ');
// rebilly.{ RESOURCE_NAME }.{ METHOD_NAME }
```

Every resource method accepts an optional callback as the last argument:

```js
rebilly.customers.create(
  { email: 'customer@example.com' },
  function(err, customer) {
    err; // null if no error occurred
    customer; // the created customer object
  }
);
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback. E.g.

```js
// Create a new customer and then a new charge for that customer:
rebilly.customers.create({
  email: 'name@company.com'
}).then(function(customer) {
  return rebilly.customers.update(customer.id, {
    defaultCard: '4242'
  });
}).then(function(charge) {
  // New charge created on a new customer
}, function(err) {
  // Deal with an error
});
```

### Available resources & methods

*Where you see `params` it is a plain JavaScript object, e.g. `{ email: 'name@company.com' }`*

 * customers
  * [`create(params)`](https://www.rebilly.com/api/documentation/v2.1/#customer-Create)
  * [`list([params])`](https://www.rebilly.com/api/documentation/v2.1/#customer-List)
  * [`update(customerId[, params])`](https://www.rebilly.com/api/documentation/v2.1/#customer-Update)
  * [`retrieve(customerId)`](https://www.rebilly.com/api/documentation/v2.1/#customer-Retrieve)
  * [`createSubscription(customerId, params)`](https://www.rebilly.com/api/documentation/v2.1/#subscriptions-v2_1-Create)
  * [`updateSubscription(customerId, subscriptionId, [, params])`](https://www.rebilly.com/api/documentation/v2.1/#subscriptions-v2_1-Modify)
  * [`cancelSubscription(customerId, subscriptionId, [, params])`](https://www.rebilly.com/api/documentation/v2.1/#subscriptions-v2_1-Cancel)
  * [`listSubscriptions(params)`](https://www.rebilly.com/api/documentation/v2.1/#subscriptions-v2_1-List)
  * [`createCard(customerId[, params])`](https://www.rebilly.com/api/documentation/v2.1/#paymentCard-Create)
  * [`createCardWithID(customerId, cardId[, params])`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#paymentCard-Create with given id)
  * [`listCards(customerId)`](https://www.rebilly.com/api/documentation/v2.1/#paymentCard-List)
  * [`retrieveCard(customerId, cardId)`](https://www.rebilly.com/api/documentation/v2.1/#paymentCard-Retrieve)
  * [`authorize(customerId, cardId[, params])`](https://www.rebilly.com/api/documentation/v2.1/#paymentCard-Authorization)
  * [`deactivate(customerId, cardId)`](https://www.rebilly.com/api/documentation/v2.1/#paymentCard-Deactivate)
  * [`listInvoices(customerId)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#customer-invoice-Get)
  * [`listTransactions(customerId[, params])`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#transaction-Retrieve Per Customer)
 * plans
  * [`create(params)`](https://www.rebilly.com/api/documentation/v2.1/#plans-Create)
  * [`list([params])`](https://www.rebilly.com/api/documentation/v2.1/#plans-List)
  * [`update(planId[, params])`](https://www.rebilly.com/api/documentation/v2.1/#plans-Update)
  * [`retrieve(planId)`](https://www.rebilly.com/api/documentation/v2.1/#plans-Retrieve)
  * [`del(planId)`](https://www.rebilly.com/api/documentation/v2.1/#plans-Delete)
 * tokens
  * [`create(params)`](https://www.rebilly.com/api/documentation/v2.1/#paymentToken-Create)
  * [`retrieve(tokenId)`](https://www.rebilly.com/api/documentation/v2.1/#paymentToken-Retrieve)
  * [`expire(tokenId)`](https://www.rebilly.com/api/documentation/v2.1/#paymentToken-Expire)
 * contacts
  * [`create(params)`](https://www.rebilly.com/api/documentation/v2.1/#contact-Create)
  * [`createWithID(contactId, params)`](https://www.rebilly.com/api/documentation/v2.1/#contact-Create with specified ID)
  * [`list()`](https://www.rebilly.com/api/documentation/v2.1/#contact-List)  
  * [`retrieve(contactId)`](https://www.rebilly.com/api/documentation/v2.1/#contact-Retrieve)  
 * signature
  * [`generate(apiUser, apiKey)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#introduction-Authentication)
 * invoices
  * [`create(params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-Create)
  * [`modify|update(invoiceId, params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-Modify)
  * [`retrieve(invoiceId, params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-Retrieve)
  * [`void(invoiceId)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-Void)
  * [`abandon(invoiceId)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-Abandon)
  * [`issue(invoiceId, params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-Issue)
  * [`createItem(invoiceId, params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-item-Create)
  * [`retrieveItems(invoiceId)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#invoice-item-Retrieve)
 * payments
  * [`create(params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#payments-Create)
  * [`retrieve(paymentId, params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#payments-Retrieve)
  * [`list(params)`](https://www.rebilly.com/sandbox/api/documentation/v2.1/#payments-List)

## Configuration

 * `rebilly.setApiKey(' your secret api key ');`
 * `rebilly.setTimeout(20000); // in ms` (default is node's default: `120000ms`)

## Development

To run the tests you'll need a Rebilly *Sandbox* API key (from your [Rebilly Dashboard](https://www.rebilly.com/sandbox/site/overview/)):

```bash
$ npm install -g mocha
$ npm test
```

*Note: On Windows use `SET` instead of `export` for setting the `REBILLY_TEST_API_KEY` environment variable.*

## Author

Originally by [Pedro Sampaio](http://oitozero.com). Development was sponsored by [Greenlamp](http://greenlamp.com).
