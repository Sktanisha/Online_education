const testimonialsModel = require("../model/testimonials.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");
const path = require("path");

exports.addTestimonialsController = asyncHandler(async (req, res) => {
    const { name, message, rating } = req.body;

    const testimonial = new testimonialsModel({
        image: `${process.env.SERVER_URL}/${req.file.filename}`,
        name,
        message,
        rating,
    });

    await testimonial.save();

    apiResponse(res, 201, "Testimonial created successfully", testimonial);
});

exports.deleteTestimonialsController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await testimonialsModel.findByIdAndDelete(id);

    if (!testimonial) {
        return apiResponse(res, 404, "Testimonial not found");
    }

    const folderPath = path.join(__dirname, "../uploads");
    const fileName = testimonial.image.split("/").pop();

    fs.unlink(`${folderPath}/${fileName}`, (err) => {
        if (err) {
            return apiResponse(res, 500, err.message || "Image delete failed");
        }

        apiResponse(res, 200, "Testimonial deleted successfully", testimonial);
    });
});

exports.getAllTestimonialsController = asyncHandler(async (req, res) => {
    const testimonials = await testimonialsModel
        .find({})
        .select("image name message rating isActive createdAt");

    apiResponse(res, 200, "All testimonials", testimonials);
});