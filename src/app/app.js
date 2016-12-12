'use strict';

angular.module('devManager', [
  'ngRoute',
  'dashboard',
  'xeditable'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo:'/dashboard'});
}]).
run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});;
