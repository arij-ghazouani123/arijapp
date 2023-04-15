import mongoose from "mongoose";

const { Schema, model } = mongoose;
const contributorSchema = new Schema(
  {
    role: {
      type: String,
      required: false,
      enum: ['Developer', 'Tester', 'Maintainer'],
      default: 'Maintainer'

    },

    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    }],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }

  });

export default model("contributor", contributorSchema);