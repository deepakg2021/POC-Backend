'use strict';
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const UserModel = require('../models/user.model').UserModel;

class JwtAuthStrategy extends JwtStrategy {
    constructor() {
        super(JwtAuthStrategy.jwtOptions(), JwtAuthStrategy.handleJwtAuth);
    }

    get name() {
        return 'jwt-auth';
    }

    static handleJwtAuth(jwt_payload, done) {
        if(jwt_payload.role == 'guest') {
           let user = {};
               user._id = null;
               user.info = {};
               user.info.country = jwt_payload.country;
               user.role = 'guest';
               return done(null, user); 
        } else{
            UserModel.findOne({_id: jwt_payload._id}, function (err, user) {
                if (err) return done(err);
                if (!user) {
                  return done(null, false);
                }
                return done(null, user);
           }); 
        }
    }

    static jwtOptions() {
        return {
            session: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "PjH7XCkNlI8mhvm747gMnz3AisIMjHzUCa3TJAJ4lWDe6duxKkKY0gFklCFi4i1wh7BU2iYpxmKOGwJqwmWKR6Idsx5w5yGpq2Ea0By8JvNi7TSGf04szRBrhaumVQSd",
            //issuer:'accounts.examplesoft.com',
            //audience: 'yoursite.net'
        };
    }

}
exports = module.exports = new JwtAuthStrategy();