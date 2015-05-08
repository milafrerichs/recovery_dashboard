(function() {
  window.dashboard.factory('styleHelper', function() {
    var buildingTypeScale, povertyAbsStyle, povertyAvgStyle, povertyScale, styleCircleWithRadiusAndColor, styleFillWithColor;
    buildingTypeScale = d3.scale.ordinal().domain(["1", "2", "3"]).range(["#d7191c", "#fdae61", "#ffffbf"]);
    povertyScale = d3.scale.linear().domain([0, 1]).range(colorbrewer.Reds[5]);
    styleCircleWithRadiusAndColor = function(r, c) {
      return [
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: r,
            fill: new ol.style.Fill({
              color: c
            })
          })
        })
      ];
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
    povertyAbsStyle = function(feature, resolution) {
      povertyScale.domain([0, 100000]);
      return styleFillWithColor(povertyScale(feature.get("se_Number_")));
    };
    povertyAvgStyle = function(feature, resolution) {
      povertyScale.domain([0, 1]);
      return styleFillWithColor(povertyScale(feature.get("avg_FGT0_1")));
    };
    return {
      povertyAvgStyle: povertyAvgStyle,
      povertyAbsStyle: povertyAbsStyle
    };
  });

}).call(this);
