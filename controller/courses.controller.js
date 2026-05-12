const courseModel = require("../model/courses.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");
const path = require("path");

exports.addCoursesController = asyncHandler(async (req, res) => {
    const { coursePicture } = req.file;
    const { name,totalStudent,price,duration } = req.body;
    const banner = new courseModel({
        image: `${process.env.SERVER_URL}/${coursePicture}`,
        name,
        totalStudent,
        price,
        duration
    });
    await courses.save();
    apiResponse(res, 201, "banner created successfully", courses);
});

exports.deleteCourseController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findcourse = await courseModel.findOneAndDelete({ _id: id });

    if (findcourse) {
        const folderpath = path.join(__dirname, "../uploads");
        let filepath = findcourse.image.split("/").pop();
        fs.unlink(`${folderpath}/${filepath}`, (err) => {
            if (err) {
                apiResponse(res, 500, err.message || "something went wrong");
            } else {

                apiResponse(res, 400, "course deleted");
            }
        });
    } else {
        apiResponse(res, 400, "course not found");
    }

});

exports.getAllCoursesController = asyncHandler(async (req, res) => {
    const courses = await courseModel.find({}).select("image name,totalStudent,price,duration");

    apiResponse(res, 200, "All courses",courses);
});
