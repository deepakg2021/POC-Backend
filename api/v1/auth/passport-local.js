"use strict";
const LocalAuthStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.model").UserModel;

class CredentialsAuthStrategy extends LocalAuthStrategy {
  constructor() {
    super(
      CredentialsAuthStrategy.provideOptions(),
      CredentialsAuthStrategy.handleUserAuth
    );
  }

  get name() {
    return "local-auth";
  }

  static handleUserAuth(email, password, done) {
    UserModel.findOne(
      { email: { $regex: new RegExp(email, "i") } },
      function (err, user) {
        //case insensitive search
        if (err) return done(err);
        if (!user) {
          console.log("user not found");
          return done(null, false, "Invalid credentials");
        }
        if (!user.checkPassword(password)) {
          return done(null, false, "Incorrect password");
        }
        return done(null, user);
      }
    );
  }

  static provideOptions() {
    return {
      usernameField: "email",
      passReqToCallback: false,
      passwordField: "password",
      session: false,
    };
  }
}
exports = module.exports = new CredentialsAuthStrategy();
