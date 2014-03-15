var path           = require('path')
    , templatesDir   = path.resolve(__dirname, '../..', 'templates')
    , emailTemplates = require('email-templates')
    , nodemailer     = require('nodemailer');

module.exports = {
    emailWelcomingGuru: function(email, cb) {
        var user = email.user,
            subject = email.subject;

        emailTemplates(templatesDir, function(err, template) {
            if (err) {
                cb(err);

            } else {
                var transport = nodemailer.createTransport("SMTP", {
                    service: "Gmail",
                    auth: {
                        user: "aakash@guitarwith.guru",
                        pass: "t1mguitarwithgurupasswd"
                    }
                });

                var locals = {
                    email: user.email,
                    guru_name: user.name,
                    image_root: 'http://cdn.guitarwith.guru/emails/welcome_guru/images',
                    image_bust: '?v=' + new Date().getTime()
                };

                template('welcome_guru', locals, function(err, html, text) {
                    if (err) {
                        cb(err);

                    } else {
                        transport.sendMail({
                            from: 'Guitar with Guru <aakash@guitarwith.guru>',
                            to: locals.email,
                            bcc: ['founders@guitarwith.guru'],
                            subject: subject,
                            html: html,
                            generateTextFromHTML: true,
                            text: text,
                            forceEmbeddedImages: true
                        }, cb);
                    }
                });
            }
        });
    }
};