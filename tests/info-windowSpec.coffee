describe 'infoWindow', ->
  beforeEach(module('dashboard'))

  beforeEach inject  ($rootScope, $compile) ->
    @scope = $rootScope.$new()
    element = '<info-window class="{{class}}" name="{{name}}" header="{{header}}"><p>Test</p></info-window>'

    @scope.class = 'test'
    @scope.name = 'test'
    @scope.header = 'Header'
    @element = $compile(element)(@scope)
    @scope.$digest()

  beforeEach ->
    @sandbox = sinon.sandbox.create()

  describe 'Constructor', ->
    it 'has the class associated', ->
      expect($(@element).attr('class')).include('test')
    it 'has the content inside a content div', ->
      expect($(@element).find('.content p').text()).include('Test')
    it 'has the the header inside an h4', ->
      expect($(@element).find('h4').text()).include('Header')
