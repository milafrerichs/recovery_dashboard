(function() {
  angular.module('dashboard').factory('styleHelper', function() {
    var buildingTypeScale, medicalPolygonStyle, medicalStyle, povertyAbsStyle, povertyAvgStyle, povertyScale, schoolPolygonStyle, schoolStyle, styleCircleWithRadiusAndColor, styleFillWithColor, styleFillWithStroke, styleImage, styleImageForPolygon;
    buildingTypeScale = d3.scale.ordinal().domain(["1", "2", "3"]).range(["#d7191c", "#fdae61", "#ffffbf"]);
    povertyScale = d3.scale.linear().domain([0, 1]).range(colorbrewer.Reds[5]);
    styleCircleWithRadiusAndColor = function(r, c) {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: r,
          fill: new ol.style.Fill({
            color: c
          })
        })
      });
    };
    styleFillWithColor = function(c) {
      return [
        new ol.style.Style({
          fill: new ol.style.Fill({
            color: c
          })
        })
      ];
    };
    styleFillWithStroke = function(fillColor, strokeWidth, strokeColor) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: strokeColor,
          width: strokeWidth
        }),
        fill: new ol.style.Fill({
          color: fillColor
        })
      });
    };
    styleImageForPolygon = function(image) {
      return new ol.style.Style({
        image: new ol.style.Icon({
          src: image
        }),
        geometry: function(feature) {
          return feature.getGeometry().getInteriorPoint();
        }
      });
    };
    styleImage = function(image) {
      return new ol.style.Style({
        image: new ol.style.Icon({
          src: image
        })
      });
    };
    povertyAbsStyle = function(feature, resolution) {
      povertyScale.domain([0, 100000]);
      return styleFillWithColor(povertyScale(feature.get("se_Number_")));
    };
    povertyAvgStyle = function(feature, resolution) {
      povertyScale.domain([0, 1]);
      return styleFillWithColor(povertyScale(feature.get("avg_FGT0_1")));
    };
    medicalStyle = function(feature, resolution) {
      return [styleCircleWithRadiusAndColor(3, 'white'), styleImage('images/icons/hospital-12.png')];
    };
    medicalPolygonStyle = function(feature, resolution) {
      return [styleFillWithStroke('blue', 3, 'blue'), styleCircleWithRadiusAndColor(3, 'white'), styleImageForPolygon('images/icons/hospital-12.png')];
    };
    schoolStyle = function(feature, resolution) {
      return [styleCircleWithRadiusAndColor(3, 'white'), styleImage('images/icons/school-12.png')];
    };
    schoolPolygonStyle = function(feature, resolution) {
      return [styleFillWithStroke('blue', 3, 'blue'), styleCircleWithRadiusAndColor(3, 'white'), styleImageForPolygon('images/icons/school-12.png')];
    };
    return {
      povertyAvgStyle: povertyAvgStyle,
      povertyAbsStyle: povertyAbsStyle,
      medicalPolygonStyle: medicalPolygonStyle,
      medicalStyle: medicalStyle,
      schoolStyle: schoolStyle,
      schoolPolygonStyle: schoolPolygonStyle
    };
  });

}).call(this);
