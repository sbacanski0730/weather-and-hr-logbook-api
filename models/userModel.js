import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    minLength: [6, 'Email has to be at least 6 characters long'],
    maxLength: [30, "Email can't be longer than 30 character"],
  },
  password: {
    type: String,
    required: [true, 'Password is needed'],
    minLength: [5, 'Password has to be at least 6 characters long'],
    maxLength: [60, "Password can't be longer than 30 character"],
  },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
