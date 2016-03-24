var likesFM = require('./connectors/likesFM');

var likeHack = require('./hack/like');
var repostHack = require('./hack/repost');
var groupHack = require('./hack/group');
var subHack = require('./hack/sub');
var getOffers = () => {
  return likesFM.getOffers().then((tasks) => {
    likeHack.init(tasks);
    repostHack.init(tasks);
    groupHack.init(tasks);
    //subHack.init(tasks);
  });
};

getOffers();
