app = angular.module("dashboard", ["openlayers-directive"])

app.controller("RecoveryDashboardCtrl", [ '$scope', '$http', 'olData', 'olHelpers', function($scope, $http, olData, olHelpers) {
  angular.extend($scope, {
    defaults: {
      scrollWheelZoom: false,
      events: {
        layers: [ 'mousemove', 'click' ]
      }
    },
    medicalLayer: {
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
    },
    hotosmLayer: {
        name: 'HOTOSM',
        active: true,
        opacity: 0.5,
        source: {
          type: 'OSM',
          url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }
    },
    nepal: {
      lat: 27.7,
      lon: 85.3,
      zoom: 7
    },
  });
  olData.getMap().then(function(map){ 
    "test"
    debugger
  })
}]);
