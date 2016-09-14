
//var map = L.map('map').setView([49, 32], 6);
//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//  maxZoom: 18,
//  id: 'marvelsrp.01me4ohp',
//  accessToken: 'pk.eyJ1IjoibWFydmVsc3JwIiwiYSI6ImNpbnN1ZXNxejAwanV3N2tsNmEyNTE3bm4ifQ.GYMPCNeBttXMxXrQmpu7Ow'
//}).addTo(map);
var map;
var heatmapData = [];
var markers = [];
var markerCluster;
var geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49, lng: 32},
    zoom: 7
  });

  //var markerCluster = new MarkerClusterer(map, markers);
  //console.log('markerCluster', markerCluster);
  //heatmap.setMap(map);
}

var cities = {};
function getCoordinates(city) {

  return new Promise(function(resolve, rejected) {
    if (cities[city]) {
      resolve(cities[city]);
    } else {
      setTimeout(function() {
        geocoder.geocode({'address': 'Украина, ' + city}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            cities[city] = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
            resolve(cities[city]);
          } else {
            console.error('http://maps.google.com/maps/api/geocode/json?address=Украина, ' + city, results);
            rejected();
          }
        });
      }, 1000);
    }
  });
}

function eachPromise(arr, callback, i) {

  if (!i) {
    i = 0;
  }
  console.log('eachPromise', i, arr.length);
  return callback(arr[i], i).then(() => {
    if (i + 1 < arr.length) {
      return eachPromise(arr, callback, i + 1);
    } else {
      return Promise.resolve();
    }
  }).catch(() => {
    if (i + 1 < arr.length) {
      return eachPromise(arr, callback, i + 1);
    } else {
      return Promise.resolve();
    }
  });
}
var csvData = ['name, city'];

function getMembers(users) {
  var loader = document.getElementById('loader');
  var chunks = _.chunk(users, 800);

  function getMembersInfo(index) {
    var current_data = chunks[index] || [];

    return new Promise(function(resolve, rejected) {
      VK.Api.call('users.get', {user_ids: current_data.join(','), fields: 'photo_50,city', v: '5.27'}, function(r) {
        console.log(r);
        if (r.response) {
          console.log('r.response', r.response);
          eachPromise(r.response, function(people, p_index) {
            console.log('callback', people);
            loader.innerText = parseInt(((index * 800 + p_index) / (users.length - 1)) * 10000) / 100 + '%';
            if (people.city) {
              //csvData.push(people.first_name + ' ' + people.last_name + ',' + people.city.title);
              //return Promise.resolve();
              return getCoordinates(people.city.title).then(function(location) {
                console.log('location', location);
                people.location = location;
                var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(location[0], location[1]),
                  map: map,
                  icon: people.photo_50,
                  title: "TEST" //people.first_name + ' ' + people.last_name
                });
                console.log(index * 800 , p_index);

                loader.innerText = parseInt(((index * 800 + p_index) / (users.length - 1)) * 10000) / 100 + '%';

                markers.push(marker);
                //TODO: add coordinates to map as heatmap
                return Promise.resolve();
              }, function() {
                return Promise.resolve();
              });
            } else {
              return Promise.resolve();
            }
          }).then(function() {
            console.log('final detect coordinates');
            if (index < chunks.length - 1)  {
              setTimeout(function() {
                getMembersInfo(index + 1).then(function() {
                  resolve();
                });
              }, 334);
            } else {
              resolve();
            }
          });

        } else {
          rejected();
        }
      });
    });
  }
  return getMembersInfo(0).then(function() {
    //downloadCSV();
    loader.innerText = '';
  });
}

VK.init({
  apiId: 5447857
});

//function downloadCSV() {
//  var csvString = csvData.join("\n");
//  var a         = document.createElement('a');
//  a.href        = 'data:text/csv;charset=utf-8;base64,' +  Base64.encode(csvString);
//  a.target      = '_blank';
//  a.download    = 'download.csv';
//
//  document.body.appendChild(a);
//  a.click();
//}

function authInfo(response) {
  console.log('authInfo');
  if (response.session) {
    $.get('VkGroupMembers_20160504_68100.txt', function(res) {
      var membersList = res.toString().split('\n');
      console.log('membersList');
      getMembers(membersList);
    });

    $('.auth').hide();
  } else {
    $('.auth').show();
  }
}
VK.Auth.getLoginStatus(authInfo);
VK.UI.button('login_button');
