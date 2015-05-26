(function() {
  angular.module('dashboard').service('layerListService', [
    '$rootScope', 'layerListModel', function($rootScope, layerListModel) {
      var allLayers, collectCombinedLayers, collectLayers;
      collectCombinedLayers = function(groups) {
        return _.collect(groups, function(group) {
          return collectLayers(group.combinedLayers);
        });
      };
      collectLayers = function(groups) {
        return _.collect(groups, function(group) {
          return group.layers;
        });
      };
      allLayers = function(groups) {
        return _.unique(_.flatten([collectLayers(groups), collectCombinedLayers(groups), layerListModel.baseLayer])).reverse();
      };
      this.list = allLayers(layerListModel.layerGroups);
      this.layerGroups = layerListModel.layerGroups;
      return this;
    }
  ]);

}).call(this);
