const mongoose = require("mongoose");
const { Schema } = mongoose;

const testimonialSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Student image is required"],
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Testimonial message is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);