'use strict';

var RebillyResource = require('../RebillyResource');
var rebillyMethod = RebillyResource.method;

module.exports = RebillyResource.extend({
  path: 'tokens',
  includeBasic: ['create', 'retrieve'],
  expire: rebillyMethod({
    method: 'POST',
    path: '/{tokenId}/expiration',
    urlParams: ['tokenId']
  })
});
