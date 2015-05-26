(function() {
  angular.module('dashboard').service('olHelper', [
    '$q', 'olData', '$http', function($q, olData, $http) {
      var createOverlay, getActiveLayerForEvent, getFeatureFromUrl, getGetFeatureInfoUrlForEvent;
      createOverlay = function(element, pos, offset, position) {
        if (pos == null) {
          pos = 'bottom-center';
        }
        if (offset == null) {
          offset = [3, -25];
        }
        if (position == null) {
          position = [0, 0];
        }
        return new ol.Overlay({
          element: document.getElementById(element),
          positioning: pos,
          offset: [3, -25],
          position: [0, 0]
        });
      };
      getActiveLayerForEvent = function(event) {
        var layer;
        layer = $q.defer();
        olData.getMap().then(function(map) {
          var pixel;
          pixel = map.getEventPixel(event);
          return layer.resolve(map.forEachLayerAtPixel(pixel, (function(layer) {
            return layer;
          }), map, function(layer) {
            return layer.get('name') === 'poverty' || layer.get('name') === 'db-admin';
          }));
        });
        return layer.promise;
      };
      getGetFeatureInfoUrlForEvent = function(layer, coordinates) {
        var url;
        url = $q.defer();
        olData.getMap().then(function(map) {
          var viewResolution;
          viewResolution = map.getView().getResolution();
          return url.resolve(layer.getSource().getGetFeatureInfoUrl(coordinates, viewResolution, 'EPSG:3857', {
            'INFO_FORMAT': 'application/json'
          }));
        });
        return url.promise;
      };
      getFeatureFromUrl = function(url) {
        var feature;
        feature = $q.defer();
        $http.get(url).success(function(response) {
          return feature.resolve(response);
        });
        return feature.promise;
      };
      return {
        overlay: createOverlay,
        getActiveLayerForEvent: getActiveLayerForEvent,
        getGetFeatureInfoUrlForEvent: getGetFeatureInfoUrlForEvent,
        getFeatureFromUrl: getFeatureFromUrl
      };
    }
  ]);

}).call(this);
