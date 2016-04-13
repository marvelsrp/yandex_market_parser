var fs = require('fs');
var readPath = '../dump/filterMembers';
var writePath = '../dump/newMembers';
var _ = require('lodash');
var dirs = fs.readdirSync(readPath);
var groups = require('../config/groups');
var minDate = _.first(dirs);
var maxDate = _.last(dirs);

for (var i in groups) {
  var minDateMembers = _.keyBy(JSON.parse(fs.readFileSync(readPath + '/' + minDate + '/' + groups[i] + '.json', 'utf8')), (member) => {
    return member.id;
  });

  var maxDateMembers = _.keyBy(JSON.parse(fs.readFileSync(readPath + '/' + maxDate + '/' + groups[i] + '.json', 'utf8')), (member) => {
    return member.id;
  });

  var diffIds = _.difference(Object.keys(maxDateMembers), Object.keys(minDateMembers));

  var diffMembers = _.filter(maxDateMembers, (member, id) => {
    return diffIds.indexOf(id) != -1;
  });

  fs.writeFileSync(writePath + '/' + groups[i] + '.json', JSON.stringify(diffMembers, null, 2));
}
