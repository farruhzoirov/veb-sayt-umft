const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const TopicSchema = new Schema({
    direction: {
        type: Schema.Types.ObjectId,
        ref: "direction",
        required: true,
    },
    level: {
        type: Schema.Types.ObjectId,
        ref: "level",
        required: true,
    }
});


module.exports = mongoose.model("topic", TopicSchema);



