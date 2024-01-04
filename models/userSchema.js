const mongoose = require('../db/db');
const LocationSchema = require('./locationSchema');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true],
        minlength:[3,'Minimum length of first name must be 3 characters'],
        maxlength:[20,"First name length can't be more than 20 characters"]
    },
    last_name:{
        type:String,
        required:[true],
        minlength:[3,'Minimum length of last name must be 3 characters'],
        maxlength:[20,"Last name length can't be more than 20 characters"]
    },
    email:{
        type: String,
        required: [true, 'Email is required.'],
        unique : true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address.'],
    },
    phone:{
        type: String,
        required: [true, 'Phone number is required.'],
        match: [/^\d{10}$/, 'Please fill a valid phone number.'],
    },
    password:{
        type: String,
        required: [true, 'Password is required.'],
    },
    address: LocationSchema,
});

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    
    return userObject
  }
  
  UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });
  
  UserSchema.methods.checkPassword = async function(password) {
    const passwordHash = this.password;
    return bcrypt.compare(password, passwordHash);
  }

module.exports = mongoose.model('User', UserSchema);
