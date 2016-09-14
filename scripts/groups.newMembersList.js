var fs = require('fs');
var readPath = '../dump/groups.newMembers';
var _ = require('lodash');
var groups = require('../config/groups');
var writePath = '../dump/groups.newMembersList';

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
fs.writeFileSync(writePath + '/all.txt', UniqMembers.join("\r\n"));