const mongoose = require("mongoose");
const { Schema } = mongoose;

const coursesSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    totalStudent: {
        type: String,
        default:true,
    },
    price:{
        type:String,
        required:[true,"price is required"],
    },
    duration:{
        type:Date,
        default:true,
    },
    image:{
        type:String,
        required: [true, "banner is required"],
    },


},
    {
        versionKey: false,
        timestamps: true,
    },
);

module.exports = mongoose.model("Courses", coursesSchema);