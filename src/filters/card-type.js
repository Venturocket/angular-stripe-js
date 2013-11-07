/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:14 PM
 */

angular.module('vr.StripeJS.filters.cardType', ['vr.StripeJS.service'])
	.filter('cardType', ['StripeJS', function($stripe) {
		return function(input) {
			if(!input) {
				return "Unknown";
			}
			return $stripe.cardType(input);
		}
	}]);
