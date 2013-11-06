/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:59 PM
 */

describe("Stripe Card Number Validation Directive", function() {
	
	var elem;
	var $compile;
	var $rootScope;
	var $scope;
	var form;
	
	beforeEach(module("vr.StripeJS.directives.validation.number"));
	
	beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	beforeEach(function() {
		$scope = $rootScope;
		$scope.model = { number: '' };
		elem = $compile("<form name='form'><input ng-model='model.number' name='number' validate-card-number /></form>")($scope);
		$scope.$digest();
		form = $scope.form;
	});
	
	it("should set the input as valid (visa)", function() {
		$scope.model.number = '4242424242424242';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as valid (mastercard)", function() {
		$scope.model.number = '5555555555554444';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as valid (amex)", function() {
		$scope.model.number = '378282246310005';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as valid (discover)", function() {
		$scope.model.number = '6011111111111117';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as valid (diners)", function() {
		$scope.model.number = '30569309025904';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as valid (jcb)", function() {
		$scope.model.number = '3530111333300000';
		$scope.$digest();
		expect(form.number.$valid).toBeTruthy();
	});
	
	it("should set the input as invalid", function() {
		$scope.model.number = '4242424242424241';
		$scope.$digest();
		expect(form.number.$valid).toBeFalsy();
	});
	
});
