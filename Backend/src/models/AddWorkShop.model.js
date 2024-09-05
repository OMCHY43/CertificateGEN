import mongoose, { Schema } from "mongoose";

const WorkShopSchema = new Schema({
    WorkShopName: {
        type: String,
        required: true
    },
    FromClosing: {
        type: Date,
        required: true
    },
    Category: {
        type : String,
        required : true
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    }
})

export const WorkShop = mongoose.model("WorkShop", WorkShopSchema);