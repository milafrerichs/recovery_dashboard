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
  damaged_buildings_adminLayer = {
    name: 'db-admin',
    active: true,
    displayed: true,
    index: 2
    source: {
      type: 'ImageWMS',
      url: 'http://demo.geonode.org/geoserver/wms'
      params: {
        layers: "geonode:destroyed_buildings"
        query_layers: "geonode:destroyed_buildings"
        styles: "destroyed_buildings"
      }
    }
    metadata: {
      name: "Damaged Buildings"
      source: ""
      text: "Using remotely sensed data, international organizations have been interpreting damage to structures building by building. The GFDRR team has collated and standardized the damage levels used in all three datasets by applying some assumptions and merged into a single GIS data layer. Areas covered are limited to areas where cloud free images were available.   
      
      During past events (2010 Haiti EQ, 2011 Christchurch EQ), it was understood that this type of damage assessment underestimates the number of destroyed and damaged buildings significantly due to the fact that some types of damage to structures are not visible from above. 
      
      The practical usage of this data is still being debated. Without baseline statistics on the number of buildings in the area, it would be difficult to assess the percentage of impacted buildings, which would be a useful starting point for housing assessment. Currently, OpenStreetMap (OSM) volunteers are mapping building footprints using pre-event images, if OSM building footprints are delineated for entire districts, it is possible to estimate the percentage of structures impacted per district with the caveat that it will be an underestimate, judging from past experiences.  "
    }
  }
  povertyLayer = {
    name: 'poverty',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'ImageWMS',
      url: 'http://demo.geonode.org/geoserver/wms'
      params: {
        layers: "geonode:archiv"
        query_layers: "geonode:archiv"
      }
    }
    #style: styleHelper.povertyAvgStyle
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
      text: "The World Bank Poverty Global Practice group have prepared poverty data for Nepal that can be visualized on a map. This layer will be useful for social protection, as well as to prioritize areas for resources in light of the level of damage estimated using the landslide inventory map, and building damage map above. "
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
    displayed: false,
    visible: false,
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
    displayed: false,
    visible: false,
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
  landslidesBGSLayer = {
    name: 'landslides-bgs',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'TileVector',
      format: new ol.format.GeoJSON()
      url: 'http://52.7.33.4/landslides-bgs/{z}/{x}/{y}.geojson'
    }
    metadata: {
      name: "Landslides BGS"
      source: ""
    }
  }
  mediaLayer = {
    name: 'media',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'TileVector',
      format: new ol.format.GeoJSON()
      url: 'http://52.7.33.4/media/{z}/{x}/{y}.geojson'
    }
    metadata: {
      name: "Mainstream Media text"
      source: ""
      text: "The World Bank ITS unit has been extracting information on damage being reported in mainstream media since the 25th of April. The information is linked to a place on the map and is available in GIS format. Photographs and video footage are also available. This would be useful for validation of other data sources on damage.
      "
    }
  }
  valleyLandslidesLayer= {
    name: 'valley-landslides',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'TileVector',
      format: new ol.format.GeoJSON()
      url: 'http://52.7.33.4/valley-landslides/{z}/{x}/{y}.geojson'
    }
    metadata: {
      name: "Valley Landslides"
      source: ""
    }
  }
  valleyBlockingLayer = {
    name: 'valley-blocking',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'TileVector',
      format: new ol.format.GeoJSON()
      url: 'http://52.7.33.4/valley-blocking/{z}/{x}/{y}.geojson'
    }
    metadata: {
      name: "Valley Blockings"
      source: ""
    }
  }
  landslideLayer = {
    name: 'landslides',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'TileVector',
      format: new ol.format.GeoJSON()
      url: 'http://52.7.33.4/landslides-all/{z}/{x}/{y}.geojson'
    }
    metadata: {
      name: "Landslides"
      source: ""
    }
  }
  damagedBuildingsLayer = {
    name: 'damagedBuildings',
    active: false,
    displayed: false,
    visible: false,
    source: {
      type: 'TileVector',
      format: new ol.format.GeoJSON()
      url: 'http://52.7.33.4/damaged-buildings/{z}/{x}/{y}.geojson'
    }
    metadata: {
      name: "Damages Buildings"
      source: ""
    }
  }
  nasaLayer = {
    name: 'nasa',
    active: true,
    displayed: false,
    visible: false,
    source: {
      type: 'ImageWMS',
      url: 'http://45.55.174.20/geoserver/wms'
      params: {
        layers: "hazard:aria_dpm_alos2_f550_v05u_climmax07454_t1h1b0u0_dpmraw"
        query_layers: "hazard:aria_dpm_alos2_f550_v05u_climmax07454_t1h1b0u0_dpmraw"
      }
    }
    metadata: {
      name: "Damages from NASA"
      source: "NASA"
    }
  }
  this.layerGroups = [
    {
      name: "Statistics"
      iconClass: 'briefcase'
      identifier: 'statistics'
      active: true
      layers: [
        povertyLayer
      ]
    }
    {
      name: "Damages"
      iconClass: 'flag'
      layers: [
        landslideLayer
        landslidesBGSLayer
        valleyLandslidesLayer
        valleyBlockingLayer
        damagedBuildingsLayer
        damaged_buildings_adminLayer
        nasaLayer
      ]
    }
    {
      name: "Media"
      iconClass: 'newspaper-o'
      layers: [
        mediaLayer
      ]
    }
    {
      name: "Infrastructure"
      iconClass: 'road'
      layers: [
        roadsLayer
        trainStationsLayer
      ]
      combinedLayers: [
        {
          name: 'Schools'
          visible: false
          displayed: false
          layers: [
            schoolLayer
            schoolPolygonLayer
          ]
          metadata: {
            name: "Schools"
            source: "OSM"
          }
        }
        {
          name: 'Medical'
          visible: true
          displayed: true
          layers: [
            medicalLayer
            medicalPolygonLayer
          ]
          metadata: {
            name: "Medical facilities"
            source: "OSM"
          }
        }
      ]
    }
  ]
  this.baseLayer = hotosmLayer
  return this
])
