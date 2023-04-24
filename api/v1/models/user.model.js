'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var dataTables = require('mongoose-datatables');
const crypto = require('crypto');

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type:String, 
        required:true, 
        unique:true
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    blocked: {type: Boolean, default: false},
    status: {type: Number, default:1},
    role: {type:String, required:true, default:'customer'},
    dateCreated: {type: Date, default: Date.now},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerificationToken: {type: String, default:null},
    emailVerificationExpires: {type: Date, default:null},
    company: {type: String, default: null},
    website:{type:String, default:null},
    avatar: {type: String, default: null},
    isLoggedIn:{type:Boolean, default:false},
    isDeleted: {type:Boolean, default:false},
});

UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.__v;
    delete obj.salt;
    return obj
};

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });
UserSchema.virtual('password')
    .set(function (password) {
        this.salt = crypto.randomBytes(32).toString('base64');
        this.hashedPassword = this.encryptPassword(password, this.salt);
    })
    .get(function () {
        return this.hashedPassword;
    });

UserSchema.methods.encryptPassword = function (password, salt) {
    return crypto.createHmac('sha1', salt).update(password.toString()).digest('hex');
};
UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password, this.salt) === this.hashedPassword;
};

UserSchema.pre('save', function(next) {
    if(this.isNew){
      //do stuff
    }
   next();
});

UserSchema.plugin(dataTables);

module.exports.UserModel = mongoose.model('User', UserSchema);

module.exports.ROLES = {
  'ADMIN':'admin',
  'PUBLIC':'public'
};