/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 1:06 PM
 */

angular.module('vr.StripeJS.directives.validation.number', ['vr.StripeJS.filters.validation.number'])
	.directive('validateCardNumber', ['$filter', function($filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				ctrl.$parsers.unshift(function(value) {
					var valid = $filter('validCardNumber')(value);
					ctrl.$setValidity('cardNumber',valid);
					return valid ? value : undefined;
				});
				ctrl.$formatters.unshift(function(value) {
					ctrl.$setValidity('cardNumber',$filter('validCardNumber')(value));
					return value;
				})
			}
		}
	}]);
