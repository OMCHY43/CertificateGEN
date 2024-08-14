import mongoose from 'mongoose';
import { WorkShop } from "../models/AddWorkShop.model.js"; // Ensure correct path

const FormSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  FormClosing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkShop', // Ensure this matches the model name
  },
  Workshop: {
    type: String,
    required: true,
    trim: true,
  },
  CertificatesStatus: {
    type: String,
    enum: ['approved', 'denied', 'pending'],
    default: 'pending',
  },
}, 
{ timestamps: true });

const FormData = mongoose.model('FormData', FormSchema);

export { FormData };
