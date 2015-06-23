(function() {
  angular.module('dashboard').service('layerListModel', [
    '$rootScope', 'styleHelper', function($rootScope, styleHelper) {
      var damagedBuildingsLayer, damaged_buildings_adminLayer, hotosmLayer, landslideLayer, landslidesBGSLayer, mediaLayer, medicalLayer, medicalPolygonLayer, nasaLayer, povertyLayer, roadsLayer, schoolLayer, schoolPolygonLayer, valleyBlockingLayer, valleyLandslidesLayer;
      hotosmLayer = {
        name: 'HOTOSM',
        active: true,
        index: 0,
        source: {
          type: 'OSM',
          url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }
      };
      damaged_buildings_adminLayer = {
        name: 'db-admin',
        active: true,
        displayed: true,
        index: 2,
        source: {
          type: 'ImageWMS',
          url: 'http://45.55.174.20/geoserver/wms',
          params: {
            layers: "hazard:destroyed_buildings_admin_3",
            query_layers: "hazard:destroyed_buildings_admin_3"
          }
        },
        metadata: {
          name: "Damaged Buildings",
          source: "",
          text: "Using remotely sensed data, international organizations have been interpreting damage to structures building by building. The GFDRR team has collated and standardized the damage levels used in all three datasets by applying some assumptions and merged into a single GIS data layer. Areas covered are limited to areas where cloud free images were available. During past events (2010 Haiti EQ, 2011 Christchurch EQ), it was understood that this type of damage assessment underestimates the number of destroyed and damaged buildings significantly due to the fact that some types of damage to structures are not visible from above. The practical usage of this data is still being debated. Without baseline statistics on the number of buildings in the area, it would be difficult to assess the percentage of impacted buildings, which would be a useful starting point for housing assessment. Currently, OpenStreetMap (OSM) volunteers are mapping building footprints using pre-event images, if OSM building footprints are delineated for entire districts, it is possible to estimate the percentage of structures impacted per district with the caveat that it will be an underestimate, judging from past experiences.  "
        }
      };
      povertyLayer = {
        name: 'poverty',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'ImageWMS',
          url: 'http://demo.geonode.org/geoserver/wms',
          params: {
            layers: "geonode:archiv",
            query_layers: "geonode:archiv"
          }
        },
        metadata: {
          name: "Poverty Levels",
          source: "Worldbank",
          text: "The World Bank Poverty Global Practice group have prepared poverty data for Nepal that can be visualized on a map. This layer will be useful for social protection, as well as to prioritize areas for resources in light of the level of damage estimated using the landslide inventory map, and building damage map above. "
        }
      };
      schoolPolygonLayer = {
        name: 'school-polygon',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/schools_polygon.json'
        },
        metadata: {
          name: "School Polygons",
          source: "OSM"
        },
        style: styleHelper.schoolPolygonStyle
      };
      roadsLayer = {
        name: 'roads',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/main_roads.json'
        },
        metadata: {
          name: "Main roads",
          source: "OSM"
        },
        style: {
          stroke: {
            color: '#E0D6B2',
            width: 2
          }
        }
      };
      medicalPolygonLayer = {
        name: 'medicalpolygon',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/medical_polygon.json'
        },
        metadata: {
          name: "Medical facilities Polygons",
          source: "OSM"
        },
        style: styleHelper.medicalPolygonStyle
      };
      medicalLayer = {
        name: 'medical',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/medical_point.json'
        },
        style: styleHelper.medicalStyle,
        metadata: {
          name: "Medical facilities",
          source: "OSM"
        }
      };
      schoolLayer = {
        name: 'school',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/schools_point.json'
        },
        metadata: {
          name: "Schools",
          source: "OSM"
        },
        style: styleHelper.schoolStyle
      };
      landslidesBGSLayer = {
        name: 'landslides-bgs',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/landslides-bgs/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Landslides BGS",
          source: ""
        }
      };
      mediaLayer = {
        name: 'media',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/media/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Mainstream Media text",
          source: "",
          text: "The World Bank ITS unit has been extracting information on damage being reported in mainstream media since the 25th of April. The information is linked to a place on the map and is available in GIS format. Photographs and video footage are also available. This would be useful for validation of other data sources on damage."
        }
      };
      valleyLandslidesLayer = {
        name: 'valley-landslides',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/valley-landslides/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Valley Landslides",
          source: ""
        }
      };
      valleyBlockingLayer = {
        name: 'valley-blocking',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/valley-blocking/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Valley Blockings",
          source: ""
        }
      };
      landslideLayer = {
        name: 'landslides',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/landslides-all/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Landslides",
          source: ""
        }
      };
      damagedBuildingsLayer = {
        name: 'damagedBuildings',
        active: false,
        displayed: false,
        visible: false,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/damaged-buildings/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Damages Buildings",
          source: ""
        }
      };
      nasaLayer = {
        name: 'nasa',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'ImageWMS',
          url: 'http://45.55.174.20/geoserver/wms',
          params: {
            layers: "hazard:aria_dpm_alos2_f550_v05u_climmax07454_t1h1b0u0_dpmraw",
            query_layers: "hazard:aria_dpm_alos2_f550_v05u_climmax07454_t1h1b0u0_dpmraw"
          }
        },
        metadata: {
          name: "Damages from NASA",
          source: "NASA"
        }
      };
      this.layerGroups = [
        {
          name: "Poverty",
          iconClass: 'briefcase',
          identifier: 'statistics',
          active: true,
          layers: [povertyLayer]
        }, {
          name: "Damages",
          iconClass: 'flag',
          layers: [damagedBuildingsLayer, damaged_buildings_adminLayer, nasaLayer],
          combinedLayers: [
            {
              name: 'Landslides',
              visible: false,
              displayed: false,
              layers: [landslideLayer, landslidesBGSLayer, valleyLandslidesLayer, valleyBlockingLayer],
              metadata: {
                name: "Landslides",
                source: "",
                text: "Location of a large set of landslides detected using satellite images are available in GIS format files. The data was compiled by a consortium international organisations. This dataset is useful when overlaid with the road data as well as watercourses, to identify/infer potential roadblocks and the potential for earth dams to form as a result of water courses being blocked. This inventory can also be used to prioritize areas where mid- to longer term landslide risks should be assessed, given the approaching monsoon season. When overlaid with settlement locations, it may be used to infer “at risk” settlements. In all cases, geologists should be consulted. (also, see “settlement data” section below) It can also be overlaid to identify at risk health clinics and schools in the mountainous areas. The inventory data was compiled on a best effort basis by geologists in each of the organizations involved. G iven cloud cover and limitations in the availability of satellite data etc. there may be missing landslides from this dataset. Link to printable map: http://goo.gl/pa1o3F  "
              }
            }
          ]
        }, {
          name: "Media",
          iconClass: 'newspaper-o',
          layers: [mediaLayer]
        }, {
          name: "Infrastructure",
          iconClass: 'road',
          layers: [roadsLayer],
          combinedLayers: [
            {
              name: 'Schools',
              visible: false,
              displayed: false,
              layers: [schoolLayer, schoolPolygonLayer],
              metadata: {
                name: "Schools",
                source: "OSM"
              }
            }, {
              name: 'Medical',
              visible: true,
              displayed: true,
              layers: [medicalLayer, medicalPolygonLayer],
              metadata: {
                name: "Medical facilities",
                source: "OSM"
              }
            }
          ]
        }
      ];
      this.baseLayer = hotosmLayer;
      return this;
    }
  ]);

}).call(this);
