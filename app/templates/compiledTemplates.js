module.exports = function(Handlebars) {

var templates = {};

templates["guru/courses"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.view || (depth0 && depth0.view)),stack1 ? stack1.call(depth0, "logged_in_header", options) : helperMissing.call(depth0, "view", "logged_in_header", options)))
    + "\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <div style=\"margin-bottom: 20px;\"></div>\n      ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.view || (depth0 && depth0.view)),stack1 ? stack1.call(depth0, "logged_in_navigation", options) : helperMissing.call(depth0, "view", "logged_in_navigation", options)))
    + "\n    </div>\n    <div class=\"col-md-8 col-md-offset-1\">\n      <h3>Create courses.</h3>\n      <p>These courses will be shown in search results.</p>\n      <div id=\"courseCreator\" class=\"text-left\">\n        <form class=\"form-inline clearfix mb-30\" role=\"form\">\n          <div class=\"checkbox\">\n            <label>\n              <input type=\"checkbox\" checked=\"checked\" id=\"\"/> Single Classes\n            </label>\n          </div>\n          <div class=\"form-group pull-right\">\n            <label>Fee (Rs.)</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"800\" style=\"width: 100px;\"/>\n            <label>/class</label>\n          </div>\n        </form>\n\n        <div class=\"panel panel-default\" style=\"padding: 10px;\">\n          <h4>Add new course</h4>\n          <form class=\"form-horizontal\" role=\"form\">\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"\">Course Name</label>\n              <div class=\"col-sm-7\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Carnatic Guitar Techniques\"/>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"\">Course Description</label>\n              <div class=\"col-sm-7\">\n                <textarea name=\"\" rows=\"5\"\n                          placeholder=\"A capable guitarist wanting to learn left and right hand techniques, traids, vibrato, bending, picking techniques, how to arpeggiate chords etc\"\n                          class=\"form-control\"></textarea>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"\">Target Audience</label>\n              <div class=\"col-sm-7\">\n                <label class=\"checkbox-inline\" for=\"beginner\">\n                  <input type=\"checkbox\" id=\"beginner\" value=\"beginner\"/> Beginner\n                </label>\n                <label class=\"checkbox-inline\" for=\"intermediate\">\n                  <input type=\"checkbox\" id=\"intermediate\" value=\"intermediate\"/> Intermediate\n                </label>\n                <label class=\"checkbox-inline\" for=\"advanced\">\n                  <input type=\"checkbox\" id=\"advanced\" value=\"advanced\"/> Advanced\n                </label>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"\">Total Course Duration</label>\n              <div class=\"col-sm-3\">\n                <div class=\"input-group\">\n                  <input type=\"text\" class=\"form-control\">\n                  <span class=\"input-group-addon\">hours</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"control-label col-sm-3\" for=\"\">Total Course Fee</label>\n              <div class=\"col-sm-3\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-addon\">Rs.</span>\n                  <input type=\"text\" class=\"form-control\">\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n\n      <div class=\"clearfix mb-30\">\n        <button class=\"btn btn-success pull-right\" id=\"saveSchedule\">Save and Proceed</button>\n      </div>\n\n    </div>\n  </div>\n</div>";
  return buffer;
  });

