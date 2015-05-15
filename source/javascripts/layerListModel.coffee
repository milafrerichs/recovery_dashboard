angular.module('dashboard').service('layerListModel', ['$rootScope', 'styleHelper', ($rootScope, styleHelper) ->
  hotosmLayer= {
    name: 'HOTOSM',
    active: true,
    index: 0
    source: {
      type: 'OSM',
      url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }
  }
  povertyLayer = {
    name: 'poverty',
    active: true,
    displayed: true,
    index: 1
    source: {
      type: 'TopoJSON',
      url: 'data/poverty.json'
    }
    style: styleHelper.povertyAvgStyle
    selectedStyle: "povertyAvgStyle"
    styleOptions: [
      {
        styleName: "Avg Poor"
        styleParam: "povertyAvgStyle"
      }
      {
        styleName: "Absolute # of Poor"
        styleParam: "povertyAbsStyle"
      }
    ]
    metadata: {
      name: "Poverty Levels"
      source: "Worldbank"
    }
  }
  schoolPolygonLayer = {
    name: 'school-polygon',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'GeoJSON',
      url: 'http://nepal.piensa.co/data/schools_polygon.json'
    }
    metadata: {
      name: "School Polygons"
      source: "OSM"
    }
    style: styleHelper.schoolPolygonStyle
  }
  trainStationsLayer = {
    name: 'train_stations',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'GeoJSON',
      url: 'http://nepal.piensa.co/data/train_stations.json'
    }
    metadata: {
      name: "Train stations"
      source: "OSM"
    }
    style: {
      image: {
        icon: {
          src: 'images/icons/rail-12.png'
        }
      }
    }
  }
  roadsLayer = {
    name: 'roads',
    active: true,
    displayed: true,
    source: {
      type: 'GeoJSON',
      url: 'http://nepal.piensa.co/data/main_roads.json'
    }
    metadata: {
      name: "Main roads"
      source: "OSM"
    }
    style: {
      stroke: {
        color: '#E0D6B2'
        width: 2
      }
    }
  }
  medicalPolygonLayer = {
    name: 'medicalpolygon',
    active: true,
    displayed: true,
    source: {
      type: 'GeoJSON',
      url: 'http://nepal.piensa.co/data/medical_polygon.json'
    }
    metadata: {
      name: "Medical facilities Polygons"
      source: "OSM"
    }
    style: styleHelper.medicalPolygonStyle
  }
  medicalLayer = {
    name: 'medical',
    active: true,
    displayed: true,
    source: {
      type: 'GeoJSON',
      url: 'http://nepal.piensa.co/data/medical_point.json'
    }
    style: styleHelper.medicalStyle
    metadata: {
      name: "Medical facilities"
      source: "OSM"
    }
  }
  schoolLayer = {
    name: 'school',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'GeoJSON',
      url: 'http://nepal.piensa.co/data/schools_point.json'
    }
    metadata: {
      name: "Schools"
      source: "OSM"
    }
    style: styleHelper.schoolStyle
  }
  mediaLayer = {
    name: 'media-layer',
    active: true,
    displayed: true,
    source: {
      type: 'GeoJSON',
      url: 'data/media.geojson'
    }
    style: (feature, resolution) ->
      debugger
    metadata: {
      name: "Mainstream Media text"
      source: "Worldbank"
    }
  }
  landslideLayer = {
    name: 'landslides',
    active: true,
    displayed: true,
    source: {
      type: 'GeoJSON',
      url: 'data/landslides.geojson'
    }
    metadata: {
      name: "Landslides"
      source: "Worldbank"
    }
  }
  damagedBuildingsLayer = {
    name: 'damagedBuildings',
    active: true,
    displayed: true,
    source: {
      type: 'GeoJSON',
      url: 'data/buildings.geojson'
    }
    metadata: {
      name: "Damages Buildings"
      source: "Worldbank"
    }
  }
  this.layerGroups = [
    {
      name: "Poverty"
      layers: [
        povertyLayer
      ]
    }
    {
      name: "Media"
      layers: [
        mediaLayer
      ]
    }
    {
      name: "Infrastructure"
      layers: [
        roadsLayer
        trainStationsLayer
      ]
    }
    {
      name: "Public Facilities"
      layers: [
        schoolLayer
        schoolPolygonLayer
        medicalLayer
        medicalPolygonLayer
      ]
    }
  ]
  this.baseLayer = hotosmLayer
  return this
])
