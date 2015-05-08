class RecoveryDashboardCtrl
  constructor: ($scope, $http, olData, olHelpers, layerListModel, styleHelper) ->
    $scope.hideMetadata = () ->
      this.layer.metadata.show = false
    $scope.showMetadata = () ->
      this.layer.metadata.show = true
    $scope.toggleVisibility = ->
      this.layer.visible = this.layer.displayed
    $scope.toggleDisplayed = ->
      this.layer.displayed = !this.layer.displayed
      this.layer.visible = this.layer.displayed
    $scope.styleHelper = styleHelper
    $scope.changeStyle = () ->
      this.layer.style = $scope.styleHelper[this.styleOptions.styleParam]
    angular.extend($scope, {
      defaults: {
        scrollWheelZoom: false
        events: {
          layers: [ 'mousemove', 'click' ]
        }
      }
      nepal: {
        lat: 27.7
        lon: 85.3
        zoom: 7
      }
      layers: layerListModel.list
    })
    olData.getMap().then( (map) ->
      overlay = new ol.Overlay({
                      element: document.getElementById('popup'),
                      positioning: 'bottom-center',
                      offset: [3, -25],
                      position: [0, 0]
      })
      showPopup = (event, feature, olEvent) ->
        pixel = map.getEventPixel(olEvent.originalEvent)
        layer = map.forEachLayerAtPixel(pixel, (layer) -> layer)
        $scope.$apply((scope) ->
          $scope.properties = if feature then feature.getProperties() else {}
          $scope.name = layer.get('name')
          layerData = _.find(scope.layerList, {name: $scope.name })
          $scope.sourceType = layerData.metadata.source
        )
        overlayHidden = true
        unless feature
          map.removeOverlay(overlay)
          overlayHidden = true
        else
          if overlayHidden
            map.addOverlay(overlay)
            overlayHidden = false
        overlay.setPosition(map.getEventCoordinate(olEvent))

      $scope.$on('openlayers.layers.medical.click',showPopup)
      $scope.$on('openlayers.layers.roads.click',showPopup)
    )
    $scope.layerGroups = layerListModel.layerGroups
    $scope.layerList = layerListModel.list

RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers', 'layerListModel', 'styleHelper']
window.dashboard.controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl)
