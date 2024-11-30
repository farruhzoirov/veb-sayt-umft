const {TranslateModel} = require("../common/constants/models.constants");
const {getModelsTranslateHelper} = require("./get-models.helper");

const BaseError = require('../errors/base.error');


const addTranslations = async (modelName, modelId, translationData) => {
    const forTranslateModel = TranslateModel[modelName]?.ref;
    if (!forTranslateModel && !translationData.language) {
        throw BaseError.NotFound("Translation model or language not found");
        const dynamicTranslateModel = getModelsTranslateHelper(forTranslateModel);

        const existingTranslation = await dynamicTranslateModel.findOne({
            [modelName]: modelId,
            language: translationData.language,
        });

        if (!existingTranslation) {
            const newTranslation = new dynamicTranslateModel({
                [modelName]: modelId,
                ...translationData,
            });
            return await newTranslation.save();
        }

        throw BaseError.BadRequest("Translation already exists for this language");
    }
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