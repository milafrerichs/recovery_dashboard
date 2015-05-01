window.dashboard = angular.module("dashboard", ["openlayers-directive"])

class RecoveryDashboardCtrl
  constructor: ($scope, $http, olData, olHelpers) ->
    $scope.hideMetadata = () ->
      this.layer.metadata.show = false
    $scope.showMetadata = () ->
      this.layer.metadata.show = true
    $scope.toggleVisibility = ->
      this.layer.visible = this.layer.displayed
    $scope.toggleDisplayed = ->
      this.layer.displayed = !this.layer.displayed
      this.layer.visible = this.layer.displayed
    hotosmLayer= {
          name: 'HOTOSM',
          active: true,
          opacity: 0.5,
          source: {
            type: 'OSM',
            url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          }
    }
    allRoadsLayer = {
          name: 'roads',
          active: true,
          displayed: true,
          source: {
            type: 'GeoJSON',
            url: 'http://nepal.piensa.co/data/all_roads.json'
          }
          metadata: {
            name: "Main roads"
            source: "OSM"
          }
        }
    roadsLayer = {
          name: 'roads',
          active: true,
          displayed: true,
          source: {
            type: 'GeoJSON',
            url: 'data/main_roads.geojson'
          }
          metadata: {
            name: "Main roads"
            source: "OSM"
          }
        }
    medicalLayer = {
          name: 'medical',
          active: true,
          displayed: true,
          source: {
            type: 'GeoJSON',
            url: 'data/medical.geojson'
          }
          metadata: {
            name: "Medical facilities"
            source: "OSM"
          }
        }
    angular.extend($scope, {
      defaults: {
        scrollWheelZoom: false
        events: {
          layers: [ 'mousemove', 'click' ]
        }
      }
      nepal: {
        lat: 27.7
        lon: 85.3
        zoom: 7
      }
      layers: [ medicalLayer, roadsLayer, allRoadsLayer, hotosmLayer]
    })
    $scope.layerGroups = [
      {
        name: "Health"
        layers: [
          medicalLayer
        ]
      }
      {
        name: "Infrastructure"
        layers: [
          roadsLayer
        ]
      }
    ]

RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers']
window.dashboard.controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl)
