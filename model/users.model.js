const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already in used "],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
        minLength: [6, "Password must be at least 6 Characters"],

    }, role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
        trim: true,
    },
    otp: {
        type: String,
    },
    otpexpire: {
        type: Date,
    },
    forgetPasswordotp: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },

},
    {
        versionKey: false,
        timestamps: true,
    },
);

module.exports = mongoose.model("User", userSchema);