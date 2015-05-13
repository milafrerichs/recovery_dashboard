(function() {
  window.dashboard.service('layerListModel', [
    '$rootScope', 'styleHelper', function($rootScope, styleHelper) {
      var damagedBuildingsLayer, hotosmLayer, landslideLayer, landslidesBGSLayer, mediaLayer, medicalLayer, medicalPolygonLayer, povertyLayer, roadsLayer, schoolLayer, schoolPolygonLayer, trainStationsLayer, valleyBlockingLayer, valleyLandslidesLayer;
      hotosmLayer = {
        name: 'HOTOSM',
        active: true,
        index: 0,
        source: {
          type: 'OSM',
          url: 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }
      };
      povertyLayer = {
        name: 'poverty',
        active: true,
        displayed: true,
        index: 1,
        source: {
          type: 'ImageWMS',
          url: 'http://demo.geonode.org/geoserver/wms',
          params: {
            layers: "geonode:archiv",
            query_layers: "geonode:archiv"
          }
        },
        selectedStyle: "povertyAvgStyle",
        styleOptions: [
          {
            styleName: "Avg Poor",
            styleParam: "povertyAvgStyle"
          }, {
            styleName: "Absolute # of Poor",
            styleParam: "povertyAbsStyle"
          }
        ],
        metadata: {
          name: "Poverty Levels",
          source: "Worldbank"
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
        style: {
          fill: {
            color: "blue"
          },
          stroke: {
            width: 4,
            color: "blue"
          }
        }
      };
      trainStationsLayer = {
        name: 'train_stations',
        active: true,
        displayed: false,
        visible: false,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/train_stations.json'
        },
        metadata: {
          name: "Train stations",
          source: "OSM"
        },
        style: {
          image: {
            icon: {
              src: 'images/icons/rail-12.png'
            }
          }
        }
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
        }
      };
      medicalPolygonLayer = {
        name: 'medicalpolygon',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/medical_polygon.json'
        },
        metadata: {
          name: "Medical facilities Polygons",
          source: "OSM"
        },
        style: {
          fill: {
            color: "red"
          },
          stroke: {
            width: 4,
            color: "red"
          }
        }
      };
      medicalLayer = {
        name: 'medical',
        active: true,
        displayed: true,
        source: {
          type: 'GeoJSON',
          url: 'http://nepal.piensa.co/data/medical_point.json'
        },
        style: {
          image: {
            icon: {
              src: 'images/icons/hospital-12.png'
            }
          }
        },
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
        style: {
          image: {
            icon: {
              src: 'images/icons/school-12.png'
            }
          }
        }
      };
      landslidesBGSLayer = {
        name: 'landslides-bgs',
        active: true,
        displayed: true,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/landslides-bgs/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Landslides BGS",
          source: "Worldbank"
        }
      };
      mediaLayer = {
        name: 'media',
        active: true,
        displayed: true,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/media/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Mainstream Media text",
          source: "Worldbank"
        }
      };
      valleyLandslidesLayer = {
        name: 'valley-landslides',
        active: true,
        displayed: true,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/valley-landslides/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Valley Landslides",
          source: "Worldbank"
        }
      };
      valleyBlockingLayer = {
        name: 'valley-blocking',
        active: true,
        displayed: true,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/valley-blocking/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Valley Blockings",
          source: "Worldbank"
        }
      };
      landslideLayer = {
        name: 'landslides',
        active: true,
        displayed: true,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/landslides-all/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Landslides",
          source: "Worldbank"
        }
      };
      damagedBuildingsLayer = {
        name: 'damagedBuildings',
        active: false,
        displayed: true,
        source: {
          type: 'TileVector',
          format: new ol.format.GeoJSON(),
          url: 'http://52.7.33.4/damaged-buildings/{z}/{x}/{y}.geojson'
        },
        metadata: {
          name: "Damages Buildings",
          source: "Worldbank"
        }
      };
      this.layerGroups = [
        {
          name: "Poverty",
          layers: [povertyLayer]
        }, {
          name: "Landslides",
          layers: [landslideLayer, landslidesBGSLayer, valleyLandslidesLayer, valleyBlockingLayer]
        }, {
          name: "Damages",
          layers: [damagedBuildingsLayer]
        }, {
          name: "Media",
          layers: [mediaLayer]
        }, {
          name: "Infrastructure",
          layers: [roadsLayer, trainStationsLayer]
        }, {
          name: "Public Facilities",
          layers: [schoolLayer, schoolPolygonLayer, medicalLayer, medicalPolygonLayer]
        }
      ];
      this.list = _.unique(_.flatten([
        _.collect(this.layerGroups, function(group) {
          return group.layers;
        }).reverse(), hotosmLayer
      ])).reverse();
      return this;
    }
  ]);

}).call(this);
