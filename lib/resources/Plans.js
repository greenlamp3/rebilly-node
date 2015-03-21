'use strict';

module.exports = require('../RebillyResource').extend({
  path: 'plans',
  includeBasic: ['create', 'list', 'retrieve', 'update', 'del']
});

