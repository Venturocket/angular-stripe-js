/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:17 PM
 */

angular.module('vr.StripeJS.filters.validation.number', ['vr.StripeJS.service'])
	.filter('validCardNumber', ['StripeJS', function($stripe) {
		return function(input) {
			return $stripe.validateCardNumber(input);
		};
	}]);
