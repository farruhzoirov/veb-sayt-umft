const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const DegreeSchema = new Schema(
    {
      img: [],
      code: {
        type: String,
      },
      slug: {
        type: String,
      },
      status: {
        type: Number,
        default: 1,
      },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("degree", DegreeSchema);
