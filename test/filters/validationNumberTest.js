/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:35 PM
 */

describe('Stripe Card Number Validation Filter', function() {
	
	var filter;
	
	beforeEach(module("vr.StripeJS.filters.validation.number"));
	
	beforeEach(inject(function($filter) {
		filter = $filter('validCardNumber');
	}));
	
	it("should say the card is a visa", function() {
		expect(filter('4242424242424242')).toBeTruthy();
	});
	
	it("should say the card is a mastercard", function() {
		expect(filter('5555555555554444')).toBeTruthy();
	});
	
	it("should say the card is an american express", function() {
		expect(filter('378282246310005')).toBeTruthy();
	});
	
	it("should say the card is a discover", function() {
		expect(filter('6011111111111117')).toBeTruthy();
	});
	
	it("should say the card is a Diners Club", function() {
		expect(filter('30569309025904')).toBeTruthy();
	});
	
	it("should say the card is a JCB", function() {
		expect(filter('3530111333300000')).toBeTruthy();
	});
	
	it("should say the card is a unknown", function() {
		expect(filter('4242424242424241')).toBeFalsy();
	});
	
});

