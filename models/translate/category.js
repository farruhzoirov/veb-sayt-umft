const { Schema, model } = require("mongoose")

const CategoryTranslateSchema = new Schema({
    title: {
        type: String,
        required: [true, "The CategoryName field must not be empty."]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    },
    language: {
        type: Schema.Types.ObjectId,
        ref: 'language',
        default: null,
    },
    status: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

module.exports = model("categoryTranslate", CategoryTranslateSchema);
