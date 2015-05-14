window.dashboard.factory('styleHelper', ->
  buildingTypeScale = d3.scale.ordinal().domain(["1","2","3"]).range(["#d7191c","#fdae61","#ffffbf"])
  povertyScale = d3.scale.linear().domain([0, 1]).range(colorbrewer.Reds[5])

  styleCircleWithRadiusAndColor = (r, c) ->
    new (ol.style.Style)(image: new (ol.style.Circle)(
      radius: r
      fill: new (ol.style.Fill)(color: c))
    )

  styleFillWithColor= (c) ->
    [ new (ol.style.Style)(fill: new (ol.style.Fill)(color: c)) ]

  styleFillWithStroke = (fillColor, strokeWidth, strokeColor) ->
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: strokeWidth
      }),
      fill: new ol.style.Fill({
        color: fillColor
      })
    })

  styleImageForPolygon = (image) ->
    new (ol.style.Style)({
      image: new (ol.style.Icon)(src: image)
      geometry: (feature) ->
        coordinates = feature.getGeometry().getFlatInteriorPoint()
        return new ol.geom.Point(coordinates)
    })

  styleImage = (image) ->
    new (ol.style.Style)(image: new (ol.style.Icon)(src: image))

  povertyAbsStyle = (feature, resolution) ->
    povertyScale.domain([0, 100000])
    styleFillWithColor(povertyScale(feature.get("se_Number_")))

  povertyAvgStyle = (feature, resolution) ->
    povertyScale.domain([0, 1])
    styleFillWithColor(povertyScale(feature.get("avg_FGT0_1")))

  medicalStyle = (feature, resolution) ->
    [ styleCircleWithRadiusAndColor(3, 'white'), styleImage('images/icons/hospital-12.png') ]

  medicalPolygonStyle = (feature, resolution) ->
    [ styleFillWithStroke('blue',3,'blue'), styleCircleWithRadiusAndColor(3, 'white'), styleImageForPolygon('images/icons/hospital-12.png') ]

  schoolStyle = (feature, resolution) ->
    [ styleCircleWithRadiusAndColor(3, 'white'), styleImage('images/icons/school-12.png') ]

  schoolPolygonStyle = (feature, resolution) ->
    [ styleFillWithStroke('blue', 3, 'blue'), styleCircleWithRadiusAndColor(3, 'white'), styleImageForPolygon('images/icons/school-12.png') ]
  {
    povertyAvgStyle: povertyAvgStyle
    povertyAbsStyle: povertyAbsStyle
    medicalPolygonStyle: medicalPolygonStyle
    medicalStyle: medicalStyle
    schoolStyle: schoolStyle
    schoolPolygonStyle: schoolPolygonStyle
  }
)
