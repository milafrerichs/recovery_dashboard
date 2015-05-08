(function() {
  var SidebarCtrl;

  SidebarCtrl = (function() {
    function SidebarCtrl($scope) {
      $scope.show = false;
      $scope.toggleSidebar = function() {
        return $scope.show = !$scope.show;
      };
    }

    return SidebarCtrl;

  })();

  SidebarCtrl.$inject = ['$scope'];

  window.dashboard.controller('SidebarCtrl', SidebarCtrl);

}).call(this);
