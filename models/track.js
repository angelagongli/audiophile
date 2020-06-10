const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    videoID: { type: String, required: true },
    title: { type: String, required: true },
    channel: { type: String, required: true },
    published: { type: String },
    description: { type: String },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    started: { type: Boolean, default: false }
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
