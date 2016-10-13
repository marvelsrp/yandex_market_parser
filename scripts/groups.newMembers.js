var fs = require('fs');
var readPath = '../dump/groups.filterMembers';
var writePath = '../dump/groups.newMembers';
var _ = require('lodash');
var dirs = fs.readdirSync(readPath);
var groups = require('../config/groups');
var minDate = _.first(dirs);
var maxDate = _.last(dirs);
var sum = 0;
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
  console.log(groups[i], diffMembers.length);
  sum += diffMembers.length;

  fs.writeFileSync(writePath + '/' + groups[i] + '.json', JSON.stringify(diffMembers, null, 2));
}
console.log('minDate', minDate);
console.log('maxDate', maxDate);
console.log('sum', sum);