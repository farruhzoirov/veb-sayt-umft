const getDefaultLanguageHelper = require("../../helpers/frontend/get-default-language.helper");
const {getModelsHelper, getModelsTranslateHelper} = require("../../helpers/admin-panel/get-models.helper");
const Language = require("../../models/settings/language.model");
const BaseError = require("../../errors/base.error");
const {Model, TranslateModel} = require("../../common/constants/models.constants");
const Category = require("../../models/data/category.model");

class NewsService {
  constructor() {
    this.Model = Model
    this.TranslateModel = TranslateModel
  }

  async getNewsForFront(req) {
    const defaultLanguage = await getDefaultLanguageHelper();
    const currentModel = this.Model.news.ref;
    const dynamicModel = getModelsHelper(currentModel);
    let newsList;
    let queryParameters;
    try {
      queryParameters = {
        limit: Math.max(1, parseInt(req.query?.limit, 10) || 30),
        page: Math.max(1, parseInt(req.query?.page, 10) || 1),
        skip: (parseInt(req.query?.limit, 10) || 10) * ((parseInt(req.query.page, 10) || 1) - 1),
        selectFields: req.query?.select || '',
        requestedLanguage: req.query?.language || defaultLanguage.slug,
        category: req.query.category ? JSON.parse(req.query?.category) : null,
      };
    } catch (err) {
      throw BaseError.BadRequest("Error parsing queryParameter");
    }

    const selectedLanguage = await Language.findOne({slug: queryParameters.requestedLanguage}).lean();

    if (!selectedLanguage) {
      throw BaseError.BadRequest("Language doesn't exists which matches to this slug");
    }


    if (queryParameters.category && !Array.isArray(queryParameters.category)) {
      return [];
    }

    let categoryIds = [];
    if (queryParameters.category) {
      const categories = queryParameters.category;
      categoryIds = await Category.find({slug: {$in: categories}}).distinct('_id').lean();
    }
    const filter = {status: 1};

    if (categoryIds.length) {
      filter.category = {$in: categoryIds};
    }

    newsList = await dynamicModel
        .find(filter)
        .sort({_id: -1})
        .limit(queryParameters.limit)
        .skip(queryParameters.skip)
        .select('-monthlyViews -__v')
        .lean()

    if (this.Model[currentModel].translate) {
      const translateModelName = this.TranslateModel[currentModel].ref;
      const dynamicTranslateModel = getModelsTranslateHelper(translateModelName);

      newsList = await Promise.all(
          newsList.map(async modelItem => {
            const translationData = await dynamicTranslateModel.findOne({
              [currentModel]: modelItem._id,
              [this.Model.language.ref]: selectedLanguage._id,
            }).select(`-${currentModel} -__v -language  -updatedAt`).lean();
            return {...modelItem, ...(translationData || {})};
          })
      );
    }
    newsList = newsList.filter((item) => item.title);
    const total = await dynamicModel.countDocuments(filter);
    return {
      data: newsList,
      pagination: {
        total,
        limit: queryParameters.limit,
        page: queryParameters.page,
        pages: Math.ceil(total / queryParameters.limit),
      },
    };
  }
}


module.exports = NewsService;