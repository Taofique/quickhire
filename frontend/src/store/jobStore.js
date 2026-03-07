import { create } from "zustand";

const useJobStore = create((set, get) => ({
  jobs: [],
  jobsLoading: false,
  jobsError: null,

  applications: {},
  submitLoading: false,
  submitError: null,

  fetchJobs: async () => {
    if (get().jobsLoading) return;
    set({ jobsLoading: true, jobsError: null });
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      const jobs = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.jobs)
            ? data.jobs
            : [];

      set({ jobs, jobsLoading: false });
    } catch (err) {
      console.error("fetchJobs error:", err);
      set({ jobsError: err.message, jobsLoading: false, jobs: [] });
    }
  },

  createJob: async (jobData) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error(`Failed to create job: ${res.status}`);
    const data = await res.json();

    const newJob = data.data || data.job || data;

    set((state) => ({ jobs: [newJob, ...state.jobs] }));
    return newJob;
  },

  deleteJob: async (jobId) => {
    const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete job: ${res.status}`);

    set((state) => ({
      jobs: state.jobs.filter((j) => j._id !== jobId),
    }));
  },

  submitApplication: async ({ jobId, name, email, resumeUrl, coverNote }) => {
    set({ submitLoading: true, submitError: null });
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          name,
          email,
          resume_link: resumeUrl,
          cover_note: coverNote,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        console.error("Backend said:", errData);
        throw new Error(`Submission failed: ${res.status}`);
      }
      const data = await res.json();

      const newApplication = data.data || data.application || data;

      set((state) => {
        const existing = state.applications[jobId]?.data || [];
        return {
          submitLoading: false,
          applications: {
            ...state.applications,
            [jobId]: {
              data: [...existing, newApplication],
              loading: false,
              error: null,
            },
          },
        };
      });

      return newApplication;
    } catch (err) {
      console.error("submitApplication error:", err);
      set({ submitLoading: false, submitError: err.message });
      throw err;
    }
  },

  fetchApplicationsByJobId: async (jobId) => {
    const existing = get().applications[jobId];
    if (existing?.data?.length > 0) return;

    set((state) => ({
      applications: {
        ...state.applications,
        [jobId]: { data: [], loading: true, error: null },
      },
    }));

    try {
      const res = await fetch(`/api/applications/${jobId}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      const apps = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.applications)
            ? data.applications
            : [];

      set((state) => ({
        applications: {
          ...state.applications,
          [jobId]: { data: apps, loading: false, error: null },
        },
      }));
    } catch (err) {
      console.error("fetchApplicationsByJobId error:", err);
      set((state) => ({
        applications: {
          ...state.applications,
          [jobId]: { data: [], loading: false, error: err.message },
        },
      }));
    }
  },

  getApplicationsForJob: (jobId) => {
    const entry = get().applications[jobId];
    return {
      data: entry?.data || [],
      loading: entry?.loading || false,
      error: entry?.error || null,
    };
  },
}));

export default useJobStore;
