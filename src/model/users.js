const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema
const bcrypt = require( 'bcrypt' )

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.methods.generateHash = function( password ) {
  return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null )
}

UserSchema.methods.validPassword = function( password ) {
  return bcrypt.compareSync( password, this.password )
}

module.exports = mongoose.model( 'User', UserSchema )