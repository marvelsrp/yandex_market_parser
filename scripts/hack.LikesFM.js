var likesFM = require('./libs/connectors/likesFM');


var likeHack = require('./libs/hack/like');
//var repostHack = require('./libs/hack/repost');
//var groupHack = require('./libs/hack/group');
//var subHack = require('./libs/hack/sub');

likesFM.getOffers().then((tasks) => {
  likeHack.init(tasks);
  //.then(() => {
  //  //return repostHack.init(tasks);
  //}).then(() => {
  //  //return groupHack.init(tasks);
  //}).then(() => {
  //  //return subHack.init(tasks);
  //});
});

