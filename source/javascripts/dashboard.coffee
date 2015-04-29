dashboard = angular.module("dashboard", ["openlayers-directive"])

dashboard.controller("RecoveryDashboardCtrl", [ '$http','$scope', ($http, $scope) ->
  mapboxLayer = {
        name: 'Mapbox',
        active: true,
        opacity: 0.5,
        source: {
          type: 'TileJSON',
          url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
        }
      }
  medicalLayer = {
        name: 'Medical',
        active: true,
        source: {
          type: 'GeoJSON',
          url: 'data/medical.geojson'
        }
      }
  roadsLayer = {
        name: 'Roads',
        active: true,
        visible: false
        source: {
          type: 'GeoJSON',
          url: 'data/main_roads.geojson'
        }
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({color: 'red', width: 2})
        })
      }
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
  angular.extend($scope, {
    defaults: {
      scrollWheelZoom: false
    }
    nepal: {
      lat: 27.7
      lon: 85.3
      zoom: 7
    }
    layers: [ medicalLayer, roadsLayer, mapboxLayer ]
  })
])
