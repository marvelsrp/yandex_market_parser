var fs = require('fs');
var dumpPath = 'getMembers/dump';
var _ = require('lodash');
var dirs = fs.readdirSync(dumpPath);
var summary = {};
for (var i in dirs) {
  var date = dirs[i];
  if (date.indexOf('.json') != -1) {
    continue;
  }
  var dateDir = dumpPath + '/' + date;

  var files = fs.readdirSync(dateDir);
  summary[date] = {};
  for (var j in files) {
    if (files[j] != 'summary.json') {
      var peoples = JSON.parse(fs.readFileSync(dateDir + '/' + files[j], 'utf8'));

      for (var i in peoples) {
        if (!summary[date][peoples[i]]) {
          summary[date][peoples[i]] = {
            weight: 1,
            id: peoples[i]
          };
        } else {
          summary[date][peoples[i]].weight++;
        }
      }
    }
  }
}

var filterSummary = {};
_.forIn(summary, function(value, key) {
  var filteredObj = _.filter(value, function(people) {
    return people.weight > 1;
  });
  filterSummary[key] = _.map(filteredObj, function(people) {
    return people.id;
  });
});

var days = Object.keys(filterSummary);
var firstDay = filterSummary[days[0]];
var lastDay = filterSummary[days[days.length - 1]];

var diff = _.difference(firstDay, lastDay);
console.log(diff);
//console.log(summary);

//fs.writeFile(dumpPath + '/' + date + '.json', JSON.stringify(Object.keys(summary), null, 2), function(err) {
//  if (err) {
//    return console.log(err);
//  }
//  console.log('     write ' + dumpPath + '/' + date + '.json', Object.keys(summary).length);
//});