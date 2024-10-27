const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpecialistInfoTranslateSchema = new Schema({
    completed_university_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    specialistInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'specialistInfo',
        required: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('specialistInfoTranslate', SpecialistInfoTranslateSchema);

