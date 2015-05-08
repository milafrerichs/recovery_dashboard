(function() {
  var RecoveryDashboardCtrl;

  RecoveryDashboardCtrl = (function() {
    function RecoveryDashboardCtrl($scope, $http, olData, olHelpers, layerListModel, styleHelper) {
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
      $scope.styleHelper = styleHelper;
      $scope.changeStyle = function() {
        return this.layer.style = $scope.styleHelper[this.styleOptions.styleParam];
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
        layers: layerListModel.list
      });
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
      $scope.layerGroups = layerListModel.layerGroups;
      $scope.layerList = layerListModel.list;
    }

    return RecoveryDashboardCtrl;

  })();

  RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers', 'layerListModel', 'styleHelper'];

  window.dashboard.controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl);

}).call(this);
