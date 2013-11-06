/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:21 PM
 */

angular.module('vr.StripeJS.filters.validation.cvc', ['vr.StripeJS.service'])
	.filter('validCVC', ['StripeJS', function($stripe) {
		return function(input) {
			return $stripe.validateCVC(input);
		};
	}]);
