angular.module('dashboard').directive 'infoWindow', ->
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
    template: '<div class="{{class}}" ng-show="show"><h4>{{header}}</h4><div class="content"><div ng-transclude></div></div></div>'
    link: (scope, element, attr) ->
      scope.$watch 'showProperty', (value) ->
        scope.show = value == attr.showValue
      return
  }
