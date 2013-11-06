/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 3:03 PM
 */

angular.module('vr.StripeJS.directives.validation.expiration', ['vr.StripeJS.directives.validation.expiration.month', 'vr.StripeJS.directives.validation.expiration.year']);

angular.module('vr.StripeJS.directives.validation.expiration.service', [])
	.factory('stripeExpiration', function() {
		return {
			month: 0,
			year: 0
		}
	});

angular.module('vr.StripeJS.directives.validation.expiration.month', ['vr.StripeJS.filters.validation.expiration', 'vr.StripeJS.directives.validation.expiration.service'])
	.directive('validateExpMonth', ['$filter', 'stripeExpiration', function($filter, $exp) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				function valid(value) {
					$exp.month = value;
					var valid = $filter('validExpiry')({ month: value, year: $exp.year });
					ctrl.$setValidity('cardExpirationMonth',valid);
					return valid;
				}
				
				ctrl.$parsers.unshift(function(value) {
					return (valid(value) || elem.prop('tagName') == 'SELECT') ? value : undefined;
				});
				ctrl.$formatters.unshift(function(value) {
					valid(value);
					return value;
				});
				
				scope.$watch(function() { return $exp.year }, function() {
					ctrl.$setViewValue($exp.month);
				});
			}
		}
	}]);

angular.module('vr.StripeJS.directives.validation.expiration.year', ['vr.StripeJS.filters.validation.expiration', 'vr.StripeJS.directives.validation.expiration.service'])
	.directive('validateExpYear', ['$filter', 'stripeExpiration', function($filter, $exp) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				function valid(value) {
					$exp.year = value;
					var valid = $filter('validExpiry')({ month: $exp.month, year: value });
					ctrl.$setValidity('cardExpirationYear',valid);
					return valid;
				}
				
				ctrl.$parsers.unshift(function(value) {
					return (valid(value) || elem.prop('tagName') == 'SELECT') ? value : undefined;
				});
				ctrl.$formatters.unshift(function(value) {
					valid(value);
					return value;
				});
				
				scope.$watch(function() { return $exp.month }, function() {
					ctrl.$setViewValue($exp.year);
				});
			}
		}
	}]);
