import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, maxLength: 200 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
  allowAnonymousMessages: { type: Boolean, default: false },

  // New Fields
  visits: { type: Number, default: 0 },
  visitLogs: [
    {
      timestamp: { type: Date, default: Date.now },
      ip: String,
      userAgent: String,
    },
  ],
  messageCount: { type: Number, default: 0 },
  messageLogs: [
    {
      timestamp: { type: Date, default: Date.now },
    },
  ],
}, {
  timestamps: true
});

export default mongoose.model('Page', pageSchema)
