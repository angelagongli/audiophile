const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    track: { type: Schema.Types.ObjectId, ref: "Track", required: true },
    maker: { type: Schema.Types.ObjectId, ref: "User", required: true },
    joiner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    metadata: { type: String }
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
