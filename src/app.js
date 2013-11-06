/**
 * Author: Derek Gould
 * Date: 11/5/13
 * Time: 11:21 AM
 */

angular.module('vr.StripeJS', ['vr.StripeJS.directives', 'vr.StripeJS.filters']);

angular.module('vr.StripeJS.filters', ['vr.StripeJS.filters.validation', 'vr.StripeJS.filters.cardType']);
angular.module('vr.StripeJS.directives', ['vr.StripeJS.directives.class', 'vr.StripeJS.directives.validation']);
