var VK = require('./libs/connectors/vk');
var fs = require('fs');
var readPath = '../dump/groups.newMembers';
var _ = require('lodash');
var groups = require('../config/groups');
var accountID = require('../config/account');
var code = fs.readFileSync(__dirname + '/../execute/ads.importTargetContacts', 'utf8');
var sleep = require('./libs/sleep');

function end() {
  console.log('Targeting was loaded');
}

var members = [];
_.each(groups, (group) => {
  members = members.concat(_.map(JSON.parse(fs.readFileSync(readPath + '/' + group + '.json', 'utf8')), (member) => {
    return member.id;
  }));
});
var UniqMembers = _.uniq(members);

var chunkMembers = _.chunk(UniqMembers, 1000);

(function execute(offset) {

  sleep(5000).then(() => {
    var realCode = code;
    realCode = _.replace(realCode, '%account_id%', accountID);
    realCode = _.replace(realCode, '%contacts%', chunkMembers[offset].join(','));
    VK.execute(realCode).then((response) => {
      console.log(response);

      if (response.error) {
        console.error(response);
        execute(offset);
      } else {
        if (offset < chunkMembers.length - 1) {
          execute(offset + 1);
        }
      }
    });
  });
})(0);