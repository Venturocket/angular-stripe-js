/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:59 PM
 */

describe("Stripe Expiration Validation Directive", function() {
	
	var elem;
	var $compile;
	var $rootScope;
	var $scope;
	var form;
	
	beforeEach(module("vr.StripeJS.directives.validation.expiration"));
	
	beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	beforeEach(function() {
		$scope = $rootScope;
		$scope.model = { month: 0, year: 0 };
		elem = $compile(
			"<form name='form'>" +
				"<input ng-model='model.month' name='month' validate-exp-month />" +
				"<input ng-model='model.year' name='year' validate-exp-year />" +
			"</form>"
		)($scope);
		$scope.$digest();
		form = $scope.form;
	});
	
	it("should set the inputs as valid", function() {
		$scope.model.month = 1;
		$scope.model.year = 30;
		$scope.$digest();
		expect(form.$valid).toBeTruthy();
		expect(form.month.$valid).toBeTruthy();
		expect(form.year.$valid).toBeTruthy();
	});
	
	it("should set the inputs as valid", function() {
		$scope.model.month = 12;
		$scope.model.year = 2030;
		$scope.$digest();
		expect(form.$valid).toBeTruthy();
		expect(form.month.$valid).toBeTruthy();
		expect(form.year.$valid).toBeTruthy();
	});
	
	it("should set the input as invalid", function() {
		$scope.model.month = 1;
		$scope.model.year = 10;
		$scope.$digest();
		expect(form.$valid).toBeFalsy();
		expect(form.month.$valid).toBeFalsy();
		expect(form.year.$valid).toBeFalsy();
	});
	
	it("should set the input as invalid", function() {
		$scope.model.year = 10;
		$scope.$digest();
		expect(form.$valid).toBeFalsy();
		expect(form.month.$valid).toBeFalsy();
		expect(form.year.$valid).toBeFalsy();
	});
	
	it("should set the input as invalid", function() {
		$scope.model.month = 1;
		$scope.$digest();
		expect(form.$valid).toBeFalsy();
		expect(form.month.$valid).toBeFalsy();
		expect(form.year.$valid).toBeFalsy();
	});
	
});
