require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"RmmdI4":[function(require,module,exports){
var BaseApp = require( 'rendr/shared/app' ),
  handlebarsHelpers = require( './lib/handlebarsHelpers' );

/**
 * Extend the `BaseApp` class, adding any custom methods or overrides.
 */
module.exports = BaseApp.extend( {

  /**
   * Client and server.
   *
   * `postInitialize` is called on app initialize, both on the client and server.
   * On the server, an app is instantiated once for each request, and in the
   * client, it's instantiated once on page load.
   *
   * This is a good place to initialize any code that needs to be available to
   * app on both client and server.
   */
  postInitialize: function () {
    /**
     * Register our Handlebars helpers.
     *
     * `this.templateAdapter` is, by default, the `rendr-handlebars` module.
     * It has a `registerHelpers` method, which allows us to register helper
     * modules that can be used on both client & server.
     */
    this.templateAdapter.registerHelpers( handlebarsHelpers );
  },

  /**
   * Client-side only.
   *
   * `start` is called at the bottom of `__layout.hbs`. Calling this kicks off
   * the router and initializes the application.
   *
   * Override this method (remembering to call the superclass' `start` method!)
   * in order to do things like bind events to the router, as shown below.
   */
  start: function () {
    // Show a loading indicator when the app is fetching.
    this.router.on( 'action:start', function () {
      this.set( {
        loading: true
      } );
    }, this );
    this.router.on( 'action:end', function () {
      this.set( {
        loading: false
      } );
    }, this );

    // Call 'super'.
    BaseApp.prototype.start.call( this );
  },

  /**
   * Client-side only.
   *
   * This method also exists on shared/app.js, and is called by client/router.
   * Override it here to specify your own app_view object.
   */
  getAppViewClass: function () {
    return require( './views/app_view' );
  }

} );
},{"./lib/handlebarsHelpers":"Hw64yw","./views/app_view":"OPO86P","rendr/shared/app":59}],"app/app":[function(require,module,exports){
module.exports=require('RmmdI4');
},{}],"036vLR":[function(require,module,exports){
var RendrBase = require('rendr/shared/base/collection');

module.exports = RendrBase.extend({});

},{"rendr/shared/base/collection":60}],"app/collections/base":[function(require,module,exports){
module.exports=require('036vLR');
},{}],"YjZqKj":[function(require,module,exports){
module.exports = {
	index: function ( params, callback ) {
		callback();
	}
};
},{}],"app/controllers/home_controller":[function(require,module,exports){
module.exports=require('YjZqKj');
},{}],"Hw64yw":[function(require,module,exports){
/**
 * We inject the Handlebars instance, because this module doesn't know where
 * the actual Handlebars instance will come from.
 */
module.exports = function(Handlebars) {
  return {
    copyright: function(year) {
      return new Handlebars.SafeString("&copy;" + year);
    }
  };
};

},{}],"app/lib/handlebarsHelpers":[function(require,module,exports){
module.exports=require('Hw64yw');
},{}],"app/models/base":[function(require,module,exports){
module.exports=require('zzaKMl');
},{}],"zzaKMl":[function(require,module,exports){
var RendrBase = require('rendr/shared/base/model');

module.exports = RendrBase.extend({});

},{"rendr/shared/base/model":61}],"WU8P0a":[function(require,module,exports){
var BaseClientRouter = require( 'rendr/client/router' );

var Router = module.exports = function Router( options ) {
	BaseClientRouter.call( this, options );
};

/**
 * Set up inheritance.
 */
Router.prototype = Object.create( BaseClientRouter.prototype );
Router.prototype.constructor = BaseClientRouter;

Router.prototype.postInitialize = function () {
	this.on( 'action:start', this.trackImpression, this );
};

Router.prototype.trackImpression = function () {
	if ( window._gaq ) {
		_gaq.push( [ '_trackPageview' ] );
	}
};
},{"rendr/client/router":56}],"app/router":[function(require,module,exports){
module.exports=require('WU8P0a');
},{}],"app/routes":[function(require,module,exports){
module.exports=require('aeMvX5');
},{}],"aeMvX5":[function(require,module,exports){
module.exports = function ( match ) {
	match( '', 'home#index' );
};
},{}],"app/templates/compiledTemplates":[function(require,module,exports){
module.exports=require('C7/za0');
},{}],"C7/za0":[function(require,module,exports){
module.exports = function(Handlebars) {

var templates = {};

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<img class=\"bg\" src=\"/images/bg.jpg\" alt=\"\"/>\n<div class=\"site-wrapper-inner\">\n  <div class=\"cover-container\">\n    <div class=\"masthead clearfix\">\n      <div class=\"inner\">\n        <h3 class=\"masthead-brand\">Guitar With Guru</h3>\n        <ul class=\"nav masthead-nav\" id=\"primary-nav\">\n          <li class=\"active\"><a href=\"/\">Home</a></li>\n          \n        </ul>\n      </div>\n    </div>\n\n    <div class=\"inner cover\">\n      <h1 class=\"cover-heading\">Tabs don't teach music. Teachers do.</h1>\n      <p>&nbsp;</p>\n      <p class=\"lead\">\n        Learn playing guitar (the way it's meant to be) from top notch indie guitarists across the globe.\n      </p>\n      <p class=\"lead\">Introducing one-on-one live guitar sessions</p>\n\n      <h1>Coming Soon</h1>\n    </div>\n\n    <div class=\"mastfoot\">\n      <div class=\"inner\">\n        <p>&copy; 2014 | Guitar With Guru</p>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });

return templates;

};
},{}],"OPO86P":[function(require,module,exports){
var BaseAppView = require( 'rendr/client/app_view' ),
  $ = require( 'jquery' ),
  $body = $( 'body' );

module.exports = BaseAppView.extend( {
  postInitialize: function () {
    this.app.on( 'change:loading', function ( app, loading ) {
      $body.toggleClass( 'loading', loading );
    } );

    this.app.on( 'change:title', function ( app, title ) {
      document.title = title + ' | Guitar With Guru';
    } );
  }
} );
},{"jquery":"WPLrfX","rendr/client/app_view":55}],"app/views/app_view":[function(require,module,exports){
module.exports=require('OPO86P');
},{}],"K4WqzE":[function(require,module,exports){
var RendrView = require('rendr/shared/base/view');

// Create a base view, for adding common extensions to our
// application's views.
module.exports = RendrView.extend({});

},{"rendr/shared/base/view":63}],"app/views/base":[function(require,module,exports){
module.exports=require('K4WqzE');
},{}],"2afhqU":[function(require,module,exports){
var BaseView = require( '../base' );

module.exports = BaseView.extend( {
	className: 'site-wrapper'
} );
module.exports.id = 'home/index';
},{"../base":"K4WqzE"}],"app/views/home/index":[function(require,module,exports){
module.exports=require('2afhqU');
},{}],"bootstrap.timepicker":[function(require,module,exports){
module.exports=require('JhLhg3');
},{}],"JhLhg3":[function(require,module,exports){
(function (global){(function browserifyShim(module, define) {

; global.bootstrap = require("bootstrap");
/**
* bootstrap-formhelpers.js v2.3.0 by @vincentlamanna
* Copyright 2013 Vincent Lamanna
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap Form Helpers requires jQuery"); }

/* ==========================================================
 * bootstrap-formhelpers-countries.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHCountriesList = {
  'AF': 'Afghanistan',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua and Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia',
  'BA': 'Bosnia and Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory',
  'VG': 'British Virgin Islands',
  'BN': 'Brunei',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'CI': 'Côte d\'Ivoire',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'CV': 'Cape Verde',
  'KY': 'Cayman Islands',
  'CF': 'Central African Republic',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands',
  'CO': 'Colombia',
  'KM': 'Comoros',
  'CG': 'Congo',
  'CK': 'Cook Islands',
  'CR': 'Costa Rica',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'CD': 'Democratic Republic of the Congo',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'TP': 'East Timor',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'ET': 'Ethiopia',
  'FO': 'Faeroe Islands',
  'FK': 'Falkland Islands',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'MK': 'Former Yugoslav Republic of Macedonia',
  'FR': 'France',
  'FX': 'France, Metropolitan',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories',
  'GA': 'Gabon',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard and Mc Donald Islands',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Laos',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macau',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia',
  'MD': 'Moldova',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands',
  'AN': 'Netherlands Antilles',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'KP': 'North Korea',
  'MP': 'Northern Marianas',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestine',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines',
  'PN': 'Pitcairn Islands',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'RE': 'Reunion',
  'RO': 'Romania',
  'RU': 'Russia',
  'RW': 'Rwanda',
  'ST': 'São Tomé and Príncipe',
  'SH': 'Saint Helena',
  'PM': 'St. Pierre and Miquelon',
  'KN': 'Saint Kitts and Nevis',
  'LC': 'Saint Lucia',
  'VC': 'Saint Vincent and the Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia and the South Sandwich Islands',
  'KR': 'South Korea',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan',
  'SR': 'Suriname',
  'SJ': 'Svalbard and Jan Mayen Islands',
  'SZ': 'Swaziland',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syria',
  'TW': 'Taiwan',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania',
  'TH': 'Thailand',
  'BS': 'The Bahamas',
  'GM': 'The Gambia',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad and Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks and Caicos Islands',
  'TV': 'Tuvalu',
  'VI': 'US Virgin Islands',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates',
  'GB': 'United Kingdom',
  'US': 'United States',
  'UM': 'United States Minor Outlying Islands',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VA': 'Vatican City',
  'VE': 'Venezuela',
  'VN': 'Vietnam',
  'WF': 'Wallis and Futuna Islands',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
};

 /* ==========================================================
 * bootstrap-formhelpers-currencies.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2013 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHCurrenciesList = {
  'AED':{'label':'United Arab Emirates dirham','currencyflag':'','symbol':'د.إ'},
  'AFN':{'label':'Afghan afghani','currencyflag':'','symbol':'؋'},
  'ALL':{'label':'Albanian lek','currencyflag':'','symbol':'L'},
  'AMD':{'label':'Armenian dram','currencyflag':'','symbol':'դր'},
  'AOA':{'label':'Angolan kwanza','currencyflag':'','symbol':'Kz'},
  'ARS':{'label':'Argentine peso','currencyflag':'','symbol':'$'},
  'AUD':{'label':'Australian dollar','currencyflag':'AUD','symbol':'$'},
  'AWG':{'label':'Aruban florin','currencyflag':'','symbol':'ƒ'},
  'AZN':{'label':'Azerbaijani manat','currencyflag':'','symbol':''},
  'BAM':{'label':'Bosnia and Herzegovina convertible mark','currencyflag':'','symbol':'KM'},
  'BBD':{'label':'Barbadian dollar','currencyflag':'','symbol':'$'},
  'BDT':{'label':'Bangladeshi taka','currencyflag':'','symbol':'৳'},
  'BGN':{'label':'Bulgarian lev','currencyflag':'','symbol':'лв'},
  'BHD':{'label':'Bahraini dinar','currencyflag':'','symbol':'.د.ب'},
  'BIF':{'label':'Burundian franc','currencyflag':'','symbol':'Fr'},
  'BMD':{'label':'Bermudian dollar','currencyflag':'','symbol':'$'},
  'BND':{'label':'Brunei dollar','currencyflag':'','symbol':'$'},
  'BOB':{'label':'Bolivian boliviano','currencyflag':'','symbol':'Bs'},
  'BRL':{'label':'Brazilian real','currencyflag':'','symbol':'R$'},
  'BSD':{'label':'Bahamian dollar','currencyflag':'','symbol':'$'},
  'BTN':{'label':'Bhutanese ngultrum','currencyflag':'','symbol':'Nu'},
  'BWP':{'label':'Botswana pula','currencyflag':'','symbol':'P'},
  'BYR':{'label':'Belarusian ruble','currencyflag':'','symbol':'Br'},
  'BZD':{'label':'Belize dollar','currencyflag':'','symbol':'$'},
  'CAD':{'label':'Canadian dollar','currencyflag':'','symbol':'$'},
  'CDF':{'label':'Congolese franc','currencyflag':'','symbol':'Fr'},
  'CHF':{'label':'Swiss franc','currencyflag':'CHF','symbol':'Fr'},
  'CLP':{'label':'Chilean peso','currencyflag':'','symbol':'$'},
  'CNY':{'label':'Chinese yuan','currencyflag':'','symbol':'¥'},
  'COP':{'label':'Colombian peso','currencyflag':'','symbol':'$'},
  'CRC':{'label':'Costa Rican colón','currencyflag':'','symbol':'₡'},
  'CUP':{'label':'Cuban convertible peso','currencyflag':'','symbol':'$'},
  'CVE':{'label':'Cape Verdean escudo','currencyflag':'','symbol':'$'},
  'CZK':{'label':'Czech koruna','currencyflag':'','symbol':'Kč'},
  'DJF':{'label':'Djiboutian franc','currencyflag':'','symbol':'Fr'},
  'DKK':{'label':'Danish krone','currencyflag':'DKK','symbol':'kr'},
  'DOP':{'label':'Dominican peso','currencyflag':'','symbol':'$'},
  'DZD':{'label':'Algerian dinar','currencyflag':'','symbol':'د.ج'},
  'EGP':{'label':'Egyptian pound','currencyflag':'','symbol':'ج.م'},
  'ERN':{'label':'Eritrean nakfa','currencyflag':'','symbol':'Nfk'},
  'ETB':{'label':'Ethiopian birr','currencyflag':'','symbol':'Br'},
  'EUR':{'label':'Euro','currencyflag':'EUR','symbol':'€'},
  'FJD':{'label':'Fijian dollar','currencyflag':'','symbol':'$'},
  'FKP':{'label':'Falkland Islands pound','currencyflag':'','symbol':'£'},
  'GBP':{'label':'British pound','currencyflag':'','symbol':'£'},
  'GEL':{'label':'Georgian lari','currencyflag':'','symbol':'ლ'},
  'GHS':{'label':'Ghana cedi','currencyflag':'','symbol':'₵'},
  'GMD':{'label':'Gambian dalasi','currencyflag':'','symbol':'D'},
  'GNF':{'label':'Guinean franc','currencyflag':'','symbol':'Fr'},
  'GTQ':{'label':'Guatemalan quetzal','currencyflag':'','symbol':'Q'},
  'GYD':{'label':'Guyanese dollar','currencyflag':'','symbol':'$'},
  'HKD':{'label':'Hong Kong dollar','currencyflag':'','symbol':'$'},
  'HNL':{'label':'Honduran lempira','currencyflag':'','symbol':'L'},
  'HRK':{'label':'Croatian kuna','currencyflag':'','symbol':'kn'},
  'HTG':{'label':'Haitian gourde','currencyflag':'','symbol':'G'},
  'HUF':{'label':'Hungarian forint','currencyflag':'','symbol':'Ft'},
  'IDR':{'label':'Indonesian rupiah','currencyflag':'','symbol':'Rp'},
  'ILS':{'label':'Israeli new shekel','currencyflag':'','symbol':'₪'},
  'IMP':{'label':'Manx pound','currencyflag':'','symbol':'£'},
  'INR':{'label':'Indian rupee','currencyflag':'','symbol':''},
  'IQD':{'label':'Iraqi dinar','currencyflag':'','symbol':'ع.د'},
  'IRR':{'label':'Iranian rial','currencyflag':'','symbol':'﷼'},
  'ISK':{'label':'Icelandic króna','currencyflag':'','symbol':'kr'},
  'JEP':{'label':'Jersey pound','currencyflag':'','symbol':'£'},
  'JMD':{'label':'Jamaican dollar','currencyflag':'','symbol':'$'},
  'JOD':{'label':'Jordanian dinar','currencyflag':'','symbol':'د.ا'},
  'JPY':{'label':'Japanese yen','currencyflag':'','symbol':'¥'},
  'KES':{'label':'Kenyan shilling','currencyflag':'','symbol':'Sh'},
  'KGS':{'label':'Kyrgyzstani som','currencyflag':'','symbol':'лв'},
  'KHR':{'label':'Cambodian riel','currencyflag':'','symbol':'៛'},
  'KMF':{'label':'Comorian franc','currencyflag':'','symbol':'Fr'},
  'KPW':{'label':'North Korean won','currencyflag':'','symbol':'₩'},
  'KRW':{'label':'South Korean won','currencyflag':'','symbol':'₩'},
  'KWD':{'label':'Kuwaiti dinar','currencyflag':'','symbol':'د.ك'},
  'KYD':{'label':'Cayman Islands dollar','currencyflag':'','symbol':'$'},
  'KZT':{'label':'Kazakhstani tenge','currencyflag':'','symbol':'₸'},
  'LAK':{'label':'Lao kip','currencyflag':'','symbol':'₭'},
  'LBP':{'label':'Lebanese pound','currencyflag':'','symbol':'ل.ل'},
  'LKR':{'label':'Sri Lankan rupee','currencyflag':'','symbol':'Rs'},
  'LRD':{'label':'Liberian dollar','currencyflag':'','symbol':'$'},
  'LSL':{'label':'Lesotho loti','currencyflag':'','symbol':'L'},
  'LTL':{'label':'Lithuanian litas','currencyflag':'','symbol':'Lt'},
  'LVL':{'label':'Latvian lats','currencyflag':'','symbol':'Ls'},
  'LYD':{'label':'Libyan dinar','currencyflag':'','symbol':'ل.د'},
  'MAD':{'label':'Moroccan dirham','currencyflag':'','symbol':'د.م.'},
  'MDL':{'label':'Moldovan leu','currencyflag':'','symbol':'L'},
  'MGA':{'label':'Malagasy ariary','currencyflag':'','symbol':'Ar'},
  'MKD':{'label':'Macedonian denar','currencyflag':'','symbol':'ден'},
  'MMK':{'label':'Burmese kyat','currencyflag':'','symbol':'Ks'},
  'MNT':{'label':'Mongolian tögrög','currencyflag':'','symbol':'₮'},
  'MOP':{'label':'Macanese pataca','currencyflag':'','symbol':'P'},
  'MRO':{'label':'Mauritanian ouguiya','currencyflag':'','symbol':'UM'},
  'MUR':{'label':'Mauritian rupee','currencyflag':'','symbol':'Rs'},
  'MVR':{'label':'Maldivian rufiyaa','currencyflag':'','symbol':'.ރ'},
  'MWK':{'label':'Malawian kwacha','currencyflag':'','symbol':'MK'},
  'MXN':{'label':'Mexican peso','currencyflag':'','symbol':'$'},
  'MYR':{'label':'Malaysian ringgit','currencyflag':'','symbol':'MR'},
  'MZN':{'label':'Mozambican metical','currencyflag':'','symbol':'MT'},
  'NAD':{'label':'Namibian dollar','currencyflag':'','symbol':'$'},
  'NGN':{'label':'Nigerian naira','currencyflag':'','symbol':'₦'},
  'NIO':{'label':'Nicaraguan córdoba','currencyflag':'','symbol':'C$'},
  'NOK':{'label':'Norwegian krone','currencyflag':'','symbol':'kr'},
  'NPR':{'label':'Nepalese rupee','currencyflag':'','symbol':'Rs'},
  'NZD':{'label':'New Zealand dollar','currencyflag':'','symbol':'$'},
  'OMR':{'label':'Omani rial','currencyflag':'','symbol':'ر.ع.'},
  'PAB':{'label':'Panamanian balboa','currencyflag':'','symbol':'B/.'},
  'PEN':{'label':'Peruvian nuevo sol','currencyflag':'','symbol':'S/.'},
  'PGK':{'label':'Papua New Guinean kina','currencyflag':'','symbol':'K'},
  'PHP':{'label':'Philippine peso','currencyflag':'','symbol':'₱'},
  'PKR':{'label':'Pakistani rupee','currencyflag':'','symbol':'Rs'},
  'PLN':{'label':'Polish złoty','currencyflag':'','symbol':'zł'},
  'PRB':{'label':'Transnistrian ruble','currencyflag':'','symbol':'р.'},
  'PYG':{'label':'Paraguayan guaraní','currencyflag':'','symbol':'₲'},
  'QAR':{'label':'Qatari riyal','currencyflag':'','symbol':'ر.ق'},
  'RON':{'label':'Romanian leu','currencyflag':'','symbol':'L'},
  'RSD':{'label':'Serbian dinar','currencyflag':'','symbol':'дин'},
  'RUB':{'label':'Russian ruble','currencyflag':'','symbol':'руб.'},
  'RWF':{'label':'Rwandan franc','currencyflag':'','symbol':'Fr'},
  'SAR':{'label':'Saudi riyal','currencyflag':'','symbol':'ر.س'},
  'SBD':{'label':'Solomon Islands dollar','currencyflag':'','symbol':'$'},
  'SCR':{'label':'Seychellois rupee','currencyflag':'','symbol':'Rs'},
  'SDG':{'label':'Singapore dollar','currencyflag':'','symbol':'$'},
  'SEK':{'label':'Swedish krona','currencyflag':'','symbol':'kr'},
  'SGD':{'label':'Singapore dollar','currencyflag':'','symbol':'$'},
  'SHP':{'label':'Saint Helena pound','currencyflag':'','symbol':'£'},
  'SLL':{'label':'Sierra Leonean leone','currencyflag':'','symbol':'Le'},
  'SOS':{'label':'Somali shilling','currencyflag':'','symbol':'Sh'},
  'SRD':{'label':'Surinamese dollar','currencyflag':'','symbol':'$'},
  'SSP':{'label':'South Sudanese pound','currencyflag':'','symbol':'£'},
  'STD':{'label':'São Tomé and Príncipe dobra','currencyflag':'','symbol':'Db'},
  'SVC':{'label':'Salvadoran colón','currencyflag':'','symbol':'₡'},
  'SYP':{'label':'Syrian pound','currencyflag':'','symbol':'£'},
  'SZL':{'label':'Swazi lilangeni','currencyflag':'','symbol':'L'},
  'THB':{'label':'Thai baht','currencyflag':'','symbol':'฿'},
  'TJS':{'label':'Tajikistani somoni','currencyflag':'','symbol':'SM'},
  'TMT':{'label':'Turkmenistan manat','currencyflag':'','symbol':'m'},
  'TND':{'label':'Tunisian dinar','currencyflag':'','symbol':'د.ت'},
  'TOP':{'label':'Tongan paʻanga','currencyflag':'','symbol':'T$'},
  'TRY':{'label':'Turkish lira','currencyflag':'','symbol':'&#8378;'},
  'TTD':{'label':'Trinidad and Tobago dollar','currencyflag':'','symbol':'$'},
  'TWD':{'label':'New Taiwan dollar','currencyflag':'','symbol':'$'},
  'TZS':{'label':'Tanzanian shilling','currencyflag':'','symbol':'Sh'},
  'UAH':{'label':'Ukrainian hryvnia','currencyflag':'','symbol':'₴'},
  'UGX':{'label':'Ugandan shilling','currencyflag':'','symbol':'Sh'},
  'USD':{'label':'United States dollar','currencyflag':'','symbol':'$'},
  'UYU':{'label':'Uruguayan peso','currencyflag':'','symbol':'$'},
  'UZS':{'label':'Uzbekistani som','currencyflag':'','symbol':'лв'},
  'VEF':{'label':'Venezuelan bolívar','currencyflag':'','symbol':'Bs F'},
  'VND':{'label':'Vietnamese đồng','currencyflag':'','symbol':'₫'},
  'VUV':{'label':'Vanuatu vatu','currencyflag':'','symbol':'Vt'},
  'WST':{'label':'Samoan tālā','currencyflag':'','symbol':'T'},
  'XAF':{'label':'Central African CFA franc','currencyflag':'XAF','symbol':'Fr'},
  'XCD':{'label':'East Caribbean dollar','currencyflag':'XCD','symbol':'$'},
  'XOF':{'label':'West African CFA franc','currencyflag':'XOF','symbol':'Fr'},
  'XPF':{'label':'CFP franc','currencyflag':'XPF','symbol':'Fr'},
  'YER':{'label':'Yemeni rial','currencyflag':'','symbol':'﷼'},
  'ZAR':{'label':'South African rand','currencyflag':'ZAR','symbol':'R'},
  'ZMW':{'label':'Zambian kwacha','currencyflag':'','symbol':'ZK'},
  'ZWL':{'label':'Zimbabwean dollar','currencyflag':'','symbol':'$'}
};

/* ==========================================================
 * bootstrap-formhelpers-datepicker.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHMonthsList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
 
var BFHDaysList = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT'
];
 
var BFHDayOfWeekStart = 0;

/* ==========================================================
 * bootstrap-formhelpers-fonts.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHFontsList = {
  'Andale Mono': '"Andale Mono", AndaleMono, monospace',
  'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  'Arial Black': '"Arial Black", "Arial Bold", Gadget, sans-serif',
  'Arial Narrow': '"Arial Narrow", Arial, sans-serif',
  'Arial Rounded MT Bold': '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
  'Avant Garde': '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif',
  'Baskerville': 'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif',
  'Big Caslon': '"Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif',
  'Bodoni MT': '"Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
  'Book Antiqua': '"Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif',
  'Brush Script MT': '"Brush Script MT", cursive',
  'Calibri': 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
  'Calisto MT': '"Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif',
  'Cambrio': 'Cambria, Georgia, serif',
  'Candara': 'Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif',
  'Century Gothic': '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
  'Consolas': 'Consolas, monaco, monospace',
  'Copperplate': 'Copperplate, "Copperplate Gothic Light", fantasy',
  'Courier New': '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
  'Didot': 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
  'Franklin Gothic Medium': '"Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", Arial, sans-serif',
  'Futura': 'Futura, "Trebuchet MS", Arial, sans-serif',
  'Garamond': 'Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif',
  'Geneva': 'Geneva, Tahoma, Verdana, sans-serif',
  'Georgia': 'Georgia, Times, "Times New Roman", serif',
  'Gill Sans': '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
  'Goudy Old Style': '"Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif',
  'Helvetica': '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'Hoefler Text': '"Hoefler Text", "Baskerville old face", Garamond, "Times New Roman", serif',
  'Impact': 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans serif',
  'Lucida Bright': '"Lucida Bright", Georgia, serif',
  'Lucida Console': '"Lucida Console", "Lucida Sans Typewriter", Monaco, "Bitstream Vera Sans Mono", monospace',
  'Lucida Sans Typewriter': '"Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace',
  'Lucida Grande': '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
  'Monaco': 'Monaco, Consolas, "Lucida Console", monospace',
  'Optima': 'Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif',
  'Palatino': 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  'Papyrus': 'Papyrus, fantasy',
  'Perpetua': 'Perpetua, Baskerville, "Big Caslon", "Palatino Linotype", Palatino, "URW Palladio L", "Nimbus Roman No9 L", serif',
  'Rockwell': 'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif',
  'Rockwell Extra Bold': '"Rockwell Extra Bold", "Rockwell Bold", monospace',
  'Segoe UI': '"Segoe UI", Frutiger, "Frutiger Linotype',
  'Tahoma': 'Tahoma, Verdana, Segoe, sans-serif',
  'Times New Roman': 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
  'Trebuchet MS': '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
  'Verdana': 'Verdana, Geneva, sans-serif'
};

/* ==========================================================
 * bootstrap-formhelpers-fontsizes.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHFontSizesList = {
  '8': '8px',
  '9': '9px',
  '10': '10px',
  '11': '11px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '36': '36px',
  '48': '48px'
};

/* ==========================================================
 * bootstrap-formhelpers-googlefonts.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var BFHGoogleFontsList = {
  'kind': 'webfonts#webfontList',
  'items': [
    {
      'kind': 'webfonts#webfont',
      'family': 'ABeeZee',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Abel',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Abril Fatface',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aclonica',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Acme',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Actor',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Adamina',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Advent Pro',
      'variants': [
        '100',
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aguafina Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Akronim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aladin',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aldrich',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alegreya',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alegreya SC',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alex Brush',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alfa Slab One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alice',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alike',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alike Angular',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allan',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allerta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allerta Stencil',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allura',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Almendra',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Almendra Display',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Almendra SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amarante',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amaranth',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amatic SC',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amethysta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Anaheim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Andada',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Andika',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Angkor',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Annie Use Your Telescope',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Anonymous Pro',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Antic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Antic Didone',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Antic Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Anton',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arapey',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arbutus',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arbutus Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Architects Daughter',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Archivo Black',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Archivo Narrow',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arimo',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arizonia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Armata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Artifika',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arvo',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Asap',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Asset',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Astloch',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Asul',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Atomic Age',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aubrey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Audiowide',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Autour One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Average',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Average Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Gruesa Libre',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Libre',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Sans Libre',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Serif Libre',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bad Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Balthazar',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bangers',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Basic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Battambang',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Baumans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bayon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Belgrano',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Belleza',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'BenchNine',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bentham',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Berkshire Swash',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bevan',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bigelow Rules',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bigshot One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bilbo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bilbo Swash Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bitter',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Black Ops One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bokor',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bonbon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Boogaloo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bowlby One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bowlby One SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Brawler',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bree Serif',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bubblegum Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bubbler One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Buda',
      'variants': [
        '300'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Buenard',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Butcherman',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Butterfly Kids',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cabin',
      'variants': [
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cabin Condensed',
      'variants': [
        'regular',
        '500',
        '600',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cabin Sketch',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Caesar Dressing',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cagliostro',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Calligraffitti',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cambo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Candal',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cantarell',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cantata One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cantora One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Capriola',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cardo',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'greek-ext',
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carme',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carrois Gothic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carrois Gothic SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carter One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Caudex',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'greek-ext',
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cedarville Cursive',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ceviche One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Changa One',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chango',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chau Philomene One',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chela One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chelsea Market',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chenla',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cherry Cream Soda',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cherry Swash',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chewy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chicle',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chivo',
      'variants': [
        'regular',
        'italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cinzel',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cinzel Decorative',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Clicker Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coda',
      'variants': [
        'regular',
        '800'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coda Caption',
      'variants': [
        '800'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Codystar',
      'variants': [
        '300',
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Combo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Comfortaa',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coming Soon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Concert One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Condiment',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Content',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Contrail One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Convergence',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cookie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Copse',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Corben',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Courgette',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cousine',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coustard',
      'variants': [
        'regular',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Covered By Your Grace',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crafty Girls',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Creepster',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crete Round',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crimson Text',
      'variants': [
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Croissant One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crushed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cuprum',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cutive',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cutive Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Damion',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dancing Script',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dangrek',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dawning of a New Day',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Days One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Delius',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Delius Swash Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Delius Unicase',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Della Respira',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Devonshire',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Didact Gothic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Diplomata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Diplomata SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Doppio One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dorsa',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dosis',
      'variants': [
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700',
        '800'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dr Sugiyama',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Droid Sans',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Droid Sans Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Droid Serif',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Duru Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dynalight',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'EB Garamond',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'vietnamese',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Eagle Lake',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Eater',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Economica',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Electrolize',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Emblema One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Emilys Candy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Engagement',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Englebert',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Enriqueta',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Erica One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Esteban',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Euphoria Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ewert',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Exo',
      'variants': [
        '100',
        '100italic',
        '200',
        '200italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '800',
        '800italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Expletus Sans',
      'variants': [
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fanwood Text',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fascinate',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fascinate Inline',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Faster One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fasthand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Federant',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Federo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Felipa',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fenix',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Finger Paint',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fjord One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Flamenco',
      'variants': [
        '300',
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Flavors',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fondamento',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fontdiner Swanky',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Forum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Francois One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Freckle Face',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fredericka the Great',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fredoka One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Freehand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fresca',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Frijole',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fugaz One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'GFS Didot',
      'variants': [
        'regular'
      ],
      'subsets': [
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'GFS Neohellenic',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gafata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Galdeano',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Galindo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gentium Basic',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gentium Book Basic',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Geo',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Geostar',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Geostar Fill',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Germania One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gilda Display',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Give You Glory',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Glass Antiqua',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Glegoo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gloria Hallelujah',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Goblin One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gochi Hand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gorditas',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Goudy Bookletter 1911',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Graduate',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gravitas One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Great Vibes',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Griffy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gruppo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gudea',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Habibi',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hammersmith One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hanalei',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hanalei Fill',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Handlee',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hanuman',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Happy Monkey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Headland One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Henny Penny',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Herr Von Muellerhoff',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Holtwood One SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Homemade Apple',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Homenaje',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell DW Pica',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell DW Pica SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Double Pica',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Double Pica SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell English',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell English SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell French Canon',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell French Canon SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Great Primer',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Great Primer SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Iceberg',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Iceland',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Imprima',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Inconsolata',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Inder',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Indie Flower',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Inika',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Irish Grover',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Istok Web',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Italiana',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Italianno',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jacques Francois',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jacques Francois Shadow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jim Nightshade',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jockey One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jolly Lodger',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Josefin Sans',
      'variants': [
        '100',
        '100italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Josefin Slab',
      'variants': [
        '100',
        '100italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Joti One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Judson',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Julee',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Julius Sans One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Junge',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jura',
      'variants': [
        '300',
        'regular',
        '500',
        '600'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Just Another Hand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Just Me Again Down Here',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kameron',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Karla',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kaushan Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Keania One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kelly Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kenia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Khmer',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kite One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Knewave',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kotta One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Koulen',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kranky',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kreon',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kristi',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Krona One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'La Belle Aurore',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lancelot',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lato',
      'variants': [
        '100',
        '100italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'League Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Leckerli One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ledger',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lekton',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lemon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Life Savers',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lilita One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Limelight',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Linden Hill',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lobster',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lobster Two',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Outline',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Shadow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Sketch',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Solid',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lora',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Love Ya Like A Sister',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Loved by the King',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lovers Quarrel',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Luckiest Guy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lusitana',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lustria',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Macondo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Macondo Swash Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Magra',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Maiden Orange',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mako',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marcellus',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marcellus SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marck Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Margarine',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marko One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marmelad',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marvel',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mate',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mate SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Maven Pro',
      'variants': [
        'regular',
        '500',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'McLaren',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Meddon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'MedievalSharp',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Medula One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Megrim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Meie Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Merienda',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Merienda One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Merriweather',
      'variants': [
        '300',
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metal',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metal Mania',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metamorphous',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metrophobic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Michroma',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miltonian',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miltonian Tattoo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miniver',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miss Fajardose',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Modern Antiqua',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Molengo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Molle',
      'variants': [
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Monofett',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Monoton',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Monsieur La Doulaise',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montaga',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montez',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montserrat',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montserrat Alternates',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montserrat Subrayada',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Moul',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Moulpali',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mountains of Christmas',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mouse Memoirs',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mr Bedfort',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mr Dafoe',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mr De Haviland',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mrs Saint Delafield',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mrs Sheppards',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Muli',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mystery Quest',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Neucha',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Neuton',
      'variants': [
        '200',
        '300',
        'regular',
        'italic',
        '700',
        '800'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'News Cycle',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Niconne',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nixie One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nobile',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nokora',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Norican',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nosifer',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nothing You Could Do',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Noticia Text',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin',
        'vietnamese'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Cut',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Flat',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Oval',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Round',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Slim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Square',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Numans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nunito',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Odor Mean Chey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Offside',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Old Standard TT',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oldenburg',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oleo Script',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oleo Script Swash Caps',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Open Sans',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '800',
        '800italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'vietnamese',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Open Sans Condensed',
      'variants': [
        '300',
        '300italic',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'vietnamese',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oranienbaum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Orbitron',
      'variants': [
        'regular',
        '500',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oregano',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Orienta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Original Surfer',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oswald',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Over the Rainbow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Overlock',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Overlock SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ovo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oxygen',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oxygen Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Sans',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Sans Caption',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Sans Narrow',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Serif',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Serif Caption',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pacifico',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Paprika',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Parisienne',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Passero One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Passion One',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Patrick Hand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Patua One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Paytone One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Peralta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Permanent Marker',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Petit Formal Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Petrona',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Philosopher',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Piedra',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pinyon Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pirata One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Plaster',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Play',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Playball',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Playfair Display',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Playfair Display SC',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Podkova',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Poiret One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Poller One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Poly',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pompiere',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pontano Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Port Lligat Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Port Lligat Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Prata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Preahvihear',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Press Start 2P',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Princess Sofia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Prociono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Prosto One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Puritan',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Purple Purse',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quando',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quantico',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quattrocento',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quattrocento Sans',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Questrial',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quicksand',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quintessential',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Qwigley',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Racing Sans One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Radley',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Raleway',
      'variants': [
        '100',
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700',
        '800',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Raleway Dots',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rambla',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rammetto One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ranchers',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rancho',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rationale',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Redressed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Reenie Beanie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Revalia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ribeye',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ribeye Marrow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Righteous',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Risque',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rochester',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rock Salt',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rokkitt',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Romanesco',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ropa Sans',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rosario',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rosarivo',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rouge Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruda',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rufina',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruge Boogie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruluko',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rum Raisin',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruslan Display',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Russo One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruthie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rye',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sacramento',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sail',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Salsa',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sanchez',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sancreek',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sansita One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sarina',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Satisfy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Scada',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Schoolbell',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Seaweed Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sevillana',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Seymour One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shadows Into Light',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shadows Into Light Two',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shanti',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Share',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Share Tech',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Share Tech Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shojumaru',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Short Stack',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Siemreap',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sigmar One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Signika',
      'variants': [
        '300',
        'regular',
        '600',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Signika Negative',
      'variants': [
        '300',
        'regular',
        '600',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Simonetta',
      'variants': [
        'regular',
        'italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sirin Stencil',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Six Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Skranji',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Slackey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Smokum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Smythe',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sniglet',
      'variants': [
        '800'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Snippet',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Snowburst One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sofadi One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sofia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sonsie One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sorts Mill Goudy',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Source Code Pro',
      'variants': [
        '200',
        '300',
        'regular',
        '600',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Source Sans Pro',
      'variants': [
        '200',
        '200italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Special Elite',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Spicy Rice',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Spinnaker',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Spirax',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Squada One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stalemate',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stalinist One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stardos Stencil',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stint Ultra Condensed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stint Ultra Expanded',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stoke',
      'variants': [
        '300',
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Strait',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sue Ellen Francisco',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sunshiney',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Supermercado One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Suwannaphum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Swanky and Moo Moo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Syncopate',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tangerine',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Taprom',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Telex',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tenor Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Text Me One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'The Girl Next Door',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tienne',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tinos',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Titan One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Titillium Web',
      'variants': [
        '200',
        '200italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '900'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trade Winds',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trocchi',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trochut',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trykker',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tulpen One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ubuntu',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '500',
        '500italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ubuntu Condensed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ubuntu Mono',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ultra',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Uncial Antiqua',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Underdog',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unica One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'UnifrakturCook',
      'variants': [
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'UnifrakturMaguntia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unkempt',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unlock',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unna',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'VT323',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vampiro One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Varela',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Varela Round',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vast Shadow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vibur',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vidaloka',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Viga',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Voces',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Volkhov',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vollkorn',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Voltaire',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Waiting for the Sunrise',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Wallpoet',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Walter Turncoat',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Warnes',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Wellfleet',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Wire One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yanone Kaffeesatz',
      'variants': [
        '200',
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yellowtail',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yeseva One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yesteryear',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Zeyada',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    }
  ]
};

/* ==========================================================
 * bootstrap-formhelpers-languages.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHLanguagesList = {
  'om': 'Afaan Oromoo',
  'aa': 'Afaraf',
  'af': 'Afrikaans',
  'ak': 'Akan',
  'an': 'aragonés',
  'ig': 'Asụsụ Igbo',
  'gn': 'Avañe\'ẽ',
  'ae': 'avesta',
  'ay': 'aymar aru',
  'az': 'azərbaycan dili',
  'id': 'Bahasa Indonesia',
  'ms': 'bahasa Melayu',
  'bm': 'bamanankan',
  'jv': 'basa Jawa',
  'su': 'Basa Sunda',
  'bi': 'Bislama',
  'bs': 'bosanski jezik',
  'br': 'brezhoneg',
  'ca': 'català',
  'ch': 'Chamoru',
  'ny': 'chiCheŵa',
  'sn': 'chiShona',
  'co': 'corsu',
  'cy': 'Cymraeg',
  'da': 'dansk',
  'se': 'Davvisámegiella',
  'de': 'Deutsch',
  'nv': 'Diné bizaad',
  'et': 'eesti',
  'na': 'Ekakairũ Naoero',
  'en': 'English',
  'es': 'español',
  'eo': 'Esperanto',
  'eu': 'euskara',
  'ee': 'Eʋegbe',
  'to': 'faka Tonga',
  'mg': 'fiteny malagasy',
  'fr': 'français',
  'fy': 'Frysk',
  'ff': 'Fulfulde',
  'fo': 'føroyskt',
  'ga': 'Gaeilge',
  'gv': 'Gaelg',
  'sm': 'gagana fa\'a Samoa',
  'gl': 'galego',
  'sq': 'gjuha shqipe',
  'gd': 'Gàidhlig',
  'ki': 'Gĩkũyũ',
  'ha': 'Hausa',
  'ho': 'Hiri Motu',
  'hr': 'hrvatski jezik',
  'io': 'Ido',
  'rw': 'Ikinyarwanda',
  'rn': 'Ikirundi',
  'ia': 'Interlingua',
  'nd': 'isiNdebele',
  'nr': 'isiNdebele',
  'xh': 'isiXhosa',
  'zu': 'isiZulu',
  'it': 'italiano',
  'ik': 'Iñupiaq',
  'pl': 'polski',
  'mh': 'Kajin M̧ajeļ',
  'kl': 'kalaallisut',
  'kr': 'Kanuri',
  'kw': 'Kernewek',
  'kg': 'KiKongo',
  'sw': 'Kiswahili',
  'ht': 'Kreyòl ayisyen',
  'kj': 'Kuanyama',
  'ku': 'Kurdî',
  'la': 'latine',
  'lv': 'latviešu valoda',
  'lt': 'lietuvių kalba',
  'ro': 'limba română',
  'li': 'Limburgs',
  'ln': 'Lingála',
  'lg': 'Luganda',
  'lb': 'Lëtzebuergesch',
  'hu': 'magyar',
  'mt': 'Malti',
  'nl': 'Nederlands',
  'no': 'Norsk',
  'nb': 'Norsk bokmål',
  'nn': 'Norsk nynorsk',
  'uz': 'O\'zbek',
  'oc': 'occitan',
  'ie': 'Interlingue',
  'hz': 'Otjiherero',
  'ng': 'Owambo',
  'pt': 'português',
  'ty': 'Reo Tahiti',
  'rm': 'rumantsch grischun',
  'qu': 'Runa Simi',
  'sc': 'sardu',
  'za': 'Saɯ cueŋƅ',
  'st': 'Sesotho',
  'tn': 'Setswana',
  'ss': 'SiSwati',
  'sl': 'slovenski jezik',
  'sk': 'slovenčina',
  'so': 'Soomaaliga',
  'fi': 'suomi',
  'sv': 'Svenska',
  'mi': 'te reo Māori',
  'vi': 'Tiếng Việt',
  'lu': 'Tshiluba',
  've': 'Tshivenḓa',
  'tw': 'Twi',
  'tk': 'Türkmen',
  'tr': 'Türkçe',
  'ug': 'Uyƣurqə',
  'vo': 'Volapük',
  'fj': 'vosa Vakaviti',
  'wa': 'walon',
  'tl': 'Wikang Tagalog',
  'wo': 'Wollof',
  'ts': 'Xitsonga',
  'yo': 'Yorùbá',
  'sg': 'yângâ tî sängö',
  'is': 'Íslenska',
  'cs': 'čeština',
  'el': 'ελληνικά',
  'av': 'авар мацӀ',
  'ab': 'аҧсуа бызшәа',
  'ba': 'башҡорт теле',
  'be': 'беларуская мова',
  'bg': 'български език',
  'os': 'ирон æвзаг',
  'kv': 'коми кыв',
  'ky': 'Кыргызча',
  'mk': 'македонски јазик',
  'mn': 'монгол',
  'ce': 'нохчийн мотт',
  'ru': 'русский язык',
  'sr': 'српски језик',
  'tt': 'татар теле',
  'tg': 'тоҷикӣ',
  'uk': 'українська мова',
  'cv': 'чӑваш чӗлхи',
  'cu': 'ѩзыкъ словѣньскъ',
  'kk': 'қазақ тілі',
  'hy': 'Հայերեն',
  'yi': 'ייִדיש',
  'he': 'עברית',
  'ur': 'اردو',
  'ar': 'العربية',
  'fa': 'فارسی',
  'ps': 'پښتو',
  'ks': 'कश्मीरी',
  'ne': 'नेपाली',
  'pi': 'पाऴि',
  'bh': 'भोजपुरी',
  'mr': 'मराठी',
  'sa': 'संस्कृतम्',
  'sd': 'सिन्धी',
  'hi': 'हिन्दी',
  'as': 'অসমীয়া',
  'bn': 'বাংলা',
  'pa': 'ਪੰਜਾਬੀ',
  'gu': 'ગુજરાતી',
  'or': 'ଓଡ଼ିଆ',
  'ta': 'தமிழ்',
  'te': 'తెలుగు',
  'kn': 'ಕನ್ನಡ',
  'ml': 'മലയാളം',
  'si': 'සිංහල',
  'th': 'ไทย',
  'lo': 'ພາສາລາວ',
  'bo': 'བོད་ཡིག',
  'dz': 'རྫོང་ཁ',
  'my': 'ဗမာစာ',
  'ka': 'ქართული',
  'ti': 'ትግርኛ',
  'am': 'አማርኛ',
  'iu': 'ᐃᓄᒃᑎᑐᑦ',
  'oj': 'ᐊᓂᔑᓈᐯᒧᐎᓐ',
  'cr': 'ᓀᐦᐃᔭᐍᐏᐣ',
  'km': 'ខ្មែរ',
  'zh': '中文 (Zhōngwén)',
  'ja': '日本語 (にほんご)',
  'ii': 'ꆈꌠ꒿ Nuosuhxop',
  'ko': '한국어 (韓國語)'
};

/* ==========================================================
 * bootstrap-formhelpers-phone.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file edcept in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either edpress or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHPhoneFormatList = {
  'AF': '+93 0dd ddd dddd',
  'AL': '+355 0dd ddd ddd',
  'DZ': '+213 0ddd dd dd dd',
  'AS': '+1 (ddd) ddd-dddd',
  'AD': '+376 ddddddddd',
  'AO': '+244 ddd ddd ddd',
  'AI': '+1 (ddd) ddd-dddd',
  'AQ': '+672 ddddddddd',
  'AG': '+1 (ddd) ddd-dddd',
  'AR': '+54 ddddddddd',
  'AM': '+374 0dd dddddd',
  'AW': '+297 ddd dddd',
  'AU': '+61 ddd ddd ddd',
  'AT': '+43 0dddd ddddddddd',
  'AZ': '+994 ddddddddd',
  'BH': '+973 ddddddddd',
  'BD': '+880 ddddddddd',
  'BB': '+1 ddddddddd',
  'BY': '+375 ddddddddd',
  'BE': '+32 ddddddddd',
  'BZ': '+501 ddddddddd',
  'BJ': '+229 ddddddddd',
  'BM': '+1 (ddd) ddd-dddd',
  'BT': '+975 ddddddddd',
  'BO': '+591 ddddddddd',
  'BA': '+387 ddddddddd',
  'BW': '+267 ddddddddd',
  'BV': '+0 ddddddddd',
  'BR': '+55 ddddddddd',
  'IO': '+0 ddddddddd',
  'VG': '+1 (ddd) ddd-dddd',
  'BN': '+673 ddddddddd',
  'BG': '+359 ddddddddd',
  'BF': '+226 ddddddddd',
  'BI': '+257 ddddddddd',
  'CI': '+225 ddddddddd',
  'KH': '+855 ddddddddd',
  'CM': '+237 ddddddddd',
  'CA': '+1 (ddd) ddd-dddd',
  'CV': '+238 ddddddddd',
  'KY': '+1 (ddd) ddd-dddd',
  'CF': '+236 ddddddddd',
  'TD': '+235 ddddddddd',
  'CL': '+56 ddddddddd',
  'CN': '+86 ddddddddd',
  'CX': '+61 ddddddddd',
  'CC': '+61 ddddddddd',
  'CO': '+57 ddddddddd',
  'KM': '+269 ddddddddd',
  'CG': '+242 ddddddddd',
  'CK': '+682 ddddddddd',
  'CR': '+506 ddddddddd',
  'HR': '+385 ddddddddd',
  'CU': '+53 ddddddddd',
  'CY': '+357 ddddddddd',
  'CZ': '+420 ddddddddd',
  'CD': '+243 ddddddddd',
  'DK': '+45 ddddddddd',
  'DJ': '+253 ddddddddd',
  'DM': '+1 (ddd) ddd-dddd',
  'DO': '+1 (ddd) ddd-dddd',
  'TL': '+670 ddddddddd',
  'EC': '+593 ddddddddd',
  'EG': '+20 ddddddddd',
  'SV': '+503 ddddddddd',
  'GQ': '+240 ddddddddd',
  'ER': '+291 ddddddddd',
  'EE': '+372 ddddddddd',
  'ET': '+251 ddddddddd',
  'FO': '+298 ddddddddd',
  'FK': '+500 ddddddddd',
  'FJ': '+679 ddddddddd',
  'FI': '+358 ddddddddd',
  'MK': '+389 ddddddddd',
  'FR': '+33 d dd dd dd dd',
  'GF': '+594 ddddddddd',
  'PF': '+689 ddddddddd',
  'TF': '+262 ddddddddd',
  'GA': '+241 ddddddddd',
  'GE': '+995 ddddddddd',
  'DE': '+49 ddddddddd',
  'GH': '+233 ddddddddd',
  'GI': '+350 ddddddddd',
  'GR': '+30 ddddddddd',
  'GL': '+299 ddddddddd',
  'GD': '+1 (ddd) ddd-dddd',
  'GP': '+590 ddddddddd',
  'GU': '+1 (ddd) ddd-dddd',
  'GT': '+502 ddddddddd',
  'GN': '+224 ddddddddd',
  'GW': '+245 ddddddddd',
  'GY': '+592 ddddddddd',
  'HT': '+509 ddddddddd',
  'HM': '+0 ddddddddd',
  'HN': '+504 ddddddddd',
  'HK': '+852 ddddddddd',
  'HU': '+36 ddddddddd',
  'IS': '+354 ddddddddd',
  'IN': '+91 ddddddddd',
  'ID': '+62 ddddddddd',
  'IR': '+98 ddddddddd',
  'IQ': '+964 ddddddddd',
  'IE': '+353 ddddddddd',
  'IL': '+972 ddddddddd',
  'IT': '+39 ddddddddd',
  'JM': '+1 (ddd) ddd-dddd',
  'JP': '+81 ddddddddd',
  'JO': '+962 ddddddddd',
  'KZ': '+7 ddddddddd',
  'KE': '+254 ddddddddd',
  'KI': '+686 ddddddddd',
  'KW': '+965 ddddddddd',
  'KG': '+996 ddddddddd',
  'LA': '+856 ddddddddd',
  'LV': '+371 ddddddddd',
  'LB': '+961 ddddddddd',
  'LS': '+266 ddddddddd',
  'LR': '+231 ddddddddd',
  'LY': '+218 ddddddddd',
  'LI': '+423 ddddddddd',
  'LT': '+370 ddddddddd',
  'LU': '+352 ddddddddd',
  'MO': '+853 ddddddddd',
  'MG': '+261 ddddddddd',
  'MW': '+265 ddddddddd',
  'MY': '+60 ddddddddd',
  'MV': '+960 ddddddddd',
  'ML': '+223 ddddddddd',
  'MT': '+356 ddddddddd',
  'MH': '+692 ddddddddd',
  'MQ': '+596 ddddddddd',
  'MR': '+222 ddddddddd',
  'MU': '+230 ddddddddd',
  'YT': '+262 ddddddddd',
  'MX': '+52 ddddddddd',
  'FM': '+691 ddddddddd',
  'MD': '+373 ddddddddd',
  'MC': '+377 ddddddddd',
  'MN': '+976 ddddddddd',
  'MS': '+1 (ddd) ddd-dddd',
  'MA': '+212 ddddddddd',
  'MZ': '+258 ddddddddd',
  'MM': '+95 ddddddddd',
  'NA': '+264 ddddddddd',
  'NR': '+674 ddddddddd',
  'NP': '+977 ddddddddd',
  'NL': '+31 ddddddddd',
  'AN': '+599 ddddddddd',
  'NC': '+687 ddddddddd',
  'NZ': '+64 ddddddddd',
  'NI': '+505 ddddddddd',
  'NE': '+227 ddddddddd',
  'NG': '+234 ddddddddd',
  'NU': '+683 ddddddddd',
  'NF': '+672 ddddddddd',
  'KP': '+850 ddddddddd',
  'MP': '+1 (ddd) ddd-dddd',
  'NO': '+47 ddddddddd',
  'OM': '+968 ddddddddd',
  'PK': '+92 ddddddddd',
  'PW': '+680 ddddddddd',
  'PA': '+507 ddddddddd',
  'PG': '+675 ddddddddd',
  'PY': '+595 ddddddddd',
  'PE': '+51 ddddddddd',
  'PH': '+63 ddddddddd',
  'PN': '+870 ddddddddd',
  'PL': '+48 ddddddddd',
  'PT': '+351 ddddddddd',
  'PR': '+1 (ddd) ddd-dddd',
  'QA': '+974 ddddddddd',
  'RE': '+262 ddddddddd',
  'RO': '+40 ddddddddd',
  'RU': '+7 ddddddddd',
  'RW': '+250 ddddddddd',
  'ST': '+239 ddddddddd',
  'SH': '+290 ddddddddd',
  'KN': '+1 (ddd) ddd-dddd',
  'LC': '+1 (ddd) ddd-dddd',
  'PM': '+508 ddddddddd',
  'VC': '+1 (ddd) ddd-dddd',
  'WS': '+685 ddddddddd',
  'SM': '+378 ddddddddd',
  'SA': '+966 ddddddddd',
  'SN': '+221 ddddddddd',
  'SC': '+248 ddddddddd',
  'SL': '+232 ddddddddd',
  'SG': '+65 ddddddddd',
  'SK': '+421 ddddddddd',
  'SI': '+386 ddddddddd',
  'SB': '+677 ddddddddd',
  'SO': '+252 ddddddddd',
  'ZA': '+27 ddddddddd',
  'GS': '+0 ddddddddd',
  'KR': '+82 ddddddddd',
  'ES': '+34 ddddddddd',
  'LK': '+94 ddddddddd',
  'SD': '+249 ddddddddd',
  'SR': '+597 ddddddddd',
  'SJ': '+0 ddddddddd',
  'SZ': '+268 ddddddddd',
  'SE': '+46 ddddddddd',
  'CH': '+41 ddddddddd',
  'SY': '+963 ddddddddd',
  'TW': '+886 ddddddddd',
  'TJ': '+992 ddddddddd',
  'TZ': '+255 ddddddddd',
  'TH': '+66 ddddddddd',
  'BS': '+1 (ddd) ddd-dddd',
  'GM': '+220 ddddddddd',
  'TG': '+228 ddddddddd',
  'TK': '+690 ddddddddd',
  'TO': '+676 ddddddddd',
  'TT': '+1 (ddd) ddd-dddd',
  'TN': '+216 ddddddddd',
  'TR': '+90 ddddddddd',
  'TM': '+993 ddddddddd',
  'TC': '+1 (ddd) ddd-dddd',
  'TV': '+688 ddddddddd',
  'VI': '+1 (ddd) ddd-dddd',
  'UG': '+256 ddddddddd',
  'UA': '+380 ddddddddd',
  'AE': '+971 ddddddddd',
  'GB': '+44 (ddd) dddd dddd',
  'US': '+1 (ddd) ddd-dddd',
  'UM': '+0 ddddddddd',
  'UY': '+598 ddddddddd',
  'UZ': '+998 ddddddddd',
  'VU': '+678 ddddddddd',
  'VA': '+39 ddddddddd',
  'VE': '+58 ddddddddd',
  'VN': '+84 ddddddddd',
  'WF': '+681 ddddddddd',
  'EH': '+0 ddddddddd',
  'YE': '+967 ddddddddd',
  'YU': '+0 ddddddddd',
  'ZM': '+260 ddddddddd',
  'ZW': '+263 ddddddddd'
};

/* ==========================================================
 * bootstrap-formhelpers-states.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var BFHStatesList = {
  'AF':{
    '1' : {'code':'BAL','name':'Balkh'},
    '2' : {'code':'BAM','name':'Bamian'},
    '3' : {'code':'BDG','name':'Badghis'},
    '4' : {'code':'BDS','name':'Badakhshan'},
    '5' : {'code':'BGL','name':'Baghlan'},
    '6' : {'code':'FRA','name':'Farah'},
    '7' : {'code':'FYB','name':'Faryab'},
    '8' : {'code':'GHA','name':'Ghazni'},
    '9' : {'code':'GHO','name':'Ghowr'},
    '10' : {'code':'HEL','name':'Helmand'},
    '11' : {'code':'HER','name':'Herat'},
    '12' : {'code':'JOW','name':'Jowzjan'},
    '13' : {'code':'KAB','name':'Kabul'},
    '14' : {'code':'KAN','name':'Kandahar'},
    '15' : {'code':'KAP','name':'Kapisa'},
    '16' : {'code':'KDZ','name':'Kondoz'},
    '17' : {'code':'KHO','name':'Khost'},
    '18' : {'code':'KNR','name':'Konar'},
    '19' : {'code':'LAG','name':'Laghman'},
    '20' : {'code':'LOW','name':'Lowgar'},
    '21' : {'code':'NAN','name':'Nangrahar'},
    '22' : {'code':'NIM','name':'Nimruz'},
    '23' : {'code':'NUR','name':'Nurestan'},
    '24' : {'code':'ORU','name':'Oruzgan'},
    '25' : {'code':'PAR','name':'Parwan'},
    '26' : {'code':'PIA','name':'Paktia'},
    '27' : {'code':'PKA','name':'Paktika'},
    '28' : {'code':'SAM','name':'Samangan'},
    '29' : {'code':'SAR','name':'Sar-e Pol'},
    '30' : {'code':'TAK','name':'Takhar'},
    '31' : {'code':'WAR','name':'Wardak'},
    '32' : {'code':'ZAB','name':'Zabol'}
  },
  'AL':{
    '1' : {'code':'BR','name':'Berat'},
    '2' : {'code':'BU','name':'Bulqize'},
    '3' : {'code':'DI','name':'Diber'},
    '4' : {'code':'DL','name':'Delvine'},
    '5' : {'code':'DR','name':'Durres'},
    '6' : {'code':'DV','name':'Devoll'},
    '7' : {'code':'EL','name':'Elbasan'},
    '8' : {'code':'ER','name':'Kolonje'},
    '9' : {'code':'FR','name':'Fier'},
    '10' : {'code':'GJ','name':'Gjirokaster'},
    '11' : {'code':'GR','name':'Gramsh'},
    '12' : {'code':'HA','name':'Has'},
    '13' : {'code':'KA','name':'Kavaje'},
    '14' : {'code':'KB','name':'Kurbin'},
    '15' : {'code':'KC','name':'Kucove'},
    '16' : {'code':'KO','name':'Korce'},
    '17' : {'code':'KR','name':'Kruje'},
    '18' : {'code':'KU','name':'Kukes'},
    '19' : {'code':'LB','name':'Librazhd'},
    '20' : {'code':'LE','name':'Lezhe'},
    '21' : {'code':'LU','name':'Lushnje'},
    '22' : {'code':'MK','name':'Mallakaster'},
    '23' : {'code':'MM','name':'Malesi e Madhe'},
    '24' : {'code':'MR','name':'Mirdite'},
    '25' : {'code':'MT','name':'Mat'},
    '26' : {'code':'PG','name':'Pogradec'},
    '27' : {'code':'PQ','name':'Peqin'},
    '28' : {'code':'PR','name':'Permet'},
    '29' : {'code':'PU','name':'Puke'},
    '30' : {'code':'SH','name':'Shkoder'},
    '31' : {'code':'SK','name':'Skrapar'},
    '32' : {'code':'SR','name':'Sarande'},
    '33' : {'code':'TE','name':'Tepelene'},
    '34' : {'code':'TP','name':'Tropoje'},
    '35' : {'code':'TR','name':'Tirane'},
    '36' : {'code':'VL','name':'Vlore'}
  },
  'DZ':{
    '1' : {'code':'ADE','name':'Ain Defla'},
    '2' : {'code':'ADR','name':'Adrar'},
    '3' : {'code':'ALG','name':'Alger'},
    '4' : {'code':'ANN','name':'Annaba'},
    '5' : {'code':'ATE','name':'Ain Temouchent'},
    '6' : {'code':'BAT','name':'Batna'},
    '7' : {'code':'BBA','name':'Bordj Bou Arreridj'},
    '8' : {'code':'BEC','name':'Bechar'},
    '9' : {'code':'BEJ','name':'Bejaia'},
    '10' : {'code':'BIS','name':'Biskra'},
    '11' : {'code':'BLI','name':'Blida'},
    '12' : {'code':'BMD','name':'Boumerdes'},
    '13' : {'code':'BOA','name':'Bouira'},
    '14' : {'code':'CHL','name':'Chlef'},
    '15' : {'code':'CON','name':'Constantine'},
    '16' : {'code':'DJE','name':'Djelfa'},
    '17' : {'code':'EBA','name':'El Bayadh'},
    '18' : {'code':'EOU','name':'El Oued'},
    '19' : {'code':'ETA','name':'El Tarf'},
    '20' : {'code':'GHA','name':'Ghardaia'},
    '21' : {'code':'GUE','name':'Guelma'},
    '22' : {'code':'ILL','name':'Illizi'},
    '23' : {'code':'JIJ','name':'Jijel'},
    '24' : {'code':'KHE','name':'Khenchela'},
    '25' : {'code':'LAG','name':'Laghouat'},
    '26' : {'code':'MED','name':'Medea'},
    '27' : {'code':'MIL','name':'Mila'},
    '28' : {'code':'MOS','name':'Mostaganem'},
    '29' : {'code':'MSI','name':'M\'Sila'},
    '30' : {'code':'MUA','name':'Muaskar'},
    '31' : {'code':'NAA','name':'Naama'},
    '32' : {'code':'OEB','name':'Oum el-Bouaghi'},
    '33' : {'code':'ORA','name':'Oran'},
    '34' : {'code':'OUA','name':'Ouargla'},
    '35' : {'code':'REL','name':'Relizane'},
    '36' : {'code':'SAH','name':'Souk Ahras'},
    '37' : {'code':'SAI','name':'Saida'},
    '38' : {'code':'SBA','name':'Sidi Bel Abbes'},
    '39' : {'code':'SET','name':'Setif'},
    '40' : {'code':'SKI','name':'Skikda'},
    '41' : {'code':'TAM','name':'Tamanghasset'},
    '42' : {'code':'TEB','name':'Tebessa'},
    '43' : {'code':'TIA','name':'Tiaret'},
    '44' : {'code':'TIN','name':'Tindouf'},
    '45' : {'code':'TIP','name':'Tipaza'},
    '46' : {'code':'TIS','name':'Tissemsilt'},
    '47' : {'code':'TLE','name':'Tlemcen'},
    '48' : {'code':'TOU','name':'Tizi Ouzou'}
  },
  'AS':{
    '1' : {'code':'E','name':'Eastern'},
    '2' : {'code':'M','name':'Manu\'a'},
    '3' : {'code':'R','name':'Rose Island'},
    '4' : {'code':'S','name':'Swains Island'},
    '5' : {'code':'W','name':'Western'}
  },
  'AD':{
    '1' : {'code':'ALV','name':'Andorra la Vella'},
    '2' : {'code':'CAN','name':'Canillo'},
    '3' : {'code':'ENC','name':'Encamp'},
    '4' : {'code':'ESE','name':'Escaldes-Engordany'},
    '5' : {'code':'LMA','name':'La Massana'},
    '6' : {'code':'ORD','name':'Ordino'},
    '7' : {'code':'SJL','name':'Sant Julià de Lòria'}
  },
  'AO':{
    '1' : {'code':'BGO','name':'Bengo'},
    '2' : {'code':'BGU','name':'Benguela'},
    '3' : {'code':'BIE','name':'Bie'},
    '4' : {'code':'CAB','name':'Cabinda'},
    '5' : {'code':'CCU','name':'Cuando-Cubango'},
    '6' : {'code':'CNO','name':'Cuanza Norte'},
    '7' : {'code':'CUS','name':'Cuanza Sul'},
    '8' : {'code':'CNN','name':'Cunene'},
    '9' : {'code':'HUA','name':'Huambo'},
    '10' : {'code':'HUI','name':'Huila'},
    '11' : {'code':'LUA','name':'Luanda'},
    '12' : {'code':'LNO','name':'Lunda Norte'},
    '13' : {'code':'LSU','name':'Lunda Sul'},
    '14' : {'code':'MAL','name':'Malange'},
    '15' : {'code':'MOX','name':'Moxico'},
    '16' : {'code':'NAM','name':'Namibe'},
    '17' : {'code':'UIG','name':'Uige'},
    '18' : {'code':'ZAI','name':'Zaire'}
  },
  'AI':{
    '1' : {'code':'ANG','name':'Anguillita'},
    '2' : {'code':'ANG','name':'Anguila'},
    '3' : {'code':'DOG','name':'Dog'},
    '4' : {'code':'LIT','name':'Little Scrub'},
    '5' : {'code':'PRI','name':'Prickly Pear'},
    '6' : {'code':'SAN','name':'Sandy'},
    '7' : {'code':'SCR','name':'Scrub'},
    '8' : {'code':'SEA','name':'Seal'},
    '9' : {'code':'SOM','name':'Sombrero'}
  },
  'AQ':{
    '1' : {'code':'ASG','name':'Saint George'},
    '2' : {'code':'ASH','name':'Saint Philip'},
    '3' : {'code':'ASJ','name':'Saint John'},
    '4' : {'code':'ASL','name':'Saint Paul'},
    '5' : {'code':'ASM','name':'Saint Mary'},
    '6' : {'code':'ASR','name':'Saint Peter'},
    '7' : {'code':'BAR','name':'Barbuda'},
    '8' : {'code':'RED','name':'Redonda'}
  },
  'AR':{
    '1' : {'code':'AN','name':'Antartida e Islas del Atlantico'},
    '2' : {'code':'BA','name':'Buenos Aires'},
    '3' : {'code':'CA','name':'Catamarca'},
    '4' : {'code':'CH','name':'Chaco'},
    '5' : {'code':'CU','name':'Chubut'},
    '6' : {'code':'CO','name':'Cordoba'},
    '7' : {'code':'CR','name':'Corrientes'},
    '8' : {'code':'CF','name':'Capital Federal'},
    '9' : {'code':'ER','name':'Entre Rios'},
    '10' : {'code':'FO','name':'Formosa'},
    '11' : {'code':'JU','name':'Jujuy'},
    '12' : {'code':'LP','name':'La Pampa'},
    '13' : {'code':'LR','name':'La Rioja'},
    '14' : {'code':'ME','name':'Mendoza'},
    '15' : {'code':'MI','name':'Misiones'},
    '16' : {'code':'NE','name':'Neuquen'},
    '17' : {'code':'RN','name':'Rio Negro'},
    '18' : {'code':'SA','name':'Salta'},
    '19' : {'code':'SJ','name':'San Juan'},
    '20' : {'code':'SL','name':'San Luis'},
    '21' : {'code':'SC','name':'Santa Cruz'},
    '22' : {'code':'SF','name':'Santa Fe'},
    '23' : {'code':'SD','name':'Santiago del Estero'},
    '24' : {'code':'TF','name':'Tierra del Fuego'},
    '25' : {'code':'TU','name':'Tucuman'}
  },
  'AM':{
    '1' : {'code':'AGT','name':'Aragatsotn'},
    '2' : {'code':'ARR','name':'Ararat'},
    '3' : {'code':'ARM','name':'Armavir'},
    '4' : {'code':'GEG','name':'Geghark \'unik\''},
    '5' : {'code':'KOT','name':'Kotayk\''},
    '6' : {'code':'LOR','name':'Lorri'},
    '7' : {'code':'SHI','name':'Shirak'},
    '8' : {'code':'SYU','name':'Syunik\''},
    '9' : {'code':'TAV','name':'Tavush'},
    '10' : {'code':'VAY','name':'Vayots\' Dzor'},
    '11' : {'code':'YER','name':'Yerevan'}
  },
  'AW':{
    '1' : {'code':'ARU','name':'Aruba'},
    '2' : {'code':'DRU','name':'Druif Beach'},
    '3' : {'code':'MAN','name':'Manchebo Beach'},
    '4' : {'code':'NOO','name':'Noord'},
    '5' : {'code':'ORA','name':'Oranjestad'},
    '6' : {'code':'PAL','name':'Palm Beach'},
    '7' : {'code':'ROO','name':'Rooi Thomas'},
    '8' : {'code':'SIN','name':'Sint Nicolaas'},
    '9' : {'code':'SIN','name':'Sint Nicolas'},
    '10' : {'code':'WAY','name':'Wayaca'}
  },
  'AU':{
    '1' : {'code':'ACT','name':'Australian Capital Territory'},
    '2' : {'code':'NSW','name':'New South Wales'},
    '3' : {'code':'NT','name':'Northern Territory'},
    '4' : {'code':'QLD','name':'Queensland'},
    '5' : {'code':'SA','name':'South Australia'},
    '6' : {'code':'TAS','name':'Tasmania'},
    '7' : {'code':'VIC','name':'Victoria'},
    '8' : {'code':'WA','name':'Western Australia'}
  },
  'AT':{
    '1' : {'code':'BUR','name':'Burgenland'},
    '2' : {'code':'KAR','name':'Krnten'},
    '3' : {'code':'NOS','name':'Niederöesterreich'},
    '4' : {'code':'OOS','name':'Oberöesterreich'},
    '5' : {'code':'SAL','name':'Salzburg'},
    '6' : {'code':'STE','name':'Steiermark'},
    '7' : {'code':'TIR','name':'Tirol'},
    '8' : {'code':'VOR','name':'Vorarlberg'},
    '9' : {'code':'WIE','name':'Wien'}
  },
  'AZ':{
    '1' : {'code':'AB','name':'Ali Bayramli'},
    '2' : {'code':'ABS','name':'Abseron'},
    '3' : {'code':'AGC','name':'AgcabAdi'},
    '4' : {'code':'AGM','name':'Agdam'},
    '5' : {'code':'AGS','name':'Agdas'},
    '6' : {'code':'AGA','name':'Agstafa'},
    '7' : {'code':'AGU','name':'Agsu'},
    '8' : {'code':'AST','name':'Astara'},
    '9' : {'code':'BA','name':'Baki'},
    '10' : {'code':'BAB','name':'BabAk'},
    '11' : {'code':'BAL','name':'BalakAn'},
    '12' : {'code':'BAR','name':'BArdA'},
    '13' : {'code':'BEY','name':'Beylaqan'},
    '14' : {'code':'BIL','name':'Bilasuvar'},
    '15' : {'code':'CAB','name':'Cabrayil'},
    '16' : {'code':'CAL','name':'Calilabab'},
    '17' : {'code':'CUL','name':'Culfa'},
    '18' : {'code':'DAS','name':'Daskasan'},
    '19' : {'code':'DAV','name':'Davaci'},
    '20' : {'code':'FUZ','name':'Fuzuli'},
    '21' : {'code':'GA','name':'Ganca'},
    '22' : {'code':'GAD','name':'Gadabay'},
    '23' : {'code':'GOR','name':'Goranboy'},
    '24' : {'code':'GOY','name':'Goycay'},
    '25' : {'code':'HAC','name':'Haciqabul'},
    '26' : {'code':'IMI','name':'Imisli'},
    '27' : {'code':'ISM','name':'Ismayilli'},
    '28' : {'code':'KAL','name':'Kalbacar'},
    '29' : {'code':'KUR','name':'Kurdamir'},
    '30' : {'code':'LA','name':'Lankaran'},
    '31' : {'code':'LAC','name':'Lacin'},
    '32' : {'code':'LAN','name':'Lankaran'},
    '33' : {'code':'LER','name':'Lerik'},
    '34' : {'code':'MAS','name':'Masalli'},
    '35' : {'code':'MI','name':'Mingacevir'},
    '36' : {'code':'NA','name':'Naftalan'},
    '37' : {'code':'NX','name':'Naxcivan'},
    '38' : {'code':'NEF','name':'Neftcala'},
    '39' : {'code':'OGU','name':'Oguz'},
    '40' : {'code':'ORD','name':'Ordubad'},
    '41' : {'code':'QAB','name':'Qabala'},
    '42' : {'code':'QAX','name':'Qax'},
    '43' : {'code':'QAZ','name':'Qazax'},
    '44' : {'code':'QOB','name':'Qobustan'},
    '45' : {'code':'QBA','name':'Quba'},
    '46' : {'code':'QBI','name':'Qubadli'},
    '47' : {'code':'QUS','name':'Qusar'},
    '48' : {'code':'SA','name':'Saki'},
    '49' : {'code':'SAT','name':'Saatli'},
    '50' : {'code':'SAB','name':'Sabirabad'},
    '51' : {'code':'SAD','name':'Sadarak'},
    '52' : {'code':'SAH','name':'Sahbuz'},
    '53' : {'code':'SAK','name':'Saki'},
    '54' : {'code':'SAL','name':'Salyan'},
    '55' : {'code':'SM','name':'Sumqayit'},
    '56' : {'code':'SMI','name':'Samaxi'},
    '57' : {'code':'SKR','name':'Samkir'},
    '58' : {'code':'SMX','name':'Samux'},
    '59' : {'code':'SAR','name':'Sarur'},
    '60' : {'code':'SIY','name':'Siyazan'},
    '61' : {'code':'SS','name':'Susa'},
    '62' : {'code':'SUS','name':'Susa'},
    '63' : {'code':'TAR','name':'Tartar'},
    '64' : {'code':'TOV','name':'Tovuz'},
    '65' : {'code':'UCA','name':'Ucar'},
    '66' : {'code':'XA','name':'Xankandi'},
    '67' : {'code':'XAC','name':'Xacmaz'},
    '68' : {'code':'XAN','name':'Xanlar'},
    '69' : {'code':'XIZ','name':'Xizi'},
    '70' : {'code':'XCI','name':'Xocali'},
    '71' : {'code':'XVD','name':'Xocavand'},
    '72' : {'code':'YAR','name':'Yardimli'},
    '73' : {'code':'YEV','name':'Yevlax'},
    '74' : {'code':'ZAN','name':'Zangilan'},
    '75' : {'code':'ZAQ','name':'Zaqatala'},
    '76' : {'code':'ZAR','name':'Zardab'}
  },
  'BS':{
    '1' : {'code':'ACK','name':'Acklins'},
    '2' : {'code':'BER','name':'Berry Islands'},
    '3' : {'code':'BIM','name':'Bimini'},
    '4' : {'code':'BLK','name':'Black Point'},
    '5' : {'code':'CAT','name':'Cat Island'},
    '6' : {'code':'CAB','name':'Central Abaco'},
    '7' : {'code':'CAN','name':'Central Andros'},
    '8' : {'code':'CEL','name':'Central Eleuthera'},
    '9' : {'code':'FRE','name':'City of Freeport'},
    '10' : {'code':'CRO','name':'Crooked Island'},
    '11' : {'code':'EGB','name':'East Grand Bahama'},
    '12' : {'code':'EXU','name':'Exuma'},
    '13' : {'code':'GRD','name':'Grand Cay'},
    '14' : {'code':'HAR','name':'Harbour Island'},
    '15' : {'code':'HOP','name':'Hope Town'},
    '16' : {'code':'INA','name':'Inagua'},
    '17' : {'code':'LNG','name':'Long Island'},
    '18' : {'code':'MAN','name':'Mangrove Cay'},
    '19' : {'code':'MAY','name':'Mayaguana'},
    '20' : {'code':'MOO','name':'Moore\'s Island'},
    '21' : {'code':'NAB','name':'North Abaco'},
    '22' : {'code':'NAN','name':'North Andros'},
    '23' : {'code':'NEL','name':'North Eleuthera'},
    '24' : {'code':'RAG','name':'Ragged Island'},
    '25' : {'code':'RUM','name':'Rum Cay'},
    '26' : {'code':'SAL','name':'San Salvador'},
    '27' : {'code':'SAB','name':'South Abaco'},
    '28' : {'code':'SAN','name':'South Andros'},
    '29' : {'code':'SEL','name':'South Eleuthera'},
    '30' : {'code':'SWE','name':'Spanish Wells'},
    '31' : {'code':'WGB','name':'West Grand Bahama'}
  },
  'BH':{
    '1' : {'code':'CAP','name':'Capital'},
    '2' : {'code':'CEN','name':'Central'},
    '3' : {'code':'MUH','name':'Muharraq'},
    '4' : {'code':'NOR','name':'Northern'},
    '5' : {'code':'SOU','name':'Southern'}
  },
  'BD':{
    '1' : {'code':'BAR','name':'Barisal'},
    '2' : {'code':'CHI','name':'Chittagong'},
    '3' : {'code':'DHA','name':'Dhaka'},
    '4' : {'code':'KHU','name':'Khulna'},
    '5' : {'code':'RAJ','name':'Rajshahi'},
    '6' : {'code':'SYL','name':'Sylhet'}
  },
  'BB':{
    '1' : {'code':'CC','name':'Christ Church'},
    '2' : {'code':'AND','name':'Saint Andrew'},
    '3' : {'code':'GEO','name':'Saint George'},
    '4' : {'code':'JAM','name':'Saint James'},
    '5' : {'code':'JOH','name':'Saint John'},
    '6' : {'code':'JOS','name':'Saint Joseph'},
    '7' : {'code':'LUC','name':'Saint Lucy'},
    '8' : {'code':'MIC','name':'Saint Michael'},
    '9' : {'code':'PET','name':'Saint Peter'},
    '10' : {'code':'PHI','name':'Saint Philip'},
    '11' : {'code':'THO','name':'Saint Thomas'}
  },
  'BY':{
    '1' : {'code':'BR','name':'Brestskaya (Brest)'},
    '2' : {'code':'HO','name':'Homyel\'skaya (Homyel\')'},
    '3' : {'code':'HM','name':'Horad Minsk'},
    '4' : {'code':'HR','name':'Hrodzyenskaya (Hrodna)'},
    '5' : {'code':'MA','name':'Mahilyowskaya (Mahilyow)'},
    '6' : {'code':'MI','name':'Minskaya'},
    '7' : {'code':'VI','name':'Vitsyebskaya (Vitsyebsk)'}
  },
  'BE':{
    '1' : {'code':'VAN','name':'Antwerpen'},
    '2' : {'code':'WBR','name':'Brabant Wallon'},
    '3' : {'code':'WHT','name':'Hainaut'},
    '4' : {'code':'WLG','name':'Liege'},
    '5' : {'code':'VLI','name':'Limburg'},
    '6' : {'code':'WLX','name':'Luxembourg'},
    '7' : {'code':'WNA','name':'Namur'},
    '8' : {'code':'VOV','name':'Oost-Vlaanderen'},
    '9' : {'code':'VBR','name':'Vlaams Brabant'},
    '10' : {'code':'VWV','name':'West-Vlaanderen'}
  },
  'BZ':{
    '1' : {'code':'BZ','name':'Belize'},
    '2' : {'code':'CY','name':'Cayo'},
    '3' : {'code':'CR','name':'Corozal'},
    '4' : {'code':'OW','name':'Orange Walk'},
    '5' : {'code':'SC','name':'Stann Creek'},
    '6' : {'code':'TO','name':'Toledo'}
  },
  'BJ':{
    '1' : {'code':'AL','name':'Alibori'},
    '2' : {'code':'AK','name':'Atakora'},
    '3' : {'code':'AQ','name':'Atlantique'},
    '4' : {'code':'BO','name':'Borgou'},
    '5' : {'code':'CO','name':'Collines'},
    '6' : {'code':'DO','name':'Donga'},
    '7' : {'code':'KO','name':'Kouffo'},
    '8' : {'code':'LI','name':'Littoral'},
    '9' : {'code':'MO','name':'Mono'},
    '10' : {'code':'OU','name':'Oueme'},
    '11' : {'code':'PL','name':'Plateau'},
    '12' : {'code':'ZO','name':'Zou'}
  },
  'BM':{
    '1' : {'code':'DS','name':'Devonshire'},
    '2' : {'code':'HC','name':'Hamilton City'},
    '3' : {'code':'HA','name':'Hamilton'},
    '4' : {'code':'PG','name':'Paget'},
    '5' : {'code':'PB','name':'Pembroke'},
    '6' : {'code':'GC','name':'Saint George City'},
    '7' : {'code':'SG','name':'Saint George\'s'},
    '8' : {'code':'SA','name':'Sandys'},
    '9' : {'code':'SM','name':'Smith\'s'},
    '10' : {'code':'SH','name':'Southampton'},
    '11' : {'code':'WA','name':'Warwick'}
  },
  'BT':{
    '1' : {'code':'BUM','name':'Bumthang'},
    '2' : {'code':'CHU','name':'Chukha'},
    '3' : {'code':'DAG','name':'Dagana'},
    '4' : {'code':'GAS','name':'Gasa'},
    '5' : {'code':'HAA','name':'Haa'},
    '6' : {'code':'LHU','name':'Lhuntse'},
    '7' : {'code':'MON','name':'Mongar'},
    '8' : {'code':'PAR','name':'Paro'},
    '9' : {'code':'PEM','name':'Pemagatshel'},
    '10' : {'code':'PUN','name':'Punakha'},
    '11' : {'code':'SJO','name':'Samdrup Jongkhar'},
    '12' : {'code':'SAT','name':'Samtse'},
    '13' : {'code':'SAR','name':'Sarpang'},
    '14' : {'code':'THI','name':'Thimphu'},
    '15' : {'code':'TRG','name':'Trashigang'},
    '16' : {'code':'TRY','name':'Trashiyangste'},
    '17' : {'code':'TRO','name':'Trongsa'},
    '18' : {'code':'TSI','name':'Tsirang'},
    '19' : {'code':'WPH','name':'Wangdue Phodrang'},
    '20' : {'code':'ZHE','name':'Zhemgang'}
  },
  'BO':{
    '1' : {'code':'BEN','name':'Beni'},
    '2' : {'code':'CHU','name':'Chuquisaca'},
    '3' : {'code':'COC','name':'Cochabamba'},
    '4' : {'code':'LPZ','name':'La Paz'},
    '5' : {'code':'ORU','name':'Oruro'},
    '6' : {'code':'PAN','name':'Pando'},
    '7' : {'code':'POT','name':'Potosi'},
    '8' : {'code':'SCZ','name':'Santa Cruz'},
    '9' : {'code':'TAR','name':'Tarija'}
  },
  'BA':{
    '1' : {'code':'BRO','name':'Brcko district'},
    '2' : {'code':'FBP','name':'Bosanskopodrinjski Kanton'},
    '3' : {'code':'FHN','name':'Hercegovacko-neretvanski Kanton'},
    '4' : {'code':'FPO','name':'Posavski Kanton'},
    '5' : {'code':'FSA','name':'Kanton Sarajevo'},
    '6' : {'code':'FSB','name':'Srednjebosanski Kanton'},
    '7' : {'code':'FTU','name':'Tuzlanski Kanton'},
    '8' : {'code':'FUS','name':'Unsko-Sanski Kanton'},
    '9' : {'code':'FZA','name':'Zapadnobosanska'},
    '10' : {'code':'FZE','name':'Zenicko-Dobojski Kanton'},
    '11' : {'code':'FZH','name':'Zapadnohercegovacka Zupanija'},
    '12' : {'code':'SBI','name':'Bijeljina'},
    '13' : {'code':'SBL','name':'Banja Luka'},
    '14' : {'code':'SDO','name':'Doboj'},
    '15' : {'code':'SFO','name':'Foca'},
    '16' : {'code':'SSR','name':'Sarajevo-Romanija or Sokolac'},
    '17' : {'code':'STR','name':'Trebinje'},
    '18' : {'code':'SVL','name':'Vlasenica'}
  },
  'BW':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'GH','name':'Ghanzi'},
    '3' : {'code':'KD','name':'Kgalagadi'},
    '4' : {'code':'KT','name':'Kgatleng'},
    '5' : {'code':'KW','name':'Kweneng'},
    '6' : {'code':'NG','name':'Ngamiland'},
    '7' : {'code':'NE','name':'North East'},
    '8' : {'code':'NW','name':'North West'},
    '9' : {'code':'SE','name':'South East'},
    '10' : {'code':'SO','name':'Southern'}
  },
  'BR':{
    '1' : {'code':'AC','name':'Acre'},
    '2' : {'code':'AL','name':'Alagoas'},
    '3' : {'code':'AP','name':'Amapa'},
    '4' : {'code':'AM','name':'Amazonas'},
    '5' : {'code':'BA','name':'Bahia'},
    '6' : {'code':'CE','name':'Ceara'},
    '7' : {'code':'DF','name':'Distrito Federal'},
    '8' : {'code':'ES','name':'Espirito Santo'},
    '9' : {'code':'GO','name':'Goias'},
    '10' : {'code':'MA','name':'Maranhao'},
    '11' : {'code':'MT','name':'Mato Grosso'},
    '12' : {'code':'MS','name':'Mato Grosso do Sul'},
    '13' : {'code':'MG','name':'Minas Gerais'},
    '14' : {'code':'PA','name':'Para'},
    '15' : {'code':'PB','name':'Paraiba'},
    '16' : {'code':'PR','name':'Parana'},
    '17' : {'code':'PE','name':'Pernambuco'},
    '18' : {'code':'PI','name':'Piaui'},
    '19' : {'code':'RJ','name':'Rio de Janeiro'},
    '20' : {'code':'RN','name':'Rio Grande do Norte'},
    '21' : {'code':'RS','name':'Rio Grande do Sul'},
    '22' : {'code':'RO','name':'Rondonia'},
    '23' : {'code':'RR','name':'Roraima'},
    '24' : {'code':'SC','name':'Santa Catarina'},
    '25' : {'code':'SP','name':'Sao Paulo'},
    '26' : {'code':'SE','name':'Sergipe'},
    '27' : {'code':'TO','name':'Tocantins'}
  },
  'IO':{
    '1' : {'code':'DG','name':'Diego Garcia'},
    '2' : {'code':'DI','name':'Danger Island'},
    '3' : {'code':'EA','name':'Eagle Islands'},
    '4' : {'code':'EG','name':'Egmont Islands'},
    '5' : {'code':'NI','name':'Nelsons Island'},
    '6' : {'code':'PB','name':'Peros Banhos'},
    '7' : {'code':'SI','name':'Salomon Islands'},
    '8' : {'code':'TB','name':'Three Brothers'}
  },
  'BN':{
    '1' : {'code':'BEL','name':'Belait'},
    '2' : {'code':'BRM','name':'Brunei and Muara'},
    '3' : {'code':'TEM','name':'Temburong'},
    '4' : {'code':'TUT','name':'Tutong'}
  },
  'BG':{
    '1' : {'code':'BG-01','name':'Blagoevgrad'},
    '2' : {'code':'BG-02','name':'Burgas'},
    '3' : {'code':'BG-03','name':'Dobrich'},
    '4' : {'code':'BG-04','name':'Gabrovo'},
    '5' : {'code':'BG-05','name':'Haskovo'},
    '6' : {'code':'BG-06','name':'Kardjali'},
    '7' : {'code':'BG-07','name':'Kyustendil'},
    '8' : {'code':'BG-08','name':'Lovech'},
    '9' : {'code':'BG-09','name':'Montana'},
    '10' : {'code':'BG-10','name':'Pazardjik'},
    '11' : {'code':'BG-11','name':'Pernik'},
    '12' : {'code':'BG-12','name':'Pleven'},
    '13' : {'code':'BG-13','name':'Plovdiv'},
    '14' : {'code':'BG-14','name':'Razgrad'},
    '15' : {'code':'BG-15','name':'Shumen'},
    '16' : {'code':'BG-16','name':'Silistra'},
    '17' : {'code':'BG-17','name':'Sliven'},
    '18' : {'code':'BG-18','name':'Smolyan'},
    '19' : {'code':'BG-19','name':'Sofia'},
    '20' : {'code':'BG-20','name':'Sofia - town'},
    '21' : {'code':'BG-21','name':'Stara Zagora'},
    '22' : {'code':'BG-22','name':'Targovishte'},
    '23' : {'code':'BG-23','name':'Varna'},
    '24' : {'code':'BG-24','name':'Veliko Tarnovo'},
    '25' : {'code':'BG-25','name':'Vidin'},
    '26' : {'code':'BG-26','name':'Vratza'},
    '27' : {'code':'BG-27','name':'Yambol'}
  },
  'BF':{
    '1' : {'code':'BAL','name':'Bale'},
    '2' : {'code':'BAM','name':'Bam'},
    '3' : {'code':'BAN','name':'Banwa'},
    '4' : {'code':'BAZ','name':'Bazega'},
    '5' : {'code':'BOR','name':'Bougouriba'},
    '6' : {'code':'BLG','name':'Boulgou'},
    '7' : {'code':'BOK','name':'Boulkiemde'},
    '8' : {'code':'COM','name':'Comoe'},
    '9' : {'code':'GAN','name':'Ganzourgou'},
    '10' : {'code':'GNA','name':'Gnagna'},
    '11' : {'code':'GOU','name':'Gourma'},
    '12' : {'code':'HOU','name':'Houet'},
    '13' : {'code':'IOA','name':'Ioba'},
    '14' : {'code':'KAD','name':'Kadiogo'},
    '15' : {'code':'KEN','name':'Kenedougou'},
    '16' : {'code':'KOD','name':'Komondjari'},
    '17' : {'code':'KOP','name':'Kompienga'},
    '18' : {'code':'KOS','name':'Kossi'},
    '19' : {'code':'KOL','name':'Koulpelogo'},
    '20' : {'code':'KOT','name':'Kouritenga'},
    '21' : {'code':'KOW','name':'Kourweogo'},
    '22' : {'code':'LER','name':'Leraba'},
    '23' : {'code':'LOR','name':'Loroum'},
    '24' : {'code':'MOU','name':'Mouhoun'},
    '25' : {'code':'NAH','name':'Nahouri'},
    '26' : {'code':'NAM','name':'Namentenga'},
    '27' : {'code':'NAY','name':'Nayala'},
    '28' : {'code':'NOU','name':'Noumbiel'},
    '29' : {'code':'OUB','name':'Oubritenga'},
    '30' : {'code':'OUD','name':'Oudalan'},
    '31' : {'code':'PAS','name':'Passore'},
    '32' : {'code':'PON','name':'Poni'},
    '33' : {'code':'SAG','name':'Sanguie'},
    '34' : {'code':'SAM','name':'Sanmatenga'},
    '35' : {'code':'SEN','name':'Seno'},
    '36' : {'code':'SIS','name':'Sissili'},
    '37' : {'code':'SOM','name':'Soum'},
    '38' : {'code':'SOR','name':'Sourou'},
    '39' : {'code':'TAP','name':'Tapoa'},
    '40' : {'code':'TUY','name':'Tuy'},
    '41' : {'code':'YAG','name':'Yagha'},
    '42' : {'code':'YAT','name':'Yatenga'},
    '43' : {'code':'ZIR','name':'Ziro'},
    '44' : {'code':'ZOD','name':'Zondoma'},
    '45' : {'code':'ZOW','name':'Zoundweogo'}
  },
  'BI':{
    '1' : {'code':'BB','name':'Bubanza'},
    '2' : {'code':'BJ','name':'Bujumbura'},
    '3' : {'code':'BR','name':'Bururi'},
    '4' : {'code':'CA','name':'Cankuzo'},
    '5' : {'code':'CI','name':'Cibitoke'},
    '6' : {'code':'GI','name':'Gitega'},
    '7' : {'code':'KR','name':'Karuzi'},
    '8' : {'code':'KY','name':'Kayanza'},
    '9' : {'code':'KI','name':'Kirundo'},
    '10' : {'code':'MA','name':'Makamba'},
    '11' : {'code':'MU','name':'Muramvya'},
    '12' : {'code':'MY','name':'Muyinga'},
    '13' : {'code':'MW','name':'Mwaro'},
    '14' : {'code':'NG','name':'Ngozi'},
    '15' : {'code':'RT','name':'Rutana'},
    '16' : {'code':'RY','name':'Ruyigi'}
  },
  'KH':{
    '1' : {'code':'BA','name':'Battambang'},
    '2' : {'code':'BM','name':'Banteay Meanchey'},
    '3' : {'code':'KB','name':'Keb'},
    '4' : {'code':'KK','name':'Kaoh Kong'},
    '5' : {'code':'KL','name':'Kandal'},
    '6' : {'code':'KM','name':'Kampong Cham'},
    '7' : {'code':'KN','name':'Kampong Chhnang'},
    '8' : {'code':'KO','name':'Kampong Som'},
    '9' : {'code':'KP','name':'Kampot'},
    '10' : {'code':'KR','name':'Kratie'},
    '11' : {'code':'KT','name':'Kampong Thom'},
    '12' : {'code':'KU','name':'Kampong Speu'},
    '13' : {'code':'MK','name':'Mondul Kiri'},
    '14' : {'code':'OM','name':'Oddar Meancheay'},
    '15' : {'code':'PA','name':'Pailin'},
    '16' : {'code':'PG','name':'Prey Veng'},
    '17' : {'code':'PP','name':'Phnom Penh'},
    '18' : {'code':'PR','name':'Preah Vihear'},
    '19' : {'code':'PS','name':'Preah Seihanu (Kompong Som or Si)'},
    '20' : {'code':'PU','name':'Pursat'},
    '21' : {'code':'RK','name':'Ratanak Kiri'},
    '22' : {'code':'SI','name':'Siemreap'},
    '23' : {'code':'SR','name':'Svay Rieng'},
    '24' : {'code':'ST','name':'Stung Treng'},
    '25' : {'code':'TK','name':'Takeo'}
  },
  'CM':{
    '1' : {'code':'ADA','name':'Adamawa (Adamaoua)'},
    '2' : {'code':'CEN','name':'Centre'},
    '3' : {'code':'EST','name':'East (Est)'},
    '4' : {'code':'EXN','name':'Extrême-Nord'},
    '5' : {'code':'LIT','name':'Littoral'},
    '6' : {'code':'NOR','name':'North (Nord)'},
    '7' : {'code':'NOT','name':'Northwest (Nord-Ouest)'},
    '8' : {'code':'OUE','name':'West (Ouest)'},
    '9' : {'code':'SUD','name':'South (Sud)'},
    '10' : {'code':'SOU','name':'Southwest (Sud-Ouest)'}
  },
  'CA':{
    '1' : {'code':'AB','name':'Alberta'},
    '2' : {'code':'BC','name':'British Columbia'},
    '3' : {'code':'MB','name':'Manitoba'},
    '4' : {'code':'NB','name':'New Brunswick'},
    '5' : {'code':'NL','name':'Newfoundland and Labrador'},
    '6' : {'code':'NT','name':'Northwest Territories'},
    '7' : {'code':'NS','name':'Nova Scotia'},
    '8' : {'code':'NU','name':'Nunavut'},
    '9' : {'code':'ON','name':'Ontario'},
    '10' : {'code':'PE','name':'Prince Edward Island'},
    '11' : {'code':'QC','name':'Québec'},
    '12' : {'code':'SK','name':'Saskatchewan'},
    '13' : {'code':'YT','name':'Yukon Territory'}
  },
  'CV':{
    '1' : {'code':'BV','name':'Boa Vista'},
    '2' : {'code':'BR','name':'Brava'},
    '3' : {'code':'CS','name':'Calheta de Sao Miguel'},
    '4' : {'code':'MA','name':'Maio'},
    '5' : {'code':'MO','name':'Mosteiros'},
    '6' : {'code':'PA','name':'Paul'},
    '7' : {'code':'PN','name':'Porto Novo'},
    '8' : {'code':'PR','name':'Praia'},
    '9' : {'code':'RG','name':'Ribeira Grande'},
    '10' : {'code':'SL','name':'Sal'},
    '11' : {'code':'CA','name':'Santa Catarina'},
    '12' : {'code':'CR','name':'Santa Cruz'},
    '13' : {'code':'SD','name':'Sao Domingos'},
    '14' : {'code':'SF','name':'Sao Filipe'},
    '15' : {'code':'SN','name':'Sao Nicolau'},
    '16' : {'code':'SV','name':'Sao Vicente'},
    '17' : {'code':'TA','name':'Tarrafal'}
  },
  'KY':{
    '1' : {'code':'CR','name':'Creek'},
    '2' : {'code':'EA','name':'Eastern'},
    '3' : {'code':'ML','name':'Midland'},
    '4' : {'code':'ST','name':'South Town'},
    '5' : {'code':'SP','name':'Spot Bay'},
    '6' : {'code':'SK','name':'Stake Bay'},
    '7' : {'code':'WD','name':'West End'},
    '8' : {'code':'WN','name':'Western'}
  },
  'CF':{
    '1' : {'code':'BAN','name':'Bangui'},
    '2' : {'code':'BBA','name':'Bamingui-Bangoran'},
    '3' : {'code':'BKO','name':'Basse-Kotto'},
    '4' : {'code':'HKO','name':'Haute-Kotto'},
    '5' : {'code':'HMB','name':'Haut-Mbomou'},
    '6' : {'code':'KEM','name':'Kemo'},
    '7' : {'code':'LOB','name':'Lobaye'},
    '8' : {'code':'MBO','name':'Mbomou'},
    '9' : {'code':'MKD','name':'Mambéré-Kadéï'},
    '10' : {'code':'NGR','name':'Nana-Grebizi'},
    '11' : {'code':'NMM','name':'Nana-Mambere'},
    '12' : {'code':'OMP','name':'Ombella-M\'Poko'},
    '13' : {'code':'OPE','name':'Ouham-Pende'},
    '14' : {'code':'OUH','name':'Ouham'},
    '15' : {'code':'OUK','name':'Ouaka'},
    '16' : {'code':'SMB','name':'Sangha-Mbaere'},
    '17' : {'code':'VAK','name':'Vakaga'}
  },
  'TD':{
    '1' : {'code':'BA','name':'Batha'},
    '2' : {'code':'BI','name':'Biltine'},
    '3' : {'code':'BE','name':'Borkou-Ennedi-Tibesti'},
    '4' : {'code':'CB','name':'Chari-Baguirmi'},
    '5' : {'code':'GU','name':'Guera'},
    '6' : {'code':'KA','name':'Kanem'},
    '7' : {'code':'LA','name':'Lac'},
    '8' : {'code':'LC','name':'Logone Occidental'},
    '9' : {'code':'LR','name':'Logone Oriental'},
    '10' : {'code':'MK','name':'Mayo-Kebbi'},
    '11' : {'code':'MC','name':'Moyen-Chari'},
    '12' : {'code':'OU','name':'Ouaddai'},
    '13' : {'code':'SA','name':'Salamat'},
    '14' : {'code':'TA','name':'Tandjile'}
  },
  'CL':{
    '1' : {'code':'AI','name':'Aisen del General Carlos Ibanez'},
    '2' : {'code':'AN','name':'Antofagasta'},
    '3' : {'code':'AR','name':'Araucania'},
    '4' : {'code':'AT','name':'Atacama'},
    '5' : {'code':'BI','name':'Bio-Bio'},
    '6' : {'code':'CO','name':'Coquimbo'},
    '7' : {'code':'LI','name':'Libertador General Bernardo O\'Hi'},
    '8' : {'code':'LL','name':'Los Lagos'},
    '9' : {'code':'MA','name':'Magallanes y de la Antartica Chi'},
    '10' : {'code':'ML','name':'Maule'},
    '11' : {'code':'RM','name':'Region Metropolitana'},
    '12' : {'code':'TA','name':'Tarapaca'},
    '13' : {'code':'VS','name':'Valparaiso'}
  },
  'CN':{
    '1' : {'code':'AN','name':'Anhui'},
    '2' : {'code':'BE','name':'Beijing'},
    '3' : {'code':'CH','name':'Chongqing'},
    '4' : {'code':'FU','name':'Fujian'},
    '5' : {'code':'GA','name':'Gansu'},
    '6' : {'code':'GU','name':'Guangdong'},
    '7' : {'code':'GX','name':'Guangxi'},
    '8' : {'code':'GZ','name':'Guizhou'},
    '9' : {'code':'HA','name':'Hainan'},
    '10' : {'code':'HB','name':'Hebei'},
    '11' : {'code':'HL','name':'Heilongjiang'},
    '12' : {'code':'HE','name':'Henan'},
    '13' : {'code':'HK','name':'Hong Kong'},
    '14' : {'code':'HU','name':'Hubei'},
    '15' : {'code':'HN','name':'Hunan'},
    '16' : {'code':'IM','name':'Inner Mongolia'},
    '17' : {'code':'JI','name':'Jiangsu'},
    '18' : {'code':'JX','name':'Jiangxi'},
    '19' : {'code':'JL','name':'Jilin'},
    '20' : {'code':'LI','name':'Liaoning'},
    '21' : {'code':'MA','name':'Macau'},
    '22' : {'code':'NI','name':'Ningxia'},
    '23' : {'code':'SH','name':'Shaanxi'},
    '24' : {'code':'SA','name':'Shandong'},
    '25' : {'code':'SG','name':'Shanghai'},
    '26' : {'code':'SX','name':'Shanxi'},
    '27' : {'code':'SI','name':'Sichuan'},
    '28' : {'code':'TI','name':'Tianjin'},
    '29' : {'code':'XI','name':'Xinjiang'},
    '30' : {'code':'YU','name':'Yunnan'},
    '31' : {'code':'ZH','name':'Zhejiang'}
  },
  'CC':{
    '1' : {'code':'D','name':'Direction Island'},
    '2' : {'code':'H','name':'Home Island'},
    '3' : {'code':'O','name':'Horsburgh Island'},
    '4' : {'code':'S','name':'South Island'},
    '5' : {'code':'W','name':'West Island'}
  },
  'CO':{
    '1' : {'code':'AMZ','name':'Amazonas'},
    '2' : {'code':'ANT','name':'Antioquia'},
    '3' : {'code':'ARA','name':'Arauca'},
    '4' : {'code':'ATL','name':'Atlantico'},
    '5' : {'code':'BDC','name':'Bogota D.C.'},
    '6' : {'code':'BOL','name':'Bolivar'},
    '7' : {'code':'BOY','name':'Boyaca'},
    '8' : {'code':'CAL','name':'Caldas'},
    '9' : {'code':'CAQ','name':'Caqueta'},
    '10' : {'code':'CAS','name':'Casanare'},
    '11' : {'code':'CAU','name':'Cauca'},
    '12' : {'code':'CES','name':'Cesar'},
    '13' : {'code':'CHO','name':'Choco'},
    '14' : {'code':'COR','name':'Cordoba'},
    '15' : {'code':'CAM','name':'Cundinamarca'},
    '16' : {'code':'GNA','name':'Guainia'},
    '17' : {'code':'GJR','name':'Guajira'},
    '18' : {'code':'GVR','name':'Guaviare'},
    '19' : {'code':'HUI','name':'Huila'},
    '20' : {'code':'MAG','name':'Magdalena'},
    '21' : {'code':'MET','name':'Meta'},
    '22' : {'code':'NAR','name':'Narino'},
    '23' : {'code':'NDS','name':'Norte de Santander'},
    '24' : {'code':'PUT','name':'Putumayo'},
    '25' : {'code':'QUI','name':'Quindio'},
    '26' : {'code':'RIS','name':'Risaralda'},
    '27' : {'code':'SAP','name':'San Andres y Providencia'},
    '28' : {'code':'SAN','name':'Santander'},
    '29' : {'code':'SUC','name':'Sucre'},
    '30' : {'code':'TOL','name':'Tolima'},
    '31' : {'code':'VDC','name':'Valle del Cauca'},
    '32' : {'code':'VAU','name':'Vaupes'},
    '33' : {'code':'VIC','name':'Vichada'}
  },
  'KM':{
    '1' : {'code':'G','name':'Grande Comore'},
    '2' : {'code':'A','name':'Anjouan'},
    '3' : {'code':'M','name':'Moheli'}
  },
  'CG':{
    '1' : {'code':'BO','name':'Bouenza'},
    '2' : {'code':'BR','name':'Brazzaville'},
    '3' : {'code':'CU','name':'Cuvette'},
    '4' : {'code':'CO','name':'Cuvette-Ouest'},
    '5' : {'code':'KO','name':'Kouilou'},
    '6' : {'code':'LE','name':'Lekoumou'},
    '7' : {'code':'LI','name':'Likouala'},
    '8' : {'code':'NI','name':'Niari'},
    '9' : {'code':'PL','name':'Plateaux'},
    '10' : {'code':'PO','name':'Pool'},
    '11' : {'code':'SA','name':'Sangha'}
  },
  'CK':{
    '1' : {'code':'AI','name':'Aitutaki'},
    '2' : {'code':'AT','name':'Atiu'},
    '3' : {'code':'MA','name':'Manuae'},
    '4' : {'code':'MG','name':'Mangaia'},
    '5' : {'code':'MK','name':'Manihiki'},
    '6' : {'code':'MT','name':'Mitiaro'},
    '7' : {'code':'MU','name':'Mauke'},
    '8' : {'code':'NI','name':'Nassau Island'},
    '9' : {'code':'PA','name':'Palmerston'},
    '10' : {'code':'PE','name':'Penrhyn'},
    '11' : {'code':'PU','name':'Pukapuka'},
    '12' : {'code':'RK','name':'Rakahanga'},
    '13' : {'code':'RR','name':'Rarotonga'},
    '14' : {'code':'SU','name':'Surwarrow'},
    '15' : {'code':'TA','name':'Takutea'}
  },
  'CR':{
    '1' : {'code':'AL','name':'Alajuela'},
    '2' : {'code':'CA','name':'Cartago'},
    '3' : {'code':'GU','name':'Guanacaste'},
    '4' : {'code':'HE','name':'Heredia'},
    '5' : {'code':'LI','name':'Limon'},
    '6' : {'code':'PU','name':'Puntarenas'},
    '7' : {'code':'SJ','name':'San Jose'}
  },
  'CI':{
    '1' : {'code':'ABE','name':'Abengourou'},
    '2' : {'code':'ABI','name':'Abidjan'},
    '3' : {'code':'ABO','name':'Aboisso'},
    '4' : {'code':'ADI','name':'Adiake'},
    '5' : {'code':'ADZ','name':'Adzope'},
    '6' : {'code':'AGB','name':'Agboville'},
    '7' : {'code':'AGN','name':'Agnibilekrou'},
    '8' : {'code':'ALE','name':'Alepe'},
    '9' : {'code':'BOC','name':'Bocanda'},
    '10' : {'code':'BAN','name':'Bangolo'},
    '11' : {'code':'BEO','name':'Beoumi'},
    '12' : {'code':'BIA','name':'Biankouma'},
    '13' : {'code':'BDK','name':'Bondoukou'},
    '14' : {'code':'BGN','name':'Bongouanou'},
    '15' : {'code':'BFL','name':'Bouafle'},
    '16' : {'code':'BKE','name':'Bouake'},
    '17' : {'code':'BNA','name':'Bouna'},
    '18' : {'code':'BDL','name':'Boundiali'},
    '19' : {'code':'DKL','name':'Dabakala'},
    '20' : {'code':'DBU','name':'Dabou'},
    '21' : {'code':'DAL','name':'Daloa'},
    '22' : {'code':'DAN','name':'Danane'},
    '23' : {'code':'DAO','name':'Daoukro'},
    '24' : {'code':'DIM','name':'Dimbokro'},
    '25' : {'code':'DIV','name':'Divo'},
    '26' : {'code':'DUE','name':'Duekoue'},
    '27' : {'code':'FER','name':'Ferkessedougou'},
    '28' : {'code':'GAG','name':'Gagnoa'},
    '29' : {'code':'GBA','name':'Grand-Bassam'},
    '30' : {'code':'GLA','name':'Grand-Lahou'},
    '31' : {'code':'GUI','name':'Guiglo'},
    '32' : {'code':'ISS','name':'Issia'},
    '33' : {'code':'JAC','name':'Jacqueville'},
    '34' : {'code':'KAT','name':'Katiola'},
    '35' : {'code':'KOR','name':'Korhogo'},
    '36' : {'code':'LAK','name':'Lakota'},
    '37' : {'code':'MAN','name':'Man'},
    '38' : {'code':'MKN','name':'Mankono'},
    '39' : {'code':'MBA','name':'Mbahiakro'},
    '40' : {'code':'ODI','name':'Odienne'},
    '41' : {'code':'OUM','name':'Oume'},
    '42' : {'code':'SAK','name':'Sakassou'},
    '43' : {'code':'SPE','name':'San-Pedro'},
    '44' : {'code':'SAS','name':'Sassandra'},
    '45' : {'code':'SEG','name':'Seguela'},
    '46' : {'code':'SIN','name':'Sinfra'},
    '47' : {'code':'SOU','name':'Soubre'},
    '48' : {'code':'TAB','name':'Tabou'},
    '49' : {'code':'TAN','name':'Tanda'},
    '50' : {'code':'TIE','name':'Tiebissou'},
    '51' : {'code':'TIN','name':'Tingrela'},
    '52' : {'code':'TIA','name':'Tiassale'},
    '53' : {'code':'TBA','name':'Touba'},
    '54' : {'code':'TLP','name':'Toulepleu'},
    '55' : {'code':'TMD','name':'Toumodi'},
    '56' : {'code':'VAV','name':'Vavoua'},
    '57' : {'code':'YAM','name':'Yamoussoukro'},
    '58' : {'code':'ZUE','name':'Zuenoula'}
  },
  'HR':{
    '1' : {'code':'BB','name':'Bjelovar-Bilogora'},
    '2' : {'code':'CZ','name':'City of Zagreb'},
    '3' : {'code':'DN','name':'Dubrovnik-Neretva'},
    '4' : {'code':'IS','name':'Istra'},
    '5' : {'code':'KA','name':'Karlovac'},
    '6' : {'code':'KK','name':'Koprivnica-Krizevci'},
    '7' : {'code':'KZ','name':'Krapina-Zagorje'},
    '8' : {'code':'LS','name':'Lika-Senj'},
    '9' : {'code':'ME','name':'Medimurje'},
    '10' : {'code':'OB','name':'Osijek-Baranja'},
    '11' : {'code':'PS','name':'Pozega-Slavonia'},
    '12' : {'code':'PG','name':'Primorje-Gorski Kotar'},
    '13' : {'code':'SI','name':'Sibenik'},
    '14' : {'code':'SM','name':'Sisak-Moslavina'},
    '15' : {'code':'SB','name':'Slavonski Brod-Posavina'},
    '16' : {'code':'SD','name':'Split-Dalmatia'},
    '17' : {'code':'VA','name':'Varazdin'},
    '18' : {'code':'VP','name':'Virovitica-Podravina'},
    '19' : {'code':'VS','name':'Vukovar-Srijem'},
    '20' : {'code':'ZK','name':'Zadar-Knin'},
    '21' : {'code':'ZA','name':'Zagreb'}
  },
  'CU':{
    '1' : {'code':'CA','name':'Camaguey'},
    '2' : {'code':'CD','name':'Ciego de Avila'},
    '3' : {'code':'CI','name':'Cienfuegos'},
    '4' : {'code':'CH','name':'Ciudad de La Habana'},
    '5' : {'code':'GR','name':'Granma'},
    '6' : {'code':'GU','name':'Guantanamo'},
    '7' : {'code':'HO','name':'Holguin'},
    '8' : {'code':'IJ','name':'Isla de la Juventud'},
    '9' : {'code':'LH','name':'La Habana'},
    '10' : {'code':'LT','name':'Las Tunas'},
    '11' : {'code':'MA','name':'Matanzas'},
    '12' : {'code':'PR','name':'Pinar del Rio'},
    '13' : {'code':'SS','name':'Sancti Spiritus'},
    '14' : {'code':'SC','name':'Santiago de Cuba'},
    '15' : {'code':'VC','name':'Villa Clara'}
  },
  'CY':{
    '1' : {'code':'F','name':'Famagusta'},
    '2' : {'code':'K','name':'Kyrenia'},
    '3' : {'code':'A','name':'Larnaca'},
    '4' : {'code':'I','name':'Limassol'},
    '5' : {'code':'N','name':'Nicosia'},
    '6' : {'code':'P','name':'Paphos'}
  },
  'CZ':{
    '1' : {'code':'A','name':'Hlavní město Praha'},
    '2' : {'code':'B','name':'Jihomoravský'},
    '3' : {'code':'C','name':'Jihočeský'},
    '4' : {'code':'E','name':'Pardubický'},
    '5' : {'code':'H','name':'Královéhradecký'},
    '6' : {'code':'J','name':'Vysočina'},
    '7' : {'code':'K','name':'Karlovarský'},
    '8' : {'code':'L','name':'Liberecký'},
    '9' : {'code':'M','name':'Olomoucký'},
    '10' : {'code':'P','name':'Plzeňský'},
    '11' : {'code':'S','name':'Středočeský'},
    '12' : {'code':'T','name':'Moravskoslezský'},
    '13' : {'code':'U','name':'Ústecký'},
    '14' : {'code':'Z','name':'Zlínský'}
  },
  'DK':{
    '1' : {'code':'AR','name':'Arhus'},
    '2' : {'code':'BH','name':'Bornholm'},
    '3' : {'code':'CO','name':'Copenhagen'},
    '4' : {'code':'FO','name':'Faroe Islands'},
    '5' : {'code':'FR','name':'Frederiksborg'},
    '6' : {'code':'FY','name':'Fyn'},
    '7' : {'code':'KO','name':'Kobenhavn'},
    '8' : {'code':'NO','name':'Nordjylland'},
    '9' : {'code':'RI','name':'Ribe'},
    '10' : {'code':'RK','name':'Ringkobing'},
    '11' : {'code':'RO','name':'Roskilde'},
    '12' : {'code':'SO','name':'Sonderjylland'},
    '13' : {'code':'ST','name':'Storstrom'},
    '14' : {'code':'VK','name':'Vejle'},
    '15' : {'code':'VJ','name':'Vestjælland'},
    '16' : {'code':'VB','name':'Viborg'}
  },
  'DJ':{
    '1' : {'code':'S','name':'\'Ali Sabih'},
    '2' : {'code':'K','name':'Dikhil'},
    '3' : {'code':'J','name':'Djibouti'},
    '4' : {'code':'O','name':'Obock'},
    '5' : {'code':'T','name':'Tadjoura'}
  },
  'DM':{
    '1' : {'code':'AND','name':'Saint Andrew Parish'},
    '2' : {'code':'DAV','name':'Saint David Parish'},
    '3' : {'code':'GEO','name':'Saint George Parish'},
    '4' : {'code':'JOH','name':'Saint John Parish'},
    '5' : {'code':'JOS','name':'Saint Joseph Parish'},
    '6' : {'code':'LUK','name':'Saint Luke Parish'},
    '7' : {'code':'MAR','name':'Saint Mark Parish'},
    '8' : {'code':'PAT','name':'Saint Patrick Parish'},
    '9' : {'code':'PAU','name':'Saint Paul Parish'},
    '10' : {'code':'PET','name':'Saint Peter Parish'}
  },
  'DO':{
    '1' : {'code':'DN','name':'Distrito Nacional'},
    '2' : {'code':'AZ','name':'Azua'},
    '3' : {'code':'BC','name':'Baoruco'},
    '4' : {'code':'BH','name':'Barahona'},
    '5' : {'code':'DJ','name':'Dajabon'},
    '6' : {'code':'DU','name':'Duarte'},
    '7' : {'code':'EL','name':'Elias Pina'},
    '8' : {'code':'SY','name':'El Seybo'},
    '9' : {'code':'ET','name':'Espaillat'},
    '10' : {'code':'HM','name':'Hato Mayor'},
    '11' : {'code':'IN','name':'Independencia'},
    '12' : {'code':'AL','name':'La Altagracia'},
    '13' : {'code':'RO','name':'La Romana'},
    '14' : {'code':'VE','name':'La Vega'},
    '15' : {'code':'MT','name':'Maria Trinidad Sanchez'},
    '16' : {'code':'MN','name':'Monsenor Nouel'},
    '17' : {'code':'MC','name':'Monte Cristi'},
    '18' : {'code':'MP','name':'Monte Plata'},
    '19' : {'code':'PD','name':'Pedernales'},
    '20' : {'code':'PR','name':'Peravia (Bani)'},
    '21' : {'code':'PP','name':'Puerto Plata'},
    '22' : {'code':'SL','name':'Salcedo'},
    '23' : {'code':'SM','name':'Samana'},
    '24' : {'code':'SH','name':'Sanchez Ramirez'},
    '25' : {'code':'SC','name':'San Cristobal'},
    '26' : {'code':'JO','name':'San Jose de Ocoa'},
    '27' : {'code':'SJ','name':'San Juan'},
    '28' : {'code':'PM','name':'San Pedro de Macoris'},
    '29' : {'code':'SA','name':'Santiago'},
    '30' : {'code':'ST','name':'Santiago Rodriguez'},
    '31' : {'code':'SD','name':'Santo Domingo'},
    '32' : {'code':'VA','name':'Valverde'}
  },
  'TP':{
    '1' : {'code':'AL','name':'Aileu'},
    '2' : {'code':'AN','name':'Ainaro'},
    '3' : {'code':'BA','name':'Baucau'},
    '4' : {'code':'BO','name':'Bobonaro'},
    '5' : {'code':'CO','name':'Cova Lima'},
    '6' : {'code':'DI','name':'Dili'},
    '7' : {'code':'ER','name':'Ermera'},
    '8' : {'code':'LA','name':'Lautem'},
    '9' : {'code':'LI','name':'Liquica'},
    '10' : {'code':'MT','name':'Manatuto'},
    '11' : {'code':'MF','name':'Manufahi'},
    '12' : {'code':'OE','name':'Oecussi'},
    '13' : {'code':'VI','name':'Viqueque'}
  },
  'EC':{
    '1' : {'code':'AZU','name':'Azuay'},
    '2' : {'code':'BOL','name':'Bolivar'},
    '3' : {'code':'CAN','name':'Cañar'},
    '4' : {'code':'CAR','name':'Carchi'},
    '5' : {'code':'CHI','name':'Chimborazo'},
    '6' : {'code':'COT','name':'Cotopaxi'},
    '7' : {'code':'EOR','name':'El Oro'},
    '8' : {'code':'ESM','name':'Esmeraldas'},
    '9' : {'code':'GPS','name':'Galápagos'},
    '10' : {'code':'GUA','name':'Guayas'},
    '11' : {'code':'IMB','name':'Imbabura'},
    '12' : {'code':'LOJ','name':'Loja'},
    '13' : {'code':'LRO','name':'Los Ríos'},
    '14' : {'code':'MAN','name':'Manabí'},
    '15' : {'code':'MSA','name':'Morona Santiago'},
    '16' : {'code':'NAP','name':'Napo'},
    '17' : {'code':'ORE','name':'Orellana'},
    '18' : {'code':'PAS','name':'Pastaza'},
    '19' : {'code':'PIC','name':'Pichincha'},
    '20' : {'code':'SUC','name':'Sucumbíos'},
    '21' : {'code':'TUN','name':'Tungurahua'},
    '22' : {'code':'ZCH','name':'Zamora Chinchipe'}
  },
  'EG':{
    '1' : {'code':'DHY','name':'Ad Daqahliyah'},
    '2' : {'code':'BAM','name':'Al Bahr al Ahmar'},
    '3' : {'code':'BHY','name':'Al Buhayrah'},
    '4' : {'code':'FYM','name':'Al Fayyum'},
    '5' : {'code':'GBY','name':'Al Gharbiyah'},
    '6' : {'code':'IDR','name':'Al Iskandariyah'},
    '7' : {'code':'IML','name':'Al Isma \'iliyah'},
    '8' : {'code':'JZH','name':'Al Jizah'},
    '9' : {'code':'MFY','name':'Al Minufiyah'},
    '10' : {'code':'MNY','name':'Al Minya'},
    '11' : {'code':'QHR','name':'Al Qahirah'},
    '12' : {'code':'QLY','name':'Al Qalyubiyah'},
    '13' : {'code':'WJD','name':'Al Wadi al Jadid'},
    '14' : {'code':'SHQ','name':'Ash Sharqiyah'},
    '15' : {'code':'SWY','name':'As Suways'},
    '16' : {'code':'ASW','name':'Aswan'},
    '17' : {'code':'ASY','name':'Asyut'},
    '18' : {'code':'BSW','name':'Bani Suwayf'},
    '19' : {'code':'BSD','name':'Bur Sa\'id'},
    '20' : {'code':'DMY','name':'Dumyat'},
    '21' : {'code':'JNS','name':'Janub Sina\''},
    '22' : {'code':'KSH','name':'Kafr ash Shaykh'},
    '23' : {'code':'MAT','name':'Matruh'},
    '24' : {'code':'QIN','name':'Qina'},
    '25' : {'code':'SHS','name':'Shamal Sina\''},
    '26' : {'code':'SUH','name':'Suhaj'}
  },
  'SV':{
    '1' : {'code':'AH','name':'Ahuachapan'},
    '2' : {'code':'CA','name':'Cabanas'},
    '3' : {'code':'CH','name':'Chalatenango'},
    '4' : {'code':'CU','name':'Cuscatlan'},
    '5' : {'code':'LB','name':'La Libertad'},
    '6' : {'code':'PZ','name':'La Paz'},
    '7' : {'code':'UN','name':'La Union'},
    '8' : {'code':'MO','name':'Morazan'},
    '9' : {'code':'SM','name':'San Miguel'},
    '10' : {'code':'SS','name':'San Salvador'},
    '11' : {'code':'SV','name':'San Vicente'},
    '12' : {'code':'SA','name':'Santa Ana'},
    '13' : {'code':'SO','name':'Sonsonate'},
    '14' : {'code':'US','name':'Usulutan'}
  },
  'GQ':{
    '1' : {'code':'AN','name':'Provincia Annobon'},
    '2' : {'code':'BN','name':'Provincia Bioko Norte'},
    '3' : {'code':'BS','name':'Provincia Bioko Sur'},
    '4' : {'code':'CS','name':'Provincia Centro Sur'},
    '5' : {'code':'KN','name':'Provincia Kie-Ntem'},
    '6' : {'code':'LI','name':'Provincia Litoral'},
    '7' : {'code':'WN','name':'Provincia Wele-Nzas'}
  },
  'ER':{
    '1' : {'code':'MA','name':'Central (Maekel)'},
    '2' : {'code':'KE','name':'Anseba (Keren)'},
    '3' : {'code':'DK','name':'Southern Red Sea (Debub-Keih-Bah)'},
    '4' : {'code':'SK','name':'Northern Red Sea (Semien-Keih-Ba)'},
    '5' : {'code':'DE','name':'Southern (Debub)'},
    '6' : {'code':'BR','name':'Gash-Barka (Barentu)'}
  },
  'EE':{
    '1' : {'code':'HA','name':'Harjumaa (Tallinn)'},
    '2' : {'code':'HI','name':'Hiiumaa (Kardla)'},
    '3' : {'code':'IV','name':'Ida-Virumaa (Johvi)'},
    '4' : {'code':'JA','name':'Jarvamaa (Paide)'},
    '5' : {'code':'JO','name':'Jogevamaa (Jogeva)'},
    '6' : {'code':'LV','name':'Laane-Virumaa (Rakvere)'},
    '7' : {'code':'LA','name':'Laanemaa (Haapsalu)'},
    '8' : {'code':'PA','name':'Parnumaa (Parnu)'},
    '9' : {'code':'PO','name':'Polvamaa (Polva)'},
    '10' : {'code':'RA','name':'Raplamaa (Rapla)'},
    '11' : {'code':'SA','name':'Saaremaa (Kuessaare)'},
    '12' : {'code':'TA','name':'Tartumaa (Tartu)'},
    '13' : {'code':'VA','name':'Valgamaa (Valga)'},
    '14' : {'code':'VI','name':'Viljandimaa (Viljandi)'},
    '15' : {'code':'VO','name':'Vorumaa (Voru)'}
  },
  'ET':{
    '1' : {'code':'AF','name':'Afar'},
    '2' : {'code':'AH','name':'Amhara'},
    '3' : {'code':'BG','name':'Benishangul-Gumaz'},
    '4' : {'code':'GB','name':'Gambela'},
    '5' : {'code':'HR','name':'Hariai'},
    '6' : {'code':'OR','name':'Oromia'},
    '7' : {'code':'SM','name':'Somali'},
    '8' : {'code':'SN','name':'Southern Nations - Nationalities'},
    '9' : {'code':'TG','name':'Tigray'},
    '10' : {'code':'AA','name':'Addis Ababa'},
    '11' : {'code':'DD','name':'Dire Dawa'}
  },
  'FO':{
    '1' : {'code':'TÛR','name':'Tûrshavnar Kommuna'},
    '2' : {'code':'KLA','name':'Klaksvík'},
    '3' : {'code':'RUN','name':'Runavík'},
    '4' : {'code':'TVØ','name':'Tvøroyri'},
    '5' : {'code':'FUG','name':'Fuglafjørður'},
    '6' : {'code':'SUN','name':'Sunda Kommuna'},
    '7' : {'code':'VáG','name':'Vágur'},
    '8' : {'code':'NES','name':'Nes'},
    '9' : {'code':'VES','name':'Vestmanna'},
    '10' : {'code':'MIð','name':'Miðvágur'},
    '11' : {'code':'SØR','name':'Sørvágur'},
    '12' : {'code':'GØT','name':'Gøtu Kommuna'},
    '13' : {'code':'SJû','name':'Sjûvar Kommuna'},
    '14' : {'code':'LEI','name':'Leirvík'},
    '15' : {'code':'SAN','name':'Sandavágur'},
    '16' : {'code':'HVA','name':'Hvalba'},
    '17' : {'code':'EIð','name':'Eiði'},
    '18' : {'code':'KVí','name':'Kvívík'},
    '19' : {'code':'SAN','name':'Sandur'},
    '20' : {'code':'SKO','name':'Skopun'},
    '21' : {'code':'HVA','name':'Hvannasund'},
    '22' : {'code':'SUM','name':'Sumba'},
    '23' : {'code':'VIð','name':'Viðareiði'},
    '24' : {'code':'POR','name':'Porkeri'},
    '25' : {'code':'SKá','name':'Skálavík'},
    '26' : {'code':'KUN','name':'Kunoy'},
    '27' : {'code':'HÚS','name':'HÚsavík'},
    '28' : {'code':'HOV','name':'Hov'},
    '29' : {'code':'FáM','name':'Fámjin'},
    '30' : {'code':'FUN','name':'Funningur'},
    '31' : {'code':'HÚS','name':'HÚsar'},
    '32' : {'code':'SKÚ','name':'SkÚvoy'},
    '33' : {'code':'SVí','name':'Svínoy'},
    '34' : {'code':'FUG','name':'Fugloy'}
  },
  'FJ':{
    '1' : {'code':'C','name':'Central Division'},
    '2' : {'code':'E','name':'Eastern Division'},
    '3' : {'code':'N','name':'Northern Division'},
    '4' : {'code':'R','name':'Rotuma'},
    '5' : {'code':'W','name':'Western Division'}
  },
  'FI':{
    '1' : {'code':'AL','name':'Ahvenanmaan Laani'},
    '2' : {'code':'ES','name':'Etela-Suomen Laani'},
    '3' : {'code':'IS','name':'Ita-Suomen Laani'},
    '4' : {'code':'LS','name':'Lansi-Suomen Laani'},
    '5' : {'code':'LA','name':'Lapin Lanani'},
    '6' : {'code':'OU','name':'Oulun Laani'}
  },
  'FR':{
    '1' : {'code':'AL','name':'Alsace'},
    '2' : {'code':'AQ','name':'Aquitaine'},
    '3' : {'code':'AU','name':'Auvergne'},
    '4' : {'code':'BR','name':'Brittany'},
    '5' : {'code':'BU','name':'Burgundy'},
    '6' : {'code':'CE','name':'Center Loire Valley'},
    '7' : {'code':'CH','name':'Champagne'},
    '8' : {'code':'CO','name':'Corse'},
    '9' : {'code':'FR','name':'France Comte'},
    '10' : {'code':'LA','name':'Languedoc Roussillon'},
    '11' : {'code':'LI','name':'Limousin'},
    '12' : {'code':'LO','name':'Lorraine'},
    '13' : {'code':'MI','name':'Midi Pyrenees'},
    '14' : {'code':'NO','name':'Nord Pas de Calais'},
    '15' : {'code':'NR','name':'Normandy'},
    '16' : {'code':'PA','name':'Paris / Ile de France'},
    '17' : {'code':'PI','name':'Picardie'},
    '18' : {'code':'PO','name':'Poitou Charente'},
    '19' : {'code':'PR','name':'Provence'},
    '20' : {'code':'RH','name':'Rhone Alps'},
    '21' : {'code':'RI','name':'Riviera'},
    '22' : {'code':'WE','name':'Western Loire Valley'}
  },
  'FX':{
    '1' : {'code':'Et','name':'Etranger'},
    '2' : {'code':'01','name':'Ain'},
    '3' : {'code':'02','name':'Aisne'},
    '4' : {'code':'03','name':'Allier'},
    '5' : {'code':'04','name':'Alpes de Haute Provence'},
    '6' : {'code':'05','name':'Hautes-Alpes'},
    '7' : {'code':'06','name':'Alpes Maritimes'},
    '8' : {'code':'07','name':'Ardèche'},
    '9' : {'code':'08','name':'Ardennes'},
    '10' : {'code':'09','name':'Ariège'},
    '11' : {'code':'10','name':'Aube'},
    '12' : {'code':'11','name':'Aude'},
    '13' : {'code':'12','name':'Aveyron'},
    '14' : {'code':'13','name':'Bouches du Rhône'},
    '15' : {'code':'14','name':'Calvados'},
    '16' : {'code':'15','name':'Cantal'},
    '17' : {'code':'16','name':'Charente'},
    '18' : {'code':'17','name':'Charente Maritime'},
    '19' : {'code':'18','name':'Cher'},
    '20' : {'code':'19','name':'Corrèze'},
    '21' : {'code':'2A','name':'Corse du Sud'},
    '22' : {'code':'2B','name':'Haute Corse'},
    '23' : {'code':'21','name':'Côte d\'or'},
    '24' : {'code':'22','name':'Côtes d\'Armor'},
    '25' : {'code':'23','name':'Creuse'},
    '26' : {'code':'24','name':'Dordogne'},
    '27' : {'code':'25','name':'Doubs'},
    '28' : {'code':'26','name':'Drôme'},
    '29' : {'code':'27','name':'Eure'},
    '30' : {'code':'28','name':'Eure et Loir'},
    '31' : {'code':'29','name':'Finistère'},
    '32' : {'code':'30','name':'Gard'},
    '33' : {'code':'31','name':'Haute Garonne'},
    '34' : {'code':'32','name':'Gers'},
    '35' : {'code':'33','name':'Gironde'},
    '36' : {'code':'34','name':'Hérault'},
    '37' : {'code':'35','name':'Ille et Vilaine'},
    '38' : {'code':'36','name':'Indre'},
    '39' : {'code':'37','name':'Indre et Loire'},
    '40' : {'code':'38','name':'Isére'},
    '41' : {'code':'39','name':'Jura'},
    '42' : {'code':'40','name':'Landes'},
    '43' : {'code':'41','name':'Loir et Cher'},
    '44' : {'code':'42','name':'Loire'},
    '45' : {'code':'43','name':'Haute Loire'},
    '46' : {'code':'44','name':'Loire Atlantique'},
    '47' : {'code':'45','name':'Loiret'},
    '48' : {'code':'46','name':'Lot'},
    '49' : {'code':'47','name':'Lot et Garonne'},
    '50' : {'code':'48','name':'Lozère'},
    '51' : {'code':'49','name':'Maine et Loire'},
    '52' : {'code':'50','name':'Manche'},
    '53' : {'code':'51','name':'Marne'},
    '54' : {'code':'52','name':'Haute Marne'},
    '55' : {'code':'53','name':'Mayenne'},
    '56' : {'code':'54','name':'Meurthe et Moselle'},
    '57' : {'code':'55','name':'Meuse'},
    '58' : {'code':'56','name':'Morbihan'},
    '59' : {'code':'57','name':'Moselle'},
    '60' : {'code':'58','name':'Nièvre'},
    '61' : {'code':'59','name':'Nord'},
    '62' : {'code':'60','name':'Oise'},
    '63' : {'code':'61','name':'Orne'},
    '64' : {'code':'62','name':'Pas de Calais'},
    '65' : {'code':'63','name':'Puy de Dôme'},
    '66' : {'code':'64','name':'Pyrenees Atlantique'},
    '67' : {'code':'65','name':'Hautes Pyrenees'},
    '68' : {'code':'66','name':'Pyrenees Orientale'},
    '69' : {'code':'67','name':'Bas Rhin'},
    '70' : {'code':'68','name':'Haut Rhin'},
    '71' : {'code':'69','name':'Rhône'},
    '72' : {'code':'70','name':'Haute Saône'},
    '73' : {'code':'71','name':'Saône et Loire'},
    '74' : {'code':'72','name':'Sarthe'},
    '75' : {'code':'73','name':'Savoie'},
    '76' : {'code':'74','name':'Haute Savoie'},
    '77' : {'code':'75','name':'Paris'},
    '78' : {'code':'76','name':'Seine Martitime'},
    '79' : {'code':'77','name':'Seine et Marne'},
    '80' : {'code':'78','name':'Yvelines'},
    '81' : {'code':'79','name':'Deux Sèvres'},
    '82' : {'code':'80','name':'Somme'},
    '83' : {'code':'81','name':'Tarn'},
    '84' : {'code':'82','name':'Tarn et Garonne'},
    '85' : {'code':'83','name':'Var'},
    '86' : {'code':'84','name':'Vaucluse'},
    '87' : {'code':'85','name':'Vendée'},
    '88' : {'code':'86','name':'Vienne'},
    '89' : {'code':'87','name':'Haute Vienne'},
    '90' : {'code':'88','name':'Vosges'},
    '91' : {'code':'89','name':'Yonne'},
    '92' : {'code':'90','name':'Territoire de Belfort'},
    '93' : {'code':'91','name':'Essonne'},
    '94' : {'code':'92','name':'Hauts de Seine'},
    '95' : {'code':'93','name':'Seine St-Denis'},
    '96' : {'code':'94','name':'Val de Marne'},
    '97' : {'code':'95','name':'Val d\'oise'}
  },
  'GF':{
    '1' : {'code':'AWA','name':'Awala-Yalimapo'},
    '2' : {'code':'MAN','name':'Mana'},
    '3' : {'code':'SAI','name':'Saint-Laurent-Du-Maroni'},
    '4' : {'code':'APA','name':'Apatou'},
    '5' : {'code':'GRA','name':'Grand-Santi'},
    '6' : {'code':'PAP','name':'Papaïchton'},
    '7' : {'code':'SAÜ','name':'SaÜl'},
    '8' : {'code':'MAR','name':'Maripasoula'},
    '9' : {'code':'CAM','name':'Camopi'},
    '10' : {'code':'SAI','name':'Saint-Georges'},
    '11' : {'code':'OUA','name':'Ouanary'},
    '12' : {'code':'RéG','name':'Régina'},
    '13' : {'code':'ROU','name':'Roura'},
    '14' : {'code':'SAI','name':'Saint-élie'},
    '15' : {'code':'IRA','name':'Iracoubo'},
    '16' : {'code':'SIN','name':'Sinnamary'},
    '17' : {'code':'KOU','name':'Kourou'},
    '18' : {'code':'MAC','name':'Macouria'},
    '19' : {'code':'MON','name':'Montsinéry-Tonnegrande'},
    '20' : {'code':'MAT','name':'Matoury'},
    '21' : {'code':'CAY','name':'Cayenne'},
    '22' : {'code':'REM','name':'Remire-Montjoly'}
  },
  'PF':{
    '1' : {'code':'M','name':'Archipel des Marquises'},
    '2' : {'code':'T','name':'Archipel des Tuamotu'},
    '3' : {'code':'I','name':'Archipel des Tubuai'},
    '4' : {'code':'V','name':'Iles du Vent'},
    '5' : {'code':'S','name':'Iles Sous-le-Vent'}
  },
  'TF':{
    '1' : {'code':'C','name':'Iles Crozet'},
    '2' : {'code':'K','name':'Iles Kerguelen'},
    '3' : {'code':'A','name':'Ile Amsterdam'},
    '4' : {'code':'P','name':'Ile Saint-Paul'},
    '5' : {'code':'D','name':'Adelie Land'}
  },
  'GA':{
    '1' : {'code':'ES','name':'Estuaire'},
    '2' : {'code':'HO','name':'Haut-Ogooue'},
    '3' : {'code':'MO','name':'Moyen-Ogooue'},
    '4' : {'code':'NG','name':'Ngounie'},
    '5' : {'code':'NY','name':'Nyanga'},
    '6' : {'code':'OI','name':'Ogooue-Ivindo'},
    '7' : {'code':'OL','name':'Ogooue-Lolo'},
    '8' : {'code':'OM','name':'Ogooue-Maritime'},
    '9' : {'code':'WN','name':'Woleu-Ntem'}
  },
  'GM':{
    '1' : {'code':'BJ','name':'Banjul'},
    '2' : {'code':'BS','name':'Basse'},
    '3' : {'code':'BR','name':'Brikama'},
    '4' : {'code':'JA','name':'Janjangbure'},
    '5' : {'code':'KA','name':'Kanifeng'},
    '6' : {'code':'KE','name':'Kerewan'},
    '7' : {'code':'KU','name':'Kuntaur'},
    '8' : {'code':'MA','name':'Mansakonko'},
    '9' : {'code':'LR','name':'Lower River'},
    '10' : {'code':'CR','name':'Central River'},
    '11' : {'code':'NB','name':'North Bank'},
    '12' : {'code':'UR','name':'Upper River'},
    '13' : {'code':'WE','name':'Western'}
  },
  'GE':{
    '1' : {'code':'AB','name':'Abkhazia'},
    '2' : {'code':'AJ','name':'Ajaria'},
    '3' : {'code':'GU','name':'Guria'},
    '4' : {'code':'IM','name':'Imereti'},
    '5' : {'code':'KA','name':'Kakheti'},
    '6' : {'code':'KK','name':'Kvemo Kartli'},
    '7' : {'code':'MM','name':'Mtskheta-Mtianeti'},
    '8' : {'code':'RL','name':'Racha Lechkhumi and Kvemo Svanet'},
    '9' : {'code':'SJ','name':'Samtskhe-Javakheti'},
    '10' : {'code':'SK','name':'Shida Kartli'},
    '11' : {'code':'SZ','name':'Samegrelo-Zemo Svaneti'},
    '12' : {'code':'TB','name':'Tbilisi'}
  },
  'DE':{
    '1' : {'code':'BAW','name':'Baden-Württemberg'},
    '2' : {'code':'BAY','name':'Bayern'},
    '3' : {'code':'BER','name':'Berlin'},
    '4' : {'code':'BRG','name':'Brandenburg'},
    '5' : {'code':'BRE','name':'Bremen'},
    '6' : {'code':'HAM','name':'Hamburg'},
    '7' : {'code':'HES','name':'Hessen'},
    '8' : {'code':'MEC','name':'Mecklenburg-Vorpommern'},
    '9' : {'code':'NDS','name':'Niedersachsen'},
    '10' : {'code':'NRW','name':'Nordrhein-Westfalen'},
    '11' : {'code':'RHE','name':'Rheinland-Pfalz'},
    '12' : {'code':'SAR','name':'Saarland'},
    '13' : {'code':'SAS','name':'Sachsen'},
    '14' : {'code':'SAC','name':'Sachsen-Anhalt'},
    '15' : {'code':'SCN','name':'Schleswig-Holstein'},
    '16' : {'code':'THE','name':'Thüringen'}
  },
  'GH':{
    '1' : {'code':'AS','name':'Ashanti Region'},
    '2' : {'code':'BA','name':'Brong-Ahafo Region'},
    '3' : {'code':'CE','name':'Central Region'},
    '4' : {'code':'EA','name':'Eastern Region'},
    '5' : {'code':'GA','name':'Greater Accra Region'},
    '6' : {'code':'NO','name':'Northern Region'},
    '7' : {'code':'UE','name':'Upper East Region'},
    '8' : {'code':'UW','name':'Upper West Region'},
    '9' : {'code':'VO','name':'Volta Region'},
    '10' : {'code':'WE','name':'Western Region'}
  },
  'GI':{
    '1' : {'code':'EAS','name':'East Side'},
    '2' : {'code':'NOR','name':'North District'},
    '3' : {'code':'REC','name':'Reclamation Areas'},
    '4' : {'code':'SAN','name':'Sandpits Area'},
    '5' : {'code':'SOU','name':'South District'},
    '6' : {'code':'TOW','name':'Town Area'},
    '7' : {'code':'UPP','name':'Upper Town'},
    '8' : {'code':'OTH','name':'Other'}
  },
  'GR':{
    '1' : {'code':'AT','name':'Attica'},
    '2' : {'code':'CN','name':'Central Greece'},
    '3' : {'code':'CM','name':'Central Macedonia'},
    '4' : {'code':'CR','name':'Crete'},
    '5' : {'code':'EM','name':'East Macedonia and Thrace'},
    '6' : {'code':'EP','name':'Epirus'},
    '7' : {'code':'II','name':'Ionian Islands'},
    '8' : {'code':'NA','name':'North Aegean'},
    '9' : {'code':'PP','name':'Peloponnesos'},
    '10' : {'code':'SA','name':'South Aegean'},
    '11' : {'code':'TH','name':'Thessaly'},
    '12' : {'code':'WG','name':'West Greece'},
    '13' : {'code':'WM','name':'West Macedonia'}
  },
  'GL':{
    '1' : {'code':'A','name':'Avannaa'},
    '2' : {'code':'T','name':'Tunu'},
    '3' : {'code':'K','name':'Kitaa'}
  },
  '86':{
    '1' : {'code':'A','name':'Saint Andrew'},
    '2' : {'code':'D','name':'Saint David'},
    '3' : {'code':'G','name':'Saint George'},
    '4' : {'code':'J','name':'Saint John'},
    '5' : {'code':'M','name':'Saint Mark'},
    '6' : {'code':'P','name':'Saint Patrick'},
    '7' : {'code':'C','name':'Carriacou'},
    '8' : {'code':'Q','name':'Petit Martinique'}
  },
  'GP':{
    '1' : {'code':'ARR','name':'Arrondissements Of The Guadeloup'},
    '2' : {'code':'CAN','name':'Cantons Of The Guadeloup Depart'},
    '3' : {'code':'COM','name':'Communes Of The Guadeloup Depart'}
  },
  'GU':{
    '1' : {'code':'AGA','name':'Agana Heights'},
    '2' : {'code':'AGA','name':'Agat'},
    '3' : {'code':'ASA','name':'Asan Maina'},
    '4' : {'code':'BAR','name':'Barrigada'},
    '5' : {'code':'CHA','name':'Chalan Pago Ordot'},
    '6' : {'code':'DED','name':'Dededo'},
    '7' : {'code':'HAG','name':'HagÅtña'},
    '8' : {'code':'INA','name':'Inarajan'},
    '9' : {'code':'MAN','name':'Mangilao'},
    '10' : {'code':'MER','name':'Merizo'},
    '11' : {'code':'MON','name':'Mongmong Toto Maite'},
    '12' : {'code':'PIT','name':'Piti'},
    '13' : {'code':'SAN','name':'Santa Rita'},
    '14' : {'code':'SIN','name':'Sinajana'},
    '15' : {'code':'TAL','name':'Talofofo'},
    '16' : {'code':'TAM','name':'Tamuning'},
    '17' : {'code':'UMA','name':'Umatac'},
    '18' : {'code':'YIG','name':'Yigo'},
    '19' : {'code':'YON','name':'Yona'}
  },
  'GT':{
    '1' : {'code':'AV','name':'Alta Verapaz'},
    '2' : {'code':'BV','name':'Baja Verapaz'},
    '3' : {'code':'CM','name':'Chimaltenango'},
    '4' : {'code':'CQ','name':'Chiquimula'},
    '5' : {'code':'PE','name':'El Peten'},
    '6' : {'code':'PR','name':'El Progreso'},
    '7' : {'code':'QC','name':'El Quiche'},
    '8' : {'code':'ES','name':'Escuintla'},
    '9' : {'code':'GU','name':'Guatemala'},
    '10' : {'code':'HU','name':'Huehuetenango'},
    '11' : {'code':'IZ','name':'Izabal'},
    '12' : {'code':'JA','name':'Jalapa'},
    '13' : {'code':'JU','name':'Jutiapa'},
    '14' : {'code':'QZ','name':'Quetzaltenango'},
    '15' : {'code':'RE','name':'Retalhuleu'},
    '16' : {'code':'ST','name':'Sacatepequez'},
    '17' : {'code':'SM','name':'San Marcos'},
    '18' : {'code':'SR','name':'Santa Rosa'},
    '19' : {'code':'SO','name':'Solola'},
    '20' : {'code':'SU','name':'Suchitepequez'},
    '21' : {'code':'TO','name':'Totonicapan'},
    '22' : {'code':'ZA','name':'Zacapa'}
  },
  'GN':{
    '1' : {'code':'CNK','name':'Conakry'},
    '2' : {'code':'BYL','name':'Beyla'},
    '3' : {'code':'BFA','name':'Boffa'},
    '4' : {'code':'BOK','name':'Boke'},
    '5' : {'code':'COY','name':'Coyah'},
    '6' : {'code':'DBL','name':'Dabola'},
    '7' : {'code':'DLB','name':'Dalaba'},
    '8' : {'code':'DGR','name':'Dinguiraye'},
    '9' : {'code':'DBR','name':'Dubreka'},
    '10' : {'code':'FRN','name':'Faranah'},
    '11' : {'code':'FRC','name':'Forecariah'},
    '12' : {'code':'FRI','name':'Fria'},
    '13' : {'code':'GAO','name':'Gaoual'},
    '14' : {'code':'GCD','name':'Gueckedou'},
    '15' : {'code':'KNK','name':'Kankan'},
    '16' : {'code':'KRN','name':'Kerouane'},
    '17' : {'code':'KND','name':'Kindia'},
    '18' : {'code':'KSD','name':'Kissidougou'},
    '19' : {'code':'KBA','name':'Koubia'},
    '20' : {'code':'KDA','name':'Koundara'},
    '21' : {'code':'KRA','name':'Kouroussa'},
    '22' : {'code':'LAB','name':'Labe'},
    '23' : {'code':'LLM','name':'Lelouma'},
    '24' : {'code':'LOL','name':'Lola'},
    '25' : {'code':'MCT','name':'Macenta'},
    '26' : {'code':'MAL','name':'Mali'},
    '27' : {'code':'MAM','name':'Mamou'},
    '28' : {'code':'MAN','name':'Mandiana'},
    '29' : {'code':'NZR','name':'Nzerekore'},
    '30' : {'code':'PIT','name':'Pita'},
    '31' : {'code':'SIG','name':'Siguiri'},
    '32' : {'code':'TLM','name':'Telimele'},
    '33' : {'code':'TOG','name':'Tougue'},
    '34' : {'code':'YOM','name':'Yomou'}
  },
  'GW':{
    '1' : {'code':'BF','name':'Bafata Region'},
    '2' : {'code':'BB','name':'Biombo Region'},
    '3' : {'code':'BS','name':'Bissau Region'},
    '4' : {'code':'BL','name':'Bolama Region'},
    '5' : {'code':'CA','name':'Cacheu Region'},
    '6' : {'code':'GA','name':'Gabu Region'},
    '7' : {'code':'OI','name':'Oio Region'},
    '8' : {'code':'QU','name':'Quinara Region'},
    '9' : {'code':'TO','name':'Tombali Region'}
  },
  'GY':{
    '1' : {'code':'BW','name':'Barima-Waini'},
    '2' : {'code':'CM','name':'Cuyuni-Mazaruni'},
    '3' : {'code':'DM','name':'Demerara-Mahaica'},
    '4' : {'code':'EC','name':'East Berbice-Corentyne'},
    '5' : {'code':'EW','name':'Essequibo Islands-West Demerara'},
    '6' : {'code':'MB','name':'Mahaica-Berbice'},
    '7' : {'code':'PM','name':'Pomeroon-Supenaam'},
    '8' : {'code':'PI','name':'Potaro-Siparuni'},
    '9' : {'code':'UD','name':'Upper Demerara-Berbice'},
    '10' : {'code':'UT','name':'Upper Takutu-Upper Essequibo'}
  },
  'HT':{
    '1' : {'code':'AR','name':'Artibonite'},
    '2' : {'code':'CE','name':'Centre'},
    '3' : {'code':'GA','name':'Grand\'Anse'},
    '4' : {'code':'ND','name':'Nord'},
    '5' : {'code':'NE','name':'Nord-Est'},
    '6' : {'code':'NO','name':'Nord-Ouest'},
    '7' : {'code':'OU','name':'Ouest'},
    '8' : {'code':'SD','name':'Sud'},
    '9' : {'code':'SE','name':'Sud-Est'}
  },
  'HM':{
    '1' : {'code':'F','name':'Flat Island'},
    '2' : {'code':'M','name':'McDonald Island'},
    '3' : {'code':'S','name':'Shag Island'},
    '4' : {'code':'H','name':'Heard Island'}
  },
  'HN':{
    '1' : {'code':'AT','name':'Atlantida'},
    '2' : {'code':'CH','name':'Choluteca'},
    '3' : {'code':'CL','name':'Colon'},
    '4' : {'code':'CM','name':'Comayagua'},
    '5' : {'code':'CP','name':'Copan'},
    '6' : {'code':'CR','name':'Cortes'},
    '7' : {'code':'PA','name':'El Paraiso'},
    '8' : {'code':'FM','name':'Francisco Morazan'},
    '9' : {'code':'GD','name':'Gracias a Dios'},
    '10' : {'code':'IN','name':'Intibuca'},
    '11' : {'code':'IB','name':'Islas de la Bahia (Bay Islands)'},
    '12' : {'code':'PZ','name':'La Paz'},
    '13' : {'code':'LE','name':'Lempira'},
    '14' : {'code':'OC','name':'Ocotepeque'},
    '15' : {'code':'OL','name':'Olancho'},
    '16' : {'code':'SB','name':'Santa Barbara'},
    '17' : {'code':'VA','name':'Valle'},
    '18' : {'code':'YO','name':'Yoro'}
  },
  'HK':{
    '1' : {'code':'HCW','name':'Central and Western Hong Kong Is'},
    '2' : {'code':'HEA','name':'Eastern Hong Kong Island'},
    '3' : {'code':'HSO','name':'Southern Hong Kong Island'},
    '4' : {'code':'HWC','name':'Wan Chai Hong Kong Island'},
    '5' : {'code':'KKC','name':'Kowloon City Kowloon'},
    '6' : {'code':'KKT','name':'Kwun Tong Kowloon'},
    '7' : {'code':'KSS','name':'Sham Shui Po Kowloon'},
    '8' : {'code':'KWT','name':'Wong Tai Sin Kowloon'},
    '9' : {'code':'KYT','name':'Yau Tsim Mong Kowloon'},
    '10' : {'code':'NIS','name':'Islands New Territories'},
    '11' : {'code':'NKT','name':'Kwai Tsing New Territories'},
    '12' : {'code':'NNO','name':'North New Territories'},
    '13' : {'code':'NSK','name':'Sai Kung New Territories'},
    '14' : {'code':'NST','name':'Sha Tin New Territories'},
    '15' : {'code':'NTP','name':'Tai Po New Territories'},
    '16' : {'code':'NTW','name':'Tsuen Wan New Territories'},
    '17' : {'code':'NTM','name':'Tuen Mun New Territories'},
    '18' : {'code':'NYL','name':'Yuen Long New Territories'}
  },
  'HU':{
    '1' : {'code':'BK','name':'Bacs-Kiskun'},
    '2' : {'code':'BA','name':'Baranya'},
    '3' : {'code':'BE','name':'Bekes'},
    '4' : {'code':'BS','name':'Bekescsaba'},
    '5' : {'code':'BZ','name':'Borsod-Abauj-Zemplen'},
    '6' : {'code':'BU','name':'Budapest'},
    '7' : {'code':'CS','name':'Csongrad'},
    '8' : {'code':'DE','name':'Debrecen'},
    '9' : {'code':'DU','name':'Dunaujvaros'},
    '10' : {'code':'EG','name':'Eger'},
    '11' : {'code':'FE','name':'Fejer'},
    '12' : {'code':'GY','name':'Gyor'},
    '13' : {'code':'GM','name':'Gyor-Moson-Sopron'},
    '14' : {'code':'HB','name':'Hajdu-Bihar'},
    '15' : {'code':'HE','name':'Heves'},
    '16' : {'code':'HO','name':'Hodmezovasarhely'},
    '17' : {'code':'JN','name':'Jasz-Nagykun-Szolnok'},
    '18' : {'code':'KA','name':'Kaposvar'},
    '19' : {'code':'KE','name':'Kecskemet'},
    '20' : {'code':'KO','name':'Komarom-Esztergom'},
    '21' : {'code':'MI','name':'Miskolc'},
    '22' : {'code':'NA','name':'Nagykanizsa'},
    '23' : {'code':'NO','name':'Nograd'},
    '24' : {'code':'NY','name':'Nyiregyhaza'},
    '25' : {'code':'PE','name':'Pecs'},
    '26' : {'code':'PS','name':'Pest'},
    '27' : {'code':'SO','name':'Somogy'},
    '28' : {'code':'SP','name':'Sopron'},
    '29' : {'code':'SS','name':'Szabolcs-Szatmar-Bereg'},
    '30' : {'code':'SZ','name':'Szeged'},
    '31' : {'code':'SE','name':'Szekesfehervar'},
    '32' : {'code':'SL','name':'Szolnok'},
    '33' : {'code':'SM','name':'Szombathely'},
    '34' : {'code':'TA','name':'Tatabanya'},
    '35' : {'code':'TO','name':'Tolna'},
    '36' : {'code':'VA','name':'Vas'},
    '37' : {'code':'VE','name':'Veszprem'},
    '38' : {'code':'ZA','name':'Zala'},
    '39' : {'code':'ZZ','name':'Zalaegerszeg'}
  },
  'IS':{
    '1' : {'code':'AL','name':'Austurland'},
    '2' : {'code':'HF','name':'Hofuoborgarsvaeoi'},
    '3' : {'code':'NE','name':'Norourland eystra'},
    '4' : {'code':'NV','name':'Norourland vestra'},
    '5' : {'code':'SL','name':'Suourland'},
    '6' : {'code':'SN','name':'Suournes'},
    '7' : {'code':'VF','name':'Vestfiroir'},
    '8' : {'code':'VL','name':'Vesturland'}
  },
  'IN':{
    '1' : {'code':'AN','name':'Andaman and Nicobar Islands'},
    '2' : {'code':'AP','name':'Andhra Pradesh'},
    '3' : {'code':'AR','name':'Arunachal Pradesh'},
    '4' : {'code':'AS','name':'Assam'},
    '5' : {'code':'BI','name':'Bihar'},
    '6' : {'code':'CH','name':'Chandigarh'},
    '7' : {'code':'DA','name':'Dadra and Nagar Haveli'},
    '8' : {'code':'DM','name':'Daman and Diu'},
    '9' : {'code':'DE','name':'Delhi'},
    '10' : {'code':'GO','name':'Goa'},
    '11' : {'code':'GU','name':'Gujarat'},
    '12' : {'code':'HA','name':'Haryana'},
    '13' : {'code':'HP','name':'Himachal Pradesh'},
    '14' : {'code':'JA','name':'Jammu and Kashmir'},
    '15' : {'code':'KA','name':'Karnataka'},
    '16' : {'code':'KE','name':'Kerala'},
    '17' : {'code':'LI','name':'Lakshadweep Islands'},
    '18' : {'code':'MP','name':'Madhya Pradesh'},
    '19' : {'code':'MA','name':'Maharashtra'},
    '20' : {'code':'MN','name':'Manipur'},
    '21' : {'code':'ME','name':'Meghalaya'},
    '22' : {'code':'MI','name':'Mizoram'},
    '23' : {'code':'NA','name':'Nagaland'},
    '24' : {'code':'OR','name':'Orissa'},
    '25' : {'code':'PO','name':'Pondicherry'},
    '26' : {'code':'PU','name':'Punjab'},
    '27' : {'code':'RA','name':'Rajasthan'},
    '28' : {'code':'SI','name':'Sikkim'},
    '29' : {'code':'TN','name':'Tamil Nadu'},
    '30' : {'code':'TR','name':'Tripura'},
    '31' : {'code':'UP','name':'Uttar Pradesh'},
    '32' : {'code':'WB','name':'West Bengal'}
  },
  'ID':{
    '1' : {'code':'DA','name':'Daista Aceh'},
    '2' : {'code':'SU','name':'Sumatera Utara'},
    '3' : {'code':'SB','name':'Sumatera Barat'},
    '4' : {'code':'SI','name':'Riau'},
    '5' : {'code':'JA','name':'Jambi'},
    '6' : {'code':'SS','name':'Sumatera Selatan'},
    '7' : {'code':'BE','name':'Bengkulu'},
    '8' : {'code':'LA','name':'Lampung'},
    '9' : {'code':'JK','name':'Dki Jakarta'},
    '10' : {'code':'JB','name':'Jawa Barat'},
    '11' : {'code':'JT','name':'Jawa Tengah'},
    '12' : {'code':'DY','name':'Daista Yogyakarta'},
    '13' : {'code':'JT','name':'Jawa Timur'},
    '14' : {'code':'KB','name':'Kalimantan Barat'},
    '15' : {'code':'KT','name':'Kalimantan Tengah'},
    '16' : {'code':'KI','name':'Kalimantan Timur'},
    '17' : {'code':'KS','name':'Kalimantan Selatan'},
    '18' : {'code':'BA','name':'Bali'},
    '19' : {'code':'NB','name':'Nusa Tenggara Barat'},
    '20' : {'code':'NT','name':'Nusa Tenggara Timur'},
    '21' : {'code':'SN','name':'Sulawesi Selatan'},
    '22' : {'code':'ST','name':'Sulawesi Tengah'},
    '23' : {'code':'SA','name':'Sulawesi Utara'},
    '24' : {'code':'SG','name':'Sulawesi Tenggara'},
    '25' : {'code':'MA','name':'Maluku'},
    '26' : {'code':'MU','name':'Maluku Utara'},
    '27' : {'code':'IJ','name':'Irian Jaya Timur'},
    '28' : {'code':'IT','name':'Irian Jaya Tengah'},
    '29' : {'code':'IB','name':'Irian Jawa Barat'},
    '30' : {'code':'BT','name':'Banten'},
    '31' : {'code':'BB','name':'Bangka Belitung'},
    '32' : {'code':'GO','name':'Gorontalo'}
  },
  'IR':{
    '1' : {'code':'ARD','name':'Ardabil'},
    '2' : {'code':'BSH','name':'Bushehr'},
    '3' : {'code':'CMB','name':'Chahar Mahaal and Bakhtiari'},
    '4' : {'code':'EAZ','name':'East Azarbaijan'},
    '5' : {'code':'EFH','name':'Esfahan'},
    '6' : {'code':'FAR','name':'Fars'},
    '7' : {'code':'GIL','name':'Gilan'},
    '8' : {'code':'GLS','name':'Golestan'},
    '9' : {'code':'HMD','name':'Hamadan'},
    '10' : {'code':'HRM','name':'Hormozgan'},
    '11' : {'code':'ILM','name':'Ilam'},
    '12' : {'code':'KBA','name':'Kohkiluyeh and Buyer Ahmad'},
    '13' : {'code':'KRB','name':'Kerman'},
    '14' : {'code':'KRD','name':'Kurdistan'},
    '15' : {'code':'KRM','name':'Kermanshah'},
    '16' : {'code':'KZT','name':'Khuzestan'},
    '17' : {'code':'LRS','name':'Lorestan'},
    '18' : {'code':'MKZ','name':'Markazi'},
    '19' : {'code':'MZD','name':'Mazandaran'},
    '20' : {'code':'NKH','name':'North Khorasan'},
    '21' : {'code':'QAZ','name':'Qazvin'},
    '22' : {'code':'QOM','name':'Qom'},
    '23' : {'code':'RKH','name':'Razavi Khorasan'},
    '24' : {'code':'SBL','name':'Sistan and Baluchistan'},
    '25' : {'code':'SKH','name':'South Khorasan'},
    '26' : {'code':'SMN','name':'Semnan'},
    '27' : {'code':'TEH','name':'Tehran'},
    '28' : {'code':'WEZ','name':'West Azarbaijan'},
    '29' : {'code':'YZD','name':'Yazd'},
    '30' : {'code':'ZAN','name':'Zanjan'}
  },
  'IQ':{
    '1' : {'code':'AB','name':'Al Anbar'},
    '2' : {'code':'AL','name':'Arbil'},
    '3' : {'code':'BA','name':'Al Basrah'},
    '4' : {'code':'BB','name':'Babil'},
    '5' : {'code':'BD','name':'Baghdad'},
    '6' : {'code':'DH','name':'Dahuk'},
    '7' : {'code':'DQ','name':'Dhi Qar'},
    '8' : {'code':'DY','name':'Diyala'},
    '9' : {'code':'KB','name':'Al Karbala'},
    '10' : {'code':'MU','name':'Al Muthanna'},
    '11' : {'code':'MY','name':'Maysan'},
    '12' : {'code':'NJ','name':'An Najaf'},
    '13' : {'code':'NN','name':'Ninawa'},
    '14' : {'code':'QA','name':'Al Qadisyah'},
    '15' : {'code':'SD','name':'Salah ad Din'},
    '16' : {'code':'SL','name':'As Sulaymaniyah'},
    '17' : {'code':'TM','name':'At Ta\'mim'},
    '18' : {'code':'WS','name':'Wasit'}
  },
  'IE':{
    '1' : {'code':'CA','name':'Carlow'},
    '2' : {'code':'CV','name':'Cavan'},
    '3' : {'code':'CL','name':'Clare'},
    '4' : {'code':'CO','name':'Cork'},
    '5' : {'code':'DO','name':'Donegal'},
    '6' : {'code':'DU','name':'Dublin'},
    '7' : {'code':'GA','name':'Galway'},
    '8' : {'code':'KE','name':'Kerry'},
    '9' : {'code':'KI','name':'Kildare'},
    '10' : {'code':'KL','name':'Kilkenny'},
    '11' : {'code':'LA','name':'Laois'},
    '12' : {'code':'LE','name':'Leitrim'},
    '13' : {'code':'LI','name':'Limerick'},
    '14' : {'code':'LO','name':'Longford'},
    '15' : {'code':'LU','name':'Louth'},
    '16' : {'code':'MA','name':'Mayo'},
    '17' : {'code':'ME','name':'Meath'},
    '18' : {'code':'MO','name':'Monaghan'},
    '19' : {'code':'OF','name':'Offaly'},
    '20' : {'code':'RO','name':'Roscommon'},
    '21' : {'code':'SL','name':'Sligo'},
    '22' : {'code':'TI','name':'Tipperary'},
    '23' : {'code':'WA','name':'Waterford'},
    '24' : {'code':'WE','name':'Westmeath'},
    '25' : {'code':'WX','name':'Wexford'},
    '26' : {'code':'WI','name':'Wicklow'}
  },
  'IL':{
    '1' : {'code':'BS','name':'Be\'er Sheva'},
    '2' : {'code':'BH','name':'Bika\'at Hayarden'},
    '3' : {'code':'EA','name':'Eilat and Arava'},
    '4' : {'code':'GA','name':'Galil'},
    '5' : {'code':'HA','name':'Haifa'},
    '6' : {'code':'JM','name':'Jehuda Mountains'},
    '7' : {'code':'JE','name':'Jerusalem'},
    '8' : {'code':'NE','name':'Negev'},
    '10' : {'code':'SE','name':'Semaria'},
    '11' : {'code':'SH','name':'Sharon'},
    '12' : {'code':'TA','name':'Tel Aviv (Gosh Dan)'}
  },
  'IT':{
    '1' : {'code':'AG','name':'Agrigento'},
    '2' : {'code':'AL','name':'Alessandria'},
    '3' : {'code':'AN','name':'Ancona'},
    '4' : {'code':'AO','name':'Aosta'},
    '5' : {'code':'AR','name':'Arezzo'},
    '6' : {'code':'AP','name':'Ascoli Piceno'},
    '7' : {'code':'AT','name':'Asti'},
    '8' : {'code':'AV','name':'Avellino'},
    '9' : {'code':'BA','name':'Bari'},
    '10' : {'code':'BL','name':'Belluno'},
    '11' : {'code':'BN','name':'Benevento'},
    '12' : {'code':'BG','name':'Bergamo'},
    '13' : {'code':'BI','name':'Biella'},
    '14' : {'code':'BO','name':'Bologna'},
    '15' : {'code':'BZ','name':'Bolzano'},
    '16' : {'code':'BS','name':'Brescia'},
    '17' : {'code':'BR','name':'Brindisi'},
    '18' : {'code':'CA','name':'Cagliari'},
    '19' : {'code':'CL','name':'Caltanissetta'},
    '20' : {'code':'CB','name':'Campobasso'},
    '21' : {'code':'CE','name':'Caserta'},
    '22' : {'code':'CT','name':'Catania'},
    '23' : {'code':'CZ','name':'Catanzaro'},
    '24' : {'code':'CH','name':'Chieti'},
    '25' : {'code':'CO','name':'Como'},
    '26' : {'code':'CS','name':'Cosenza'},
    '27' : {'code':'CR','name':'Cremona'},
    '28' : {'code':'KR','name':'Crotone'},
    '29' : {'code':'CN','name':'Cuneo'},
    '30' : {'code':'EN','name':'Enna'},
    '31' : {'code':'FE','name':'Ferrara'},
    '32' : {'code':'FI','name':'Firenze'},
    '33' : {'code':'FG','name':'Foggia'},
    '34' : {'code':'FO','name':'Forlì'},
    '35' : {'code':'FR','name':'Frosinone'},
    '36' : {'code':'GE','name':'Genova'},
    '37' : {'code':'GO','name':'Gorizia'},
    '38' : {'code':'GR','name':'Grosseto'},
    '39' : {'code':'IM','name':'Imperia'},
    '40' : {'code':'IS','name':'Isernia'},
    '41' : {'code':'AQ','name':'Aquila'},
    '42' : {'code':'SP','name':'La Spezia'},
    '43' : {'code':'LT','name':'Latina'},
    '44' : {'code':'LE','name':'Lecce'},
    '45' : {'code':'LC','name':'Lecco'},
    '46' : {'code':'LI','name':'Livorno'},
    '47' : {'code':'LO','name':'Lodi'},
    '48' : {'code':'LU','name':'Lucca'},
    '49' : {'code':'MC','name':'Macerata'},
    '50' : {'code':'MN','name':'Mantova'},
    '51' : {'code':'MS','name':'Massa-Carrara'},
    '52' : {'code':'MT','name':'Matera'},
    '53' : {'code':'ME','name':'Messina'},
    '54' : {'code':'MI','name':'Milano'},
    '55' : {'code':'MO','name':'Modena'},
    '56' : {'code':'NA','name':'Napoli'},
    '57' : {'code':'NO','name':'Novara'},
    '58' : {'code':'NU','name':'Nuoro'},
    '59' : {'code':'OR','name':'Oristano'},
    '60' : {'code':'PD','name':'Padova'},
    '61' : {'code':'PA','name':'Palermo'},
    '62' : {'code':'PR','name':'Parma'},
    '63' : {'code':'PG','name':'Perugia'},
    '64' : {'code':'PV','name':'Pavia'},
    '65' : {'code':'PU','name':'Pesaro Urbino'},
    '66' : {'code':'PE','name':'Pescara'},
    '67' : {'code':'PC','name':'Piacenza'},
    '68' : {'code':'PI','name':'Pisa'},
    '69' : {'code':'PT','name':'Pistoia'},
    '70' : {'code':'PN','name':'Pordenone'},
    '71' : {'code':'PZ','name':'Potenza'},
    '72' : {'code':'PO','name':'Prato'},
    '73' : {'code':'RG','name':'Ragusa'},
    '74' : {'code':'RA','name':'Ravenna'},
    '75' : {'code':'RC','name':'Reggio Calabria'},
    '76' : {'code':'RE','name':'Reggio Emilia'},
    '77' : {'code':'RI','name':'Rieti'},
    '78' : {'code':'RN','name':'Rimini'},
    '79' : {'code':'RM','name':'Roma'},
    '80' : {'code':'RO','name':'Rovigo'},
    '81' : {'code':'SA','name':'Salerno'},
    '82' : {'code':'SS','name':'Sassari'},
    '83' : {'code':'SV','name':'Savona'},
    '84' : {'code':'SI','name':'Siena'},
    '85' : {'code':'SR','name':'Siracusa'},
    '86' : {'code':'SO','name':'Sondrio'},
    '87' : {'code':'TA','name':'Taranto'},
    '88' : {'code':'TE','name':'Teramo'},
    '89' : {'code':'TR','name':'Terni'},
    '90' : {'code':'TO','name':'Torino'},
    '91' : {'code':'TP','name':'Trapani'},
    '92' : {'code':'TN','name':'Trento'},
    '93' : {'code':'TV','name':'Treviso'},
    '94' : {'code':'TS','name':'Trieste'},
    '95' : {'code':'UD','name':'Udine'},
    '96' : {'code':'VA','name':'Varese'},
    '97' : {'code':'VE','name':'Venezia'},
    '98' : {'code':'VB','name':'Verbania'},
    '99' : {'code':'VC','name':'Vercelli'},
    '100' : {'code':'VR','name':'Verona'},
    '101' : {'code':'VV','name':'Vibo Valentia'},
    '102' : {'code':'VI','name':'Vicenza'},
    '103' : {'code':'VT','name':'Viterbo'},
    '104' : {'code':'CI','name':'Carbonia-Iglesias'},
    '105' : {'code':'VS','name':'Medio Campidano'},
    '106' : {'code':'OG','name':'Ogliastra'},
    '107' : {'code':'OT','name':'Olbia-Tempio'},
    '108' : {'code':'MB','name':'Monza e Brianza'},
    '109' : {'code':'FM','name':'Fermo'},
    '110' : {'code':'BT','name':'Barletta-Andria-Trani'}
  },
  'JM':{
    '1' : {'code':'CLA','name':'Clarendon Parish'},
    '2' : {'code':'HAN','name':'Hanover Parish'},
    '3' : {'code':'KIN','name':'Kingston Parish'},
    '4' : {'code':'MAN','name':'Manchester Parish'},
    '5' : {'code':'POR','name':'Portland Parish'},
    '6' : {'code':'AND','name':'Saint Andrew Parish'},
    '7' : {'code':'ANN','name':'Saint Ann Parish'},
    '8' : {'code':'CAT','name':'Saint Catherine Parish'},
    '9' : {'code':'ELI','name':'Saint Elizabeth Parish'},
    '10' : {'code':'JAM','name':'Saint James Parish'},
    '11' : {'code':'MAR','name':'Saint Mary Parish'},
    '12' : {'code':'THO','name':'Saint Thomas Parish'},
    '13' : {'code':'TRL','name':'Trelawny Parish'},
    '14' : {'code':'WML','name':'Westmoreland Parish'}
  },
  'JP':{
    '1' : {'code':'AI','name':'Aichi'},
    '2' : {'code':'AK','name':'Akita'},
    '3' : {'code':'AO','name':'Aomori'},
    '4' : {'code':'CH','name':'Chiba'},
    '5' : {'code':'EH','name':'Ehime'},
    '6' : {'code':'FK','name':'Fukui'},
    '7' : {'code':'FU','name':'Fukuoka'},
    '8' : {'code':'FS','name':'Fukushima'},
    '9' : {'code':'GI','name':'Gifu'},
    '10' : {'code':'GU','name':'Gumma'},
    '11' : {'code':'HI','name':'Hiroshima'},
    '12' : {'code':'HO','name':'Hokkaido'},
    '13' : {'code':'HY','name':'Hyogo'},
    '14' : {'code':'IB','name':'Ibaraki'},
    '15' : {'code':'IS','name':'Ishikawa'},
    '16' : {'code':'IW','name':'Iwate'},
    '17' : {'code':'KA','name':'Kagawa'},
    '18' : {'code':'KG','name':'Kagoshima'},
    '19' : {'code':'KN','name':'Kanagawa'},
    '20' : {'code':'KO','name':'Kochi'},
    '21' : {'code':'KU','name':'Kumamoto'},
    '22' : {'code':'KY','name':'Kyoto'},
    '23' : {'code':'MI','name':'Mie'},
    '24' : {'code':'MY','name':'Miyagi'},
    '25' : {'code':'MZ','name':'Miyazaki'},
    '26' : {'code':'NA','name':'Nagano'},
    '27' : {'code':'NG','name':'Nagasaki'},
    '28' : {'code':'NR','name':'Nara'},
    '29' : {'code':'NI','name':'Niigata'},
    '30' : {'code':'OI','name':'Oita'},
    '31' : {'code':'OK','name':'Okayama'},
    '32' : {'code':'ON','name':'Okinawa'},
    '33' : {'code':'OS','name':'Osaka'},
    '34' : {'code':'SA','name':'Saga'},
    '35' : {'code':'SI','name':'Saitama'},
    '36' : {'code':'SH','name':'Shiga'},
    '37' : {'code':'SM','name':'Shimane'},
    '38' : {'code':'SZ','name':'Shizuoka'},
    '39' : {'code':'TO','name':'Tochigi'},
    '40' : {'code':'TS','name':'Tokushima'},
    '41' : {'code':'TK','name':'Tokyo'},
    '42' : {'code':'TT','name':'Tottori'},
    '43' : {'code':'TY','name':'Toyama'},
    '44' : {'code':'WA','name':'Wakayama'},
    '45' : {'code':'YA','name':'Yamagata'},
    '46' : {'code':'YM','name':'Yamaguchi'},
    '47' : {'code':'YN','name':'Yamanashi'}
  },
  'JO':{
    '1' : {'code':'AM','name':'\'Amman'},
    '2' : {'code':'AJ','name':'Ajlun'},
    '3' : {'code':'AA','name':'Al\'Aqabah'},
    '4' : {'code':'AB','name':'Al Balqa\''},
    '5' : {'code':'AK','name':'Al Karak'},
    '6' : {'code':'AL','name':'Al Mafraq'},
    '7' : {'code':'AT','name':'At Tafilah'},
    '8' : {'code':'AZ','name':'Az Zarqa\''},
    '9' : {'code':'IR','name':'Irbid'},
    '10' : {'code':'JA','name':'Jarash'},
    '11' : {'code':'MA','name':'Ma\'an'},
    '12' : {'code':'MD','name':'Madaba'}
  },
  'KZ':{
    '1' : {'code':'AL','name':'Almaty'},
    '2' : {'code':'AC','name':'Almaty City'},
    '3' : {'code':'AM','name':'Aqmola'},
    '4' : {'code':'AQ','name':'Aqtobe'},
    '5' : {'code':'AS','name':'Astana City'},
    '6' : {'code':'AT','name':'Atyrau'},
    '7' : {'code':'BA','name':'Batys Qazaqstan'},
    '8' : {'code':'BY','name':'Bayqongyr City'},
    '9' : {'code':'MA','name':'Mangghystau'},
    '10' : {'code':'ON','name':'Ongtustik Qazaqstan'},
    '11' : {'code':'PA','name':'Pavlodar'},
    '12' : {'code':'QA','name':'Qaraghandy'},
    '13' : {'code':'QO','name':'Qostanay'},
    '14' : {'code':'QY','name':'Qyzylorda'},
    '15' : {'code':'SH','name':'Shyghys Qazaqstan'},
    '16' : {'code':'SO','name':'Soltustik Qazaqstan'},
    '17' : {'code':'ZH','name':'Zhambyl'}
  },
  'KE':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'CO','name':'Coast'},
    '3' : {'code':'EA','name':'Eastern'},
    '4' : {'code':'NA','name':'Nairobi Area'},
    '5' : {'code':'NE','name':'North Eastern'},
    '6' : {'code':'NY','name':'Nyanza'},
    '7' : {'code':'RV','name':'Rift Valley'},
    '8' : {'code':'WE','name':'Western'}
  },
  'KI':{
    '1' : {'code':'AG','name':'Abaiang'},
    '2' : {'code':'AM','name':'Abemama'},
    '3' : {'code':'AK','name':'Aranuka'},
    '4' : {'code':'AO','name':'Arorae'},
    '5' : {'code':'BA','name':'Banaba'},
    '6' : {'code':'BE','name':'Beru'},
    '7' : {'code':'bT','name':'Butaritari'},
    '8' : {'code':'KA','name':'Kanton'},
    '9' : {'code':'KR','name':'Kiritimati'},
    '10' : {'code':'KU','name':'Kuria'},
    '11' : {'code':'MI','name':'Maiana'},
    '12' : {'code':'MN','name':'Makin'},
    '13' : {'code':'ME','name':'Marakei'},
    '14' : {'code':'NI','name':'Nikunau'},
    '15' : {'code':'NO','name':'Nonouti'},
    '16' : {'code':'ON','name':'Onotoa'},
    '17' : {'code':'TT','name':'Tabiteuea'},
    '18' : {'code':'TR','name':'Tabuaeran'},
    '19' : {'code':'TM','name':'Tamana'},
    '20' : {'code':'TW','name':'Tarawa'},
    '21' : {'code':'TE','name':'Teraina'}
  },
  'KP':{
    '1' : {'code':'CHA','name':'Chagang-do'},
    '2' : {'code':'HAB','name':'Hamgyong-bukto'},
    '3' : {'code':'HAN','name':'Hamgyong-namdo'},
    '4' : {'code':'HWB','name':'Hwanghae-bukto'},
    '5' : {'code':'HWN','name':'Hwanghae-namdo'},
    '6' : {'code':'KAN','name':'Kangwon-do'},
    '7' : {'code':'PYB','name':'P\'yongan-bukto'},
    '8' : {'code':'PYN','name':'P\'yongan-namdo'},
    '9' : {'code':'YAN','name':'Ryanggang-do (Yanggang-do)'},
    '10' : {'code':'NAJ','name':'Rason Directly Governed City'},
    '11' : {'code':'PYO','name':'P\'yongyang Special City'}
  },
  'KR':{
    '1' : {'code':'CO','name':'Ch\'ungch\'ong-bukto'},
    '2' : {'code':'CH','name':'Ch\'ungch\'ong-namdo'},
    '3' : {'code':'CD','name':'Cheju-do'},
    '4' : {'code':'CB','name':'Cholla-bukto'},
    '5' : {'code':'CN','name':'Cholla-namdo'},
    '6' : {'code':'IG','name':'Inch\'on-gwangyoksi'},
    '7' : {'code':'KA','name':'Kangwon-do'},
    '8' : {'code':'KG','name':'Kwangju-gwangyoksi'},
    '9' : {'code':'KD','name':'Kyonggi-do'},
    '10' : {'code':'KB','name':'Kyongsang-bukto'},
    '11' : {'code':'KN','name':'Kyongsang-namdo'},
    '12' : {'code':'PG','name':'Pusan-gwangyoksi'},
    '13' : {'code':'SO','name':'Soul-t\'ukpyolsi'},
    '14' : {'code':'TA','name':'Taegu-gwangyoksi'},
    '15' : {'code':'TG','name':'Taejon-gwangyoksi'}
  },
  'KW':{
    '1' : {'code':'AL','name':'Al\'Asimah'},
    '2' : {'code':'AA','name':'Al Ahmadi'},
    '3' : {'code':'AF','name':'Al Farwaniyah'},
    '4' : {'code':'AJ','name':'Al Jahra\''},
    '5' : {'code':'HA','name':'Hawalli'}
  },
  'KG':{
    '1' : {'code':'GB','name':'Bishkek'},
    '2' : {'code':'B','name':'Batken'},
    '3' : {'code':'C','name':'Chu'},
    '4' : {'code':'J','name':'Jalal-Abad'},
    '5' : {'code':'N','name':'Naryn'},
    '6' : {'code':'O','name':'Osh'},
    '7' : {'code':'T','name':'Talas'},
    '8' : {'code':'Y','name':'Ysyk-Kol'}
  },
  'LA':{
    '1' : {'code':'VT','name':'Vientiane'},
    '2' : {'code':'AT','name':'Attapu'},
    '3' : {'code':'BK','name':'Bokeo'},
    '4' : {'code':'BL','name':'Bolikhamxai'},
    '5' : {'code':'CH','name':'Champasak'},
    '6' : {'code':'HO','name':'Houaphan'},
    '7' : {'code':'KH','name':'Khammouan'},
    '8' : {'code':'LM','name':'Louang Namtha'},
    '9' : {'code':'LP','name':'Louangphabang'},
    '10' : {'code':'OU','name':'Oudomxai'},
    '11' : {'code':'PH','name':'Phongsali'},
    '12' : {'code':'SL','name':'Salavan'},
    '13' : {'code':'SV','name':'Savannakhet'},
    '14' : {'code':'VI','name':'Vientiane'},
    '15' : {'code':'XA','name':'Xaignabouli'},
    '16' : {'code':'XE','name':'Xekong'},
    '17' : {'code':'XI','name':'Xiangkhoang'},
    '18' : {'code':'XN','name':'Xaisomboun'}
  },
  'LV':{
    '1' : {'code':'AIZ','name':'Aizkraukles Rajons'},
    '2' : {'code':'ALU','name':'Aluksnes Rajons'},
    '3' : {'code':'BAL','name':'Balvu Rajons'},
    '4' : {'code':'BAU','name':'Bauskas Rajons'},
    '5' : {'code':'CES','name':'Cesu Rajons'},
    '6' : {'code':'DGR','name':'Daugavpils Rajons'},
    '7' : {'code':'DOB','name':'Dobeles Rajons'},
    '8' : {'code':'GUL','name':'Gulbenes Rajons'},
    '9' : {'code':'JEK','name':'Jekabpils Rajons'},
    '10' : {'code':'JGR','name':'Jelgavas Rajons'},
    '11' : {'code':'KRA','name':'Kraslavas Rajons'},
    '12' : {'code':'KUL','name':'Kuldigas Rajons'},
    '13' : {'code':'LPR','name':'Liepajas Rajons'},
    '14' : {'code':'LIM','name':'Limbazu Rajons'},
    '15' : {'code':'LUD','name':'Ludzas Rajons'},
    '16' : {'code':'MAD','name':'Madonas Rajons'},
    '17' : {'code':'OGR','name':'Ogres Rajons'},
    '18' : {'code':'PRE','name':'Preilu Rajons'},
    '19' : {'code':'RZR','name':'Rezeknes Rajons'},
    '20' : {'code':'RGR','name':'Rigas Rajons'},
    '21' : {'code':'SAL','name':'Saldus Rajons'},
    '22' : {'code':'TAL','name':'Talsu Rajons'},
    '23' : {'code':'TUK','name':'Tukuma Rajons'},
    '24' : {'code':'VLK','name':'Valkas Rajons'},
    '25' : {'code':'VLM','name':'Valmieras Rajons'},
    '26' : {'code':'VSR','name':'Ventspils Rajons'},
    '27' : {'code':'DGV','name':'Daugavpils'},
    '28' : {'code':'JGV','name':'Jelgava'},
    '29' : {'code':'JUR','name':'Jurmala'},
    '30' : {'code':'LPK','name':'Liepaja'},
    '31' : {'code':'RZK','name':'Rezekne'},
    '32' : {'code':'RGA','name':'Riga'},
    '33' : {'code':'VSL','name':'Ventspils'}
  },
  'LB':{
    '1' : {'code':'BIN','name':'Bint Jbeil'},
    '2' : {'code':'HAS','name':'Hasbaya'},
    '3' : {'code':'MAR','name':'Marjeyoun'},
    '4' : {'code':'NAB','name':'Nabatieh'},
    '5' : {'code':'BAA','name':'Baalbek'},
    '6' : {'code':'HER','name':'Hermel'},
    '7' : {'code':'RAS','name':'Rashaya'},
    '8' : {'code':'WES','name':'Western Beqaa'},
    '9' : {'code':'ZAH','name':'Zahle'},
    '10' : {'code':'AKK','name':'Akkar'},
    '11' : {'code':'BAT','name':'Batroun'},
    '12' : {'code':'BSH','name':'Bsharri'},
    '13' : {'code':'KOU','name':'Koura'},
    '14' : {'code':'MIN','name':'Miniyeh-Danniyeh'},
    '15' : {'code':'TRI','name':'Tripoli'},
    '16' : {'code':'ZGH','name':'Zgharta'},
    '17' : {'code':'ALE','name':'Aley'},
    '18' : {'code':'BAA','name':'Baabda'},
    '19' : {'code':'BYB','name':'Byblos'},
    '20' : {'code':'CHO','name':'Chouf'},
    '21' : {'code':'KES','name':'Kesrwan'},
    '22' : {'code':'MAT','name':'Matn'},
    '23' : {'code':'JEZ','name':'Jezzine'},
    '24' : {'code':'SID','name':'Sidon'},
    '25' : {'code':'TYR','name':'Tyre'}
  },
  'LS':{
    '1' : {'code':'BE','name':'Berea'},
    '2' : {'code':'BB','name':'Butha-Buthe'},
    '3' : {'code':'LE','name':'Leribe'},
    '4' : {'code':'MF','name':'Mafeteng'},
    '5' : {'code':'MS','name':'Maseru'},
    '6' : {'code':'MH','name':'Mohale\'s Hoek'},
    '7' : {'code':'MK','name':'Mokhotlong'},
    '8' : {'code':'QN','name':'Qacha\'s Nek'},
    '9' : {'code':'QT','name':'Quthing'},
    '10' : {'code':'TT','name':'Thaba-Tseka'}
  },
  'LR':{
    '1' : {'code':'BI','name':'Bomi'},
    '2' : {'code':'BG','name':'Bong'},
    '3' : {'code':'GB','name':'Grand Bassa'},
    '4' : {'code':'CM','name':'Grand Cape Mount'},
    '5' : {'code':'GG','name':'Grand Gedeh'},
    '6' : {'code':'GK','name':'Grand Kru'},
    '7' : {'code':'LO','name':'Lofa'},
    '8' : {'code':'MG','name':'Margibi'},
    '9' : {'code':'ML','name':'Maryland'},
    '10' : {'code':'MS','name':'Montserrado'},
    '11' : {'code':'NB','name':'Nimba'},
    '12' : {'code':'RC','name':'River Cess'},
    '13' : {'code':'SN','name':'Sinoe'}
  },
  'LY':{
    '1' : {'code':'AJ','name':'Ajdabiya'},
    '2' : {'code':'AZ','name':'Al \'Aziziyah'},
    '3' : {'code':'FA','name':'Al Fatih'},
    '4' : {'code':'JA','name':'Al Jabal al Akhdar'},
    '5' : {'code':'JU','name':'Al Jufrah'},
    '6' : {'code':'KH','name':'Al Khums'},
    '7' : {'code':'KU','name':'Al Kufrah'},
    '8' : {'code':'NK','name':'An Nuqat al Khams'},
    '9' : {'code':'AS','name':'Ash Shati\''},
    '10' : {'code':'AW','name':'Awbari'},
    '11' : {'code':'ZA','name':'Az Zawiyah'},
    '12' : {'code':'BA','name':'Banghazi'},
    '13' : {'code':'DA','name':'Darnah'},
    '14' : {'code':'GD','name':'Ghadamis'},
    '15' : {'code':'GY','name':'Gharyan'},
    '16' : {'code':'MI','name':'Misratah'},
    '17' : {'code':'MZ','name':'Murzuq'},
    '18' : {'code':'SB','name':'Sabha'},
    '19' : {'code':'SW','name':'Sawfajjin'},
    '20' : {'code':'SU','name':'Surt'},
    '21' : {'code':'TL','name':'Tarabulus (Tripoli)'},
    '22' : {'code':'TH','name':'Tarhunah'},
    '23' : {'code':'TU','name':'Tubruq'},
    '24' : {'code':'YA','name':'Yafran'},
    '25' : {'code':'ZL','name':'Zlitan'}
  },
  'LI':{
    '1' : {'code':'V','name':'Vaduz'},
    '2' : {'code':'A','name':'Schaan'},
    '3' : {'code':'B','name':'Balzers'},
    '4' : {'code':'N','name':'Triesen'},
    '5' : {'code':'E','name':'Eschen'},
    '6' : {'code':'M','name':'Mauren'},
    '7' : {'code':'T','name':'Triesenberg'},
    '8' : {'code':'R','name':'Ruggell'},
    '9' : {'code':'G','name':'Gamprin'},
    '10' : {'code':'L','name':'Schellenberg'},
    '11' : {'code':'P','name':'Planken'}
  },
  'LT':{
    '1' : {'code':'AL','name':'Alytus'},
    '2' : {'code':'KA','name':'Kaunas'},
    '3' : {'code':'KL','name':'Klaipeda'},
    '4' : {'code':'MA','name':'Marijampole'},
    '5' : {'code':'PA','name':'Panevezys'},
    '6' : {'code':'SI','name':'Siauliai'},
    '7' : {'code':'TA','name':'Taurage'},
    '8' : {'code':'TE','name':'Telsiai'},
    '9' : {'code':'UT','name':'Utena'},
    '10' : {'code':'VI','name':'Vilnius'}
  },
  'LU':{
    '1' : {'code':'DD','name':'Diekirch'},
    '2' : {'code':'DC','name':'Clervaux'},
    '3' : {'code':'DR','name':'Redange'},
    '4' : {'code':'DV','name':'Vianden'},
    '5' : {'code':'DW','name':'Wiltz'},
    '6' : {'code':'GG','name':'Grevenmacher'},
    '7' : {'code':'GE','name':'Echternach'},
    '8' : {'code':'GR','name':'Remich'},
    '9' : {'code':'LL','name':'Luxembourg'},
    '10' : {'code':'LC','name':'Capellen'},
    '11' : {'code':'LE','name':'Esch-sur-Alzette'},
    '12' : {'code':'LM','name':'Mersch'}
  },
  'MO':{
    '1' : {'code':'OLF','name':'Our Lady Fatima Parish'},
    '2' : {'code':'ANT','name':'St. Anthony Parish'},
    '3' : {'code':'LAZ','name':'St. Lazarus Parish'},
    '4' : {'code':'CAT','name':'Cathedral Parish'},
    '5' : {'code':'LAW','name':'St. Lawrence Parish'}
  },
  'MK':{
    '1' : {'code':'AER','name':'Aerodrom'},
    '2' : {'code':'ARA','name':'Aračinovo'},
    '3' : {'code':'BER','name':'Berovo'},
    '4' : {'code':'BIT','name':'Bitola'},
    '5' : {'code':'BOG','name':'Bogdanci'},
    '6' : {'code':'BOG','name':'Bogovinje'},
    '7' : {'code':'BOS','name':'Bosilovo'},
    '8' : {'code':'BRV','name':'Brvenica'},
    '9' : {'code':'BUT','name':'Butel'},
    '10' : {'code':'ČAI','name':'Čair'},
    '11' : {'code':'ČAš','name':'Čaška'},
    '12' : {'code':'CEN','name':'Centar'},
    '13' : {'code':'CEN','name':'Centar Župa'},
    '14' : {'code':'Češ','name':'Češinovo-Obleš'},
    '15' : {'code':'ČUČ','name':'Čučer-Sandevo'},
    '16' : {'code':'DEB','name':'Debar'},
    '17' : {'code':'DEB','name':'Debarca'},
    '18' : {'code':'DEL','name':'Delčevo'},
    '19' : {'code':'DEM','name':'Demir Hisar'},
    '20' : {'code':'DEM','name':'Demir Kapija'},
    '21' : {'code':'DOL','name':'Dolneni'},
    '22' : {'code':'DRU','name':'Drugovo'},
    '23' : {'code':'GAZ','name':'Gazi Baba'},
    '24' : {'code':'GEV','name':'Gevgelija'},
    '25' : {'code':'GJO','name':'Gjorče Petrov'},
    '26' : {'code':'GOS','name':'Gostivar'},
    '27' : {'code':'GRA','name':'Gradsko'},
    '28' : {'code':'ILI','name':'Ilinden'},
    '29' : {'code':'JEG','name':'Jegunovce'},
    '30' : {'code':'KAR','name':'Karbinci'},
    '31' : {'code':'KAR','name':'Karpoš'},
    '32' : {'code':'KAV','name':'Kavadarci'},
    '33' : {'code':'KIČ','name':'Kičevo'},
    '34' : {'code':'KIS','name':'Kisela Voda'},
    '35' : {'code':'KOč','name':'Kočani'},
    '36' : {'code':'KON','name':'Konče'},
    '37' : {'code':'KRA','name':'Kratovo'},
    '38' : {'code':'KRI','name':'Kriva Palanka'},
    '39' : {'code':'KRI','name':'Krivogaštani'},
    '40' : {'code':'KRU','name':'Kruševo'},
    '41' : {'code':'KUM','name':'Kumanovo'},
    '42' : {'code':'LIP','name':'Lipkovo'},
    '43' : {'code':'LOZ','name':'Lozovo'},
    '44' : {'code':'MAK','name':'Makedonska Kamenica'},
    '45' : {'code':'MAK','name':'Makedonski Brod'},
    '46' : {'code':'MAV','name':'Mavrovo and Rostuša'},
    '47' : {'code':'MOG','name':'Mogila'},
    '48' : {'code':'NEG','name':'Negotino'},
    '49' : {'code':'NOV','name':'Novaci'},
    '50' : {'code':'NOV','name':'Novo Selo'},
    '51' : {'code':'OHR','name':'Ohrid'},
    '52' : {'code':'OSL','name':'Oslomej'},
    '53' : {'code':'PEH','name':'Pehčevo'},
    '54' : {'code':'PET','name':'Petrovec'},
    '55' : {'code':'PLA','name':'Plasnica'},
    '56' : {'code':'PRI','name':'Prilep'},
    '57' : {'code':'PRO','name':'Probištip'},
    '58' : {'code':'RAD','name':'Radoviš'},
    '59' : {'code':'RAN','name':'Rankovce'},
    '60' : {'code':'RES','name':'Resen'},
    '61' : {'code':'ROS','name':'Rosoman'},
    '62' : {'code':'SAR','name':'Saraj'},
    '63' : {'code':'SOP','name':'Sopište'},
    '64' : {'code':'STA','name':'Star Dojran'},
    '65' : {'code':'STA','name':'Staro Nagoričane'},
    '66' : {'code':'ŠTI','name':'Štip'},
    '67' : {'code':'STR','name':'Struga'},
    '68' : {'code':'STR','name':'Strumica'},
    '69' : {'code':'STU','name':'Studeničani'},
    '70' : {'code':'ŠUT','name':'Šuto Orizari'},
    '71' : {'code':'SVE','name':'Sveti Nikole'},
    '72' : {'code':'TEA','name':'Tearce'},
    '73' : {'code':'TET','name':'Tetovo'},
    '74' : {'code':'VAL','name':'Valandovo'},
    '75' : {'code':'VAS','name':'Vasilevo'},
    '76' : {'code':'VEL','name':'Veles'},
    '77' : {'code':'VEV','name':'Vevčani'},
    '78' : {'code':'VIN','name':'Vinica'},
    '79' : {'code':'VRA','name':'Vraneštica'},
    '80' : {'code':'VRA','name':'Vrapčište'},
    '81' : {'code':'ZAJ','name':'Zajas'},
    '82' : {'code':'ZEL','name':'Zelenikovo'},
    '83' : {'code':'ŽEL','name':'Želino'},
    '84' : {'code':'ZRN','name':'Zrnovci'}
  },
  'MG':{
    '1' : {'code':'AN','name':'Antananarivo'},
    '2' : {'code':'AS','name':'Antsiranana'},
    '3' : {'code':'FN','name':'Fianarantsoa'},
    '4' : {'code':'MJ','name':'Mahajanga'},
    '5' : {'code':'TM','name':'Toamasina'},
    '6' : {'code':'TL','name':'Toliara'}
  },
  'MW':{
    '1' : {'code':'BLK','name':'Balaka'},
    '2' : {'code':'BLT','name':'Blantyre'},
    '3' : {'code':'CKW','name':'Chikwawa'},
    '4' : {'code':'CRD','name':'Chiradzulu'},
    '5' : {'code':'CTP','name':'Chitipa'},
    '6' : {'code':'DDZ','name':'Dedza'},
    '7' : {'code':'DWA','name':'Dowa'},
    '8' : {'code':'KRG','name':'Karonga'},
    '9' : {'code':'KSG','name':'Kasungu'},
    '10' : {'code':'LKM','name':'Likoma'},
    '11' : {'code':'LLG','name':'Lilongwe'},
    '12' : {'code':'MCG','name':'Machinga'},
    '13' : {'code':'MGC','name':'Mangochi'},
    '14' : {'code':'MCH','name':'Mchinji'},
    '15' : {'code':'MLJ','name':'Mulanje'},
    '16' : {'code':'MWZ','name':'Mwanza'},
    '17' : {'code':'MZM','name':'Mzimba'},
    '18' : {'code':'NTU','name':'Ntcheu'},
    '19' : {'code':'NKB','name':'Nkhata Bay'},
    '20' : {'code':'NKH','name':'Nkhotakota'},
    '21' : {'code':'NSJ','name':'Nsanje'},
    '22' : {'code':'NTI','name':'Ntchisi'},
    '23' : {'code':'PHL','name':'Phalombe'},
    '24' : {'code':'RMP','name':'Rumphi'},
    '25' : {'code':'SLM','name':'Salima'},
    '26' : {'code':'THY','name':'Thyolo'},
    '27' : {'code':'ZBA','name':'Zomba'}
  },
  'MY':{
    '1' : {'code':'Johor','name':'Johor'},
    '2' : {'code':'Kedah','name':'Kedah'},
    '3' : {'code':'Kelantan','name':'Kelantan'},
    '4' : {'code':'Labuan','name':'Labuan'},
    '5' : {'code':'Melaka','name':'Melaka'},
    '6' : {'code':'Negeri Sembilan','name':'Negeri Sembilan'},
    '7' : {'code':'Pahang','name':'Pahang'},
    '8' : {'code':'Perak','name':'Perak'},
    '9' : {'code':'Perlis','name':'Perlis'},
    '10' : {'code':'Pulau Pinang','name':'Pulau Pinang'},
    '11' : {'code':'Sabah','name':'Sabah'},
    '12' : {'code':'Sarawak','name':'Sarawak'},
    '13' : {'code':'Selangor','name':'Selangor'},
    '14' : {'code':'Terengganu','name':'Terengganu'},
    '15' : {'code':'Kuala Lumpur','name':'Kuala Lumpur'}
  },
  'MV':{
    '1' : {'code':'AAD','name':'Ari Atoll Dheknu'},
    '2' : {'code':'AAU','name':'Ari Atoll Uthuru'},
    '3' : {'code':'ADD','name':'Addu'},
    '4' : {'code':'FAA','name':'Faadhippolhu'},
    '5' : {'code':'FEA','name':'Felidhe Atoll'},
    '6' : {'code':'FMU','name':'Fua Mulaku'},
    '7' : {'code':'HAD','name':'Huvadhu Atoll Dhekunu'},
    '8' : {'code':'HAU','name':'Huvadhu Atoll Uthuru'},
    '9' : {'code':'HDH','name':'Hadhdhunmathi'},
    '10' : {'code':'KLH','name':'Kolhumadulu'},
    '11' : {'code':'MAA','name':'Male Atoll'},
    '12' : {'code':'MAD','name':'Maalhosmadulu Dhekunu'},
    '13' : {'code':'MAU','name':'Maalhosmadulu Uthuru'},
    '14' : {'code':'MLD','name':'Miladhunmadulu Dhekunu'},
    '15' : {'code':'MLU','name':'Miladhunmadulu Uthuru'},
    '16' : {'code':'MUA','name':'Mulaku Atoll'},
    '17' : {'code':'NAD','name':'Nilandhe Atoll Dhekunu'},
    '18' : {'code':'NAU','name':'Nilandhe Atoll Uthuru'},
    '19' : {'code':'THD','name':'Thiladhunmathi Dhekunu'},
    '20' : {'code':'THU','name':'Thiladhunmathi Uthuru'}
  },
  'ML':{
    '1' : {'code':'GA','name':'Gao'},
    '2' : {'code':'KY','name':'Kayes'},
    '3' : {'code':'KD','name':'Kidal'},
    '4' : {'code':'KL','name':'Koulikoro'},
    '5' : {'code':'MP','name':'Mopti'},
    '6' : {'code':'SG','name':'Segou'},
    '7' : {'code':'SK','name':'Sikasso'},
    '8' : {'code':'TB','name':'Tombouctou'},
    '9' : {'code':'CD','name':'Bamako Capital District'}
  },
  'MT':{
    '1' : {'code':'ATT','name':'Attard'},
    '2' : {'code':'BAL','name':'Balzan'},
    '3' : {'code':'BGU','name':'Birgu'},
    '4' : {'code':'BKK','name':'Birkirkara'},
    '5' : {'code':'BRZ','name':'Birzebbuga'},
    '6' : {'code':'BOR','name':'Bormla'},
    '7' : {'code':'DIN','name':'Dingli'},
    '8' : {'code':'FGU','name':'Fgura'},
    '9' : {'code':'FLO','name':'Floriana'},
    '10' : {'code':'GDJ','name':'Gudja'},
    '11' : {'code':'GZR','name':'Gzira'},
    '12' : {'code':'GRG','name':'Gargur'},
    '13' : {'code':'GXQ','name':'Gaxaq'},
    '14' : {'code':'HMR','name':'Hamrun'},
    '15' : {'code':'IKL','name':'Iklin'},
    '16' : {'code':'ISL','name':'Isla'},
    '17' : {'code':'KLK','name':'Kalkara'},
    '18' : {'code':'KRK','name':'Kirkop'},
    '19' : {'code':'LIJ','name':'Lija'},
    '20' : {'code':'LUQ','name':'Luqa'},
    '21' : {'code':'MRS','name':'Marsa'},
    '22' : {'code':'MKL','name':'Marsaskala'},
    '23' : {'code':'MXL','name':'Marsaxlokk'},
    '24' : {'code':'MDN','name':'Mdina'},
    '25' : {'code':'MEL','name':'Melliea'},
    '26' : {'code':'MGR','name':'Mgarr'},
    '27' : {'code':'MST','name':'Mosta'},
    '28' : {'code':'MQA','name':'Mqabba'},
    '29' : {'code':'MSI','name':'Msida'},
    '30' : {'code':'MTF','name':'Mtarfa'},
    '31' : {'code':'NAX','name':'Naxxar'},
    '32' : {'code':'PAO','name':'Paola'},
    '33' : {'code':'PEM','name':'Pembroke'},
    '34' : {'code':'PIE','name':'Pieta'},
    '35' : {'code':'QOR','name':'Qormi'},
    '36' : {'code':'QRE','name':'Qrendi'},
    '37' : {'code':'RAB','name':'Rabat'},
    '38' : {'code':'SAF','name':'Safi'},
    '39' : {'code':'SGI','name':'San Giljan'},
    '40' : {'code':'SLU','name':'Santa Lucija'},
    '41' : {'code':'SPB','name':'San Pawl il-Bahar'},
    '42' : {'code':'SGW','name':'San Gwann'},
    '43' : {'code':'SVE','name':'Santa Venera'},
    '44' : {'code':'SIG','name':'Siggiewi'},
    '45' : {'code':'SLM','name':'Sliema'},
    '46' : {'code':'SWQ','name':'Swieqi'},
    '47' : {'code':'TXB','name':'Ta Xbiex'},
    '48' : {'code':'TRX','name':'Tarxien'},
    '49' : {'code':'VLT','name':'Valletta'},
    '50' : {'code':'XGJ','name':'Xgajra'},
    '51' : {'code':'ZBR','name':'Zabbar'},
    '52' : {'code':'ZBG','name':'Zebbug'},
    '53' : {'code':'ZJT','name':'Zejtun'},
    '54' : {'code':'ZRQ','name':'Zurrieq'},
    '55' : {'code':'FNT','name':'Fontana'},
    '56' : {'code':'GHJ','name':'Ghajnsielem'},
    '57' : {'code':'GHR','name':'Gharb'},
    '58' : {'code':'GHS','name':'Ghasri'},
    '59' : {'code':'KRC','name':'Kercem'},
    '60' : {'code':'MUN','name':'Munxar'},
    '61' : {'code':'NAD','name':'Nadur'},
    '62' : {'code':'QAL','name':'Qala'},
    '63' : {'code':'VIC','name':'Victoria'},
    '64' : {'code':'SLA','name':'San Lawrenz'},
    '65' : {'code':'SNT','name':'Sannat'},
    '66' : {'code':'ZAG','name':'Xagra'},
    '67' : {'code':'XEW','name':'Xewkija'},
    '68' : {'code':'ZEB','name':'Zebbug'}
  },
  'MH':{
    '1' : {'code':'ALG','name':'Ailinginae'},
    '2' : {'code':'ALL','name':'Ailinglaplap'},
    '3' : {'code':'ALK','name':'Ailuk'},
    '4' : {'code':'ARN','name':'Arno'},
    '5' : {'code':'AUR','name':'Aur'},
    '6' : {'code':'BKR','name':'Bikar'},
    '7' : {'code':'BKN','name':'Bikini'},
    '8' : {'code':'BKK','name':'Bokak'},
    '9' : {'code':'EBN','name':'Ebon'},
    '10' : {'code':'ENT','name':'Enewetak'},
    '11' : {'code':'EKB','name':'Erikub'},
    '12' : {'code':'JBT','name':'Jabat'},
    '13' : {'code':'JLT','name':'Jaluit'},
    '14' : {'code':'JEM','name':'Jemo'},
    '15' : {'code':'KIL','name':'Kili'},
    '16' : {'code':'KWJ','name':'Kwajalein'},
    '17' : {'code':'LAE','name':'Lae'},
    '18' : {'code':'LIB','name':'Lib'},
    '19' : {'code':'LKP','name':'Likiep'},
    '20' : {'code':'MJR','name':'Majuro'},
    '21' : {'code':'MLP','name':'Maloelap'},
    '22' : {'code':'MJT','name':'Mejit'},
    '23' : {'code':'MIL','name':'Mili'},
    '24' : {'code':'NMK','name':'Namorik'},
    '25' : {'code':'NAM','name':'Namu'},
    '26' : {'code':'RGL','name':'Rongelap'},
    '27' : {'code':'RGK','name':'Rongrik'},
    '28' : {'code':'TOK','name':'Toke'},
    '29' : {'code':'UJA','name':'Ujae'},
    '30' : {'code':'UJL','name':'Ujelang'},
    '31' : {'code':'UTK','name':'Utirik'},
    '32' : {'code':'WTH','name':'Wotho'},
    '33' : {'code':'WTJ','name':'Wotje'}
  },
  'MQ':{
    '1' : {'code':'LAJ','name':'L\'Ajoupa-Bouillon'},
    '2' : {'code':'LES','name':'Les Anses-d\'Arlet'},
    '3' : {'code':'BAS','name':'Basse-Pointe'},
    '4' : {'code':'BEL','name':'Bellefontaine'},
    '5' : {'code':'LE','name':'Le Carbet'},
    '6' : {'code':'CAS','name':'Case-Pilote'},
    '7' : {'code':'LE','name':'Le Diamant'},
    '8' : {'code':'DUC','name':'Ducos'},
    '9' : {'code':'FON','name':'Fonds-Saint-Denis'},
    '10' : {'code':'FOR','name':'Fort-De-France'},
    '11' : {'code':'LE','name':'Le François'},
    '12' : {'code':'GRA','name':'Grand\'Rivière'},
    '13' : {'code':'GRO','name':'Gros-Morne'},
    '14' : {'code':'LE','name':'Le Lamentin'},
    '15' : {'code':'LE','name':'Le Lorrain'},
    '16' : {'code':'MAC','name':'Macouba'},
    '17' : {'code':'LE','name':'Le Marigot'},
    '18' : {'code':'LE','name':'Le Marin'},
    '19' : {'code':'LE','name':'Le Morne-Rouge'},
    '20' : {'code':'LE','name':'Le Morne-Vert'},
    '21' : {'code':'LE','name':'Le Prêcheur'},
    '22' : {'code':'RIV','name':'Rivière-Pilote'},
    '23' : {'code':'RIV','name':'Rivière-Salée'},
    '24' : {'code':'LE','name':'Le Robert'},
    '25' : {'code':'SAI','name':'Sainte-Anne'},
    '26' : {'code':'SAI','name':'Sainte-Luce'},
    '27' : {'code':'SAI','name':'Sainte-Marie'},
    '28' : {'code':'SAI','name':'Saint-Esprit'},
    '29' : {'code':'SAI','name':'Saint-Joseph'},
    '30' : {'code':'SAI','name':'Saint-Pierre'},
    '31' : {'code':'SCH','name':'Schœlcher'},
    '32' : {'code':'LA','name':'La Trinité'},
    '33' : {'code':'LES','name':'Les Trois-Îlets'},
    '34' : {'code':'LE','name':'Le Vauclin'}
  },
  'MR':{
    '1' : {'code':'AD','name':'Adrar'},
    '2' : {'code':'AS','name':'Assaba'},
    '3' : {'code':'BR','name':'Brakna'},
    '4' : {'code':'DN','name':'Dakhlet Nouadhibou'},
    '5' : {'code':'GO','name':'Gorgol'},
    '6' : {'code':'GM','name':'Guidimaka'},
    '7' : {'code':'HC','name':'Hodh Ech Chargui'},
    '8' : {'code':'HG','name':'Hodh El Gharbi'},
    '9' : {'code':'IN','name':'Inchiri'},
    '10' : {'code':'TA','name':'Tagant'},
    '11' : {'code':'TZ','name':'Tiris Zemmour'},
    '12' : {'code':'TR','name':'Trarza'},
    '13' : {'code':'NO','name':'Nouakchott'}
  },
  'MU':{
    '1' : {'code':'AG','name':'Agalega Islands'},
    '2' : {'code':'BL','name':'Black River'},
    '3' : {'code':'BR','name':'Beau Bassin-Rose Hill'},
    '4' : {'code':'CC','name':'Cargados Carajos Shoals (Saint B)'},
    '5' : {'code':'CU','name':'Curepipe'},
    '6' : {'code':'FL','name':'Flacq'},
    '7' : {'code':'GP','name':'Grand Port'},
    '8' : {'code':'MO','name':'Moka'},
    '9' : {'code':'PA','name':'Pamplemousses'},
    '10' : {'code':'PL','name':'Port Louis'},
    '11' : {'code':'PU','name':'Port Louis'},
    '12' : {'code':'PW','name':'Plaines Wilhems'},
    '13' : {'code':'QB','name':'Quatre Bornes'},
    '14' : {'code':'RO','name':'Rodrigues'},
    '15' : {'code':'RR','name':'Riviere du Rempart'},
    '16' : {'code':'SA','name':'Savanne'},
    '17' : {'code':'VP','name':'Vacoas-Phoenix'}
  },
  'YT':{
    '1' : {'code':'DZA','name':'Dzaoudzi'},
    '2' : {'code':'PAM','name':'Pamandzi'},
    '3' : {'code':'MAM','name':'Mamoudzou'},
    '4' : {'code':'DEM','name':'Dembeni'},
    '5' : {'code':'BAN','name':'Bandrele'},
    '6' : {'code':'KAN','name':'Kani-Kéli'},
    '7' : {'code':'BOU','name':'Bouéni'},
    '8' : {'code':'CHI','name':'Chirongui'},
    '9' : {'code':'SAD','name':'Sada'},
    '10' : {'code':'OUA','name':'Ouangani'},
    '11' : {'code':'CHI','name':'Chiconi'},
    '12' : {'code':'TSI','name':'Tsingoni'},
    '13' : {'code':'MTS','name':'M\'Tsangamouji'},
    '14' : {'code':'ACO','name':'Acoua'},
    '15' : {'code':'MTS','name':'Mtsamboro'},
    '16' : {'code':'BAN','name':'Bandraboua'},
    '17' : {'code':'KOU','name':'Koungou'}
  },
  'MX':{
    '1' : {'code':'AGU','name':'Aguascalientes'},
    '2' : {'code':'BCN','name':'Baja California Norte'},
    '3' : {'code':'BCS','name':'Baja California Sur'},
    '4' : {'code':'CAM','name':'Campeche'},
    '5' : {'code':'CHP','name':'Chiapas'},
    '6' : {'code':'CHH','name':'Chihuahua'},
    '7' : {'code':'COA','name':'Coahuila de Zaragoza'},
    '8' : {'code':'COL','name':'Colima'},
    '9' : {'code':'DIF','name':'Distrito Federal'},
    '10' : {'code':'DUR','name':'Durango'},
    '11' : {'code':'GUA','name':'Guanajuato'},
    '12' : {'code':'GRO','name':'Guerrero'},
    '13' : {'code':'HID','name':'Hidalgo'},
    '14' : {'code':'JAL','name':'Jalisco'},
    '15' : {'code':'MEX','name':'Mexico'},
    '16' : {'code':'MIC','name':'Michoacan de Ocampo'},
    '17' : {'code':'MOR','name':'Morelos'},
    '18' : {'code':'NAY','name':'Nayarit'},
    '19' : {'code':'NLE','name':'Nuevo Leon'},
    '20' : {'code':'OAX','name':'Oaxaca'},
    '21' : {'code':'PUE','name':'Puebla'},
    '22' : {'code':'QUE','name':'Queretaro de Arteaga'},
    '23' : {'code':'ROO','name':'Quintana Roo'},
    '24' : {'code':'SLP','name':'San Luis Potosi'},
    '25' : {'code':'SIN','name':'Sinaloa'},
    '26' : {'code':'SON','name':'Sonora'},
    '27' : {'code':'TAB','name':'Tabasco'},
    '28' : {'code':'TAM','name':'Tamaulipas'},
    '29' : {'code':'TLA','name':'Tlaxcala'},
    '30' : {'code':'VER','name':'Veracruz-Llave'},
    '31' : {'code':'YUC','name':'Yucatan'},
    '32' : {'code':'ZAC','name':'Zacatecas'}
  },
  'FM':{
    '1' : {'code':'C','name':'Chuuk'},
    '2' : {'code':'K','name':'Kosrae'},
    '3' : {'code':'P','name':'Pohnpei'},
    '4' : {'code':'Y','name':'Yap'}
  },
  'MD':{
    '1' : {'code':'GA','name':'Gagauzia'},
    '2' : {'code':'CU','name':'Chisinau'},
    '3' : {'code':'BA','name':'Balti'},
    '4' : {'code':'CA','name':'Cahul'},
    '5' : {'code':'ED','name':'Edinet'},
    '6' : {'code':'LA','name':'Lapusna'},
    '7' : {'code':'OR','name':'Orhei'},
    '8' : {'code':'SO','name':'Soroca'},
    '9' : {'code':'TI','name':'Tighina'},
    '10' : {'code':'UN','name':'Ungheni'},
    '11' : {'code':'SN','name':'Stânga Nistrului'}
  },
  'MC':{
    '1' : {'code':'FV','name':'Fontvieille'},
    '2' : {'code':'LC','name':'La Condamine'},
    '3' : {'code':'MV','name':'Monaco-Ville'},
    '4' : {'code':'MC','name':'Monte-Carlo'}
  },
  'MN':{
    '1' : {'code':'1','name':'Ulanbaatar'},
    '2' : {'code':'035','name':'Orhon'},
    '3' : {'code':'037','name':'Darhan uul'},
    '4' : {'code':'039','name':'Hentiy'},
    '5' : {'code':'041','name':'Hovsgol'},
    '6' : {'code':'043','name':'Hovd'},
    '7' : {'code':'046','name':'Uvs'},
    '8' : {'code':'047','name':'Tov'},
    '9' : {'code':'049','name':'Selenge'},
    '10' : {'code':'051','name':'Suhbaatar'},
    '11' : {'code':'053','name':'Omnogovi'},
    '12' : {'code':'055','name':'Ovorhangay'},
    '13' : {'code':'057','name':'Dzavhan'},
    '14' : {'code':'059','name':'DundgovL'},
    '15' : {'code':'061','name':'Dornod'},
    '16' : {'code':'063','name':'Dornogov'},
    '17' : {'code':'064','name':'Govi-Sumber'},
    '18' : {'code':'065','name':'Govi-Altay'},
    '19' : {'code':'067','name':'Bulgan'},
    '20' : {'code':'069','name':'Bayanhongor'},
    '21' : {'code':'071','name':'Bayan-Olgiy'},
    '22' : {'code':'073','name':'Arhangay'}
  },
  'MS':{
    '1' : {'code':'A','name':'Saint Anthony'},
    '2' : {'code':'G','name':'Saint Georges'},
    '3' : {'code':'P','name':'Saint Peter'}
  },
  'MA':{
    '1' : {'code':'AGD','name':'Agadir'},
    '2' : {'code':'HOC','name':'Al Hoceima'},
    '3' : {'code':'AZI','name':'Azilal'},
    '4' : {'code':'BME','name':'Beni Mellal'},
    '5' : {'code':'BSL','name':'Ben Slimane'},
    '6' : {'code':'BLM','name':'Boulemane'},
    '7' : {'code':'CBL','name':'Casablanca'},
    '8' : {'code':'CHA','name':'Chaouen'},
    '9' : {'code':'EJA','name':'El Jadida'},
    '10' : {'code':'EKS','name':'El Kelaa des Sraghna'},
    '11' : {'code':'ERA','name':'Er Rachidia'},
    '12' : {'code':'ESS','name':'Essaouira'},
    '13' : {'code':'FES','name':'Fes'},
    '14' : {'code':'FIG','name':'Figuig'},
    '15' : {'code':'GLM','name':'Guelmim'},
    '16' : {'code':'IFR','name':'Ifrane'},
    '17' : {'code':'KEN','name':'Kenitra'},
    '18' : {'code':'KHM','name':'Khemisset'},
    '19' : {'code':'KHN','name':'Khenifra'},
    '20' : {'code':'KHO','name':'Khouribga'},
    '21' : {'code':'LYN','name':'Laayoune'},
    '22' : {'code':'LAR','name':'Larache'},
    '23' : {'code':'MRK','name':'Marrakech'},
    '24' : {'code':'MKN','name':'Meknes'},
    '25' : {'code':'NAD','name':'Nador'},
    '26' : {'code':'ORZ','name':'Ouarzazate'},
    '27' : {'code':'OUJ','name':'Oujda'},
    '28' : {'code':'RSA','name':'Rabat-Sale'},
    '29' : {'code':'SAF','name':'Safi'},
    '30' : {'code':'SET','name':'Settat'},
    '31' : {'code':'SKA','name':'Sidi Kacem'},
    '32' : {'code':'TGR','name':'Tangier'},
    '33' : {'code':'TAN','name':'Tan-Tan'},
    '34' : {'code':'TAO','name':'Taounate'},
    '35' : {'code':'TRD','name':'Taroudannt'},
    '36' : {'code':'TAT','name':'Tata'},
    '37' : {'code':'TAZ','name':'Taza'},
    '38' : {'code':'TET','name':'Tetouan'},
    '39' : {'code':'TIZ','name':'Tiznit'},
    '40' : {'code':'ADK','name':'Ad Dakhla'},
    '41' : {'code':'BJD','name':'Boujdour'},
    '42' : {'code':'ESM','name':'Es Smara'}
  },
  'MZ':{
    '1' : {'code':'CD','name':'Cabo Delgado'},
    '2' : {'code':'GZ','name':'Gaza'},
    '3' : {'code':'IN','name':'Inhambane'},
    '4' : {'code':'MN','name':'Manica'},
    '5' : {'code':'MC','name':'Maputo (city)'},
    '6' : {'code':'MP','name':'Maputo'},
    '7' : {'code':'NA','name':'Nampula'},
    '8' : {'code':'NI','name':'Niassa'},
    '9' : {'code':'SO','name':'Sofala'},
    '10' : {'code':'TE','name':'Tete'},
    '11' : {'code':'ZA','name':'Zambezia'}
  },
  'MM':{
    '1' : {'code':'AY','name':'Ayeyarwady'},
    '2' : {'code':'BG','name':'Bago'},
    '3' : {'code':'MG','name':'Magway'},
    '4' : {'code':'MD','name':'Mandalay'},
    '5' : {'code':'SG','name':'Sagaing'},
    '6' : {'code':'TN','name':'Tanintharyi'},
    '7' : {'code':'YG','name':'Yangon'},
    '8' : {'code':'CH','name':'Chin State'},
    '9' : {'code':'KC','name':'Kachin State'},
    '10' : {'code':'KH','name':'Kayah State'},
    '11' : {'code':'KN','name':'Kayin State'},
    '12' : {'code':'MN','name':'Mon State'},
    '13' : {'code':'RK','name':'Rakhine State'},
    '14' : {'code':'SH','name':'Shan State'}
  },
  'NA':{
    '1' : {'code':'CA','name':'Caprivi'},
    '2' : {'code':'ER','name':'Erongo'},
    '3' : {'code':'HA','name':'Hardap'},
    '4' : {'code':'KR','name':'Karas'},
    '5' : {'code':'KV','name':'Kavango'},
    '6' : {'code':'KH','name':'Khomas'},
    '7' : {'code':'KU','name':'Kunene'},
    '8' : {'code':'OW','name':'Ohangwena'},
    '9' : {'code':'OK','name':'Omaheke'},
    '10' : {'code':'OT','name':'Omusati'},
    '11' : {'code':'ON','name':'Oshana'},
    '12' : {'code':'OO','name':'Oshikoto'},
    '13' : {'code':'OJ','name':'Otjozondjupa'}
  },
  'NR':{
    '1' : {'code':'AO','name':'Aiwo'},
    '2' : {'code':'AA','name':'Anabar'},
    '3' : {'code':'AT','name':'Anetan'},
    '4' : {'code':'AI','name':'Anibare'},
    '5' : {'code':'BA','name':'Baiti'},
    '6' : {'code':'BO','name':'Boe'},
    '7' : {'code':'BU','name':'Buada'},
    '8' : {'code':'DE','name':'Denigomodu'},
    '9' : {'code':'EW','name':'Ewa'},
    '10' : {'code':'IJ','name':'Ijuw'},
    '11' : {'code':'ME','name':'Meneng'},
    '12' : {'code':'NI','name':'Nibok'},
    '13' : {'code':'UA','name':'Uaboe'},
    '14' : {'code':'YA','name':'Yaren'}
  },
  'NP':{
    '1' : {'code':'BA','name':'Bagmati'},
    '2' : {'code':'BH','name':'Bheri'},
    '3' : {'code':'DH','name':'Dhawalagiri'},
    '4' : {'code':'GA','name':'Gandaki'},
    '5' : {'code':'JA','name':'Janakpur'},
    '6' : {'code':'KA','name':'Karnali'},
    '7' : {'code':'KO','name':'Kosi'},
    '8' : {'code':'LU','name':'Lumbini'},
    '9' : {'code':'MA','name':'Mahakali'},
    '10' : {'code':'ME','name':'Mechi'},
    '11' : {'code':'NA','name':'Narayani'},
    '12' : {'code':'RA','name':'Rapti'},
    '13' : {'code':'SA','name':'Sagarmatha'},
    '14' : {'code':'SE','name':'Seti'}
  },
  'NL':{
    '1' : {'code':'DR','name':'Drenthe'},
    '2' : {'code':'FL','name':'Flevoland'},
    '3' : {'code':'FR','name':'Friesland'},
    '4' : {'code':'GE','name':'Gelderland'},
    '5' : {'code':'GR','name':'Groningen'},
    '6' : {'code':'LI','name':'Limburg'},
    '7' : {'code':'NB','name':'Noord Brabant'},
    '8' : {'code':'NH','name':'Noord Holland'},
    '9' : {'code':'OV','name':'Overijssel'},
    '10' : {'code':'UT','name':'Utrecht'},
    '11' : {'code':'ZE','name':'Zeeland'},
    '12' : {'code':'ZH','name':'Zuid Holland'}
  },
  'AN':{
    '1' : {'code':'BON','name':'Bonaire'},
    '2' : {'code':'CUR','name':'Curaçao'},
    '3' : {'code':'SAB','name':'Saba'},
    '4' : {'code':'SEU','name':'Sint Eustatius'},
    '5' : {'code':'SMA','name':'Sint Maarten'}
  },
  'NC':{
    '1' : {'code':'L','name':'Iles Loyaute'},
    '2' : {'code':'N','name':'Nord'},
    '3' : {'code':'S','name':'Sud'}
  },
  'NZ':{
    '1' : {'code':'AUK','name':'Auckland'},
    '2' : {'code':'BOP','name':'Bay of Plenty'},
    '3' : {'code':'CAN','name':'Canterbury'},
    '4' : {'code':'COR','name':'Coromandel'},
    '5' : {'code':'GIS','name':'Gisborne'},
    '6' : {'code':'FIO','name':'Fiordland'},
    '7' : {'code':'HKB','name':'Hawke\'s Bay'},
    '8' : {'code':'MBH','name':'Marlborough'},
    '9' : {'code':'MWT','name':'Manawatu-Wanganui'},
    '10' : {'code':'MCM','name':'Mt Cook-Mackenzie'},
    '11' : {'code':'NSN','name':'Nelson'},
    '12' : {'code':'NTL','name':'Northland'},
    '13' : {'code':'OTA','name':'Otago'},
    '14' : {'code':'STL','name':'Southland'},
    '15' : {'code':'TKI','name':'Taranaki'},
    '16' : {'code':'WGN','name':'Wellington'},
    '17' : {'code':'WKO','name':'Waikato'},
    '18' : {'code':'WAI','name':'Wairprarapa'},
    '19' : {'code':'WTC','name':'West Coast'}
  },
  'NI':{
    '1' : {'code':'AN','name':'Atlantico Norte'},
    '2' : {'code':'AS','name':'Atlantico Sur'},
    '3' : {'code':'BO','name':'Boaco'},
    '4' : {'code':'CA','name':'Carazo'},
    '5' : {'code':'CI','name':'Chinandega'},
    '6' : {'code':'CO','name':'Chontales'},
    '7' : {'code':'ES','name':'Esteli'},
    '8' : {'code':'GR','name':'Granada'},
    '9' : {'code':'JI','name':'Jinotega'},
    '10' : {'code':'LE','name':'Leon'},
    '11' : {'code':'MD','name':'Madriz'},
    '12' : {'code':'MN','name':'Managua'},
    '13' : {'code':'MS','name':'Masaya'},
    '14' : {'code':'MT','name':'Matagalpa'},
    '15' : {'code':'NS','name':'Nuevo Segovia'},
    '16' : {'code':'RS','name':'Rio San Juan'},
    '17' : {'code':'RI','name':'Rivas'}
  },
  'NE':{
    '1' : {'code':'AG','name':'Agadez'},
    '2' : {'code':'DF','name':'Diffa'},
    '3' : {'code':'DS','name':'Dosso'},
    '4' : {'code':'MA','name':'Maradi'},
    '5' : {'code':'NM','name':'Niamey'},
    '6' : {'code':'TH','name':'Tahoua'},
    '7' : {'code':'TL','name':'Tillaberi'},
    '8' : {'code':'ZD','name':'Zinder'}
  },
  'NG':{
    '1' : {'code':'AB','name':'Abia'},
    '2' : {'code':'CT','name':'Abuja Federal Capital Territory'},
    '3' : {'code':'AD','name':'Adamawa'},
    '4' : {'code':'AK','name':'Akwa Ibom'},
    '5' : {'code':'AN','name':'Anambra'},
    '6' : {'code':'BC','name':'Bauchi'},
    '7' : {'code':'BY','name':'Bayelsa'},
    '8' : {'code':'BN','name':'Benue'},
    '9' : {'code':'BO','name':'Borno'},
    '10' : {'code':'CR','name':'Cross River'},
    '11' : {'code':'DE','name':'Delta'},
    '12' : {'code':'EB','name':'Ebonyi'},
    '13' : {'code':'ED','name':'Edo'},
    '14' : {'code':'EK','name':'Ekiti'},
    '15' : {'code':'EN','name':'Enugu'},
    '16' : {'code':'GO','name':'Gombe'},
    '17' : {'code':'IM','name':'Imo'},
    '18' : {'code':'JI','name':'Jigawa'},
    '19' : {'code':'KD','name':'Kaduna'},
    '20' : {'code':'KN','name':'Kano'},
    '21' : {'code':'KT','name':'Katsina'},
    '22' : {'code':'KE','name':'Kebbi'},
    '23' : {'code':'KO','name':'Kogi'},
    '24' : {'code':'KW','name':'Kwara'},
    '25' : {'code':'LA','name':'Lagos'},
    '26' : {'code':'NA','name':'Nassarawa'},
    '27' : {'code':'NI','name':'Niger'},
    '28' : {'code':'OG','name':'Ogun'},
    '29' : {'code':'ONG','name':'Ondo'},
    '30' : {'code':'OS','name':'Osun'},
    '31' : {'code':'OY','name':'Oyo'},
    '32' : {'code':'PL','name':'Plateau'},
    '33' : {'code':'RI','name':'Rivers'},
    '34' : {'code':'SO','name':'Sokoto'},
    '35' : {'code':'TA','name':'Taraba'},
    '36' : {'code':'YO','name':'Yobe'},
    '37' : {'code':'ZA','name':'Zamfara'}
  },
  'NU':{
    '1' : {'code':'MAK','name':'Makefu'},
    '2' : {'code':'TUA','name':'Tuapa'},
    '3' : {'code':'NAM','name':'Namukulu'},
    '4' : {'code':'HIK','name':'Hikutavake'},
    '5' : {'code':'TOI','name':'Toi'},
    '6' : {'code':'MUT','name':'Mutalau'},
    '7' : {'code':'LAK','name':'Lakepa'},
    '8' : {'code':'LIK','name':'Liku'},
    '9' : {'code':'HAK','name':'Hakupu'},
    '10' : {'code':'VAI','name':'Vaiea'},
    '11' : {'code':'AVA','name':'Avatele'},
    '12' : {'code':'TAM','name':'Tamakautoga'},
    '13' : {'code':'ALO','name':'Alofi South'},
    '14' : {'code':'ALO','name':'Alofi North'}
  },
  'NF':{
    '1' : {'code':'NOR','name':'Norfolk Island'}
  },
  'MP':{
    '1' : {'code':'N','name':'Northern Islands'},
    '2' : {'code':'R','name':'Rota'},
    '3' : {'code':'S','name':'Saipan'},
    '4' : {'code':'T','name':'Tinian'}
  },
  'NO':{
    '1' : {'code':'AK','name':'Akershus'},
    '2' : {'code':'AA','name':'Aust-Agder'},
    '3' : {'code':'BU','name':'Buskerud'},
    '4' : {'code':'FM','name':'Finnmark'},
    '5' : {'code':'HM','name':'Hedmark'},
    '6' : {'code':'HL','name':'Hordaland'},
    '7' : {'code':'MR','name':'Møre og Romsdal'},
    '8' : {'code':'NL','name':'Nordland'},
    '9' : {'code':'NT','name':'Nord-Trøndelag'},
    '10' : {'code':'OP','name':'Oppland'},
    '11' : {'code':'OL','name':'Oslo'},
    '12' : {'code':'RL','name':'Rogaland'},
    '13' : {'code':'SJ','name':'Sogn og Fjordane'},
    '14' : {'code':'ST','name':'Sør-Trøndelag'},
    '15' : {'code':'SV','name':'Svalbard'},
    '16' : {'code':'TM','name':'Telemark'},
    '17' : {'code':'TR','name':'Troms'},
    '18' : {'code':'VA','name':'Vest-Agder'},
    '19' : {'code':'VF','name':'Vestfold'},
    '20' : {'code':'OF','name':'Østfold'}
  },
  'OM':{
    '1' : {'code':'DA','name':'Ad Dakhiliyah'},
    '2' : {'code':'BA','name':'Al Batinah'},
    '3' : {'code':'WU','name':'Al Wusta'},
    '4' : {'code':'SH','name':'Ash Sharqiyah'},
    '5' : {'code':'ZA','name':'Az Zahirah'},
    '6' : {'code':'MA','name':'Masqat'},
    '7' : {'code':'MU','name':'Musandam'},
    '8' : {'code':'ZU','name':'Zufar'}
  },
  'PK':{
    '1' : {'code':'B','name':'Balochistan'},
    '2' : {'code':'T','name':'Federally Administered Tribal Ar'},
    '3' : {'code':'I','name':'Islamabad Capital Territory'},
    '4' : {'code':'N','name':'North-West Frontier'},
    '5' : {'code':'P','name':'Punjab'},
    '6' : {'code':'S','name':'Sindh'}
  },
  'PW':{
    '1' : {'code':'AM','name':'Aimeliik'},
    '2' : {'code':'AR','name':'Airai'},
    '3' : {'code':'AN','name':'Angaur'},
    '4' : {'code':'HA','name':'Hatohobei'},
    '5' : {'code':'KA','name':'Kayangel'},
    '6' : {'code':'KO','name':'Koror'},
    '7' : {'code':'ME','name':'Melekeok'},
    '8' : {'code':'NA','name':'Ngaraard'},
    '9' : {'code':'NG','name':'Ngarchelong'},
    '10' : {'code':'ND','name':'Ngardmau'},
    '11' : {'code':'NT','name':'Ngatpang'},
    '12' : {'code':'NC','name':'Ngchesar'},
    '13' : {'code':'NR','name':'Ngeremlengui'},
    '14' : {'code':'NW','name':'Ngiwal'},
    '15' : {'code':'PE','name':'Peleliu'},
    '16' : {'code':'SO','name':'Sonsorol'}
  },
  'PA':{
    '1' : {'code':'BT','name':'Bocas del Toro'},
    '2' : {'code':'CH','name':'Chiriqui'},
    '3' : {'code':'CC','name':'Cocle'},
    '4' : {'code':'CL','name':'Colon'},
    '5' : {'code':'DA','name':'Darien'},
    '6' : {'code':'HE','name':'Herrera'},
    '7' : {'code':'LS','name':'Los Santos'},
    '8' : {'code':'PA','name':'Panama'},
    '9' : {'code':'SB','name':'San Blas'},
    '10' : {'code':'VG','name':'Veraguas'}
  },
  'PG':{
    '1' : {'code':'BV','name':'Bougainville'},
    '2' : {'code':'CE','name':'Central'},
    '3' : {'code':'CH','name':'Chimbu'},
    '4' : {'code':'EH','name':'Eastern Highlands'},
    '5' : {'code':'EB','name':'East New Britain'},
    '6' : {'code':'ES','name':'East Sepik'},
    '7' : {'code':'EN','name':'Enga'},
    '8' : {'code':'GU','name':'Gulf'},
    '9' : {'code':'MD','name':'Madang'},
    '10' : {'code':'MN','name':'Manus'},
    '11' : {'code':'MB','name':'Milne Bay'},
    '12' : {'code':'MR','name':'Morobe'},
    '13' : {'code':'NC','name':'National Capital'},
    '14' : {'code':'NI','name':'New Ireland'},
    '15' : {'code':'NO','name':'Northern'},
    '16' : {'code':'SA','name':'Sandaun'},
    '17' : {'code':'SH','name':'Southern Highlands'},
    '18' : {'code':'WE','name':'Western'},
    '19' : {'code':'WH','name':'Western Highlands'},
    '20' : {'code':'WB','name':'West New Britain'}
  },
  'PY':{
    '1' : {'code':'AG','name':'Alto Paraguay'},
    '2' : {'code':'AN','name':'Alto Parana'},
    '3' : {'code':'AM','name':'Amambay'},
    '4' : {'code':'AS','name':'Asuncion'},
    '5' : {'code':'BO','name':'Boqueron'},
    '6' : {'code':'CG','name':'Caaguazu'},
    '7' : {'code':'CZ','name':'Caazapa'},
    '8' : {'code':'CN','name':'Canindeyu'},
    '9' : {'code':'CE','name':'Central'},
    '10' : {'code':'CC','name':'Concepcion'},
    '11' : {'code':'CD','name':'Cordillera'},
    '12' : {'code':'GU','name':'Guaira'},
    '13' : {'code':'IT','name':'Itapua'},
    '14' : {'code':'MI','name':'Misiones'},
    '15' : {'code':'NE','name':'Neembucu'},
    '16' : {'code':'PA','name':'Paraguari'},
    '17' : {'code':'PH','name':'Presidente Hayes'},
    '18' : {'code':'SP','name':'San Pedro'}
  },
  'PE':{
    '1' : {'code':'AM','name':'Amazonas'},
    '2' : {'code':'AN','name':'Ancash'},
    '3' : {'code':'AP','name':'Apurimac'},
    '4' : {'code':'AR','name':'Arequipa'},
    '5' : {'code':'AY','name':'Ayacucho'},
    '6' : {'code':'CJ','name':'Cajamarca'},
    '7' : {'code':'CL','name':'Callao'},
    '8' : {'code':'CU','name':'Cusco'},
    '9' : {'code':'HV','name':'Huancavelica'},
    '10' : {'code':'HO','name':'Huanuco'},
    '11' : {'code':'IC','name':'Ica'},
    '12' : {'code':'JU','name':'Junin'},
    '13' : {'code':'LD','name':'La Libertad'},
    '14' : {'code':'LY','name':'Lambayeque'},
    '15' : {'code':'LI','name':'Lima'},
    '16' : {'code':'LO','name':'Loreto'},
    '17' : {'code':'MD','name':'Madre de Dios'},
    '18' : {'code':'MO','name':'Moquegua'},
    '19' : {'code':'PA','name':'Pasco'},
    '20' : {'code':'PI','name':'Piura'},
    '21' : {'code':'PU','name':'Puno'},
    '22' : {'code':'SM','name':'San Martin'},
    '23' : {'code':'TA','name':'Tacna'},
    '24' : {'code':'TU','name':'Tumbes'},
    '25' : {'code':'UC','name':'Ucayali'}
  },
  'PH':{
    '1' : {'code':'ABR','name':'Abra'},
    '2' : {'code':'ANO','name':'Agusan del Norte'},
    '3' : {'code':'ASU','name':'Agusan del Sur'},
    '4' : {'code':'AKL','name':'Aklan'},
    '5' : {'code':'ALB','name':'Albay'},
    '6' : {'code':'ANT','name':'Antique'},
    '7' : {'code':'APY','name':'Apayao'},
    '8' : {'code':'AUR','name':'Aurora'},
    '9' : {'code':'BAS','name':'Basilan'},
    '10' : {'code':'BTA','name':'Bataan'},
    '11' : {'code':'BTE','name':'Batanes'},
    '12' : {'code':'BTG','name':'Batangas'},
    '13' : {'code':'BLR','name':'Biliran'},
    '14' : {'code':'BEN','name':'Benguet'},
    '15' : {'code':'BOL','name':'Bohol'},
    '16' : {'code':'BUK','name':'Bukidnon'},
    '17' : {'code':'BUL','name':'Bulacan'},
    '18' : {'code':'CAG','name':'Cagayan'},
    '19' : {'code':'CNO','name':'Camarines Norte'},
    '20' : {'code':'CSU','name':'Camarines Sur'},
    '21' : {'code':'CAM','name':'Camiguin'},
    '22' : {'code':'CAP','name':'Capiz'},
    '23' : {'code':'CAT','name':'Catanduanes'},
    '24' : {'code':'CAV','name':'Cavite'},
    '25' : {'code':'CEB','name':'Cebu'},
    '26' : {'code':'CMP','name':'Compostela'},
    '27' : {'code':'DNO','name':'Davao del Norte'},
    '28' : {'code':'DSU','name':'Davao del Sur'},
    '29' : {'code':'DOR','name':'Davao Oriental'},
    '30' : {'code':'ESA','name':'Eastern Samar'},
    '31' : {'code':'GUI','name':'Guimaras'},
    '32' : {'code':'IFU','name':'Ifugao'},
    '33' : {'code':'INO','name':'Ilocos Norte'},
    '34' : {'code':'ISU','name':'Ilocos Sur'},
    '35' : {'code':'ILO','name':'Iloilo'},
    '36' : {'code':'ISA','name':'Isabela'},
    '37' : {'code':'KAL','name':'Kalinga'},
    '38' : {'code':'LAG','name':'Laguna'},
    '39' : {'code':'LNO','name':'Lanao del Norte'},
    '40' : {'code':'LSU','name':'Lanao del Sur'},
    '41' : {'code':'UNI','name':'La Union'},
    '42' : {'code':'LEY','name':'Leyte'},
    '43' : {'code':'MAG','name':'Maguindanao'},
    '44' : {'code':'MRN','name':'Marinduque'},
    '45' : {'code':'MSB','name':'Masbate'},
    '46' : {'code':'MIC','name':'Mindoro Occidental'},
    '47' : {'code':'MIR','name':'Mindoro Oriental'},
    '48' : {'code':'MSC','name':'Misamis Occidental'},
    '49' : {'code':'MOR','name':'Misamis Oriental'},
    '50' : {'code':'MOP','name':'Mountain'},
    '51' : {'code':'NOC','name':'Negros Occidental'},
    '52' : {'code':'NOR','name':'Negros Oriental'},
    '53' : {'code':'NCT','name':'North Cotabato'},
    '54' : {'code':'NSM','name':'Northern Samar'},
    '55' : {'code':'NEC','name':'Nueva Ecija'},
    '56' : {'code':'NVZ','name':'Nueva Vizcaya'},
    '57' : {'code':'PLW','name':'Palawan'},
    '58' : {'code':'PMP','name':'Pampanga'},
    '59' : {'code':'PNG','name':'Pangasinan'},
    '60' : {'code':'QZN','name':'Quezon'},
    '61' : {'code':'QRN','name':'Quirino'},
    '62' : {'code':'RIZ','name':'Rizal'},
    '63' : {'code':'ROM','name':'Romblon'},
    '64' : {'code':'SMR','name':'Samar'},
    '65' : {'code':'SRG','name':'Sarangani'},
    '66' : {'code':'SQJ','name':'Siquijor'},
    '67' : {'code':'SRS','name':'Sorsogon'},
    '68' : {'code':'SCO','name':'South Cotabato'},
    '69' : {'code':'SLE','name':'Southern Leyte'},
    '70' : {'code':'SKU','name':'Sultan Kudarat'},
    '71' : {'code':'SLU','name':'Sulu'},
    '72' : {'code':'SNO','name':'Surigao del Norte'},
    '73' : {'code':'SSU','name':'Surigao del Sur'},
    '74' : {'code':'TAR','name':'Tarlac'},
    '75' : {'code':'TAW','name':'Tawi-Tawi'},
    '76' : {'code':'ZBL','name':'Zambales'},
    '77' : {'code':'ZNO','name':'Zamboanga del Norte'},
    '78' : {'code':'ZSU','name':'Zamboanga del Sur'},
    '79' : {'code':'ZSI','name':'Zamboanga Sibugay'}
  },
  'PN':{
    '1' : {'code':'PIT','name':'Pitcairn Island'}
  },
  'PL':{
    '1': {'code':'DO','name':'Dolnośląskie'},
    '2' : {'code':'KP','name':'Kujawsko-Pomorskie'},
    '3': {'code':'LL','name':'Lubelskie'},
    '4': {'code':'LU','name':'Lubuskie'},
    '5': {'code':'LO','name':'Łódzkie'},
    '6': {'code':'ML','name':'Małopolskie'},
    '7' : {'code':'MZ','name':'Mazowieckie'},
    '8' : {'code':'OP','name':'Opolskie'},
    '9' : {'code':'PP','name':'Podkarpackie'},
    '10' : {'code':'PL','name':'Podlaskie'},
    '11' : {'code':'PM','name':'Pomorskie'},
    '12': {'code':'SL','name':'Śląskie'},
    '13': {'code':'SW','name':'Świętokrzyskie'},
    '14': {'code':'WM','name':'Warmińsko-Mazurskie'},
    '15' : {'code':'WP','name':'Wielkopolskie'},
    '16' : {'code':'ZA','name':'Zachodniopomorskie'}
  },
  'PT':{
    '1' : {'code':'AC','name':'Açores'},
    '2' : {'code':'AV','name':'Aveiro'},
    '3' : {'code':'BE','name':'Beja'},
    '4' : {'code':'BR','name':'Braga'},
    '5' : {'code':'BA','name':'Bragança'},
    '6' : {'code':'CB','name':'Castelo Branco'},
    '7' : {'code':'CO','name':'Coimbra'},
    '8' : {'code':'EV','name':'évora'},
    '9' : {'code':'FA','name':'Faro'},
    '10' : {'code':'GU','name':'Guarda'},
    '12' : {'code':'LE','name':'Leiria'},
    '13' : {'code':'LI','name':'Lisboa'},
    '14' : {'code':'ME','name':'Madeira'},
    '15' : {'code':'PO','name':'Portalegre'},
    '16' : {'code':'PR','name':'Porto'},
    '17' : {'code':'SA','name':'Santarém'},
    '18' : {'code':'SE','name':'SetÚbal'},
    '19' : {'code':'VC','name':'Viana do Castelo'},
    '20' : {'code':'VR','name':'Vila Real'},
    '21' : {'code':'VI','name':'Viseu'}
  },
  'PR':{
    '1' : {'code':'A-A','name':'Añasco'},
    '2' : {'code':'ADJ','name':'Adjuntas'},
    '3' : {'code':'AGU','name':'Aguada'},
    '4' : {'code':'AGU','name':'Aguadilla'},
    '5' : {'code':'AGU','name':'Aguas Buenas'},
    '6' : {'code':'AIB','name':'Aibonito'},
    '7' : {'code':'ARE','name':'Arecibo'},
    '8' : {'code':'ARR','name':'Arroyo'},
    '9' : {'code':'BAR','name':'Barceloneta'},
    '10' : {'code':'BAR','name':'Barranquitas'},
    '11' : {'code':'BAY','name':'Bayamón'},
    '12' : {'code':'CAB','name':'Cabo Rojo'},
    '13' : {'code':'CAG','name':'Caguas'},
    '14' : {'code':'CAM','name':'Camuy'},
    '15' : {'code':'CAN','name':'Canóvanas'},
    '16' : {'code':'CAR','name':'Carolina'},
    '17' : {'code':'CAT','name':'Cataño'},
    '18' : {'code':'CAY','name':'Cayey'},
    '19' : {'code':'CEI','name':'Ceiba'},
    '20' : {'code':'CIA','name':'Ciales'},
    '21' : {'code':'CID','name':'Cidra'},
    '22' : {'code':'COA','name':'Coamo'},
    '23' : {'code':'COM','name':'Comerío'},
    '24' : {'code':'COR','name':'Corozal'},
    '25' : {'code':'CUL','name':'Culebra'},
    '26' : {'code':'DOR','name':'Dorado'},
    '27' : {'code':'FAJ','name':'Fajardo'},
    '28' : {'code':'FLO','name':'Florida'},
    '29' : {'code':'GUA','name':'Guayama'},
    '30' : {'code':'GUA','name':'Guayanilla'},
    '31' : {'code':'GUA','name':'Guaynabo'},
    '32' : {'code':'GUR','name':'Gurabo'},
    '33' : {'code':'GU¡','name':'Guánica'},
    '34' : {'code':'HAT','name':'Hatillo'},
    '35' : {'code':'HOR','name':'Hormigueros'},
    '36' : {'code':'HUM','name':'Humacao'},
    '37' : {'code':'ISA','name':'Isabela'},
    '38' : {'code':'JAY','name':'Jayuya'},
    '39' : {'code':'JUA','name':'Juana Díaz'},
    '40' : {'code':'JUN','name':'Juncos'},
    '41' : {'code':'LAJ','name':'Lajas'},
    '42' : {'code':'LAR','name':'Lares'},
    '43' : {'code':'LAS','name':'Las Marías'},
    '44' : {'code':'LAS','name':'Las Piedras'},
    '45' : {'code':'LOÕ','name':'Loíza'},
    '46' : {'code':'LUQ','name':'Luquillo'},
    '47' : {'code':'MAN','name':'Manatí'},
    '48' : {'code':'MAR','name':'Maricao'},
    '49' : {'code':'MAU','name':'Maunabo'},
    '50' : {'code':'MAY','name':'Mayagüez'},
    '51' : {'code':'MOC','name':'Moca'},
    '52' : {'code':'MOR','name':'Morovis'},
    '53' : {'code':'NAG','name':'Naguabo'},
    '54' : {'code':'NAR','name':'Naranjito'},
    '55' : {'code':'ORO','name':'Orocovis'},
    '56' : {'code':'PAT','name':'Patillas'},
    '57' : {'code':'PE-','name':'Peñuelas'},
    '58' : {'code':'PON','name':'Ponce'},
    '59' : {'code':'QUE','name':'Quebradillas'},
    '60' : {'code':'RIN','name':'Rincón'},
    '61' : {'code':'RIO','name':'Rio Grande'},
    '62' : {'code':'SAB','name':'Sabana Grande'},
    '63' : {'code':'SAL','name':'Salinas'},
    '64' : {'code':'SAN','name':'San Germàn'},
    '65' : {'code':'SAN','name':'San Juan'},
    '66' : {'code':'SAN','name':'San Lorenzo'},
    '67' : {'code':'SAN','name':'San Sebastiàn'},
    '68' : {'code':'SAN','name':'Santa Isabel'},
    '69' : {'code':'TOA','name':'Toa Alta'},
    '70' : {'code':'TOA','name':'Toa Baja'},
    '71' : {'code':'TRU','name':'Trujillo Alto'},
    '72' : {'code':'UTU','name':'Utuado'},
    '73' : {'code':'VEG','name':'Vega Alta'},
    '74' : {'code':'VEG','name':'Vega Baja'},
    '75' : {'code':'VIE','name':'Vieques'},
    '76' : {'code':'VIL','name':'Villalba'},
    '77' : {'code':'YAB','name':'Yabucoa'},
    '78' : {'code':'YAU','name':'Yauco'}
  },
  'QA':{
    '1' : {'code':'DW','name':'Ad Dawhah'},
    '2' : {'code':'GW','name':'Al Ghuwayriyah'},
    '3' : {'code':'JM','name':'Al Jumayliyah'},
    '4' : {'code':'KR','name':'Al Khawr'},
    '5' : {'code':'WK','name':'Al Wakrah'},
    '6' : {'code':'RN','name':'Ar Rayyan'},
    '7' : {'code':'JB','name':'Jarayan al Batinah'},
    '8' : {'code':'MS','name':'Madinat ash Shamal'},
    '9' : {'code':'UD','name':'Umm Sa\'id'},
    '10' : {'code':'UL','name':'Umm Salal'}
  },
  'RO':{
    '1' : {'code':'AB','name':'Alba'},
    '2' : {'code':'AR','name':'Arad'},
    '3' : {'code':'AG','name':'Arges'},
    '4' : {'code':'BC','name':'Bacau'},
    '5' : {'code':'BH','name':'Bihor'},
    '6' : {'code':'BN','name':'Bistrita-Nasaud'},
    '7' : {'code':'BT','name':'Botosani'},
    '8' : {'code':'BV','name':'Brasov'},
    '9' : {'code':'BR','name':'Braila'},
    '10' : {'code':'B','name':'Bucuresti'},
    '11' : {'code':'BZ','name':'Buzau'},
    '12' : {'code':'CS','name':'Caras-Severin'},
    '13' : {'code':'CL','name':'Calarasi'},
    '14' : {'code':'CJ','name':'Cluj'},
    '15' : {'code':'CT','name':'Constanta'},
    '16' : {'code':'CV','name':'Covasna'},
    '17' : {'code':'DB','name':'Dimbovita'},
    '18' : {'code':'DJ','name':'Dolj'},
    '19' : {'code':'GL','name':'Galati'},
    '20' : {'code':'GR','name':'Giurgiu'},
    '21' : {'code':'GJ','name':'Gorj'},
    '22' : {'code':'HR','name':'Harghita'},
    '23' : {'code':'HD','name':'Hunedoara'},
    '24' : {'code':'IL','name':'Ialomita'},
    '25' : {'code':'IS','name':'Iasi'},
    '26' : {'code':'IF','name':'Ilfov'},
    '27' : {'code':'MM','name':'Maramures'},
    '28' : {'code':'MH','name':'Mehedinti'},
    '29' : {'code':'MS','name':'Mures'},
    '30' : {'code':'NT','name':'Neamt'},
    '31' : {'code':'OT','name':'Olt'},
    '32' : {'code':'PH','name':'Prahova'},
    '33' : {'code':'SM','name':'Satu-Mare'},
    '34' : {'code':'SJ','name':'Salaj'},
    '35' : {'code':'SB','name':'Sibiu'},
    '36' : {'code':'SV','name':'Suceava'},
    '37' : {'code':'TR','name':'Teleorman'},
    '38' : {'code':'TM','name':'Timis'},
    '39' : {'code':'TL','name':'Tulcea'},
    '40' : {'code':'VS','name':'Vaslui'},
    '41' : {'code':'VL','name':'Valcea'},
    '42' : {'code':'VN','name':'Vrancea'}
  },
  'RU':{
    '1' : {'code':'AB','name':'Abakan'},
    '2' : {'code':'AG','name':'Aginskoye'},
    '3' : {'code':'AN','name':'Anadyr'},
    '4' : {'code':'AR','name':'Arkahangelsk'},
    '5' : {'code':'AS','name':'Astrakhan'},
    '6' : {'code':'BA','name':'Barnaul'},
    '7' : {'code':'BE','name':'Belgorod'},
    '8' : {'code':'BI','name':'Birobidzhan'},
    '9' : {'code':'BL','name':'Blagoveshchensk'},
    '10' : {'code':'BR','name':'Bryansk'},
    '11' : {'code':'CH','name':'Cheboksary'},
    '12' : {'code':'CL','name':'Chelyabinsk'},
    '13' : {'code':'CR','name':'Cherkessk'},
    '14' : {'code':'CI','name':'Chita'},
    '15' : {'code':'DU','name':'Dudinka'},
    '16' : {'code':'EL','name':'Elista'},
    '17' : {'code':'GO','name':'Gomo-Altaysk'},
    '18' : {'code':'GA','name':'Gorno-Altaysk'},
    '19' : {'code':'GR','name':'Groznyy'},
    '20' : {'code':'IR','name':'Irkutsk'},
    '21' : {'code':'IV','name':'Ivanovo'},
    '22' : {'code':'IZ','name':'Izhevsk'},
    '23' : {'code':'KA','name':'Kalinigrad'},
    '24' : {'code':'KL','name':'Kaluga'},
    '25' : {'code':'KS','name':'Kasnodar'},
    '26' : {'code':'KZ','name':'Kazan'},
    '27' : {'code':'KE','name':'Kemerovo'},
    '28' : {'code':'KH','name':'Khabarovsk'},
    '29' : {'code':'KM','name':'Khanty-Mansiysk'},
    '30' : {'code':'KO','name':'Kostroma'},
    '31' : {'code':'KR','name':'Krasnodar'},
    '32' : {'code':'KN','name':'Krasnoyarsk'},
    '33' : {'code':'KU','name':'Kudymkar'},
    '34' : {'code':'KG','name':'Kurgan'},
    '35' : {'code':'KK','name':'Kursk'},
    '36' : {'code':'KY','name':'Kyzyl'},
    '37' : {'code':'LI','name':'Lipetsk'},
    '38' : {'code':'MA','name':'Magadan'},
    '39' : {'code':'MK','name':'Makhachkala'},
    '40' : {'code':'MY','name':'Maykop'},
    '41' : {'code':'MO','name':'Moscow'},
    '42' : {'code':'MU','name':'Murmansk'},
    '43' : {'code':'NA','name':'Nalchik'},
    '44' : {'code':'NR','name':'Naryan Mar'},
    '45' : {'code':'NZ','name':'Nazran'},
    '46' : {'code':'NI','name':'Nizhniy Novgorod'},
    '47' : {'code':'NO','name':'Novgorod'},
    '48' : {'code':'NV','name':'Novosibirsk'},
    '49' : {'code':'OM','name':'Omsk'},
    '50' : {'code':'OR','name':'Orel'},
    '51' : {'code':'OE','name':'Orenburg'},
    '52' : {'code':'PA','name':'Palana'},
    '53' : {'code':'PE','name':'Penza'},
    '54' : {'code':'PR','name':'Perm'},
    '55' : {'code':'PK','name':'Petropavlovsk-Kamchatskiy'},
    '56' : {'code':'PT','name':'Petrozavodsk'},
    '57' : {'code':'PS','name':'Pskov'},
    '58' : {'code':'RO','name':'Rostov-na-Donu'},
    '59' : {'code':'RY','name':'Ryazan'},
    '60' : {'code':'SL','name':'Salekhard'},
    '61' : {'code':'SA','name':'Samara'},
    '62' : {'code':'SR','name':'Saransk'},
    '63' : {'code':'SV','name':'Saratov'},
    '64' : {'code':'SM','name':'Smolensk'},
    '65' : {'code':'SP','name':'St. Petersburg'},
    '66' : {'code':'ST','name':'Stavropol'},
    '67' : {'code':'SY','name':'Syktyvkar'},
    '68' : {'code':'TA','name':'Tambov'},
    '69' : {'code':'TO','name':'Tomsk'},
    '70' : {'code':'TU','name':'Tula'},
    '71' : {'code':'TR','name':'Tura'},
    '72' : {'code':'TV','name':'Tver'},
    '73' : {'code':'TY','name':'Tyumen'},
    '74' : {'code':'UF','name':'Ufa'},
    '75' : {'code':'UL','name':'Ul\'yanovsk'},
    '76' : {'code':'UU','name':'Ulan-Ude'},
    '77' : {'code':'US','name':'Ust\'-Ordynskiy'},
    '78' : {'code':'VL','name':'Vladikavkaz'},
    '79' : {'code':'VA','name':'Vladimir'},
    '80' : {'code':'VV','name':'Vladivostok'},
    '81' : {'code':'VG','name':'Volgograd'},
    '82' : {'code':'VD','name':'Vologda'},
    '83' : {'code':'VO','name':'Voronezh'},
    '84' : {'code':'VY','name':'Vyatka'},
    '85' : {'code':'YA','name':'Yakutsk'},
    '86' : {'code':'YR','name':'Yaroslavl'},
    '87' : {'code':'YE','name':'Yekaterinburg'},
    '88' : {'code':'YO','name':'Yoshkar-Ola'}
  },
  'RW':{
    '1' : {'code':'BU','name':'Butare'},
    '2' : {'code':'BY','name':'Byumba'},
    '3' : {'code':'CY','name':'Cyangugu'},
    '4' : {'code':'GK','name':'Gikongoro'},
    '5' : {'code':'GS','name':'Gisenyi'},
    '6' : {'code':'GT','name':'Gitarama'},
    '7' : {'code':'KG','name':'Kibungo'},
    '8' : {'code':'KY','name':'Kibuye'},
    '9' : {'code':'KR','name':'Kigali Rurale'},
    '10' : {'code':'KV','name':'Kigali-ville'},
    '11' : {'code':'RU','name':'Ruhengeri'},
    '12' : {'code':'UM','name':'Umutara'}
  },
  'KN':{
    '1' : {'code':'CCN','name':'Christ Church Nichola Town'},
    '2' : {'code':'SAS','name':'Saint Anne Sandy Point'},
    '3' : {'code':'SGB','name':'Saint George Basseterre'},
    '4' : {'code':'SGG','name':'Saint George Gingerland'},
    '5' : {'code':'SJW','name':'Saint James Windward'},
    '6' : {'code':'SJC','name':'Saint John Capesterre'},
    '7' : {'code':'SJF','name':'Saint John Figtree'},
    '8' : {'code':'SMC','name':'Saint Mary Cayon'},
    '9' : {'code':'CAP','name':'Saint Paul Capesterre'},
    '10' : {'code':'CHA','name':'Saint Paul Charlestown'},
    '11' : {'code':'SPB','name':'Saint Peter Basseterre'},
    '12' : {'code':'STL','name':'Saint Thomas Lowland'},
    '13' : {'code':'STM','name':'Saint Thomas Middle Island'},
    '14' : {'code':'TPP','name':'Trinity Palmetto Point'}
  },
  'LC':{
    '1' : {'code':'AR','name':'Anse-la-Raye'},
    '2' : {'code':'CA','name':'Castries'},
    '3' : {'code':'CH','name':'Choiseul'},
    '4' : {'code':'DA','name':'Dauphin'},
    '5' : {'code':'DE','name':'Dennery'},
    '6' : {'code':'GI','name':'Gros-Islet'},
    '7' : {'code':'LA','name':'Laborie'},
    '8' : {'code':'MI','name':'Micoud'},
    '9' : {'code':'PR','name':'Praslin'},
    '10' : {'code':'SO','name':'Soufriere'},
    '11' : {'code':'VF','name':'Vieux-Fort'}
  },
  'VC':{
    '1' : {'code':'C','name':'Charlotte'},
    '2' : {'code':'R','name':'Grenadines'},
    '3' : {'code':'A','name':'Saint Andrew'},
    '4' : {'code':'D','name':'Saint David'},
    '5' : {'code':'G','name':'Saint George'},
    '6' : {'code':'P','name':'Saint Patrick'}
  },
  'WS':{
    '1' : {'code':'AN','name':'A\'ana'},
    '2' : {'code':'AI','name':'Aiga-i-le-Tai'},
    '3' : {'code':'AT','name':'Atua'},
    '4' : {'code':'FA','name':'Fa\'asaleleaga'},
    '5' : {'code':'GE','name':'Gaga\'emauga'},
    '6' : {'code':'GF','name':'Gagaifomauga'},
    '7' : {'code':'PA','name':'Palauli'},
    '8' : {'code':'SA','name':'Satupa\'itea'},
    '9' : {'code':'TU','name':'Tuamasaga'},
    '10' : {'code':'VF','name':'Va\'a-o-Fonoti'},
    '11' : {'code':'VS','name':'Vaisigano'}
  },
  'SM':{
    '1' : {'code':'AC','name':'Acquaviva'},
    '2' : {'code':'BM','name':'Borgo Maggiore'},
    '3' : {'code':'CH','name':'Chiesanuova'},
    '4' : {'code':'DO','name':'Domagnano'},
    '5' : {'code':'FA','name':'Faetano'},
    '6' : {'code':'FI','name':'Fiorentino'},
    '7' : {'code':'MO','name':'Montegiardino'},
    '8' : {'code':'SM','name':'Citta di San Marino'},
    '9' : {'code':'SE','name':'Serravalle'}
  },
  'ST':{
    '1' : {'code':'S','name':'Sao Tome'},
    '2' : {'code':'P','name':'Principe'}
  },
  'SA':{
    '1' : {'code':'BH','name':'Al Bahah'},
    '2' : {'code':'HS','name':'Al Hudud ash Shamaliyah'},
    '3' : {'code':'JF','name':'Al Jawf'},
    '4' : {'code':'MD','name':'Al Madinah'},
    '5' : {'code':'QS','name':'Al Qasim'},
    '6' : {'code':'RD','name':'Ar Riyad'},
    '7' : {'code':'AQ','name':'Ash Sharqiyah (Eastern)'},
    '8' : {'code':'AS','name':'\'Asir'},
    '9' : {'code':'HL','name':'Ha\'il'},
    '10' : {'code':'JZ','name':'Jizan'},
    '11' : {'code':'ML','name':'Makkah'},
    '12' : {'code':'NR','name':'Najran'},
    '13' : {'code':'TB','name':'Tabuk'}
  },
  'SN':{
    '1' : {'code':'DA','name':'Dakar'},
    '2' : {'code':'DI','name':'Diourbel'},
    '3' : {'code':'FA','name':'Fatick'},
    '4' : {'code':'KA','name':'Kaolack'},
    '5' : {'code':'KO','name':'Kolda'},
    '6' : {'code':'LO','name':'Louga'},
    '7' : {'code':'MA','name':'Matam'},
    '8' : {'code':'SL','name':'Saint-Louis'},
    '9' : {'code':'TA','name':'Tambacounda'},
    '10' : {'code':'TH','name':'Thies'},
    '11' : {'code':'ZI','name':'Ziguinchor'}
  },
  'SC':{
    '1' : {'code':'AP','name':'Anse aux Pins'},
    '2' : {'code':'AB','name':'Anse Boileau'},
    '3' : {'code':'AE','name':'Anse Etoile'},
    '4' : {'code':'AL','name':'Anse Louis'},
    '5' : {'code':'AR','name':'Anse Royale'},
    '6' : {'code':'BL','name':'Baie Lazare'},
    '7' : {'code':'BS','name':'Baie Sainte Anne'},
    '8' : {'code':'BV','name':'Beau Vallon'},
    '9' : {'code':'BA','name':'Bel Air'},
    '10' : {'code':'BO','name':'Bel Ombre'},
    '11' : {'code':'CA','name':'Cascade'},
    '12' : {'code':'GL','name':'Glacis'},
    '13' : {'code':'GM','name':'Grand\' Anse (on Mahe)'},
    '14' : {'code':'GP','name':'Grand\' Anse (on Praslin)'},
    '15' : {'code':'DG','name':'La Digue'},
    '16' : {'code':'RA','name':'La Riviere Anglaise'},
    '17' : {'code':'MB','name':'Mont Buxton'},
    '18' : {'code':'MF','name':'Mont Fleuri'},
    '19' : {'code':'PL','name':'Plaisance'},
    '20' : {'code':'PR','name':'Pointe La Rue'},
    '21' : {'code':'PG','name':'Port Glaud'},
    '22' : {'code':'SL','name':'Saint Louis'},
    '23' : {'code':'TA','name':'Takamaka'}
  },
  'SL':{
    '1' : {'code':'E','name':'Eastern'},
    '2' : {'code':'N','name':'Northern'},
    '3' : {'code':'S','name':'Southern'},
    '4' : {'code':'W','name':'Western'}
  },
  'SK':{
    '1' : {'code':'BA','name':'Banskobystricky'},
    '2' : {'code':'BR','name':'Bratislavsky'},
    '3' : {'code':'KO','name':'Kosicky'},
    '4' : {'code':'NI','name':'Nitriansky'},
    '5' : {'code':'PR','name':'Presovsky'},
    '6' : {'code':'TC','name':'Trenciansky'},
    '7' : {'code':'TV','name':'Trnavsky'},
    '8' : {'code':'ZI','name':'Zilinsky'}
  },
  'SI':{
    '1' : {'code':'4','name':'Štajerska'},
    '2' : {'code':'2A','name':'Gorenjska'},
    '3' : {'code':'5','name':'Prekmurje'},
    '4' : {'code':'3','name':'Koroška'},
    '5' : {'code':'2B','name':'Notranjska'},
    '6' : {'code':'1','name':'Primorska'},
    '7' : {'code':'2C','name':'Dolenjska'},
    '8' : {'code':'2C','name':'Bela Krajina'}
  },
  'SB':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'CH','name':'Choiseul'},
    '3' : {'code':'GC','name':'Guadalcanal'},
    '4' : {'code':'HO','name':'Honiara'},
    '5' : {'code':'IS','name':'Isabel'},
    '6' : {'code':'MK','name':'Makira'},
    '7' : {'code':'ML','name':'Malaita'},
    '8' : {'code':'RB','name':'Rennell and Bellona'},
    '9' : {'code':'TM','name':'Temotu'},
    '10' : {'code':'WE','name':'Western'}
  },
  'SO':{
    '1' : {'code':'AW','name':'Awdal'},
    '2' : {'code':'BK','name':'Bakool'},
    '3' : {'code':'BN','name':'Banaadir'},
    '4' : {'code':'BR','name':'Bari'},
    '5' : {'code':'BY','name':'Bay'},
    '6' : {'code':'GA','name':'Galguduud'},
    '7' : {'code':'GE','name':'Gedo'},
    '8' : {'code':'HI','name':'Hiiraan'},
    '9' : {'code':'JD','name':'Jubbada Dhexe'},
    '10' : {'code':'JH','name':'Jubbada Hoose'},
    '11' : {'code':'MU','name':'Mudug'},
    '12' : {'code':'NU','name':'Nugaal'},
    '13' : {'code':'SA','name':'Sanaag'},
    '14' : {'code':'SD','name':'Shabeellaha Dhexe'},
    '15' : {'code':'SH','name':'Shabeellaha Hoose'},
    '16' : {'code':'SL','name':'Sool'},
    '17' : {'code':'TO','name':'Togdheer'},
    '18' : {'code':'WG','name':'Woqooyi Galbeed'}
  },
  'ZA':{
    '1' : {'code':'EC','name':'Eastern Cape'},
    '2' : {'code':'FS','name':'Free State'},
    '3' : {'code':'GT','name':'Gauteng'},
    '4' : {'code':'KN','name':'KwaZulu-Natal'},
    '5' : {'code':'LP','name':'Limpopo'},
    '6' : {'code':'MP','name':'Mpumalanga'},
    '7' : {'code':'NW','name':'North West'},
    '8' : {'code':'NC','name':'Northern Cape'},
    '9' : {'code':'WC','name':'Western Cape'}
  },
  'ES':{
    '1' : {'code':'CA','name':'La Coruña'},
    '2' : {'code':'AL','name':'Álava'},
    '3' : {'code':'AB','name':'Albacete'},
    '4' : {'code':'AC','name':'Alicante'},
    '5' : {'code':'AM','name':'Almeria'},
    '6' : {'code':'AS','name':'Asturias'},
    '7' : {'code':'AV','name':'Ávila'},
    '8' : {'code':'BJ','name':'Badajoz'},
    '9' : {'code':'IB','name':'Baleares'},
    '10' : {'code':'BA','name':'Barcelona'},
    '11' : {'code':'BU','name':'Burgos'},
    '12' : {'code':'CC','name':'Cáceres'},
    '13' : {'code':'CZ','name':'Cádiz'},
    '14' : {'code':'CT','name':'Cantabria'},
    '15' : {'code':'CL','name':'Castellón'},
    '16' : {'code':'CE','name':'Ceuta'},
    '17' : {'code':'CR','name':'Ciudad Real'},
    '18' : {'code':'CD','name':'Córdoba'},
    '19' : {'code':'CU','name':'Cuenca'},
    '20' : {'code':'GI','name':'Gerona'},
    '21' : {'code':'GD','name':'Granada'},
    '22' : {'code':'GJ','name':'Guadalajara'},
    '23' : {'code':'GP','name':'Guipúzcoa'},
    '24' : {'code':'HL','name':'Huelva'},
    '25' : {'code':'HS','name':'Huesca'},
    '26' : {'code':'JN','name':'Jaén'},
    '27' : {'code':'RJ','name':'La Rioja'},
    '28' : {'code':'PM','name':'Las Palmas'},
    '29' : {'code':'LE','name':'León'},
    '30' : {'code':'LL','name':'Lérida'},
    '31' : {'code':'LG','name':'Lugo'},
    '32' : {'code':'MD','name':'Madrid'},
    '33' : {'code':'MA','name':'Málaga'},
    '34' : {'code':'ML','name':'Melilla'},
    '35' : {'code':'MU','name':'Murcia'},
    '36' : {'code':'NV','name':'Navarra'},
    '37' : {'code':'OU','name':'Ourense'},
    '38' : {'code':'PL','name':'Palencia'},
    '39' : {'code':'PO','name':'Pontevedra'},
    '40' : {'code':'SL','name':'Salamanca'},
    '41' : {'code':'SC','name':'Santa Cruz de Tenerife'},
    '42' : {'code':'SG','name':'Segovia'},
    '43' : {'code':'SV','name':'Sevilla'},
    '44' : {'code':'SO','name':'Soria'},
    '45' : {'code':'TA','name':'Tarragona'},
    '46' : {'code':'TE','name':'Teruel'},
    '47' : {'code':'TO','name':'Toledo'},
    '48' : {'code':'VC','name':'Valencia'},
    '49' : {'code':'VD','name':'Valladolid'},
    '50' : {'code':'VZ','name':'Vizcaya'},
    '51' : {'code':'ZM','name':'Zamora'},
    '52' : {'code':'ZR','name':'Zaragoza'}
  },
  'LK':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'EA','name':'Eastern'},
    '3' : {'code':'NC','name':'North Central'},
    '4' : {'code':'NO','name':'Northern'},
    '5' : {'code':'NW','name':'North Western'},
    '6' : {'code':'SA','name':'Sabaragamuwa'},
    '7' : {'code':'SO','name':'Southern'},
    '8' : {'code':'UV','name':'Uva'},
    '9' : {'code':'WE','name':'Western'}
  },
  'SH':{
    '1' : {'code':'A','name':'Ascension'},
    '2' : {'code':'S','name':'Saint Helena'},
    '3' : {'code':'T','name':'Tristan da Cunha'}
  },
  'PM':{
    '1' : {'code':'P','name':'Saint Pierre'},
    '2' : {'code':'M','name':'Miquelon'}
  },
  'SD':{
    '1' : {'code':'ANL','name':'A\'ali an Nil'},
    '2' : {'code':'BAM','name':'Al Bahr al Ahmar'},
    '3' : {'code':'BRT','name':'Al Buhayrat'},
    '4' : {'code':'JZR','name':'Al Jazirah'},
    '5' : {'code':'KRT','name':'Al Khartum'},
    '6' : {'code':'QDR','name':'Al Qadarif'},
    '7' : {'code':'WDH','name':'Al Wahdah'},
    '8' : {'code':'ANB','name':'An Nil al Abyad'},
    '9' : {'code':'ANZ','name':'An Nil al Azraq'},
    '10' : {'code':'ASH','name':'Ash Shamaliyah'},
    '11' : {'code':'BJA','name':'Bahr al Jabal'},
    '12' : {'code':'GIS','name':'Gharb al Istiwa\'iyah'},
    '13' : {'code':'GBG','name':'Gharb Bahr al Ghazal'},
    '14' : {'code':'GDA','name':'Gharb Darfur'},
    '15' : {'code':'GKU','name':'Gharb Kurdufan'},
    '16' : {'code':'JDA','name':'Janub Darfur'},
    '17' : {'code':'JKU','name':'Janub Kurdufan'},
    '18' : {'code':'JQL','name':'Junqali'},
    '19' : {'code':'KSL','name':'Kassala'},
    '20' : {'code':'NNL','name':'Nahr an Nil'},
    '21' : {'code':'SBG','name':'Shamal Bahr al Ghazal'},
    '22' : {'code':'SDA','name':'Shamal Darfur'},
    '23' : {'code':'SKU','name':'Shamal Kurdufan'},
    '24' : {'code':'SIS','name':'Sharq al Istiwa\'iyah'},
    '25' : {'code':'SNR','name':'Sinnar'},
    '26' : {'code':'WRB','name':'Warab'}
  },
  'SR':{
    '1' : {'code':'BR','name':'Brokopondo'},
    '2' : {'code':'CM','name':'Commewijne'},
    '3' : {'code':'CR','name':'Coronie'},
    '4' : {'code':'MA','name':'Marowijne'},
    '5' : {'code':'NI','name':'Nickerie'},
    '6' : {'code':'PA','name':'Para'},
    '7' : {'code':'PM','name':'Paramaribo'},
    '9' : {'code':'SA','name':'Saramacca'},
    '10' : {'code':'SI','name':'Sipaliwini'},
    '11' : {'code':'WA','name':'Wanica'}
  },
  'SZ':{
    '1' : {'code':'H','name':'Hhohho'},
    '2' : {'code':'L','name':'Lubombo'},
    '3' : {'code':'M','name':'Manzini'},
    '4' : {'code':'S','name':'Shishelweni'}
  },
  'SE':{
    '1' : {'code':'K','name':'Blekinge'},
    '2' : {'code':'W','name':'Dalama'},
    '3' : {'code':'I','name':'Gotland'},
    '4' : {'code':'X','name':'Gävleborg'},
    '5' : {'code':'N','name':'Halland'},
    '6' : {'code':'Z','name':'Jämtland'},
    '7' : {'code':'F','name':'Jönköping'},
    '8' : {'code':'H','name':'Kalmar'},
    '9' : {'code':'G','name':'Kronoberg'},
    '10' : {'code':'BD','name':'Norrbotten'},
    '11' : {'code':'M','name':'Skåne'},
    '12' : {'code':'AB','name':'Stockholm'},
    '13' : {'code':'D','name':'Södermanland'},
    '14' : {'code':'C','name':'Uppsala'},
    '15' : {'code':'S','name':'Värmland'},
    '16' : {'code':'AC','name':'Västerbotten'},
    '17' : {'code':'Y','name':'Västernorrland'},
    '18' : {'code':'U','name':'Västmanland'},
    '19' : {'code':'O','name':'Västra Götaland'},
    '20' : {'code':'T','name':'Örebro'},
    '21' : {'code':'E','name':'Östergötland'}
  },
  'CH':{
    '1' : {'code':'AG','name':'Aargau'},
    '2' : {'code':'AR','name':'Appenzell Ausserrhoden'},
    '3' : {'code':'AI','name':'Appenzell Innerrhoden'},
    '4' : {'code':'BS','name':'Basel-Stadt'},
    '5' : {'code':'BL','name':'Basel-Landschaft'},
    '6' : {'code':'BE','name':'Bern'},
    '7' : {'code':'FR','name':'Fribourg'},
    '8' : {'code':'GE','name':'Genève'},
    '9' : {'code':'GL','name':'Glarus'},
    '10' : {'code':'GR','name':'Graubünden'},
    '11' : {'code':'JU','name':'Jura'},
    '12' : {'code':'LU','name':'Lucerne'},
    '13' : {'code':'NE','name':'Neuchâtel'},
    '14' : {'code':'NW','name':'Nidwalden'},
    '15' : {'code':'OW','name':'Obwalden'},
    '16' : {'code':'SG','name':'St. Gallen'},
    '17' : {'code':'SH','name':'Schaffhausen'},
    '18' : {'code':'SZ','name':'Schwyz'},
    '19' : {'code':'SO','name':'Solothurn'},
    '20' : {'code':'TG','name':'Thurgau'},
    '21' : {'code':'TI','name':'Ticino'},
    '22' : {'code':'UR','name':'Uri'},
    '23' : {'code':'VS','name':'Valais'},
    '24' : {'code':'VD','name':'Vaud'},
    '25' : {'code':'ZG','name':'Zug'},
    '26' : {'code':'ZH','name':'Zürich'}
  },
  'SY':{
    '1' : {'code':'HA','name':'Al Hasakah'},
    '2' : {'code':'LA','name':'Al Ladhiqiyah'},
    '3' : {'code':'QU','name':'Al Qunaytirah'},
    '4' : {'code':'RQ','name':'Ar Raqqah'},
    '5' : {'code':'SU','name':'As Suwayda'},
    '6' : {'code':'DA','name':'Dara'},
    '7' : {'code':'DZ','name':'Dayr az Zawr'},
    '8' : {'code':'DI','name':'Dimashq'},
    '9' : {'code':'HL','name':'Halab'},
    '10' : {'code':'HM','name':'Hamah'},
    '11' : {'code':'HI','name':'Hims'},
    '12' : {'code':'ID','name':'Idlib'},
    '13' : {'code':'RD','name':'Rif Dimashq'},
    '14' : {'code':'TA','name':'Tartus'}
  },
  'TW':{
    '1' : {'code':'CH','name':'Chang-hua'},
    '2' : {'code':'CI','name':'Chia-i'},
    '3' : {'code':'HS','name':'Hsin-chu'},
    '4' : {'code':'HL','name':'Hua-lien'},
    '5' : {'code':'IL','name':'I-lan'},
    '6' : {'code':'KH','name':'Kao-hsiung county'},
    '7' : {'code':'KM','name':'Kin-men'},
    '8' : {'code':'LC','name':'Lien-chiang'},
    '9' : {'code':'ML','name':'Miao-li'},
    '10' : {'code':'NT','name':'Nan-t\'ou'},
    '11' : {'code':'PH','name':'P\'eng-hu'},
    '12' : {'code':'PT','name':'P\'ing-tung'},
    '13' : {'code':'TG','name':'T\'ai-chung'},
    '14' : {'code':'TA','name':'T\'ai-nan'},
    '15' : {'code':'TP','name':'T\'ai-pei county'},
    '16' : {'code':'TT','name':'T\'ai-tung'},
    '17' : {'code':'TY','name':'T\'ao-yuan'},
    '18' : {'code':'YL','name':'Yun-lin'},
    '19' : {'code':'CC','name':'Chia-i city'},
    '20' : {'code':'CL','name':'Chi-lung'},
    '21' : {'code':'HC','name':'Hsin-chu'},
    '22' : {'code':'TH','name':'T\'ai-chung'},
    '23' : {'code':'TN','name':'T\'ai-nan'},
    '24' : {'code':'KC','name':'Kao-hsiung city'},
    '25' : {'code':'TC','name':'T\'ai-pei city'}
  },
  'TJ':{
    '1' : {'code':'GB','name':'Gorno-Badakhstan'},
    '2' : {'code':'KT','name':'Khatlon'},
    '3' : {'code':'SU','name':'Sughd'}
  },
  'TZ':{
    '1' : {'code':'AR','name':'Arusha'},
    '2' : {'code':'DS','name':'Dar es Salaam'},
    '3' : {'code':'DO','name':'Dodoma'},
    '4' : {'code':'IR','name':'Iringa'},
    '5' : {'code':'KA','name':'Kagera'},
    '6' : {'code':'KI','name':'Kigoma'},
    '7' : {'code':'KJ','name':'Kilimanjaro'},
    '8' : {'code':'LN','name':'Lindi'},
    '9' : {'code':'MY','name':'Manyara'},
    '10' : {'code':'MR','name':'Mara'},
    '11' : {'code':'MB','name':'Mbeya'},
    '12' : {'code':'MO','name':'Morogoro'},
    '13' : {'code':'MT','name':'Mtwara'},
    '14' : {'code':'MW','name':'Mwanza'},
    '15' : {'code':'PN','name':'Pemba North'},
    '16' : {'code':'PS','name':'Pemba South'},
    '17' : {'code':'PW','name':'Pwani'},
    '18' : {'code':'RK','name':'Rukwa'},
    '19' : {'code':'RV','name':'Ruvuma'},
    '20' : {'code':'SH','name':'Shinyanga'},
    '21' : {'code':'SI','name':'Singida'},
    '22' : {'code':'TB','name':'Tabora'},
    '23' : {'code':'TN','name':'Tanga'},
    '24' : {'code':'ZC','name':'Zanzibar Central/South'},
    '25' : {'code':'ZN','name':'Zanzibar North'},
    '26' : {'code':'ZU','name':'Zanzibar Urban/West'}
  },
  'TH':{
    '1' : {'code':'Amnat Charoen','name':'Amnat Charoen'},
    '2' : {'code':'Ang Thong','name':'Ang Thong'},
    '3' : {'code':'Ayutthaya','name':'Ayutthaya'},
    '4' : {'code':'Bangkok','name':'Bangkok'},
    '5' : {'code':'Buriram','name':'Buriram'},
    '6' : {'code':'Chachoengsao','name':'Chachoengsao'},
    '7' : {'code':'Chai Nat','name':'Chai Nat'},
    '8' : {'code':'Chaiyaphum','name':'Chaiyaphum'},
    '9' : {'code':'Chanthaburi','name':'Chanthaburi'},
    '10' : {'code':'Chiang Mai','name':'Chiang Mai'},
    '11' : {'code':'Chiang Rai','name':'Chiang Rai'},
    '12' : {'code':'Chon Buri','name':'Chon Buri'},
    '13' : {'code':'Chumphon','name':'Chumphon'},
    '14' : {'code':'Kalasin','name':'Kalasin'},
    '15' : {'code':'Kamphaeng Phet','name':'Kamphaeng Phet'},
    '16' : {'code':'Kanchanaburi','name':'Kanchanaburi'},
    '17' : {'code':'Khon Kaen','name':'Khon Kaen'},
    '18' : {'code':'Krabi','name':'Krabi'},
    '19' : {'code':'Lampang','name':'Lampang'},
    '20' : {'code':'Lamphun','name':'Lamphun'},
    '21' : {'code':'Loei','name':'Loei'},
    '22' : {'code':'Lop Buri','name':'Lop Buri'},
    '23' : {'code':'Mae Hong Son','name':'Mae Hong Son'},
    '24' : {'code':'Maha Sarakham','name':'Maha Sarakham'},
    '25' : {'code':'Mukdahan','name':'Mukdahan'},
    '26' : {'code':'Nakhon Nayok','name':'Nakhon Nayok'},
    '27' : {'code':'Nakhon Pathom','name':'Nakhon Pathom'},
    '28' : {'code':'Nakhon Phanom','name':'Nakhon Phanom'},
    '29' : {'code':'Nakhon Ratchasima','name':'Nakhon Ratchasima'},
    '30' : {'code':'Nakhon Sawan','name':'Nakhon Sawan'},
    '31' : {'code':'Nakhon Si Thammarat','name':'Nakhon Si Thammarat'},
    '32' : {'code':'Nan','name':'Nan'},
    '33' : {'code':'Narathiwat','name':'Narathiwat'},
    '34' : {'code':'Nong Bua Lamphu','name':'Nong Bua Lamphu'},
    '35' : {'code':'Nong Khai','name':'Nong Khai'},
    '36' : {'code':'Nonthaburi','name':'Nonthaburi'},
    '37' : {'code':'Pathum Thani','name':'Pathum Thani'},
    '38' : {'code':'Pattani','name':'Pattani'},
    '39' : {'code':'Phangnga','name':'Phangnga'},
    '40' : {'code':'Phatthalung','name':'Phatthalung'},
    '41' : {'code':'Phayao','name':'Phayao'},
    '42' : {'code':'Phetchabun','name':'Phetchabun'},
    '43' : {'code':'Phetchaburi','name':'Phetchaburi'},
    '44' : {'code':'Phichit','name':'Phichit'},
    '45' : {'code':'Phitsanulok','name':'Phitsanulok'},
    '46' : {'code':'Phrae','name':'Phrae'},
    '47' : {'code':'Phuket','name':'Phuket'},
    '48' : {'code':'Prachin Buri','name':'Prachin Buri'},
    '49' : {'code':'Prachuap Khiri Khan','name':'Prachuap Khiri Khan'},
    '50' : {'code':'Ranong','name':'Ranong'},
    '51' : {'code':'Ratchaburi','name':'Ratchaburi'},
    '52' : {'code':'Rayong','name':'Rayong'},
    '53' : {'code':'Roi Et','name':'Roi Et'},
    '54' : {'code':'Sa Kaeo','name':'Sa Kaeo'},
    '55' : {'code':'Sakon Nakhon','name':'Sakon Nakhon'},
    '56' : {'code':'Samut Prakan','name':'Samut Prakan'},
    '57' : {'code':'Samut Sakhon','name':'Samut Sakhon'},
    '58' : {'code':'Samut Songkhram','name':'Samut Songkhram'},
    '59' : {'code':'Sara Buri','name':'Sara Buri'},
    '60' : {'code':'Satun','name':'Satun'},
    '61' : {'code':'Sing Buri','name':'Sing Buri'},
    '62' : {'code':'Sisaket','name':'Sisaket'},
    '63' : {'code':'Songkhla','name':'Songkhla'},
    '64' : {'code':'Sukhothai','name':'Sukhothai'},
    '65' : {'code':'Suphan Buri','name':'Suphan Buri'},
    '66' : {'code':'Surat Thani','name':'Surat Thani'},
    '67' : {'code':'Surin','name':'Surin'},
    '68' : {'code':'Tak','name':'Tak'},
    '69' : {'code':'Trang','name':'Trang'},
    '70' : {'code':'Trat','name':'Trat'},
    '71' : {'code':'Ubon Ratchathani','name':'Ubon Ratchathani'},
    '72' : {'code':'Udon Thani','name':'Udon Thani'},
    '73' : {'code':'Uthai Thani','name':'Uthai Thani'},
    '74' : {'code':'Uttaradit','name':'Uttaradit'},
    '75' : {'code':'Yala','name':'Yala'},
    '76' : {'code':'Yasothon','name':'Yasothon'}
  },
  'TG':{
    '1' : {'code':'K','name':'Kara'},
    '2' : {'code':'P','name':'Plateaux'},
    '3' : {'code':'S','name':'Savanes'},
    '4' : {'code':'C','name':'Centrale'},
    '5' : {'code':'M','name':'Maritime'}
  },
  'TK':{
    '1' : {'code':'A','name':'Atafu'},
    '2' : {'code':'F','name':'Fakaofo'},
    '3' : {'code':'N','name':'Nukunonu'}
  },
  'TO':{
    '1' : {'code':'H','name':'Ha\'apai'},
    '2' : {'code':'T','name':'Tongatapu'},
    '3' : {'code':'V','name':'Vava\'u'}
  },
  'TT':{
    '1' : {'code':'CT','name':'Couva/Tabaquite/Talparo'},
    '2' : {'code':'DM','name':'Diego Martin'},
    '3' : {'code':'MR','name':'Mayaro/Rio Claro'},
    '4' : {'code':'PD','name':'Penal/Debe'},
    '5' : {'code':'PT','name':'Princes Town'},
    '6' : {'code':'SG','name':'Sangre Grande'},
    '7' : {'code':'SL','name':'San Juan/Laventille'},
    '8' : {'code':'SI','name':'Siparia'},
    '9' : {'code':'TP','name':'Tunapuna/Piarco'},
    '10' : {'code':'PS','name':'Port of Spain'},
    '11' : {'code':'SF','name':'San Fernando'},
    '12' : {'code':'AR','name':'Arima'},
    '13' : {'code':'PF','name':'Point Fortin'},
    '14' : {'code':'CH','name':'Chaguanas'},
    '15' : {'code':'TO','name':'Tobago'}
  },
  'TN':{
    '1' : {'code':'AR','name':'Ariana'},
    '2' : {'code':'BJ','name':'Beja'},
    '3' : {'code':'BA','name':'Ben Arous'},
    '4' : {'code':'BI','name':'Bizerte'},
    '5' : {'code':'GB','name':'Gabes'},
    '6' : {'code':'GF','name':'Gafsa'},
    '7' : {'code':'JE','name':'Jendouba'},
    '8' : {'code':'KR','name':'Kairouan'},
    '9' : {'code':'KS','name':'Kasserine'},
    '10' : {'code':'KB','name':'Kebili'},
    '11' : {'code':'KF','name':'Kef'},
    '12' : {'code':'MH','name':'Mahdia'},
    '13' : {'code':'MN','name':'Manouba'},
    '14' : {'code':'ME','name':'Medenine'},
    '15' : {'code':'MO','name':'Monastir'},
    '16' : {'code':'NA','name':'Nabeul'},
    '17' : {'code':'SF','name':'Sfax'},
    '18' : {'code':'SD','name':'Sidi'},
    '19' : {'code':'SL','name':'Siliana'},
    '20' : {'code':'SO','name':'Sousse'},
    '21' : {'code':'TA','name':'Tataouine'},
    '22' : {'code':'TO','name':'Tozeur'},
    '23' : {'code':'TU','name':'Tunis'},
    '24' : {'code':'ZA','name':'Zaghouan'}
  },
  'TR':{
    '1' : {'code':'ADA','name':'Adana'},
    '2' : {'code':'ADI','name':'Adiyaman'},
    '3' : {'code':'AFY','name':'Afyonkarahisar'},
    '4' : {'code':'AGR','name':'Agri'},
    '5' : {'code':'AKS','name':'Aksaray'},
    '6' : {'code':'AMA','name':'Amasya'},
    '7' : {'code':'ANK','name':'Ankara'},
    '8' : {'code':'ANT','name':'Antalya'},
    '9' : {'code':'ARD','name':'Ardahan'},
    '10' : {'code':'ART','name':'Artvin'},
    '11' : {'code':'AYI','name':'Aydin'},
    '12' : {'code':'BAL','name':'Balikesir'},
    '13' : {'code':'BAR','name':'Bartin'},
    '14' : {'code':'BAT','name':'Batman'},
    '15' : {'code':'BAY','name':'Bayburt'},
    '16' : {'code':'BIL','name':'Bilecik'},
    '17' : {'code':'BIN','name':'Bingol'},
    '18' : {'code':'BIT','name':'Bitlis'},
    '19' : {'code':'BOL','name':'Bolu'},
    '20' : {'code':'BRD','name':'Burdur'},
    '21' : {'code':'BRS','name':'Bursa'},
    '22' : {'code':'CKL','name':'Canakkale'},
    '23' : {'code':'CKR','name':'Cankiri'},
    '24' : {'code':'COR','name':'Corum'},
    '25' : {'code':'DEN','name':'Denizli'},
    '26' : {'code':'DIY','name':'Diyarbakir'},
    '27' : {'code':'DUZ','name':'Duzce'},
    '28' : {'code':'EDI','name':'Edirne'},
    '29' : {'code':'ELA','name':'Elazig'},
    '30' : {'code':'EZC','name':'Erzincan'},
    '31' : {'code':'EZR','name':'Erzurum'},
    '32' : {'code':'ESK','name':'Eskisehir'},
    '33' : {'code':'GAZ','name':'Gaziantep'},
    '34' : {'code':'GIR','name':'Giresun'},
    '35' : {'code':'GMS','name':'Gumushane'},
    '36' : {'code':'HKR','name':'Hakkari'},
    '37' : {'code':'HTY','name':'Hatay'},
    '38' : {'code':'IGD','name':'Igdir'},
    '39' : {'code':'ISP','name':'Isparta'},
    '40' : {'code':'IST','name':'Istanbul'},
    '41' : {'code':'IZM','name':'Izmir'},
    '42' : {'code':'KAH','name':'Kahramanmaras'},
    '43' : {'code':'KRB','name':'Karabuk'},
    '44' : {'code':'KRM','name':'Karaman'},
    '45' : {'code':'KRS','name':'Kars'},
    '46' : {'code':'KAS','name':'Kastamonu'},
    '47' : {'code':'KAY','name':'Kayseri'},
    '48' : {'code':'KLS','name':'Kilis'},
    '49' : {'code':'KRK','name':'Kirikkale'},
    '50' : {'code':'KLR','name':'Kirklareli'},
    '51' : {'code':'KRH','name':'Kirsehir'},
    '52' : {'code':'KOC','name':'Kocaeli'},
    '53' : {'code':'KON','name':'Konya'},
    '54' : {'code':'KUT','name':'Kutahya'},
    '55' : {'code':'MAL','name':'Malatya'},
    '56' : {'code':'MAN','name':'Manisa'},
    '57' : {'code':'MAR','name':'Mardin'},
    '58' : {'code':'MER','name':'Mersin'},
    '59' : {'code':'MUG','name':'Mugla'},
    '60' : {'code':'MUS','name':'Mus'},
    '61' : {'code':'NEV','name':'Nevsehir'},
    '62' : {'code':'NIG','name':'Nigde'},
    '63' : {'code':'ORD','name':'Ordu'},
    '64' : {'code':'OSM','name':'Osmaniye'},
    '65' : {'code':'RIZ','name':'Rize'},
    '66' : {'code':'SAK','name':'Sakarya'},
    '67' : {'code':'SAM','name':'Samsun'},
    '68' : {'code':'SAN','name':'Sanliurfa'},
    '69' : {'code':'SII','name':'Siirt'},
    '70' : {'code':'SIN','name':'Sinop'},
    '71' : {'code':'SIR','name':'Sirnak'},
    '72' : {'code':'SIV','name':'Sivas'},
    '73' : {'code':'TEL','name':'Tekirdag'},
    '74' : {'code':'TOK','name':'Tokat'},
    '75' : {'code':'TRA','name':'Trabzon'},
    '76' : {'code':'TUN','name':'Tunceli'},
    '77' : {'code':'USK','name':'Usak'},
    '78' : {'code':'VAN','name':'Van'},
    '79' : {'code':'YAL','name':'Yalova'},
    '80' : {'code':'YOZ','name':'Yozgat'},
    '81' : {'code':'ZON','name':'Zonguldak'}
  },
  'TM':{
    '1' : {'code':'A','name':'Ahal Welayaty'},
    '2' : {'code':'B','name':'Balkan Welayaty'},
    '3' : {'code':'D','name':'Dashhowuz Welayaty'},
    '4' : {'code':'L','name':'Lebap Welayaty'},
    '5' : {'code':'M','name':'Mary Welayaty'}
  },
  'TC':{
    '1' : {'code':'AC','name':'Ambergris Cays'},
    '2' : {'code':'DC','name':'Dellis Cay'},
    '3' : {'code':'FC','name':'French Cay'},
    '4' : {'code':'LW','name':'Little Water Cay'},
    '5' : {'code':'RC','name':'Parrot Cay'},
    '6' : {'code':'PN','name':'Pine Cay'},
    '7' : {'code':'SL','name':'Salt Cay'},
    '8' : {'code':'GT','name':'Grand Turk'},
    '9' : {'code':'SC','name':'South Caicos'},
    '10' : {'code':'EC','name':'East Caicos'},
    '11' : {'code':'MC','name':'Middle Caicos'},
    '12' : {'code':'NC','name':'North Caicos'},
    '13' : {'code':'PR','name':'Providenciales'},
    '14' : {'code':'WC','name':'West Caicos'}
  },
  'TV':{
    '1' : {'code':'NMG','name':'Nanumanga'},
    '2' : {'code':'NLK','name':'Niulakita'},
    '3' : {'code':'NTO','name':'Niutao'},
    '4' : {'code':'FUN','name':'Funafuti'},
    '5' : {'code':'NME','name':'Nanumea'},
    '6' : {'code':'NUI','name':'Nui'},
    '7' : {'code':'NFT','name':'Nukufetau'},
    '8' : {'code':'NLL','name':'Nukulaelae'},
    '9' : {'code':'VAI','name':'Vaitupu'}
  },
  'UG':{
    '1' : {'code':'KAL','name':'Kalangala'},
    '2' : {'code':'KMP','name':'Kampala'},
    '3' : {'code':'KAY','name':'Kayunga'},
    '4' : {'code':'KIB','name':'Kiboga'},
    '5' : {'code':'LUW','name':'Luwero'},
    '6' : {'code':'MAS','name':'Masaka'},
    '7' : {'code':'MPI','name':'Mpigi'},
    '8' : {'code':'MUB','name':'Mubende'},
    '9' : {'code':'MUK','name':'Mukono'},
    '10' : {'code':'NKS','name':'Nakasongola'},
    '11' : {'code':'RAK','name':'Rakai'},
    '12' : {'code':'SEM','name':'Sembabule'},
    '13' : {'code':'WAK','name':'Wakiso'},
    '14' : {'code':'BUG','name':'Bugiri'},
    '15' : {'code':'BUS','name':'Busia'},
    '16' : {'code':'IGA','name':'Iganga'},
    '17' : {'code':'JIN','name':'Jinja'},
    '18' : {'code':'KAB','name':'Kaberamaido'},
    '19' : {'code':'KML','name':'Kamuli'},
    '20' : {'code':'KPC','name':'Kapchorwa'},
    '21' : {'code':'KTK','name':'Katakwi'},
    '22' : {'code':'KUM','name':'Kumi'},
    '23' : {'code':'MAY','name':'Mayuge'},
    '24' : {'code':'MBA','name':'Mbale'},
    '25' : {'code':'PAL','name':'Pallisa'},
    '26' : {'code':'SIR','name':'Sironko'},
    '27' : {'code':'SOR','name':'Soroti'},
    '28' : {'code':'TOR','name':'Tororo'},
    '29' : {'code':'ADJ','name':'Adjumani'},
    '30' : {'code':'APC','name':'Apac'},
    '31' : {'code':'ARU','name':'Arua'},
    '32' : {'code':'GUL','name':'Gulu'},
    '33' : {'code':'KIT','name':'Kitgum'},
    '34' : {'code':'KOT','name':'Kotido'},
    '35' : {'code':'LIR','name':'Lira'},
    '36' : {'code':'MRT','name':'Moroto'},
    '37' : {'code':'MOY','name':'Moyo'},
    '38' : {'code':'NAK','name':'Nakapiripirit'},
    '39' : {'code':'NEB','name':'Nebbi'},
    '40' : {'code':'PAD','name':'Pader'},
    '41' : {'code':'YUM','name':'Yumbe'},
    '42' : {'code':'BUN','name':'Bundibugyo'},
    '43' : {'code':'BSH','name':'Bushenyi'},
    '44' : {'code':'HOI','name':'Hoima'},
    '45' : {'code':'KBL','name':'Kabale'},
    '46' : {'code':'KAR','name':'Kabarole'},
    '47' : {'code':'KAM','name':'Kamwenge'},
    '48' : {'code':'KAN','name':'Kanungu'},
    '49' : {'code':'KAS','name':'Kasese'},
    '50' : {'code':'KBA','name':'Kibaale'},
    '51' : {'code':'KIS','name':'Kisoro'},
    '52' : {'code':'KYE','name':'Kyenjojo'},
    '53' : {'code':'MSN','name':'Masindi'},
    '54' : {'code':'MBR','name':'Mbarara'},
    '55' : {'code':'NTU','name':'Ntungamo'},
    '56' : {'code':'RUK','name':'Rukungiri'}
  },
  'UA':{
    '1' : {'code':'CK','name':'Cherkasy'},
    '2' : {'code':'CH','name':'Chernihiv'},
    '3' : {'code':'CV','name':'Chernivtsi'},
    '4' : {'code':'CR','name':'Crimea'},
    '5' : {'code':'DN','name':'Dnipropetrovs\'k'},
    '6' : {'code':'DO','name':'Donets\'k'},
    '7' : {'code':'IV','name':'Ivano-Frankivs\'k'},
    '8' : {'code':'KL','name':'Kharkiv Kherson'},
    '9' : {'code':'KM','name':'Khmel\'nyts\'kyy'},
    '10' : {'code':'KR','name':'Kirovohrad'},
    '11' : {'code':'KV','name':'Kiev'},
    '12' : {'code':'KY','name':'Kyyiv'},
    '13' : {'code':'LU','name':'Luhans\'k'},
    '14' : {'code':'LV','name':'L\'viv'},
    '15' : {'code':'MY','name':'Mykolayiv'},
    '16' : {'code':'OD','name':'Odesa'},
    '17' : {'code':'PO','name':'Poltava'},
    '18' : {'code':'RI','name':'Rivne'},
    '19' : {'code':'SE','name':'Sevastopol'},
    '20' : {'code':'SU','name':'Sumy'},
    '21' : {'code':'TE','name':'Ternopil\''},
    '22' : {'code':'VI','name':'Vinnytsya'},
    '23' : {'code':'VO','name':'Volyn\''},
    '24' : {'code':'ZK','name':'Zakarpattya'},
    '25' : {'code':'ZA','name':'Zaporizhzhya'},
    '26' : {'code':'ZH','name':'Zhytomyr'}
  },
  'AE':{
    '1' : {'code':'AZ','name':'Abu Zaby'},
    '2' : {'code':'AJ','name':'\'Ajman'},
    '3' : {'code':'FU','name':'Al Fujayrah'},
    '4' : {'code':'SH','name':'Ash Shariqah'},
    '5' : {'code':'DU','name':'Dubayy'},
    '6' : {'code':'RK','name':'R\'as al Khaymah'},
    '7' : {'code':'UQ','name':'Umm al Qaywayn'}
  },
  'GB':{
    '1' : {'code':'ABN','name':'Aberdeen'},
    '2' : {'code':'ABNS','name':'Aberdeenshire'},
    '3' : {'code':'ANG','name':'Anglesey'},
    '4' : {'code':'AGS','name':'Angus'},
    '5' : {'code':'ARY','name':'Argyll and Bute'},
    '6' : {'code':'BEDS','name':'Bedfordshire'},
    '7' : {'code':'BERKS','name':'Berkshire'},
    '8' : {'code':'BLA','name':'Blaenau Gwent'},
    '9' : {'code':'BRI','name':'Bridgend'},
    '10' : {'code':'BSTL','name':'Bristol'},
    '11' : {'code':'BUCKS','name':'Buckinghamshire'},
    '12' : {'code':'CAE','name':'Caerphilly'},
    '13' : {'code':'CAMBS','name':'Cambridgeshire'},
    '14' : {'code':'CDF','name':'Cardiff'},
    '15' : {'code':'CARM','name':'Carmarthenshire'},
    '16' : {'code':'CDGN','name':'Ceredigion'},
    '17' : {'code':'CHES','name':'Cheshire'},
    '18' : {'code':'CLACK','name':'Clackmannanshire'},
    '19' : {'code':'CON','name':'Conwy'},
    '20' : {'code':'CORN','name':'Cornwall'},
    '21' : {'code':'DNBG','name':'Denbighshire'},
    '22' : {'code':'DERBY','name':'Derbyshire'},
    '23' : {'code':'DVN','name':'Devon'},
    '24' : {'code':'DOR','name':'Dorset'},
    '25' : {'code':'DGL','name':'Dumfries and Galloway'},
    '26' : {'code':'DUND','name':'Dundee'},
    '27' : {'code':'DHM','name':'Durham'},
    '28' : {'code':'ARYE','name':'East Ayrshire'},
    '29' : {'code':'DUNBE','name':'East Dunbartonshire'},
    '30' : {'code':'LOTE','name':'East Lothian'},
    '31' : {'code':'RENE','name':'East Renfrewshire'},
    '32' : {'code':'ERYS','name':'East Riding of Yorkshire'},
    '33' : {'code':'SXE','name':'East Sussex'},
    '34' : {'code':'EDIN','name':'Edinburgh'},
    '35' : {'code':'ESX','name':'Essex'},
    '36' : {'code':'FALK','name':'Falkirk'},
    '37' : {'code':'FFE','name':'Fife'},
    '38' : {'code':'FLINT','name':'Flintshire'},
    '39' : {'code':'GLAS','name':'Glasgow'},
    '40' : {'code':'GLOS','name':'Gloucestershire'},
    '41' : {'code':'LDN','name':'Greater London'},
    '42' : {'code':'MCH','name':'Greater Manchester'},
    '43' : {'code':'GDD','name':'Gwynedd'},
    '44' : {'code':'HANTS','name':'Hampshire'},
    '45' : {'code':'HWR','name':'Herefordshire'},
    '46' : {'code':'HERTS','name':'Hertfordshire'},
    '47' : {'code':'HLD','name':'Highlands'},
    '48' : {'code':'IVER','name':'Inverclyde'},
    '49' : {'code':'IOW','name':'Isle of Wight'},
    '50' : {'code':'KNT','name':'Kent'},
    '51' : {'code':'LANCS','name':'Lancashire'},
    '52' : {'code':'LEICS','name':'Leicestershire'},
    '53' : {'code':'LINCS','name':'Lincolnshire'},
    '54' : {'code':'MSY','name':'Merseyside'},
    '55' : {'code':'MERT','name':'Merthyr Tydfil'},
    '56' : {'code':'MLOT','name':'Midlothian'},
    '57' : {'code':'MMOUTH','name':'Monmouthshire'},
    '58' : {'code':'MORAY','name':'Moray'},
    '59' : {'code':'NPRTAL','name':'Neath Port Talbot'},
    '60' : {'code':'NEWPT','name':'Newport'},
    '61' : {'code':'NOR','name':'Norfolk'},
    '62' : {'code':'ARYN','name':'North Ayrshire'},
    '63' : {'code':'LANN','name':'North Lanarkshire'},
    '64' : {'code':'YSN','name':'North Yorkshire'},
    '65' : {'code':'NHM','name':'Northamptonshire'},
    '66' : {'code':'NLD','name':'Northumberland'},
    '67' : {'code':'NOT','name':'Nottinghamshire'},
    '68' : {'code':'ORK','name':'Orkney Islands'},
    '69' : {'code':'OFE','name':'Oxfordshire'},
    '70' : {'code':'PEM','name':'Pembrokeshire'},
    '71' : {'code':'PERTH','name':'Perth and Kinross'},
    '72' : {'code':'PWS','name':'Powys'},
    '73' : {'code':'REN','name':'Renfrewshire'},
    '74' : {'code':'RHON','name':'Rhondda Cynon Taff'},
    '75' : {'code':'RUT','name':'Rutland'},
    '76' : {'code':'BOR','name':'Scottish Borders'},
    '77' : {'code':'SHET','name':'Shetland Islands'},
    '78' : {'code':'SPE','name':'Shropshire'},
    '79' : {'code':'SOM','name':'Somerset'},
    '80' : {'code':'ARYS','name':'South Ayrshire'},
    '81' : {'code':'LANS','name':'South Lanarkshire'},
    '82' : {'code':'YSS','name':'South Yorkshire'},
    '83' : {'code':'SFD','name':'Staffordshire'},
    '84' : {'code':'STIR','name':'Stirling'},
    '85' : {'code':'SFK','name':'Suffolk'},
    '86' : {'code':'SRY','name':'Surrey'},
    '87' : {'code':'SWAN','name':'Swansea'},
    '88' : {'code':'TORF','name':'Torfaen'},
    '89' : {'code':'TWR','name':'Tyne and Wear'},
    '90' : {'code':'VGLAM','name':'Vale of Glamorgan'},
    '91' : {'code':'WARKS','name':'Warwickshire'},
    '92' : {'code':'WDUN','name':'West Dunbartonshire'},
    '93' : {'code':'WLOT','name':'West Lothian'},
    '94' : {'code':'WMD','name':'West Midlands'},
    '95' : {'code':'SXW','name':'West Sussex'},
    '96' : {'code':'YSW','name':'West Yorkshire'},
    '97' : {'code':'WIL','name':'Western Isles'},
    '98' : {'code':'WLT','name':'Wiltshire'},
    '99' : {'code':'WORCS','name':'Worcestershire'},
    '100' : {'code':'WRX','name':'Wrexham'}
  },
  'US':{
    '1' : {'code':'AL','name':'Alabama'},
    '2' : {'code':'AK','name':'Alaska'},
    '3' : {'code':'AS','name':'American Samoa'},
    '4' : {'code':'AZ','name':'Arizona'},
    '5' : {'code':'AR','name':'Arkansas'},
    '6' : {'code':'AF','name':'Armed Forces Africa'},
    '7' : {'code':'AA','name':'Armed Forces Americas'},
    '8' : {'code':'AC','name':'Armed Forces Canada'},
    '9' : {'code':'AE','name':'Armed Forces Europe'},
    '10' : {'code':'AM','name':'Armed Forces Middle East'},
    '11' : {'code':'AP','name':'Armed Forces Pacific'},
    '12' : {'code':'CA','name':'California'},
    '13' : {'code':'CO','name':'Colorado'},
    '14' : {'code':'CT','name':'Connecticut'},
    '15' : {'code':'DE','name':'Delaware'},
    '16' : {'code':'DC','name':'District of Columbia'},
    '17' : {'code':'FM','name':'Federated States Of Micronesia'},
    '18' : {'code':'FL','name':'Florida'},
    '19' : {'code':'GA','name':'Georgia'},
    '20' : {'code':'GU','name':'Guam'},
    '21' : {'code':'HI','name':'Hawaii'},
    '22' : {'code':'ID','name':'Idaho'},
    '23' : {'code':'IL','name':'Illinois'},
    '24' : {'code':'IN','name':'Indiana'},
    '25' : {'code':'IA','name':'Iowa'},
    '26' : {'code':'KS','name':'Kansas'},
    '27' : {'code':'KY','name':'Kentucky'},
    '28' : {'code':'LA','name':'Louisiana'},
    '29' : {'code':'ME','name':'Maine'},
    '30' : {'code':'MH','name':'Marshall Islands'},
    '31' : {'code':'MD','name':'Maryland'},
    '32' : {'code':'MA','name':'Massachusetts'},
    '33' : {'code':'MI','name':'Michigan'},
    '34' : {'code':'MN','name':'Minnesota'},
    '35' : {'code':'MS','name':'Mississippi'},
    '36' : {'code':'MO','name':'Missouri'},
    '37' : {'code':'MT','name':'Montana'},
    '38' : {'code':'NE','name':'Nebraska'},
    '39' : {'code':'NV','name':'Nevada'},
    '40' : {'code':'NH','name':'New Hampshire'},
    '41' : {'code':'NJ','name':'New Jersey'},
    '42' : {'code':'NM','name':'New Mexico'},
    '43' : {'code':'NY','name':'New York'},
    '44' : {'code':'NC','name':'North Carolina'},
    '45' : {'code':'ND','name':'North Dakota'},
    '46' : {'code':'MP','name':'Northern Mariana Islands'},
    '47' : {'code':'OH','name':'Ohio'},
    '48' : {'code':'OK','name':'Oklahoma'},
    '49' : {'code':'OR','name':'Oregon'},
    '50' : {'code':'PW','name':'Palau'},
    '51' : {'code':'PA','name':'Pennsylvania'},
    '52' : {'code':'PR','name':'Puerto Rico'},
    '53' : {'code':'RI','name':'Rhode Island'},
    '54' : {'code':'SC','name':'South Carolina'},
    '55' : {'code':'SD','name':'South Dakota'},
    '56' : {'code':'TN','name':'Tennessee'},
    '57' : {'code':'TX','name':'Texas'},
    '58' : {'code':'UT','name':'Utah'},
    '59' : {'code':'VT','name':'Vermont'},
    '60' : {'code':'VI','name':'Virgin Islands'},
    '61' : {'code':'VA','name':'Virginia'},
    '62' : {'code':'WA','name':'Washington'},
    '63' : {'code':'WV','name':'West Virginia'},
    '64' : {'code':'WI','name':'Wisconsin'},
    '65' : {'code':'WY','name':'Wyoming'}
  },
  'UM':{
    '1' : {'code':'BI','name':'Baker Island'},
    '2' : {'code':'HI','name':'Howland Island'},
    '3' : {'code':'JI','name':'Jarvis Island'},
    '4' : {'code':'JA','name':'Johnston Atoll'},
    '5' : {'code':'KR','name':'Kingman Reef'},
    '6' : {'code':'MA','name':'Midway Atoll'},
    '7' : {'code':'NI','name':'Navassa Island'},
    '8' : {'code':'PA','name':'Palmyra Atoll'},
    '9' : {'code':'WI','name':'Wake Island'}
  },
  'UY':{
    '1' : {'code':'AR','name':'Artigas'},
    '2' : {'code':'CA','name':'Canelones'},
    '3' : {'code':'CL','name':'Cerro Largo'},
    '4' : {'code':'CO','name':'Colonia'},
    '5' : {'code':'DU','name':'Durazno'},
    '6' : {'code':'FS','name':'Flores'},
    '7' : {'code':'FA','name':'Florida'},
    '8' : {'code':'LA','name':'Lavalleja'},
    '9' : {'code':'MA','name':'Maldonado'},
    '10' : {'code':'MO','name':'Montevideo'},
    '11' : {'code':'PA','name':'Paysandu'},
    '12' : {'code':'RN','name':'Rio Negro'},
    '13' : {'code':'RV','name':'Rivera'},
    '14' : {'code':'RO','name':'Rocha'},
    '15' : {'code':'SL','name':'Salto'},
    '16' : {'code':'SJ','name':'San Jose'},
    '17' : {'code':'SO','name':'Soriano'},
    '18' : {'code':'TA','name':'Tacuarembo'},
    '19' : {'code':'TT','name':'Treinta y Tres'}
  },
  'UZ':{
    '1' : {'code':'AN','name':'Andijon'},
    '2' : {'code':'BU','name':'Buxoro'},
    '3' : {'code':'FA','name':'Farg\'ona'},
    '4' : {'code':'JI','name':'Jizzax'},
    '5' : {'code':'NG','name':'Namangan'},
    '6' : {'code':'NW','name':'Navoiy'},
    '7' : {'code':'QA','name':'Qashqadaryo'},
    '8' : {'code':'QR','name':'Qoraqalpog\'iston Republikasi'},
    '9' : {'code':'SA','name':'Samarqand'},
    '10' : {'code':'SI','name':'Sirdaryo'},
    '11' : {'code':'SU','name':'Surxondaryo'},
    '12' : {'code':'TK','name':'Toshkent City'},
    '13' : {'code':'TO','name':'Toshkent Region'},
    '14' : {'code':'XO','name':'Xorazm'}
  },
  'VU':{
    '1' : {'code':'MA','name':'Malampa'},
    '2' : {'code':'PE','name':'Penama'},
    '3' : {'code':'SA','name':'Sanma'},
    '4' : {'code':'SH','name':'Shefa'},
    '5' : {'code':'TA','name':'Tafea'},
    '6' : {'code':'TO','name':'Torba'}
  },
  'VE':{
    '1' : {'code':'AM','name':'Amazonas'},
    '2' : {'code':'AN','name':'Anzoategui'},
    '3' : {'code':'AP','name':'Apure'},
    '4' : {'code':'AR','name':'Aragua'},
    '5' : {'code':'BA','name':'Barinas'},
    '6' : {'code':'BO','name':'Bolivar'},
    '7' : {'code':'CA','name':'Carabobo'},
    '8' : {'code':'CO','name':'Cojedes'},
    '9' : {'code':'DA','name':'Delta Amacuro'},
    '10' : {'code':'DF','name':'Dependencias Federales'},
    '11' : {'code':'DI','name':'Distrito Federal'},
    '12' : {'code':'FA','name':'Falcon'},
    '13' : {'code':'GU','name':'Guarico'},
    '14' : {'code':'LA','name':'Lara'},
    '15' : {'code':'ME','name':'Merida'},
    '16' : {'code':'MI','name':'Miranda'},
    '17' : {'code':'MO','name':'Monagas'},
    '18' : {'code':'NE','name':'Nueva Esparta'},
    '19' : {'code':'PO','name':'Portuguesa'},
    '20' : {'code':'SU','name':'Sucre'},
    '21' : {'code':'TA','name':'Tachira'},
    '22' : {'code':'TR','name':'Trujillo'},
    '23' : {'code':'VA','name':'Vargas'},
    '24' : {'code':'YA','name':'Yaracuy'},
    '25' : {'code':'ZU','name':'Zulia'}
  },
  'VN':{
    '1' : {'code':'AG','name':'An Giang'},
    '2' : {'code':'BG','name':'Bac Giang'},
    '3' : {'code':'BK','name':'Bac Kan'},
    '4' : {'code':'BL','name':'Bac Lieu'},
    '5' : {'code':'BC','name':'Bac Ninh'},
    '6' : {'code':'BR','name':'Ba Ria-Vung Tau'},
    '7' : {'code':'BN','name':'Ben Tre'},
    '8' : {'code':'BH','name':'Binh Dinh'},
    '9' : {'code':'BU','name':'Binh Duong'},
    '10' : {'code':'BP','name':'Binh Phuoc'},
    '11' : {'code':'BT','name':'Binh Thuan'},
    '12' : {'code':'CM','name':'Ca Mau'},
    '13' : {'code':'CT','name':'Can Tho'},
    '14' : {'code':'CB','name':'Cao Bang'},
    '15' : {'code':'DL','name':'Dak Lak'},
    '16' : {'code':'DG','name':'Dak Nong'},
    '17' : {'code':'DN','name':'Da Nang'},
    '18' : {'code':'DB','name':'Dien Bien'},
    '19' : {'code':'DI','name':'Dong Nai'},
    '20' : {'code':'DT','name':'Dong Thap'},
    '21' : {'code':'GL','name':'Gia Lai'},
    '22' : {'code':'HG','name':'Ha Giang'},
    '23' : {'code':'HD','name':'Hai Duong'},
    '24' : {'code':'HP','name':'Hai Phong'},
    '25' : {'code':'HM','name':'Ha Nam'},
    '26' : {'code':'HI','name':'Ha Noi'},
    '27' : {'code':'HT','name':'Ha Tay'},
    '28' : {'code':'HH','name':'Ha Tinh'},
    '29' : {'code':'HB','name':'Hoa Binh'},
    '30' : {'code':'HC','name':'Ho Chin Minh'},
    '31' : {'code':'HU','name':'Hau Giang'},
    '32' : {'code':'HY','name':'Hung Yen'}
  },
  'VI':{
    '1' : {'code':'C','name':'Saint Croix'},
    '2' : {'code':'J','name':'Saint John'},
    '3' : {'code':'T','name':'Saint Thomas'}
  },
  'WF':{
    '1' : {'code':'A','name':'Alo'},
    '2' : {'code':'S','name':'Sigave'},
    '3' : {'code':'W','name':'Wallis'}
  },
  'YE':{
    '1' : {'code':'AB','name':'Abyan'},
    '2' : {'code':'AD','name':'Adan'},
    '3' : {'code':'AM','name':'Amran'},
    '4' : {'code':'BA','name':'Al Bayda'},
    '5' : {'code':'DA','name':'Ad Dali'},
    '6' : {'code':'DH','name':'Dhamar'},
    '7' : {'code':'HD','name':'Hadramawt'},
    '8' : {'code':'HJ','name':'Hajjah'},
    '9' : {'code':'HU','name':'Al Hudaydah'},
    '10' : {'code':'IB','name':'Ibb'},
    '11' : {'code':'JA','name':'Al Jawf'},
    '12' : {'code':'LA','name':'Lahij'},
    '13' : {'code':'MA','name':'Ma\'rib'},
    '14' : {'code':'MR','name':'Al Mahrah'},
    '15' : {'code':'MW','name':'Al Mahwit'},
    '16' : {'code':'SD','name':'Sa\'dah'},
    '17' : {'code':'SN','name':'San\'a'},
    '18' : {'code':'SH','name':'Shabwah'},
    '19' : {'code':'TA','name':'Ta\'izz'}
  },
  'YU':{
    '1' : {'code':'KOS','name':'Kosovo'},
    '2' : {'code':'MON','name':'Montenegro'},
    '3' : {'code':'SER','name':'Serbia'},
    '4' : {'code':'VOJ','name':'Vojvodina'}
  },
  'ZR':{
    '1' : {'code':'BC','name':'Bas-Congo'},
    '2' : {'code':'BN','name':'Bandundu'},
    '3' : {'code':'EQ','name':'Equateur'},
    '4' : {'code':'KA','name':'Katanga'},
    '5' : {'code':'KE','name':'Kasai-Oriental'},
    '6' : {'code':'KN','name':'Kinshasa'},
    '7' : {'code':'KW','name':'Kasai-Occidental'},
    '8' : {'code':'MA','name':'Maniema'},
    '9' : {'code':'NK','name':'Nord-Kivu'},
    '10' : {'code':'OR','name':'Orientale'},
    '11' : {'code':'SK','name':'Sud-Kivu'}
  },
  'ZM':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'CB','name':'Copperbelt'},
    '3' : {'code':'EA','name':'Eastern'},
    '4' : {'code':'LP','name':'Luapula'},
    '5' : {'code':'LK','name':'Lusaka'},
    '6' : {'code':'NO','name':'Northern'},
    '7' : {'code':'NW','name':'North-Western'},
    '8' : {'code':'SO','name':'Southern'},
    '9' : {'code':'WE','name':'Western'}
  },
  'ZW':{
    '1' : {'code':'BU','name':'Bulawayo'},
    '2' : {'code':'HA','name':'Harare'},
    '3' : {'code':'ML','name':'Manicaland'},
    '4' : {'code':'MC','name':'Mashonaland Central'},
    '5' : {'code':'ME','name':'Mashonaland East'},
    '6' : {'code':'MW','name':'Mashonaland West'},
    '7' : {'code':'MV','name':'Masvingo'},
    '8' : {'code':'MN','name':'Matabeleland North'},
    '9' : {'code':'MS','name':'Matabeleland South'},
    '10' : {'code':'MD','name':'Midlands'}
  }
};

/* ==========================================================
 * bootstrap-formhelpers-timepicker.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHTimePickerDelimiter = ':';

var BFHTimePickerModes = {
  'am': 'AM',
  'pm': 'PM'
};
/* ==========================================================
 * bootstrap-formhelpers-timezones.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHTimezonesList = {
  'AF': {
    'Asia/Kabul': 'Kabul'
  },
  'AL': {
    'Europe/Tirane': 'Tirane'
  },
  'DZ': {
    'Africa/Algiers': 'Algiers'
  },
  'AS': {
    'Pacific/Pago_Pago': 'Pago Pago'
  },
  'AD': {
    'Europe/Andorra': 'Andorra'
  },
  'AO': {
    'Africa/Luanda': 'Luanda'
  },
  'AI': {
    'America/Anguilla': 'Anguilla'
  },
  'AQ': {
    'Antarctica/Casey': 'Casey',
    'Antarctica/Davis': 'Davis',
    'Antarctica/DumontDUrville': 'DumontDUrville',
    'Antarctica/Macquarie': 'Macquarie',
    'Antarctica/Mawson': 'Mawson',
    'Antarctica/McMurdo': 'McMurdo',
    'Antarctica/Palmer': 'Palmer',
    'Antarctica/Rothera': 'Rothera',
    'Antarctica/South_Pole': 'South Pole',
    'Antarctica/Syowa': 'Syowa',
    'Antarctica/Vostok': 'Vostok'
  },
  'AG': {
    'America/Antigua': 'Antigua'
  },
  'AR': {
    'America/Argentina/Buenos_Aires': 'Argentina / Buenos Aires',
    'America/Argentina/Catamarca': 'Argentina / Catamarca',
    'America/Argentina/Cordoba': 'Argentina / Cordoba',
    'America/Argentina/Jujuy': 'Argentina / Jujuy',
    'America/Argentina/La_Rioja': 'Argentina / La Rioja',
    'America/Argentina/Mendoza': 'Argentina / Mendoza',
    'America/Argentina/Rio_Gallegos': 'Argentina / Rio Gallegos',
    'America/Argentina/Salta': 'Argentina / Salta',
    'America/Argentina/San_Juan': 'Argentina / San Juan',
    'America/Argentina/San_Luis': 'Argentina / San Luis',
    'America/Argentina/Tucuman': 'Argentina / Tucuman',
    'America/Argentina/Ushuaia': 'Argentina / Ushuaia'
  },
  'AM': {
    'Asia/Yerevan': 'Yerevan'
  },
  'AW': {
    'America/Aruba': 'Aruba'
  },
  'AU': {
    'Australia/Adelaide': 'Adelaide',
    'Australia/Brisbane': 'Brisbane',
    'Australia/Broken_Hill': 'Broken Hill',
    'Australia/Currie': 'Currie',
    'Australia/Darwin': 'Darwin',
    'Australia/Eucla': 'Eucla',
    'Australia/Hobart': 'Hobart',
    'Australia/Lindeman': 'Lindeman',
    'Australia/Lord_Howe': 'Lord Howe',
    'Australia/Melbourne': 'Melbourne',
    'Australia/Perth': 'Perth',
    'Australia/Sydney': 'Sydney'
  },
  'AT': {
    'Europe/Vienna': 'Vienna'
  },
  'AZ': {
    'Asia/Baku': 'Baku'
  },
  'BH': {
    'Asia/Bahrain': 'Bahrain'
  },
  'BD': {
    'Asia/Dhaka': 'Dhaka'
  },
  'BB': {
    'America/Barbados': 'Barbados'
  },
  'BY': {
    'Europe/Minsk': 'Minsk'
  },
  'BE': {
    'Europe/Brussels': 'Brussels'
  },
  'BZ': {
    'America/Belize': 'Belize'
  },
  'BJ': {
    'Africa/Porto-Novo': 'Porto-Novo'
  },
  'BM': {
    'Atlantic/Bermuda': 'Bermuda'
  },
  'BT': {
    'Asia/Thimphu': 'Thimphu'
  },
  'BO': {
    'America/La_Paz': 'La Paz'
  },
  'BA': {
    'Europe/Sarajevo': 'Sarajevo'
  },
  'BW': {
    'Africa/Gaborone': 'Gaborone'
  },
  'BR': {
    'America/Araguaina': 'Araguaina',
    'America/Bahia': 'Bahia',
    'America/Belem': 'Belem',
    'America/Boa_Vista': 'Boa Vista',
    'America/Campo_Grande': 'Campo Grande',
    'America/Cuiaba': 'Cuiaba',
    'America/Eirunepe': 'Eirunepe',
    'America/Fortaleza': 'Fortaleza',
    'America/Maceio': 'Maceio',
    'America/Manaus': 'Manaus',
    'America/Noronha': 'Noronha',
    'America/Porto_Velho': 'Porto Velho',
    'America/Recife': 'Recife',
    'America/Rio_Branco': 'Rio Branco',
    'America/Santarem': 'Santarem',
    'America/Sao_Paulo': 'Sao Paulo'
  },
  'VG': {
    'America/Tortola': 'Tortola'
  },
  'BN': {
    'Asia/Brunei': 'Brunei'
  },
  'BG': {
    'Europe/Sofia': 'Sofia'
  },
  'BF': {
    'Africa/Ouagadougou': 'Ouagadougou'
  },
  'BI': {
    'Africa/Bujumbura': 'Bujumbura'
  },
  'CI': {
    'Africa/Abidjan': 'Abidjan'
  },
  'KH': {
    'Asia/Phnom_Penh': 'Phnom Penh'
  },
  'CM': {
    'Africa/Douala': 'Douala'
  },
  'CA': {
    'America/Atikokan': 'Atikokan',
    'America/Blanc-Sablon': 'Blanc-Sablon',
    'America/Cambridge_Bay': 'Cambridge Bay',
    'America/Creston': 'Creston',
    'America/Dawson': 'Dawson',
    'America/Dawson_Creek': 'Dawson Creek',
    'America/Edmonton': 'Edmonton',
    'America/Glace_Bay': 'Glace Bay',
    'America/Goose_Bay': 'Goose Bay',
    'America/Halifax': 'Halifax',
    'America/Inuvik': 'Inuvik',
    'America/Iqaluit': 'Iqaluit',
    'America/Moncton': 'Moncton',
    'America/Montreal': 'Montreal',
    'America/Nipigon': 'Nipigon',
    'America/Pangnirtung': 'Pangnirtung',
    'America/Rainy_River': 'Rainy River',
    'America/Rankin_Inlet': 'Rankin Inlet',
    'America/Regina': 'Regina',
    'America/Resolute': 'Resolute',
    'America/St_Johns': 'St Johns',
    'America/Swift_Current': 'Swift Current',
    'America/Thunder_Bay': 'Thunder Bay',
    'America/Toronto': 'Toronto',
    'America/Vancouver': 'Vancouver',
    'America/Whitehorse': 'Whitehorse',
    'America/Winnipeg': 'Winnipeg',
    'America/Yellowknife': 'Yellowknife'
  },
  'CV': {
    'Atlantic/Cape_Verde': 'Cape Verde'
  },
  'KY': {
    'America/Cayman': 'Cayman'
  },
  'CF': {
    'Africa/Bangui': 'Bangui'
  },
  'TD': {
    'Africa/Ndjamena': 'Ndjamena'
  },
  'CL': {
    'America/Santiago': 'Santiago',
    'Pacific/Easter': 'Easter'
  },
  'CN': {
    'Asia/Chongqing': 'Chongqing',
    'Asia/Harbin': 'Harbin',
    'Asia/Kashgar': 'Kashgar',
    'Asia/Shanghai': 'Shanghai',
    'Asia/Urumqi': 'Urumqi'
  },
  'CO': {
    'America/Bogota': 'Bogota'
  },
  'KM': {
    'Indian/Comoro': 'Comoro'
  },
  'CG': {
    'Africa/Brazzaville': 'Brazzaville'
  },
  'CR': {
    'America/Costa_Rica': 'Costa Rica'
  },
  'HR': {
    'Europe/Zagreb': 'Zagreb'
  },
  'CU': {
    'America/Havana': 'Havana'
  },
  'CY': {
    'Asia/Nicosia': 'Nicosia'
  },
  'CZ': {
    'Europe/Prague': 'Prague'
  },
  'CD': {
    'Africa/Kinshasa': 'Kinshasa',
    'Africa/Lubumbashi': 'Lubumbashi'
  },
  'DK': {
    'Europe/Copenhagen': 'Copenhagen'
  },
  'DJ': {
    'Africa/Djibouti': 'Djibouti'
  },
  'DM': {
    'America/Dominica': 'Dominica'
  },
  'DO': {
    'America/Santo_Domingo': 'Santo Domingo'
  },
  'TP': {
  },
  'EC': {
    'America/Guayaquil': 'Guayaquil',
    'Pacific/Galapagos': 'Galapagos'
  },
  'EG': {
    'Africa/Cairo': 'Cairo'
  },
  'SV': {
    'America/El_Salvador': 'El Salvador'
  },
  'GQ': {
    'Africa/Malabo': 'Malabo'
  },
  'ER': {
    'Africa/Asmara': 'Asmara'
  },
  'EE': {
    'Europe/Tallinn': 'Tallinn'
  },
  'ET': {
    'Africa/Addis_Ababa': 'Addis Ababa'
  },
  'FO': {
    'Atlantic/Faroe': 'Faroe'
  },
  'FK': {
    'Atlantic/Stanley': 'Stanley'
  },
  'FJ': {
    'Pacific/Fiji': 'Fiji'
  },
  'FI': {
    'Europe/Helsinki': 'Helsinki'
  },
  'MK': {
    'Europe/Skopje': 'Skopje'
  },
  'FR': {
    'Europe/Paris': 'Paris'
  },
  'GA': {
    'Africa/Libreville': 'Libreville'
  },
  'GE': {
    'Asia/Tbilisi': 'Tbilisi'
  },
  'DE': {
    'Europe/Berlin': 'Berlin'
  },
  'GH': {
    'Africa/Accra': 'Accra'
  },
  'GR': {
    'Europe/Athens': 'Athens'
  },
  'GL': {
    'America/Danmarkshavn': 'Danmarkshavn',
    'America/Godthab': 'Godthab',
    'America/Scoresbysund': 'Scoresbysund',
    'America/Thule': 'Thule'
  },
  'GD': {
    'America/Grenada': 'Grenada'
  },
  'GU': {
    'Pacific/Guam': 'Guam'
  },
  'GT': {
    'America/Guatemala': 'Guatemala'
  },
  'GN': {
    'Africa/Conakry': 'Conakry'
  },
  'GW': {
    'Africa/Bissau': 'Bissau'
  },
  'GY': {
    'America/Guyana': 'Guyana'
  },
  'HT': {
    'America/Port-au-Prince': 'Port-au-Prince'
  },
  'HN': {
    'America/Tegucigalpa': 'Tegucigalpa'
  },
  'HK': {
    'Asia/Hong_Kong': 'Hong Kong'
  },
  'HU': {
    'Europe/Budapest': 'Budapest'
  },
  'IS': {
    'Atlantic/Reykjavik': 'Reykjavik'
  },
  'IN': {
    'Asia/Kolkata': 'Kolkata'
  },
  'ID': {
    'Asia/Jakarta': 'Jakarta',
    'Asia/Jayapura': 'Jayapura',
    'Asia/Makassar': 'Makassar',
    'Asia/Pontianak': 'Pontianak'
  },
  'IR': {
    'Asia/Tehran': 'Tehran'
  },
  'IQ': {
    'Asia/Baghdad': 'Baghdad'
  },
  'IE': {
    'Europe/Dublin': 'Dublin'
  },
  'IL': {
    'Asia/Jerusalem': 'Jerusalem'
  },
  'IT': {
    'Europe/Rome': 'Rome'
  },
  'JM': {
    'America/Jamaica': 'Jamaica'
  },
  'JP': {
    'Asia/Tokyo': 'Tokyo'
  },
  'JO': {
    'Asia/Amman': 'Amman'
  },
  'KZ': {
    'Asia/Almaty': 'Almaty',
    'Asia/Aqtau': 'Aqtau',
    'Asia/Aqtobe': 'Aqtobe',
    'Asia/Oral': 'Oral',
    'Asia/Qyzylorda': 'Qyzylorda'
  },
  'KE': {
    'Africa/Nairobi': 'Nairobi'
  },
  'KI': {
    'Pacific/Enderbury': 'Enderbury',
    'Pacific/Kiritimati': 'Kiritimati',
    'Pacific/Tarawa': 'Tarawa'
  },
  'KW': {
    'Asia/Kuwait': 'Kuwait'
  },
  'KG': {
    'Asia/Bishkek': 'Bishkek'
  },
  'LA': {
    'Asia/Vientiane': 'Vientiane'
  },
  'LV': {
    'Europe/Riga': 'Riga'
  },
  'LB': {
    'Asia/Beirut': 'Beirut'
  },
  'LS': {
    'Africa/Maseru': 'Maseru'
  },
  'LR': {
    'Africa/Monrovia': 'Monrovia'
  },
  'LY': {
    'Africa/Tripoli': 'Tripoli'
  },
  'LI': {
    'Europe/Vaduz': 'Vaduz'
  },
  'LT': {
    'Europe/Vilnius': 'Vilnius'
  },
  'LU': {
    'Europe/Luxembourg': 'Luxembourg'
  },
  'MO': {
    'Asia/Macau': 'Macau'
  },
  'MG': {
    'Indian/Antananarivo': 'Antananarivo'
  },
  'MW': {
    'Africa/Blantyre': 'Blantyre'
  },
  'MY': {
    'Asia/Kuala_Lumpur': 'Kuala Lumpur',
    'Asia/Kuching': 'Kuching'
  },
  'MV': {
    'Indian/Maldives': 'Maldives'
  },
  'ML': {
    'Africa/Bamako': 'Bamako'
  },
  'MT': {
    'Europe/Malta': 'Malta'
  },
  'MH': {
    'Pacific/Kwajalein': 'Kwajalein',
    'Pacific/Majuro': 'Majuro'
  },
  'MR': {
    'Africa/Nouakchott': 'Nouakchott'
  },
  'MU': {
    'Indian/Mauritius': 'Mauritius'
  },
  'MX': {
    'America/Bahia_Banderas': 'Bahia Banderas',
    'America/Cancun': 'Cancun',
    'America/Chihuahua': 'Chihuahua',
    'America/Hermosillo': 'Hermosillo',
    'America/Matamoros': 'Matamoros',
    'America/Mazatlan': 'Mazatlan',
    'America/Merida': 'Merida',
    'America/Mexico_City': 'Mexico City',
    'America/Monterrey': 'Monterrey',
    'America/Ojinaga': 'Ojinaga',
    'America/Santa_Isabel': 'Santa Isabel',
    'America/Tijuana': 'Tijuana'
  },
  'FM': {
    'Pacific/Chuuk': 'Chuuk',
    'Pacific/Kosrae': 'Kosrae',
    'Pacific/Pohnpei': 'Pohnpei'
  },
  'MD': {
    'Europe/Chisinau': 'Chisinau'
  },
  'MC': {
    'Europe/Monaco': 'Monaco'
  },
  'MN': {
    'Asia/Choibalsan': 'Choibalsan',
    'Asia/Hovd': 'Hovd',
    'Asia/Ulaanbaatar': 'Ulaanbaatar'
  },
  'ME': {
    'Europe/Podgorica': 'Podgorica'
  },
  'MS': {
    'America/Montserrat': 'Montserrat'
  },
  'MA': {
    'Africa/Casablanca': 'Casablanca'
  },
  'MZ': {
    'Africa/Maputo': 'Maputo'
  },
  'MM': {
    'Asia/Rangoon': 'Rangoon'
  },
  'NA': {
    'Africa/Windhoek': 'Windhoek'
  },
  'NR': {
    'Pacific/Nauru': 'Nauru'
  },
  'NP': {
    'Asia/Kathmandu': 'Kathmandu'
  },
  'NL': {
    'Europe/Amsterdam': 'Amsterdam'
  },
  'AN': {
  },
  'NZ': {
    'Pacific/Auckland': 'Auckland',
    'Pacific/Chatham': 'Chatham'
  },
  'NI': {
    'America/Managua': 'Managua'
  },
  'NE': {
    'Africa/Niamey': 'Niamey'
  },
  'NG': {
    'Africa/Lagos': 'Lagos'
  },
  'NF': {
    'Pacific/Norfolk': 'Norfolk'
  },
  'KP': {
    'Asia/Pyongyang': 'Pyongyang'
  },
  'MP': {
    'Pacific/Saipan': 'Saipan'
  },
  'NO': {
    'Europe/Oslo': 'Oslo'
  },
  'OM': {
    'Asia/Muscat': 'Muscat'
  },
  'PK': {
    'Asia/Karachi': 'Karachi'
  },
  'PW': {
    'Pacific/Palau': 'Palau'
  },
  'PA': {
    'America/Panama': 'Panama'
  },
  'PG': {
    'Pacific/Port_Moresby': 'Port Moresby'
  },
  'PY': {
    'America/Asuncion': 'Asuncion'
  },
  'PE': {
    'America/Lima': 'Lima'
  },
  'PH': {
    'Asia/Manila': 'Manila'
  },
  'PN': {
    'Pacific/Pitcairn': 'Pitcairn'
  },
  'PL': {
    'Europe/Warsaw': 'Warsaw'
  },
  'PT': {
    'Atlantic/Azores': 'Azores',
    'Atlantic/Madeira': 'Madeira',
    'Europe/Lisbon': 'Lisbon'
  },
  'PR': {
    'America/Puerto_Rico': 'Puerto Rico'
  },
  'QA': {
    'Asia/Qatar': 'Qatar'
  },
  'RO': {
    'Europe/Bucharest': 'Bucharest'
  },
  'RU': {
    'Asia/Anadyr': 'Anadyr',
    'Asia/Irkutsk': 'Irkutsk',
    'Asia/Kamchatka': 'Kamchatka',
    'Asia/Krasnoyarsk': 'Krasnoyarsk',
    'Asia/Magadan': 'Magadan',
    'Asia/Novokuznetsk': 'Novokuznetsk',
    'Asia/Novosibirsk': 'Novosibirsk',
    'Asia/Omsk': 'Omsk',
    'Asia/Sakhalin': 'Sakhalin',
    'Asia/Vladivostok': 'Vladivostok',
    'Asia/Yakutsk': 'Yakutsk',
    'Asia/Yekaterinburg': 'Yekaterinburg',
    'Europe/Kaliningrad': 'Kaliningrad',
    'Europe/Moscow': 'Moscow',
    'Europe/Samara': 'Samara',
    'Europe/Volgograd': 'Volgograd'
  },
  'RW': {
    'Africa/Kigali': 'Kigali'
  },
  'ST': {
    'Africa/Sao_Tome': 'Sao Tome'
  },
  'SH': {
    'Atlantic/St_Helena': 'St Helena'
  },
  'KN': {
    'America/St_Kitts': 'St Kitts'
  },
  'LC': {
    'America/St_Lucia': 'St Lucia'
  },
  'VC': {
    'America/St_Vincent': 'St Vincent'
  },
  'WS': {
    'Pacific/Apia': 'Apia'
  },
  'SM': {
    'Europe/San_Marino': 'San Marino'
  },
  'SA': {
    'Asia/Riyadh': 'Riyadh'
  },
  'SN': {
    'Africa/Dakar': 'Dakar'
  },
  'RS': {
    'Europe/Belgrade': 'Belgrade'
  },
  'SC': {
    'Indian/Mahe': 'Mahe'
  },
  'SL': {
    'Africa/Freetown': 'Freetown'
  },
  'SG': {
    'Asia/Singapore': 'Singapore'
  },
  'SK': {
    'Europe/Bratislava': 'Bratislava'
  },
  'SI': {
    'Europe/Ljubljana': 'Ljubljana'
  },
  'SB': {
    'Pacific/Guadalcanal': 'Guadalcanal'
  },
  'SO': {
    'Africa/Mogadishu': 'Mogadishu'
  },
  'ZA': {
    'Africa/Johannesburg': 'Johannesburg'
  },
  'GS': {
    'Atlantic/South_Georgia': 'South Georgia'
  },
  'KR': {
    'Asia/Seoul': 'Seoul'
  },
  'ES': {
    'Africa/Ceuta': 'Ceuta',
    'Atlantic/Canary': 'Canary',
    'Europe/Madrid': 'Madrid'
  },
  'LK': {
    'Asia/Colombo': 'Colombo'
  },
  'SD': {
    'Africa/Khartoum': 'Khartoum'
  },
  'SR': {
    'America/Paramaribo': 'Paramaribo'
  },
  'SZ': {
    'Africa/Mbabane': 'Mbabane'
  },
  'SE': {
    'Europe/Stockholm': 'Stockholm'
  },
  'CH': {
    'Europe/Zurich': 'Zurich'
  },
  'SY': {
    'Asia/Damascus': 'Damascus'
  },
  'TW': {
    'Asia/Taipei': 'Taipei'
  },
  'TJ': {
    'Asia/Dushanbe': 'Dushanbe'
  },
  'TZ': {
    'Africa/Dar_es_Salaam': 'Dar es Salaam'
  },
  'TH': {
    'Asia/Bangkok': 'Bangkok'
  },
  'BS': {
    'America/Nassau': 'Nassau'
  },
  'GM': {
    'Africa/Banjul': 'Banjul'
  },
  'TG': {
    'Africa/Lome': 'Lome'
  },
  'TO': {
    'Pacific/Tongatapu': 'Tongatapu'
  },
  'TT': {
    'America/Port_of_Spain': 'Port of Spain'
  },
  'TN': {
    'Africa/Tunis': 'Tunis'
  },
  'TR': {
    'Europe/Istanbul': 'Istanbul'
  },
  'TM': {
    'Asia/Ashgabat': 'Ashgabat'
  },
  'TC': {
    'America/Grand_Turk': 'Grand Turk'
  },
  'TV': {
    'Pacific/Funafuti': 'Funafuti'
  },
  'VI': {
    'America/St_Thomas': 'St Thomas'
  },
  'UG': {
    'Africa/Kampala': 'Kampala'
  },
  'UA': {
    'Europe/Kiev': 'Kiev',
    'Europe/Simferopol': 'Simferopol',
    'Europe/Uzhgorod': 'Uzhgorod',
    'Europe/Zaporozhye': 'Zaporozhye'
  },
  'AE': {
    'Asia/Dubai': 'Dubai'
  },
  'GB': {
    'Europe/London': 'London'
  },
  'US': {
    'America/Adak': 'Adak',
    'America/Anchorage': 'Anchorage',
    'America/Boise': 'Boise',
    'America/Chicago': 'Chicago',
    'America/Denver': 'Denver',
    'America/Detroit': 'Detroit',
    'America/Indiana/Indianapolis': 'Indiana / Indianapolis',
    'America/Indiana/Knox': 'Indiana / Knox',
    'America/Indiana/Marengo': 'Indiana / Marengo',
    'America/Indiana/Petersburg': 'Indiana / Petersburg',
    'America/Indiana/Tell_City': 'Indiana / Tell City',
    'America/Indiana/Vevay': 'Indiana / Vevay',
    'America/Indiana/Vincennes': 'Indiana / Vincennes',
    'America/Indiana/Winamac': 'Indiana / Winamac',
    'America/Juneau': 'Juneau',
    'America/Kentucky/Louisville': 'Kentucky / Louisville',
    'America/Kentucky/Monticello': 'Kentucky / Monticello',
    'America/Los_Angeles': 'Los Angeles',
    'America/Menominee': 'Menominee',
    'America/Metlakatla': 'Metlakatla',
    'America/New_York': 'New York',
    'America/Nome': 'Nome',
    'America/North_Dakota/Beulah': 'North Dakota / Beulah',
    'America/North_Dakota/Center': 'North Dakota / Center',
    'America/North_Dakota/New_Salem': 'North Dakota / New Salem',
    'America/Phoenix': 'Phoenix',
    'America/Shiprock': 'Shiprock',
    'America/Sitka': 'Sitka',
    'America/Yakutat': 'Yakutat',
    'Pacific/Honolulu': 'Honolulu'
  },
  'UY': {
    'America/Montevideo': 'Montevideo'
  },
  'UZ': {
    'Asia/Samarkand': 'Samarkand',
    'Asia/Tashkent': 'Tashkent'
  },
  'VU': {
    'Pacific/Efate': 'Efate'
  },
  'VA': {
    'Europe/Vatican': 'Vatican'
  },
  'VE': {
    'America/Caracas': 'Caracas'
  },
  'VN': {
    'Asia/Ho_Chi_Minh': 'Ho Chi Minh'
  },
  'EH': {
    'Africa/El_Aaiun': 'El Aaiun'
  },
  'YE': {
    'Asia/Aden': 'Aden'
  },
  'ZM': {
    'Africa/Lusaka': 'Lusaka'
  },
  'ZW': {
    'Africa/Harare': 'Harare'
  }
};

/* ==========================================================
 * bootstrap-formhelpers-colorpicker.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
 
+function ($) {

  'use strict';
  
  
  /* COLORPICKER CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=bfh-colorpicker]',
      BFHColorPicker = function (element, options) {
        this.options = $.extend({}, $.fn.bfhcolorpicker.defaults, options);
        this.$element = $(element);

        this.initPopover();
      };

  BFHColorPicker.prototype = {

    constructor: BFHColorPicker,

    initPalette: function() {
      var $canvas,
          context,
          gradient;
          
      $canvas = this.$element.find('canvas');
      context = $canvas[0].getContext('2d');
      
      gradient = context.createLinearGradient(0, 0, $canvas.width(), 0);
      
      gradient.addColorStop(0,    'rgb(255, 255, 255)');
      gradient.addColorStop(0.1,  'rgb(255,   0,   0)');
      gradient.addColorStop(0.25, 'rgb(255,   0, 255)');
      gradient.addColorStop(0.4,  'rgb(0,     0, 255)');
      gradient.addColorStop(0.55, 'rgb(0,   255, 255)');
      gradient.addColorStop(0.7,  'rgb(0,   255,   0)');
      gradient.addColorStop(0.85, 'rgb(255, 255,   0)');
      gradient.addColorStop(1,    'rgb(255,   0,   0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      
      gradient = context.createLinearGradient(0, 0, 0, $canvas.height());
      gradient.addColorStop(0,   'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
      gradient.addColorStop(1,   'rgba(0,     0,   0, 1)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    },
    
    initPopover: function() {
      var iconLeft,
          iconRight;

      iconLeft = '';
      iconRight = '';
      if (this.options.align === 'right') {
        iconRight = '<span class="input-group-addon"><span class="bfh-colorpicker-icon"></span></span>';
      } else {
        iconLeft = '<span class="input-group-addon"><span class="bfh-colorpicker-icon"></span></span>';
      }

      this.$element.html(
        '<div class="input-group bfh-colorpicker-toggle" data-toggle="bfh-colorpicker">' +
        iconLeft +
        '<input type="text" name="' + this.options.name + '" class="' + this.options.input + '" placeholder="' + this.options.placeholder + '" readonly>' +
        iconRight +
        '</div>' +
        '<div class="bfh-colorpicker-popover">' +
        '<canvas class="bfh-colorpicker-palette" width="384" height="256"></canvas>' +
        '</div>'
      );

      this.$element
        .on('click.bfhcolorpicker.data-api touchstart.bfhcolorpicker.data-api', toggle, BFHColorPicker.prototype.toggle)
        .on('mousedown.bfhcolorpicker.data-api', 'canvas', BFHColorPicker.prototype.mouseDown)
        .on('click.bfhcolorpicker.data-api touchstart.bfhcolorpicker.data-api', '.bfh-colorpicker-popover', function() { return false; });

      this.initPalette();
      
      this.$element.val(this.options.color);
    },
    
    updateVal: function(positionX, positionY) {
      var $canvas,
          context,
          colorX,
          colorY,
          snappiness,
          imageData,
          newColor;
      
      snappiness = 5;
      
      $canvas = this.$element.find('canvas');
      context = $canvas[0].getContext('2d');
      
      colorX = positionX - $canvas.offset().left;
      colorY = positionY - $canvas.offset().top;
      
      colorX = Math.round(colorX / snappiness) * snappiness;
      colorY = Math.round(colorY / snappiness) * snappiness;
      
      if (colorX < 0) {
        colorX = 0;
      }
      if (colorX >= $canvas.width()) {
        colorX = $canvas.width() - 1;
      }
      
      if (colorY < 0) {
        colorY = 0;
      }
      if (colorY > $canvas.height()) {
        colorY = $canvas.height();
      }
      
      imageData = context.getImageData(colorX, colorY, 1, 1);
      newColor = rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
      
      if (newColor !== this.$element.val()) {
        this.$element.val(newColor);
        
        this.$element.trigger('change.bfhcolorpicker');
      }
    },
    
    mouseDown: function(e) {
      var $this,
          $parent;
      
      $this = $(this);
      $parent = getParent($this);
      
      $(document)
        .on('mousemove.bfhcolorpicker.data-api', {colorpicker: $parent}, BFHColorPicker.prototype.mouseMove)
        .one('mouseup.bfhcolorpicker.data-api', {colorpicker: $parent}, BFHColorPicker.prototype.mouseUp);
    },
    
    mouseMove: function(e) {
      var $this;
      
      $this = e.data.colorpicker;
      
      $this.data('bfhcolorpicker').updateVal(e.pageX, e.pageY);
    },
    
    mouseUp: function(e) {
      var $this;
      
      $this = e.data.colorpicker;
      
      $this.data('bfhcolorpicker').updateVal(e.pageX, e.pageY);
      
      $(document).off('mousemove.bfhcolorpicker.data-api');
      
      if ($this.data('bfhcolorpicker').options.close === true) {
        clearMenus();
      }
    },

    toggle: function (e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhcolorpicker'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhcolorpicker');

        $this.focus();
      }

      return false;
    }
  };
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
      
  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhcolorpicker'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhcolorpicker');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-colorpicker');
  }
  
  
  /* COLORPICKER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhcolorpicker;

  $.fn.bfhcolorpicker = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhcolorpicker');
      options = typeof option === 'object' && option;
      this.type = 'bfhcolorpicker';

      if (!data) {
        $this.data('bfhcolorpicker', (data = new BFHColorPicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhcolorpicker.Constructor = BFHColorPicker;

  $.fn.bfhcolorpicker.defaults = {
    align: 'left',
    input: 'form-control',
    placeholder: '',
    name: '',
    color: '#000000',
    close: true
  };
  
  
  /* COLORPICKER NO CONFLICT
   * ========================== */

  $.fn.bfhcolorpicker.noConflict = function () {
    $.fn.bfhcolorpicker = old;
    return this;
  };
  
  
  /* COLORPICKER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-colorpicker')) {
        return $(el).find('input[type="text"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      if ($(el).hasClass('bfh-colorpicker')) {
        $(el).find('.bfh-colorpicker-icon').css('background-color', val);
        $(el).find('input[type="text"]').val(val);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };
  
  
  /* COLORPICKER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-colorpicker').each(function () {
      var $colorpicker;

      $colorpicker = $(this);

      $colorpicker.bfhcolorpicker($colorpicker.data());
    });
  });
  
  
  /* APPLY TO STANDARD COLORPICKER ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhcolorpicker.data-api', clearMenus);

}(window.jQuery);
/* ==========================================================
 * bootstrap-formhelpers-countries.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* COUNTRIES CLASS DEFINITION
   * ====================== */

  var BFHCountries = function (element, options) {
    this.options = $.extend({}, $.fn.bfhcountries.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addCountries();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapCountries();
    }

    if (this.$element.is('span')) {
      this.displayCountry();
    }
  };

  BFHCountries.prototype = {

    constructor: BFHCountries,

    getCountries: function() {
      var country,
          countries;

      if (this.options.available) {
        if (typeof this.options.available === 'string') {
          countries = [];
  
          this.options.available = this.options.available.split(',');
  
          for (country in BFHCountriesList) {
            if (BFHCountriesList.hasOwnProperty(country)) {
              if ($.inArray(country, this.options.available) >= 0) {
                countries[country] = BFHCountriesList[country];
              }
            }
          }
        } else {
          countries = this.options.available;
        }

        return countries;
      } else {
        return BFHCountriesList;
      }
    },

    addCountries: function () {
      var value,
          country,
          countries;

      value = this.options.country;
      countries = this.getCountries();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (country in countries) {
        if (countries.hasOwnProperty(country)) {
          this.$element.append('<option value="' + country + '">' + countries[country] + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapCountries: function() {
      var $input,
          $toggle,
          $options,
          value,
          country,
          countries;

      value = this.options.country;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      countries = this.getCountries();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (country in countries) {
        if (countries.hasOwnProperty(country)) {
          if (this.options.flags === true) {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + country + '"><i class="glyphicon bfh-flag-' + country + '"></i>' + countries[country] + '</a></li>');
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + country + '">' + countries[country] + '</a></li>');
          }
        }
      }

      this.$element.val(value);
    },

    displayCountry: function () {
      var value;

      value = this.options.country;

      if (this.options.flags === true) {
        this.$element.html('<i class="glyphicon bfh-flag-' + value + '"></i> ' + BFHCountriesList[value]);
      } else {
        this.$element.html(BFHCountriesList[value]);
      }
    }

  };


  /* COUNTRY PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhcountries;

  $.fn.bfhcountries = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhcountries');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhcountries', (data = new BFHCountries(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhcountries.Constructor = BFHCountries;

  $.fn.bfhcountries.defaults = {
    country: '',
    available: '',
    flags: false,
    blank: true
  };


  /* COUNTRY NO CONFLICT
   * ========================== */

  $.fn.bfhcountries.noConflict = function () {
    $.fn.bfhcountries = old;
    return this;
  };


  /* COUNTRY DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-countries, span.bfh-countries, div.bfh-countries').each(function () {
      var $countries;

      $countries = $(this);

      if ($countries.hasClass('bfh-selectbox')) {
        $countries.bfhselectbox($countries.data());
      }
      $countries.bfhcountries($countries.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-currencies.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2013 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* COUNTRIES CLASS DEFINITION
   * ====================== */

  var BFHCurrencies = function (element, options) {
    this.options = $.extend({}, $.fn.bfhcurrencies.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addCurrencies();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapCurrencies();
    }

    if (this.$element.is('span')) {
      this.displayCurrency();
    }
  };

  BFHCurrencies.prototype = {

    constructor: BFHCurrencies,

    getCurrencies: function () {
      var currency,
          currencies;

      if (this.options.available) {
        currencies = [];

        this.options.available = this.options.available.split(',');

        for (currency in BFHCurrenciesList) {
          if (BFHCurrenciesList.hasOwnProperty(currency)) {
            if ($.inArray(currency, this.options.available) >= 0) {
              currencies[currency] = BFHCurrenciesList[currency];
            }
          }
        }

        return currencies;
      } else {
        return BFHCurrenciesList;
      }
    },

    addCurrencies: function () {
      var value,
          currency,
          currencies;

      value = this.options.currency;
      currencies = this.getCurrencies();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (currency in currencies) {
        if (currencies.hasOwnProperty(currency)) {
          this.$element.append('<option value="' + currency + '">' + currencies[currency].label + '</option>');
        }
      }

      this.$element.val(value);
    },


    addBootstrapCurrencies: function() {
      var $input,
          $toggle,
          $options,
          value,
          currency,
          currencies,
          flag;

      value = this.options.currency;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      currencies = this.getCurrencies();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (currency in currencies) {
        if (currencies.hasOwnProperty(currency)) {
          if (this.options.flags === true) {
            if (currencies[currency].currencyflag) {
              flag = currencies[currency].currencyflag;
            } else {
              flag = currency.substr(0,2);
            }
            $options.append('<li><a tabindex="-1" href="#" data-option="' + currency +  '"><i class="glyphicon bfh-flag-' + flag + '"></i>' + currencies[currency].label + '</a></li>');
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + currency + '">' + currencies[currency].label + '</a></li>');
          }
        }
      }

      this.$element.val(value);
    },

    displayCurrency: function () {
      var value,
          flag;

      value = this.options.currency;

      if (this.options.flags === true) {
        if (BFHCurrenciesList[value].currencyflag) {
          flag = BFHCurrenciesList[value].currencyflag;
        } else {
          flag = value.substr(0,2);
        }
        this.$element.html('<i class="glyphicon bfh-flag-' + flag + '"></i> ' + BFHCurrenciesList[value].label);
      } else {
        this.$element.html(BFHCurrenciesList[value].label);
      }
    }

  };


  /* CURRENCY PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhcurrencies;

  $.fn.bfhcurrencies = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhcurrencies');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhcurrencies', (data = new BFHCurrencies(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhcurrencies.Constructor = BFHCurrencies;

  $.fn.bfhcurrencies.defaults = {
    currency: '',
    available: '',
    flags: false,
    blank: true
  };


  /* CURRENCY NO CONFLICT
   * ========================== */

  $.fn.bfhcurrencies.noConflict = function () {
    $.fn.bfhcurrencies = old;
    return this;
  };


  /* CURRENCY DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-currencies, span.bfh-currencies, div.bfh-currencies').each(function () {
      var $currencies;

      $currencies = $(this);

      if ($currencies.hasClass('bfh-selectbox')) {
        $currencies.bfhselectbox($currencies.data());
      }
      $currencies.bfhcurrencies($currencies.data());
    });
  });


}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-datepicker.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* BFHDATEPICKER CLASS DEFINITION
   * ========================= */

  var toggle = '[data-toggle=bfh-datepicker]',
      BFHDatePicker = function (element, options) {
        this.options = $.extend({}, $.fn.bfhdatepicker.defaults, options);
        this.$element = $(element);

        this.initCalendar();
      };

  BFHDatePicker.prototype = {

    constructor: BFHDatePicker,

    setDate: function() {
      var date,
          today,
          format;

      date = this.options.date;
      format = this.options.format;

      if (date === '' || date === 'today' || date === undefined) {
        today = new Date();

        if (date === 'today') {
          this.$element.val(formatDate(format, today.getMonth(), today.getFullYear(), today.getDate()));
        }

        this.$element.data('month', today.getMonth());
        this.$element.data('year', today.getFullYear());
      } else {
        this.$element.val(date);
        this.$element.data('month', Number(getDatePart(format, date, 'm') - 1));
        this.$element.data('year', Number(getDatePart(format, date, 'y')));
      }
    },

    setDateLimit: function(date, limitPrefix) {
      var today,
          format;

      format = this.options.format;

      if (date !== '') {
        this.$element.data(limitPrefix + 'limit', true);

        if (date === 'today') {
          today = new Date();

          this.$element.data(limitPrefix + 'day', today.getDate());
          this.$element.data(limitPrefix + 'month', today.getMonth());
          this.$element.data(limitPrefix + 'year', today.getFullYear());
        } else {
          this.$element.data(limitPrefix + 'day', Number(getDatePart(format, date, 'd')));
          this.$element.data(limitPrefix + 'month', Number(getDatePart(format, date, 'm') - 1));
          this.$element.data(limitPrefix + 'year', Number(getDatePart(format, date, 'y')));
        }
      } else {
        this.$element.data(limitPrefix + 'limit', false);
      }
    },

    initCalendar: function() {
      var iconLeft,
          iconRight,
          iconAddon;

      iconLeft = '';
      iconRight = '';
      iconAddon = '';
      if (this.options.icon !== '') {
        if (this.options.align === 'right') {
          iconRight = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        } else {
          iconLeft = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        }
        iconAddon = 'input-group';
      }

      this.$element.html(
        '<div class="' + iconAddon + ' bfh-datepicker-toggle" data-toggle="bfh-datepicker">' +
        iconLeft +
        '<input type="text" name="' + this.options.name + '" class="' + this.options.input + '" placeholder="' + this.options.placeholder + '" readonly>' +
        iconRight +
        '</div>' +
        '<div class="bfh-datepicker-calendar">' +
        '<table class="calendar table table-bordered">' +
        '<thead>' +
        '<tr class="months-header">' +
        '<th class="month" colspan="4">' +
        '<a class="previous" href="#"><i class="glyphicon glyphicon-chevron-left"></i></a>' +
        '<span></span>' +
        '<a class="next" href="#"><i class="glyphicon glyphicon-chevron-right"></i></a>' +
        '</th>' +
        '<th class="year" colspan="3">' +
        '<a class="previous" href="#"><i class="glyphicon glyphicon-chevron-left"></i></a>' +
        '<span></span>' +
        '<a class="next" href="#"><i class="glyphicon glyphicon-chevron-right"></i></a>' +
        '</th>' +
        '</tr>' +
        '<tr class="days-header">' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '</table>' +
        '</div>'
      );

      this.$element
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', toggle, BFHDatePicker.prototype.toggle)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .month > .previous', BFHDatePicker.prototype.previousMonth)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .month > .next', BFHDatePicker.prototype.nextMonth)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .year > .previous', BFHDatePicker.prototype.previousYear)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .year > .next', BFHDatePicker.prototype.nextYear)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar td:not(.off)', BFHDatePicker.prototype.select)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar', function() { return false; });

      this.setDate();
      this.setDateLimit(this.options.min, 'lower');
      this.setDateLimit(this.options.max, 'higher');

      this.updateCalendar();
    },

    updateCalendarHeader: function($calendar, month, year) {
      var $daysHeader,
          day;

      $calendar.find('table > thead > tr > th.month > span').text(BFHMonthsList[month]);
      $calendar.find('table > thead > tr > th.year > span').text(year);

      $daysHeader = $calendar.find('table > thead > tr.days-header');
      $daysHeader.html('');
      for (day=BFHDayOfWeekStart; day < BFHDaysList.length; day=day+1) {
        $daysHeader.append('<th>' + BFHDaysList[day] + '</th>');
      }
      for (day=0; day < BFHDayOfWeekStart; day=day+1) {
        $daysHeader.append('<th>' + BFHDaysList[day] + '</th>');
      }
    },

    checkMinDate: function(day, month, year) {
      var lowerlimit,
          lowerday,
          lowermonth,
          loweryear;

      lowerlimit = this.$element.data('lowerlimit');

      if (lowerlimit === true) {
        lowerday = this.$element.data('lowerday');
        lowermonth = this.$element.data('lowermonth');
        loweryear = this.$element.data('loweryear');

        if ((day < lowerday && month === lowermonth && year === loweryear) || (month < lowermonth && year === loweryear) || (year < loweryear)) {
          return true;
        }
      }

      return false;
    },

    checkMaxDate: function(day, month, year) {
      var higherlimit,
          higherday,
          highermonth,
          higheryear;

      higherlimit = this.$element.data('higherlimit');

      if (higherlimit === true) {
        higherday = this.$element.data('higherday');
        highermonth = this.$element.data('highermonth');
        higheryear = this.$element.data('higheryear');

        if ((day > higherday && month === highermonth && year === higheryear) || (month > highermonth && year === higheryear) || (year > higheryear)) {
          return true;
        }
      }

      return false;
    },

    checkToday: function(day, month, year) {
      var today;

      today = new Date();

      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        return true;
      }

      return false;
    },

    updateCalendarDays: function($calendar, month, year) {
      var $days,
          numDaysPreviousMonth,
          numDaysCurrentMonth,
          firstDay,
          lastDay,
          row,
          day;

      $days = $calendar.find('table > tbody').html('');
      numDaysPreviousMonth = getNumDaysInMonth(month, year);
      numDaysCurrentMonth = getNumDaysInMonth(month + 1, year);
      firstDay = getDayOfWeek(month, year, 1);
      lastDay = getDayOfWeek(month, year, numDaysCurrentMonth);

      row = '';
      for (day=0; day < (firstDay - BFHDayOfWeekStart + 7) % 7; day=day+1) {
        row += '<td class="off">' + (numDaysPreviousMonth - (firstDay - BFHDayOfWeekStart + 7) % 7 + day + 1) + '</td>';
      }

      for (day=1; day <= numDaysCurrentMonth; day=day+1) {
        if (this.checkMinDate(day, month, year)) {
          row += '<td data-day="' + day + '" class="off">' + day + '</td>';
        } else if (this.checkMaxDate(day, month, year)) {
          row += '<td data-day="' + day + '" class="off">' + day + '</td>';
        } else if (this.checkToday(day, month, year)) {
          row += '<td data-day="' + day + '" class="today">' + day + '</td>';
        } else {
          row += '<td data-day="' + day + '">' + day + '</td>';
        }
        if (getDayOfWeek(month, year, day) === (6 + BFHDayOfWeekStart) % 7) {
          $days.append('<tr>' + row + '</tr>');
          row = '';
        }
      }

      for (day=1; day <= (7 - ((lastDay + 1 - BFHDayOfWeekStart + 7) % 7)) % 7 + 1; day=day+1) {
        row += '<td class="off">' + day + '</td>';
        if (day === (7 - ((lastDay + 1 - BFHDayOfWeekStart + 7) % 7)) % 7) {
          $days.append('<tr>' + row + '</tr>');
        }
      }
    },

    updateCalendar: function () {
      var $calendar,
          month,
          year;

      $calendar = this.$element.find('.bfh-datepicker-calendar');
      month = this.$element.data('month');
      year = this.$element.data('year');

      this.updateCalendarHeader($calendar, month, year);
      this.updateCalendarDays($calendar, month, year);
    },

    previousMonth: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      if (Number($parent.data('month')) === 0) {
        $parent.data('month', 11);
        $parent.data('year', Number($parent.data('year')) - 1);
      } else {
        $parent.data('month', Number($parent.data('month')) - 1);
      }

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    nextMonth: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      if (Number($parent.data('month')) === 11) {
        $parent.data('month', 0);
        $parent.data('year', Number($parent.data('year')) + 1);
      } else {
        $parent.data('month', Number($parent.data('month')) + 1);
      }

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    previousYear: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      $parent.data('year', Number($parent.data('year')) - 1);

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    nextYear: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      $parent.data('year', Number($parent.data('year')) + 1);

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    select: function (e) {
      var $this,
          $parent,
          $datePicker,
          month,
          year,
          day;

      $this = $(this);

      e.preventDefault();
      e.stopPropagation();

      $parent = getParent($this);
      $datePicker = $parent.data('bfhdatepicker');
      month = $parent.data('month');
      year = $parent.data('year');
      day = $this.data('day');

      $parent.val(formatDate($datePicker.options.format, month, year, day));
      $parent.trigger('change.bfhdatepicker');

      if ($datePicker.options.close === true) {
        clearMenus();
      }
    },

    toggle: function (e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhdatepicker'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhdatepicker');

        $this.focus();
      }

      return false;
    }
  };

  function getNumDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function getDayOfWeek(month, year, day) {
    return new Date(year, month, day).getDay();
  }

  function formatDate(format, month, year, day) {
    month += 1;
    month = String(month);
    day = String(day);

    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return format.replace('m', month).replace('y', year).replace('d', day);
  }

  function getDatePart(format, date, part) {
    var partPositions,
        partPosition,
        parts;

    partPositions = [
      {'part': 'm', 'position': format.indexOf('m')},
      {'part': 'y', 'position': format.indexOf('y')},
      {'part': 'd', 'position': format.indexOf('d')}
    ];

    partPositions.sort(function(a, b) {return a.position - b.position;});

    parts = date.match(/(\d+)/g);

    for (partPosition in partPositions) {
      if (partPositions.hasOwnProperty(partPosition)) {
        if (partPositions[partPosition].part === part) {
          return Number(parts[partPosition]).toString();
        }
      }
    }
  }

  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhdatepicker'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhdatepicker');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-datepicker');
  }


  /* DATEPICKER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhdatepicker;

  $.fn.bfhdatepicker = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhdatepicker');
      options = typeof option === 'object' && option;
      this.type = 'bfhdatepicker';

      if (!data) {
        $this.data('bfhdatepicker', (data = new BFHDatePicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhdatepicker.Constructor = BFHDatePicker;

  $.fn.bfhdatepicker.defaults = {
    icon: 'glyphicon glyphicon-calendar',
    align: 'left',
    input: 'form-control',
    placeholder: '',
    name: '',
    date: 'today',
    format: 'm/d/y',
    min: '',
    max: '',
    close: true
  };


  /* DATEPICKER NO CONFLICT
   * ========================== */

  $.fn.bfhdatepicker.noConflict = function () {
    $.fn.bfhdatepicker = old;
    return this;
  };


  /* DATEPICKER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-datepicker')) {
        return $(el).find('input[type="text"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      if ($(el).hasClass('bfh-datepicker')) {
        $(el).find('input[type="text"]').val(val);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* DATEPICKER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-datepicker').each(function () {
      var $datepicker;

      $datepicker = $(this);

      $datepicker.bfhdatepicker($datepicker.data());
    });
  });


  /* APPLY TO STANDARD DATEPICKER ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhdatepicker.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-fonts.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* FONTS CLASS DEFINITION
   * ====================== */

  var BFHFonts = function (element, options) {
    this.options = $.extend({}, $.fn.bfhfonts.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addFonts();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapFonts();
    }
  };

  BFHFonts.prototype = {

    constructor: BFHFonts,

    getFonts: function() {
      var font,
          fonts;

      if (this.options.available) {
        fonts = [];

        this.options.available = this.options.available.split(',');

        for (font in BFHFontsList) {
          if (BFHFontsList.hasOwnProperty(font)) {
            if ($.inArray(font, this.options.available) >= 0) {
              fonts[font] = BFHFontsList[font];
            }
          }
        }

        return fonts;
      } else {
        return BFHFontsList;
      }
    },

    addFonts: function () {
      var value,
          font,
          fonts;

      value = this.options.font;
      fonts = this.getFonts();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          this.$element.append('<option value="' + font + '">' + font + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapFonts: function() {
      var $input,
          $toggle,
          $options,
          value,
          font,
          fonts;

      value = this.options.font;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      fonts = this.getFonts();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          $options.append('<li><a tabindex="-1" href="#" style=\'font-family: ' + fonts[font] + '\' data-option="' + font + '">' + font + '</a></li>');
        }
      }

      this.$element.val(value);
    }

  };


  /* FONTS PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhfonts;

  $.fn.bfhfonts = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhfonts');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhfonts', (data = new BFHFonts(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhfonts.Constructor = BFHFonts;

  $.fn.bfhfonts.defaults = {
    font: '',
    available: '',
    blank: true
  };


  /* FONTS NO CONFLICT
   * ========================== */

  $.fn.bfhfonts.noConflict = function () {
    $.fn.bfhfonts = old;
    return this;
  };


  /* FONTS DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-fonts, span.bfh-fonts, div.bfh-fonts').each(function () {
      var $fonts;

      $fonts = $(this);

      if ($fonts.hasClass('bfh-selectbox')) {
        $fonts.bfhselectbox($fonts.data());
      }
      $fonts.bfhfonts($fonts.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-fontsizes.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* FONTSIZES CLASS DEFINITION
   * ====================== */

  var BFHFontSizes = function (element, options) {
    this.options = $.extend({}, $.fn.bfhfontsizes.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addFontSizes();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapFontSizes();
    }
  };

  BFHFontSizes.prototype = {

    constructor: BFHFontSizes,

    getFontsizes: function() {
      var fontsize,
          fontsizes;

      if (this.options.available) {
        fontsizes = [];

        this.options.available = this.options.available.split(',');

        for (fontsize in BFHFontSizesList) {
          if (BFHFontSizesList.hasOwnProperty(fontsize)) {
            if ($.inArray(fontsize, this.options.available) >= 0) {
              fontsizes[fontsize] = BFHFontSizesList[fontsize];
            }
          }
        }

        return fontsizes;
      } else {
        return BFHFontSizesList;
      }
    },

    addFontSizes: function () {
      var value,
          fontsize,
          fontsizes;

      value = this.options.fontsize;
      fontsizes = this.getFontsizes();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (fontsize in fontsizes) {
        if (fontsizes.hasOwnProperty(fontsize)) {
          this.$element.append('<option value="' + fontsize + '">' + fontsizes[fontsize] + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapFontSizes: function() {
      var $input,
          $toggle,
          $options,
          value,
          fontsize,
          fontsizes;

      value = this.options.fontsize;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      fontsizes = this.getFontsizes();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (fontsize in fontsizes) {
        if (fontsizes.hasOwnProperty(fontsize)) {
          $options.append('<li><a tabindex="-1" href="#" data-option="' + fontsize + '">' + fontsizes[fontsize] + '</a></li>');
        }
      }

      this.$element.val(value);
    }

  };


  /* FONTSIZES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhfontsizes;

  $.fn.bfhfontsizes = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhfontsizes');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhfontsizes', (data = new BFHFontSizes(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhfontsizes.Constructor = BFHFontSizes;

  $.fn.bfhfontsizes.defaults = {
    fontsize: '',
    available: '',
    blank: true
  };


  /* FONTSIZES NO CONFLICT
   * ========================== */

  $.fn.bfhfontsizes.noConflict = function () {
    $.fn.bfhfontsizes = old;
    return this;
  };


  /* FONTSIZES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-fontsizes, span.bfh-fontsizes, div.bfh-fontsizes').each(function () {
      var $fontSizes;

      $fontSizes = $(this);

      if ($fontSizes.hasClass('bfh-selectbox')) {
        $fontSizes.bfhselectbox($fontSizes.data());
      }
      $fontSizes.bfhfontsizes($fontSizes.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-googlefonts.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* GOOGLE FONTS CLASS DEFINITION
   * ====================== */

  var BFHGoogleFonts = function (element, options) {
    this.options = $.extend({}, $.fn.bfhgooglefonts.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addFonts();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapFonts();
    }
  };

  BFHGoogleFonts.prototype = {

    constructor: BFHGoogleFonts,

    getFonts: function() {
      var font,
          fonts;

      fonts = [];

      if (this.options.subset) {
        for (font in BFHGoogleFontsList.items) {
          if (BFHGoogleFontsList.items.hasOwnProperty(font)) {
            if ($.inArray(this.options.subset, BFHGoogleFontsList.items[font].subsets) >= 0) {
              fonts[BFHGoogleFontsList.items[font].family] = {
                'info': BFHGoogleFontsList.items[font],
                'index': parseInt(font, 10)
              };
            }
          }
        }
      } else if (this.options.available) {
        this.options.available = this.options.available.split(',');

        for (font in BFHGoogleFontsList.items) {
          if (BFHGoogleFontsList.items.hasOwnProperty(font)) {
            if ($.inArray(BFHGoogleFontsList.items[font].family, this.options.available) >= 0) {
              fonts[BFHGoogleFontsList.items[font].family] = {
                'info': BFHGoogleFontsList.items[font],
                'index': parseInt(font, 10)
              };
            }
          }
        }
      } else {
        for (font in BFHGoogleFontsList.items) {
          if (BFHGoogleFontsList.items.hasOwnProperty(font)) {
            fonts[BFHGoogleFontsList.items[font].family] = {
              'info': BFHGoogleFontsList.items[font],
              'index': parseInt(font, 10)
            };
          }
        }
      }

      return fonts;
    },

    addFonts: function () {
      var value,
          font,
          fonts;

      value = this.options.font;
      fonts = this.getFonts();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          this.$element.append('<option value="' + fonts[font].info.family + '">' + fonts[font].info.family + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapFonts: function() {
      var $input,
          $toggle,
          $options,
          value,
          font,
          fonts;

      value = this.options.font;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      fonts = this.getFonts();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option="" style="background-image: none;"></a></li>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          $options.append('<li><a tabindex="-1" href="#" style="background-position: 0 -' + ((fonts[font].index * 30) - 2) + 'px;" data-option="' + fonts[font].info.family + '">' + fonts[font].info.family + '</a></li>');
        }
      }

      this.$element.val(value);
    }

  };


  /* GOOGLE FONTS PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhgooglefonts;

  $.fn.bfhgooglefonts = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhgooglefonts');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhgooglefonts', (data = new BFHGoogleFonts(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhgooglefonts.Constructor = BFHGoogleFonts;

  $.fn.bfhgooglefonts.defaults = {
    font: '',
    available: '',
    subset: '',
    blank: true
  };


  /* GOOGLE FONTS NO CONFLICT
   * ========================== */

  $.fn.bfhgooglefonts.noConflict = function () {
    $.fn.bfhgooglefonts = old;
    return this;
  };


  /* GOOGLE FONTS DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-googlefonts, span.bfh-googlefonts, div.bfh-googlefonts').each(function () {
      var $googleFonts;

      $googleFonts = $(this);

      if ($googleFonts.hasClass('bfh-selectbox')) {
        $googleFonts.bfhselectbox($googleFonts.data());
      }
      $googleFonts.bfhgooglefonts($googleFonts.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-languages.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * Contribution 2013 Tomasz Kuter
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* LANGUAGES CLASS DEFINITION
   * ====================== */

  var BFHLanguages = function (element, options) {
    this.options = $.extend({}, $.fn.bfhlanguages.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addLanguages();
    }

    if (this.$element.is('span')) {
      this.displayLanguage();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapLanguages();
    }
  };

  BFHLanguages.prototype = {

    constructor: BFHLanguages,

    getLanguages: function () {
      var split,
          language,
          languages;

      if (this.options.available) {
        languages = [];

        this.options.available = this.options.available.split(',');

        for (language in this.options.available) {
          if (this.options.available.hasOwnProperty(language)) {
            if (this.options.available[language].indexOf('_') !== -1) {
              split = this.options.available[language].split('_');
              languages[split[0]] = {name: BFHLanguagesList[split[0]], country: split[1]};
            } else {
              languages[this.options.available[language]] = BFHLanguagesList[this.options.available[language]];
            }
          }
        }

        return languages;
      } else {
        return BFHLanguagesList;
      }
    },

    addLanguages: function () {
      var split,
          value,
          languages,
          language;

      value = this.options.language;
      languages = this.getLanguages();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (language in languages) {
        if (languages.hasOwnProperty(language)) {
          if (languages[language].hasOwnProperty('name')) {
            this.$element.append('<option value="' + language + '_' + languages[language].country + '">' + languages[language].name.toProperCase() + ' (' + BFHCountriesList[languages[language].country] + ')</option>');
          } else {
            this.$element.append('<option value="' + language + '">' + languages[language].toProperCase() + '</option>');
          }
        }
      }

      this.$element.val(value);
    },

    addBootstrapLanguages: function() {
      var $input,
          $toggle,
          $options,
          value,
          languages,
          language,
          split;

      value = this.options.language;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      languages = this.getLanguages();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (language in languages) {
        if (languages.hasOwnProperty(language)) {
          if (languages[language].hasOwnProperty('name')) {
            if (this.options.flags === true) {
              $options.append('<li><a tabindex="-1" href="#" data-option="' + language + '_' + languages[language].country + '"><i class="glyphicon bfh-flag-' + languages[language].country + '"></i>' + languages[language].name.toProperCase() + '</a></li>');
            } else {
              $options.append('<li><a tabindex="-1" href="#" data-option="' + language + '_' + languages[language].country + '">' + languages[language].name.toProperCase() + ' (' + BFHCountriesList[languages[language].country] + ')</a></li>');
            }
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + language + '">' + languages[language] + '</a></li>');
          }
        }
      }

      this.$element.val(value);
    },

    displayLanguage: function () {
      var value;

      value = this.options.language;

      if (value.indexOf('_') !== -1) {
        value = value.split('_');
        if (this.options.flags === true) {
          this.$element.html('<i class="glyphicon bfh-flag-' + value[1] + '"></i> ' + BFHLanguagesList[value[0]].toProperCase());
        } else {
          this.$element.html(BFHLanguagesList[value[0]].toProperCase() + ' (' + BFHCountriesList[value[1]] + ')');
        }
      } else {
        this.$element.html(BFHLanguagesList[value].toProperCase());
      }
    }

  };


  /* LANGUAGES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhlanguages;

  $.fn.bfhlanguages = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhlanguages');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhlanguages', (data = new BFHLanguages(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhlanguages.Constructor = BFHLanguages;

  $.fn.bfhlanguages.defaults = {
    language: '',
    available: '',
    flags: false,
    blank: true
  };


  /* LANGUAGES NO CONFLICT
   * ========================== */

  $.fn.bfhlanguages.noConflict = function () {
    $.fn.bfhlanguages = old;
    return this;
  };


  /* LANGUAGES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-languages, span.bfh-languages, div.bfh-languages').each(function () {
      var $languages;

      $languages = $(this);

      if ($languages.hasClass('bfh-selectbox')) {
        $languages.bfhselectbox($languages.data());
      }
      $languages.bfhlanguages($languages.data());
    });
  });


  /* LANGUAGES HELPERS
   * ============== */

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-number.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* NUMBER CLASS DEFINITION
   * ====================== */

  var BFHNumber = function (element, options) {
    this.options = $.extend({}, $.fn.bfhnumber.defaults, options);
    this.$element = $(element);

    this.initInput();
  };

  BFHNumber.prototype = {

    constructor: BFHNumber,

    initInput: function() {
      var value;
      
      if (this.options.buttons === true) {
        this.$element.wrap('<div class="input-group"></div>');
        this.$element.parent().append('<span class="input-group-addon bfh-number-btn inc"><span class="glyphicon glyphicon-chevron-up"></span></span>');
        this.$element.parent().append('<span class="input-group-addon bfh-number-btn dec"><span class="glyphicon glyphicon-chevron-down"></span></span>');
      }
      
      this.$element.on('change.bfhnumber.data-api', BFHNumber.prototype.change);
        
      if (this.options.keyboard === true) {
        this.$element.on('keydown.bfhnumber.data-api', BFHNumber.prototype.keydown);
      }
      
      if (this.options.buttons === true) {
        this.$element.parent()
          .on('mousedown.bfhnumber.data-api', '.inc', BFHNumber.prototype.btninc)
          .on('mousedown.bfhnumber.data-api', '.dec', BFHNumber.prototype.btndec);
      }
      
      this.formatNumber();
    },
    
    keydown: function(e) {
      var $this;
      
      $this = $(this).data('bfhnumber');
      
      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }
      
      switch (e.which) {
        case 38:
          $this.increment();
          break;
        case 40:
          $this.decrement();
          break;
        default:
      }
      
      return true;
    },
    
    mouseup: function(e) {
      var $this,
          timer,
          interval;
      
      $this = e.data.btn;
      timer = $this.$element.data('timer');
      interval = $this.$element.data('interval');
      
      clearTimeout(timer);
      clearInterval(interval);
    },
    
    btninc: function() {
      var $this,
          timer;
      
      $this = $(this).parent().find('.bfh-number').data('bfhnumber');
      
      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }
      
      $this.increment();
      
      timer = setTimeout(function() {
        var interval;
        interval = setInterval(function() {
          $this.increment();
        }, 80);
        $this.$element.data('interval', interval);
      }, 750);
      $this.$element.data('timer', timer);
      
      $(document).one('mouseup', {btn: $this}, BFHNumber.prototype.mouseup);
      
      return true;
    },
    
    btndec: function() {
      var $this,
          timer;
      
      $this = $(this).parent().find('.bfh-number').data('bfhnumber');
      
      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }
      
      $this.decrement();
      
      timer = setTimeout(function() {
        var interval;
        interval = setInterval(function() {
          $this.decrement();
        }, 80);
        $this.$element.data('interval', interval);
      }, 750);
      $this.$element.data('timer', timer);
      
      $(document).one('mouseup', {btn: $this}, BFHNumber.prototype.mouseup);
      
      return true;
    },
    
    change: function() {
      var $this;

      $this = $(this).data('bfhnumber');

      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }

      $this.formatNumber();

      return true;
    },
    
    increment: function() {
      var value;
      
      value = this.getValue();
      
      value = value + 1;
      
      this.$element.val(value).change();
    },
    
    decrement: function() {
      var value;
      
      value = this.getValue();
      
      value = value - 1;
      
      this.$element.val(value).change();
    },
    
    getValue: function() {
      var value;
      
      value = this.$element.val();
      if (value !== '-1') {
        value = String(value).replace(/\D/g, '');
      }
      if (String(value).length === 0) {
        value = this.options.min;
      }
      
      return parseInt(value);
    },
    
    formatNumber: function() {
      var value,
          maxLength,
          length,
          zero;
      
      value = this.getValue();
      
      if (value > this.options.max) {
        if (this.options.wrap === true) {
          value = this.options.min;
        } else {
          value = this.options.max;
        }
      }
      
      if (value < this.options.min) {
        if (this.options.wrap === true) {
          value = this.options.max;
        } else {
          value = this.options.min;
        }
      }
      
      if (this.options.zeros === true) {
        maxLength = String(this.options.max).length;
        length = String(value).length;
        for (zero=length; zero < maxLength; zero = zero + 1) {
          value = '0' + value;
        }
      }
      
      if (value !== this.$element.val()) {
        this.$element.val(value);
      }
    }

  };

  /* NUMBER PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhnumber;

  $.fn.bfhnumber = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhnumber');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhnumber', (data = new BFHNumber(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhnumber.Constructor = BFHNumber;

  $.fn.bfhnumber.defaults = {
    min: 0,
    max: 9999,
    zeros: false,
    keyboard: true,
    buttons: true,
    wrap: false
  };


  /* NUMBER NO CONFLICT
   * ========================== */

  $.fn.bfhnumber.noConflict = function () {
    $.fn.bfhnumber = old;
    return this;
  };


  /* NUMBER DATA-API
   * ============== */

  $(document).ready( function () {
    $('form input[type="text"].bfh-number, form input[type="number"].bfh-number').each(function () {
      var $number;

      $number = $(this);

      $number.bfhnumber($number.data());
    });
  });


  /* APPLY TO STANDARD NUMBER ELEMENTS
   * =================================== */


}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-phone.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* PHONE CLASS DEFINITION
   * ====================== */

  var BFHPhone = function (element, options) {
    this.options = $.extend({}, $.fn.bfhphone.defaults, options);
    this.$element = $(element);

    if (this.$element.is('input[type="text"]') || this.$element.is('input[type="tel"]')) {
      this.addFormatter();
    }

    if (this.$element.is('span')) {
      this.displayFormatter();
    }
  };

  BFHPhone.prototype = {

    constructor: BFHPhone,

    addFormatter: function() {
      var $country;

      if (this.options.country !== '') {
        $country = $(document).find('#' + this.options.country);

        if ($country.length !== 0) {
          this.options.format = BFHPhoneFormatList[$country.val()];
          $country.on('change', {phone: this}, this.changeCountry);
        } else {
          this.options.format = BFHPhoneFormatList[this.options.country];
        }
      }
      
      this.$element.on('keyup.bfhphone.data-api', BFHPhone.prototype.change);

      this.loadFormatter();
    },

    loadFormatter: function () {
      var formattedNumber;

      formattedNumber = formatNumber(this.options.format, this.$element.val());

      this.$element.val(formattedNumber);
    },

    displayFormatter: function () {
      var formattedNumber;

      if (this.options.country !== '') {
        this.options.format = BFHPhoneFormatList[this.options.country];
      }

      formattedNumber = formatNumber(this.options.format, this.options.number);

      this.$element.html(formattedNumber);
    },

    changeCountry: function (e) {
      var $this,
          $phone;

      $this = $(this);
      $phone = e.data.phone;

      $phone.$element.val(String($phone.$element.val()).replace(/\+\d*/g, ''));
      $phone.options.format = BFHPhoneFormatList[$this.val()];

      $phone.loadFormatter();
    },

    change: function(e) {
      var $this,
          cursorPosition,
          cursorEnd,
          formattedNumber;

      $this = $(this).data('bfhphone');

      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }

      cursorPosition = getCursorPosition($this.$element[0]);

      cursorEnd = false;
      if (cursorPosition === $this.$element.val().length) {
        cursorEnd = true;
      }
      
      if (e.which === 8 && $this.options.format.charAt($this.$element.val().length) !== 'd') {
        $this.$element.val(String($this.$element.val()).substring(0, $this.$element.val().length - 1));
      }

      formattedNumber = formatNumber($this.options.format, $this.$element.val());
      
      if (formattedNumber === $this.$element.val()) {
        return true;
      }
      
      $this.$element.val(formattedNumber);

      if (cursorEnd) {
        cursorPosition = $this.$element.val().length;
      }

      setCursorPosition($this.$element[0], cursorPosition);

      return true;
    }

  };

  function formatNumber(format, number) {
    var formattedNumber,
        indexFormat,
        indexNumber,
        lastCharacter;

    formattedNumber = '';
    number = String(number).replace(/\D/g, '');

    for (indexFormat = 0, indexNumber = 0; indexFormat < format.length; indexFormat = indexFormat + 1) {
      if (/\d/g.test(format.charAt(indexFormat))) {
        if (format.charAt(indexFormat) === number.charAt(indexNumber)) {
          formattedNumber += number.charAt(indexNumber);
          indexNumber = indexNumber + 1;
        } else {
          formattedNumber += format.charAt(indexFormat);
        }
      } else if (format.charAt(indexFormat) !== 'd') {
        if (number.charAt(indexNumber) !== '' || format.charAt(indexFormat) === '+') {
          formattedNumber += format.charAt(indexFormat);
        }
      } else {
        if (number.charAt(indexNumber) === '') {
          formattedNumber += '';
        } else {
          formattedNumber += number.charAt(indexNumber);
          indexNumber = indexNumber + 1;
        }
      }
    }
    
    lastCharacter = format.charAt(formattedNumber.length);
    if (lastCharacter !== 'd') {
      formattedNumber += lastCharacter;
    }

    return formattedNumber;
  }

  function getCursorPosition($element) {
    var position = 0,
        selection;

    if (document.selection) {
      // IE Support
      $element.focus();
      selection = document.selection.createRange();
      selection.moveStart ('character', -$element.value.length);
      position = selection.text.length;
    } else if ($element.selectionStart || $element.selectionStart === 0) {
      position = $element.selectionStart;
    }

    return position;
  }

  function setCursorPosition($element, position) {
    var selection;

    if (document.selection) {
      // IE Support
      $element.focus ();
      selection = document.selection.createRange();
      selection.moveStart ('character', -$element.value.length);
      selection.moveStart ('character', position);
      selection.moveEnd ('character', 0);
      selection.select ();
    } else if ($element.selectionStart || $element.selectionStart === 0) {
      $element.selectionStart = position;
      $element.selectionEnd = position;
      $element.focus ();
    }
  }

  /* PHONE PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhphone;

  $.fn.bfhphone = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhphone');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhphone', (data = new BFHPhone(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhphone.Constructor = BFHPhone;

  $.fn.bfhphone.defaults = {
    format: '',
    number: '',
    country: ''
  };


  /* PHONE NO CONFLICT
   * ========================== */

  $.fn.bfhphone.noConflict = function () {
    $.fn.bfhphone = old;
    return this;
  };


  /* PHONE DATA-API
   * ============== */

  $(document).ready( function () {
    $('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function () {
      var $phone;

      $phone = $(this);

      $phone.bfhphone($phone.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-selectbox.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* SELECTBOX CLASS DEFINITION
   * ========================= */

  var toggle = '[data-toggle=bfh-selectbox]',
      BFHSelectBox = function (element, options) {
        this.options = $.extend({}, $.fn.bfhselectbox.defaults, options);
        this.$element = $(element);

        this.initSelectBox();
      };

  BFHSelectBox.prototype = {

    constructor: BFHSelectBox,

    initSelectBox: function () {
      var options;

      options = '';
      this.$element.find('div').each(function() {
        options = options + '<li><a tabindex="-1" href="#" data-option="' + $(this).data('value') + '">' + $(this).html() + '</a></li>';
      });

      this.$element.html(
        '<input type="hidden" name="' + this.options.name + '" value="">' +
		'<a class="bfh-selectbox-toggle ' + this.options.input + '" role="button" data-toggle="bfh-selectbox" href="#">' +
		'<span class="bfh-selectbox-option"></span>' +
		'<span class="' + this.options.icon + ' selectbox-caret"></span>' +
		'</a>' +
		'<div class="bfh-selectbox-options">' +
		'<div role="listbox">' +
		'<ul role="option">' +
		'</ul>' +
		'</div>' +
		'</div>'
      );

      this.$element.find('[role=option]').html(options);

      if (this.options.filter === true) {
        this.$element.find('.bfh-selectbox-options').prepend('<div class="bfh-selectbox-filter-container"><input type="text" class="bfh-selectbox-filter form-control"></div>');
      }

      this.$element.val(this.options.value);

      this.$element
        .on('click.bfhselectbox.data-api touchstart.bfhselectbox.data-api', toggle, BFHSelectBox.prototype.toggle)
		.on('keydown.bfhselectbox.data-api', toggle + ', [role=option]' , BFHSelectBox.prototype.keydown)
		.on('mouseenter.bfhselectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter)
		.on('click.bfhselectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.select)
		.on('click.bfhselectbox.data-api', '.bfh-selectbox-filter', function () { return false; })
		.on('propertychange.bfhselectbox.data-api change.bfhselectbox.data-api input.bfhselectbox.data-api paste.bfhselectbox.data-api', '.bfh-selectbox-filter', BFHSelectBox.prototype.filter);
    },

    toggle: function (e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhselectbox'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhselectbox')
          .find('[role=option] > li > [data-option="' + $parent.val() + '"]').focus();
      }

      return false;
    },

    filter: function() {
      var $this,
          $parent,
          $items;

      $this = $(this);
      $parent = getParent($this);

      $items = $('[role=option] li a', $parent);
      $items
        .hide()
        .filter(function() {
          return ($(this).text().toUpperCase().indexOf($this.val().toUpperCase()) !== -1);
        })
        .show();
    },

    keydown: function (e) {
      var $this,
          $items,
          $parent,
          $subItems,
          isActive,
          index,
          selectedIndex;

      if (!/(38|40|27)/.test(e.keyCode)) {
        return true;
      }

      $this = $(this);

      e.preventDefault();
      e.stopPropagation();

      $parent = getParent($this);
      isActive = $parent.hasClass('open');

      if (!isActive || (isActive && e.keyCode === 27)) {
        if (e.which === 27) {
          $parent.find(toggle).focus();
        }

        return $this.click();
      }

      $items = $('[role=option] li:not(.divider) a:visible', $parent);

      if (!$items.length) {
        return true;
      }

      $('body').off('mouseenter.bfh-selectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter);
      index = $items.index($items.filter(':focus'));

      if (e.keyCode === 38 && index > 0) {
        index = index - 1;
      }

      if (e.keyCode === 40 && index < $items.length - 1) {
        index = index + 1;
      }

      if (!index) {
        index = 0;
      }

      $items.eq(index).focus();
      $('body').on('mouseenter.bfh-selectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter);
    },

    mouseenter: function () {
      var $this;

      $this = $(this);

      $this.focus();
    },

    select: function (e) {
      var $this,
          $parent,
          $span,
          $input;

      $this = $(this);

      e.preventDefault();
      e.stopPropagation();

      if ($this.is('.disabled') || $this.attr('disabled') !== undefined) {
        return true;
      }

      $parent = getParent($this);

      $parent.val($this.data('option'));
      $parent.trigger('change.bfhselectbox');

      clearMenus();
    }

  };

  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhselectbox'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhselectbox');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-selectbox');
  }


  /* SELECTBOX PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhselectbox;

  $.fn.bfhselectbox = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhselectbox');
      options = typeof option === 'object' && option;
      this.type = 'bfhselectbox';

      if (!data) {
        $this.data('bfhselectbox', (data = new BFHSelectBox(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhselectbox.Constructor = BFHSelectBox;

  $.fn.bfhselectbox.defaults = {
    icon: 'caret',
    input: 'form-control',
    name: '',
    value: '',
    filter: false
  };


  /* SELECTBOX NO CONFLICT
   * ========================== */

  $.fn.bfhselectbox.noConflict = function () {
    $.fn.bfhselectbox = old;
    return this;
  };


  /* SELECTBOX VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-selectbox')) {
        return $(el).find('input[type="hidden"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      var $el,
          html;

      if ($(el).hasClass('bfh-selectbox')) {

        $el = $(el);
        if ($el.find('li a[data-option=\'' + val + '\']').length > 0) {
          html = $el.find('li a[data-option=\'' + val + '\']').html();
        } else if ($el.find('li a').length > 0) {
          html = $el.find('li a').eq(0).html();
        } else {
          val = '';
          html = '';
        }

        $el.find('input[type="hidden"]').val(val);
        $el.find('.bfh-selectbox-option').html(html);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* SELECTBOX DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-selectbox').each(function () {
      var $selectbox;

      $selectbox = $(this);

      $selectbox.bfhselectbox($selectbox.data());
    });
  });


  /* APPLY TO STANDARD SELECTBOX ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhselectbox.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-slider.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* BFHSLIDER CLASS DEFINITION
   * ========================= */

  var BFHSlider = function (element, options) {
        this.options = $.extend({}, $.fn.bfhslider.defaults, options);
        this.$element = $(element);
        
        this.initSlider();
      };

  BFHSlider.prototype = {

    constructor: BFHSlider,

    initSlider: function() {
      if (this.options.value === '') {
        this.options.value = this.options.min;
      }
      
      this.$element.html(
        '<input type="hidden" name="' + this.options.name + '" value="">' +
        '<div class="bfh-slider-handle"><div class="bfh-slider-value"></div></div>'
      );
      
      this.$element.find('input[type="hidden"]').val(this.options.value);
      this.updateHandle(this.options.value);
      
      this.$element.on('mousedown.bfhslider.data-api', BFHSlider.prototype.mouseDown);
    },
    
    updateHandle: function(val) {
      var positionX,
          width,
          left,
          span;
          
      span = this.options.max - this.options.min;
      width = this.$element.width();
      left = this.$element.position().left;
      
      positionX = Math.round((val - this.options.min) * (width - 20) / span + left);
      
      this.$element.find('.bfh-slider-handle').css('left', positionX + 'px');
      this.$element.find('.bfh-slider-value').text(val);
    },
    
    updateVal: function(positionX) {
      var width,
          left,
          right,
          val,
          span;
      
      span = this.options.max - this.options.min;
      width = this.$element.width();
      left = this.$element.offset().left;
      right = left + width;
      
      if (positionX < left) {
        positionX = left;
      }
      
      if (positionX + 20 > right) {
        positionX = right;
      }
      
      val = (positionX - left) / width;
      val = Math.ceil(val * span + this.options.min);
      
      if (val === this.$element.val()) {
        return true;
      }
      
      this.$element.val(val);
      
      this.$element.trigger('change.bfhslider');
    },
    
    mouseDown: function() {
      var $this;
      
      $this = $(this);
      
      if ($this.is('.disabled') || $this.attr('disabled') !== undefined) {
        return true;
      }
      
      $(document)
        .on('mousemove.bfhslider.data-api', {slider: $this}, BFHSlider.prototype.mouseMove)
        .one('mouseup.bfhslider.data-api', {slider: $this}, BFHSlider.prototype.mouseUp);
    },
    
    mouseMove: function(e) {
      var $this;
      
      $this = e.data.slider;
      
      $this.data('bfhslider').updateVal(e.pageX);
    },
    
    mouseUp: function(e) {
      var $this;
      
      $this = e.data.slider;
      
      $this.data('bfhslider').updateVal(e.pageX);
      
      $(document).off('mousemove.bfhslider.data-api');
    }
  };


  /* SLIDER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhslider;

  $.fn.bfhslider = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhslider');
      options = typeof option === 'object' && option;
      this.type = 'bfhslider';

      if (!data) {
        $this.data('bfhslider', (data = new BFHSlider(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhslider.Constructor = BFHSlider;

  $.fn.bfhslider.defaults = {
    name: '',
    value: '',
    min: 0,
    max: 100
  };


  /* SLIDER NO CONFLICT
   * ========================== */

  $.fn.bfhslider.noConflict = function () {
    $.fn.bfhslider = old;
    return this;
  };


  /* SLIDER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-slider')) {
        return $(el).find('input[type="hidden"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      if ($(el).hasClass('bfh-slider')) {
        $(el).find('input[type="hidden"]').val(val);
        $(el).data('bfhslider').updateHandle(val);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* SLIDER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-slider').each(function () {
      var $slider;

      $slider = $(this);

      $slider.bfhslider($slider.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-states.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* STATES CLASS DEFINITION
   * ====================== */

  var BFHStates = function (element, options) {
    this.options = $.extend({}, $.fn.bfhstates.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addStates();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapStates();
    }

    if (this.$element.is('span')) {
      this.displayState();
    }
  };

  BFHStates.prototype = {

    constructor: BFHStates,

    addStates: function () {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.val();
          $country.on('change', {state: this}, this.changeCountry);
        }
      }

      this.loadStates(country);
    },

    loadStates: function (country) {
      var value,
          state;

      value = this.options.state;

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (state in BFHStatesList[country]) {
        if (BFHStatesList[country].hasOwnProperty(state)) {
          this.$element.append('<option value="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</option>');
        }
      }

      this.$element.val(value);
    },

    changeCountry: function (e) {
      var $this,
          $state,
          country;

      $this = $(this);
      $state = e.data.state;
      country = $this.val();

      $state.loadStates(country);
    },

    addBootstrapStates: function() {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.find('input[type="hidden"]').val();
          $country.on('change.bfhselectbox', {state: this}, this.changeBootstrapCountry);
        }
      }

      this.loadBootstrapStates(country);
    },

    loadBootstrapStates: function(country) {
      var $input,
          $toggle,
          $options,
          stateCode,
          stateName,
          state;

      stateCode = this.options.state;
      stateName = '';
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (state in BFHStatesList[country]) {
        if (BFHStatesList[country].hasOwnProperty(state)) {
          $options.append('<li><a tabindex="-1" href="#" data-option="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</a></li>');

          if (BFHStatesList[country][state].code === stateCode) {
            stateName = BFHStatesList[country][state].name;
          }
        }
      }

      this.$element.val(stateCode);
    },

    changeBootstrapCountry: function (e) {
      var $this,
          $state,
          country;

      $this = $(this);
      $state = e.data.state;
      country = $this.val();

      $state.loadBootstrapStates(country);
    },

    displayState: function () {
      var country,
          stateCode,
          stateName,
          state;

      country = this.options.country;
      stateCode = this.options.state;
      stateName = '';

      for (state in BFHStatesList[country]) {
        if (BFHStatesList[country].hasOwnProperty(state)) {
          if (BFHStatesList[country][state].code === stateCode) {
            stateName = BFHStatesList[country][state].name;
            break;
          }
        }
      }
      this.$element.html(stateName);
    }

  };


  /* STATES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhstates;

  $.fn.bfhstates = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhstates');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhstates', (data = new BFHStates(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhstates.Constructor = BFHStates;

  $.fn.bfhstates.defaults = {
    country: '',
    state: '',
    blank: true
  };


  /* STATES NO CONFLICT
   * ========================== */

  $.fn.bfhstates.noConflict = function () {
    $.fn.bfhstates = old;
    return this;
  };


  /* STATES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-states, span.bfh-states, div.bfh-states').each(function () {
      var $states;

      $states = $(this);

      if ($states.hasClass('bfh-selectbox')) {
        $states.bfhselectbox($states.data());
      }
      $states.bfhstates($states.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-timepicker.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


+function ($) {

  'use strict';


 /* TIMEPICKER CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=bfh-timepicker]',
      BFHTimePicker = function (element, options) {
        this.options = $.extend({}, $.fn.bfhtimepicker.defaults, options);
        this.$element = $(element);

        this.initPopover();
      };

  BFHTimePicker.prototype = {

    constructor: BFHTimePicker,

    setTime: function() {
      var time,
          today,
          timeParts,
          hours,
          minutes,
          mode,
          currentMode;

      time = this.options.time;
      mode = '';
      currentMode = '';
      
      if (time === '' || time === 'now' || time === undefined) {
        today = new Date();

        hours = today.getHours();
        minutes = today.getMinutes();
        
        if (this.options.mode === '12h') {
          if (hours > 12) {
            hours = hours - 12;
            mode = ' ' + BFHTimePickerModes.pm;
            currentMode = 'pm';
          } else {
            mode = ' ' + BFHTimePickerModes.am;
            currentMode = 'am';
          }
        }
        
        if (time === 'now') {
          this.$element.find('.bfh-timepicker-toggle > input[type="text"]').val(formatTime(hours, minutes) + mode);
        }

        this.$element.data('hour', hours);
        this.$element.data('minute', minutes);
        this.$element.data('mode', currentMode);
      } else {
        timeParts = String(time).split(BFHTimePickerDelimiter);
        hours = timeParts[0];
        minutes = timeParts[1];
        
        if (this.options.mode === '12h') {
          timeParts = String(minutes).split(' ');
          minutes = timeParts[0];
          if (timeParts[1] === BFHTimePickerModes.pm) {
            currentMode = 'pm';
          } else {
            currentMode = 'am';
          }
        }
        
        this.$element.find('.bfh-timepicker-toggle > input[type="text"]').val(time);
        this.$element.data('hour', hours);
        this.$element.data('minute', minutes);
        this.$element.data('mode', currentMode);
      }
    },

    initPopover: function() {
      var iconLeft,
          iconRight,
          iconAddon,
          modeAddon,
          modeMax;

      iconLeft = '';
      iconRight = '';
      iconAddon = '';
      if (this.options.icon !== '') {
        if (this.options.align === 'right') {
          iconRight = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        } else {
          iconLeft = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        }
        iconAddon = 'input-group';
      }
      
      modeAddon = '';
      modeMax = '23';
      if (this.options.mode === '12h') {
        modeAddon = '<td>' +
          '<div class="bfh-selectbox" data-input="' + this.options.input + '" data-value="am">' +
          '<div data-value="am">' + BFHTimePickerModes.am + '</div>' +
          '<div data-value="pm">' + BFHTimePickerModes.pm + '</div>' +
          '</div>';
        modeMax = '11';
      }

      this.$element.html(
        '<div class="' + iconAddon + ' bfh-timepicker-toggle" data-toggle="bfh-timepicker">' +
        iconLeft +
        '<input type="text" name="' + this.options.name + '" class="' + this.options.input + '" placeholder="' + this.options.placeholder + '" readonly>' +
        iconRight +
        '</div>' +
        '<div class="bfh-timepicker-popover">' +
        '<table class="table">' +
        '<tbody>' +
        '<tr>' +
        '<td class="hour">' +
        '<input type="text" class="' + this.options.input + ' bfh-number"  data-min="0" data-max="' + modeMax + '" data-zeros="true" data-wrap="true">' +
        '</td>' +
        '<td class="separator">' + BFHTimePickerDelimiter + '</td>' +
        '<td class="minute">' +
        '<input type="text" class="' + this.options.input + ' bfh-number"  data-min="0" data-max="59" data-zeros="true" data-wrap="true">' +
        '</td>' +
        modeAddon +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>'
      );

      this.$element
        .on('click.bfhtimepicker.data-api touchstart.bfhtimepicker.data-api', toggle, BFHTimePicker.prototype.toggle)
        .on('click.bfhtimepicker.data-api touchstart.bfhtimepicker.data-api', '.bfh-timepicker-popover > table', function() { return false; });

      this.$element.find('.bfh-number').each(function () {
        var $number;

        $number = $(this);

        $number.bfhnumber($number.data());
        
        $number.on('change', BFHTimePicker.prototype.change);
      });
      
      this.$element.find('.bfh-selectbox').each(function() {
        var $selectbox;

        $selectbox = $(this);

        $selectbox.bfhselectbox($selectbox.data());
        
        $selectbox.on('change.bfhselectbox', BFHTimePicker.prototype.change);
      });
      
      this.setTime();

      this.updatePopover();
    },

    updatePopover: function() {
      var hour,
          minute,
          mode;

      hour = this.$element.data('hour');
      minute = this.$element.data('minute');
      mode = this.$element.data('mode');

      this.$element.find('.hour input[type=text]').val(hour).change();
      this.$element.find('.minute input[type=text]').val(minute).change();
      this.$element.find('.bfh-selectbox').val(mode);
    },
    
    change: function() {
      var $this,
          $parent,
          $timePicker,
          mode;

      $this = $(this);
      $parent = getParent($this);
      
      $timePicker = $parent.data('bfhtimepicker');
      
      if ($timePicker && $timePicker !== 'undefined') {
        mode = '';
        if ($timePicker.options.mode === '12h') {
          mode = ' ' + BFHTimePickerModes[$parent.find('.bfh-selectbox').val()];
        }
        
        $parent.find('.bfh-timepicker-toggle > input[type="text"]').val($parent.find('.hour input[type=text]').val() + BFHTimePickerDelimiter + $parent.find('.minute input[type=text]').val() + mode);

        $parent.trigger('change.bfhtimepicker');
      }

      return false;
    },

    toggle: function(e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhtimepicker'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhtimepicker');

        $this.focus();
      }

      return false;
    }
  };

  function formatTime(hour, minute) {
    hour = String(hour);
    if (hour.length === 1) {
      hour = '0' + hour;
    }

    minute = String(minute);
    if (minute.length === 1) {
      minute = '0' + minute;
    }

    return hour + BFHTimePickerDelimiter + minute;
  }
  
  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhtimepicker'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhtimepicker');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-timepicker');
  }


  /* TIMEPICKER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhtimepicker;

  $.fn.bfhtimepicker = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhtimepicker');
      options = typeof option === 'object' && option;
      this.type = 'bfhtimepicker';

      if (!data) {
        $this.data('bfhtimepicker', (data = new BFHTimePicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhtimepicker.Constructor = BFHTimePicker;

  $.fn.bfhtimepicker.defaults = {
    icon: 'glyphicon glyphicon-time',
    align: 'left',
    input: 'form-control',
    placeholder: '',
    name: '',
    time: 'now',
    mode: '24h'
  };


  /* TIMEPICKER NO CONFLICT
   * ========================== */

  $.fn.bfhtimepicker.noConflict = function () {
    $.fn.bfhtimepicker = old;
    return this;
  };


  /* TIMEPICKER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-timepicker')) {
        return $(el).find('.bfh-timepicker-toggle > input[type="text"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      var $timepicker;
      if ($(el).hasClass('bfh-timepicker')) {
        $timepicker = $(el).data('bfhtimepicker');
        $timepicker.options.time = val;
        $timepicker.setTime();
        $timepicker.updatePopover();
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* TIMEPICKER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-timepicker').each(function () {
      var $timepicker;

      $timepicker = $(this);

      $timepicker.bfhtimepicker($timepicker.data());
    });
  });


  /* APPLY TO STANDARD TIMEPICKER ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhtimepicker.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-timezones.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* TIMEZONES CLASS DEFINITION
   * ====================== */

  var BFHTimezones = function (element, options) {
    this.options = $.extend({}, $.fn.bfhtimezones.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addTimezones();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapTimezones();
    }
  };

  BFHTimezones.prototype = {

    constructor: BFHTimezones,

    addTimezones: function () {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.val();
          $country.on('change', {timezone: this}, this.changeCountry);
        }
      }

      this.loadTimezones(country);
    },

    loadTimezones: function (country) {
      var value,
          timezone;

      value = this.options.timezone;

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (timezone in BFHTimezonesList[country]) {
        if (BFHTimezonesList[country].hasOwnProperty(timezone)) {
          this.$element.append('<option value="' + timezone + '">' + BFHTimezonesList[country][timezone] + '</option>');
        }
      }

      this.$element.val(value);
    },

    changeCountry: function (e) {
      var $this,
          $timezone,
          country;

      $this = $(this);
      $timezone = e.data.timezone;
      country = $this.val();

      $timezone.loadTimezones(country);
    },

    addBootstrapTimezones: function() {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.find('input[type="hidden"]').val();
          $country.on('change.bfhselectbox', {timezone: this}, this.changeBootstrapCountry);
        }
      }

      this.loadBootstrapTimezones(country);
    },

    loadBootstrapTimezones: function(country) {
      var $input,
          $toggle,
          $options,
          value,
          timezone;

      value = this.options.timezone;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (timezone in BFHTimezonesList[country]) {
        if (BFHTimezonesList[country].hasOwnProperty(timezone)) {
          $options.append('<li><a tabindex="-1" href="#" data-option="' + timezone + '">' + BFHTimezonesList[country][timezone] + '</a></li>');
        }
      }

      this.$element.val(value);
    },

    changeBootstrapCountry: function (e) {
      var $this,
          $timezone,
          country;

      $this = $(this);
      $timezone = e.data.timezone;
      country = $this.val();

      $timezone.loadBootstrapTimezones(country);
    }

  };


  /* TIMEZONES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhtimezones;

  $.fn.bfhtimezones = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhtimezones');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhtimezones', (data = new BFHTimezones(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhtimezones.Constructor = BFHTimezones;

  $.fn.bfhtimezones.defaults = {
    country: '',
    timezone: '',
    blank: true
  };


  /* TIMEZONES NO CONFLICT
   * ========================== */

  $.fn.bfhtimezones.noConflict = function () {
    $.fn.bfhtimezones = old;
    return this;
  };


  /* TIMEZONES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-timezones, div.bfh-timezones').each(function () {
      var $timezones;

      $timezones = $(this);

      if ($timezones.hasClass('bfh-selectbox')) {
        $timezones.bfhselectbox($timezones.data());
      }
      $timezones.bfhtimezones($timezones.data());
    });
  });

}(window.jQuery);

}).call(global, module, undefined);
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"bootstrap":"XZBj++"}],"bootstrap":[function(require,module,exports){
module.exports=require('XZBj++');
},{}],"XZBj++":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {

; global.$ = require("jquery");
/*!
 * Bootstrap v3.0.2 by @fat and @mdo
 * Copyright 2013 Twitter, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world by @mdo and @fat.
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");"radio"===b.prop("type")&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown"),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("dropdown");d||c.data("dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show),void 0):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;if("top"==b&&j!=f&&(c=!0,a.top=a.top+f-j),/bottom|top/.test(b)){var k=0;a.left<0&&(k=-2*a.left,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach()}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);
; browserify_shim__define__module__export__(typeof bootstrap != "undefined" ? bootstrap : window.bootstrap);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"jquery":"WPLrfX"}],"backbone.marionette":[function(require,module,exports){
module.exports=require('ZnC4id');
},{}],"ZnC4id":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {

; global.$ = require("jquery");
global.Backbone = require("backbone");
global._ = require("underscore");
// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v1.2.3
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com



/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */

// Backbone.BabySitter
// -------------------
// v0.0.6
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/babysitterjs/backbone.babysitter

// Backbone.ChildViewContainer
// ---------------------------
//
// Provide a container to store, retrieve and
// shut down child views.

Backbone.ChildViewContainer = (function(Backbone, _){
  
  // Container Constructor
  // ---------------------

  var Container = function(views){
    this._views = {};
    this._indexByModel = {};
    this._indexByCustom = {};
    this._updateLength();

    _.each(views, this.add, this);
  };

  // Container Methods
  // -----------------

  _.extend(Container.prototype, {

    // Add a view to this container. Stores the view
    // by `cid` and makes it searchable by the model
    // cid (and model itself). Optionally specify
    // a custom key to store an retrieve the view.
    add: function(view, customIndex){
      var viewCid = view.cid;

      // store the view
      this._views[viewCid] = view;

      // index it by model
      if (view.model){
        this._indexByModel[view.model.cid] = viewCid;
      }

      // index by custom
      if (customIndex){
        this._indexByCustom[customIndex] = viewCid;
      }

      this._updateLength();
    },

    // Find a view by the model that was attached to
    // it. Uses the model's `cid` to find it.
    findByModel: function(model){
      return this.findByModelCid(model.cid);
    },

    // Find a view by the `cid` of the model that was attached to
    // it. Uses the model's `cid` to find the view `cid` and
    // retrieve the view using it.
    findByModelCid: function(modelCid){
      var viewCid = this._indexByModel[modelCid];
      return this.findByCid(viewCid);
    },

    // Find a view by a custom indexer.
    findByCustom: function(index){
      var viewCid = this._indexByCustom[index];
      return this.findByCid(viewCid);
    },

    // Find by index. This is not guaranteed to be a
    // stable index.
    findByIndex: function(index){
      return _.values(this._views)[index];
    },

    // retrieve a view by it's `cid` directly
    findByCid: function(cid){
      return this._views[cid];
    },

    // Remove a view
    remove: function(view){
      var viewCid = view.cid;

      // delete model index
      if (view.model){
        delete this._indexByModel[view.model.cid];
      }

      // delete custom index
      _.any(this._indexByCustom, function(cid, key) {
        if (cid === viewCid) {
          delete this._indexByCustom[key];
          return true;
        }
      }, this);

      // remove the view from the container
      delete this._views[viewCid];

      // update the length
      this._updateLength();
    },

    // Call a method on every view in the container,
    // passing parameters to the call method one at a
    // time, like `function.call`.
    call: function(method){
      this.apply(method, _.tail(arguments));
    },

    // Apply a method on every view in the container,
    // passing parameters to the call method one at a
    // time, like `function.apply`.
    apply: function(method, args){
      _.each(this._views, function(view){
        if (_.isFunction(view[method])){
          view[method].apply(view, args || []);
        }
      });
    },

    // Update the `.length` attribute on this container
    _updateLength: function(){
      this.length = _.size(this._views);
    }
  });

  // Borrowing this code from Backbone.Collection:
  // http://backbonejs.org/docs/backbone.html#section-106
  //
  // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
    'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
    'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
    'last', 'without', 'isEmpty', 'pluck'];

  _.each(methods, function(method) {
    Container.prototype[method] = function() {
      var views = _.values(this._views);
      var args = [views].concat(_.toArray(arguments));
      return _[method].apply(_, args);
    };
  });

  // return the public API
  return Container;
})(Backbone, _);

// Backbone.Wreqr (Backbone.Marionette)
// ----------------------------------
// v0.2.0
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.wreqr


Backbone.Wreqr = (function(Backbone, Marionette, _){
  "use strict";
  var Wreqr = {};

  // Handlers
// --------
// A registry of functions to call, given a name

Wreqr.Handlers = (function(Backbone, _){
  "use strict";
  
  // Constructor
  // -----------

  var Handlers = function(options){
    this.options = options;
    this._wreqrHandlers = {};
    
    if (_.isFunction(this.initialize)){
      this.initialize(options);
    }
  };

  Handlers.extend = Backbone.Model.extend;

  // Instance Members
  // ----------------

  _.extend(Handlers.prototype, Backbone.Events, {

    // Add multiple handlers using an object literal configuration
    setHandlers: function(handlers){
      _.each(handlers, function(handler, name){
        var context = null;

        if (_.isObject(handler) && !_.isFunction(handler)){
          context = handler.context;
          handler = handler.callback;
        }

        this.setHandler(name, handler, context);
      }, this);
    },

    // Add a handler for the given name, with an
    // optional context to run the handler within
    setHandler: function(name, handler, context){
      var config = {
        callback: handler,
        context: context
      };

      this._wreqrHandlers[name] = config;

      this.trigger("handler:add", name, handler, context);
    },

    // Determine whether or not a handler is registered
    hasHandler: function(name){
      return !! this._wreqrHandlers[name];
    },

    // Get the currently registered handler for
    // the specified name. Throws an exception if
    // no handler is found.
    getHandler: function(name){
      var config = this._wreqrHandlers[name];

      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      return function(){
        var args = Array.prototype.slice.apply(arguments);
        return config.callback.apply(config.context, args);
      };
    },

    // Remove a handler for the specified name
    removeHandler: function(name){
      delete this._wreqrHandlers[name];
    },

    // Remove all handlers from this registry
    removeAllHandlers: function(){
      this._wreqrHandlers = {};
    }
  });

  return Handlers;
})(Backbone, _);

  // Wreqr.CommandStorage
// --------------------
//
// Store and retrieve commands for execution.
Wreqr.CommandStorage = (function(){
  "use strict";

  // Constructor function
  var CommandStorage = function(options){
    this.options = options;
    this._commands = {};

    if (_.isFunction(this.initialize)){
      this.initialize(options);
    }
  };

  // Instance methods
  _.extend(CommandStorage.prototype, Backbone.Events, {

    // Get an object literal by command name, that contains
    // the `commandName` and the `instances` of all commands
    // represented as an array of arguments to process
    getCommands: function(commandName){
      var commands = this._commands[commandName];

      // we don't have it, so add it
      if (!commands){

        // build the configuration
        commands = {
          command: commandName, 
          instances: []
        };

        // store it
        this._commands[commandName] = commands;
      }

      return commands;
    },

    // Add a command by name, to the storage and store the
    // args for the command
    addCommand: function(commandName, args){
      var command = this.getCommands(commandName);
      command.instances.push(args);
    },

    // Clear all commands for the given `commandName`
    clearCommands: function(commandName){
      var command = this.getCommands(commandName);
      command.instances = [];
    }
  });

  return CommandStorage;
})();

  // Wreqr.Commands
// --------------
//
// A simple command pattern implementation. Register a command
// handler and execute it.
Wreqr.Commands = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    // default storage type
    storageType: Wreqr.CommandStorage,

    constructor: function(options){
      this.options = options || {};

      this._initializeStorage(this.options);
      this.on("handler:add", this._executeCommands, this);

      var args = Array.prototype.slice.call(arguments);
      Wreqr.Handlers.prototype.constructor.apply(this, args);
    },

    // Execute a named command with the supplied args
    execute: function(name, args){
      name = arguments[0];
      args = Array.prototype.slice.call(arguments, 1);

      if (this.hasHandler(name)){
        this.getHandler(name).apply(this, args);
      } else {
        this.storage.addCommand(name, args);
      }

    },

    // Internal method to handle bulk execution of stored commands
    _executeCommands: function(name, handler, context){
      var command = this.storage.getCommands(name);

      // loop through and execute all the stored command instances
      _.each(command.instances, function(args){
        handler.apply(context, args);
      });

      this.storage.clearCommands(name);
    },

    // Internal method to initialize storage either from the type's
    // `storageType` or the instance `options.storageType`.
    _initializeStorage: function(options){
      var storage;

      var StorageType = options.storageType || this.storageType;
      if (_.isFunction(StorageType)){
        storage = new StorageType();
      } else {
        storage = StorageType;
      }

      this.storage = storage;
    }
  });

})(Wreqr);

  // Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    request: function(){
      var name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      return this.getHandler(name).apply(this, args);
    }
  });

})(Wreqr);

  // Event Aggregator
// ----------------
// A pub-sub object that can be used to decouple various parts
// of an application through event-driven architecture.

Wreqr.EventAggregator = (function(Backbone, _){
  "use strict";
  var EA = function(){};

  // Copy the `extend` function used by Backbone's classes
  EA.extend = Backbone.Model.extend;

  // Copy the basic Backbone.Events on to the event aggregator
  _.extend(EA.prototype, Backbone.Events);

  return EA;
})(Backbone, _);


  return Wreqr;
})(Backbone, Backbone.Marionette, _);

var Marionette = (function(global, Backbone, _){
  "use strict";

  // Define and export the Marionette namespace
  var Marionette = {};
  Backbone.Marionette = Marionette;

  // Get the DOM manipulator for later use
  Marionette.$ = Backbone.$;

// Helpers
// -------

// For slicing `arguments` in functions
var protoSlice = Array.prototype.slice;
function slice(args) {
  return protoSlice.call(args);
}

function throwError(message, name) {
  var error = new Error(message);
  error.name = name || 'Error';
  throw error;
}

// Marionette.extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
Marionette.extend = Backbone.Model.extend;

// Marionette.getOption
// --------------------

// Retrieve an object, function or other value from a target
// object or its `options`, with `options` taking precedence.
Marionette.getOption = function(target, optionName){
  if (!target || !optionName){ return; }
  var value;

  if (target.options && (optionName in target.options) && (target.options[optionName] !== undefined)){
    value = target.options[optionName];
  } else {
    value = target[optionName];
  }

  return value;
};

// Trigger an event and/or a corresponding method name. Examples:
//
// `this.triggerMethod("foo")` will trigger the "foo" event and
// call the "onFoo" method.
//
// `this.triggerMethod("foo:bar") will trigger the "foo:bar" event and
// call the "onFooBar" method.
Marionette.triggerMethod = (function(){

  // split the event name on the :
  var splitter = /(^|:)(\w)/gi;

  // take the event section ("section1:section2:section3")
  // and turn it in to uppercase name
  function getEventName(match, prefix, eventName) {
    return eventName.toUpperCase();
  }

  // actual triggerMethod name
  var triggerMethod = function(event) {
    // get the method name from the event name
    var methodName = 'on' + event.replace(splitter, getEventName);
    var method = this[methodName];

    // trigger the event, if a trigger method exists
    if(_.isFunction(this.trigger)) {
      this.trigger.apply(this, arguments);
    }

    // call the onMethodName if it exists
    if (_.isFunction(method)) {
      // pass all arguments, except the event name
      return method.apply(this, _.tail(arguments));
    }
  };

  return triggerMethod;
})();

// DOMRefresh
// ----------
//
// Monitor a view's state, and after it has been rendered and shown
// in the DOM, trigger a "dom:refresh" event every time it is
// re-rendered.

Marionette.MonitorDOMRefresh = (function(){
  // track when the view has been shown in the DOM,
  // using a Marionette.Region (or by other means of triggering "show")
  function handleShow(view){
    view._isShown = true;
    triggerDOMRefresh(view);
  }

  // track when the view has been rendered
  function handleRender(view){
    view._isRendered = true;
    triggerDOMRefresh(view);
  }

  // Trigger the "dom:refresh" event and corresponding "onDomRefresh" method
  function triggerDOMRefresh(view){
    if (view._isShown && view._isRendered){
      if (_.isFunction(view.triggerMethod)){
        view.triggerMethod("dom:refresh");
      }
    }
  }

  // Export public API
  return function(view){
    view.listenTo(view, "show", function(){
      handleShow(view);
    });

    view.listenTo(view, "render", function(){
      handleRender(view);
    });
  };
})();


// Marionette.bindEntityEvents & unbindEntityEvents
// ---------------------------
//
// These methods are used to bind/unbind a backbone "entity" (collection/model) 
// to methods on a target object. 
//
// The first parameter, `target`, must have a `listenTo` method from the
// EventBinder object.
//
// The second parameter is the entity (Backbone.Model or Backbone.Collection)
// to bind the events from.
//
// The third parameter is a hash of { "event:name": "eventHandler" }
// configuration. Multiple handlers can be separated by a space. A
// function can be supplied instead of a string handler name. 

(function(Marionette){
  "use strict";

  // Bind the event to handlers specified as a string of
  // handler names on the target object
  function bindFromStrings(target, entity, evt, methods){
    var methodNames = methods.split(/\s+/);

    _.each(methodNames,function(methodName) {

      var method = target[methodName];
      if(!method) {
        throwError("Method '"+ methodName +"' was configured as an event handler, but does not exist.");
      }

      target.listenTo(entity, evt, method, target);
    });
  }

  // Bind the event to a supplied callback function
  function bindToFunction(target, entity, evt, method){
      target.listenTo(entity, evt, method, target);
  }

  // Bind the event to handlers specified as a string of
  // handler names on the target object
  function unbindFromStrings(target, entity, evt, methods){
    var methodNames = methods.split(/\s+/);

    _.each(methodNames,function(methodName) {
      var method = target[methodName];
      target.stopListening(entity, evt, method, target);
    });
  }

  // Bind the event to a supplied callback function
  function unbindToFunction(target, entity, evt, method){
      target.stopListening(entity, evt, method, target);
  }

  
  // generic looping function
  function iterateEvents(target, entity, bindings, functionCallback, stringCallback){
    if (!entity || !bindings) { return; }

    // allow the bindings to be a function
    if (_.isFunction(bindings)){
      bindings = bindings.call(target);
    }

    // iterate the bindings and bind them
    _.each(bindings, function(methods, evt){

      // allow for a function as the handler, 
      // or a list of event names as a string
      if (_.isFunction(methods)){
        functionCallback(target, entity, evt, methods);
      } else {
        stringCallback(target, entity, evt, methods);
      }

    });
  }
 
  // Export Public API
  Marionette.bindEntityEvents = function(target, entity, bindings){
    iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
  };

  Marionette.unbindEntityEvents = function(target, entity, bindings){
    iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
  };

})(Marionette);


// Callbacks
// ---------

// A simple way of managing a collection of callbacks
// and executing them at a later point in time, using jQuery's
// `Deferred` object.
Marionette.Callbacks = function(){
  this._deferred = Marionette.$.Deferred();
  this._callbacks = [];
};

_.extend(Marionette.Callbacks.prototype, {

  // Add a callback to be executed. Callbacks added here are
  // guaranteed to execute, even if they are added after the 
  // `run` method is called.
  add: function(callback, contextOverride){
    this._callbacks.push({cb: callback, ctx: contextOverride});

    this._deferred.done(function(context, options){
      if (contextOverride){ context = contextOverride; }
      callback.call(context, options);
    });
  },

  // Run all registered callbacks with the context specified. 
  // Additional callbacks can be added after this has been run 
  // and they will still be executed.
  run: function(options, context){
    this._deferred.resolve(context, options);
  },

  // Resets the list of callbacks to be run, allowing the same list
  // to be run multiple times - whenever the `run` method is called.
  reset: function(){
    var callbacks = this._callbacks;
    this._deferred = Marionette.$.Deferred();
    this._callbacks = [];
    
    _.each(callbacks, function(cb){
      this.add(cb.cb, cb.ctx);
    }, this);
  }
});


// Marionette Controller
// ---------------------
//
// A multi-purpose object to use as a controller for
// modules and routers, and as a mediator for workflow
// and coordination of other objects, views, and more.
Marionette.Controller = function(options){
  this.triggerMethod = Marionette.triggerMethod;
  this.options = options || {};

  if (_.isFunction(this.initialize)){
    this.initialize(this.options);
  }
};

Marionette.Controller.extend = Marionette.extend;

// Controller Methods
// --------------

// Ensure it can trigger events with Backbone.Events
_.extend(Marionette.Controller.prototype, Backbone.Events, {
  close: function(){
    this.stopListening();
    this.triggerMethod("close");
    this.unbind();
  }
});

// Region 
// ------
//
// Manage the visual regions of your composite application. See
// http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/

Marionette.Region = function(options){
  this.options = options || {};

  this.el = Marionette.getOption(this, "el");

  if (!this.el){
    var err = new Error("An 'el' must be specified for a region.");
    err.name = "NoElError";
    throw err;
  }

  if (this.initialize){
    var args = Array.prototype.slice.apply(arguments);
    this.initialize.apply(this, args);
  }
};


// Region Type methods
// -------------------

_.extend(Marionette.Region, {

  // Build an instance of a region by passing in a configuration object
  // and a default region type to use if none is specified in the config.
  //
  // The config object should either be a string as a jQuery DOM selector,
  // a Region type directly, or an object literal that specifies both
  // a selector and regionType:
  //
  // ```js
  // {
  //   selector: "#foo",
  //   regionType: MyCustomRegion
  // }
  // ```
  //
  buildRegion: function(regionConfig, defaultRegionType){

    var regionIsString = (typeof regionConfig === "string");
    var regionSelectorIsString = (typeof regionConfig.selector === "string");
    var regionTypeIsUndefined = (typeof regionConfig.regionType === "undefined");
    var regionIsType = (typeof regionConfig === "function");

    if (!regionIsType && !regionIsString && !regionSelectorIsString) {
      throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
    }

    var selector, RegionType;
   
    // get the selector for the region
    
    if (regionIsString) {
      selector = regionConfig;
    } 

    if (regionConfig.selector) {
      selector = regionConfig.selector;
    }

    // get the type for the region
    
    if (regionIsType){
      RegionType = regionConfig;
    }

    if (!regionIsType && regionTypeIsUndefined) {
      RegionType = defaultRegionType;
    }

    if (regionConfig.regionType) {
      RegionType = regionConfig.regionType;
    }
    
    // build the region instance
    var region = new RegionType({
      el: selector
    });

    // override the `getEl` function if we have a parentEl
    // this must be overridden to ensure the selector is found
    // on the first use of the region. if we try to assign the
    // region's `el` to `parentEl.find(selector)` in the object
    // literal to build the region, the element will not be
    // guaranteed to be in the DOM already, and will cause problems
    if (regionConfig.parentEl){

      region.getEl = function(selector) {
        var parentEl = regionConfig.parentEl;
        if (_.isFunction(parentEl)){
          parentEl = parentEl();
        }
        return parentEl.find(selector);
      };
    }

    return region;
  }

});

// Region Instance Methods
// -----------------------

_.extend(Marionette.Region.prototype, Backbone.Events, {

  // Displays a backbone view instance inside of the region.
  // Handles calling the `render` method for you. Reads content
  // directly from the `el` attribute. Also calls an optional
  // `onShow` and `close` method on your view, just after showing
  // or just before closing the view, respectively.
  show: function(view){

    this.ensureEl();

    var isViewClosed = view.isClosed || _.isUndefined(view.$el);

    var isDifferentView = view !== this.currentView;

    if (isDifferentView) {
      this.close();
    }

    view.render();

    if (isDifferentView || isViewClosed) {
      this.open(view);
    }
    
    this.currentView = view;

    Marionette.triggerMethod.call(this, "show", view);
    Marionette.triggerMethod.call(view, "show");
  },

  ensureEl: function(){
    if (!this.$el || this.$el.length === 0){
      this.$el = this.getEl(this.el);
    }
  },

  // Override this method to change how the region finds the
  // DOM element that it manages. Return a jQuery selector object.
  getEl: function(selector){
    return Marionette.$(selector);
  },

  // Override this method to change how the new view is
  // appended to the `$el` that the region is managing
  open: function(view){
    this.$el.empty().append(view.el);
  },

  // Close the current view, if there is one. If there is no
  // current view, it does nothing and returns immediately.
  close: function(){
    var view = this.currentView;
    if (!view || view.isClosed){ return; }

    // call 'close' or 'remove', depending on which is found
    if (view.close) { view.close(); }
    else if (view.remove) { view.remove(); }

    Marionette.triggerMethod.call(this, "close");

    delete this.currentView;
  },

  // Attach an existing view to the region. This 
  // will not call `render` or `onShow` for the new view, 
  // and will not replace the current HTML for the `el`
  // of the region.
  attachView: function(view){
    this.currentView = view;
  },

  // Reset the region by closing any existing view and
  // clearing out the cached `$el`. The next time a view
  // is shown via this region, the region will re-query the
  // DOM for the region's `el`.
  reset: function(){
    this.close();
    delete this.$el;
  }
});

// Copy the `extend` function used by Backbone's classes
Marionette.Region.extend = Marionette.extend;

// Marionette.RegionManager
// ------------------------
//
// Manage one or more related `Marionette.Region` objects.
Marionette.RegionManager = (function(Marionette){

  var RegionManager = Marionette.Controller.extend({
    constructor: function(options){
      this._regions = {};
      Marionette.Controller.prototype.constructor.call(this, options);
    },

    // Add multiple regions using an object literal, where
    // each key becomes the region name, and each value is
    // the region definition.
    addRegions: function(regionDefinitions, defaults){
      var regions = {};

      _.each(regionDefinitions, function(definition, name){
        if (typeof definition === "string"){
          definition = { selector: definition };
        }

        if (definition.selector){
          definition = _.defaults({}, definition, defaults);
        }

        var region = this.addRegion(name, definition);
        regions[name] = region;
      }, this);

      return regions;
    },

    // Add an individual region to the region manager,
    // and return the region instance
    addRegion: function(name, definition){
      var region;

      var isObject = _.isObject(definition);
      var isString = _.isString(definition);
      var hasSelector = !!definition.selector;

      if (isString || (isObject && hasSelector)){
        region = Marionette.Region.buildRegion(definition, Marionette.Region);
      } else if (_.isFunction(definition)){
        region = Marionette.Region.buildRegion(definition, Marionette.Region);
      } else {
        region = definition;
      }

      this._store(name, region);
      this.triggerMethod("region:add", name, region);
      return region;
    },

    // Get a region by name
    get: function(name){
      return this._regions[name];
    },

    // Remove a region by name
    removeRegion: function(name){
      var region = this._regions[name];
      this._remove(name, region);
    },

    // Close all regions in the region manager, and
    // remove them
    removeRegions: function(){
      _.each(this._regions, function(region, name){
        this._remove(name, region);
      }, this);
    },

    // Close all regions in the region manager, but
    // leave them attached
    closeRegions: function(){
      _.each(this._regions, function(region, name){
        region.close();
      }, this);
    },

    // Close all regions and shut down the region
    // manager entirely
    close: function(){
      this.removeRegions();
      var args = Array.prototype.slice.call(arguments);
      Marionette.Controller.prototype.close.apply(this, args);
    },

    // internal method to store regions
    _store: function(name, region){
      this._regions[name] = region;
      this._setLength();
    },

    // internal method to remove a region
    _remove: function(name, region){
      region.close();
      delete this._regions[name];
      this._setLength();
      this.triggerMethod("region:remove", name, region);
    },

    // set the number of regions current held
    _setLength: function(){
      this.length = _.size(this._regions);
    }

  });

  // Borrowing this code from Backbone.Collection:
  // http://backbonejs.org/docs/backbone.html#section-106
  //
  // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
    'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
    'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
    'last', 'without', 'isEmpty', 'pluck'];

  _.each(methods, function(method) {
    RegionManager.prototype[method] = function() {
      var regions = _.values(this._regions);
      var args = [regions].concat(_.toArray(arguments));
      return _[method].apply(_, args);
    };
  });

  return RegionManager;
})(Marionette);


// Template Cache
// --------------

// Manage templates stored in `<script>` blocks,
// caching them for faster access.
Marionette.TemplateCache = function(templateId){
  this.templateId = templateId;
};

// TemplateCache object-level methods. Manage the template
// caches from these method calls instead of creating 
// your own TemplateCache instances
_.extend(Marionette.TemplateCache, {
  templateCaches: {},

  // Get the specified template by id. Either
  // retrieves the cached version, or loads it
  // from the DOM.
  get: function(templateId){
    var cachedTemplate = this.templateCaches[templateId];

    if (!cachedTemplate){
      cachedTemplate = new Marionette.TemplateCache(templateId);
      this.templateCaches[templateId] = cachedTemplate;
    }

    return cachedTemplate.load();
  },

  // Clear templates from the cache. If no arguments
  // are specified, clears all templates:
  // `clear()`
  //
  // If arguments are specified, clears each of the 
  // specified templates from the cache:
  // `clear("#t1", "#t2", "...")`
  clear: function(){
    var i;
    var args = slice(arguments);
    var length = args.length;

    if (length > 0){
      for(i=0; i<length; i++){
        delete this.templateCaches[args[i]];
      }
    } else {
      this.templateCaches = {};
    }
  }
});

// TemplateCache instance methods, allowing each
// template cache object to manage its own state
// and know whether or not it has been loaded
_.extend(Marionette.TemplateCache.prototype, {

  // Internal method to load the template
  load: function(){
    // Guard clause to prevent loading this template more than once
    if (this.compiledTemplate){
      return this.compiledTemplate;
    }

    // Load the template and compile it
    var template = this.loadTemplate(this.templateId);
    this.compiledTemplate = this.compileTemplate(template);

    return this.compiledTemplate;
  },

  // Load a template from the DOM, by default. Override
  // this method to provide your own template retrieval
  // For asynchronous loading with AMD/RequireJS, consider
  // using a template-loader plugin as described here: 
  // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
  loadTemplate: function(templateId){
    var template = Marionette.$(templateId).html();

    if (!template || template.length === 0){
      throwError("Could not find template: '" + templateId + "'", "NoTemplateError");
    }

    return template;
  },

  // Pre-compile the template before caching it. Override
  // this method if you do not need to pre-compile a template
  // (JST / RequireJS for example) or if you want to change
  // the template engine used (Handebars, etc).
  compileTemplate: function(rawTemplate){
    return _.template(rawTemplate);
  }
});


// Renderer
// --------

// Render a template with data by passing in the template
// selector and the data to render.
Marionette.Renderer = {

  // Render a template with data. The `template` parameter is
  // passed to the `TemplateCache` object to retrieve the
  // template function. Override this method to provide your own
  // custom rendering and template handling for all of Marionette.
  render: function(template, data){

    if (!template) {
      var error = new Error("Cannot render the template since it's false, null or undefined.");
      error.name = "TemplateNotFoundError";
      throw error;
    }

    var templateFunc;
    if (typeof template === "function"){
      templateFunc = template;
    } else {
      templateFunc = Marionette.TemplateCache.get(template);
    }

    return templateFunc(data);
  }
};



// Marionette.View
// ---------------

// The core view type that other Marionette views extend from.
Marionette.View = Backbone.View.extend({

  constructor: function(options){
    _.bindAll(this, "render");

    var args = Array.prototype.slice.apply(arguments);

    // this exposes view options to the view initializer
    // this is a backfill since backbone removed the assignment
    // of this.options
    // at some point however this may be removed
    this.options = options || {};
    Backbone.View.prototype.constructor.apply(this, args);

    Marionette.MonitorDOMRefresh(this);
    this.listenTo(this, "show", this.onShowCalled, this);
  },

  // import the "triggerMethod" to trigger events with corresponding
  // methods if the method exists
  triggerMethod: Marionette.triggerMethod,

  // Get the template for this view
  // instance. You can set a `template` attribute in the view
  // definition or pass a `template: "whatever"` parameter in
  // to the constructor options.
  getTemplate: function(){
    return Marionette.getOption(this, "template");
  },

  // Mix in template helper methods. Looks for a
  // `templateHelpers` attribute, which can either be an
  // object literal, or a function that returns an object
  // literal. All methods and attributes from this object
  // are copies to the object passed in.
  mixinTemplateHelpers: function(target){
    target = target || {};
    var templateHelpers = Marionette.getOption(this, "templateHelpers");
    if (_.isFunction(templateHelpers)){
      templateHelpers = templateHelpers.call(this);
    }
    return _.extend(target, templateHelpers);
  },

  // Configure `triggers` to forward DOM events to view
  // events. `triggers: {"click .foo": "do:foo"}`
  configureTriggers: function(){
    if (!this.triggers) { return; }

    var triggerEvents = {};

    // Allow `triggers` to be configured as a function
    var triggers = _.result(this, "triggers");

    // Configure the triggers, prevent default
    // action and stop propagation of DOM events
    _.each(triggers, function(value, key){

      var hasOptions = _.isObject(value);
      var eventName = hasOptions ? value.event : value;

      // build the event handler function for the DOM event
      triggerEvents[key] = function(e){

        // stop the event in its tracks
        if (e) {
          var prevent = e.preventDefault;
          var stop = e.stopPropagation;

          var shouldPrevent = hasOptions ? value.preventDefault : prevent;
          var shouldStop = hasOptions ? value.stopPropagation : stop;

          if (shouldPrevent && prevent) { prevent.apply(e); }
          if (shouldStop && stop) { stop.apply(e); }
        }

        // build the args for the event
        var args = {
          view: this,
          model: this.model,
          collection: this.collection
        };

        // trigger the event
        this.triggerMethod(eventName, args);
      };

    }, this);

    return triggerEvents;
  },

  // Overriding Backbone.View's delegateEvents to handle
  // the `triggers`, `modelEvents`, and `collectionEvents` configuration
  delegateEvents: function(events){
    this._delegateDOMEvents(events);
    Marionette.bindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents"));
    Marionette.bindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
  },

  // internal method to delegate DOM events and triggers
  _delegateDOMEvents: function(events){
    events = events || this.events;
    if (_.isFunction(events)){ events = events.call(this); }

    var combinedEvents = {};
    var triggers = this.configureTriggers();
    _.extend(combinedEvents, events, triggers);

    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
  },

  // Overriding Backbone.View's undelegateEvents to handle unbinding
  // the `triggers`, `modelEvents`, and `collectionEvents` config
  undelegateEvents: function(){
    var args = Array.prototype.slice.call(arguments);
    Backbone.View.prototype.undelegateEvents.apply(this, args);

    Marionette.unbindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents"));
    Marionette.unbindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
  },

  // Internal method, handles the `show` event.
  onShowCalled: function(){},

  // Default `close` implementation, for removing a view from the
  // DOM and unbinding it. Regions will call this method
  // for you. You can specify an `onClose` method in your view to
  // add custom code that is called after the view is closed.
  close: function(){
    if (this.isClosed) { return; }

    // allow the close to be stopped by returning `false`
    // from the `onBeforeClose` method
    var shouldClose = this.triggerMethod("before:close");
    if (shouldClose === false){
      return;
    }

    // mark as closed before doing the actual close, to
    // prevent infinite loops within "close" event handlers
    // that are trying to close other views
    this.isClosed = true;
    this.triggerMethod("close");

    // unbind UI elements
    this.unbindUIElements();

    // remove the view from the DOM
    this.remove();
  },

  // This method binds the elements specified in the "ui" hash inside the view's code with
  // the associated jQuery selectors.
  bindUIElements: function(){
    if (!this.ui) { return; }

    // store the ui hash in _uiBindings so they can be reset later
    // and so re-rendering the view will be able to find the bindings
    if (!this._uiBindings){
      this._uiBindings = this.ui;
    }

    // get the bindings result, as a function or otherwise
    var bindings = _.result(this, "_uiBindings");

    // empty the ui so we don't have anything to start with
    this.ui = {};

    // bind each of the selectors
    _.each(_.keys(bindings), function(key) {
      var selector = bindings[key];
      this.ui[key] = this.$(selector);
    }, this);
  },

  // This method unbinds the elements specified in the "ui" hash
  unbindUIElements: function(){
    if (!this.ui || !this._uiBindings){ return; }

    // delete all of the existing ui bindings
    _.each(this.ui, function($el, name){
      delete this.ui[name];
    }, this);

    // reset the ui element to the original bindings configuration
    this.ui = this._uiBindings;
    delete this._uiBindings;
  }
});

// Item View
// ---------

// A single item view implementation that contains code for rendering
// with underscore.js templates, serializing the view's model or collection,
// and calling several methods on extended views, such as `onRender`.
Marionette.ItemView = Marionette.View.extend({
  
  // Setting up the inheritance chain which allows changes to 
  // Marionette.View.prototype.constructor which allows overriding
  constructor: function(){
    Marionette.View.prototype.constructor.apply(this, slice(arguments));
  },

  // Serialize the model or collection for the view. If a model is
  // found, `.toJSON()` is called. If a collection is found, `.toJSON()`
  // is also called, but is used to populate an `items` array in the
  // resulting data. If both are found, defaults to the model.
  // You can override the `serializeData` method in your own view
  // definition, to provide custom serialization for your view's data.
  serializeData: function(){
    var data = {};

    if (this.model) {
      data = this.model.toJSON();
    }
    else if (this.collection) {
      data = { items: this.collection.toJSON() };
    }

    return data;
  },

  // Render the view, defaulting to underscore.js templates.
  // You can override this in your view definition to provide
  // a very specific rendering for your view. In general, though,
  // you should override the `Marionette.Renderer` object to
  // change how Marionette renders views.
  render: function(){
    this.isClosed = false;

    this.triggerMethod("before:render", this);
    this.triggerMethod("item:before:render", this);

    var data = this.serializeData();
    data = this.mixinTemplateHelpers(data);

    var template = this.getTemplate();
    var html = Marionette.Renderer.render(template, data);

    this.$el.html(html);
    this.bindUIElements();

    this.triggerMethod("render", this);
    this.triggerMethod("item:rendered", this);

    return this;
  },

  // Override the default close event to add a few
  // more events that are triggered.
  close: function(){
    if (this.isClosed){ return; }

    this.triggerMethod('item:before:close');

    Marionette.View.prototype.close.apply(this, slice(arguments));

    this.triggerMethod('item:closed');
  }
});

// Collection View
// ---------------

// A view that iterates over a Backbone.Collection
// and renders an individual ItemView for each model.
Marionette.CollectionView = Marionette.View.extend({
  // used as the prefix for item view events
  // that are forwarded through the collectionview
  itemViewEventPrefix: "itemview",

  // constructor
  constructor: function(options){
    this._initChildViewStorage();

    Marionette.View.prototype.constructor.apply(this, slice(arguments));

    this._initialEvents();
  },

  // Configured the initial events that the collection view
  // binds to. Override this method to prevent the initial
  // events, or to add your own initial events.
  _initialEvents: function(){
    if (this.collection){
      this.listenTo(this.collection, "add", this.addChildView, this);
      this.listenTo(this.collection, "remove", this.removeItemView, this);
      this.listenTo(this.collection, "reset", this.render, this);
    }
  },

  // Handle a child item added to the collection
  addChildView: function(item, collection, options){
    this.closeEmptyView();
    var ItemView = this.getItemView(item);
    var index = this.collection.indexOf(item);
    this.addItemView(item, ItemView, index);
  },

  // Override from `Marionette.View` to guarantee the `onShow` method
  // of child views is called.
  onShowCalled: function(){
    this.children.each(function(child){
      Marionette.triggerMethod.call(child, "show");
    });
  },

  // Internal method to trigger the before render callbacks
  // and events
  triggerBeforeRender: function(){
    this.triggerMethod("before:render", this);
    this.triggerMethod("collection:before:render", this);
  },

  // Internal method to trigger the rendered callbacks and
  // events
  triggerRendered: function(){
    this.triggerMethod("render", this);
    this.triggerMethod("collection:rendered", this);
  },

  // Render the collection of items. Override this method to
  // provide your own implementation of a render function for
  // the collection view.
  render: function(){
    this.isClosed = false;
    this.triggerBeforeRender();
    this._renderChildren();
    this.triggerRendered();
    return this;
  },

  // Internal method. Separated so that CompositeView can have
  // more control over events being triggered, around the rendering
  // process
  _renderChildren: function(){
    this.closeEmptyView();
    this.closeChildren();

    if (this.collection && this.collection.length > 0) {
      this.showCollection();
    } else {
      this.showEmptyView();
    }
  },

  // Internal method to loop through each item in the
  // collection view and show it
  showCollection: function(){
    var ItemView;
    this.collection.each(function(item, index){
      ItemView = this.getItemView(item);
      this.addItemView(item, ItemView, index);
    }, this);
  },

  // Internal method to show an empty view in place of
  // a collection of item views, when the collection is
  // empty
  showEmptyView: function(){
    var EmptyView = this.getEmptyView();

    if (EmptyView && !this._showingEmptyView){
      this._showingEmptyView = true;
      var model = new Backbone.Model();
      this.addItemView(model, EmptyView, 0);
    }
  },

  // Internal method to close an existing emptyView instance
  // if one exists. Called when a collection view has been
  // rendered empty, and then an item is added to the collection.
  closeEmptyView: function(){
    if (this._showingEmptyView){
      this.closeChildren();
      delete this._showingEmptyView;
    }
  },

  // Retrieve the empty view type
  getEmptyView: function(){
    return Marionette.getOption(this, "emptyView");
  },

  // Retrieve the itemView type, either from `this.options.itemView`
  // or from the `itemView` in the object definition. The "options"
  // takes precedence.
  getItemView: function(item){
    var itemView = Marionette.getOption(this, "itemView");

    if (!itemView){
      throwError("An `itemView` must be specified", "NoItemViewError");
    }

    return itemView;
  },

  // Render the child item's view and add it to the
  // HTML for the collection view.
  addItemView: function(item, ItemView, index){
    // get the itemViewOptions if any were specified
    var itemViewOptions = Marionette.getOption(this, "itemViewOptions");
    if (_.isFunction(itemViewOptions)){
      itemViewOptions = itemViewOptions.call(this, item, index);
    }

    // build the view 
    var view = this.buildItemView(item, ItemView, itemViewOptions);
    
    // set up the child view event forwarding
    this.addChildViewEventForwarding(view);

    // this view is about to be added
    this.triggerMethod("before:item:added", view);

    // Store the child view itself so we can properly
    // remove and/or close it later
    this.children.add(view);

    // Render it and show it
    this.renderItemView(view, index);

    // call the "show" method if the collection view
    // has already been shown
    if (this._isShown){
      Marionette.triggerMethod.call(view, "show");
    }

    // this view was added
    this.triggerMethod("after:item:added", view);
  },

  // Set up the child view event forwarding. Uses an "itemview:"
  // prefix in front of all forwarded events.
  addChildViewEventForwarding: function(view){
    var prefix = Marionette.getOption(this, "itemViewEventPrefix");

    // Forward all child item view events through the parent,
    // prepending "itemview:" to the event name
    this.listenTo(view, "all", function(){
      var args = slice(arguments);
      args[0] = prefix + ":" + args[0];
      args.splice(1, 0, view);

      Marionette.triggerMethod.apply(this, args);
    }, this);
  },

  // render the item view
  renderItemView: function(view, index) {
    view.render();
    this.appendHtml(this, view, index);
  },

  // Build an `itemView` for every model in the collection.
  buildItemView: function(item, ItemViewType, itemViewOptions){
    var options = _.extend({model: item}, itemViewOptions);
    return new ItemViewType(options);
  },

  // get the child view by item it holds, and remove it
  removeItemView: function(item){
    var view = this.children.findByModel(item);
    this.removeChildView(view);
    this.checkEmpty();
  },

  // Remove the child view and close it
  removeChildView: function(view){

    // shut down the child view properly,
    // including events that the collection has from it
    if (view){
      this.stopListening(view);

      // call 'close' or 'remove', depending on which is found
      if (view.close) { view.close(); }
      else if (view.remove) { view.remove(); }

      this.children.remove(view);
    }

    this.triggerMethod("item:removed", view);
  },

  // helper to show the empty view if the collection is empty
  checkEmpty: function() {
    // check if we're empty now, and if we are, show the
    // empty view
    if (!this.collection || this.collection.length === 0){
      this.showEmptyView();
    }
  },

  // Append the HTML to the collection's `el`.
  // Override this method to do something other
  // then `.append`.
  appendHtml: function(collectionView, itemView, index){
    collectionView.$el.append(itemView.el);
  },

  // Internal method to set up the `children` object for
  // storing all of the child views
  _initChildViewStorage: function(){
    this.children = new Backbone.ChildViewContainer();
  },

  // Handle cleanup and other closing needs for
  // the collection of views.
  close: function(){
    if (this.isClosed){ return; }

    this.triggerMethod("collection:before:close");
    this.closeChildren();
    this.triggerMethod("collection:closed");

    Marionette.View.prototype.close.apply(this, slice(arguments));
  },

  // Close the child views that this collection view
  // is holding on to, if any
  closeChildren: function(){
    this.children.each(function(child){
      this.removeChildView(child);
    }, this);
    this.checkEmpty();
  }
});


// Composite View
// --------------

// Used for rendering a branch-leaf, hierarchical structure.
// Extends directly from CollectionView and also renders an
// an item view as `modelView`, for the top leaf
Marionette.CompositeView = Marionette.CollectionView.extend({

  // Setting up the inheritance chain which allows changes to
  // Marionette.CollectionView.prototype.constructor which allows overriding
  constructor: function(){
    Marionette.CollectionView.prototype.constructor.apply(this, slice(arguments));
  },

  // Configured the initial events that the composite view
  // binds to. Override this method to prevent the initial
  // events, or to add your own initial events.
  _initialEvents: function(){

    // Bind only after composite view in rendered to avoid adding child views
    // to unexisting itemViewContainer
    this.once('render', function () {
      if (this.collection){
        this.listenTo(this.collection, "add", this.addChildView, this);
        this.listenTo(this.collection, "remove", this.removeItemView, this);
        this.listenTo(this.collection, "reset", this._renderChildren, this);
      }
    });

  },

  // Retrieve the `itemView` to be used when rendering each of
  // the items in the collection. The default is to return
  // `this.itemView` or Marionette.CompositeView if no `itemView`
  // has been defined
  getItemView: function(item){
    var itemView = Marionette.getOption(this, "itemView") || this.constructor;

    if (!itemView){
      throwError("An `itemView` must be specified", "NoItemViewError");
    }

    return itemView;
  },

  // Serialize the collection for the view.
  // You can override the `serializeData` method in your own view
  // definition, to provide custom serialization for your view's data.
  serializeData: function(){
    var data = {};

    if (this.model){
      data = this.model.toJSON();
    }

    return data;
  },

  // Renders the model once, and the collection once. Calling
  // this again will tell the model's view to re-render itself
  // but the collection will not re-render.
  render: function(){
    this.isRendered = true;
    this.isClosed = false;
    this.resetItemViewContainer();

    this.triggerBeforeRender();
    var html = this.renderModel();
    this.$el.html(html);
    // the ui bindings is done here and not at the end of render since they
    // will not be available until after the model is rendered, but should be
    // available before the collection is rendered.
    this.bindUIElements();
    this.triggerMethod("composite:model:rendered");

    this._renderChildren();

    this.triggerMethod("composite:rendered");
    this.triggerRendered();
    return this;
  },

  _renderChildren: function(){
    if (this.isRendered){
      Marionette.CollectionView.prototype._renderChildren.call(this);
      this.triggerMethod("composite:collection:rendered");
    }
  },

  // Render an individual model, if we have one, as
  // part of a composite view (branch / leaf). For example:
  // a treeview.
  renderModel: function(){
    var data = {};
    data = this.serializeData();
    data = this.mixinTemplateHelpers(data);

    var template = this.getTemplate();
    return Marionette.Renderer.render(template, data);
  },

  // Appends the `el` of itemView instances to the specified
  // `itemViewContainer` (a jQuery selector). Override this method to
  // provide custom logic of how the child item view instances have their
  // HTML appended to the composite view instance.
  appendHtml: function(cv, iv, index){
    var $container = this.getItemViewContainer(cv);
    $container.append(iv.el);
  },

  // Internal method to ensure an `$itemViewContainer` exists, for the
  // `appendHtml` method to use.
  getItemViewContainer: function(containerView){
    if ("$itemViewContainer" in containerView){
      return containerView.$itemViewContainer;
    }

    var container;
    var itemViewContainer = Marionette.getOption(containerView, "itemViewContainer");
    if (itemViewContainer){

      var selector = _.isFunction(itemViewContainer) ? itemViewContainer() : itemViewContainer;
      container = containerView.$(selector);
      if (container.length <= 0) {
        throwError("The specified `itemViewContainer` was not found: " + containerView.itemViewContainer, "ItemViewContainerMissingError");
      }

    } else {
      container = containerView.$el;
    }

    containerView.$itemViewContainer = container;
    return container;
  },

  // Internal method to reset the `$itemViewContainer` on render
  resetItemViewContainer: function(){
    if (this.$itemViewContainer){
      delete this.$itemViewContainer;
    }
  }
});


// Layout
// ------

// Used for managing application layouts, nested layouts and
// multiple regions within an application or sub-application.
//
// A specialized view type that renders an area of HTML and then
// attaches `Region` instances to the specified `regions`.
// Used for composite view management and sub-application areas.
Marionette.Layout = Marionette.ItemView.extend({
  regionType: Marionette.Region,
  
  // Ensure the regions are available when the `initialize` method
  // is called.
  constructor: function (options) {
    options = options || {};

    this._firstRender = true;
    this._initializeRegions(options);
    
    Marionette.ItemView.prototype.constructor.call(this, options);
  },

  // Layout's render will use the existing region objects the
  // first time it is called. Subsequent calls will close the
  // views that the regions are showing and then reset the `el`
  // for the regions to the newly rendered DOM elements.
  render: function(){

    if (this.isClosed){
      // a previously closed layout means we need to 
      // completely re-initialize the regions
      this._initializeRegions();
    }
    if (this._firstRender) {
      // if this is the first render, don't do anything to
      // reset the regions
      this._firstRender = false;
    } else if (!this.isClosed){
      // If this is not the first render call, then we need to 
      // re-initializing the `el` for each region
      this._reInitializeRegions();
    }

    var args = Array.prototype.slice.apply(arguments);
    var result = Marionette.ItemView.prototype.render.apply(this, args);

    return result;
  },

  // Handle closing regions, and then close the view itself.
  close: function () {
    if (this.isClosed){ return; }
    this.regionManager.close();
    var args = Array.prototype.slice.apply(arguments);
    Marionette.ItemView.prototype.close.apply(this, args);
  },

  // Add a single region, by name, to the layout
  addRegion: function(name, definition){
    var regions = {};
    regions[name] = definition;
    return this._buildRegions(regions)[name];
  },

  // Add multiple regions as a {name: definition, name2: def2} object literal
  addRegions: function(regions){
    this.regions = _.extend({}, this.regions, regions);
    return this._buildRegions(regions);
  },

  // Remove a single region from the Layout, by name
  removeRegion: function(name){
    delete this.regions[name];
    return this.regionManager.removeRegion(name);
  },

  // internal method to build regions
  _buildRegions: function(regions){
    var that = this;

    var defaults = {
      regionType: Marionette.getOption(this, "regionType"),
      parentEl: function(){ return that.$el; }
    };

    return this.regionManager.addRegions(regions, defaults);
  },

  // Internal method to initialize the regions that have been defined in a
  // `regions` attribute on this layout. 
  _initializeRegions: function (options) {
    var regions;
    this._initRegionManager();

    if (_.isFunction(this.regions)) {
      regions = this.regions(options);
    } else {
      regions = this.regions || {};
    }

    this.addRegions(regions);
  },

  // Internal method to re-initialize all of the regions by updating the `el` that
  // they point to
  _reInitializeRegions: function(){
    this.regionManager.closeRegions();
    this.regionManager.each(function(region){
      region.reset();
    });
  },

  // Internal method to initialize the region manager
  // and all regions in it
  _initRegionManager: function(){
    this.regionManager = new Marionette.RegionManager();

    this.listenTo(this.regionManager, "region:add", function(name, region){
      this[name] = region;
      this.trigger("region:add", name, region);
    });

    this.listenTo(this.regionManager, "region:remove", function(name, region){
      delete this[name];
      this.trigger("region:remove", name, region);
    });
  }
});


// AppRouter
// ---------

// Reduce the boilerplate code of handling route events
// and then calling a single method on another object.
// Have your routers configured to call the method on
// your object, directly.
//
// Configure an AppRouter with `appRoutes`.
//
// App routers can only take one `controller` object. 
// It is recommended that you divide your controller
// objects in to smaller pieces of related functionality
// and have multiple routers / controllers, instead of
// just one giant router and controller.
//
// You can also add standard routes to an AppRouter.

Marionette.AppRouter = Backbone.Router.extend({

  constructor: function(options){
    Backbone.Router.prototype.constructor.apply(this, slice(arguments));
	
    this.options = options || {};

    var appRoutes = Marionette.getOption(this, "appRoutes");
    var controller = this._getController();
    this.processAppRoutes(controller, appRoutes);
  },

  // Similar to route method on a Backbone Router but
  // method is called on the controller
  appRoute: function(route, methodName) {
    var controller = this._getController();
    this._addAppRoute(controller, route, methodName);
  },

  // Internal method to process the `appRoutes` for the
  // router, and turn them in to routes that trigger the
  // specified method on the specified `controller`.
  processAppRoutes: function(controller, appRoutes) {
    if (!appRoutes){ return; }

    var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

    _.each(routeNames, function(route) {
      this._addAppRoute(controller, route, appRoutes[route]);
    }, this);
  },

  _getController: function(){
    return Marionette.getOption(this, "controller");
  },

  _addAppRoute: function(controller, route, methodName){
    var method = controller[methodName];

    if (!method) {
      throw new Error("Method '" + methodName + "' was not found on the controller");
    }

    this.route(route, methodName, _.bind(method, controller));
  }
});


// Application
// -----------

// Contain and manage the composite application as a whole.
// Stores and starts up `Region` objects, includes an
// event aggregator as `app.vent`
Marionette.Application = function(options){
  this._initRegionManager();
  this._initCallbacks = new Marionette.Callbacks();
  this.vent = new Backbone.Wreqr.EventAggregator();
  this.commands = new Backbone.Wreqr.Commands();
  this.reqres = new Backbone.Wreqr.RequestResponse();
  this.submodules = {};

  _.extend(this, options);

  this.triggerMethod = Marionette.triggerMethod;
};

_.extend(Marionette.Application.prototype, Backbone.Events, {
  // Command execution, facilitated by Backbone.Wreqr.Commands
  execute: function(){
    var args = Array.prototype.slice.apply(arguments);
    this.commands.execute.apply(this.commands, args);
  },

  // Request/response, facilitated by Backbone.Wreqr.RequestResponse
  request: function(){
    var args = Array.prototype.slice.apply(arguments);
    return this.reqres.request.apply(this.reqres, args);
  },

  // Add an initializer that is either run at when the `start`
  // method is called, or run immediately if added after `start`
  // has already been called.
  addInitializer: function(initializer){
    this._initCallbacks.add(initializer);
  },

  // kick off all of the application's processes.
  // initializes all of the regions that have been added
  // to the app, and runs all of the initializer functions
  start: function(options){
    this.triggerMethod("initialize:before", options);
    this._initCallbacks.run(options, this);
    this.triggerMethod("initialize:after", options);

    this.triggerMethod("start", options);
  },

  // Add regions to your app. 
  // Accepts a hash of named strings or Region objects
  // addRegions({something: "#someRegion"})
  // addRegions({something: Region.extend({el: "#someRegion"}) });
  addRegions: function(regions){
    return this._regionManager.addRegions(regions);
  },

  // Close all regions in the app, without removing them
  closeRegions: function(){
    this._regionManager.closeRegions();
  },

  // Removes a region from your app, by name
  // Accepts the regions name
  // removeRegion('myRegion')
  removeRegion: function(region) {
    this._regionManager.removeRegion(region);
  },
  
  // Provides alternative access to regions
  // Accepts the region name
  // getRegion('main')
  getRegion: function(region) {
    return this._regionManager.get(region);
  },

  // Create a module, attached to the application
  module: function(moduleNames, moduleDefinition){
    // slice the args, and add this application object as the
    // first argument of the array
    var args = slice(arguments);
    args.unshift(this);

    // see the Marionette.Module object for more information
    return Marionette.Module.create.apply(Marionette.Module, args);
  },

  // Internal method to set up the region manager
  _initRegionManager: function(){
    this._regionManager = new Marionette.RegionManager();

    this.listenTo(this._regionManager, "region:add", function(name, region){
      this[name] = region;
    });

    this.listenTo(this._regionManager, "region:remove", function(name, region){
      delete this[name];
    });
  }
});

// Copy the `extend` function used by Backbone's classes
Marionette.Application.extend = Marionette.extend;

// Module
// ------

// A simple module system, used to create privacy and encapsulation in
// Marionette applications
Marionette.Module = function(moduleName, app){
  this.moduleName = moduleName;

  // store sub-modules
  this.submodules = {};

  this._setupInitializersAndFinalizers();

  // store the configuration for this module
  this.app = app;
  this.startWithParent = true;

  this.triggerMethod = Marionette.triggerMethod;
};

// Extend the Module prototype with events / listenTo, so that the module
// can be used as an event aggregator or pub/sub.
_.extend(Marionette.Module.prototype, Backbone.Events, {

  // Initializer for a specific module. Initializers are run when the
  // module's `start` method is called.
  addInitializer: function(callback){
    this._initializerCallbacks.add(callback);
  },

  // Finalizers are run when a module is stopped. They are used to teardown
  // and finalize any variables, references, events and other code that the
  // module had set up.
  addFinalizer: function(callback){
    this._finalizerCallbacks.add(callback);
  },

  // Start the module, and run all of its initializers
  start: function(options){
    // Prevent re-starting a module that is already started
    if (this._isInitialized){ return; }

    // start the sub-modules (depth-first hierarchy)
    _.each(this.submodules, function(mod){
      // check to see if we should start the sub-module with this parent
      if (mod.startWithParent){
        mod.start(options);
      }
    });

    // run the callbacks to "start" the current module
    this.triggerMethod("before:start", options);

    this._initializerCallbacks.run(options, this);
    this._isInitialized = true;

    this.triggerMethod("start", options);
  },

  // Stop this module by running its finalizers and then stop all of
  // the sub-modules for this module
  stop: function(){
    // if we are not initialized, don't bother finalizing
    if (!this._isInitialized){ return; }
    this._isInitialized = false;

    Marionette.triggerMethod.call(this, "before:stop");

    // stop the sub-modules; depth-first, to make sure the
    // sub-modules are stopped / finalized before parents
    _.each(this.submodules, function(mod){ mod.stop(); });

    // run the finalizers
    this._finalizerCallbacks.run(undefined,this);

    // reset the initializers and finalizers
    this._initializerCallbacks.reset();
    this._finalizerCallbacks.reset();

    Marionette.triggerMethod.call(this, "stop");
  },

  // Configure the module with a definition function and any custom args
  // that are to be passed in to the definition function
  addDefinition: function(moduleDefinition, customArgs){
    this._runModuleDefinition(moduleDefinition, customArgs);
  },

  // Internal method: run the module definition function with the correct
  // arguments
  _runModuleDefinition: function(definition, customArgs){
    if (!definition){ return; }

    // build the correct list of arguments for the module definition
    var args = _.flatten([
      this,
      this.app,
      Backbone,
      Marionette,
      Marionette.$, _,
      customArgs
    ]);

    definition.apply(this, args);
  },

  // Internal method: set up new copies of initializers and finalizers.
  // Calling this method will wipe out all existing initializers and
  // finalizers.
  _setupInitializersAndFinalizers: function(){
    this._initializerCallbacks = new Marionette.Callbacks();
    this._finalizerCallbacks = new Marionette.Callbacks();
  }
});

// Type methods to create modules
_.extend(Marionette.Module, {

  // Create a module, hanging off the app parameter as the parent object.
  create: function(app, moduleNames, moduleDefinition){
    var module = app;

    // get the custom args passed in after the module definition and
    // get rid of the module name and definition function
    var customArgs = slice(arguments);
    customArgs.splice(0, 3);

    // split the module names and get the length
    moduleNames = moduleNames.split(".");
    var length = moduleNames.length;

    // store the module definition for the last module in the chain
    var moduleDefinitions = [];
    moduleDefinitions[length-1] = moduleDefinition;

    // Loop through all the parts of the module definition
    _.each(moduleNames, function(moduleName, i){
      var parentModule = module;
      module = this._getModule(parentModule, moduleName, app);
      this._addModuleDefinition(parentModule, module, moduleDefinitions[i], customArgs);
    }, this);

    // Return the last module in the definition chain
    return module;
  },

  _getModule: function(parentModule, moduleName, app, def, args){
    // Get an existing module of this name if we have one
    var module = parentModule[moduleName];

    if (!module){
      // Create a new module if we don't have one
      module = new Marionette.Module(moduleName, app);
      parentModule[moduleName] = module;
      // store the module on the parent
      parentModule.submodules[moduleName] = module;
    }

    return module;
  },

  _addModuleDefinition: function(parentModule, module, def, args){
    var fn; 
    var startWithParent;

    if (_.isFunction(def)){
      // if a function is supplied for the module definition
      fn = def;
      startWithParent = true;

    } else if (_.isObject(def)){
      // if an object is supplied
      fn = def.define;
      startWithParent = def.startWithParent;
      
    } else {
      // if nothing is supplied
      startWithParent = true;
    }

    // add module definition if needed
    if (fn){
      module.addDefinition(fn, args);
    }

    // `and` the two together, ensuring a single `false` will prevent it
    // from starting with the parent
    module.startWithParent = module.startWithParent && startWithParent;

    // setup auto-start if needed
    if (module.startWithParent && !module.startWithParentIsConfigured){

      // only configure this once
      module.startWithParentIsConfigured = true;

      // add the module initializer config
      parentModule.addInitializer(function(options){
        if (module.startWithParent){
          module.start(options);
        }
      });

    }

  }
});



  return Marionette;
})(this, Backbone, _);

; browserify_shim__define__module__export__(typeof Marionette != "undefined" ? Marionette : window.Marionette);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],"backbone.babysitter":[function(require,module,exports){
module.exports=require('Kc+1ms');
},{}],"Kc+1ms":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {

; global.Backbone = require("backbone");
// Backbone.BabySitter
// -------------------
// v0.0.6
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/babysitterjs/backbone.babysitter

// Backbone.ChildViewContainer
// ---------------------------
//
// Provide a container to store, retrieve and
// shut down child views.

Backbone.ChildViewContainer = (function(Backbone, _){
  
  // Container Constructor
  // ---------------------

  var Container = function(views){
    this._views = {};
    this._indexByModel = {};
    this._indexByCustom = {};
    this._updateLength();

    _.each(views, this.add, this);
  };

  // Container Methods
  // -----------------

  _.extend(Container.prototype, {

    // Add a view to this container. Stores the view
    // by `cid` and makes it searchable by the model
    // cid (and model itself). Optionally specify
    // a custom key to store an retrieve the view.
    add: function(view, customIndex){
      var viewCid = view.cid;

      // store the view
      this._views[viewCid] = view;

      // index it by model
      if (view.model){
        this._indexByModel[view.model.cid] = viewCid;
      }

      // index by custom
      if (customIndex){
        this._indexByCustom[customIndex] = viewCid;
      }

      this._updateLength();
    },

    // Find a view by the model that was attached to
    // it. Uses the model's `cid` to find it.
    findByModel: function(model){
      return this.findByModelCid(model.cid);
    },

    // Find a view by the `cid` of the model that was attached to
    // it. Uses the model's `cid` to find the view `cid` and
    // retrieve the view using it.
    findByModelCid: function(modelCid){
      var viewCid = this._indexByModel[modelCid];
      return this.findByCid(viewCid);
    },

    // Find a view by a custom indexer.
    findByCustom: function(index){
      var viewCid = this._indexByCustom[index];
      return this.findByCid(viewCid);
    },

    // Find by index. This is not guaranteed to be a
    // stable index.
    findByIndex: function(index){
      return _.values(this._views)[index];
    },

    // retrieve a view by it's `cid` directly
    findByCid: function(cid){
      return this._views[cid];
    },

    // Remove a view
    remove: function(view){
      var viewCid = view.cid;

      // delete model index
      if (view.model){
        delete this._indexByModel[view.model.cid];
      }

      // delete custom index
      _.any(this._indexByCustom, function(cid, key) {
        if (cid === viewCid) {
          delete this._indexByCustom[key];
          return true;
        }
      }, this);

      // remove the view from the container
      delete this._views[viewCid];

      // update the length
      this._updateLength();
    },

    // Call a method on every view in the container,
    // passing parameters to the call method one at a
    // time, like `function.call`.
    call: function(method){
      this.apply(method, _.tail(arguments));
    },

    // Apply a method on every view in the container,
    // passing parameters to the call method one at a
    // time, like `function.apply`.
    apply: function(method, args){
      _.each(this._views, function(view){
        if (_.isFunction(view[method])){
          view[method].apply(view, args || []);
        }
      });
    },

    // Update the `.length` attribute on this container
    _updateLength: function(){
      this.length = _.size(this._views);
    }
  });

  // Borrowing this code from Backbone.Collection:
  // http://backbonejs.org/docs/backbone.html#section-106
  //
  // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
    'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
    'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
    'last', 'without', 'isEmpty', 'pluck'];

  _.each(methods, function(method) {
    Container.prototype[method] = function() {
      var views = _.values(this._views);
      var args = [views].concat(_.toArray(arguments));
      return _[method].apply(_, args);
    };
  });

  // return the public API
  return Container;
})(Backbone, _);

; browserify_shim__define__module__export__(typeof Backbone.Babysitter != "undefined" ? Backbone.Babysitter : window.Backbone.Babysitter);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"backbone":"vocP7Q"}],"hPVPd7":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {

; global.Backbone = require("backbone");
// Backbone.Wreqr (Backbone.Marionette)
// ----------------------------------
// v0.2.0
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.wreqr


Backbone.Wreqr = (function(Backbone, Marionette, _){
  "use strict";
  var Wreqr = {};

  // Handlers
// --------
// A registry of functions to call, given a name

Wreqr.Handlers = (function(Backbone, _){
  "use strict";
  
  // Constructor
  // -----------

  var Handlers = function(options){
    this.options = options;
    this._wreqrHandlers = {};
    
    if (_.isFunction(this.initialize)){
      this.initialize(options);
    }
  };

  Handlers.extend = Backbone.Model.extend;

  // Instance Members
  // ----------------

  _.extend(Handlers.prototype, Backbone.Events, {

    // Add multiple handlers using an object literal configuration
    setHandlers: function(handlers){
      _.each(handlers, function(handler, name){
        var context = null;

        if (_.isObject(handler) && !_.isFunction(handler)){
          context = handler.context;
          handler = handler.callback;
        }

        this.setHandler(name, handler, context);
      }, this);
    },

    // Add a handler for the given name, with an
    // optional context to run the handler within
    setHandler: function(name, handler, context){
      var config = {
        callback: handler,
        context: context
      };

      this._wreqrHandlers[name] = config;

      this.trigger("handler:add", name, handler, context);
    },

    // Determine whether or not a handler is registered
    hasHandler: function(name){
      return !! this._wreqrHandlers[name];
    },

    // Get the currently registered handler for
    // the specified name. Throws an exception if
    // no handler is found.
    getHandler: function(name){
      var config = this._wreqrHandlers[name];

      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      return function(){
        var args = Array.prototype.slice.apply(arguments);
        return config.callback.apply(config.context, args);
      };
    },

    // Remove a handler for the specified name
    removeHandler: function(name){
      delete this._wreqrHandlers[name];
    },

    // Remove all handlers from this registry
    removeAllHandlers: function(){
      this._wreqrHandlers = {};
    }
  });

  return Handlers;
})(Backbone, _);

  // Wreqr.CommandStorage
// --------------------
//
// Store and retrieve commands for execution.
Wreqr.CommandStorage = (function(){
  "use strict";

  // Constructor function
  var CommandStorage = function(options){
    this.options = options;
    this._commands = {};

    if (_.isFunction(this.initialize)){
      this.initialize(options);
    }
  };

  // Instance methods
  _.extend(CommandStorage.prototype, Backbone.Events, {

    // Get an object literal by command name, that contains
    // the `commandName` and the `instances` of all commands
    // represented as an array of arguments to process
    getCommands: function(commandName){
      var commands = this._commands[commandName];

      // we don't have it, so add it
      if (!commands){

        // build the configuration
        commands = {
          command: commandName, 
          instances: []
        };

        // store it
        this._commands[commandName] = commands;
      }

      return commands;
    },

    // Add a command by name, to the storage and store the
    // args for the command
    addCommand: function(commandName, args){
      var command = this.getCommands(commandName);
      command.instances.push(args);
    },

    // Clear all commands for the given `commandName`
    clearCommands: function(commandName){
      var command = this.getCommands(commandName);
      command.instances = [];
    }
  });

  return CommandStorage;
})();

  // Wreqr.Commands
// --------------
//
// A simple command pattern implementation. Register a command
// handler and execute it.
Wreqr.Commands = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    // default storage type
    storageType: Wreqr.CommandStorage,

    constructor: function(options){
      this.options = options || {};

      this._initializeStorage(this.options);
      this.on("handler:add", this._executeCommands, this);

      var args = Array.prototype.slice.call(arguments);
      Wreqr.Handlers.prototype.constructor.apply(this, args);
    },

    // Execute a named command with the supplied args
    execute: function(name, args){
      name = arguments[0];
      args = Array.prototype.slice.call(arguments, 1);

      if (this.hasHandler(name)){
        this.getHandler(name).apply(this, args);
      } else {
        this.storage.addCommand(name, args);
      }

    },

    // Internal method to handle bulk execution of stored commands
    _executeCommands: function(name, handler, context){
      var command = this.storage.getCommands(name);

      // loop through and execute all the stored command instances
      _.each(command.instances, function(args){
        handler.apply(context, args);
      });

      this.storage.clearCommands(name);
    },

    // Internal method to initialize storage either from the type's
    // `storageType` or the instance `options.storageType`.
    _initializeStorage: function(options){
      var storage;

      var StorageType = options.storageType || this.storageType;
      if (_.isFunction(StorageType)){
        storage = new StorageType();
      } else {
        storage = StorageType;
      }

      this.storage = storage;
    }
  });

})(Wreqr);

  // Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    request: function(){
      var name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      return this.getHandler(name).apply(this, args);
    }
  });

})(Wreqr);

  // Event Aggregator
// ----------------
// A pub-sub object that can be used to decouple various parts
// of an application through event-driven architecture.

Wreqr.EventAggregator = (function(Backbone, _){
  "use strict";
  var EA = function(){};

  // Copy the `extend` function used by Backbone's classes
  EA.extend = Backbone.Model.extend;

  // Copy the basic Backbone.Events on to the event aggregator
  _.extend(EA.prototype, Backbone.Events);

  return EA;
})(Backbone, _);


  return Wreqr;
})(Backbone, Backbone.Marionette, _);

; browserify_shim__define__module__export__(typeof Backbone.Wreqr != "undefined" ? Backbone.Wreqr : window.Backbone.Wreqr);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"backbone":"vocP7Q"}],"backbone.wreqr":[function(require,module,exports){
module.exports=require('hPVPd7');
},{}],"backbone":[function(require,module,exports){
module.exports=require('vocP7Q');
},{}],"vocP7Q":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {

; global.underscore = require("underscore");
//     Backbone.js 1.1.0

//     (c) 2010-2011 Jeremy Ashkenas, DocumentCloud Inc.
//     (c) 2011-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i];
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);

          // Listen to added models' events, and index models for lookup by
          // `id` and by `cid`.
          model.on('all', this._onModelEvent, this);
          this._byId[model.cid] = model;
          if (model.id != null) this._byId[model.id] = model;
        }
        if (order) order.push(existing || model);
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }
      
      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id] || this._byId[obj.cid] || this._byId[obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash and query.
  var pathStripper = /[?#].*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !atRoot) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the fragment of the query and hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

}).call(this);

; browserify_shim__define__module__export__(typeof Backbone != "undefined" ? Backbone : window.Backbone);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"underscore":"BWM0Lx"}],35:[function(require,module,exports){

},{}],36:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"WPLrfX":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});

; browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"jquery":[function(require,module,exports){
module.exports=require('WPLrfX');
},{}],"rendr-handlebars":[function(require,module,exports){
module.exports=require('O+nOmA');
},{}],"O+nOmA":[function(require,module,exports){
var Handlebars = require('handlebars');

module.exports = function(options){
  var localExports = {},
      templateFinder = require('./shared/templateFinder')(Handlebars);

  /**
   * Export the `Handlebars` object, so other modules can add helpers, partials, etc.
   */
  localExports.Handlebars = Handlebars;

  /**
   * `getTemplate` is available on both client and server.
   */
  localExports.getTemplate = templateFinder.getTemplate;

  /**
   * Expose `templatePatterns` for manipulating how `getTemplate` finds templates.
   */
  localExports.templatePatterns = templateFinder.templatePatterns;

  /**
   * The default pattern `/.+/` is very greedy; it matches anything, including nested paths.
   * To add rules that should match before this default rule, `unshift` them from this array.
   */
  localExports.templatePatterns.push({pattern: /.+/, src: options.entryPath + 'app/templates/compiledTemplates'})

  /**
   * `getLayout` should only be used on the server.
   */
  if (typeof window === 'undefined') {
    // server only, "hide" it from r.js compiler
    // by having require statement with variable
    var serverOnlyLayoutFinderPath = './server/layoutFinder';
    localExports.getLayout = require(serverOnlyLayoutFinderPath)(Handlebars).getLayout;
  } else {
    localExports.getLayout = function() {
      throw new Error('getLayout is only available on the server.');
    };
  }

  /**
   * Register helpers, available on both client and server.
   *
   * Export it so other modules can register helpers as well.
   */
  localExports.registerHelpers = function registerHelpers(helpersModule) {
    var helpers = helpersModule(Handlebars, localExports.getTemplate);

    for (var key in helpers) {
      if (!helpers.hasOwnProperty(key)) continue;
      Handlebars.registerHelper(key, helpers[key]);
    }
  };

  /**
   * Register the pre-bundled Rendr helpers.
   */
  var rendrHelpers = require('./shared/helpers');
  localExports.registerHelpers(rendrHelpers);

  return localExports;
}

},{"./shared/helpers":53,"./shared/templateFinder":54,"handlebars":41}],41:[function(require,module,exports){
var handlebars = require("./handlebars/base"),

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
  utils = require("./handlebars/utils"),
  compiler = require("./handlebars/compiler"),
  runtime = require("./handlebars/runtime");

var create = function() {
  var hb = handlebars.create();

  utils.attach(hb);
  compiler.attach(hb);
  runtime.attach(hb);

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

module.exports = Handlebars; // instantiate an instance

// Publish a Node.js require() handler for .handlebars and .hbs files
if (require.extensions) {
  var extension = function(module, filename) {
    var fs = require("fs");
    var templateString = fs.readFileSync(filename, "utf8");
    module.exports = Handlebars.compile(templateString);
  };
  require.extensions[".handlebars"] = extension;
  require.extensions[".hbs"] = extension;
}

// BEGIN(BROWSER)

// END(BROWSER)

// USAGE:
// var handlebars = require('handlebars');

// var singleton = handlebars.Handlebars,
//  local = handlebars.create();

},{"./handlebars/base":42,"./handlebars/compiler":46,"./handlebars/runtime":51,"./handlebars/utils":52,"fs":35}],42:[function(require,module,exports){
/*jshint eqnull: true */

module.exports.create = function() {

var Handlebars = {};

// BEGIN(BROWSER)

Handlebars.VERSION = "1.0.0";
Handlebars.COMPILER_REVISION = 4;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

var toString = Object.prototype.toString,
    functionType = '[object Function]',
    objectType = '[object Object]';

Handlebars.registerHelper = function(name, fn, inverse) {
  if (toString.call(name) === objectType) {
    if (inverse || fn) { throw new Handlebars.Exception('Arg not supported with multiple helpers'); }
    Handlebars.Utils.extend(this.helpers, name);
  } else {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
  }
};

Handlebars.registerPartial = function(name, str) {
  if (toString.call(name) === objectType) {
    Handlebars.Utils.extend(this.partials,  name);
  } else {
    this.partials[name] = str;
  }
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Missing helper: '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(conditional, options) {
  var type = toString.call(conditional);
  if(type === functionType) { conditional = conditional.call(this); }

  if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  return Handlebars.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});

// END(BROWSER)

return Handlebars;
};

},{}],43:[function(require,module,exports){
exports.attach = function(Handlebars) {

// BEGIN(BROWSER)
Handlebars.AST = {};

Handlebars.AST.ProgramNode = function(statements, inverse) {
  this.type = "program";
  this.statements = statements;
  if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
};

Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
  this.type = "mustache";
  this.escaped = !unescaped;
  this.hash = hash;

  var id = this.id = rawParams[0];
  var params = this.params = rawParams.slice(1);

  // a mustache is an eligible helper if:
  // * its id is simple (a single part, not `this` or `..`)
  var eligibleHelper = this.eligibleHelper = id.isSimple;

  // a mustache is definitely a helper if:
  // * it is an eligible helper, and
  // * it has at least one parameter or hash segment
  this.isHelper = eligibleHelper && (params.length || hash);

  // if a mustache is an eligible helper but not a definite
  // helper, it is ambiguous, and will be resolved in a later
  // pass or at runtime.
};

Handlebars.AST.PartialNode = function(partialName, context) {
  this.type         = "partial";
  this.partialName  = partialName;
  this.context      = context;
};

Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
  if(mustache.id.original !== close.original) {
    throw new Handlebars.Exception(mustache.id.original + " doesn't match " + close.original);
  }

  this.type = "block";
  this.mustache = mustache;
  this.program  = program;
  this.inverse  = inverse;

  if (this.inverse && !this.program) {
    this.isInverse = true;
  }
};

Handlebars.AST.ContentNode = function(string) {
  this.type = "content";
  this.string = string;
};

Handlebars.AST.HashNode = function(pairs) {
  this.type = "hash";
  this.pairs = pairs;
};

Handlebars.AST.IdNode = function(parts) {
  this.type = "ID";

  var original = "",
      dig = [],
      depth = 0;

  for(var i=0,l=parts.length; i<l; i++) {
    var part = parts[i].part;
    original += (parts[i].separator || '') + part;

    if (part === ".." || part === "." || part === "this") {
      if (dig.length > 0) { throw new Handlebars.Exception("Invalid path: " + original); }
      else if (part === "..") { depth++; }
      else { this.isScoped = true; }
    }
    else { dig.push(part); }
  }

  this.original = original;
  this.parts    = dig;
  this.string   = dig.join('.');
  this.depth    = depth;

  // an ID is simple if it only has one part, and that part is not
  // `..` or `this`.
  this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

  this.stringModeValue = this.string;
};

Handlebars.AST.PartialNameNode = function(name) {
  this.type = "PARTIAL_NAME";
  this.name = name.original;
};

Handlebars.AST.DataNode = function(id) {
  this.type = "DATA";
  this.id = id;
};

Handlebars.AST.StringNode = function(string) {
  this.type = "STRING";
  this.original =
    this.string =
    this.stringModeValue = string;
};

Handlebars.AST.IntegerNode = function(integer) {
  this.type = "INTEGER";
  this.original =
    this.integer = integer;
  this.stringModeValue = Number(integer);
};

Handlebars.AST.BooleanNode = function(bool) {
  this.type = "BOOLEAN";
  this.bool = bool;
  this.stringModeValue = bool === "true";
};

Handlebars.AST.CommentNode = function(comment) {
  this.type = "comment";
  this.comment = comment;
};

// END(BROWSER)

return Handlebars;
};


},{}],44:[function(require,module,exports){
var handlebars = require("./parser");

exports.attach = function(Handlebars) {

// BEGIN(BROWSER)

Handlebars.Parser = handlebars;

Handlebars.parse = function(input) {

  // Just return if an already-compile AST was passed in.
  if(input.constructor === Handlebars.AST.ProgramNode) { return input; }

  Handlebars.Parser.yy = Handlebars.AST;
  return Handlebars.Parser.parse(input);
};

// END(BROWSER)

return Handlebars;
};

},{"./parser":48}],45:[function(require,module,exports){
var compilerbase = require("./base");

exports.attach = function(Handlebars) {

compilerbase.attach(Handlebars);

// BEGIN(BROWSER)

/*jshint eqnull:true*/
var Compiler = Handlebars.Compiler = function() {};

// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  disassemble: function() {
    var opcodes = this.opcodes, opcode, out = [], params, param;

    for (var i=0, l=opcodes.length; i<l; i++) {
      opcode = opcodes[i];

      if (opcode.opcode === 'DECLARE') {
        out.push("DECLARE " + opcode.name + "=" + opcode.value);
      } else {
        params = [];
        for (var j=0; j<opcode.args.length; j++) {
          param = opcode.args[j];
          if (typeof param === "string") {
            param = "\"" + param.replace("\n", "\\n") + "\"";
          }
          params.push(param);
        }
        out.push(opcode.opcode + " " + params.join(" "));
      }
    }

    return out.join("\n");
  },
  equals: function(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
        return false;
      }
      for (var j = 0; j < opcode.args.length; j++) {
        if (opcode.args[j] !== otherOpcode.args[j]) {
          return false;
        }
      }
    }

    len = this.children.length;
    if (other.children.length !== len) {
      return false;
    }
    for (i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function(program, options) {
    this.children = [];
    this.depths = {list: []};
    this.options = options;

    // These changes will propagate to the other compiler components
    var knownHelpers = this.options.knownHelpers;
    this.options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true
    };
    if (knownHelpers) {
      for (var name in knownHelpers) {
        this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.program(program);
  },

  accept: function(node) {
    return this[node.type](node);
  },

  program: function(program) {
    var statements = program.statements, statement;
    this.opcodes = [];

    for(var i=0, l=statements.length; i<l; i++) {
      statement = statements[i];
      this[statement.type](statement);
    }
    this.isSimple = l === 1;

    this.depths.list = this.depths.list.sort(function(a, b) {
      return a - b;
    });

    return this;
  },

  compileProgram: function(program) {
    var result = new this.compiler().compile(program, this.options);
    var guid = this.guid++, depth;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;

    for(var i=0, l=result.depths.list.length; i<l; i++) {
      depth = result.depths.list[i];

      if(depth < 2) { continue; }
      else { this.addDepth(depth - 1); }
    }

    return guid;
  },

  block: function(block) {
    var mustache = block.mustache,
        program = block.program,
        inverse = block.inverse;

    if (program) {
      program = this.compileProgram(program);
    }

    if (inverse) {
      inverse = this.compileProgram(inverse);
    }

    var type = this.classifyMustache(mustache);

    if (type === "helper") {
      this.helperMustache(mustache, program, inverse);
    } else if (type === "simple") {
      this.simpleMustache(mustache);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue');
    } else {
      this.ambiguousMustache(mustache, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  hash: function(hash) {
    var pairs = hash.pairs, pair, val;

    this.opcode('pushHash');

    for(var i=0, l=pairs.length; i<l; i++) {
      pair = pairs[i];
      val  = pair[1];

      if (this.options.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);
      } else {
        this.accept(val);
      }

      this.opcode('assignToHash', pair[0]);
    }
    this.opcode('popHash');
  },

  partial: function(partial) {
    var partialName = partial.partialName;
    this.usePartial = true;

    if(partial.context) {
      this.ID(partial.context);
    } else {
      this.opcode('push', 'depth0');
    }

    this.opcode('invokePartial', partialName.name);
    this.opcode('append');
  },

  content: function(content) {
    this.opcode('appendContent', content.string);
  },

  mustache: function(mustache) {
    var options = this.options;
    var type = this.classifyMustache(mustache);

    if (type === "simple") {
      this.simpleMustache(mustache);
    } else if (type === "helper") {
      this.helperMustache(mustache);
    } else {
      this.ambiguousMustache(mustache);
    }

    if(mustache.escaped && !options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },

  ambiguousMustache: function(mustache, program, inverse) {
    var id = mustache.id,
        name = id.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', id.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleMustache: function(mustache) {
    var id = mustache.id;

    if (id.type === 'DATA') {
      this.DATA(id);
    } else if (id.parts.length) {
      this.ID(id);
    } else {
      // Simplified ID for `this`
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);
      this.opcode('pushContext');
    }

    this.opcode('resolvePossibleLambda');
  },

  helperMustache: function(mustache, program, inverse) {
    var params = this.setupFullMustacheParams(mustache, program, inverse),
        name = mustache.id.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
    } else {
      this.opcode('invokeHelper', params.length, name);
    }
  },

  ID: function(id) {
    this.addDepth(id.depth);
    this.opcode('getContext', id.depth);

    var name = id.parts[0];
    if (!name) {
      this.opcode('pushContext');
    } else {
      this.opcode('lookupOnContext', id.parts[0]);
    }

    for(var i=1, l=id.parts.length; i<l; i++) {
      this.opcode('lookup', id.parts[i]);
    }
  },

  DATA: function(data) {
    this.options.data = true;
    if (data.id.isScoped || data.id.depth) {
      throw new Handlebars.Exception('Scoped data references are not supported: ' + data.original);
    }

    this.opcode('lookupData');
    var parts = data.id.parts;
    for(var i=0, l=parts.length; i<l; i++) {
      this.opcode('lookup', parts[i]);
    }
  },

  STRING: function(string) {
    this.opcode('pushString', string.string);
  },

  INTEGER: function(integer) {
    this.opcode('pushLiteral', integer.integer);
  },

  BOOLEAN: function(bool) {
    this.opcode('pushLiteral', bool.bool);
  },

  comment: function() {},

  // HELPERS
  opcode: function(name) {
    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
  },

  declare: function(name, value) {
    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
  },

  addDepth: function(depth) {
    if(isNaN(depth)) { throw new Error("EWOT"); }
    if(depth === 0) { return; }

    if(!this.depths[depth]) {
      this.depths[depth] = true;
      this.depths.list.push(depth);
    }
  },

  classifyMustache: function(mustache) {
    var isHelper   = mustache.isHelper;
    var isEligible = mustache.eligibleHelper;
    var options    = this.options;

    // if ambiguous, we can possibly resolve the ambiguity now
    if (isEligible && !isHelper) {
      var name = mustache.id.parts[0];

      if (options.knownHelpers[name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) { return "helper"; }
    else if (isEligible) { return "ambiguous"; }
    else { return "simple"; }
  },

  pushParams: function(params) {
    var i = params.length, param;

    while(i--) {
      param = params[i];

      if(this.options.stringParams) {
        if(param.depth) {
          this.addDepth(param.depth);
        }

        this.opcode('getContext', param.depth || 0);
        this.opcode('pushStringParam', param.stringModeValue, param.type);
      } else {
        this[param.type](param);
      }
    }
  },

  setupMustacheParams: function(mustache) {
    var params = mustache.params;
    this.pushParams(params);

    if(mustache.hash) {
      this.hash(mustache.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  },

  // this will replace setupMustacheParams when we're done
  setupFullMustacheParams: function(mustache, program, inverse) {
    var params = mustache.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if(mustache.hash) {
      this.hash(mustache.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  }
};

Handlebars.precompile = function(input, options) {
  if (input == null || (typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode)) {
    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var ast = Handlebars.parse(input);
  var environment = new Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function(input, options) {
  if (input == null || (typeof input !== 'string' && input.constructor !== Handlebars.AST.ProgramNode)) {
    throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  var compiled;
  function compile() {
    var ast = Handlebars.parse(input);
    var environment = new Compiler().compile(ast, options);
    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
    return Handlebars.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};


// END(BROWSER)

return Handlebars;

};

},{"./base":44}],46:[function(require,module,exports){
// Each of these module will augment the Handlebars object as it loads. No need to perform addition operations
module.exports.attach = function(Handlebars) {

var visitor = require("./visitor"),
    printer = require("./printer"),
    ast = require("./ast"),
    compiler = require("./compiler"),
    javascriptCompiler = require("./javascript-compiler");

visitor.attach(Handlebars);
printer.attach(Handlebars);
ast.attach(Handlebars);
compiler.attach(Handlebars);
javascriptCompiler.attach(Handlebars);

return Handlebars;

};

},{"./ast":43,"./compiler":45,"./javascript-compiler":47,"./printer":49,"./visitor":50}],47:[function(require,module,exports){
var compilerbase = require("./base");

exports.attach = function(Handlebars) {

compilerbase.attach(Handlebars);

// BEGIN(BROWSER)
/*jshint eqnull:true*/

var Literal = function(value) {
  this.value = value;
};


var JavaScriptCompiler = Handlebars.JavaScriptCompiler = function() {};

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function(parent, name /* , type*/) {
    if (/^[0-9]+$/.test(name)) {
      return parent + "[" + name + "]";
    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      return parent + "." + name;
    }
    else {
      return parent + "['" + name + "']";
    }
  },

  appendToBuffer: function(string) {
    if (this.environment.isSimple) {
      return "return " + string + ";";
    } else {
      return {
        appendToBuffer: true,
        content: string,
        toString: function() { return "buffer += " + string + ";"; }
      };
    }
  },

  initializeBuffer: function() {
    return this.quotedString("");
  },

  namespace: "Handlebars",
  // END PUBLIC API

  compile: function(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options || {};

    Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      programs: [],
      environments: [],
      aliases: { }
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.registers = { list: [] };
    this.compileStack = [];
    this.inlineStack = [];

    this.compileChildren(environment, options);

    var opcodes = environment.opcodes, opcode;

    this.i = 0;

    for(var l=opcodes.length; this.i<l; this.i++) {
      opcode = opcodes[this.i];

      if(opcode.opcode === 'DECLARE') {
        this[opcode.name] = opcode.value;
      } else {
        this[opcode.opcode].apply(this, opcode.args);
      }
    }

    return this.createFunctionContext(asObject);
  },

  nextOpcode: function() {
    var opcodes = this.environment.opcodes;
    return opcodes[this.i + 1];
  },

  eat: function() {
    this.i = this.i + 1;
  },

  preamble: function() {
    var out = [];

    if (!this.isChild) {
      var namespace = this.namespace;

      var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
      if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
      if (this.options.data) { copies = copies + " data = data || {};"; }
      out.push(copies);
    } else {
      out.push('');
    }

    if (!this.environment.isSimple) {
      out.push(", buffer = " + this.initializeBuffer());
    } else {
      out.push("");
    }

    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = out;
  },

  createFunctionContext: function(asObject) {
    var locals = this.stackVars.concat(this.registers.list);

    if(locals.length > 0) {
      this.source[1] = this.source[1] + ", " + locals.join(", ");
    }

    // Generate minimizer alias mappings
    if (!this.isChild) {
      for (var alias in this.context.aliases) {
        if (this.context.aliases.hasOwnProperty(alias)) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }
    }

    if (this.source[1]) {
      this.source[1] = "var " + this.source[1].substring(2) + ";";
    }

    // Merge children
    if (!this.isChild) {
      this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
    }

    if (!this.environment.isSimple) {
      this.source.push("return buffer;");
    }

    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
      params.push("depth" + this.environment.depths.list[i]);
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource();

    if (!this.isChild) {
      var revision = Handlebars.COMPILER_REVISION,
          versions = Handlebars.REVISION_CHANGES[revision];
      source = "this.compilerInfo = ["+revision+",'"+versions+"'];\n"+source;
    }

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
      Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
      return functionSource;
    }
  },
  mergeSource: function() {
    // WARN: We are not handling the case where buffer is still populated as the source should
    // not have buffer append operations as their final action.
    var source = '',
        buffer;
    for (var i = 0, len = this.source.length; i < len; i++) {
      var line = this.source[i];
      if (line.appendToBuffer) {
        if (buffer) {
          buffer = buffer + '\n    + ' + line.content;
        } else {
          buffer = line.content;
        }
      } else {
        if (buffer) {
          source += 'buffer += ' + buffer + ';\n  ';
          buffer = undefined;
        }
        source += line + '\n  ';
      }
    }
    return source;
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    this.replaceStack(function(current) {
      params.splice(1, 0, current);
      return "blockHelperMissing.call(" + params.join(", ") + ")";
    });
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    var current = this.topStack();
    params.splice(1, 0, current);

    // Use the options value generated from the invocation
    params[params.length-1] = 'options';

    this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function(content) {
    this.source.push(this.appendToBuffer(this.quotedString(content)));
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function() {
    // Force anything that is inlined onto the stack so we don't have duplication
    // when we examine local
    this.flushInline();
    var local = this.popStack();
    this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
    if (this.environment.isSimple) {
      this.source.push("else { " + this.appendToBuffer("''") + " }");
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function() {
    this.context.aliases.escapeExpression = 'this.escapeExpression';

    this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function(depth) {
    if(this.lastContext !== depth) {
      this.lastContext = depth;
    }
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function(name) {
    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function() {
    this.pushStackLiteral('depth' + this.lastContext);
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function() {
    this.context.aliases.functionType = '"function"';

    this.replaceStack(function(current) {
      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
    });
  },

  // [lookup]
  //
  // On stack, before: value, ...
  // On stack, after: value[name], ...
  //
  // Replace the value on the stack with the result of looking
  // up `name` on `value`
  lookup: function(name) {
    this.replaceStack(function(current) {
      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
    });
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data[id], ...
  //
  // Push the result of looking up `id` on the current data
  lookupData: function(id) {
    this.push('data');
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function(string, type) {
    this.pushStackLiteral('depth' + this.lastContext);

    this.pushString(type);

    if (typeof string === 'string') {
      this.pushString(string);
    } else {
      this.pushStackLiteral(string);
    }
  },

  emptyHash: function() {
    this.pushStackLiteral('{}');

    if (this.options.stringParams) {
      this.register('hashTypes', '{}');
      this.register('hashContexts', '{}');
    }
  },
  pushHash: function() {
    this.hash = {values: [], types: [], contexts: []};
  },
  popHash: function() {
    var hash = this.hash;
    this.hash = undefined;

    if (this.options.stringParams) {
      this.register('hashContexts', '{' + hash.contexts.join(',') + '}');
      this.register('hashTypes', '{' + hash.types.join(',') + '}');
    }
    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [push]
  //
  // On stack, before: ...
  // On stack, after: expr, ...
  //
  // Push an expression onto the stack
  push: function(expr) {
    this.inlineStack.push(expr);
    return expr;
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function(paramSize, name) {
    this.context.aliases.helperMissing = 'helpers.helperMissing';

    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

    this.push(helper.name + ' || ' + nonHelper);
    this.replaceStack(function(name) {
      return name + ' ? ' + name + '.call(' +
          helper.callParams + ") " + ": helperMissing.call(" +
          helper.helperMissingParams + ")";
    });
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(helper.name + ".call(" + helper.callParams + ")");
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function(name, helperCall) {
    this.context.aliases.functionType = '"function"';

    this.pushStackLiteral('{}');    // Hash value
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
    var nextStack = this.nextStack();

    this.source.push('if (' + nextStack + ' = ' + helperName + ') { ' + nextStack + ' = ' + nextStack + '.call(' + helper.callParams + '); }');
    this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.apply(depth0) : ' + nextStack + '; }');
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function(name) {
    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

    if (this.options.data) {
      params.push("data");
    }

    this.context.aliases.self = "this";
    this.push("self.invokePartial(" + params.join(", ") + ")");
  },

  // [assignToHash]
  //
  // On stack, before: value, hash, ...
  // On stack, after: hash, ...
  //
  // Pops a value and hash off the stack, assigns `hash[key] = value`
  // and pushes the hash back onto the stack.
  assignToHash: function(key) {
    var value = this.popStack(),
        context,
        type;

    if (this.options.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts.push("'" + key + "': " + context);
    }
    if (type) {
      hash.types.push("'" + key + "': " + type);
    }
    hash.values.push("'" + key + "': (" + value + ")");
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function(environment, options) {
    var children = environment.children, child, compiler;

    for(var i=0, l=children.length; i<l; i++) {
      child = children[i];
      compiler = new this.compiler();

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
        this.context.environments[index] = child;
      } else {
        child.index = index;
        child.name = 'program' + index;
      }
    }
  },
  matchExistingProgram: function(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function(guid) {
    this.context.aliases.self = "this";

    if(guid == null) {
      return "self.noop";
    }

    var child = this.environment.children[guid],
        depths = child.depths.list, depth;

    var programParams = [child.index, child.name, "data"];

    for(var i=0, l = depths.length; i<l; i++) {
      depth = depths[i];

      if(depth === 1) { programParams.push("depth0"); }
      else { programParams.push("depth" + (depth - 1)); }
    }

    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
  },

  register: function(name, val) {
    this.useRegister(name);
    this.source.push(name + " = " + val + ";");
  },

  useRegister: function(name) {
    if(!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  pushStackLiteral: function(item) {
    return this.push(new Literal(item));
  },

  pushStack: function(item) {
    this.flushInline();

    var stack = this.incrStack();
    if (item) {
      this.source.push(stack + " = " + item + ";");
    }
    this.compileStack.push(stack);
    return stack;
  },

  replaceStack: function(callback) {
    var prefix = '',
        inline = this.isInline(),
        stack;

    // If we are currently inline then we want to merge the inline statement into the
    // replacement statement via ','
    if (inline) {
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = top.value;
      } else {
        // Get or create the current stack name for use by the inline
        var name = this.stackSlot ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + '),';
        stack = this.topStack();
      }
    } else {
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (inline) {
      if (this.inlineStack.length || this.compileStack.length) {
        this.popStack();
      }
      this.push('(' + prefix + item + ')');
    } else {
      // Prevent modification of the context depth variable. Through replaceStack
      if (!/^stack/.test(stack)) {
        stack = this.nextStack();
      }

      this.source.push(stack + " = (" + prefix + item + ");");
    }
    return stack;
  },

  nextStack: function() {
    return this.pushStack();
  },

  incrStack: function() {
    this.stackSlot++;
    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
    return this.topStackName();
  },
  topStackName: function() {
    return "stack" + this.stackSlot;
  },
  flushInline: function() {
    var inlineStack = this.inlineStack;
    if (inlineStack.length) {
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          this.pushStack(entry);
        }
      }
    }
  },
  isInline: function() {
    return this.inlineStack.length;
  },

  popStack: function(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      if (!inline) {
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function(wrapped) {
    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
        item = stack[stack.length - 1];

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      return item;
    }
  },

  quotedString: function(str) {
    return '"' + str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
  },

  setupHelper: function(paramSize, name, missingParams) {
    var params = [];
    this.setupParams(paramSize, params, missingParams);
    var foundHelper = this.nameLookup('helpers', name, 'helper');

    return {
      params: params,
      name: foundHelper,
      callParams: ["depth0"].concat(params).join(", "),
      helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
    };
  },

  // the params and contexts arguments are passed in arrays
  // to fill in
  setupParams: function(paramSize, params, useRegister) {
    var options = [], contexts = [], types = [], param, inverse, program;

    options.push("hash:" + this.popStack());

    inverse = this.popStack();
    program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      if (!program) {
        this.context.aliases.self = "this";
        program = "self.noop";
      }

      if (!inverse) {
       this.context.aliases.self = "this";
        inverse = "self.noop";
      }

      options.push("inverse:" + inverse);
      options.push("fn:" + program);
    }

    for(var i=0; i<paramSize; i++) {
      param = this.popStack();
      params.push(param);

      if(this.options.stringParams) {
        types.push(this.popStack());
        contexts.push(this.popStack());
      }
    }

    if (this.options.stringParams) {
      options.push("contexts:[" + contexts.join(",") + "]");
      options.push("types:[" + types.join(",") + "]");
      options.push("hashContexts:hashContexts");
      options.push("hashTypes:hashTypes");
    }

    if(this.options.data) {
      options.push("data:data");
    }

    options = "{" + options.join(",") + "}";
    if (useRegister) {
      this.register('options', options);
      params.push('options');
    } else {
      params.push(options);
    }
    return params.join(", ");
  }
};

var reservedWords = (
  "break else new var" +
  " case finally return void" +
  " catch for switch while" +
  " continue function this with" +
  " default if throw" +
  " delete in try" +
  " do instanceof typeof" +
  " abstract enum int short" +
  " boolean export interface static" +
  " byte extends long super" +
  " char final native synchronized" +
  " class float package throws" +
  " const goto private transient" +
  " debugger implements protected volatile" +
  " double import public let yield"
).split(" ");

var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

for(var i=0, l=reservedWords.length; i<l; i++) {
  compilerWords[reservedWords[i]] = true;
}

JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
  if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
    return true;
  }
  return false;
};

// END(BROWSER)

return Handlebars;

};

},{"./base":44}],48:[function(require,module,exports){
// BEGIN(BROWSER)
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"simpleInverse":6,"statements":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"params":27,"hash":28,"dataName":29,"param":30,"STRING":31,"INTEGER":32,"BOOLEAN":33,"hashSegments":34,"hashSegment":35,"ID":36,"EQUALS":37,"DATA":38,"pathSegments":39,"SEP":40,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",31:"STRING",32:"INTEGER",33:"BOOLEAN",36:"ID",37:"EQUALS",38:"DATA",40:"SEP"},
productions_: [0,[3,2],[4,2],[4,3],[4,2],[4,1],[4,1],[4,0],[7,1],[7,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[6,2],[17,3],[17,2],[17,2],[17,1],[17,1],[27,2],[27,1],[30,1],[30,1],[30,1],[30,1],[30,1],[28,1],[34,2],[34,1],[35,3],[35,3],[35,3],[35,3],[35,3],[26,1],[26,1],[26,1],[29,2],[21,1],[39,3],[39,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.ProgramNode([], $$[$0]); 
break;
case 3: this.$ = new yy.ProgramNode($$[$0-2], $$[$0]); 
break;
case 4: this.$ = new yy.ProgramNode($$[$0-1], []); 
break;
case 5: this.$ = new yy.ProgramNode($$[$0]); 
break;
case 6: this.$ = new yy.ProgramNode([], []); 
break;
case 7: this.$ = new yy.ProgramNode([]); 
break;
case 8: this.$ = [$$[$0]]; 
break;
case 9: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 10: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]); 
break;
case 11: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]); 
break;
case 12: this.$ = $$[$0]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = new yy.ContentNode($$[$0]); 
break;
case 15: this.$ = new yy.CommentNode($$[$0]); 
break;
case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
break;
case 18: this.$ = $$[$0-1]; 
break;
case 19:
    // Parsing out the '&' escape token at this level saves ~500 bytes after min due to the removal of one parser node.
    this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2][2] === '&');
  
break;
case 20: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true); 
break;
case 21: this.$ = new yy.PartialNode($$[$0-1]); 
break;
case 22: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1]); 
break;
case 23: 
break;
case 24: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]; 
break;
case 25: this.$ = [[$$[$0-1]].concat($$[$0]), null]; 
break;
case 26: this.$ = [[$$[$0-1]], $$[$0]]; 
break;
case 27: this.$ = [[$$[$0]], null]; 
break;
case 28: this.$ = [[$$[$0]], null]; 
break;
case 29: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 30: this.$ = [$$[$0]]; 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = new yy.StringNode($$[$0]); 
break;
case 33: this.$ = new yy.IntegerNode($$[$0]); 
break;
case 34: this.$ = new yy.BooleanNode($$[$0]); 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = new yy.HashNode($$[$0]); 
break;
case 37: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 38: this.$ = [$$[$0]]; 
break;
case 39: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 40: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]; 
break;
case 41: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]; 
break;
case 42: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]; 
break;
case 43: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 44: this.$ = new yy.PartialNameNode($$[$0]); 
break;
case 45: this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0])); 
break;
case 46: this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0])); 
break;
case 47: this.$ = new yy.DataNode($$[$0]); 
break;
case 48: this.$ = new yy.IdNode($$[$0]); 
break;
case 49: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
break;
case 50: this.$ = [{part: $$[$0]}]; 
break;
}
},
table: [{3:1,4:2,5:[2,7],6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],22:[1,14],23:[1,15],25:[1,16]},{1:[3]},{5:[1,17]},{5:[2,6],7:18,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,6],22:[1,14],23:[1,15],25:[1,16]},{5:[2,5],6:20,8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,5],22:[1,14],23:[1,15],25:[1,16]},{17:23,18:[1,22],21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],25:[2,8]},{4:29,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{4:30,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{17:31,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:32,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:33,21:24,29:25,36:[1,28],38:[1,27],39:26},{21:35,26:34,31:[1,36],32:[1,37],36:[1,28],39:26},{1:[2,1]},{5:[2,2],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,2],22:[1,14],23:[1,15],25:[1,16]},{17:23,21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,4],7:38,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,4],22:[1,14],23:[1,15],25:[1,16]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{5:[2,23],14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{18:[1,39]},{18:[2,27],21:44,24:[2,27],27:40,28:41,29:48,30:42,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,28],24:[2,28]},{18:[2,48],24:[2,48],31:[2,48],32:[2,48],33:[2,48],36:[2,48],38:[2,48],40:[1,51]},{21:52,36:[1,28],39:26},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],38:[2,50],40:[2,50]},{10:53,20:[1,54]},{10:55,20:[1,54]},{18:[1,56]},{18:[1,57]},{24:[1,58]},{18:[1,59],21:60,36:[1,28],39:26},{18:[2,44],36:[2,44]},{18:[2,45],36:[2,45]},{18:[2,46],36:[2,46]},{5:[2,3],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,3],22:[1,14],23:[1,15],25:[1,16]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{18:[2,25],21:44,24:[2,25],28:61,29:48,30:62,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,26],24:[2,26]},{18:[2,30],24:[2,30],31:[2,30],32:[2,30],33:[2,30],36:[2,30],38:[2,30]},{18:[2,36],24:[2,36],35:63,36:[1,64]},{18:[2,31],24:[2,31],31:[2,31],32:[2,31],33:[2,31],36:[2,31],38:[2,31]},{18:[2,32],24:[2,32],31:[2,32],32:[2,32],33:[2,32],36:[2,32],38:[2,32]},{18:[2,33],24:[2,33],31:[2,33],32:[2,33],33:[2,33],36:[2,33],38:[2,33]},{18:[2,34],24:[2,34],31:[2,34],32:[2,34],33:[2,34],36:[2,34],38:[2,34]},{18:[2,35],24:[2,35],31:[2,35],32:[2,35],33:[2,35],36:[2,35],38:[2,35]},{18:[2,38],24:[2,38],36:[2,38]},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],37:[1,65],38:[2,50],40:[2,50]},{36:[1,66]},{18:[2,47],24:[2,47],31:[2,47],32:[2,47],33:[2,47],36:[2,47],38:[2,47]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{21:67,36:[1,28],39:26},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,68]},{18:[2,24],24:[2,24]},{18:[2,29],24:[2,29],31:[2,29],32:[2,29],33:[2,29],36:[2,29],38:[2,29]},{18:[2,37],24:[2,37],36:[2,37]},{37:[1,65]},{21:69,29:73,31:[1,70],32:[1,71],33:[1,72],36:[1,28],38:[1,27],39:26},{18:[2,49],24:[2,49],31:[2,49],32:[2,49],33:[2,49],36:[2,49],38:[2,49],40:[2,49]},{18:[1,74]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{18:[2,39],24:[2,39],36:[2,39]},{18:[2,40],24:[2,40],36:[2,40]},{18:[2,41],24:[2,41],36:[2,41]},{18:[2,42],24:[2,42],36:[2,42]},{18:[2,43],24:[2,43],36:[2,43]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]}],
defaultActions: {17:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0: yy_.yytext = "\\"; return 14; 
break;
case 1:
                                   if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                   if(yy_.yytext) return 14;
                                 
break;
case 2: return 14; 
break;
case 3:
                                   if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1);
                                   return 14;
                                 
break;
case 4: yy_.yytext = yy_.yytext.substr(0, yy_.yyleng-4); this.popState(); return 15; 
break;
case 5: return 25; 
break;
case 6: return 16; 
break;
case 7: return 20; 
break;
case 8: return 19; 
break;
case 9: return 19; 
break;
case 10: return 23; 
break;
case 11: return 22; 
break;
case 12: this.popState(); this.begin('com'); 
break;
case 13: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15; 
break;
case 14: return 22; 
break;
case 15: return 37; 
break;
case 16: return 36; 
break;
case 17: return 36; 
break;
case 18: return 40; 
break;
case 19: /*ignore whitespace*/ 
break;
case 20: this.popState(); return 24; 
break;
case 21: this.popState(); return 18; 
break;
case 22: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 31; 
break;
case 23: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\'/g,"'"); return 31; 
break;
case 24: return 38; 
break;
case 25: return 33; 
break;
case 26: return 33; 
break;
case 27: return 32; 
break;
case 28: return 36; 
break;
case 29: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 36; 
break;
case 30: return 'INVALID'; 
break;
case 31: return 5; 
break;
}
};
lexer.rules = [/^(?:\\\\(?=(\{\{)))/,/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[}\/ ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:-?[0-9]+(?=[}\s]))/,/^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":false},"emu":{"rules":[3],"inclusive":false},"com":{"rules":[4],"inclusive":false},"INITIAL":{"rules":[0,1,2,31],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
// END(BROWSER)

module.exports = handlebars;

},{}],49:[function(require,module,exports){
exports.attach = function(Handlebars) {

// BEGIN(BROWSER)

Handlebars.print = function(ast) {
  return new Handlebars.PrintVisitor().accept(ast);
};

Handlebars.PrintVisitor = function() { this.padding = 0; };
Handlebars.PrintVisitor.prototype = new Handlebars.Visitor();

Handlebars.PrintVisitor.prototype.pad = function(string, newline) {
  var out = "";

  for(var i=0,l=this.padding; i<l; i++) {
    out = out + "  ";
  }

  out = out + string;

  if(newline !== false) { out = out + "\n"; }
  return out;
};

Handlebars.PrintVisitor.prototype.program = function(program) {
  var out = "",
      statements = program.statements,
      inverse = program.inverse,
      i, l;

  for(i=0, l=statements.length; i<l; i++) {
    out = out + this.accept(statements[i]);
  }

  this.padding--;

  return out;
};

Handlebars.PrintVisitor.prototype.block = function(block) {
  var out = "";

  out = out + this.pad("BLOCK:");
  this.padding++;
  out = out + this.accept(block.mustache);
  if (block.program) {
    out = out + this.pad("PROGRAM:");
    this.padding++;
    out = out + this.accept(block.program);
    this.padding--;
  }
  if (block.inverse) {
    if (block.program) { this.padding++; }
    out = out + this.pad("{{^}}");
    this.padding++;
    out = out + this.accept(block.inverse);
    this.padding--;
    if (block.program) { this.padding--; }
  }
  this.padding--;

  return out;
};

Handlebars.PrintVisitor.prototype.mustache = function(mustache) {
  var params = mustache.params, paramStrings = [], hash;

  for(var i=0, l=params.length; i<l; i++) {
    paramStrings.push(this.accept(params[i]));
  }

  params = "[" + paramStrings.join(", ") + "]";

  hash = mustache.hash ? " " + this.accept(mustache.hash) : "";

  return this.pad("{{ " + this.accept(mustache.id) + " " + params + hash + " }}");
};

Handlebars.PrintVisitor.prototype.partial = function(partial) {
  var content = this.accept(partial.partialName);
  if(partial.context) { content = content + " " + this.accept(partial.context); }
  return this.pad("{{> " + content + " }}");
};

Handlebars.PrintVisitor.prototype.hash = function(hash) {
  var pairs = hash.pairs;
  var joinedPairs = [], left, right;

  for(var i=0, l=pairs.length; i<l; i++) {
    left = pairs[i][0];
    right = this.accept(pairs[i][1]);
    joinedPairs.push( left + "=" + right );
  }

  return "HASH{" + joinedPairs.join(", ") + "}";
};

Handlebars.PrintVisitor.prototype.STRING = function(string) {
  return '"' + string.string + '"';
};

Handlebars.PrintVisitor.prototype.INTEGER = function(integer) {
  return "INTEGER{" + integer.integer + "}";
};

Handlebars.PrintVisitor.prototype.BOOLEAN = function(bool) {
  return "BOOLEAN{" + bool.bool + "}";
};

Handlebars.PrintVisitor.prototype.ID = function(id) {
  var path = id.parts.join("/");
  if(id.parts.length > 1) {
    return "PATH:" + path;
  } else {
    return "ID:" + path;
  }
};

Handlebars.PrintVisitor.prototype.PARTIAL_NAME = function(partialName) {
    return "PARTIAL:" + partialName.name;
};

Handlebars.PrintVisitor.prototype.DATA = function(data) {
  return "@" + this.accept(data.id);
};

Handlebars.PrintVisitor.prototype.content = function(content) {
  return this.pad("CONTENT[ '" + content.string + "' ]");
};

Handlebars.PrintVisitor.prototype.comment = function(comment) {
  return this.pad("{{! '" + comment.comment + "' }}");
};
// END(BROWSER)

return Handlebars;
};


},{}],50:[function(require,module,exports){
exports.attach = function(Handlebars) {

// BEGIN(BROWSER)

Handlebars.Visitor = function() {};

Handlebars.Visitor.prototype = {
  accept: function(object) {
    return this[object.type](object);
  }
};

// END(BROWSER)

return Handlebars;
};



},{}],51:[function(require,module,exports){
exports.attach = function(Handlebars) {

// BEGIN(BROWSER)

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = Handlebars.VM.program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = Handlebars.VM.program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common) {
          ret = {};
          Handlebars.Utils.extend(ret, common);
          Handlebars.Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var program = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    program.program = i;
    program.depth = args.length;
    return program;
  },
  program: function(i, fn, data) {
    var program = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    program.program = i;
    program.depth = 0;
    return program;
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;

// END(BROWSER)

return Handlebars;

};

},{}],52:[function(require,module,exports){
exports.attach = function(Handlebars) {

var toString = Object.prototype.toString;

// BEGIN(BROWSER)

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  extend: function(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  },

  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = string.toString();

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};

// END(BROWSER)

return Handlebars;
};

},{}],53:[function(require,module,exports){
var _ = require('underscore');

// Lazy-required.
var BaseView = null;

module.exports = function(Handlebars, getTemplate) {
  var oldEach = Handlebars.helpers.each;

  return {
    view: function(viewName, options) {
      var ViewClass, html, viewOptions, view;

      // it's lazy loaded, not a compile time dependency
      // hiding it from r.js compiler
      var lazyRequire_baseView = 'rendr/shared/base/view';
      BaseView = BaseView || require(lazyRequire_baseView);
      viewOptions = options.hash || {};

      // Pass through a reference to the app.
      var app = getProperty('_app', this, options);
      if (app) {
        viewOptions.app = app;
        viewName = app.modelUtils.underscorize(viewName);
      } else{
        throw new Error("An App instance is required when rendering a view, it could not be extracted from the options.")
      }

      // Pass through a reference to the parent view.
      var parentView = getProperty('_view', this, options);
      if (parentView) {
        viewOptions.parentView = parentView;
      }

      // get the Backbone.View based on viewName
      ViewClass = BaseView.getView(viewName, app.options.entryPath);
      view = new ViewClass(viewOptions);

      // create the outerHTML using className, tagName
      html = view.getHtml();
      return new Handlebars.SafeString(html);
    },

    partial: function(templateName, options) {
      var data, html, context, template;

      template = getTemplate(templateName);

      context = options.hash || {};

      // First try to use Handlebars' hash arguments as the context for the
      // partial, if present.
      //
      // ex: `{{partial "users/photo" user=user}}`
      if (_.isEmpty(context)) {
        // If there are no hash arguments given, then inherit the parent context.
        //
        // ex: `{{partial "users/photo"}}`
        context = this;
      } else {
        // If a hash argument is given with key `context`, then use that as the context.
        //
        // ex: `{{partial "users/photo" context=user}}`
        if (context.hasOwnProperty('context')) {
          context = context.context;
        }
      }
      context = _.clone(context);

      context._app = getProperty('_app', this, options);
      html = template(context);
      return new Handlebars.SafeString(html);
    },

    json: function(object) {
      return new Handlebars.SafeString(JSON.stringify(object) || 'null');
    },

    /**
     * Extend `each` to pass through important context.
     */
    each: function(context, options) {
      options.data = Handlebars.createFrame(options.data || {});

      // Make sure `this._app`, `this._view`, etc are available.
      _.extend(options.data, getOptionsFromContext(this));

      // Call the original helper with new context.
      return oldEach.call(this, context, options);
    }
  };
};

/**
 * Grab important underscored properties from the current context.
 * These properties come from BaseView::decorateTemplateData().
 */
function getOptionsFromContext(obj) {
  var options, keys, value;

  keys = [
    '_app',
    '_view',
    '_model',
    '_collection'
  ];

  options = keys.reduce(function(memo, key) {
    value = obj[key];
    if (value) {
      memo[key] = value;
    }
    return memo;
  }, {});

  return options;
}

/**
 * Get a property that is being passed down through helpers, such as `_app`
 * or `_view`. It can either live on the context, i.e. `this._app`, or in the
 * `options.data` object passed to the helper, i.e. `options.data._app`, in the
 * case of a block helper like `each`.
 */
function getProperty(key, context, options) {
  return context[key] || (options.data || {})[key];
}

},{"underscore":"BWM0Lx"}],54:[function(require,module,exports){
var cachedTemplates = {};

module.exports = function(Handlebars) {

  /**
   * Provide a way for apps to specify that different template name patterns
   * should use different compiled template files.
   *
   */
  var templatePatterns = [];

  /**
   * Given a template name, return the compiled Handlebars template.
   */
  function getTemplate(templateName) {
    /**
     * Find the correct source file for this template.
     */
    var src = getSrcForTemplate(templateName);

    /**
    * Allow compiledTemplates to be created asynchronously by lazy-requiring it.
    */
    if (!cachedTemplates[src]) {
      cachedTemplates[src] = require(src);

      /**
       * Make it play nicely with both AMD and CommonJS.
       * The `grunt-contrib-handlebars` module  produces different stucture
       * of compiled templates with `amd` vs `commonjs` options. Accommodate
       * both options here. the `amd` option results in templates as an Object,
       * whereas the `commonjs` option results in templates as a Function.
       */
      if (typeof cachedTemplates[src] == 'function') {
        cachedTemplates[src] = cachedTemplates[src](Handlebars);
      }
    }

    return cachedTemplates[src][templateName];
  }

  /**
   * For a given template name, find the correct compiled templates source file
   * based on pattern matching on the template name.
   */
  function getSrcForTemplate(templateName) {
    var currentPattern = templatePatterns.filter(function(obj) {
      return obj.pattern.test(templateName);
    })[0];

    if (currentPattern == null) {
      throw new Error('No pattern found to match template "' + templateName + '".');
    }

    return currentPattern.src;
  }

  return {
    getTemplate: getTemplate,
    getSrcForTemplate: getSrcForTemplate,
    templatePatterns: templatePatterns
  }
};

},{}],55:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    BaseView = require('../shared/base/view'),
    $ = (typeof window !== 'undefined' && window.$) || require('jquery');

Backbone.$ = $;

module.exports = BaseView.extend({
  el: 'body',

  initialize: function() {
    BaseView.prototype.initialize.apply(this, arguments);

    _.defaults(this.options, {
      contentEl: '#content'
    });

    /**
     * Grab the element that contains the main view.
     */
    this.$content = $(this.options.contentEl);
    this._bindInterceptClick();
  },

  hasPushState: typeof window !== "undefined" && window.history.pushState != null,

  render: function() {},

  setCurrentView: function(view) {
    this.$content.html(view.el);
    view.render();
  },

  _bindInterceptClick: function() {
    this.$el.on('click', 'a:not([data-pass-thru])', this._interceptClick.bind(this));
  },

  _interceptClick: function(e) {
    /**
     * We want the actual value of the attribute, rather than the
     * full URL, so we use jQuery instead of just e.currentTarget.href
     */
    var href = $(e.currentTarget).attr('href');
    if (this.shouldInterceptClick(href, e.currentTarget, e)) {
      e.preventDefault();
      this.app.router.redirectTo(href);
    }
  },

  shouldInterceptClick: function(href, el, e) {
    var hashParts, isHashClick;

    if (!(href && this.hasPushState) || e.metaKey || e.shiftKey) {
      return false;
    }

    hashParts = href.split('#');
    isHashClick = hashParts.length > 1 && hashParts[0] === window.location.pathname;
    return !isHashClick && href.slice(0, 1) === '/' && href.slice(0, 2) !== '//';
  }

});

},{"../shared/base/view":63,"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],56:[function(require,module,exports){
/**
 * Since we make rendr files AMD friendly on app setup stage
 * we need to pretend that this code is pure commonjs
 * means no AMD-style require calls
 */
var requireAMD = require;

var _ = require('underscore'),
    Backbone = require('backbone'),
    BaseRouter = require('../shared/base/router'),
    BaseView = require('../shared/base/view'),
    $ = (typeof window !== 'undefined' && window.$) || require('jquery'),
    extractParamNamesRe = /:(\w+)/g,
    plusRe = /\+/g,
    firstRender = true,
    defaultRootPath = '';

Backbone.$ = $;

function noop() {}

module.exports = ClientRouter;

function ClientRouter(options) {
  this._router = new Backbone.Router();
  BaseRouter.apply(this, arguments);
}

/**
 * Set up inheritance.
 */
ClientRouter.prototype = Object.create(BaseRouter.prototype);
ClientRouter.prototype.constructor = ClientRouter;

ClientRouter.prototype.currentFragment = null;

ClientRouter.prototype.previousFragment = null;

/**
 * In a controller action, can access the current route
 * definition with `this.currentRoute`.
 */
ClientRouter.prototype.currentRoute = null;

/**
 * Instance of Backbone.Router used to manage browser history.
 */
ClientRouter.prototype._router = null;

/**
 * We need to reverse the routes in the client because
 * Backbone.History matches in reverse.
 */
ClientRouter.prototype.reverseRoutes = true;

ClientRouter.prototype.initialize = function(options) {
  this.app = options.app;

  var AppView = this.options.appViewClass;

  // We do this here so that it's available in AppView initialization.
  this.app.router = this;

  this.on('route:add', this.addBackboneRoute, this);
  this.on('action:start', this.trackAction, this);
  this.app.on('reload', this.renderView, this);

  this.appView = new AppView({
    app: this.app
  });

  this.appView.render();
  this.buildRoutes();
  this.postInitialize();
};

ClientRouter.prototype.postInitialize = noop;

/**
 * Piggyback on adding new route definition events
 * to also add to Backbone.Router.
 */
ClientRouter.prototype.addBackboneRoute = function(routeObj) {
  var handler, name, pattern, route;

  // Backbone.History wants no leading slash on strings.
  pattern = (routeObj[0] instanceof RegExp) ? routeObj[0] : routeObj[0].slice(1);
  route = routeObj[1];
  handler = routeObj[2];
  name = route.controller + ":" + route.action;

  this._router.route(pattern, name, handler);
};

ClientRouter.prototype.getHandler = function(action, pattern, route) {
  var router = this;

  // abstract action call
  function actionCall(action, params) {
    action.call(router, params, router.getRenderCallback(route));
  }

  // This returns a function which is called by Backbone.history.
  return function() {
    var params, paramsArray, redirect;

    router.trigger('action:start', route, firstRender);
    router.currentRoute = route;

    if (firstRender) {
      firstRender = false;
      BaseView.attach(router.app, null, function(views) {
        router.currentView = router.getMainView(views);
        router.trigger('action:end', route, true);
      });
    } else {
      paramsArray = _.toArray(arguments);
      params = router.getParamsHash(pattern, paramsArray, window.location.search);

      redirect = router.getRedirect(route, params);
      /**
       * If `redirect` is present, then do a redirect and return.
       */
      if (redirect != null) {
        router.redirectTo(redirect, {replace: true});
      } else {
        if (!action) {
          throw new Error("Missing action \"" + route.action + "\" for controller \"" + route.controller + "\"");
        } else if (typeof action == 'string') {
          // in AMD environment action is the string containing path to the controller
          // which will be loaded async (might be preloaded)
          // Only used in AMD environment
          requireAMD([action], function(controller) {
            // check we have everything we need
            if (typeof controller[route.action] != 'function') {
              throw new Error("Missing action \"" + route.action + "\" for controller \"" + route.controller + "\"");
            }
            actionCall(controller[route.action], params);
          });
        } else {
          actionCall(action, params);
        }
      }
    }
  };
};

/**
 * Can be overridden by applications
 * if the initial render is more complicated.
 */
ClientRouter.prototype.getMainView = function(views) {
  var $content = this.appView.$content;
  return _.find(views, function(view) {
    return view.$el.parent().is($content);
  });
};

/**
 * Proxy to Backbone.Router.
 */
ClientRouter.prototype.navigate = function(path, options) {
  var fragment = Backbone.history.getFragment(path);

  // check if local router can handle route
  if (this.matchesAnyRoute(fragment)) {
    this._router.navigate.apply(this._router, arguments);
  } else {
    this.redirectTo(fragment, {pushState: false});
  }
};

ClientRouter.prototype.getParamsHash = function(pattern, paramsArray, search) {
  var paramNames, params, query;

  if (pattern instanceof RegExp) {
    paramNames = paramsArray.map(function(val, i) { return String(i); });
  } else {
    paramNames = (pattern.match(extractParamNamesRe) || []).map(function(name) {
      return name.slice(1);
    });
  }

  params = (paramNames || []).reduce(function(memo, name, i) {
    memo[name] = decodeURIComponent(paramsArray[i]);
    return memo;
  }, {});

  query = search.slice(1).split('&').reduce(function(memo, queryPart) {
    var parts = queryPart.split('=');
    if (parts.length > 1) {
      memo[parts[0]] = decodeURIComponent(parts[1].replace(plusRe, ' '));
    }
    return memo;
  }, {});

  return _.extend(query, params);
};

ClientRouter.prototype.matchingRoute = function(path) {
  return _.find(Backbone.history.handlers, function(handler) {
    return handler.route.test(path);
  });
};

ClientRouter.prototype.matchesAnyRoute = function(path) {
  return this.matchingRoute(path) != null;
};

ClientRouter.prototype.redirectTo = function(path, options) {
  var hashParts;

  if (options == null) {
    options = {};
  }
  _.defaults(options, {
    trigger: true,
    pushState: true,
    replace: false
  });

  if (options.pushState === false) {
    // Do a full-page redirect.
    window.location.href = path;
  } else {
    // Do a pushState navigation.
    hashParts = path.split('#');
    path = hashParts[0];

    // But then trigger the hash afterwards.
    if (hashParts.length > 1) {
      this.once('action:end', function() {
        window.location.hash = hashParts[1];
      });
    }

    // Ignore hash for routing.
    this.navigate(path, options);
  }
};

ClientRouter.prototype.handleErr = function(err, route) {
  this.trigger('action:error', err, route);
}

ClientRouter.prototype.getRenderCallback = function(route) {
  return function(err, viewPath, locals) {
    if (err) return this.handleErr(err, route);

    var View, _router = this;

    if (this.currentView) {
      this.currentView.remove();
    }

    var defaults = this.defaultHandlerParams(viewPath, locals, route);
    viewPath = defaults[0], locals = defaults[1];

    locals = locals || {};

    // Inject the app.
    locals.app = this.app;
    this.getView(viewPath, this.options.entryPath, function(View) {
      _router.currentView = new View(locals);
      _router.renderView();

      _router.trigger('action:end', route, firstRender);
    });
  }.bind(this);
};

ClientRouter.prototype.renderView = function() {
  this.appView.setCurrentView(this.currentView);
};

ClientRouter.prototype.start = function() {
  Backbone.history.start({
    pushState: true,
    hashChange: false,
    root: this.options.rootPath || defaultRootPath
  });
};

ClientRouter.prototype.trackAction = function() {
  this.previousFragment = this.currentFragment;
  this.currentFragment = Backbone.history.getFragment();
};

ClientRouter.prototype.getView = function(key, entryPath, callback) {
  var View = BaseView.getView(key, entryPath, function(View) {
    // TODO: Make it function (err, View)
    if (!_.isFunction(View)) {
      throw new Error("View '" + key + "' not found.");
    }

    callback(View);
  });
};

},{"../shared/base/router":62,"../shared/base/view":63,"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],57:[function(require,module,exports){
// This file is just added for convenience so this repository can be
// directly checked out into a project's deps folder
module.exports = require('./lib/async');

},{"./lib/async":58}],58:[function(require,module,exports){
(function (process){/*global setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root = this,
        previous_async = root.async;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    else {
        root.async = async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    //// cross-browser compatiblity functions ////

    var _forEach = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _forEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        async.nextTick = function (fn) {
            setTimeout(fn, 0);
        };
    }
    else {
        async.nextTick = process.nextTick;
    }

    async.forEach = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _forEach(arr, function (x) {
            iterator(x, function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                }
            });
        });
    };

    async.forEachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };

    async.forEachLimit = function (arr, limit, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length || limit <= 0) {
            return callback();
        }
        var completed = 0;
        var started = 0;
        var running = 0;

        (function replenish () {
            if (completed === arr.length) {
                return callback();
            }

            while (running < limit && started < arr.length) {
                started += 1;
                running += 1;
                iterator(arr[started - 1], function (err) {
                    if (err) {
                        callback(err);
                        callback = function () {};
                    }
                    else {
                        completed += 1;
                        running -= 1;
                        if (completed === arr.length) {
                            callback();
                        }
                        else {
                            replenish();
                        }
                    }
                });
            }
        })();
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEach].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);


    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.forEachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _forEach(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _forEach(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                if (err) {
                    callback(err);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    taskComplete();
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.nextTick(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    async.parallel = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEach(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.queue = function (worker, concurrency) {
        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _forEach(data, function(task) {
                    q.tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (q.saturated && q.tasks.length == concurrency) {
                        q.saturated();
                    }
                    async.nextTick(q.process);
                });
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if(q.empty && q.tasks.length == 0) q.empty();
                    workers += 1;
                    worker(task.data, function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if(q.drain && q.tasks.length + workers == 0) q.drain();
                        q.process();
                    });
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _forEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

}());
}).call(this,require("/home/aakash/projects/gwg-website/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/home/aakash/projects/gwg-website/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":36}],59:[function(require,module,exports){
/**
 * This is the app instance that is shared between client and server.
 * The client also subclasses it for client-specific stuff.
 */

var Backbone = require('backbone'),
    Fetcher = require('./fetcher'),
    ModelUtils = require('./modelUtils'),
    isServer = (typeof window === 'undefined'),
    ClientRouter;

if (!isServer) {
  ClientRouter = require('app/router');
  Backbone.$ = window.$ || require('jquery');
}

function noop() {}

module.exports = Backbone.Model.extend({

  defaults: {
    loading: false,
    templateAdapter: 'rendr-handlebars'
  },

  /**
   * @shared
   */
  initialize: function(attributes, options) {
    this.options = options || {};

    var entryPath = this.options.entryPath || '';
    if (!isServer) {
      // the entry path must always be empty for the client
      entryPath =  '';
    }

    this.modelUtils = this.options.modelUtils || new ModelUtils(entryPath);

    /**
     * On the server-side, you can access the Express request, `req`.
     */
    if (this.options.req) {
      this.req = this.options.req;
    }

    /**
     * Initialize the `templateAdapter`, allowing application developers to use whichever
     * templating system they want.
     */
    this.templateAdapter = require(this.get('templateAdapter'))({entryPath: entryPath});

    /**
     * Instantiate the `Fetcher`, which is used on client and server.
     */
    this.fetcher = new Fetcher({
      app: this
    });

    /**
     * Initialize the `ClientRouter` on the client-side.
     */
    if (!isServer) {
      new ClientRouter({
        app: this,
        entryPath: entryPath,
        appViewClass: this.getAppViewClass(),
        rootPath: attributes.rootPath
      });
    }

    /**
     * Call `postInitialize()`, to make it easy for an application to easily subclass and add custom
     * behavior without having to call i.e. `BaseApp.prototype.initialize.apply(this, arguments)`.
     */
    this.postInitialize();
  },

  postInitialize: noop,

  /**
   * @shared
   */
  fetch: function() {
    this.fetcher.fetch.apply(this.fetcher, arguments);
  },

  /**
   * @client
   */
  getAppViewClass: function () {
    return require('../client/app_view');
  },

  /**
   * @client
   */
  bootstrapData: function(modelMap) {
    this.fetcher.bootstrapData(modelMap);
  },

  /**
   * @client
   */
  start: function() {
    this.router.start();
    this.trigger('start');
  }
});

},{"../client/app_view":55,"./fetcher":64,"./modelUtils":65,"app/router":"WU8P0a","backbone":"vocP7Q","jquery":"WPLrfX"}],60:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    syncer = require('../syncer'),
    BaseModel = require('./model'),
    Super = Backbone.Collection,
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

BaseCollection = Super.extend({

  model: BaseModel,

  /**
   * Provide the ability to set default params for every 'fetch' call.
   */
  defaultParams: null,

  initialize: function(models, options) {
    /**
     * Capture the options as instance variable.
     */
    this.options = options || {};

    /**
     * Store a reference to the app instance.
     */
    this.app = this.options.app;

    /**
     * Store a reference to the params that were used to
     * query for these models.
     */
    this.params = this.options.params || {};
    _.defaults(this.params, this.defaultParams || {});

    /**
     * Add 'meta' property to store the parts of the response
     * that aren't part of the jsonKey.
     */
    this.meta = {};
    if (_.isObject(this.options.meta)) {
      _.extend(this.meta, this.options.meta);
      delete this.options.meta;
    }
  },

  /**
   * Make sure that `model.app` is set for all operations like
   * `this.add()`, `this.reset()`, `this.set()`, `this.push()`, etc.
   */
  _prepareModel: function() {
    var model;
    model = Super.prototype._prepareModel.apply(this, arguments);
    model.app = this.app;
    return model;
  },

  /**
   * Idempotent parse
   */
  parse: function(resp, modifyInstance) {
    var jsonResp, meta, parsed;

    if (modifyInstance == null) {
      modifyInstance = true;
    }
    if (resp != null && this.jsonKey && (jsonResp = resp[this.jsonKey])) {
      if (modifyInstance) {
        meta = _.omit(resp, this.jsonKey);
        _.extend(this.meta, meta);
      }
      parsed = jsonResp;
    } else {
      parsed = resp;
    }
    return this.parseModels(parsed);
  },

  parseModels: function(resp) {
    var jsonKey, jsonKeyResp;

    resp = _.clone(resp);
    jsonKey = this.model.prototype.jsonKey;
    _.each(resp, function(modelResp, i) {
      jsonKeyResp = modelResp[jsonKey];
      if (jsonKeyResp) {
        resp[i] = jsonKeyResp;
      }
    });
    return resp;
  },

  fetch: function(options) {
    options = options || {};

    // Each time new models are fetched, store the params used.
    options.data = options.data || {};
    _.defaults(options.data, this.defaultParams || {});
    this.params = options.data;
    return Super.prototype.fetch.apply(this, arguments);
  },

  /**
   * Instance method to store the collection and its models.
   */
  store: function() {
    this.each(function(model) {
      model.store();
    });
    this.app.fetcher.collectionStore.set(this);
  }
});

/**
 * Mix-in the `syncer`, shared between `BaseModel` and `BaseCollection`, which
 * encapsulates logic for fetching data from the API.
 */
_.extend(BaseCollection.prototype, syncer);

module.exports = BaseCollection;

},{"../syncer":69,"./model":61,"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],61:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    syncer = require('../syncer'),
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

var BaseModel = Backbone.Model.extend({

  initialize: function(models, options) {
    // Capture the options as instance variable.
    this.options = options || {};

    // Store a reference to the app instance.
    this.app = this.options.app;

    if (!this.app && this.collection) {
      this.app = this.collection.app;
    }

    this.on('change', this.store, this);
  },

  /**
   * Idempotent parse
   */
  parse: function(resp) {
    if (resp != null && this.jsonKey) {
      return resp[this.jsonKey] || resp;
    } else {
      return resp;
    }
  },

  /**
   * Instance method to store in the modelStore.
   */
  store: function() {
    this.app.fetcher.modelStore.set(this);
  }
});

/**
 * Mix-in the `syncer`, shared between `BaseModel` and `BaseCollection`, which
 * encapsulates logic for fetching data from the API.
 */
_.extend(BaseModel.prototype, syncer);

module.exports = BaseModel;

},{"../syncer":69,"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],62:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

function noop() {}

module.exports = BaseRouter;

/**
 * Base router class shared betwen ClientRouter and ServerRouter.
 */
function BaseRouter(options) {
  this.route = this.route.bind(this);
  this._routes = [];
  this._initOptions(options);
  this.initialize(options);
}

/**
 * Config
 *   - errorHandler: function to correctly handle error
 *   - paths
 *     - entryPath (required)
 *     - routes (optional)
 *     - controllerDir (optional)
 */
BaseRouter.prototype.options = null;

/**
 * Internally stored route definitions.
 */
BaseRouter.prototype._routes = null;

BaseRouter.prototype.reverseRoutes = false;

BaseRouter.prototype.initialize = function(options) {};

BaseRouter.prototype._initOptions = function(options) {
  var paths;

  this.options = options || {};
  paths = this.options.paths = this.options.paths || {};
  paths.entryPath = paths.entryPath || options.entryPath;
  paths.routes = paths.routes || paths.entryPath + 'app/routes';
  paths.controllerDir = paths.controllerDir || paths.entryPath + 'app/controllers';
};

BaseRouter.prototype.getController = function(controllerName) {
  var controllerDir = this.options.paths.controllerDir,
      controller,
      controllerPath;

  // preload all controllers on the server or in non-AMD env
  // for requirejs return path that will be lazy loaded
  controllerPath = controllerDir + "/" + controllerName + "_controller";

  if (!isServer && typeof define !== 'undefined') {
    controller = controllerPath;
  } else {
    controller = require(controllerPath);
  }

  return controller;
};

/**
 * Given an object with 'controller' and 'action' properties,
 * return the corresponding action function.
 */
BaseRouter.prototype.getAction = function(route) {
  var controller, action;
  if (route.controller) {
    controller = this.getController(route.controller);
    if (typeof controller == 'object') {
      action = controller[route.action];
    }
    // In AMD environment controller is path string,
    // which will be loaded when controller is needed.
    else if (typeof controller == 'string') {
      action = controller;
    }
  }
  return action;
};

BaseRouter.prototype.getRedirect = function(route, params) {
  var redirect = route.redirect;
  if (redirect != null) {
    /**
     * Support function and string.
     */
    if (typeof redirect === 'function') {
      redirect = redirect(params);
    }
  }
  return redirect;
};

/**
 * Build route definitions based on the routes file.
 */
BaseRouter.prototype.buildRoutes = function() {
  var routeBuilder = require(this.options.paths.routes),
      routes = [];

  function captureRoutes() {
    routes.push(_.toArray(arguments));
  }

  try {
    routeBuilder(captureRoutes);
    if (this.reverseRoutes) {
      routes = routes.reverse();
    }
    routes.forEach(function(route) {
      this.route.apply(this, route);
    }, this);
  } catch (e) {
    throw new Error("Error building routes: " + e.stack);
  }
  return this.routes();
};

/**
 * Returns a copy of current route definitions.
 */
BaseRouter.prototype.routes = function() {
  return this._routes.slice().map(function(route) {
    return route.slice();
  });
};

/**
 * Method passed to routes file to build up routes definition.
 * Adds a single route definition.
 */
BaseRouter.prototype.route = function(pattern) {
  var definitions = _.toArray(arguments).slice(1),
      route = this.parseDefinitions(definitions),
      action = this.getAction(route),
      handler,
      routeObj;

  if (!(pattern instanceof RegExp) && pattern.slice(0, 1) !== '/') {
    pattern = "/" + pattern;
  }

  handler = this.getHandler(action, pattern, route);
  routeObj = [pattern, route, handler];
  this._routes.push(routeObj);
  this.trigger('route:add', routeObj);
  return routeObj;
};

BaseRouter.prototype.parseDefinitions = function(definitions) {
  var route = {};

  definitions.forEach(function(element) {
    var parts;

    /**
     * Handle i.e. 'users#show'.
     */
    if (_.isString(element)) {
      parts = element.split('#');
      _.extend(route, {
        controller: parts[0],
        action: parts[1]
      });
    } else {
      /**
       * Handle objects ,i.e. {controller: 'users', action: 'show'}.
       */
      _.extend(route, element);
    }
  });
  return route;
};

/**
 * Support omitting view path; default it to ":controller/:action".
 */
BaseRouter.prototype.defaultHandlerParams = function(viewPath, locals, route) {
  if (typeof viewPath !== 'string') {
    locals = viewPath;
    viewPath = route.controller + '/' + route.action;
  }
  return [viewPath, locals];
};

/**
 * Methods to be extended by subclasses.
 * -------------------------------------
 */

/**
 * This is the method that renders the request.
 */
BaseRouter.prototype.getHandler = noop;

/**
 * Mix in Backbone.Events.
 */
_.extend(BaseRouter.prototype, Backbone.Events);

},{"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],63:[function(require,module,exports){
/**
 * Since we make rendr files AMD friendly on app setup stage
 * we need to pretend that this code is pure commonjs
 * means no AMD-style require calls
 */
var requireAMD = require;

var _ = require('underscore'),
    Backbone = require('backbone'),
    async = require('async'),
    isServer = (typeof window === 'undefined'),
    BaseView;

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

function noop() {}

module.exports = BaseView = Backbone.View.extend({
  initialize: function(options) {
    var obj;

    this.parseOptions(options);

    this.name = this.name || this.app.modelUtils.underscorize(this.constructor.id || this.constructor.name);
    this.postInitialize();
    if ((obj = this.model || this.collection) && this.renderOnRefresh) {
      obj.on('refresh', this.render, this);
    }

    this.render = this.render.bind(this);
  },

  /**
   * Whether or not to re-render this view when the model or collection
   * emits a 'refresh' event. Used with 'model|collection.checkFresh()'.
   */
  renderOnRefresh: false,

  postInitialize: noop,

  parseOptions: function(options) {
    /**
     * Populate `this.options` and alias as `options`.
     */
    options = _.extend(this.options, options || {});

    if (options.app != null) {
      this.app = this.options.app;
    } else {
      throw new Error("options.app expected when initializing a new view")
    }

    if (options.parentView != null) {
      this.parentView = options.parentView;
    }

    if (options.model != null) {
      if (!(options.model instanceof Backbone.Model) && options.model_name) {
        options.model = this.app.modelUtils.getModel(options.model_name, options.model, {
          parse: true
        });
      }
      options.model_name = options.model_name || this.app.modelUtils.modelName(options.model.constructor);
      options.model_id = options.model.id;
    }

    if (options.collection != null) {
      options.collection_name = options.collection_name || this.app.modelUtils.modelName(options.collection.constructor);
      options.collection_params = options.collection.params;
    }

    this.model = options.model;
    this.collection = options.collection;
  },

  /**
   * Key for the template
   */
  name: null,

  /**
   * Parent of the current view.
   * We make sure to stick this on the prototype as a runtime optimization
   * for V8. It's best not to add properties to the instance after initialization.
   */
  parentView: null,

  /**
   * Children of the current view.
   */
  childViews: null,

  /**
   * Flag whether or not the view is currently being viewed
   */
  viewing: false,

  /**
   * Gets array of child views by their name
   * Empty array is returned when no match is found
   */
  getChildViewsByName: function(name) {
    return _.where(this.childViews, {name: name});
  },

  /**
   * Get data for template.  This also acts as a view-model.
   * Try to return proper data if model or collection is available.
   */
  getTemplateData: function() {
    if (this.model) {
      return this.model.toJSON();
    } else if (this.collection) {
      return {
        models: this.collection.toJSON(),
        meta: this.collection.meta,
        params: this.collection.params
      };
    } else {
      return _.clone(this.options);
    }
  },

  /**
   * Add special properties `_app` and `_model` or `_collection` to pass to
   * the templates.
   */
  decorateTemplateData: function(data) {
    if (this.app) {
      data._app = this.app;
    }
    if (this.model) {
      data._model = this.model;
    }
    if (this.collection) {
      data._collection = this.collection;
    }
    data._view = this;
    return data;
  },

  getTemplateName: function() {
    return this.options.template_name || this.name;
  },

  /**
   * Get template function
   */
  getTemplate: function() {
    return this.app.templateAdapter.getTemplate(this.getTemplateName());
  },

  /**
   * Any options not to create data-attributes for.
   */
  nonAttributeOptions: ['id', 'className', 'tagName'],

  /**
   * Get HTML attributes to add to el.
   */
  getAttributes: function() {
    var attributes = {},
        fetchSummary = {},
        modelUtils = this.app.modelUtils;

    if (this.attributes) {
      _.extend(attributes, _.result(this, 'attributes'));
    }
    if (this.id) {
      attributes.id = _.result(this, "id");
    }
    if (this.className) {
      attributes['class'] = _.result(this, "className");
    }

    // Add `data-view` attribute with view key.
    // For now, view key is same as template.
    attributes['data-view'] = this.name;

    // Add model & collection meta data from options,
    // as well as any non-object option values.
    _.each(this.options, function(value, key) {
      var id, modelOrCollectionId;

      if (value != null) {
        if (_.isFunction(value.constructor) && value.constructor.id != null) {
          modelOrCollectionId = value.constructor.id;
          if (modelUtils.isModel(value)) {
            id = value.get(value.idAttribute);
            if (id == null) {
              // Bail if there's no ID; someone's using `this.model` in a
              // non-standard way, and that's okay.
              return;
            }
            // Cast the `id` attribute to string to ensure it's included in attributes.
            // On the server, it can be i.e. an `ObjectId` from Mongoose.
            value = id.toString();
            fetchSummary[key] = {model: modelOrCollectionId, id: value};
            return;
          }
          if (modelUtils.isCollection(value) && value.params != null) {
            fetchSummary[key] = {collection: modelOrCollectionId, params: value.params};
            return;
          }
        }
        if (!_.isObject(value) && !_.include(this.nonAttributeOptions, key)) {
          attributes["data-" + key] = value;
        }
      }
    });

    if (!_.isEmpty(fetchSummary)) {
      attributes['data-fetch_summary'] = JSON.stringify(fetchSummary);
    }
    return attributes;
  },

  /**
   * Turn template into HTML, minus the wrapper element.
   */
  getInnerHtml: function() {
    var template = this.getTemplate(),
        data;

    this._preRender();
    data = this.getTemplateData();
    data = this.decorateTemplateData(data);
    if (template == null) {
      throw new Error(this.name + ": template \"" + this.getTemplateName() + "\" not found.");
    }
    return template(data);
  },

  /**
   * Get the HTML for the view, including the wrapper element.
   */
  getHtml: function() {
    var html = this.getInnerHtml(),
        attributes = this.getAttributes(),
        tagName = _.result(this, "tagName"),
        attrString;

    attrString = _.inject(attributes, function(memo, value, key) {
      return memo += " " + key + "=\"" + _.escape(value) + "\"";
    }, '');

    return "<" + tagName + attrString + ">" + html + "</" + tagName + ">";
  },

  render: function() {
    var html = this.getInnerHtml();
    this.$el.html(html);

    // Because we only set the attributes of the outer element
    // when calling getHtml() (server), let's make sure it also
    // happens during render() (client).

    this.$el.attr(this.getAttributes());
    this._postRender();
    return this;
  },

  /**
   * If rendered on the client missing its data,
   * fetch it based on the parameters passed in.
   */
  fetchLazy: function() {
    var params = {},
        fetchSpec;

    params[this.options.param_name] = this.options.param_value;
    if (this.options.model_id != null) {
      params.id = this.options.model_id;
    }
    if (this.options.model_name != null) {
      fetchSpec = {
        model: {
          model: this.options.model_name,
          params: params
        }
      };
    } else if (this.options.collection_name != null) {
      fetchSpec = {
        collection: {
          collection: this.options.collection_name,
          params: params
        }
      };
    }
    this.setLoading(true);
    this.app.fetch(fetchSpec, this._fetchLazyCallback.bind(this));
  },

  _fetchLazyCallback: function(err, results) {
    this.setLoading(false);
    if (err) {
      console.log("FETCH ERR: " + err);
    } else if (this.viewing) {
      // It's possible that by the time the XHR returns, the user has navigated
      // away to a new page, check for whether we are viewing first
      this.parseOptions(results);
      this.render();
    }
  },

  /**
   * Anything to do before rendering on the client or server.
   * This is useful for i.e. accessing @model in the client after
   * @hydrate() is called, but before @getTemplateData() is called.
   */
  _preRender: function() {
    this.preRender();
    this.trigger('preRender');
  },

  /**
   * Anything to do after rendering on the client, such initializing jQuery
   * plugins like sliders, slideshows, etc.
   */
  _postRender: function() {
    this.attachChildViews();
    this.postRender();
    this.trigger('postRender');
  },

  /**
   * To be overridden by subclasses.
   */
  preRender: noop,

  /**
   * To be overridden by subclasses.
   */
  postRender: noop,

  /**
   * Hydrate this view with the data it needs, if being attached
   * to pre-exisitng DOM.
   */
  hydrate: function(callback) {
    var fetchSummary = this.options.fetch_summary;
    if (!_.isEmpty(fetchSummary)) {
      this.app.fetcher.hydrate(fetchSummary, {
        app: this.app
      }, function(err, results) {
        this.parseOptions(results);
        callback(err);
      }.bind(this));
    } else {
      callback(null);
    }
  },

  setLoading: function(loading) {
    this.$el.toggleClass('loading', loading);
    this.trigger('loading', loading);
  },

  /**
   * When HTML is already present (rendered by server),
   * this is what gets called to bind to the element.
   */
  attach: function(element, parentView) {
    var $el = $(element);
    $el.data('view-attached', true);
    this.setElement($el);

    /**
     * Store a reference to the parent view.
     */
    this.parentView = parentView;

    /**
     * When the view is attached, flip viewing to true
     */
    this.viewing = true;

    /**
     * Hydrate looks if there is a model or collection associated
     * with this view, and tries to load it from memory.
     */
    this.hydrate(function(err) {
      /**
       * Call preRender() so we can access things setup by @hydrate()
       * (like @model) in i.e. @getTemplateData().
       */
      this._preRender();

      /**
       * We have to call postRender() so client-only things happen,
       * i.e. initialize slideshows, etc.
       */
      this._postRender();

      /**
       * If the view says it should try to be lazy loaded, and it doesn't
       * have a model or collection, then do so.
       */
      if (this.options.lazy === true && this.options.collection == null && this.options.model == null) {
        this.fetchLazy();
      }
      this.trigger('attach');
    }.bind(this));

  },

  /**
   * Happens client-side.
   * Find all of sub view DOM elements
   * Get the view key
   * Call this.getView()
   * Attach childView
   */
  attachChildViews: function() {
    var _baseView = this;

    // Remove all child views in case we are re-rendering through
    // manual .render() or 'refresh' being triggered on the view.
    this.removeChildViews();
    BaseView.attach(this.app, this, function(views) {
      _baseView.childViews = views;
    });
  },

  removeChildViews: function() {
    (this.childViews || []).forEach(function(view) {
      view.remove();
    });
  },

  remove: function() {
    this.removeChildViews();
    this.childViews = null;
    this.parentView = null;
    this.viewing = false;

    var obj = this.model || this.collection;

    if (obj) {
      obj.off(null, null, this);
    }
    BaseView.__super__.remove.apply(this, arguments);
    this.trigger('remove');
  }
});

/**
 * Class methods
 * -------------
 */

BaseView.getView = function(viewName, entryPath, callback) {
  var viewPath;

  if (!entryPath) entryPath = '';

  viewPath = entryPath + "app/views/" + viewName;
  // check for AMD environment
  if (typeof callback == 'function') {
    // Only used in AMD environment
    if (typeof define != 'undefined') {
      requireAMD([viewPath], callback);
    } else {
      callback(require(viewPath));
    }
  } else {
    return require(viewPath);
  }
};

BaseView.attach = function(app, parentView, callback) {
  var scope = parentView ? parentView.$el : null,
      list = $('[data-view]', scope).toArray();

  async.map(list, function(el, cb) {
    var $el, options, parsed, viewName;
    $el = $(el);
    if (!$el.data('view-attached')) {
      options = $el.data();
      viewName = options.view;
      _.each(options, function(value, key) {
        if (_.isString(value)) {
          parsed = _.unescape(value);
          try {
            parsed = JSON.parse(parsed);
          } catch (err) {}
          options[key] = parsed;
        }
      });
      options.app = app;
      BaseView.getView(viewName, app.options.entryPath, function(ViewClass) {
        var view = new ViewClass(options);
        view.attach($el, parentView);
        cb(null, view);
      });
    } else {
      cb(null, null);
    }
  }, function(err, views) {
    // no error handling originally
    callback(_.compact(views));
  });
};

/**
 * Noops on the server, because they do DOM stuff.
 */
if (typeof window === 'undefined') {
  BaseView.prototype._ensureElement = noop;
  BaseView.prototype.delegateEvents = noop;
}

},{"async":57,"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],64:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    async = require('async'),
    ModelStore = require('./store/model_store'),
    CollectionStore = require('./store/collection_store'),
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

module.exports = Fetcher;

function Fetcher(options) {
  this.options = options;
  this.app = this.options.app;
  this.modelUtils = this.app.modelUtils;
  this.modelStore = new ModelStore({
    app: this.app,
    modelUtils: this.modelUtils
  });
  this.collectionStore = new CollectionStore({
    app: this.app,
    modelUtils: this.modelUtils
  });
}

Fetcher.prototype.buildOptions = function(additionalOptions, params) {
  var options = {app: this.app};
  _.defaults(options, additionalOptions);
  _.defaults(options, params);
  return options;
};

/**
 * Returns an instance of Model or Collection.
 */
Fetcher.prototype.getModelOrCollectionForSpec = function(spec, attrsOrModels, options, callback) {
  if (spec.model) {
    return this.getModelForSpec(spec, attrsOrModels, options, callback);
  } else {
    return this.getCollectionForSpec(spec, attrsOrModels, options, callback);
  }
};

/**
 * Returns an instance of Collection.
 */
Fetcher.prototype.getCollectionForSpec = function(spec, models, options, callback) {
  var collectionOptions = this.buildOptions(options, spec.params);
  models = models || [];
  return this.modelUtils.getCollection(spec.collection, models, collectionOptions, callback);
};

/**
 * Returns an instance of Model.
 */
Fetcher.prototype.getModelForSpec = function(spec, attributes, options, callback) {
  var modelOptions = this.buildOptions(options);

  attributes = attributes || {};
  _.defaults(attributes, spec.params);

  return this.modelUtils.getModel(spec.model, attributes, modelOptions, callback);
};

/**
 * Used to hold timestamps of when 'checkFresh()' was called on a model/collection.
 * We use this to throttle it in 'shouldCheckFresh()'.
 */
Fetcher.prototype.checkedFreshTimestamps = {};

/**
 * Only once every ten seconds. Smarter?
 */
Fetcher.prototype.checkedFreshRate = 10000;

Fetcher.prototype.shouldCheckFresh = function(spec) {
  var key = this.checkedFreshKey(spec),
      timestamp = this.checkedFreshTimestamps[key];
  if (!timestamp) {
    return true;
  }
  if (new Date().getTime() - timestamp > this.checkedFreshRate) {
    return true;
  }
  return false;
};

Fetcher.prototype.didCheckFresh = function(spec) {
  var key = this.checkedFreshKey(spec);
  this.checkedFreshTimestamps[key] = new Date().getTime();
};

Fetcher.prototype.checkedFreshKey = function(spec) {
  var meta;
  meta = {
    name: spec.model || spec.collection,
    params: spec.params
  };
  return JSON.stringify(meta);
};

/**
 * map fetchSpecs to models and fetch data in parallel
 */
Fetcher.prototype._retrieve = function(fetchSpecs, options, callback) {
  var batchedRequests = {};

  _.each(fetchSpecs, function(spec, name) {
    batchedRequests[name] = function(cb) {
      var collectionData, model, modelData, modelOptions;

      if (!options.readFromCache) {
        this.fetchFromApi(spec, cb);
      } else {
        modelData = null;
        modelOptions = {};

        // First, see if we have stored the model or collection.
        if (spec.model != null) {

          this._retrieveModel(spec, function(err, modelData) {
            this._retrieveModelData(spec, modelData, modelOptions, cb);
          }.bind(this));

        } else if (spec.collection != null) {

          this.collectionStore.get(spec.collection, spec.params, function(collectionData) {
            if (collectionData) {
              modelData = this.retrieveModelsForCollectionName(spec.collection, collectionData.ids);
              modelOptions = {
                meta: collectionData.meta,
                params: collectionData.params
              };
            }
            this._retrieveModelData(spec, modelData, modelOptions, cb);
          }.bind(this));

        }

      }
    }.bind(this);
  }, this);
  async.parallel(batchedRequests, callback);
};

Fetcher.prototype._retrieveModelData = function(spec, modelData, modelOptions, cb) {

  // If we found the model/collection in the store, then return that.
  if (!this.needsFetch(modelData, spec)) {
    model = this.getModelOrCollectionForSpec(spec, modelData, modelOptions);

    /**
     * If 'checkFresh' is set (and we're in the client), then before we
     * return the cached object we fire off a fetch, compare the results,
     * and if the data is different, we trigger a 'refresh' event.
     */
    if (spec.checkFresh && !isServer && this.shouldCheckFresh(spec)) {
      model.checkFresh();
      this.didCheckFresh(spec);
    }
    cb(null, model);
  } else {
    /**
     * Else, fetch anew.
     */
    this.fetchFromApi(spec, cb);
  }
}

Fetcher.prototype._retrieveModel = function(spec, callback) {
  var fetcher = this;

  // Attempt to fetch from the modelStore based on the idAttribute
  this.modelUtils.modelIdAttribute(spec.model, function(err, idAttribute) {
    var modelData = fetcher.modelStore.get(spec.model, spec.params[idAttribute]);
    if (modelData)
      return callback(null, modelData);

    // if there are no other keys than the id in the params, return null;
    if (_.isEmpty(_.omit(spec.params, idAttribute)))
      return callback(null, null);

    // Attempt to fetch the model in the modelStore based on the other params
    return callback(null, fetcher.modelStore.find(spec.model, spec.params));
  });
};

Fetcher.prototype.needsFetch = function(modelData, spec) {
  if (modelData == null) return true;
  if (this.isMissingKeys(modelData, spec.ensureKeys)) return true;
  if (spec.needsFetch === true) return true;
  if (typeof spec.needsFetch === 'function' && spec.needsFetch(modelData)) return true;
  return false;
};

Fetcher.prototype.isMissingKeys = function(modelData, keys) {
  var key;

  if (keys == null) {
    return false;
  }
  if (!_.isArray(keys)) {
    keys = [keys];
  }
  for (var i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    if (modelData[key] == null) {
      return true;
    }
  }
  return false;
};

Fetcher.prototype.fetchFromApi = function(spec, callback) {
  var model = this.getModelOrCollectionForSpec(spec),
      fetcher = this;
  model.fetch({
    data: spec.params,
    success: function(model, body) {
      callback(null, model);
    },
    error: function(model, resp, options) {
      var body, respOutput, err;

      body = resp.body;
      resp.body = typeof body === 'string' ? body.slice(0, 150) : body;
      respOutput = JSON.stringify(resp);
      err = new Error("ERROR fetching model '" + fetcher.modelUtils.modelName(model.constructor) + "' with options '" + JSON.stringify(options) + "'. Response: " + respOutput);
      err.status = resp.status;
      err.body = body;
      callback(err);
    }
  });
};

Fetcher.prototype.retrieveModelsForCollectionName = function(collectionName, modelIds) {
  var modelName = this.modelUtils.getModelNameForCollectionName(collectionName);
  return this.retrieveModels(modelName, modelIds);
};

Fetcher.prototype.retrieveModels = function(modelName, modelIds) {
  return modelIds.map(function(id) {
    return this.modelStore.get(modelName, id);
  }, this);
};

Fetcher.prototype.summarize = function(modelOrCollection) {
  var summary = {},
      idAttribute;

  if (this.modelUtils.isCollection(modelOrCollection)) {
    idAttribute = modelOrCollection.model.prototype.idAttribute;
    summary = {
      collection: this.modelUtils.modelName(modelOrCollection.constructor),
      ids: modelOrCollection.pluck(idAttribute),
      params: modelOrCollection.params,
      meta: modelOrCollection.meta
    };
  } else if (this.modelUtils.isModel(modelOrCollection)) {
    idAttribute = modelOrCollection.idAttribute;
    summary = {
      model: this.modelUtils.modelName(modelOrCollection.constructor),
      id: modelOrCollection.get(idAttribute)
    };
  }
  return summary;
};

Fetcher.prototype.storeResults = function(results) {
  _.each(results, function(modelOrCollection) {
    modelOrCollection.store();
  });
};

Fetcher.prototype.bootstrapData = function(modelMap) {
  var results = {},
      fetcher = this;

  async.forEach(_.keys(modelMap), function(name, cb) {
    var map = modelMap[name];
    fetcher.getModelOrCollectionForSpec(map.summary, map.data, _.pick(map.summary, 'params', 'meta'), function(modelOrCollection) {
      results[name] = modelOrCollection;
      cb(null);
    });
  }, function(err) {
    fetcher.storeResults(results);
  });
};

Fetcher.prototype.hydrate = function(summaries, options, callback) {
  var results = {},
      fetcher = this;

  /**
   * Support both (summaries, options, callback)
   * and (summaries, callback).
   */
  if (arguments.length === 2) {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  async.forEach(_.keys(summaries), function(name, cb) {
    var summary = summaries[name];
    if (summary.model != null) {
      results[name] = fetcher.modelStore.get(summary.model, summary.id, true);

      if ((results[name] != null) && (options.app != null)) {
        results[name].app = options.app;
      }

      cb(null);

    } else if (summary.collection != null) {
      // Also support getting all models for a collection.
      fetcher.collectionStore.get(summary.collection, summary.params, function(collectionData) {
        var collectionOptions,
            models;

        if (collectionData == null) {
          throw new Error("Collection of type \"" + summary.collection + "\" not found for params: " + JSON.stringify(summary.params));
        }

        models = fetcher.retrieveModelsForCollectionName(summary.collection, collectionData.ids);
        collectionOptions = {
          params: summary.params,
          meta: collectionData.meta,
          app: options.app
        };
        fetcher.modelUtils.getCollection(summary.collection, models, collectionOptions, function(collection) {
          results[name] = collection;

          if ((results[name] != null) && (options.app != null)) {
            results[name].app = options.app;
          }

          cb(null);
        });
      });
    }
  }, function(err) {
    callback(err, results);
  });
};

Fetcher.prototype.pendingFetches = 0;

Fetcher.prototype.fetch = function(fetchSpecs, options, callback) {
  var fetcher = this;

  /**
   * Support both (fetchSpecs, options, callback)
   * and (fetchSpecs, callback).
   */
  if (arguments.length === 2) {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  // Different defaults for client v server.
  if (isServer) {
    if (options.readFromCache == null) {
      options.readFromCache = false;
    }
    if (options.writeToCache == null) {
      options.writeToCache = false;
    }
  } else {
    if (options.readFromCache == null) {
      options.readFromCache = true;
    }
    if (options.writeToCache == null) {
      options.writeToCache = true;
    }
  }

  this.pendingFetches++;
  this.trigger('fetch:start', fetchSpecs);
  this._retrieve(fetchSpecs, options, function(err, results) {
    fetcher.pendingFetches--;
    fetcher.trigger('fetch:end', fetchSpecs, err, results);
    if (err) return callback(err);
    if (options.writeToCache) {
      fetcher.storeResults(results);
    }
    callback(null, results);
  });
};

// Mixin Backbone.Events for events that work in client & server.
_.extend(Fetcher.prototype, Backbone.Events);

},{"./store/collection_store":66,"./store/model_store":68,"async":57,"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],65:[function(require,module,exports){
/**
 * Since we make rendr files AMD friendly on app setup stage
 * we need to pretend that this code is pure commonjs
 * means no AMD-style require calls.
 */
var requireAMD = require;

var BaseModel = require("./base/model"),
    BaseCollection = require("./base/collection");

var typePath = {
  model: "app/models/",
  collection: "app/collections/"
};

module.exports = ModelUtils;

function ModelUtils(entryPath) {
  this.entryPath = entryPath;
  this._classMap = {};
}

ModelUtils.prototype.getModel = function(path, attrs, options, callback) {
  var Model;
  attrs = attrs || {};
  options = options || {};
  if (typeof callback == 'function') {
    this.getModelConstructor(path, function(Model) {
      callback(new Model(attrs, options));
    });
  } else {
    Model = this.getModelConstructor(path);
    return new Model(attrs, options);
  }
};

ModelUtils.prototype.getCollection = function(path, models, options, callback) {
  var Collection;
  models = models || [];
  options = options || {};
  if (typeof callback == 'function') {
    this.getCollectionConstructor(path, function(Collection) {
      callback(new Collection(models, options));
    });
  } else {
    Collection = this.getCollectionConstructor(path);
    return new Collection(models, options);
  }
};

ModelUtils.prototype.getModelConstructor = function(path, callback) {
  return this.fetchConstructor('model', path, callback);
};

ModelUtils.prototype.getCollectionConstructor = function(path, callback) {
  return this.fetchConstructor('collection', path, callback);
};

ModelUtils.prototype.fetchConstructor = function(type, path, callback) {
  path = this.underscorize(path);

  var fullPath = this.entryPath + typePath[type] + path;

  if (this._classMap[path]) {
    return (typeof callback == 'function') ? callback(this._classMap[path]) : this._classMap[path];
  } else if (typeof callback == 'function') {
    // Only used in AMD environment
    if (typeof define != 'undefined') {
      requireAMD([fullPath], callback);
    } else {
      callback(require(fullPath));
    }
    return;
  } else {
    return require(fullPath);
  }
};

ModelUtils.prototype.isModel = function(obj) {
  return obj instanceof BaseModel;
};

ModelUtils.prototype.isCollection = function(obj) {
  return obj instanceof BaseCollection;
};

ModelUtils.prototype.getModelNameForCollectionName = function(collectionName) {
  var Collection;
  Collection = this.getCollectionConstructor(collectionName);
  return this.modelName(Collection.prototype.model);
};

ModelUtils.uppercaseRe = /([A-Z])/g;

ModelUtils.prototype.underscorize = function(name) {
  if (name == null) {
    return undefined;
  }
  name = name.replace(ModelUtils.uppercaseRe, function(c) {
    return "_" + c.toLowerCase();
  });
  if (name[0] === "_") {
    name = name.slice(1);
  }
  return name;
};

/**
 * The 'name' property is added to the constructor when using a named function,
 * and it cannot be changed.  I.e.:
 *
 * function MyClass(){}
 * MyClass.name
 * -> "MyClass"
 *
 * We first look for the 'id' property of the constructor, which is compatible
 * with standard Backbone-style class inheritance.
 *
 * var MyClass = Backbone.Model.extend({});
 * MyClass.name
 * -> ""
 * MyClass.id = "MyClass"
 */
ModelUtils.prototype.modelName = function(modelOrCollectionClass) {
  return this.underscorize(modelOrCollectionClass.id || modelOrCollectionClass.name);
};

ModelUtils.prototype.modelIdAttribute = function(modelName, callback) {
  this.getModelConstructor(modelName, function(constructor) {
    callback(constructor.prototype.idAttribute);
  });
};

},{"./base/collection":60,"./base/model":61}],66:[function(require,module,exports){
var _ = require('underscore'),
    Super = require('./memory_store');

module.exports = CollectionStore;

function CollectionStore() {
  Super.apply(this, arguments);
}

/**
 * Set up inheritance.
 */
CollectionStore.prototype = Object.create(Super.prototype);
CollectionStore.prototype.constructor = CollectionStore;

CollectionStore.prototype.set = function(collection, params) {
  var data, idAttribute, key;
  params = params || collection.params;
  key = this._getStoreKey(this.modelUtils.modelName(collection.constructor), params);
  idAttribute = collection.model.prototype.idAttribute;
  data = {
    ids: collection.pluck(idAttribute),
    meta: collection.meta,
    params: collection.params
  };
  return Super.prototype.set.call(this, key, data, null);
};

/**
 * Returns an array of model ids.
 */
CollectionStore.prototype.get = function(collectionName, params, callback) {
  var _collectionStore = this;
  /**
   * Kind of jank-sauce. Always merge in the default
   * params for the given collection.
   */
  if (typeof callback == 'function') {
    this.modelUtils.getCollectionConstructor(collectionName, function(Collection) {
      callback(get.call(_collectionStore, collectionName, params, Collection));
    });
    return;
  } else {
    var Collection = this.modelUtils.getCollectionConstructor(collectionName);
    return get.call(this, collectionName, params, Collection);
  }

  function get(collectionName, params, Collection) {
    var key;
    params = _.clone(params || {});
    params = _.defaults(params, Collection.prototype.defaultParams);
    key = this._getStoreKey(collectionName, params);
    return Super.prototype.get.call(this, key);
  }
};

CollectionStore.prototype._formatKey = function(key) {
  return Super.prototype._formatKey.call(this, "_cs:" + key);
};

CollectionStore.prototype._getStoreKey = function(collectionName, params) {
  var underscored = this.modelUtils.underscorize(collectionName);
  return underscored + ":" + JSON.stringify(sortParams(params));
}

function sortParams(params) {
  var sorted = {};
  _.chain(params).keys().sort().forEach(function(key) {
    sorted[key] = params[key];
  });
  return sorted;
}

},{"./memory_store":67,"underscore":"BWM0Lx"}],67:[function(require,module,exports){
module.exports = MemoryStore;

function MemoryStore(options) {
  this.options = options || {};
  this.app = this.options.app;
  this.modelUtils = this.options.modelUtils;
  this.cache = {};
}

MemoryStore.prototype.cacheVersion = '';

MemoryStore.prototype.get = function(key) {
  if (!key) {
    return;
  }
  return this.validateExpiration(key, this._get(key));
};

MemoryStore.prototype.validateExpiration = function(key, data) {
  if (data && data.expires && Date.now() > data.expires) {
    if (typeof console !== "undefined") {
      console.log("MemoryStore: Expiring key \"" + key + "\".");
    }
    this.clear(key);
    data = undefined;
  } else if (data && data.value) {
    data = data.value;
  }
  return data;
};

MemoryStore.prototype.set = function(key, value, ttlSec) {
  var expires;

  if (!key || value === undefined) {
    return false;
  }
  expires = ttlSec ? Date.now() + ttlSec * 1000 : null;
  this._set(key, {
    value: value,
    expires: expires
  });
  return true;
};

MemoryStore.prototype._get = function(key) {
  return this.cache[this._formatKey(key)];
};

MemoryStore.prototype._set = function(key, data) {
  this.cache[this._formatKey(key)] = data;
};

MemoryStore.prototype._clear = function(key) {
  delete this.cache[this._formatKey(key)];
};

MemoryStore.prototype._clearAll = function() {
  this.cache = {};
};

MemoryStore.prototype.clear = function(key) {
  if (key != null) {
    return this._clear(key);
  } else {
    return this._clearAll();
  }
};

MemoryStore.prototype._versionKey = function(key) {
  return key + ":" + this.cacheVersion;
};

MemoryStore.prototype._formatKey = function(key) {
  return this._versionKey(key);
};

},{}],68:[function(require,module,exports){
var _ = require('underscore'),
    Super = require('./memory_store');

module.exports = ModelStore;

function ModelStore() {
  Super.apply(this, arguments);
}

/**
 * Set up inheritance.
 */
ModelStore.prototype = Object.create(Super.prototype);
ModelStore.prototype.constructor = ModelStore;

ModelStore.prototype.set = function(model) {
  var existingAttrs, id, key, modelName, newAttrs;

  id = model.get(model.idAttribute);
  modelName = this.modelUtils.modelName(model.constructor);
  if (modelName == null) {
    throw new Error('Undefined modelName for model');
  }
  key = this._getModelStoreKey(modelName, id);

  /**
   * We want to merge the model attrs with whatever is already
   * present in the store.
   */
  existingAttrs = this.get(modelName, id) || {};
  newAttrs = _.extend({}, existingAttrs, model.toJSON());
  return Super.prototype.set.call(this, key, newAttrs, null);
};

ModelStore.prototype.get = function(modelName, id, returnModelInstance) {
  var key, modelData;

  if (returnModelInstance == null) {
    returnModelInstance = false;
  }
  key = this._getModelStoreKey(modelName, id);
  modelData = Super.prototype.get.call(this, key);
  if (modelData) {
    if (returnModelInstance) {
      return this.modelUtils.getModel(modelName, modelData, {
        app: this.app
      });
    } else {
      return modelData;
    }
  }
};

ModelStore.prototype.find = function(modelName, params) {
  var prefix, foundCachedObject, _this, data, foundCachedObjectKey;
  prefix = this._formatKey(this._keyPrefix(modelName));
  _this = this;
  // find the cached object that has attributes which are a subset of the params
  foundCachedObject = _.find(this.cache, function(cacheObject, key) {
    // since we're iterating over the entire cache, prevent searching different models
    if (!startsWith(key, prefix))
      return false;
    // ensure the object is still within the cache ttl
    data = Super.prototype.validateExpiration.call(_this, key, cacheObject);
    // validate subset
    if (data && isObjectSubset(params, data)) {
      // we store the key outside the iterator because _.find only returns the value, not the key
      foundCachedObjectKey = key;
      return true;
    }
    return false;
  });
  return foundCachedObject && Super.prototype.validateExpiration.call(this, foundCachedObjectKey, foundCachedObject);
}

ModelStore.prototype._formatKey = function(key) {
  return Super.prototype._formatKey.call(this, "_ms:" + key);
};

function startsWith(string, prefix) {
  return string.slice(0, prefix.length) == prefix;
}

function isObjectSubset(potentialSubset, objectToTest) {
  // check all the keys of the subset, and sure their values are the same in the objectToTest
  return _.all(potentialSubset, function(value, key) {
    return objectToTest[key] == value;
  });
}

ModelStore.prototype._keyPrefix = function(modelName) {
  return this.modelUtils.underscorize(modelName);
}

ModelStore.prototype._getModelStoreKey = function(modelName, id) {
  return this._keyPrefix(modelName) + ":" + id;
}

},{"./memory_store":67,"underscore":"BWM0Lx"}],69:[function(require,module,exports){
/**
 * `syncer` is a collection of instance methods that are mixed into the prototypes
 * of `BaseModel` and `BaseCollection`. The purpose is to encapsulate shared logic
 * for fetching data from the API.
 */

var _ = require('underscore'),
    Backbone = require('backbone'),

    // Pull out params in path, like '/users/:id'.
    extractParamNamesRe = /:([a-z_-]+)/ig,

    methodMap = {
      'create': 'POST',
      'update': 'PUT',
      'delete': 'DELETE',
      'read': 'GET'
    },

    isServer = (typeof window === 'undefined');

if (isServer) {
  // hide it from requirejs since it's server only
  var serverOnly_qs = 'qs';
  var qs = require(serverOnly_qs);
} else {
  Backbone.$ = window.$ || require('jquery');
}

var syncer = module.exports;

function clientSync(method, model, options) {
  var data, error;
  data = _.clone(options.data);
  options.url = this.getUrl(options.url, true, data);
  data = addApiParams(method, model, data);
  options.data = data;
  options.emulateJSON = true;
  error = options.error;
  if (error) {
    options.error = function(xhr) {
      var body = xhr.responseText,
          contentType = xhr.getResponseHeader('content-type'),
          resp;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        try {
          body = JSON.parse(body);
        } catch (e) {}
      }
      resp = {
        body: body,
        status: xhr.status
      };
      error(resp);
    }
  };
  return Backbone.sync(method, model, options);
}

function serverSync(method, model, options) {
  var api, data, urlParts, verb, req;

  data = _.clone(options.data);
  data = addApiParams(method, model, data);
  options.url = this.getUrl(options.url, false, data);
  verb = methodMap[method];
  urlParts = options.url.split('?');
  req = this.app.req;

  api = {
    method: verb,
    path: urlParts[0],
    query: qs.parse(urlParts[1]) || {},
    api: _.result(this, 'api'),
    body: {}
  };

  /**
   * Put the data as form data if POST or PUT,
   * otherwise query string.
   */
  if (verb === 'POST' || verb === 'PUT') {
    api.body = data;
  } else {
    _.extend(api.query, data);
  }

  req.dataAdapter.request(req, api, function(err, response, body) {
    var resp;
    if (err) {
      resp = {
        body: body,
        // Pass through the statusCode, so lower-level code can handle i.e. 401 properly.
        status: err.status
      };

      if (options.error) {
        // This `error` has signature of $.ajax, not Backbone.sync.
        options.error(resp);
      } else {
        throw err;
      }
    } else {
      // This `success` has signature of $.ajax, not Backbone.sync.
      options.success(body);
    }
  });
}

function addApiParams(method, model, params) {
  params = params || {};
  var ret = _.clone(params);

  /**
   * So, by default Backbone sends all of the model's
   * attributes if we don't pass any in explicitly.
   * This gets screwed up because we append the locale
   * and currency, so let's replicate that behavior.
   */
  if (model && _.isEqual(params, {}) && (method === 'create' || method === 'update')) {
    _.extend(ret, model.toJSON());
  }
  return ret;
}

syncer.sync = function sync() {
  var syncMethod = isServer ? serverSync : clientSync;
  return syncMethod.apply(this, arguments);
};

/**
 * 'model' is either a model or collection that
 * has a 'url' property, which can be a string or function.
 */
syncer.getUrl = function getUrl(url, clientPrefix, params) {
  if (clientPrefix == null) {
    clientPrefix = false;
  }
  params = params || {};
  url = url || _.result(this, 'url');
  if (clientPrefix && !~url.indexOf('://')) {
    url = this.formatClientUrl(url, _.result(this, 'api'));
  }
  return this.interpolateParams(this, url, params);
};

syncer.formatClientUrl = function(url, api) {
  var prefix = this.app.get('apiPath') || '/api';
  if (api) {
    prefix += '/' + api;
  }
  prefix += '/-';
  return prefix + url;
};

/**
 * This is used to fire off a 'fetch', compare the results to the data we have,
 * and then trigger a 'refresh' event if the data has changed.
 *
 * Happens only client-side.
 */
syncer.checkFresh = function checkFresh() {
  var url;

  this.app.trigger('checkFresh:start');

  // Lame: have to lazy-require to prevent circular dependency.
  // It is circular dep
  // hide it from requirejs since it's optional/lazy-loaded
  url = this.getUrl(null, true);

  $.getJSON(url, this.params, function(resp) {
    var data, differs;

    // The second argument 'false' tells 'parse()' not to modify the instance.
    data = this.parse(resp, false);
    differs = this.objectsDiffer(data, this.toJSON());
    this.trigger('checkFresh:end', differs);
    if (differs) {
      if (this.app.modelUtils.isModel(this)) {
        this.set(data, {
          silent: true
        });
      } else {
        this.reset(data, {
          parse: true,
          silent: true
        });
      }
      // We manually store the updated data.
      this.store();
      this.trigger('refresh');
    }
  }.bind(this));
};

/**
 * Deeply-compare two objects to see if they differ.
 */
syncer.objectsDiffer = function objectsDiffer(data1, data2) {
  var changed = false,
      keys,
      key,
      value1,
      value2;

  keys = _.unique(_.keys(data1).concat(_.keys(data2)));
  for (var i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    value1 = data1[key];
    value2 = data2[key];

    // If attribute is an object recurse
    if (_.isObject(value1) && _.isObject(value2)) {
      changed = this.objectsDiffer(value1, value2);
    // Test for equality
    } else if (!_.isEqual(value1, value2)) {
      changed = true;
    }
  }
  return changed;
};

/**
 * This maps i.e. '/listings/:id' to '/listings/3' if
 * the model you supply has model.get('id') == 3.
 */
syncer.interpolateParams = function interpolateParams(model, url, params) {
  var matches = url.match(extractParamNamesRe);

  params = params || {};

  if (matches) {
    matches.forEach(function(param) {
      var property = param.slice(1),
          value;

      // Is collection? Then use options.
      if (model.length != null) {
        value = model.options[property];

      // Otherwise it's a model; use attrs.
      } else {
        value = model.get(property);
      }
      url = url.replace(param, value);

      /**
       * Delete the param from params hash, so we don't get urls like:
       * /v1/threads/1234?id=1234...
       */
      delete params[property];
    });
  }
  return url;
};

},{"backbone":"vocP7Q","jquery":"WPLrfX","underscore":"BWM0Lx"}],"underscore":[function(require,module,exports){
module.exports=require('BWM0Lx');
},{}],"BWM0Lx":[function(require,module,exports){
(function (global){(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

; browserify_shim__define__module__export__(typeof _ != "undefined" ? _ : window._);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["RmmdI4","036vLR","YjZqKj","Hw64yw","zzaKMl","WU8P0a","aeMvX5","C7/za0","OPO86P","K4WqzE","2afhqU"])