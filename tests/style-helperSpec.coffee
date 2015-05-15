describe('styleHelper', ->
  beforeEach(module('dashboard'))
  beforeEach inject  (styleHelper) ->
    @styleHelper = styleHelper

  describe('Constructor', ->
    beforeEach ->
      @feature = new ol.Feature()
      @featureStub = sinon.stub(@feature, 'get')
    it 'returns style array', ->
      expect(@styleHelper.povertyAvgStyle(@feature, 0)).to.not.be.empty
    it 'returns Style Obj', ->
      expect(@styleHelper.povertyAvgStyle(@feature, 0)[0]).to.be.instanceof(ol.style.Style)
  )

)
