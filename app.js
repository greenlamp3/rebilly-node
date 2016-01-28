// var stripe = require('./lib/rebilly')('sk_test_461H8rAiu5HTCkhltAfZCrNo');

// stripe.customers.list({ limit: 3 }, function(err, customers) {
//   console.log('customers');
//   console.log(JSON.stringify(customers));
// });

var Rebilly = require('./lib/rebilly');
var rebilly = Rebilly('TxI5ul2U455QDaYnUd1zMN5PN60iXc/GSJPxiXs');
// var rebilly = Rebilly('aaaaabbbbbcccccdddddeeeeefffff');
rebilly.setEnvironment(Rebilly.ENV_SANDBOX);

// var apiUser = 'TxI5ul2U4';
// var apiKey = 'TxI5ul2U455QDaYnUd1zMN5PN60iXc/GSJPxiXs';
// var signature = rebilly.signature.generate(apiUser, apiKey);
// console.log('signature:' + signature);

// CREATE CUSTOMER WITH CARD TOKEN

// LIST CUSTOMERS
// rebilly.customers.list({ limit: 3 }, function(err, customers) {
//   console.log('customers');
//   console.log(JSON.stringify(customers));
// });

// rebilly.customers.list(
//     { limit : 1 },
//     { filter: 'email:' + 'pmpsampaio@gmail.com' },
//     // { limit: 3 },
//     function(err, customers) {
//         console.log('customer/s:' +  customers.length);
//     }
// );

// RETRIVEVE CUSTOMER
// rebilly.customers.retrieve('9US8G4K9ATS72TC', function(err, customer) {
//   console.log('customer');
//   console.log(JSON.stringify(customer));
// });

// CREATE CUSTOMER
// rebilly.customers.create({
//   id: 'cust_1234567890',
//   email: 'cust_1234567890@chirpler.com',
// }, function(err, customer) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('customer');
//   console.log(JSON.stringify(customer));
// });

// UPDATE CUSTOMER
// rebilly.customers.update('cust_1234567', {
//     email: '1234567890@chirpler.com'
//   // firstName: 'test',
//   // lastName: 'example'
//   // defaultCard: 'C947KYNS85CFB2PX'
// }, function(err, customer) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('customer');
//   console.log(JSON.stringify(customer));
// });

// LIST PLANS
// rebilly.plans.list(function(err, plans) {
//   console.log('plans');
//   console.log(JSON.stringify(plans));
// });

// RETRIVEVE PLAN
// rebilly.plans.retrieve('JC8GE2UJJ6HBS28', function(err, plan) {
//   console.log('plan');
//   console.log(JSON.stringify(plan));
// });

// CREATE PLAN
// rebilly.plans.create({
//   name: 'dummy',
//   currency: 'usd',
//   recurringAmount: 1,
//   recurringPeriodUnit: 'day',
//   recurringPeriodLength: 1
// }, function(err, plan) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('plan');
//   console.log(JSON.stringify(plan));
// });

// UPDATE PLAN
// rebilly.plans.update(2001, {
//   description: 'Premium Membership - 1 Month (With Trial)'
// }, function(err, plan) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('plan');
//   console.log(JSON.stringify(plan));
// });

// DELETE PLAN
// rebilly.plans.create({
//   name: 'dummy',
//   currency: 'usd',
//   recurringAmount: 1,
//   recurringPeriodUnit: 'day',
//   recurringPeriodLength: 1
// }, function(err, plan) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   rebilly.plans.del(plan.id, function(err, confirmation) {
//     if(err){
//         console.log('Error: %s', JSON.stringify(err));
//     }
//     console.log('confirmation');
//     console.log(JSON.stringify(confirmation));
//   });
// });

// CREATE CONTACT
// rebilly.contacts.create({
//   firstName: 'contact',
//   lastName: 'example'
// }, function(err, contact) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('contact');
//   console.log(JSON.stringify(contact));
// });

