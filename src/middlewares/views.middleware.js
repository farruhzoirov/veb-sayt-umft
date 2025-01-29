const {Model} = require("../common/constants/models.constants");
const Logger = require("../models/logger/logger.model");
const {getModelsHelper} = require("../helpers/admin-panel/get-models.helper");

// Models for calculate views
const modelsForCalculatingViews = ['program', Model.news.ref, Model.events.ref];

const incrementViews = async (req, res, next) => {
  try {
    const startTime = new Date();
    const DAY_IN_MS = 60 * 1000;
    const earlier = new Date(startTime.getTime() - DAY_IN_MS);

    // This logic for calculating views. and if createdAt is greater than one day then we can increment again views.
    const checkLogger = await Logger.findOne({
      url: req?.originalUrl,
      userAgent: req?.headers['user-agent'],
      ip: req?.ip,
      createdAt: {$gte: earlier},
    });
    console.log('checkLogger', checkLogger);
    if (!checkLogger) {
      console.log(req.originalUrl);
      const model = modelsForCalculatingViews.find((model) => {
        return req?.originalUrl?.startsWith(`/front/${model}`);
      })
      console.log('model', model);
      if (model && req.params?.slug) {
        console.log('inside of if')
        const modelToUpdate = getModelsHelper(model);
        await Promise.all([
          modelToUpdate.findOneAndUpdate(
              {slug: req.params.slug},
              {$inc: {views: 1}},
              {new: true}
          ),
          Logger.create({
            method: req?.method,
            url: req?.originalUrl,
            userAgent: req?.headers["user-agent"],
            ip: req?.ip,
            statusCode: res.statusCode,
            responseTime: Date.now() - startTime,
            body: res?.body,
          })
        ]);
      }
    }
    next()
  } catch (error) {
    next(error);
  }
}

module.exports = {
  incrementViews,
}