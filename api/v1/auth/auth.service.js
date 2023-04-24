'use strict';
var jwt = require('jsonwebtoken');
const CredentialsAuthStrategy = require('./passport-local');
const JwtAuth = require('./passport-jwt');
const ResponseManager = require('../response/response-manager');
const UserModel = require('../models/user.model').UserModel;
const ROLES = require('../models/user.model').ROLES;

let _this;

class AuthManager {
   
   constructor() {
        _this = this;
        _this._passport = require('passport');
        _this._passport.use(CredentialsAuthStrategy);
        _this._passport.use(JwtAuth);
   }

   login(req, res, next) {

        _this._passport.authenticate('local-auth', function (err, user, info) {
        var error = err || info;
        if (error)
        return ResponseManager.respondWithError(res, 200, error);

        if (!user) {

          return ResponseManager.respondWithError(res, 200, "Invalid credentials");
        }
        if(!req.body.role && user.role == ROLES.ADMIN){
        
             return ResponseManager.respondWithError(res, 200, "Invalid credensdfgdftials");
        }
        if(user.blocked === true){
           return ResponseManager.respondWithError(res, 200, "Your account is blocked.");
        }
        user.isLoggedIn = true;
        user.save(function(err){
           
           if(err){
              return ResponseManager.respondWithError(res, 200, "Something went wrong.");
           }
           console.log(user,"user");
            var token = _this.signToken({ _id: user._id, email: user.email, role:user.role});
            return ResponseManager.respondWithSuccess(res, 200, "", {access_token: token, email:user.email});
            
        });
        
      })(req, res, next)
   }

    guestLogin(req, res, next) {
        let reqbody = req.body;
        if(!reqbody.country){
            return ResponseManager.respondWithError(res, 200, "Country was not provided");
        }else{
            // var token = _this.signToken({ _id: null, email: 'guest@mybeautysquad.com', role:'guest', country:reqbody.country});
            let token = ""
            return ResponseManager.respondWithSuccess(res, 200, "", {access_token: token});
        }
    }

   logout(req, res, next) {
        let user = req.user;
        user.isLoggedIn = false;
        let response_ = {
          "socialMediaPlatform" : user.socialMediaPlatform
        };
        user.save(function(err){
           console.log(err);
           if(err){
              return ResponseManager.respondWithError(res, 200, "Something went wrong.");
           }
            return ResponseManager.respondWithSuccess(res, 200, "Successfully logged out", response_);
        });
   }

   isAuthenticated(req, res, next) {
        _this._passport.authenticate('jwt-auth', {session:false})(req, res, next)
   }
   
   setHeaderReq(req, res, next){ 
      req.headers['authorization'] = 'Bearer '+req.params.token;
      return next();
   }

   isAdmin(req, res, next) { 
       if (req.user.role == ROLES.ADMIN) {
           return next();
       }
       return ResponseManager.respondWithError(res, 401, "Unauthorized");
   }

   isCustomer(req, res, next) {
       if (req.user.role === ROLES.PUBLIC || req.user.role === 'guest') {
           return next();
       }
       return ResponseManager.respondWithError(res, 401, "Unauthorized");
   }

   signToken(obj) {
    console.log(obj,"objs");
     return jwt.sign(obj, "PjH7XCkNlI8mhvm747gMnz3AisIMjHzUCa3TJAJ4lWDe6duxKkKY0gFklCFi4i1wh7BU2iYpxmKOGwJqwmWKR6Idsx5w5yGpq2Ea0By8JvNi7TSGf04szRBrhaumVQSd");
   }
  
}

exports = module.exports = new AuthManager();