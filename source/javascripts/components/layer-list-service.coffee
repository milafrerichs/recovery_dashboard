angular.module('dashboard').service('layerListService', ['$rootScope', 'layerListModel', ($rootScope, layerListModel) ->
  collectCombinedLayers = (groups) ->
    _.collect(groups, (group) -> collectLayers(group.combinedLayers))

  collectLayers = (groups) ->
    _.collect(groups, (group) -> group.layers)

  allLayers = (groups)->
    _.unique(_.flatten([collectLayers(groups),collectCombinedLayers(groups), layerListModel.baseLayer])).reverse()

  this.list = allLayers(layerListModel.layerGroups)
  this.layerGroups = layerListModel.layerGroups
  return this
])
