var CronJob = require('cron').CronJob,
    AdminController = require('./AdminController');

module.exports = {
    initCron: function() {
        var job = new CronJob(new Date(2014, 3, 30, 5, 57, 0, 0), function(){
                //runs once at the specified date.
                AdminController.notifyAllUsersAboutEvent();
            }, function () {
                // This function is executed when the job stops
                console.log('done')
            },
            true /* Start the job right now */
        );
    }

};