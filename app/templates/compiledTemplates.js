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