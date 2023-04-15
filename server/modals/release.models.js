import mongoose from "mongoose";
const {Schema , model} = mongoose;

const ReleaseSchema = new Schema({
    Notes: String,
    Testeur: String,
    Version  :  Number,
    Date: String,
    image:  String,
    apkFile: String,
    lien: String
   
}, {timestamps: true})




export default model ('release', ReleaseSchema)
