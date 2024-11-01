const Joi = require('joi');

const universitySchema = Joi.object({
    modelId: Joi.string().optional(),
    status: Joi.number().optional(),
    translate: Joi.object({
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
});


const categorySchema = Joi.object({
    modelId: Joi.string().optional(),
    slug: Joi.string().optional(),
    status: Joi.number().optional(),
    translate: Joi.object({
        title: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
});


const degreesSchema = Joi.object({
    modelId: Joi.string().optional(),
    status: Joi.number().optional(),
    translate: Joi.object({
        name: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
});


const directionSchema = Joi.object({
    modelId: Joi.string().optional(),
    code: Joi.number().required(),
    views: Joi.number().optional(),
    faculty: Joi.string().required(),
    degree: Joi.string().required(),
    format: Joi.string().required(),
    translate: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
        duration: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
});


const eventsCategorySchema = Joi.object({
    modelId: Joi.string().optional(),
    translate: Joi.object({
        name: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})

const eventsSchema = Joi.object({
    modelId: Joi.string().optional(),
    time: Joi.string().required(),
    eventsCategory: Joi.string().required(),
    translate: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})



const facultySchema = Joi.object({
    modelId: Joi.string().optional(),
    status: Joi.number().optional(),
    translate: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const formatsSchema = Joi.object({
    modelId: Joi.string().optional(),
    status: Joi.number().optional(),
    translate: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})

const levelSchema = Joi.object({
    modelId: Joi.string().optional(),
    translate: Joi.object({
        name: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const newsSchema = Joi.object({
    modelId: Joi.string().optional(),
    views: Joi.number().optional(),
    slug: Joi.string().required(),
    status: Joi.number().optional(),
    translate: Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const partnersSchema = Joi.object({
    modelId: Joi.string().optional(),
    status: Joi.number().optional(),
    translate: Joi.object({
        name: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const specialistsInfoSchema = Joi.object({
    modelId: Joi.string().optional(),
    user: Joi.string().required(),
    translate: Joi.object({
        completed_university: Joi.string().required(),
        study_duration: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const topicsSchema = Joi.object({
    modelId: Joi.string().optional(),
    user: Joi.string().required(),
    direction: Joi.string().required(),
    level: Joi.string().required(),
    translate: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const pagesSchema = Joi.object({
    modelId: Joi.string().optional(),
    slug: Joi.string().required(),
    status: Joi.number().optional(),
    translate: Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
        description: Joi.string().required(),
        language: Joi.string().required(),
    }).required()
})


const languagesSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().optional(),
    isDefault: Joi.boolean().required(),
    status: Joi.number().optional(),
})

module.exports = {
    category: categorySchema,
    university: universitySchema,
    degree: degreesSchema,
    direction: directionSchema,
    events: eventsSchema,
    eventsCategory: eventsCategorySchema,
    faculty: facultySchema,
    format: formatsSchema,
    level: levelSchema,
    news: newsSchema,
    partners: partnersSchema,
    specialistInfo: specialistsInfoSchema,
    topics: topicsSchema,
    page: pagesSchema,
    language: languagesSchema,
};

