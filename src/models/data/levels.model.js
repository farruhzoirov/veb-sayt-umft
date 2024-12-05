const mongoose = require("mongoose");
const {Schema} = require("mongoose");

// Namely course  1, 2, 3, 4
const LevelSchema = new Schema({
    img: [],
    slug: {
        type: String,
        required: [true, 'Slug is required'],
    },
    status: {
        type: Number,
        default: 1
    },

});


module.exports = mongoose.model("level", LevelSchema);

