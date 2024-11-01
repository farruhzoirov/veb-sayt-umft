const mongoose = require("mongoose");
const {Schema} = require("mongoose");

// Is it bachelor or master
const DegreeTranslateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    degree: {
        type: Schema.Types.ObjectId,
        ref: "degree",
    },
    language : {
        type: Schema.Types.ObjectId,
        ref: "language",
        required: true,
    }
});

module.exports = mongoose.model("degreeTranslate", DegreeTranslateSchema);

