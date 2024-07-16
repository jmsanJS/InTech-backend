const mongoose = require("mongoose");
const { capitalize } = require("../modules/capitalize");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Missing or empty fields"],
      minLength: [2, "This field must have 2 to 50 characters"],
      maxLength: [50, "This field must have 2 to 50 characters"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Missing or empty fields"],
      minLength: [2, "This field must have 2 to 50 characters"],
      maxLength: [50, "This field must have 2 to 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "This email is already registered"],
      required: [true, "Missing or empty fields"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Missing or empty fields"],
    },
    token: String,
    canBookmark: Boolean,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.firstname) {
    this.firstname = capitalize(this.firstname);
  }
  if (this.lastname) {
    this.lastname = capitalize(this.lastname);
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
