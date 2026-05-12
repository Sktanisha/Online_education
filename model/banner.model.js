const { Schema, default: mongoose } = require("mongoose");

const bannerSchema = new Schema({
    image:{
        type:String,
        required: [true, "banner is required"],
    },
    isActive:{
        type:Boolean,
        default: true,
    },
    heading:{
        type:String,
        default:true,
    },
    title:{
        type:String,
        required: [true, "title is required"],
    },
    comments:{
        type:String,
        default:true,
    },
    ratings:{
        type:String,
        default:true,
    }
},{
    timestamps:true,
    versionKey: false,
},
);

module.exports = mongoose.model("Banner", bannerSchema) ;