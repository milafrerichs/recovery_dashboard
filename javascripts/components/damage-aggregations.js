(function() {
  angular.module('dashboard').factory('damageAggregationService', [
    '$q', 'geoJSONService', function($q, geoJSONService) {
      var getLayer;
      getLayer = function() {
        var adminLevelUrl, dataUrl, layerPromise;
        adminLevelUrl = 'data/admin_level_3.geojson';
        dataUrl = 'data/all0501p.geojson';
        layerPromise = $q.defer();
        $q.all([geoJSONService.getGeoJSON(adminLevelUrl), geoJSONService.getGeoJSON(dataUrl)]).then(function(responses) {
          var adminLevel, data, destroyed;
          adminLevel = responses[0];
          data = responses[1];
          destroyed = geoJSONService.getGeoJSONWithKeyValue(data, 'all', '1');
          return layerPromise.resolve(geoJSONService.vectorLayerWithGeoJSON(adminLevel));
        });
        return layerPromise.promise;
      };
      return {
        layer: getLayer()
      };
    }
  ]);

}).call(this);
