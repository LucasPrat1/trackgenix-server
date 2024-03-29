import mongoose from 'mongoose';

const { Schema } = mongoose;

const project = new Schema({
  project_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  finish_date: { type: Date, required: false },
  client: { type: String, required: true },
  active: { type: Boolean, required: true },
  employees: [{
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'employee',
    },
    role: {
      type: String,
      required: true,
      enum: ['DEV', 'PM', 'QA', 'TL'],
    },
    rate: { type: Number, required: true },
  }],
});

export default mongoose.model('Project', project);
