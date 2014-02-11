module.exports = function(Handlebars) {

var templates = {};

templates["guru/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img class=\"bg\" src=\"/images/bg.jpg\" alt=\"\"/>\n<div class=\"site-wrapper-inner\">\n  <div class=\"cover-container\">\n    <div class=\"masthead clearfix\">\n      <div class=\"inner\">\n        <h3 class=\"masthead-brand\">Guitar With Guru</h3>\n        <ul class=\"nav masthead-nav\">\n          <li><a href=\"/\">Home</a></li>\n          <li class=\"active\"><a href=\"/g\">Gurus</a></li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"inner cover\">\n      <h1 class=\"cover-heading mb-30\">Welcome. Let's rock!</h1>\n      <div id=\"fb-root\"></div>\n      <div class=\"fb-login-container\">\n        <button class=\"btn btn-primary btn-large\" id=\"triggerFacebookLogin\">Facebook Log In</button>\n        <hr class=\"or\"/>\n      </div>\n\n      <form role=\"form\" class=\"form-horizontal\">\n        <div class=\"form-group text-left\">\n          <label for=\"name\" class=\"control-label col-xs-12 col-sm-2\">Name</label>\n          <div class=\"col-xs-12 col-sm-10\">\n            <input type=\"text\" id=\"name\" placeholder=\"Your Name\" class=\"form-control\"/>\n          </div>\n        </div>\n        <div class=\"form-group text-left\">\n          <label for=\"email\" class=\"control-label col-xs-12 col-sm-2\">Email</label>\n          <div class=\"col-xs-12 col-sm-10\">\n            <input type=\"email\" id=\"email\" placeholder=\"Your Email\" class=\"form-control\"/>\n          </div>\n        </div>\n        <div class=\"form-group text-right\">\n          <div class=\"col-sm-offset-2 col-sm-10\">\n            <input type=\"submit\" class=\"btn btn-success\" disabled id=\"next\" value=\"Next\">\n          </div>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"mastfoot\">\n      <div class=\"inner\">\n        <p>&copy; 2014 | Guitar With Guru</p>\n      </div>\n    </div>\n  </div>\n</div>";
  });

templates["guru/schedule"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          ";
  options = {hash:{
    'model': (depth0)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.view || (depth0 && depth0.view)),stack1 ? stack1.call(depth0, "schedule_day_view", options) : helperMissing.call(depth0, "view", "schedule_day_view", options)))
    + "\n        ";
  return buffer;
  }

  buffer += "<nav class=\"navbar navbar-static-top navbar-inverse\" role=\"navigation\">\n  <div class=\"container\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#gwg-navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"/\">Guitar With Guru</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"gwg-navbar\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Aakash Goel <b class=\"caret\"></b></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Logout</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <div style=\"margin-bottom: 20px;\"></div>\n      <ul class=\"nav nav-pills nav-stacked\">\n        <li class=\"active\"><a href=\"/g/schedule\">Schedule</a></li>\n        <li><a href=\"/g/course\">Course</a></li>\n      </ul>\n    </div>\n    <div class=\"col-md-8 col-md-offset-1\">\n      <h3>Create time slots.</h3>\n      <p>People will make reservations against these timings.</p>\n\n      <div id=\"scheduleCreator\">\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0._collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n\n      <div class=\"clearfix mb-30\">\n        <button class=\"btn btn-success pull-right\" id=\"saveSchedule\">Save and Proceed</button>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img class=\"bg\" src=\"/images/bg.jpg\" alt=\"\"/>\n<div class=\"site-wrapper-inner\">\n  <div class=\"cover-container\">\n    <div class=\"masthead clearfix\">\n      <div class=\"inner\">\n        <h3 class=\"masthead-brand\">Guitar With Guru</h3>\n        <ul class=\"nav masthead-nav\" id=\"primary-nav\">\n          <li class=\"active\"><a href=\"/\">Home</a></li>\n          <li><a href=\"/g\">Gurus</a></li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"inner cover\">\n      <h1 class=\"cover-heading\">Tabs don't teach music. Teachers do.</h1>\n      <p>&nbsp;</p>\n      <p class=\"lead\">\n        Learn playing guitar (the way it's meant to be) from top notch indie guitarists across the globe.\n      </p>\n      <p class=\"lead\">Introducing one-on-one live guitar sessions</p>\n      <p>Sign up to be a part of alpha launch. It has its privileges. Besides we don't spam.</p>\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div class=\"input-group input-group-lg\">\n            <input type=\"email\" class=\"form-control\" placeholder=\"Email\" id=\"email\" spellcheck=\"false\">\n              <span class=\"input-group-btn\">\n                <button class=\"btn btn-success\" type=\"button\">I'm In</button>\n              </span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"mastfoot\">\n      <div class=\"inner\">\n        <p>&copy; 2014 | Guitar With Guru</p>\n      </div>\n    </div>\n  </div>\n</div>";
  });

templates["schedule_day_copy_mode"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item\">\n      <a data-daycode=\"";
  if (stack1 = helpers.dayCode) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.dayCode); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        ";
  if (stack1 = helpers.dayCode) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.dayCode); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      </a>\n    </li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"l-h-list\">\n  <p class=\"item schedule-text-middle\">Same as:  </p>\n  <ul class=\"item l-h-list guru-schedule-copy-links\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.days), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>";
  return buffer;
  });

templates["schedule_day_no_slots"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p class=\"schedule-text-middle\">No slots</p>";
  });

templates["schedule_day_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n  <div class=\"col-sm-2 text-left\">\n    <p class=\"schedule-text-middle\"> ";
  if (stack1 = helpers.dayName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.dayName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n  </div>\n  <div class=\"col-sm-7\">\n    <div class=\"daySlotsContainer\"></div>\n    <div class=\"copyModeContainer\"></div>\n  </div>\n  <div class=\"col-sm-3 text-right\">\n    <a class=\"schedule-text-middle addNewSlot\" title=\"Add New Slot\"><i class=\"glyphicon glyphicon-plus\"></i></a>\n    <a class=\"schedule-text-middle clearAllDaySlots\" title=\"Remove All Slots\"><i class=\"glyphicon glyphicon-trash\"></i></a>\n  </div>\n</div>";
  return buffer;
  });

templates["time_slot_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"time-slot-container clearfix\">\n  <div class=\"item time-slot-unit\">\n    <div class=\"bfh-timepicker\" data-type=\"startTime\"></div>\n  </div>\n  <div class=\"item time-slot-join\">\n    <span class=\"schedule-text-middle\">to</span>\n  </div>\n  <div class=\"item time-slot-unit\">\n    <div class=\"bfh-timepicker\" data-type=\"endTime\"></div>\n  </div>\n  <div class=\"item time-slot-remove\">\n    <button class=\"btn btn-link\"><i class=\"glyphicon glyphicon-remove\"></i></button>\n  </div>\n</div>";
  });

return templates;

};