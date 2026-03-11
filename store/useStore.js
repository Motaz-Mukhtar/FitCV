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

  // Submissions & Generations
  submissions: [],
  setSubmissions: (submissions) => set({ submissions }),
  addSubmission: (submission) => set((state) => ({
    submissions: [submission, ...state.submissions]
  })),

  // Current Generation Context
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  // Auth
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, profiles: [], submissions: [] }),

  // Actions
  fetchProfiles: async () => {
    try {
      const res = await fetch('/api/v1/profiles');
      if (res.ok) {
        const data = await res.ok ? await res.json() : [];
        set({ profiles: data });
      }
    } catch (error) {
      console.error("Fetch profiles error:", error);
    }
  },

  fetchSubmissions: async () => {
    try {
      // Endpoint to be implemented
      const res = await fetch('/api/v1/submissions');
      if (res.ok) {
        const data = await res.json();
        set({ submissions: data });
      }
    } catch (error) {
      console.error("Fetch submissions error:", error);
    }
  }
}))
