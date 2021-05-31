import mongoose from "mongoose";

export interface OtpDocument extends mongoose.Document {
  phoneNumber: string;
  otp: string;
  expiry: number;
}

const PostSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, },
    otp: { type: String, required: true, },
    expiry: { type: Number, required: true, }
  },
  { timestamps: true }
);

const Otp = mongoose.model<OtpDocument>("Otp", PostSchema);

export default Otp;