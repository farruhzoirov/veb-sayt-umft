const Specialty = require("../../models/specialty/specialty.model");
const SpecialtyTranslate = require("../../models/translate/specialty.model");
const Language = require("../../models/settings/language.model");
const mongoose = require("mongoose");
const BaseError = require("../../errors/base.error");
const {Model} = require("../../common/constants/models.constants");

class ProgramsService {
    constructor() {
        this.Model = Model
    }
    async filterAndGetPrograms(req) {
        const defaultLanguage = await Language.findOne({isDefault: true});
        const payload = {
            format: req.body.format || '',
            degree: req.body.degree || '',
            department: req.body.department || '',
            language: req.query.language || defaultLanguage.slug
        }

        let programsData;
        // Validate ObjectId parameters

        const invalidId =
            (payload.department && !mongoose.Types.ObjectId.isValid(payload.department)) ||
            (payload.degree && !mongoose.Types.ObjectId.isValid(payload.degree)) ||
            (payload.format && !mongoose.Types.ObjectId.isValid(payload.format));

        if (invalidId) {
            throw BaseError.BadRequest("One of these IDs is not valid");
        }

        const query = {};
        if (payload.department) query.department = payload.department;
        if (payload.degree) query.degree = payload.degree;
        if (payload.format) query["prices.format"] = payload.format;

        programsData = await Specialty.find(query);

        const oneDynamicModelTranslate = await SpecialtyTranslate.findOne({
            [this.Model.specialty.ref]: findDynamicModelBySlug._id,
            [this.Model.language.ref]: findLanguageBySlug._id
        }).select(queryParameters.select ? queryParameters.select : `-specialty -__v -language`).lean();

        return {...programsData, ...oneDynamicModelTranslate || {}};
    }
}