// CREATE CONTACT WITH ID
// rebilly.contacts.createWithID('cust_1234567', {
//   firstName: 'contact',
//   lastName: 'example'
// }, function(err, contact) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('contact');
//   console.log(JSON.stringify(contact));
// });

// RETRIEVE CONTACT
// rebilly.contacts.retrieve('1', function(err, contact) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('contact');
//   console.log(JSON.stringify(contact));
// });

// LIST CONTACTS
// rebilly.contacts.list(function(err, contacts) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('contacts');
//   console.log(JSON.stringify(contacts));
// });


// LIST CARDS
// rebilly.customers.listCards('XN9QCS2VMN6RQ6C', function(err, cards) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('cards');
//   console.log(JSON.stringify(cards));
// });

// CREATE CARD
// rebilly.customers.createCard(
//   'cus_5yh9cpOVUHDJZn',
//   {
//     pan: '4242424242424242',
//     expYear: '2018',
//     expMonth: '3',
//     cvv: '123',
//     billingContact: '1'
//   },
//   function(err, card) {
//     console.log('err:' + JSON.stringify(err));
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

// rebilly.customers.createCardWithID(
//   '1',
//   'card_1234567890',
//   {
//     pan: '4242424242424242',
//     expYear: '2018',
//     expMonth: '3',
//     cvv: '123',
//     billingContact: '1'
//   },
//   function(err, card) {
//     console.log('err:' + JSON.stringify(err));
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

// RETRIEVE CARD
// rebilly.customers.retrieveCard(
//   '1',
//   'M7WC9DN9TJ5D3C4M',
//   function(err, card) {
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

// AUTHORIZE CARD
// rebilly.customers.authorizeCard(
//   'XN9QCS2VMN6RQ6C',
//   '2JKBTV4V6KWXHM4H',
//   {
//     currency: 'USD',
//     website: 'chirpler_1001',
//     amount: '11.00'
//   },
//   function(err, card) {
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

// DEACTIVATE CARD
// rebilly.customers.deactivateCard(
//   '1',
//   'C947KYNS85CFB2PX',
//   function(err, card) {
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

// CREATE TOKEN
// rebilly.tokens.create({
//     pan: '4242424242424242',
//     expYear: '2017',
//     expMonth: '3',
//     cvv: '123',
//     firstName: 'first',
//     lastName: 'last'
//   },
//   function(err, token) {
//     console.log('token');
//     console.log(JSON.stringify(token));
//   }
// );

// RETRIEVE TOKEN
// rebilly.tokens.retrieve('cy8XIRtH8kwUsMk', function(err, token) {
//     console.log('token');
//     console.log(JSON.stringify(token));
//   }
// );

// EXPIRE TOKEN
// rebilly.tokens.expire('cy8XIRtH8kwUsMk', function(err, token) {
//     console.log('token');
//     console.log(JSON.stringify(token));
//   }
// );

// CREATE SUBSCRIPTION
// console.log('create subscription');
// rebilly.customers.createSubscription(
//   "WDPXGAEQHSK8Y75",
//   {
//     plan: "2001",
//     website: "chirpler_1001",
//     paymentCard: "7XD6TXSZST8WX999"
//   },
//   function(err, subscription) {
//     console.log('subscription');
//     console.log(JSON.stringify(subscription));
//   }
// );

// UPDATE SUBSCRIPTION
// rebilly.customers.updateSubscription(
//   "1",
//   "CXW8ZCD3SZN2S4A",
//   {
//     renewalTime: "2015-01-01 00:00:00",
//     // deliveryAddress: "chirpler_1001",
//     quantity: 1
//   },
//   function(err, subscription) {
//     console.log('subscription');
//     console.log(JSON.stringify(subscription));
//   }
// );

// RETRIEVE SUBSCRIPTION
// rebilly.customers.retrieveSubscription(
//   "1",
//   "CXW8ZCD3SZN2S4A",
//   function(err, subscription) {
//     console.log('subscription');
//     console.log(JSON.stringify(subscription));
//   }
// );

