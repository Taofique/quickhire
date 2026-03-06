import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    resume_link: {
      type: String,
      required: true,
    },
    cover_note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model("Application", applicationSchema);
