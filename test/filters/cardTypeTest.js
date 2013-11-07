/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:18 PM
 */

describe('Stripe Card Type Filter', function() {
	
	var filter;
	
	beforeEach(module("vr.StripeJS.filters.cardType"));
	
	beforeEach(inject(function($filter) {
		filter = $filter('cardType');
	}));
	
	it("should say the card is a visa", function() {
		expect(filter('4012888888881881')).toBe("Visa");
	});
	
	it("should say the card is a mastercard", function() {
		expect(filter('5555555555554444')).toBe("MasterCard");
	});
	
	it("should say the card is an american express", function() {
		expect(filter('378282246310005')).toBe("American Express");
	});
	
	it("should say the card is a discover", function() {
		expect(filter('6011111111111117')).toBe("Discover");
	});
	
	it("should say the card is a Diners Club", function() {
		expect(filter('30569309025904')).toBe("Diners Club");
	});
	
	it("should say the card is a JCB", function() {
		expect(filter('3530111333300000')).toBe("JCB");
	});
	
	it("should say the card is a unknown", function() {
		expect(filter('7142424242424242')).toBe("Unknown");
	});
	
	it("should say an undefined card is unknown", function() {
		expect(filter(undefined)).toBe("Unknown");
	});
	
});
