const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
 
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
