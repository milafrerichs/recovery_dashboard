describe 'layerListService', ->
  beforeEach(module('dashboard'))

  beforeEach module(($provide) ->
    $provide.value 'layerListModel', {
      layerGroups: [{}]
    }
    return
  )

  beforeEach inject  (layerListService) ->
    @layerListService = layerListService
  beforeEach ->
    @sandbox = sinon.sandbox.create()

  describe 'Constructor', ->
    it 'list returns the layers from layerGroups', ->
      expect(@layerListService.list.length).to.eq(1)

