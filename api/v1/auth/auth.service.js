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
        if(req.body.q && req.body.q == 'admin' && user.role !== ROLES.ADMIN){
             return ResponseManager.respondWithError(res, 200, "Invalid credentdsfdfgsdfgials");
        }
        if(!req.body.role &&  user.role !== ROLES.ADMIN){
          console.log(user,'ROLES.ADMIN',"error");

             return ResponseManager.respondWithError(res, 200, "Invalid credentials");
        }
        if(user.blocked === true){
           return ResponseManager.respondWithError(res, 200, "Your account is blocked.");
        }
        user.isLoggedIn = true;
      
        user.save(function(err){
           console.log(err);
           if(err){
              return ResponseManager.respondWithError(res, 200, "Something went wrong.");
           }
            var token = _this.signToken({ _id: user._id, email: user.email, role:user.role});
            return ResponseManager.respondWithSuccess(res, 200, "", {access_token: token});
            
        });
        
      })(req, res, next)
   }

    guestLogin(req, res, next) {
        let reqbody = req.body;
        if(!reqbody.country){
            return ResponseManager.respondWithError(res, 200, "Country was not provided");
        }else{
            var token = _this.signToken({ _id: null, email: 'guest@mybeautysquad.com', role:'guest', country:reqbody.country});
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
     return jwt.sign(obj, app.get('config').jwtSecret, { expiresIn: app.get('config').TOKEN_EXPIRY_TIME });
   }
  
}

exports = module.exports = new AuthManager();