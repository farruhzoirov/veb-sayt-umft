const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const LicenceSchema = new Schema({
    file: [],
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    slug: {
        type: String,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("licence", LicenceSchema);

