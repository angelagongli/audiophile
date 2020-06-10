const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    time: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
