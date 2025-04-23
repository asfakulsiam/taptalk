import mongoose, { Schema, Document, model, models } from "mongoose";
import { UserDocument } from "@/types/user";

const userSchema = new Schema<UserDocument>(
  {
    clerkUserId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    username: { type: String, required: true },
    profileImageUrl: { type: String },
  },
  { timestamps: true }
);

if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = model<UserDocument>("User", userSchema);
export default User;
