/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:56 PM
 */

angular.module('vr.StripeJS.directives.class', ['vr.StripeJS.filters.cardType'])
	.directive('stripeClass', ['$filter', function($filter) {
		return {
			restrict: 'A',
			link: function(scope, elem, attr) {
				var prevClass = '';
				
				function getClass(number) {
					var type = $filter('cardType')(number).toLowerCase();
					switch(type) {
						case 'american express': type = 'amex'; break;
						case 'mastercard': type = 'mc'; break;
						case 'diners club': type = 'diners'; break;
					}
					return type;
				}
				
				function setClass(number) {
					if(prevClass != '') {
						elem.removeClass(prevClass);
					}
					prevClass = "stripe-"+getClass(number);
					elem.addClass(prevClass);
				}
				
				scope.$watch(function() { return scope.$eval(attr.ngModel); }, function(number) {
					setClass(number);
				});
			}
		}
	}]);
