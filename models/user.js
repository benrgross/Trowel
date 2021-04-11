const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 10;

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

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
