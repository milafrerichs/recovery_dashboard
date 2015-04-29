(function() {
  var dashboard;

  dashboard = angular.module("dashboard", ["openlayers-directive"]);

  dashboard.controller("RecoveryDashboardCtrl", [
    '$http', '$scope', function($http, $scope) {
      var mapboxLayer, medicalLayer, roadsLayer;
      $scope.hideMetadata = function() {
        return this.layer.metadata.show = false;
      };
      $scope.showMetadata = function() {
        return this.layer.metadata.show = true;
      };
      $scope.toggleVisibility = function() {
        return this.layer.visible = this.layer.displayed;
      };
      $scope.toggleDisplayed = function() {
        this.layer.displayed = !this.layer.displayed;
        return this.layer.visible = this.layer.displayed;
      };
      mapboxLayer = {
        name: 'Mapbox',
        active: true,
        opacity: 0.5,
        source: {
          type: 'TileJSON',
          url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
        }
      };
      medicalLayer = {
        name: 'Medical',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'data/medical.geojson'
        },
        metadata: {
          name: "Medical facilities",
          source: "OSM"
        }
      };
      roadsLayer = {
        name: 'Roads',
        active: true,
        visible: false,
        displayed: false,
        source: {
          type: 'GeoJSON',
          url: 'data/main_roads.geojson'
        },
        metadata: {
          name: "Main Roads",
          source: "OSM"
        },
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
          })
        })
      };
      $scope.layerGroups = [
        {
          name: "Health",
          layers: [medicalLayer]
        }, {
          name: "Infrastructure",
          layers: [roadsLayer]
        }
      ];
      angular.extend($scope, {
        defaults: {
          scrollWheelZoom: false
        },
        nepal: {
          lat: 27.7,
          lon: 85.3,
          zoom: 7
        },
        layers: [medicalLayer, roadsLayer, mapboxLayer]
      });
      return $scope.visibleLayers = [medicalLayer];
    }
  ]);

}).call(this);