// LIST SUBSCRIPTIONS
// rebilly.customers.listSubscriptions(
//   "1",
//   function(err, subscriptions) {
//     console.log('subscriptions');
//     console.log(JSON.stringify(subscriptions));
//   }
// );

// SWITCH SUBSCRIPTION
// rebilly.customers.switchSubscription(
//   "1",
//   "CXW8ZCD3SZN2S4A",
//   {
//     plan: "2002",
//     policy: "AT_NEXT_REBILL" //"NOW_WITHOUT_REFUND" "NOW_WITH_PRORATA_REFUND" "NOW_WITH_FULL_REFUND"
//   },
//   function(err, subscriptions) {
//     console.log('subscriptions');
//     console.log(JSON.stringify(subscriptions));
//   }
// );

// CANCEL SUBSCRIPTION
// rebilly.customers.cancelSubscription(
//   "1",
//   "CXW8ZCD3SZN2S4A",
//   {
//     policy: "AT_NEXT_REBILL" //"NOW_WITHOUT_REFUND" "NOW_WITH_PRORATA_REFUND" "NOW_WITH_FULL_REFUND"
//   },
//   function(err, subscriptions) {
//     console.log('subscriptions');
//     console.log(JSON.stringify(subscriptions));
//   }
// );


// INVOICES
// CREATE INVOICE
// rebilly.invoices.create(
//   {
//     customer: 'XN9QCS2VMN6RQ6C',
//     website: 'chirpler_1001',
//     currency: 'USD',
//     // dueTime: '',
//     // billingContact: '',
//     // deliveryContact: ''
//   },
//   function(err, invoice) {
//     console.log('invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );

// MODIFY INVOICE
// rebilly.invoices.modify(
//   'XN9QCS2VMN6RQ6C-2',
//   {
//     customer: 'XN9QCS2VMN6RQ6C',
//     website: 'chirpler_1001',
//     currency: 'USD',
//     dueTime: '',
//     // billingContact: '',
//     // deliveryContact: ''
//   },
//   function(err, invoice) {
//     console.log('invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );

// RETRIEVE INVOICE
// rebilly.invoices.retrieve(
//   'XN9QCS2VMN6RQ6C-2',
//   {
//     fields: 'customer'
//   },
//   function(err, invoice) {
//     console.log('invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );

// VOID INVOICE
// rebilly.invoices.void(
//   'XN9QCS2VMN6RQ6C-2',
//   {

//   },
//   function(err, invoice) {
//     console.log('void invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );

// ABANDON INVOICE
// rebilly.invoices.abandon(
//   'XN9QCS2VMN6RQ6C-2',
//   function(err, invoice) {
//     console.log('abandon invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );

// // ISSUE INVOICE
// rebilly.invoices.issue(
//   'XN9QCS2VMN6RQ6C-2',
//   {

//   },
//   function(err, invoice) {
//     console.log('issue invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );

// CREATE INVOICE ITEM
// rebilly.invoices.createItem(
//   'XN9QCS2VMN6RQ6C-2',
//   {
//     type: 'debit',
//     unitPrice: 11,
//     quantity: 1,
//     description: 'Sample Item',
//     // periodStartTime: '',
//     // periodEndTime: ''
//   },
//   function(err, item) {
//     console.log('invoice item');
//     console.log(JSON.stringify(item));
//   }
// );

// RETRIEVE ITEMS
// rebilly.invoices.retrieveItems(
//   'XN9QCS2VMN6RQ6C-2',
//   function(err, items) {
//     console.log('invoice items');
//     console.log(JSON.stringify(items));
//   }
// );

// rebilly.customers.listInvoices(
//   'XN9QCS2VMN6RQ6C',
//   function(err, invoices) {
//     console.log('invoices');
//     console.log(JSON.stringify(invoices));
//   }
// );

// ---------------------------------------------
// ---------------------------------------------
//
// rebilly.customers.create({
//   email: 'pedro@chirpler.com',
// }, function(err, customer) {
//   if(err){
//     console.log('Error: %s', JSON.stringify(err));
//   }
//   console.log('customer');
//   console.log(JSON.stringify(customer));
// });
// CC4N6TA2WTSWRZR

