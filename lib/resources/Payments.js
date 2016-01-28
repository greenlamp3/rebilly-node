'use strict';

module.exports = require('../RebillyResource').extend({
  path: 'payments',
  includeBasic: ['create', 'list', 'retrieve']
});
