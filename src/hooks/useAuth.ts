import { useState, useEffect } from 'react'
import { useAppKV } from '@/hooks/useAppKV'

export interface User {
  id: string
  email: string
  name: string
  type: 'user' | 'admin'
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useAppKV<User | null>('currentUser', null)
  const [users, setUsers] = useAppKV<User[]>('users', [])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize admin user if none exists
  useEffect(() => {
    if (users.length === 0) {
      const adminUser: User = {
        id: 'admin-' + Date.now(),
        email: 'admin@silvercaretech.com',
        name: 'Admin',
        type: 'admin',
        createdAt: new Date().toISOString()
      }
      setUsers([adminUser])
    }
  }, [users, setUsers])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simple admin login (in production, use proper authentication)
      if (email === 'admin@silvercaretech.com' && password === 'admin123') {
        const adminUser = users.find(u => u.email === email && u.type === 'admin')
        if (adminUser) {
          setCurrentUser(adminUser)
          return { success: true }
        }
      }
      
      // Check for existing user
      const user = users.find(u => u.email === email && u.type === 'user')
      if (user) {
        setCurrentUser(user)
        return { success: true }
      }
      
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, name: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'User already exists' }
      }
      
      const newUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        type: 'user',
        createdAt: new Date().toISOString()
      }
      
      setUsers(prev => [...prev, newUser])
      setCurrentUser(newUser)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const authState: AuthState = {
    user: currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.type === 'admin',
    isLoading
  }

  return {
    ...authState,
    login,
    register,
    logout
  }
}