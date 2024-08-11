import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema({
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
  Workshop: {
    type: String,
    required: true,
    trim: true,
  },
  RequestDate :{
    type : Date
  },
  CertificatesStatus: {
    type: String,
    enum: ["approved", "denied", "pending"],
    default: "pending",
  },
});

export const FormData = mongoose.model("FormData", FormSchema);