templates["guru/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"cover-container text-white\">\n  <div class=\"masthead clearfix\">\n    <div class=\"inner\">\n      <h3 class=\"masthead-brand\">Guitar With Guru</h3>\n      <ul class=\"nav masthead-nav\" id=\"primary-nav\">\n        <li><a href=\"/\">Home</a></li>\n        <li class=\"active\"><a href=\"/g\">Gurus</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<section class=\"background-green page-block\">\n  <div class=\"container\">\n    <div class=\"row  text-white\">\n      <div class=\"\">\n        <h3 class=\"text-center text-bold\">Setup in 3 easy steps</h3>\n        <ul class=\"list-unstyled l-v-list nav-steps\">\n          <li class=\"item active\">\n            <p>Create an account</p>\n            <div class=\"mb-10\"></div>\n            <a href=\"/auth/facebook\">\n              <img src=\"/images/fb/active_404.png\" alt=\"\"/>\n            </a>\n          </li>\n\n          <li class=\"item\">\n            <p>Create a few courses</p>\n          </li>\n\n          <li class=\"item\">\n            <p>Create weekly schedule</p>\n          </li>\n\n        </ul>\n\n      </div>\n    </div>\n  </div>\n</section>\n\n<section class=\"background-red page-block\">\n  <div class=\"container text-white\">\n    <h3 class=\"text-bold text-center\">Become a Guru</h3>\n    <p class=\"h4 text-center\">Share what you know, Make a difference.</p>\n    <div class=\"mb-60\"></div>\n    <div class=\"row\">\n      <div class=\"col-md-4 col-sm-6\">\n        <div class=\"feature-item\">\n          <div class=\"feature-item-icon\">\n            <i class=\"fa fa-music\" style=\"color: #e67e22\"></i>\n          </div>\n          <h3 class=\"feature-item-title\">\n            Promote your guitar style.\n          </h3>\n          <p class=\"feature-item-desc\">\n            Every guitarist is unique in himself.\n            Teach what you do best and create a niche in the market.\n          </p>\n        </div>\n\n      </div>\n      <div class=\"col-md-4 col-sm-6\">\n        <div class=\"feature-item\">\n          <div class=\"feature-item-icon \">\n            <i class=\"fa fa-building-o\" style=\"color: #2980b9\"></i>\n          </div>\n          <h3 class=\"feature-item-title\">\n            Comfort of your house.\n          </h3>\n          <p class=\"feature-item-desc\">\n            Take lessons from wherever you are.\n            Connect to the Internet and start teaching.\n          </p>\n        </div>\n\n      </div>\n      <div class=\"col-md-4 col-sm-6\">\n        <div class=\"feature-item\">\n          <div class=\"feature-item-icon \">\n            <i class=\"fa fa-cogs\" style=\"color: #95a5a6\"></i>\n          </div>\n          <h3 class=\"feature-item-title\">\n            Easy schedule management.\n          </h3>\n          <p class=\"feature-item-desc\">\n            Take lessons from wherever you are.\n            Connect to the Internet and start teaching.\n          </p>\n        </div>\n      </div>\n      <div class=\"col-md-4 col-sm-6\">\n        <div class=\"feature-item\">\n          <div class=\"feature-item-icon \">\n            <i class=\"fa fa-money\" style=\"color: #bdc3c7\"></i>\n          </div>\n          <h3 class=\"feature-item-title\">\n            Charge what you want.\n          </h3>\n          <p class=\"feature-item-desc\">\n            Take lessons from wherever you are.\n            Connect to the Internet and start teaching.\n          </p>\n        </div>\n\n      </div>\n      <div class=\"col-md-4 col-sm-6\">\n        <div class=\"feature-item\">\n          <div class=\"feature-item-icon \">\n            <i class=\"fa fa-google-plus\" style=\"color: #e74c3c\"></i>\n          </div>\n          <h3 class=\"feature-item-title\">\n            Teach live on Google Hangouts\n          </h3>\n          <p class=\"feature-item-desc\">\n            Take lessons from wherever you are.\n            Connect to the Internet and start teaching.\n          </p>\n        </div>\n      </div>\n      <div class=\"col-md-4 col-sm-6\">\n        <div class=\"feature-item\">\n          <div class=\"feature-item-icon \">\n            <i class=\"fa fa-video-camera\" style=\"color: #2c3e50\"></i>\n          </div>\n          <h3 class=\"feature-item-title\">\n            Inspire people by teaching.\n          </h3>\n          <p class=\"feature-item-desc\">\n            Take lessons from wherever you are.\n            Connect to the Internet and start teaching.\n          </p>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</section>";
  });

templates["guru/schedule"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

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

  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.view || (depth0 && depth0.view)),stack1 ? stack1.call(depth0, "logged_in_header", options) : helperMissing.call(depth0, "view", "logged_in_header", options)))
    + "\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <div style=\"margin-bottom: 20px;\"></div>\n      ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.view || (depth0 && depth0.view)),stack1 ? stack1.call(depth0, "logged_in_navigation", options) : helperMissing.call(depth0, "view", "logged_in_navigation", options)))
    + "\n    </div>\n    <div class=\"col-md-8 col-md-offset-1\">\n      <h3>Create time slots.</h3>\n      <p>People will make reservations against these timings.</p>\n\n      <div id=\"scheduleCreator\">\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0._collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n\n      <div class=\"clearfix mb-30\">\n        <button class=\"btn btn-success pull-right\" id=\"saveSchedule\">Save and Proceed</button>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img class=\"bg\" src=\"/images/bg.jpg\" alt=\"\"/>\n<div class=\"site-wrapper-inner\">\n  <div class=\"cover-container\">\n    <div class=\"masthead clearfix\">\n      <div class=\"inner\">\n        <h3 class=\"masthead-brand\">Guitar With Guru</h3>\n        <ul class=\"nav masthead-nav\" id=\"primary-nav\">\n          <li class=\"active\"><a href=\"/\">Home</a></li>\n          <li><a href=\"/g\">Gurus</a></li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"inner cover\">\n      <h1 class=\"cover-heading\">Tabs don't teach music. Teachers do.</h1>\n      <p>&nbsp;</p>\n      <p class=\"lead\">\n        Learn playing guitar (the way it's meant to be) from top notch indie guitarists across the globe.\n      </p>\n      <p class=\"lead\">Introducing one-on-one live guitar sessions</p>\n      <p>Drop your email to be a part of alpha launch. Besides, we don't spam :)</p>\n\n      <form id=\"signup-form\">\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"input-group input-group-lg\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"Email\" id=\"email\" spellcheck=\"false\">\n              <span class=\"input-group-btn\">\n                <button class=\"btn btn-success\" type=\"submit\">I'm In</button>\n              </span>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"mastfoot\">\n      <div class=\"inner\">\n        <p>&copy; 2014 | Guitar With Guru</p>\n      </div>\n    </div>\n  </div>\n</div>";
  });

templates["logged_in_header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"navbar navbar-static-top navbar-inverse\" role=\"navigation\">\n  <div class=\"container\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#gwg-navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"/\">Guitar With Guru</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"gwg-navbar\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Aakash Goel <b class=\"caret\"></b></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Logout</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>";
  });

templates["logged_in_navigation"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"nav nav-pills nav-stacked\">\n  <li><a href=\"/g/schedule\">Schedule</a></li>\n  <li><a href=\"/g/courses\">Courses</a></li>\n</ul>";
  });

templates["schedule_day_copy_mode"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item\">\n      <a data-daycode=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.dayCode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.dayCode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
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