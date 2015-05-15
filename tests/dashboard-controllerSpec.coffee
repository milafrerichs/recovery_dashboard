describe 'RecoveryDashboardCtrl', ->
  beforeEach(module('dashboard'))

  beforeEach inject  ($controller, $rootScope) ->
    @scope = $rootScope.$new()
    @controller = $controller('RecoveryDashboardCtrl', {
      $scope: @scope
    })
  beforeEach ->
    @sandbox = sinon.sandbox.create()


  describe 'mapping parameter', ->
    it 'has nepal as center for map', ->
      expect(@scope.nepal.lat).to.eq(27.7)
      expect(@scope.nepal.lon).to.eq(85.3)

    it 'has zoom level of 7', ->
      expect(@scope.nepal.zoom).to.eq(7)

    it 'has map defaults', ->
      expect(@scope.defaults).to.exist

    it 'map default has events', ->
      expect(@scope.defaults).to.have.any.keys('events')

    it 'events for layers', ->
      expect(@scope.defaults.events).to.have.any.keys('layers')

    it 'events for layers has click listener', ->
      expect(@scope.defaults.events.layers).to.include('click')
