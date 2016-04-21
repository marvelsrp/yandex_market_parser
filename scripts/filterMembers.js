var fs = require('fs');
var readPath = '../dump/getMembers';
var writePath = '../dump/filterMembers';
var _ = require('lodash');
var dirs = fs.readdirSync(readPath);
//test 1
for (var i in dirs) {
  var date = dirs[i];
  if (date.indexOf('.json') != -1) {
    continue;
  }
  var readDatePath = readPath + '/' + date;
  var writeDatePath = writePath + '/' + date;
  try {
    fs.mkdirSync(writeDatePath);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }

  var files = fs.readdirSync(readDatePath);
  for (var j in files) {
    var members = JSON.parse(fs.readFileSync(readDatePath + '/' + files[j], 'utf8'));

    var ukraineWomans = _.filter(members, function(people) {
      return people.sex === 1 && people.country && people.country.title == 'Украина';
    });
    fs.writeFileSync(writeDatePath + '/' + files[j], JSON.stringify(ukraineWomans, null, 2));
    console.log('     write ' + writeDatePath + '/' + files[j], ukraineWomans.length);
  }
}
//console.log(summary);
