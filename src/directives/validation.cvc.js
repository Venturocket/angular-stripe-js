/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 1:26 PM
 */

angular.module('vr.StripeJS.directives.validation.cvc', ['vr.StripeJS.filters.validation.cvc'])
	.directive('validateCvc', ['$filter', function($filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				ctrl.$parsers.unshift(function(value) {
					var valid = $filter('validCVC')(value);
					ctrl.$setValidity('cardCVC',valid);
					return valid ? value : undefined;
				});
				ctrl.$formatters.unshift(function(value) {
					ctrl.$setValidity('cardCVC',$filter('validCVC')(value));
					return value;
				});
			}
		}
	}]);
