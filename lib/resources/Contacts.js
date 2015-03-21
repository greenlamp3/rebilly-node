'use strict';

var RebillyResource = require('../RebillyResource');
var rebillyMethod = RebillyResource.method;

module.exports = RebillyResource.extend({
  path: 'contacts',
  includeBasic: ['create', 'list', 'retrieve'],

  createWithID: rebillyMethod({
    method: 'PUT',
    path: '/{contactId}',
    urlParams: ['contactId']
  })

});
