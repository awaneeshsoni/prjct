import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Optional fields for analytics/moderation
  ip: { type: String },
  userAgent: { type: String },
  status: {
    type: String,
    enum: ["approved", "pending", "flagged"],
    default: "approved"
  }
}, {
  timestamps: true
});

export default mongoose.model("Message", messageSchema);
