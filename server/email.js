var path           = require('path')
    , templatesDir   = path.resolve(__dirname, '..', 'templates')
    , emailTemplates = require('email-templates')
    , nodemailer     = require('nodemailer');

emailTemplates(templatesDir, function(err, template) {

    if (err) {
        console.log(err);
    } else {

        // ## Send a single email

        // Prepare nodemailer transport object
        var transport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "aakash@guitarwith.guru",
                pass: "t1mguitarwithgurupasswd"
            }
        });

        // An example users object with formatted email function
        var locals = {
            email: 'aakash.lpin@gmail.com',
            guru_name: 'Aakash Goel',
            image_root: 'http://guitarwith.guru/emails/welcome_guru/images',
            image_bust: '?v=' + new Date().getTime()
        };

        // Send a single email
        template('welcome_guru', locals, function(err, html, text) {
            if (err) {
                console.log(err);
            } else {
                transport.sendMail({
                    from: 'Guitar with Guru <aakash@guitarwith.guru>',
                    to: locals.email,
                    subject: 'Testing email 2!',
                    html: html,
                    generateTextFromHTML: true,
                    text: text
                }, function(err, responseStatus) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(responseStatus.message);
                    }
                });
            }
        });
    }
});

