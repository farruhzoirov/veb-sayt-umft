const {TranslateModel} = require("../common/constants/models.constants");
const {getModelsTranslateHelper} = require("./get-models.helper");

const BaseError = require('../errors/base.error');

const Language  = require('../models/settings/language.model');


const addTranslations = async (modelName, modelId, translationData) => {
    const forTranslateModel = TranslateModel[modelName]?.ref;
    const dynamicTranslateModel = getModelsTranslateHelper(forTranslateModel);
    const isModelTranslateEmpty = await dynamicTranslateModel.countDocuments();
    let  newTranslationRecord;

    if ( !isModelTranslateEmpty.length && !translationData.language) {
        const defaultLanguage = await Language.findOne({ isDefault: true });
        newTranslationRecord = await new dynamicTranslateModel({
            [modelName]: modelId,
            language: defaultLanguage._id,
            ...translationData,
        }).save()
        return newTranslationRecord.toObject();
    }

    const isExistTranslation = await dynamicTranslateModel.findOne({
        [modelName]: modelId,
        language: translationData.language,
    });

    if (!isExistTranslation) {
        newTranslationRecord = await new dynamicTranslateModel({
            [modelName]: modelId,
            ...translationData,
        }).save();
        return newTranslationRecord.toObject();
    }

    throw BaseError.BadRequest("Translation already exists for this language");
}

const updateTranslations = async (modelName, modelId, translationData) => {
    let updatedData;
    const forTranslateModel = TranslateModel[modelName]?.ref;
    if (!forTranslateModel && !translationData.language) {
        throw BaseError.NotFound("Translation model or language not found");
    }

    const dynamicTranslateModel = getModelsTranslateHelper(forTranslateModel);
    const {language, ...translationFields} = translationData;
    updatedData = await dynamicTranslateModel.findOneAndUpdate(
        {
            model: modelId,
            language: language,
        },
        {
            $set: {
                model: modelId,
                language: language,
                ...translationFields,
            }
        },
        {upsert: true, new: true}
    );
    return updatedData;
}

module.exports = {
    addTranslations,
    updateTranslations,
}