var fs = require('fs');
var dumpPath = 'getMembers/dump';
var dirs = fs.readdirSync(dumpPath);
for (var i in dirs) {
  var date = dirs[i];
  var dateDir = dumpPath + '/' + date;
  var summary = {};
  var files = fs.readdirSync(dateDir);
  for (var j in files) {
    if (files[j].indexOf('.txt') != -1){
      var peoples = fs.readFileSync(dateDir + '/' + files[j], 'utf8').split(/\n/);
      for (var i in peoples) {
        summary[peoples[i]] = peoples[i];
      }
    }

  }
  fs.writeFile(dateDir + '/summary.json', JSON.stringify(Object.keys(summary), null, 2), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('     write ' + date + '/summary.json', Object.keys(summary).length);
  });
}
