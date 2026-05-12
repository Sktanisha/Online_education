const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    totalCourses: {
        type: String,
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

module.exports = mongoose.model("Categories", categorySchema);