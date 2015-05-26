(function() {
  angular.module('dashboard').service('mapPopup', [
    'olData', '$http', function(olData, $http) {
      var getFeatureInfo, getOverlay, pointerMove;
      this.popup = {
        name: '',
        properties: {},
        sourceType: '',
        overlayLock: false,
        getFeatureInfo: null,
        pointerMove: null,
        overlay: null,
        coordinates: null,
        overlayHidden: true
      };
      pointerMove = (function(_this) {
        return function(event, data) {
          return _this.popup.overlayLock = false;
        };
      })(this);
      getFeatureInfo = (function(_this) {
        return function(event, data) {
          var that;
          that = _this;
          return olData.getMap().then(function(map) {
            var layer, pixel, url, viewResolution;
            that.popup.overlay = getOverlay();
            pixel = map.getEventPixel(data.event.originalEvent);
            layer = map.forEachLayerAtPixel(pixel, (function(layer) {
              return layer;
            }), map, function(layer) {
              return layer.get('name') === 'poverty' || layer.get('name') === 'db-admin';
            });
            if (layer && !that.popup.overlayLock) {
              viewResolution = map.getView().getResolution();
              that.popup.coordinates = data.coord;
              url = layer.getSource().getGetFeatureInfoUrl(that.popup.coordinates, viewResolution, 'EPSG:3857', {
                'INFO_FORMAT': 'application/json'
              });
              return $http.get(url).success((function(_this) {
                return function(feature) {
                  var overlay;
                  overlay = getOverlay();
                  if (!feature) {
                    map.removeOverlay(overlay);
                    that.popup.overlayHidden = true;
                  } else {
                    if (that.popup.overlayHidden) {
                      that.popup.overlayHidden = false;
                      that.popup.overlayLock = true;
                      map.addOverlay(overlay);
                    }
                  }
                  that.popup.name = layer.get('name');
                  that.popup.properties = feature ? feature.features[0].properties : {};
                  that.popup.sourceType = 'worldbank';
                  return overlay.setPosition(that.popup.coordinates);
                };
              })(this));
            }
          });
        };
      })(this);
      getOverlay = (function(_this) {
        return function() {
          if (!_this.popup.overlay) {
            _this.popup.overlay = new ol.Overlay({
              element: document.getElementById('popup'),
              positioning: 'bottom-center',
              offset: [3, -25],
              position: [0, 0]
            });
          }
          return _this.popup.overlay;
        };
      })(this);
      this.popup.getFeatureInfo = getFeatureInfo;
      this.popup.pointerMove = pointerMove;
      return this.popup;
    }
  ]);

}).call(this);
