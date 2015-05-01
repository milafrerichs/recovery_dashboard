(function() {
  var RecoveryDashboardCtrl;

  window.dashboard = angular.module("dashboard", ["openlayers-directive"]);

  RecoveryDashboardCtrl = (function() {
    function RecoveryDashboardCtrl($scope, $http, olData, olHelpers) {
      var allRoadsLayer, hotosmLayer, medicalLayer, policeLayer, roadsLayer, schoolLayer, tracksLayer, trainStationsLayer;
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
      schoolLayer = {
        name: 'school',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/schools_point.json'
        },
        metadata: {
          name: "Schools",
          source: "OSM"
        },
        style: {
          image: {
            icon: {
              src: 'images/icons/school-12.png'
            },
            stroke: {
              color: "#000000",
              width: 3
            }
          }
        }
      };
      policeLayer = {
        name: 'police',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/police_stations.json'
        },
        metadata: {
          name: "Police stations",
          source: "OSM"
        },
        style: {
          image: {
            icon: {
              src: 'images/icons/police-12.png'
            }
          }
        }
      };
      trainStationsLayer = {
        name: 'train_stations',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/train_stations.json'
        },
        metadata: {
          name: "Train stations",
          source: "OSM"
        },
        style: {
          image: {
            icon: {
              src: 'images/icons/rail-12.png'
            }
          }
        }
      };
      tracksLayer = {
        name: 'tracks',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/tracks.json'
        },
        metadata: {
          name: "Tracks",
          source: "OSM"
        }
      };
      allRoadsLayer = {
        name: 'roads',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/all_roads.json'
        },
        metadata: {
          name: "All roads",
          source: "OSM"
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
        style: {
          image: {
            icon: {
              src: 'images/icons/hospital-12.png'
            }
          }
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
        layers: [medicalLayer, roadsLayer, allRoadsLayer, trainStationsLayer, hotosmLayer, tracksLayer, policeLayer, schoolLayer]
      });
      $scope.layerGroups = [
        {
          name: "Health",
          layers: [medicalLayer]
        }, {
          name: "Infrastructure",
          layers: [roadsLayer, allRoadsLayer, trainStationsLayer, tracksLayer]
        }, {
          name: "Public Facilities",
          layers: [policeLayer, schoolLayer]
        }
      ];
      olData.getMap().then(function(map) {
        var overlay, showPopup;
        overlay = new ol.Overlay({
          element: document.getElementById('popup'),
          positioning: 'bottom-center',
          offset: [3, -25],
          position: [0, 0]
        });
        showPopup = function(event, feature, olEvent) {
          var overlayHidden;
          $scope.$apply(function(scope) {
            return $scope.properties = feature ? feature.getProperties() : {};
          });
          overlayHidden = true;
          if (!feature) {
            map.removeOverlay(overlay);
            overlayHidden = true;
          } else {
            if (overlayHidden) {
              map.addOverlay(overlay);
              overlayHidden = false;
            }
          }
          return overlay.setPosition(map.getEventCoordinate(olEvent));
        };
        $scope.$on('openlayers.layers.medical.click', showPopup);
        return $scope.$on('openlayers.layers.roads.click', showPopup);
      });
    }

    return RecoveryDashboardCtrl;

  })();

  RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers'];

  window.dashboard.controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl);

}).call(this);
