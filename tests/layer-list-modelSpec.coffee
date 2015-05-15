describe 'layerListModel', ->
  beforeEach(module('dashboard'))

  beforeEach inject  (layerListModel) ->
    @layerListModel = layerListModel
  beforeEach ->
    @sandbox = sinon.sandbox.create()


  describe 'Constructor', ->
    it 'list returns the layers from layerGroups', ->
      expect(@layerListModel.layerGroups.length).to.eq(4)

