const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    // match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // validate: [({ length }) => length >= 6, "Password minimum of 6 characters"],
  },
  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});

// userSchema.methods = {
//   checkPassword: function (inputPassword) {
//     return bcrypt.compareSync(inputPassword, this.local.password);
//   },
//   hashPassword: (plainTextPassword) => {
//     return bcrypt.hashSync(plainTextPassword, 10);
//   },
// };
const User = mongoose.model("User", userSchema);

module.exports = User;
