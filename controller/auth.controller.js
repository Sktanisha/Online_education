const userModel = require("../model/users.model");
const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.registrationController = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    const user = new userModel({
        email,
        name,
        password,
    });

    await user.save();

    const createdUser = {
        _id: user._id,
        email: email,
        name: name,
    };

    return apiResponse(res, 201, "User created successfully!", createdUser);
});


exports.loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const finduser = await userModel.findOne({ email });

    if (!finduser) {
        return apiResponse(res, 401, "Invalid credentials");
    }

    const passwordCheck = password === finduser.password;

    if (!passwordCheck) {
        return apiResponse(res, 401, "Invalid credentials");
    }

    const user = {
        _id: finduser._id,
        email: finduser.email,
        name: finduser.name,
    };

    return apiResponse(res, 200, "Login successfully", user);
});