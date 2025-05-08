import { create } from "zustand"

interface UserState {
  user: {
    id: string | null
    name: string | null
    email: string | null
    membershipLevel: string | null
    memberSince: string | null
    membershipId: string | null
    nextRenewal: string | null
  }
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => Promise<boolean>
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: null,
    name: null,
    email: null,
    membershipLevel: null,
    memberSince: null,
    membershipId: null,
    nextRenewal: null,
  },
  isAuthenticated: false,

  login: async (email, password) => {
    // This would be replaced with actual API call
    // For demo purposes, we'll simulate a successful login

    // Simulate API delay
/*     await new Promise((resolve) => setTimeout(resolve, 1000))
 */
    // Mock successful login
    set({
      user: {
        id: "user_123",
        name: "John Doe",
        email: email,
        membershipLevel: "Premium",
        memberSince: "January 2023",
        membershipId: "GC-12345",
        nextRenewal: "January 2026",
      },
      isAuthenticated: true,
    })

    return true
  },

  logout: () => {
    set({
      user: {
        id: null,
        name: null,
        email: null,
        membershipLevel: null,
        memberSince: null,
        membershipId: null,
        nextRenewal: null,
      },
      isAuthenticated: false,
    })
  },

  register: async (userData) => {
    // This would be replaced with actual API call
    // For demo purposes, we'll simulate a successful registration

    // Simulate API delay
/*     await new Promise((resolve) => setTimeout(resolve, 1000))
 */
    // Mock successful registration
    set({
      user: {
        id: "user_new",
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        membershipLevel: "Basic",
        memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        membershipId: `GC-${Math.floor(10000 + Math.random() * 90000)}`,
        nextRenewal: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      },
      isAuthenticated: true,
    })

    return true
  },
}))
