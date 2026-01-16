const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true
    },
    password: {
    type: String,
    required: true,
    minlength: 6,
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    unique: true,
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;