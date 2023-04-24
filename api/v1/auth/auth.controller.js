'use strict';

const UserModel = require('../models/user.model').UserModel;
const ResponseManager = require('../response/response-manager');
const AuthManager = require('./auth.service');
const crypto = require('crypto');
// const Mailer = require('../../../services/mail.service');
var async = require('async');

class AuthController {
  static login(req, res, next) {
       return AuthManager.login(req, res, next);
   }
   static guestLogin(req, res, next) {
       return AuthManager.guestLogin(req, res, next);
   }
   static logout(req, res, next) {
       return AuthManager.logout(req, res, next);
   }

   static makePassword() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
   }

  // static passwordResetRequest(req, res, next) { console.log(req.headers);
  //      async.waterfall([
  //         function(done) {
  //           crypto.randomBytes(20, function(err, buf) {
  //             var token = buf.toString('hex');
  //             done(err, token);
  //           });
  //         },
  //         function(token, done) {
  //           UserModel.findOne({ email: req.body.email }, function(err, user) {
  //             if (!user) {
  //               return ResponseManager.respondWithError(res, 200, "This email is not registered");
  //             }

  //             user.resetPasswordToken = token;
  //             user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  //             user.save(function(err) {
  //               done(err, token, user);
  //             });
  //           });
  //         },
  //         function(token, user, done) {
  //           let url = app.get('config').siteurl+ '/auth/reset-password/' + token;
  //           let html = `<!DOCTYPE html>
  //                               <html>
  //                               <head>
  //                               </head>

  //                               <body style="font-family: Arial; font-size: 12px;">
  //                               <div>
  //                                   <p>
  //                                       You have requested a password reset, please follow the link below to reset your password.
  //                                   </p>
                                  

  //                                   <p>
  //                                       <a href="`+url+`">
  //                                           Follow this link to reset your password.
  //                                       </a>
  //                                   </p>
  //                                   <p>If can not see the link then paste the below url in browser.<br>`+url+`<br><br></p>
  //                                   <br>
  //                                     <p>
  //                                       Please ignore this email if you did not request a password change.
  //                                   </p>
  //                                   <br>
  //                                   <p>Best Wishes, <br/>Team My NodeJS Project</p>
  //                               </div>
  //                               </body>
  //                               </html>`;
  //           Mailer.sendMail(user.email, 'Reset your password on My Project', html, function(err, info){
  //             //console.log(info);
  //             done(err, 'done');
  //           });

  //           return ResponseManager.respondWithSuccess(res, 200, 'An e-mail has been sent to ' + user.email + ' with further instructions.', {});
  //         }
  //       ], function(err) {
  //               if ( err ) {
  //                   console.log(err);
  //               } else {
  //                   console.log('Message sent');
  //               }
  //       });

  // }

  // static resetPassword(req, res, next){
  //     async.waterfall([
  //       function(done) {
  //         UserModel.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
  //           if (!user) {
  //             return ResponseManager.respondWithError(res, 200, "Password reset token is invalid or has expired.");
  //           }

  //           user.password = req.body.password;
  //           user.resetPasswordToken = undefined;
  //           user.resetPasswordExpires = undefined;

  //           user.save(function(err) {
  //             done(err);
  //           });
  //         });
  //       }
  //     ], function(err) {
  //         if ( err ) {
  //           return ResponseManager.respondWithError(res, 200, "An error was encountered.");
  //         } else {
  //           return ResponseManager.respondWithSuccess(res, 200, 'Your password has been changed.', {});
  //         }
  //     });

  // }

  // static verifyEmail(req, res, next){ 
  //         let obj = new Date(Date.now()); console.log(obj.toISOString()); console.log(Date.now());
     
  //         UserModel.findOne({ emailVerificationToken: req.params.token}, function(err, user) {
  //             console.log(user);
  //             if (!user) {
  //                 return res.render('verify_email.html', { success: false });
  //             }
  //             else{
  //                 user.emailVerificationToken = null;
  //                 user.emailVerificationExpires = null;
  //                 user.status = 1;
  //                 user.save(function(err) {
  //                    return res.render('verify_email.html', { success: true });
  //                 });
  //             }
              
  //         });
        
  // }

  // static changePassword(req, res, next){
  //     async.waterfall([
  //       function(done) {
  //         UserModel.findOne({ _id: req.user._id}, function(err, user) {
  //           if (!user) {
  //             return ResponseManager.respondWithError(res, 200, "User not found");
  //           }

  //           if (!user.checkPassword(req.body.current_password)) {
  //               return ResponseManager.respondWithError(res, 200, "Your current password is incorrect");
  //           }
  //           //set new password
  //           user.password = req.body.new_password;
           
  //           user.save(function(err) {
  //             done(err);
  //           });
  //         });
  //       }
  //     ], function(err) {
  //         if ( err ) {
  //           return ResponseManager.respondWithError(res, 200, "An error was encountered.");
  //         } else {
  //           return ResponseManager.respondWithSuccess(res, 200, 'Your password has been changed.', {});
  //         }
  //     });
  // }
  
}
exports = module.exports = AuthController;