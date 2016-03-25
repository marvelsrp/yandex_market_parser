var VK = require('vksdk');
var authData = require('./vk.json');
var open = require('open');
var _ = require('lodash');
var sleep = require('./../lib/sleep');
var console = require('better-console');
var deferred = require('deferred');
var fs = require('fs');
var vk = new VK({
  'appId'     : authData.appId,
  'appSecret' : authData.appSecret,
  'language'  : 'ru'
});
vk.setToken(authData.clientToken);
vk.setSecureRequests(true);
vk.on('serverTokenReady', function(_o) {
  // Here will be server access token
  vk.setToken(_o.access_token);
  console.log('serverTokenReady', _o);
});

var like = (id) => {
  var def = deferred();
  var params = {};
  var splitId = id.split('_');
  switch (true){
    case id.indexOf('wall') != -1:
      params.type = 'post';
      break;
    case id.indexOf('photo') != -1:
      params.type = 'photo';
      break;
    //case id.indexOf('video') != -1:
    //  params.type = 'video';
    //  break;
    default:
      return def.reject('Undefined type for ' + id);
  }
  params.owner_id = parseInt(splitId[0].replace(/\D/g,''));
  params.item_id = parseInt(splitId[1]);
  if (params.owner_id < 0) {
    return def.reject('owner_id < 0');
  }
  console.log('vk.request likes.add');
  vk.request('likes.add', params, (response) => {
    console.log('likes.add', response);
    return def.resolve();
  });

  return def.promise;
};

var repost = (id) => {
  var def = deferred();
  var params = {
    object: id
  };

  vk.request('wall.repost', params, (response) => {
    console.log('wall.repost', response);
    return (response.hasOwnProperty('success')) ?  def.resolve() : def.reject();
  });
  return def.promise;
};

var joinGroup = (id) => {
  var def = deferred();
  var params = {
    group_id: parseInt(id.replace(/\D/g,''))
  };

  vk.request('groups.join', params, (response) => {
    console.log('groups.join', response);
    return def.resolve();
  });
  return def.promise;
};

var addFriend = (id) => {
  var def = deferred();
  var params = {
    user_id: parseInt(id.replace(/\D/g,''))
  };

  vk.request('friends.add', params, (response) => {
    console.log('friends.add', response);
    return def.resolve();
  });
  return def.promise;
};

var getMembers = (id, offset) => {
  if (!offset) {
    offset = 0;
  }
  console.log('     ==========');
  console.log('     getMembers', id, offset);

  var params = {
    group_id: id,
    sort: 'id_desc',
    count: 1000,
    fields: 'country, sex, city',
    offset: offset
  };
  var taskPrimise = new Promise((resolve, reject) => {
    fs.writeFile('getMembers/task.json', JSON.stringify(params, null, 2), 'utf8', function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('     write task.json', id, offset);
      resolve();
    });
  });

  return taskPrimise.then(() => {
    var resultPromise = new Promise((resolve, reject) => {

      console.log('     request');
      var vkReq = vk.request('groups.getMembers', params, (response) => {
        console.log('     response');
        if (!response.response) {
          console.log(response, id);
          console.warn(response);
          //reject();
          return;
        }

        var ukraineWomans = _.filter(response.response.items, function(people) {
          return people.sex === 1 && people.country && people.country.title == 'Украина';
        });
        var ukraineWomansId = _.map(ukraineWomans, function(people, index) {
          return people.id;
        });
        console.info('     ' + id + '+' + ukraineWomansId.length + '/' + response.response.count);

        var dateStr = new Date().toLocaleDateString();
        var dumpDir = 'getMembers/dump/' + dateStr;
        try {
          fs.mkdirSync(dumpDir);
        } catch(e) {
          if ( e.code != 'EEXIST' ) throw e;
        }
        fs.appendFile(dumpDir + '/' + id + '.txt', '\n' + ukraineWomansId.join('\n'));
        var isDone = response.response.items.length !== 1000;
        console.log('     appendFile');
        resolve(isDone);
      });
      vkReq.setTimeout(2000);
      vkReq.on('timeout', function() {
        console.warn('     timeout');
        vkReq.abort();
        //reject();
      });
    });

    return resultPromise.then((isDone) => {
      if (!isDone) {
        return sleep(2000).then(() => {
          return getMembers(id, offset + 1000);
        });
      } else {
        console.log('     RESOLVE');
        return Promise.resolve();
      }
    }, () => {
      console.warn('     reject');

      return sleep(5000).then(() => {
        return getMembers(id, offset);
      });
    });
  });


};

var getToken = () => {
  var access_token_url = 'https://oauth.vk.com/authorize?' +
    'client_id=' + authData.appId + '&' +
    'redirect_uri=https://oauth.vk.com/blank.html&' +
      //'redirect_uri=' + authData.redirectUri + '&' +
    'scope=messages,wall,photos,groups,friends,email,notify,notifications,offline,market,ads' + '&' +
    'response_type=token&' +
    'v=5.50&';
  open(access_token_url);
};

module.exports = {
  vk: vk,
  like: like,
  repost: repost,
  joinGroup: joinGroup,
  addFriend: addFriend,
  getMembers:getMembers,
  getToken: getToken
};
