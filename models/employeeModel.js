import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: false,
  },
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
export default EmployeeModel;
