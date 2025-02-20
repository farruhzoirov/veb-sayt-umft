const {Schema} = require('mongoose')
const mongoose = require("mongoose");

const PricesSchema = new Schema({
  price: {
    type: String,
    required: true
  },
  format: {
    type: Schema.Types.ObjectId,
    ref: 'format',
  },
  duration: {
    type: String,
    required: true
  }
})


// const DurationSchema = new Schema({
//     format: {
//         type: Schema.Types.ObjectId,
//         ref: 'format'
//     },
//     year: {
//         type: Number,
//         required: true
//     }
// })


const SpecialtySchema = new Schema({
  img: [],
  hemisId: {
    type: Number,
  },
  code: {
    type: String,
  },
  degree: {
    type: Schema.Types.ObjectId,
    ref: 'degree',
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'department',
    required: true,
  },
  prices: [PricesSchema],
  active: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
  },
  monthlyViews: {
    type: Object,
    default: {}
  },
  status: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  }
})

module.exports = mongoose.model('specialty', SpecialtySchema);