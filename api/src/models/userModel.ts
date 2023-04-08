import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as validator from "validator";

const Schema = mongoose.Schema;

interface User {
  _id: string;
  email: string;
  password: string;
}

interface UserModel extends Model<User> {
  signup(email: string, password: string): any;
  login(email: string, password: string): any;
}

export const userSchema = new Schema<User, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static SIGNUP method
userSchema.static("signup", async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  if (!validator.default.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  if (!validator.default.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already used.");
  }

  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
});

// Static LOGIN method
userSchema.static("login", async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not found.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password incorrect.");
  }

  return user;
});

export const User = mongoose.model<User, UserModel>("User", userSchema);
