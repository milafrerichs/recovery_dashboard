angular.module('dashboard').directive 'infoWindow', ->
  return {
    restrict: 'E'
    scope: {
      class: '@'
      name: '@'
      header: '@'
    }
    transclude: true
    replace: true
    template: '<div class="{{class}}" ng-show="name==\'{{name}}\'"><h4>{{header}}</h4><div class="content"><div ng-transclude></div></div></div>'
  }
