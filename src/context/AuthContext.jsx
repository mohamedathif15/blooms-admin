import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const Ctx = createContext()
export const useAuth = () => useContext(Ctx)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bl_admin_user')) }
    catch { return null }
  })

  const login = async (email, password) => {
    const { data } = await axios.post(
      'https://blooms-backend-production.up.railway.app/api/auth/login',
      { email, password }
    )

    if (data.role !== 'ADMIN') throw new Error('Not admin')

    localStorage.setItem('bl_admin_token', data.token)
    localStorage.setItem('bl_admin_user', JSON.stringify(data))
    setUser(data)

    return data
  }

  const logout = () => {
    localStorage.removeItem('bl_admin_token')
    localStorage.removeItem('bl_admin_user')
    setUser(null)
  }

  return (
    <Ctx.Provider value={{ user, login, logout }}>
      {children}
    </Ctx.Provider>
  )
}