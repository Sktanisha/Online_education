const categoryModel = require("../model/categories.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");
const path = require("path");

exports.addCategoryController = asyncHandler(async (req, res) => {
    const { categoryPicture } = req.file;
    const { name,totalCourses } = req.body;
    const category = new categoryModel({
        image: `${process.env.SERVER_URL}/${categoryPicture}`,
        name,
        totalCourses,
    });
    await category.save();
    apiResponse(res, 201, "category created successfully", category);
});

exports.deleteCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findcategory = await categoryModel.findOneAndDelete({ _id: id });

    if (findcategory) {
        const folderpath = path.join(__dirname, "../uploads");
        let filepath = findcategory.image.split("/").pop();
        fs.unlink(`${folderpath}/${filepath}`, (err) => {
            if (err) {
                apiResponse(res, 500, err.message || "something went wrong");
            } else {

                apiResponse(res, 400, "category deleted");
            }
        });
    } else {
        apiResponse(res, 400, "category not found");
    }

});

exports.getAllCategoryController = asyncHandler(async (req, res) => {
    const categories = await categoryModel.find({}).select("image name,totalCourses");

    apiResponse(res, 200, "All categories",categories);
});
