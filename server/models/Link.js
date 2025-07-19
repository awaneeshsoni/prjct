import  mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  clicks: { type: Number, default: 0 },
  clickLogs: [
    {
      timestamp: { type: Date, default: Date.now },
      ip: String,
      userAgent: String,
    },
  ],
}, {
  timestamps: true
});


export default mongoose.model('Link', linkSchema)