import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // Profiles
  profiles: [],
  setProfiles: (profiles) => set({ profiles }),
  addProfile: (profile) => set((state) => ({ profiles: [profile, ...state.profiles] })),
  updateProfile: (updated) => set((state) => ({
    profiles: state.profiles.map(p => p.id === updated.id ? updated : p)
  })),
  deleteProfile: (id) => set((state) => ({
    profiles: state.profiles.filter(p => p.id !== id)
  })),

  // Experiences
  addExperience: (profileId, experience) => set((state) => ({
    profiles: state.profiles.map(p => 
      p.id === profileId 
        ? { ...p, experiences: [experience, ...(p.experiences || [])] } 
        : p
    )
  })),

  // Skills
  addSkill: (profileId, skill) => set((state) => ({
    profiles: state.profiles.map(p => 
      p.id === profileId 
        ? { ...p, skills: [...(p.skills || []), skill] } 
        : p
    )
  })),

  // Education
  addEducation: (profileId, education) => set((state) => ({
    profiles: state.profiles.map(p => 
      p.id === profileId 
        ? { ...p, education: [education, ...(p.education || [])] } 
        : p
    )
  })),

  // Submissions & Generations
  submissions: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  stats: {
    cv: 0,
    cover_letter: 0,
    summary: 0,
  },
  setSubmissions: (submissions) => set({ submissions }),
  setPagination: (pagination) => set({ pagination }),
  setStats: (stats) => set({ stats }),
  addSubmission: (submission) => set((state) => ({
    submissions: [submission, ...state.submissions]
  })),

  // Current Generation Context
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  // Auth
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, profiles: [], submissions: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 }, stats: { cv: 0, cover_letter: 0, summary: 0 } }),

  // Actions
  fetchProfiles: async () => {
    try {
      const res = await fetch('/api/v1/profiles');
      if (res.ok) {
        const data = await res.json();
        set({ profiles: data });
      }
    } catch (error) {
      console.error("Fetch profiles error:", error);
    }
  },

  fetchSubmissions: async (page = 1, limit = 10) => {
    try {
      const res = await fetch(`/api/v1/submissions?page=${page}&limit=${limit}`);
      if (res.ok) {
        const data = await res.json();
        set({ 
          submissions: data.submissions,
          pagination: data.pagination,
          stats: data.stats
        });
      }
    } catch (error) {
      console.error("Fetch submissions error:", error);
    }
  }
}))
