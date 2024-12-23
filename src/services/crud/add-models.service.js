const mongoose = require("mongoose");
const BaseError = require('../../errors/base.error');
const { Model } = require("../../common/constants/models.constants");
const { getModelsHelper } = require("../../helpers/get-models.helper");
const { addTranslations } = require("../../helpers/translate.helper");
const populateModelData = require("../../helpers/populate.helper");


class AddModelsService {
  constructor() {
    this.Model = Model
  }

  async addModel(modelName, modelData) {
    const dynamicModel = getModelsHelper(modelName);

    let newData;

    if (!modelData.modelId) {
      const isSlugExists = await dynamicModel.findOne({ slug: modelData.slug }).lean();

      if (isSlugExists) {
        throw BaseError.BadRequest('Slug already exists');
      }

      const isLanguageExists = await dynamicModel.find().lean();

      if (modelName.trim() === 'language') {
        if (!isLanguageExists.length) {
          newData = await this.addingModelData(dynamicModel, modelData, true);
          return newData;
        }
        newData = await this.addingModelData(dynamicModel, modelData);
        return newData;
      }

      if (modelName.trim() === 'level') {
        newData = await this.addingModelData(dynamicModel, modelData, true);
        return newData;
      }

      newData = await this.addingModelData(dynamicModel, modelData);
      console.log(newData)

      if (this.Model[modelName].translate) {
        newData.translates = [await addTranslations(modelName, newData._id, modelData.translate)];
      }

      if (this.Model[modelName].populate) {
        // newData = await dynamicModel.find().populate('eventsCategory', 'name slug')
        // newData = await populateModelData(dynamicModel, newData._id, this.Model[modelName].populate);
      }

      return newData;
    }

    if (!mongoose.Types.ObjectId.isValid(modelData.modelId)) {
      throw BaseError.BadRequest('Invalid modelId');
    }

    const existingModel = await dynamicModel.findById(modelData.modelId);

    if (!existingModel) {
      throw BaseError.NotFound("Model doesn't exist");
    }

    newData = existingModel.toObject();

    if (this.Model[modelName].translate) {
      newData.translates = [await addTranslations(modelName, modelData.modelId, modelData.translate)];
    }

    if (this.Model[modelName].populate) {
      newData = await populateModelData(modelName, modelData.modelId, this.Model[modelName].populate);
    }
    return newData;
  }

  async addingModelData(dynamicModel, modelData, isDefault = false) {
    if (modelData.img && !Array.isArray(modelData.img)) {
      if (fs.existSync(modelData.img)) {
        modelData.img = [modelData.img];
      }
      throw BaseError.BadRequest("Image doesn't exist");
    }

    if (modelData.img.length && Array.isArray(modelData.img)) {
      for (const imgPath of modelData.img) {
        if (!fs.existSync(imgPath)) {
          throw BaseError.BadRequest("Image doesn't exist");
        }
      }
    }

    const savedDocument = await new dynamicModel({
      ...modelData,
      ...(typeof isDefault !== 'undefined' && { isDefault }),
      img: modelData.img ? modelData.img : [],
    });
    await savedDocument.save();
    const savedDocumentObject = savedDocument.toObject();
    delete savedDocumentObject.updatedAt;
    delete savedDocumentObject.__v;
    return savedDocumentObject;
  }
}


module.exports = AddModelsService;

