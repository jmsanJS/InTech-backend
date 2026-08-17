import mongoose, { Document } from "mongoose";
import { capitalize } from "../modules/capitalize";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  token?: string;
  canBookmark?: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
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
      unique: true,
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

userSchema.pre<IUser>("save", function (next) {
  if (this.firstname) {
    this.firstname = capitalize(this.firstname);
  }
  if (this.lastname) {
    this.lastname = capitalize(this.lastname);
  }
  next();
});

const User = mongoose.model<IUser>("users", userSchema);

export default User;
