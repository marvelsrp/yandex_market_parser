var VK = require('./libs/connectors/vk');
var _ = require('lodash');
var colors = require('colors');
var console = require('better-console');
var fs = require('fs');
//var task = require('./task') || '';
var deferred = require('deferred');

var groups = require('../config/groups');
var accountID = require('../config/account');

var code = fs.readFileSync(__dirname + '/../execute/getTargetingId', 'utf8');
var targetingIDs = {};

function end() {
  console.log(targetingIDs);
  fs.writeFileSync('../config/targeting.json', JSON.stringify(targetingIDs, null, 2));
}

function execute(index) {
  var group_id = groups[index];
  var realCode = code;
  realCode = _.replace(realCode, '%group_id%', group_id);
  realCode = _.replace(realCode, '%account_id%', accountID);
  VK.execute(realCode).then((response) => {
    if (response.error) {
      console.error(response);
    } else {
      targetingIDs[group_id] = response.response;
      if (index < groups.length - 1) {
        execute(index + 1);
      } else {
        end();
      }
    }
  });
}
execute(0);