# angular-stripe-js [![Build Status](https://travis-ci.org/Venturocket/angular-stripe-js.png?branch=master)](https://travis-ci.org/Venturocket/angular-stripe-js)
Stripe.js implementation for AngularJS

## Intro
All the credit card related methods from Stripe.js are mirrored in a service for easy injection later. If you only want to use the service include
`vr.StripeJS.service` in your module declaration and inject `StripeJS` where you need it.  
Everything here requires Stripe.js. Here are the docs for that: https://stripe.com/docs/stripe.js

**NOTE:** You can set your publishable key:
```
angular.module('vr.StripeJS.service')
	.value('publishableKey','YOUR PUBLISHABLE KEY');
```

## Filters
### Card Type
#### Usage
```
{{ number | cardType }}
```
It returns the card type as a string, e.g. `Visa`.

### Card Number Validation
#### Usage
```
{{ number | validCardNumber }}
```
Returns true if the card number is correctly formatted

### Card CVC Validation
#### Usage
```
{{ cvc | validCVC }}
```
Returns true if the cvc number is possibly valid

### Card Expiration Validation
#### Usage
```
{{ expiration | validExpiry }}
```
Returns true if the expiration is some time in the future.  
  
This filter accepts it's input in any of the following formats: 

type | format
--- | ---
Object | `{ month: 11, year: 2013 }` 
Array |`[ month, year ]` e.g. `[ 11, 2013 ]` 
String w/ '-' as delimiter | `'month-year'` e.g. `'11-2013'` 
String w/ '/' as delimiter | `'month/year'` e.g. `'11/2013'` 
String w/o delimiter | `'monthyear'` e.g. `'112013'` 
Integer | same as a string w/o delimiter 
  
The year can be either 2 or 4 digits for any of these.  

## Directives
### Card Type Class Directive
This will add a class to the element based on the type of card for the given number.  
Here's the list of classes:
```
stripe-visa
stripe-mc
stripe-amex
stripe-discover
stripe-diners
stripe-jcb
stripe-unknown
```
#### Markup
For an input:
```
<input ng-model="{model}" stripe-class />
```
For any other tag:
```
<anyTag stripe-class="{{ expression }}">...</anyTag>
```

### Card Number Validation Directive
This will set the validity of the input based on the validity of the credit card number
#### Markup
```
<input ng-model="{model}" validate-card-number />
```

### CVC Number Validation Directive
This will set the validity of the input based on the validity of the cvc number
#### Markup
```
<input ng-model="{model}" validate-cvc />
```

### Expiration Month and Year Validation Directives
These are actually 2 directives linked by a service to set the validity of 2 inputs. If the combination of the inputs creates an invalid expiration date,
both inputs will be set as invalid.
#### Markup
```
<input ng-model="{month}" validate-exp-month />
<input ng-model="{year}" validate-exp-year />
```

