
import mongoose from "mongoose";
 
const {Schema , model} = mongoose;
const BuildSchema = new mongoose.Schema({
  name_build: {
    type: String,
    required: true,
  },
  lastbuild: {
    type: String,
    required: true,
  },
  buildvariant_config: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isincrementversioncode_config: {
    type: String,
    required: true,
  },
  buildvariant: {
    type: String,
    required: true,
  },
  Bundel: {
    type: String,
    required: true,
  },
  app_apk: {
    type: String,
    required: false
  }
});
export default model("build", BuildSchema);