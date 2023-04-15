import mongoose, { Schema , model} from"mongoose";

const userSchema=new Schema(
  {
    userName:{
      type:String,
      require:true
    },
    email:{
      type:String,
      require:true
    },
    password:{
      type:String
    },
    token:{
      type:String
    },
    ProfilePhoto:{
      type:String
    },
    resetTokens:{
      type:String,
      default:""
    },
  
    OTPReset: {
      type: String,
      default:null
    }
    ,
    Verified: {
      type: Boolean,
      default: true,
    },
  }
);
export default model("user",userSchema);

