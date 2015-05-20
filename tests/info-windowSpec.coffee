describe 'infoWindow', ->
  beforeEach(module('dashboard'))

  beforeEach inject  ($rootScope, $compile) ->
    @rootScope = $rootScope
    @compile = $compile
    @scope = @rootScope.$new()
    @template_element = '<info-window class="{{class}}" show-property="name" show-value="{{showvalue}}" header="{{header}}"><p>Test</p></info-window>'

    @scope.class = 'test'
    @scope.showvalue = 'test'
    @scope.header = 'Header'
    @element = $compile(@template_element)(@scope)
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
    it 'does not show the element', ->
      expect($(@element).attr('class')).include('ng-hide')
    context 'the layer is selected', ->
      beforeEach ->
        @rootScope.name = 'test'
        @element = @compile(@template_element)(@scope)
        @scope.$digest()
      it 'shows the element', ->
        expect($(@element).attr('class')).not.include('ng-hide')
    context 'different show property used', ->
      beforeEach ->
        @rootScope.sourceType = 'test'
        template_element = '<info-window class="{{class}}" show-property="sourceType" show-value="{{showvalue}}" header="{{header}}"><p>Test</p></info-window>'
        @element = @compile(template_element)(@scope)
        @scope.$digest()
      it 'shows the element', ->
        expect($(@element).attr('class')).not.include('ng-hide')

