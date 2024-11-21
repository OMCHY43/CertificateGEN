import mongoose, { Schema } from "mongoose";

const WorkShopSchema = new Schema({
    WorkShopName: {
        type: String,
        required: true
    },
    EventDate : {
        type : Date , 
        required : true ,
    } ,
    EventEndDate : {
        type : Date , 
        required : true ,
    } ,
    FromClosing: {
        type: Date,
        required: true
    },
    OnOffStatus: {
        type : String ,
        enm : ["On" , "Off"] ,
        default : "On"
    } ,
    Type :{
        type : String ,
        required : true
    } ,
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