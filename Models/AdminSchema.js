const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
adminSchema.statics.signup = async function(name , email, password) {

  //validate we have some values or not
  if(!name || !email || !password)
  {
    throw Error('All field must be filled');
  }

  if(!validator.isEmail(email))
  {
    throw Error('Email is not valid');
  }

  if(!validator.isStrongPassword(password))
  {
    throw Error('Use a strong password');
  }

  const exists = await this.findOne({email});
  if(exists){
    throw Error('Email already in use')
  }

  //salt adds some random sting in password before hashing, so that two same password will not have same hash
  //passwordcxonojscdn

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password , salt)

  const admin = await this.create({
    name: name,
    email: email,
    password: hash
  })

  return admin;
}

adminSchema.statics.login = async function(name, email, password){
  if(!name || !email || !password)
  {
    throw Error('All field must be filled');
  }

  if(!validator.isEmail(email))
  {
    throw Error('Email is not valid');
  }

  const admin = await this.findOne({name , email});

  if(!admin)
  {
    throw Error('No such admin');
  }

  const match = await bcrypt.compare(password , admin.password)

  if(!match){
    throw Error('Incorrect password')
  }

  return admin
}

const AdminDetails = mongoose.model("Admin", adminSchema);
module.exports = AdminDetails;
