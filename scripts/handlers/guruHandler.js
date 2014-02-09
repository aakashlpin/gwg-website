'use strict';

module.exports = {
    putHomePageView: function () {
        var HomePageView    = require('../views/guruHome'),
            App             = require('../main');

        App.content.show(new HomePageView());
    },
    putGuruScheduleView: function () {
        var SchedulePageView    = require('../views/guruSchedule'),
            App                 = require('../main');

        App.content.show(new SchedulePageView());
    },
    putGuruCourseView: function () {
        var CoursesPageView    = require('../views/guruCourses'),
            App                 = require('../main');

        App.content.show(new CoursesPageView());

    }
};