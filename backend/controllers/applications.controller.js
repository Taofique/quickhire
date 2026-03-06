import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const submitApplication = async (req, res) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    if (!job_id || !name || !email || !resume_link || !cover_note) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    try {
      new URL(resume_link);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Resume link must be a valid URL",
      });
    }

    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({ job_id, email });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = new Application({
      job_id,
      name,
      email,
      resume_link,
      cover_note,
    });

    await application.save();

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job_id: req.params.job_id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
