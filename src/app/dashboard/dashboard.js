// Thanks to http://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects
var sortByKey = function (array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

angular.module('dashboard', ['resources.devices', 'filters.formatting'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve:{
      devices: ['Devices', function (Devices) {
        return Devices.all();
      }]
    }
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', 'devices', function ($scope, $location, devices) {
  $scope.devices = devices;
}])

.directive('topDevices', function() {
  return {
    restrict: 'E',
    scope: true,
    link: function(scope, element, attrs) {
      scope.kpi = attrs.name;
      scope.key = attrs.sortBy;
      scope.devices = sortByKey(scope.devices.slice(), scope.key).reverse().slice(0, 5);
      scope.hasBytes = attrs.hasBytes;
    },
    templateUrl: 'app/dashboard/top-devices.html'
  };
});
