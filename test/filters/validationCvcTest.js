/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:31 PM
 */

describe('Stripe CVC Validation Filter', function() {
	
	var filter;
	
	beforeEach(module("vr.StripeJS.filters.validation.cvc"));
	
	beforeEach(inject(function($filter) {
		filter = $filter('validCVC');
	}));
	
	it("should say a 3 digit cvc is valid", function() {
		expect(filter(541)).toBeTruthy();
	});
	
	it("should say a 4 digit cvc is valid", function() {
		expect(filter(5418)).toBeTruthy();
	});
	
	it("should say a 5 digit cvc is invalid", function() {
		expect(filter(54187)).toBeFalsy();
	});
	
	it("should say a 2 digit cvc is invalid", function() {
		expect(filter(54)).toBeFalsy();
	});
	
});
