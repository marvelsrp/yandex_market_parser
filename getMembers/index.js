var VK = require('./../connectors/vk');
var _ = require('lodash');
var sleep = require('./../lib/sleep');
var colors = require('colors');
var console = require('better-console');
var fs = require('fs');
var taskJSON = require('./task.json');
var groups = ['priglashalki','fotoodessa','virbox360',
  'sva.photo','prazdnikvshokolade_kh', 'biblia_nevest',
  'svadba_video_melnichenko', 'discoverwedding', 'rent_decorations','ats.foto', 'romantic_dp', 'nechaeva_dp',
  'shepankova', 'nesterenko_yuliya','1fineday','vasha_svadba_dnepr'];

function parseGroups(i, i_offset) {
  if (!i) {
    i = 0;
  }
  var group = groups[i];
  console.info('PARSE GROUP ' + group);
  VK.getMembers(group, i_offset).then(() => {
    console.info('NEXT GROUP');
    if (i + 1 < groups.length) {
      parseGroups(i + 1, 0);
    }
  }, (e) => {
    console.warn('getMembers catch',e.underline.red);
  });
}
var index = 0;
var offset = 0;
for (var i in groups) {
  if (groups[i] == taskJSON.id) {
    index = i;
    offset = taskJSON.offset;
    break;
  }
}
parseGroups(index, taskJSON.offset);
