/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 11:21 AM
 */

angular.module('vr.StripeJS', ['vr.StripeJS.directives', 'vr.StripeJS.filters']);

angular.module('vr.StripeJS.filters', ['vr.StripeJS.filters.validation', 'vr.StripeJS.filters.cardType']);
angular.module('vr.StripeJS.directives', ['vr.StripeJS.directives.class', 'vr.StripeJS.directives.validation']);

/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 11:26 AM
 */

angular.module('vr.StripeJS.service', [])
	.value('publishableKey','')
	.run(['publishableKey', function(key) {
		Stripe.setPublishableKey(key);
	}])
	.factory('StripeJS', function() {
		return {
			createToken: Stripe.card.createToken,
			validateCardNumber: Stripe.card.validateCardNumber,
			validateExpiry: Stripe.card.validateExpiry,
			validateCVC: Stripe.card.validateCVC,
			cardType: Stripe.card.cardType
		};
	});

/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:54 PM
 */

angular.module('vr.StripeJS.directives.validation', ['vr.StripeJS.directives.validation.number', 'vr.StripeJS.directives.validation.cvc', 'vr.StripeJS.directives.validation.expiration']);

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
				
				function getCardNumber() {
					if(angular.isDefined(attr.ngModel)) {
						return scope.$eval(attr.ngModel);
					} else {
						return attr.stripeClass;
					}
				}
				
				scope.$watch(getCardNumber, function(number) {
					setClass(number);
				});
			}
		}
	}]);

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

/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 12:18 PM
 */

angular.module('vr.StripeJS.filters.validation', ['vr.StripeJS.filters.validation.number', 'vr.StripeJS.filters.validation.cvc', 'vr.StripeJS.filters.validation.expiration']);

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
