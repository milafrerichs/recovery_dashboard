class SidebarCtrl
  constructor: ($scope) ->
    $scope.show = false
    $scope.toggleSidebar = ->
      $scope.show = !$scope.show

SidebarCtrl.$inject = ['$scope']
window.dashboard.controller('SidebarCtrl', SidebarCtrl)

