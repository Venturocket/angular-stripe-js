/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:59 PM
 */

describe("Stripe Class Directive", function() {
	
	var elem;
	var $compile;
	var $rootScope;
	var $scope;
	
	beforeEach(module("vr.StripeJS.directives.class"));
	
	beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	beforeEach(function() {
		$scope = $rootScope.$new();
		$scope.number = '';
	});
	
	describe("with ngModel", function() {
		beforeEach(function() {
			elem = $compile("<input ng-model='number' stripe-class />")($scope);
			$scope.$digest();
		});
		
		it("should give the element the 'stripe-visa' class", function() {
			$scope.number = '4242424242424242';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-visa');
		});
		
		it("should give the element the 'stripe-mc' class", function() {
			$scope.number = '5555555555554444';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-mc');
		});
		
		it("should give the element the 'stripe-amex' class", function() {
			$scope.number = '378282246310005';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-amex');
		});
		
		it("should give the element the 'stripe-discover' class", function() {
			$scope.number = '6011111111111117';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-discover');
		});
		
		it("should give the element the 'stripe-diners' class", function() {
			$scope.number = '30569309025904';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-diners');
		});
		
		it("should give the element the 'stripe-jcb' class", function() {
			$scope.number = '3530111333300000';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-jcb');
		});
		
		it("should give the element the 'stripe-unknown' class", function() {
			$scope.number = 'say what?';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-unknown');
		});
	});
	
	describe("with stripeClass", function() {
		beforeEach(function() {
			elem = $compile("<span stripe-class='{{ number }}'></span>")($scope);
			$scope.$digest();
		});
		
		it("should give the element the 'stripe-visa' class", function() {
			$scope.number = '4242424242424242';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-visa');
		});
		
		it("should give the element the 'stripe-mc' class", function() {
			$scope.number = '5555555555554444';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-mc');
		});
		
		it("should give the element the 'stripe-amex' class", function() {
			$scope.number = '378282246310005';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-amex');
		});
		
		it("should give the element the 'stripe-discover' class", function() {
			$scope.number = '6011111111111117';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-discover');
		});
		
		it("should give the element the 'stripe-diners' class", function() {
			$scope.number = '30569309025904';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-diners');
		});
		
		it("should give the element the 'stripe-jcb' class", function() {
			$scope.number = '3530111333300000';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-jcb');
		});
		
		it("should give the element the 'stripe-unknown' class", function() {
			$scope.number = 'say what?';
			$scope.$digest();
			expect(elem).toHaveClass('stripe-unknown');
		});
	});
	
});
