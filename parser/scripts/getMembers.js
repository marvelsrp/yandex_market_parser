var VK = require('./../../connectors/vk');
var _ = require('lodash');
var colors = require('colors');
var console = require('better-console');
var fs = require('fs');
//var task = require('./task') || '';
var deferred = require('deferred');
var groups = ['fotoodessa','virbox360','prazdnikvshokolade_kh',
  'svadba_video_melnichenko', 'discoverwedding', 'rent_decorations','ats.foto', 'romantic_dp', 'nechaeva_dp',
  'shepankova', 'nesterenko_yuliya','1fineday','vasha_svadba_dnepr', 'euro_svadba', '54518846',
  'weddings_stuff','wedding.details','stylemepretty','lulusvadba','svadba_kr','detail_wed', 'ssvadba'];


var writeAnswer = (name, members) => {

  var dateStr = new Date().toLocaleDateString();
  var dumpDir = '../dump/getMembers/' + dateStr;

  try {
    fs.mkdirSync(dumpDir);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
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

  var code = fs.readFileSync(__dirname + '/../execute/getMembers', 'utf8');

  function end() {
    console.log('end');
    writeAnswer(group_id, members).then(() => {
      if (parseInt(i) + 1 < groups.length) {
        parseGroup(parseInt(i) + 1, 0);
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



parseGroup(13);
