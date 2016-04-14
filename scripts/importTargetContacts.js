var VK = require('./libs/connectors/vk');
var fs = require('fs');
var readPath = '../dump/newMembers';
var _ = require('lodash');
var groups = require('../config/groups');
var targetinGroups = require('../config/targeting');
var accountID = require('../config/account');
var code = fs.readFileSync(__dirname + '/../execute/importTargetContacts', 'utf8');
var sleep = require('./libs/sleep');

function end(){
  console.log('Targeting was loaded');
}
function execute(groupIndex, offset) {
  sleep(5000).then(() => {
    var group_id = groups[groupIndex];
    var members = _.map(JSON.parse(fs.readFileSync(readPath + '/' + group_id + '.json', 'utf8')), (member) => {
      return member.id;
    });

    if (!members.length) {
      if (groupIndex < groups.length - 1) {
        execute(groupIndex + 1, 0);
      }
      return;
    }
    console.log('execute', group_id, members.length);
    var realCode = code;
    realCode = _.replace(realCode, '%target_group_id%', targetinGroups.groups[group_id]);
    realCode = _.replace(realCode, '%account_id%', accountID);

    var chunkMembers = _.chunk(members, 1000);
    realCode = _.replace(realCode, '%contacts%', chunkMembers[offset].join(','));

    VK.execute(realCode).then((response) => {
      if (response.error) {
        console.error(response);
        execute(groupIndex, offset);
      } else {
        if (groupIndex < groups.length - 1) {
          if (offset < chunkMembers.length - 1) {
            execute(groupIndex, offset + 1);
          } else {
            execute(groupIndex + 1, 0);
          }

        } else {
          end();
        }
      }
    });
  });
}
execute(0, 0);