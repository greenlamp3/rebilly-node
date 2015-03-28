'use strict';

var RebillyResource = require('../RebillyResource');

var n = require('nonce')();
var moment = require('moment');
var crypto = require('crypto');

var NONCE_LENGTH = 30;

module.exports = RebillyResource.extend({

  generate: function(apiUser, apiKey){
    var nonce = n(NONCE_LENGTH);
    var time = moment().unix();
    
    var data = apiUser + nonce + time;

    var signature = crypto.createHmac('sha1', apiKey).update(data).digest('hex');

    var arr = {
        'REB-APIUSER': apiUser,
        'REB-NONCE': nonce,
        'REB-TIMESTAMP': time,
        'REB-SIGNATURE': signature
    };

    return new Buffer(JSON.stringify(arr)).toString('base64');
  }

});

