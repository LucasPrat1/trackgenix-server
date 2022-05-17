import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true },
});

export default mongoose.model('Employee', employeeSchema);
