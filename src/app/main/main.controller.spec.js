'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('imageResizer'));

  beforeEach(inject(function($rootScope) {
  	scope = $rootScope.$new();
  }));



    it('should define more than 5 awesome things', function() {
        expect(true).toBeTruthy();
    });
});
