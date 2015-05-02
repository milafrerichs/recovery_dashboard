window.dashboard.service('layerListModel', ['$rootScope', ($rootScope) ->
  hotosmLayer= {
        name: 'HOTOSM',
        active: true,
        opacity: 0.5,
        source: {
          type: 'OSM',
          url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
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
        style: {
          fill: {
            color: "blue"
          }
          stroke: {
            width: 4
            color: "blue"
          }
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
        style: {
          image: {
            icon: {
              src: 'images/icons/school-12.png'
            }
          }
        }
      }
  firestationsLayer = {
        name: 'firestations',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'ImageWMS',
          url: 'http://agsc.pdc.org/arcgis/services/regional/pdc_nepal_basedata/MapServer/WMSServer'
          params:{
            LAYERS:"2",
          }
        }
        metadata: {
          name: "Fire stations"
          source: "ArcGIS"
        }
      }
  unstablebridgeLayer = {
        name: 'unstablebridge',
        active: true,
        displayed: true,
        source: {
          type: 'ImageWMS',
          url: 'http://agsc.pdc.org/arcgis/services/regional/pdc_nepal/MapServer/WMSServer'
          params:{
            LAYERS:"28",
          }
        }
        metadata: {
          name: "Unstable Bridges "
          source: "ArcGIS"
        }
      }
  bridgeDamageLayer = {
        name: 'bridgedamage',
        active: true,
        displayed: true,
        source: {
          type: 'ImageWMS',
          url: 'http://agsc.pdc.org/arcgis/services/regional/pdc_nepal/MapServer/WMSServer'
          params:{
            LAYERS:"27",
          }
        }
        metadata: {
          name: "Bridge damages"
          source: "ArcGIS"
        }
      }
  policeLayer = {
        name: 'police',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/police_stations.json'
        }
        metadata: {
          name: "Police stations"
          source: "OSM"
        }
        style: {
          image: {
            icon: {
              src: 'images/icons/police-12.png'
            }
          }
        }
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
  tracksLayer = {
        name: 'tracks',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/tracks.json'
        }
        metadata: {
          name: "Tracks"
          source: "OSM"
        }
      }
  allRoadsLayer = {
        name: 'roads',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/all_roads.json'
        }
        metadata: {
          name: "All roads"
          source: "OSM"
        }
      }
  roadsLayer = {
        name: 'roads',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'data/main_roads.geojson'
        }
        metadata: {
          name: "Main roads"
          source: "OSM"
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
        style: {
          fill: {
            color: "red"
          }
          stroke: {
            width: 4
            color: "red"
          }
          }
      }
  medicalLayer = {
        name: 'medical',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'data/medical.geojson'
        }
        style: {
          image: {
            icon: {
              src: 'images/icons/hospital-12.png'
            }
          }
        }
        metadata: {
          name: "Medical facilities"
          source: "OSM"
        }
      }
  this.layerGroups = [
    {
      name: "Health"
      layers: [
        medicalLayer
        medicalPolygonLayer
      ]
    }
    {
      name: "Infrastructure"
      layers: [
        roadsLayer
        allRoadsLayer
        trainStationsLayer
        tracksLayer
      ]
    }
    {
      name: "Public Facilities"
      layers: [
        policeLayer
        schoolLayer
        schoolPolygonLayer
        firestationsLayer
      ]
    }
    {
      name: "Damages"
      layers: [
        bridgeDamageLayer
        unstablebridgeLayer
      ]
    }
  ]
  this.list = _.unique(_.flatten([_.collect(this.layerGroups, (group) -> group.layers),hotosmLayer]))
  return this
])
