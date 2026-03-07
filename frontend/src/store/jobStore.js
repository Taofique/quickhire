import { create } from "zustand";

const useJobStore = create((set, get) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    if (get().loading) return;
    set({ loading: true, error: null });
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

      set({ jobs, loading: false });
    } catch (err) {
      console.error("fetchJobs error:", err);
      set({ error: err.message, loading: false, jobs: [] });
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
}));

export default useJobStore;
