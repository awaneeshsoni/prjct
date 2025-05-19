import mongoose, { mongo, Mongoose } from "mongoose";

const pageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, maxLength: 200 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
    allowAnonymousMessages: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
)

export default mongoose.model('Page', pageSchema)
