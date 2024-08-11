import mongoose, { Schema } from "mongoose";

const WorkShopSchema = new Schema({
    WorkShopName: {
        type : String ,
        required : true
    } ,
    FromClosing : {
        type : Date ,
        required : true
    }
})

export const WorkShop = mongoose.model("WorkShop" , WorkShopSchema) ;