//
// rebilly.customers.createCard(
//   'CC4N6TA2WTSWRZR',
//   {
//     pan: '4242424242424242',
//     expYear: '2018',
//     expMonth: '3',
//     cvv: '123',
//     billingContact: '1'
//   },
//   function(err, card) {
//     console.log('err:' + JSON.stringify(err));
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );
// KD9WQGB68DR4GWS4

//
// rebilly.customers.authorizeCard(
//   'CC4N6TA2WTSWRZR',
//   'KD9WQGB68DR4GWS4',
//   {
//     currency: 'USD',
//     website: 'chirpler_1001',
//     amount: '11.00'
//   },
//   function(err, card) {
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

//
// rebilly.invoices.create(
//   {
//     customer: 'CC4N6TA2WTSWRZR',
//     website: 'chirpler_1001',
//     currency: 'USD',
//     dueTime: '2015-05-13 00:00:00',
//     // billingContact: '',
//     // deliveryContact: ''
//   },
//   function(err, invoice) {
//     console.log('invoice');
//     console.log(JSON.stringify(invoice));
//   }
// );
// CC4N6TA2WTSWRZR-1

// rebilly.invoices.createItem(
//   'CC4N6TA2WTSWRZR-1',
//   {
//     type: 'debit',
//     unitPrice: 11,
//     quantity: 1,
//     description: 'Sample Item',
//     // periodStartTime: '',
//     // periodEndTime: ''
//   },
//   function(err, item) {
//     console.log('invoice item');
//     console.log(JSON.stringify(item));
//   }
// );

// rebilly.invoices.issue(
//   'VR4TM6BHGRWGP2R-1',
//   {
//     issuedTime: '2015-04-13 00:00:00'
//   },
//   function(err, invoice) {
//     console.log('issue invoice');
//     console.log('error:' + JSON.stringify(err));
//     console.log(JSON.stringify(invoice));
//   }
// );

//
// var RebillyResource = require('./lib/RebillyResource');
// var rebillyMethod = RebillyResource.method;
// rebilly.customers.chargeCard = rebillyMethod({
//   method: 'POST',
//   path: '/{customerId}/payment-cards/{cardId}/hidden-payment',
//   urlParams: ['customerId', 'cardId']
// });
// rebilly.customers.chargeCard(
//   'CC4N6TA2WTSWRZR',
//   'KD9WQGB68DR4GWS4',
//   {
//     currency: 'USD',
//     website: 'chirpler_1001',
//     amount: '11.00'
//   },
//   function(err, card) {
//     console.log('card');
//     console.log(JSON.stringify(card));
//   }
// );

//
// rebilly.customers.listTransactions(
//   'CC4N6TA2WTSWRZR',
//   {
//     limit: '1'
//   },
//   function(err, card) {
//     console.log('transaction');
//     console.log(JSON.stringify(card));
//   }
// );

// PAYMENTS
rebilly.payments.create(
  {
    websiteId: 'chirpler_1001',
    customerId: 'b988d036-1f77-43e1-b558-28d4491f9b0c',
    amount: 99.99,
    currency: 'USD',
    method: 'payment_card',
    paymentInstrument: {
        paymentCardId: '9e9a2269-1b08-417e-a77b-10672903e238',
        gatewayAccountId: 'stripe_1001'
    },
    invoiceIds: ['b988d036-1f77-43e1-b558-28d4491f9b0c-37']
  },
  function(err, payment) {
    console.log('payment');
    console.log(JSON.stringify(payment));
  }
);

// rebilly.customers.retrieve(
//   '9QN7243TFQUK6XF',
//   function(err, payment) {
//       if(err){
//           console.log('Error:', err);
//       }
//     console.log('payment');
//     console.log(JSON.stringify(payment));
//   }
// );

// rebilly.customers.list(
//   function(err, response) {
//       if(err){
//           console.log('Error:', err);
//       }
//     console.log('response');
//     console.log(JSON.stringify(response));
//   }
// );
