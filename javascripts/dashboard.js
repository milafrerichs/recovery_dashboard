(function() {
  var RecoveryDashboardCtrl;

  window.dashboard = angular.module("dashboard", ["openlayers-directive"]);

  RecoveryDashboardCtrl = (function() {
    function RecoveryDashboardCtrl($scope, $http, olData, olHelpers) {
      var hotosmLayer, medicalLayer, roadsLayer;
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
      hotosmLayer = {
        name: 'HOTOSM',
        active: true,
        opacity: 0.5,
        source: {
          type: 'OSM',
          url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }
      };
      roadsLayer = {
        name: 'roads',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'data/main_roads.geojson'
        },
        metadata: {
          name: "Main roads",
          source: "OSM"
        }
      };
      medicalLayer = {
        name: 'medical',
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
      angular.extend($scope, {
        defaults: {
          scrollWheelZoom: false,
          events: {
            layers: ['mousemove', 'click']
          }
        },
        nepal: {
          lat: 27.7,
          lon: 85.3,
          zoom: 7
        },
        layers: [medicalLayer, roadsLayer, hotosmLayer]
      });
      $scope.layerGroups = [
        {
          name: "Health",
          layers: [medicalLayer]
        }, {
          name: "Infrastructure",
          layers: [roadsLayer]
        }
      ];
    }

    return RecoveryDashboardCtrl;

  })();

  RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers'];

  window.dashboard.controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl);

}).call(this);
