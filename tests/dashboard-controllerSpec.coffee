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

