(function() {
  angular.module('dashboard').service('layerListService', [
    '$rootScope', 'layerListModel', function($rootScope, layerListModel) {
      this.list = _.unique(_.flatten([
        _.collect(layerListModel.layerGroups, function(group) {
          return group.layers;
        }).reverse(), layerListModel.baseLayer
      ])).reverse();
      this.layerGroups = layerListModel.layerGroups;
      return this;
    }
  ]);

}).call(this);
