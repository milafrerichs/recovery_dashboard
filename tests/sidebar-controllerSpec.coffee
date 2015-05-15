describe 'SidebarCtrl', ->
  beforeEach(module('dashboard'))

  beforeEach inject  ($controller, $rootScope) ->
    @scope = $rootScope.$new()
    @controller = $controller('SidebarCtrl', {
      $scope: @scope
    })
  beforeEach ->
    @sandbox = sinon.sandbox.create()


  describe 'show', ->
    it 'does not show the sidebar', ->
      expect(@scope.show).to.eq(false)

  describe 'toggleSidebar', ->
    it 'does toggle the sidebar', ->
      @scope.toggleSidebar()
      expect(@scope.show).to.eq(true)


