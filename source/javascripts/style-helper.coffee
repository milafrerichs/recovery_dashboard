window.dashboard.factory('styleHelper', ->
  buildingTypeScale = d3.scale.ordinal().domain(["1","2","3"]).range(["#d7191c","#fdae61","#ffffbf"])
  povertyScale = d3.scale.linear().domain([0, 1]).range(colorbrewer.Reds[5])

  styleCircleWithRadiusAndColor = (r, c) ->
    [ new (ol.style.Style)(image: new (ol.style.Circle)(
      radius: r
      fill: new (ol.style.Fill)(color: c))) ]

  styleFillWithColor= (c) ->
    [ new (ol.style.Style)(fill: new (ol.style.Fill)(color: c)) ]

  povertyAbsStyle = (feature, resolution) ->
    povertyScale.domain([0, 100000])
    styleFillWithColor(povertyScale(feature.get("se_Number_")))

  povertyAvgStyle = (feature, resolution) ->
    povertyScale.domain([0, 1])
    styleFillWithColor(povertyScale(feature.get("avg_FGT0_1")))
  {
    povertyAvgStyle: povertyAvgStyle
    povertyAbsStyle: povertyAbsStyle
  }
)
