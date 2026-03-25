import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 100,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 1000,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);
export const Post = mongoose.model("Post", postSchema);