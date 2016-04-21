var VK = require('./libs/connectors/vk');
var _ = require('lodash');
var colors = require('colors');
var console = require('better-console');
var fs = require('fs');
var groups = require('../config/groups');
var deferred = require('deferred');

var writeAnswer = (name, members) => {
  console.log('writeAnswer');
  var dateStr = new Date().toLocaleDateString();
  var dumpDir = '../dump/groups.getMembers/' + dateStr;

  try {
    fs.mkdirSync(dumpDir);
  } catch (e) {
    if (e.code != 'EEXIST') console.log(e);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(dumpDir + '/' + name + '.json', JSON.stringify(members, null, 2), 'utf8', function(err) {
      if (err) {
        console.warn(err);
        return reject();
      }
      resolve();
    });
  });
};

function parseGroup(i) {

  var members = [];
  var group_id = groups[i];
  console.log('parseGroup', group_id);

  var code = fs.readFileSync(__dirname + '/../execute/groups.getMembers', 'utf8');

  function end() {
    console.log('end');
    writeAnswer(group_id, members).then(() => {
      if (i + 1 < groups.length) {
        parseGroup(i + 1);
      } else {
        console.info('DONE =)');
      }
    });
  }
  function execute(offset) {
    console.log('execute', group_id, offset + '...' + (offset + 24000));
    var realCode = code;
    realCode = _.replace(realCode, '%group_id%', group_id);
    realCode = _.replace(realCode, '%offset%', offset);

    VK.execute(realCode).then((response) => {
      if (response.error){
        console.error(response);
      } else {
        _.forEach(response.response.members, function(member, key) {
          members.push(member);
        });
        console.log(members.length + ' / ' + response.response.total);
        if (members.length < response.response.total) {

          execute(response.response.offset);
        } else {
          end();
        }
      }


    });
  }

  execute(0);
}



parseGroup(0);
