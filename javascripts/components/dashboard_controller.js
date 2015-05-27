(function() {
  var RecoveryDashboardCtrl;

  RecoveryDashboardCtrl = (function() {
    function RecoveryDashboardCtrl($scope, $http, olData, olHelpers, layerListService, styleHelper) {
      $scope.minify = true;
      $scope.hideMetadata = function() {
        return $scope.metadata.show = false;
      };
      $scope.toggleMetadata = function() {
        if (this.combinedLayer) {
          this.combinedLayer.metadata.show = !this.combinedLayer.metadata.show;
          $scope.metadata = this.combinedLayer.metadata;
        }
        if (this.layer) {
          this.layer.metadata.show = !this.layer.metadata.show;
          return $scope.metadata = this.layer.metadata;
        }
      };
      $scope.toggleVisibility = function() {
        return this.layer.visible = this.layer.displayed;
      };
      $scope.toggleDisplayed = function() {
        this.layer.displayed = !this.layer.displayed;
        return this.layer.visible = this.layer.displayed;
      };
      $scope.resetCombinedLayers = function() {
        var displayed;
        displayed = this.combinedLayer.displayed;
        return _.each(this.combinedLayer.layers, function(layer) {
          return layer.visible = displayed;
        });
      };
      $scope.showCombinedLayers = function() {
        return _.each(this.combinedLayer.layers, function(layer) {
          return layer.visible = true;
        });
      };
      $scope.toggleCombinedDisplayed = function() {
        var displayed;
        this.combinedLayer.displayed = !this.combinedLayer.displayed;
        displayed = this.combinedLayer.displayed;
        return _.each(this.combinedLayer.layers, function(layer) {
          layer.visible = displayed;
          return layer.displayed = displayed;
        });
      };
      $scope.styleHelper = styleHelper;
      $scope.changeStyle = function() {
        return this.layer.style = $scope.styleHelper[this.styleOptions.styleParam];
      };
      $scope.showGroup = function() {
        var activateGroup;
        activateGroup = this.group;
        return _.each($scope.layerGroups, function(group) {
          if (group === activateGroup) {
            return group.active = true;
          } else {
            return group.active = false;
          }
        });
      };
      angular.extend($scope, {
        defaults: {
          scrollWheelZoom: false,
          events: {
            layers: ['mousemove', 'click'],
            map: ['singleclick', 'pointermove']
          }
        },
        nepal: {
          lat: 27.7,
          lon: 85.3,
          zoom: 7
        },
        layers: layerListService.list
      });
      olData.getMap().then(function(map) {
        var getFeatureInfo, overlay, pointerMove, showPopup;
        overlay = new ol.Overlay({
          element: document.getElementById('popup'),
          positioning: 'bottom-center',
          offset: [3, -25],
          position: [0, 0]
        });
        getFeatureInfo = function(event, data) {
          var coordinate, layer, pixel, url, viewResolution;
          pixel = map.getEventPixel(data.event.originalEvent);
          layer = map.forEachLayerAtPixel(pixel, (function(layer) {
            return layer;
          }), map, function(layer) {
            return layer.get('name') === 'poverty' || layer.get('name') === 'db-admin';
          });
          if (layer && !$scope.overlayLock) {
            viewResolution = map.getView().getResolution();
            coordinate = data.coord;
            url = layer.getSource().getGetFeatureInfoUrl(coordinate, viewResolution, 'EPSG:3857', {
              'INFO_FORMAT': 'application/json'
            });
            return $http.get(url).success(function(feature) {
              var overlayHidden;
              $scope.name = layer.get('name');
              $scope.properties = feature ? feature.features[0].properties : {};
              $scope.sourceType = 'worldbank';
              overlayHidden = true;
              if (feature.features.length < 1) {
                map.removeOverlay(overlay);
                overlayHidden = true;
              } else {
                if (overlayHidden) {
                  map.addOverlay(overlay);
                  overlayHidden = false;
                  $scope.overlayLock = true;
                }
              }
              return overlay.setPosition(coordinate);
            });
          }
        };
        showPopup = function(event, feature, olEvent) {
          var layer, overlayHidden, pixel;
          pixel = map.getEventPixel(olEvent.originalEvent);
          layer = map.forEachLayerAtPixel(pixel, function(layer) {
            return layer;
          });
          $scope.$apply(function(scope) {
            var layerData;
            $scope.properties = feature ? feature.getProperties() : {};
            $scope.name = layer.get('name');
            layerData = _.find(scope.layerList, {
              name: $scope.name
            });
            return $scope.sourceType = layerData.metadata.source;
          });
          overlayHidden = true;
          if (!feature) {
            map.removeOverlay(overlay);
            overlayHidden = true;
          } else {
            if (overlayHidden) {
              map.addOverlay(overlay);
              overlayHidden = false;
              $scope.overlayLock = true;
            }
          }
          return overlay.setPosition(map.getEventCoordinate(olEvent));
        };
        pointerMove = function(event, data) {
          return $scope.overlayLock = false;
        };
        $scope.$on('openlayers.layers.medical.click', showPopup);
        $scope.$on('openlayers.layers.medical.mousemove', pointerMove);
        $scope.$on('openlayers.map.singleclick', getFeatureInfo);
        return $scope.$on('openlayers.map.pointermove', pointerMove);
      });
      $scope.layerGroups = layerListService.layerGroups;
      $scope.layerList = layerListService.list;
    }

    return RecoveryDashboardCtrl;

  })();

  RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers', 'layerListService', 'styleHelper'];

  angular.module('dashboard').controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl);

}).call(this);
