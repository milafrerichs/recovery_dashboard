class SidebarCtrl
  constructor: ($scope) ->
    $scope.show = false
    $scope.toggleSidebar = ->
      $scope.show = !$scope.show

SidebarCtrl.$inject = ['$scope']
angular.module('dashboard').controller('SidebarCtrl', SidebarCtrl)

