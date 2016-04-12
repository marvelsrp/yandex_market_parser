// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/',  {
      templateUrl:'This is the default Route',
      controller: DeletePostCtrl
    })
    .when('/computers',{template:'This is the computers Route'})
    .when('/printers',{template:'This is the printers Route'})
    .otherwise({redirectTo:'/'});
  //$routeProvider.otherwise({redirectTo: '/'});
}]);
