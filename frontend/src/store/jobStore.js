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

      // Response shape is { success: true, data: [...] }
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
}));

export default useJobStore;
