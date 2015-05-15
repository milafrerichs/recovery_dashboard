class RecoveryDashboardCtrl
  constructor: ($scope, $http, olData, olHelpers, layerListService, styleHelper) ->
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
    $scope.showGroup = ->
      activateGroup = this.group
      _.each $scope.layerGroups, (group) ->
        if group is activateGroup
          group.active = true
        else
          group.active = false

    angular.extend($scope, {
      defaults: {
        scrollWheelZoom: false
        events: {
          layers: [ 'mousemove', 'click' ]
          map: [ 'singleclick', 'pointermove' ]
        }
      }
      nepal: {
        lat: 27.7
        lon: 85.3
        zoom: 7
      }
      layers: layerListService.list
    })
    olData.getMap().then( (map) ->
      overlay = new ol.Overlay({
                      element: document.getElementById('popup'),
                      positioning: 'bottom-center',
                      offset: [3, -25],
                      position: [0, 0]
      })
      getFeatureInfo = (event, data) ->
        pixel = map.getEventPixel(data.event.originalEvent)
        layer = map.forEachLayerAtPixel(pixel,((layer) -> layer), map, (layer) -> layer.get('name') is 'poverty')
        if layer && not $scope.overlayLock
          viewResolution = map.getView().getResolution()
          coordinate = data.coord
          url = layer.getSource().getGetFeatureInfoUrl(coordinate, viewResolution, 'EPSG:3857',
                {'INFO_FORMAT': 'application/json'})
          $http.get(url).success (feature) ->
            $scope.name = 'poverty'
            $scope.properties = if feature then feature.features[0].properties else {}
            $scope.sourceType = 'worldbank'
            overlayHidden = true
            if feature.features.length < 1
              map.removeOverlay(overlay)
              overlayHidden = true
            else
              if overlayHidden
                map.addOverlay(overlay)
                overlayHidden = false
                $scope.overlayLock = true
            overlay.setPosition(coordinate)
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
            $scope.overlayLock = true
        overlay.setPosition(map.getEventCoordinate(olEvent))
      pointerMove = (event, data) ->
        $scope.overlayLock = false

      $scope.$on('openlayers.layers.medical.click',showPopup)
      $scope.$on('openlayers.layers.medical.mousemove',pointerMove)
      $scope.$on('openlayers.map.singleclick',getFeatureInfo)
      $scope.$on('openlayers.map.pointermove',pointerMove)
    )
    $scope.layerGroups = layerListService.layerGroups
    $scope.layerList = layerListService.list

RecoveryDashboardCtrl.$inject = ['$scope', '$http', 'olData', 'olHelpers', 'layerListService', 'styleHelper']
angular.module('dashboard').controller("RecoveryDashboardCtrl", RecoveryDashboardCtrl)
