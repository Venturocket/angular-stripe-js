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
