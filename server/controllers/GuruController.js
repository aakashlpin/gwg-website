module.exports = {
    getScheduleHandler: function(req, res) {
        res.render('guru_schedule', {user: req.user});
    },
    getCourseHandler: function(req, res) {
        res.render('guru_courses', {user: req.user});
    },
    getBankHandler: function(req, res) {
        res.render('guru_bank', {user: req.user});
    },
    getProfileHandler: function(req, res) {
        res.render('guru_profile', {user: req.user});
    },
    getAppsHandler: function(req, res) {
        res.render('guru_apps', {user: req.user});
    },
    getReservationsHandler: function(req, res) {
        res.render('guru_reservations', {user: req.user});
    }
};