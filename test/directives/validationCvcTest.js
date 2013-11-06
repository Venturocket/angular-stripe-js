/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:59 PM
 */

describe("Stripe CVC Number Validation Directive", function() {
	
	var elem;
	var $compile;
	var $rootScope;
	var $scope;
	var form;
	
	beforeEach(module("vr.StripeJS.directives.validation.cvc"));
	
	beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	beforeEach(function() {
		$scope = $rootScope;
		$scope.model = { number: '' };
		elem = $compile("<form name='form'><input ng-model='model.number' name='number' validate-cvc /></form>")($scope);
		$scope.$digest();
		form = $scope.form;
	});
	
	it("should set the input as valid (3 digits)", function() {
		$scope.model.number = '424';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as valid (4 digits)", function() {
		$scope.model.number = '5555';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as invalid (5 digits)", function() {
		$scope.model.number = '42424';
		$scope.$digest();
		expect(form.number.$valid).toBeFalsy();
	});
	
	it("should set the input as invalid (2 digits)", function() {
		$scope.model.number = '42';
		$scope.$digest();
		expect(form.number.$valid).toBeFalsy();
	});
	
});
