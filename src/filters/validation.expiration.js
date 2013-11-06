/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:23 PM
 */

angular.module('vr.StripeJS.filters.validation.expiration', ['vr.StripeJS.service'])
	.filter('validExpiry', ['StripeJS', function($stripe) {
		function parseFromNumber(number) {
			var date = [0,0];
			if(number > 9999) {
				date[0] = Math.floor(number/10000);
				date[1] = number - (date[0] * 10000);
			} else {
				date[0] = Math.floor(number/100);
				date[1] = number - (date[0] * 100);
			}
			return date;
		}
		
		return function(input) {
			var month = 0;
			var year = 0;
			var date = [];
			if(angular.isArray(input)) {
				month = parseInt(input[0]);
				year = parseInt(input[1]);
			} else if(angular.isObject(input)) {
				month = parseInt(input.month);
				year = parseInt(input.year);
			} else if(angular.isString(input)) {
				if(input.indexOf('-') > 0) {
					date = input.split('-');
				} else if(input.indexOf('/') > 0) {
					date = input.split('/');
				} else {
					date = parseFromNumber(parseInt(input))
				}
				month = parseInt(date[0]);
				year = parseInt(date[1]);
			} else if(angular.isNumber(input)) {
				date = parseFromNumber(input);
				month = date[0];
				year = date[1];
			}
			if(year < 100) {
				year += 2000;
			}
			return $stripe.validateExpiry(month, year);
		};
	}]);
