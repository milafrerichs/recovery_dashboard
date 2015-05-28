angular.module('dashboard').directive 'infoWindow', ['olData', '$cacheFactory', (olData, $cacheFactory) ->
  return {
    restrict: 'E'
    scope: {
      class: '@'
      showValue: '@'
      header: '@'
      showProperty: '='
    }
    transclude: true
    replace: true
    template: '<div class="{{class}}" ng-show="show"><h4>{{header}} <a class="close" ng-click="hideOverlay()">x</a></h4><div class="content"><div ng-transclude></div></div></div>'
    link: (scope, element, attr) ->
      scope.$watch 'showProperty', (value) ->
        scope.show = value == attr.showValue
      scope.hideOverlay = ->
        olData.getMap().then (map) ->
          overlayCache = $cacheFactory.get('overlayCache')
          overlay = overlayCache.get('overlay')
          map.removeOverlay(overlay)
      return
  }
]
