'use strict';

var RebillyResource = require('../RebillyResource');
var rebillyMethod = RebillyResource.method;

module.exports = require('../RebillyResource').extend({
  path: 'layouts',
  includeBasic: ['list', 'retrieve', 'create', 'update']

});
