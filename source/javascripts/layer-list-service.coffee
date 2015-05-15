angular.module('dashboard').service('layerListService', ['$rootScope', 'layerListModel', ($rootScope, layerListModel) ->
    this.list = _.unique(_.flatten([_.collect(layerListModel.layerGroups, (group) -> group.layers).reverse(),layerListModel.baseLayer])).reverse()
    this.layerGroups = layerListModel.layerGroups
    return this
])
