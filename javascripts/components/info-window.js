(function() {
  angular.module('dashboard').directive('infoWindow', [
    'olData', '$cacheFactory', function(olData, $cacheFactory) {
      return {
        restrict: 'E',
        scope: {
          "class": '@',
          showValue: '@',
          header: '@',
          showProperty: '='
        },
        transclude: true,
        replace: true,
        template: '<div class="{{class}}" ng-show="show"><h4>{{header}} <a class="close" ng-click="hideOverlay()">x</a></h4><div class="content"><div ng-transclude></div></div></div>',
        link: function(scope, element, attr) {
          scope.$watch('showProperty', function(value) {
            return scope.show = value === attr.showValue;
          });
          scope.hideOverlay = function() {
            return olData.getMap().then(function(map) {
              var overlay, overlayCache;
              overlayCache = $cacheFactory.get('overlayCache');
              overlay = overlayCache.get('overlay');
              return map.removeOverlay(overlay);
            });
          };
        }
      };
    }
  ]);

}).call(this);
