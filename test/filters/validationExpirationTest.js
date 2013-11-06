/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:35 PM
 */

describe('Stripe Expiration Validation Filter', function() {
	
	var filter;
	
	beforeEach(module("vr.StripeJS.filters.validation.expiration"));
	
	beforeEach(inject(function($filter) {
		filter = $filter('validExpiry');
	}));
	
	it("should say a month in the future is valid (object, short year)", function() {
		expect(filter({ month: 1, year: 30 })).toBeTruthy();
	});
	
	it("should say a month in the future is valid (object, long year)", function() {
		expect(filter({ month: 1, year: 2030 })).toBeTruthy();
	});
	
	it("should say a month in the future is valid (array)", function() {
		expect(filter([1,30])).toBeTruthy();
	});
	
	it("should say a month in the future is valid (string '-')", function() {
		expect(filter("1-30")).toBeTruthy();
	});
	
	it("should say a month in the future is valid (string '/')", function() {
		expect(filter("1/30")).toBeTruthy();
	});
	
	it("should say a month in the future is valid (string '')", function() {
		expect(filter("130")).toBeTruthy();
	});
	
	it("should say a month in the future is valid (string '')", function() {
		expect(filter("12030")).toBeTruthy();
	});
	
	it("should say a month in the future is valid (number, hundreds)", function() {
		expect(filter(130)).toBeTruthy();
	});
	
	it("should say a month in the future is valid (number, thousands)", function() {
		expect(filter(122030)).toBeTruthy();
	});
	
	it("should say a 13th month is invalid (string '')", function() {
		expect(filter("1330")).toBeFalsy();
	});
	
	it("should say a 13th month is invalid (object, short year)", function() {
		expect(filter({ month: 13, year: 30 })).toBeFalsy();
	});
	
	it("should say a month in the past is invalid (object, short year)", function() {
		expect(filter({ month: 1, year: 10 })).toBeFalsy();
	});
	
});

