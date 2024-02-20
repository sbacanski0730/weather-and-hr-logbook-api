import mongoose from 'mongoose';
import ReportModel from './reportModel.js';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    minLength: [6, 'Email has to be at least 6 characters long'],
    maxLength: [128, "Email can't be longer than 30 character"],
    validate: [(val) => val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/), 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is needed'],
    minLength: [5, 'Password has to be at least 6 characters long'],
    maxLength: [128, "Password can't be longer than 30 character"],
  },
  userReports: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: ReportModel,
  },

  verified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
