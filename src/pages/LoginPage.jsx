import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome Admin! 🌸')
      navigate('/admin', { replace: true })
    } catch {
      toast.error('Invalid credentials or not an admin account')
    } finally { setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d25 100%)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 52 }}>🌸</div>
          <h1 style={{ color: '#fff', marginTop: 8 }}>Blooms</h1>
          <div style={{
            background: '#f4c842', color: '#111',
            padding: '4px 18px', borderRadius: 20,
            display: 'inline-block', fontSize: 12,
            fontWeight: 800, marginTop: 8, letterSpacing: 1
          }}>ADMIN PORTAL</div>
        </div>

        <div className="card" style={{ padding: 36 }}>
          <h2 style={{ color: '#1a5c38', marginBottom: 6 }}>Admin Sign In</h2>
          <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 24 }}>
            Restricted access — authorized admins only
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input type="email" className="form-input"
                placeholder="admin@blooms.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required />
            </div>
            <button className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? 'Signing in...' : '🔐 Admin Sign In'}
            </button>
          </form>

          <div style={{
            marginTop: 20, padding: '12px 16px',
            background: '#fff8e1', borderRadius: 8,
            border: '1px solid #f4c842'
          }}>
            <div style={{ fontSize: 12, color: '#92400e', fontWeight: 600, marginBottom: 2 }}>
              ⚠️ Restricted Area
            </div>
            <div style={{ fontSize: 12, color: '#92400e' }}>
              Only admin accounts can access this portal.
              Buyer accounts will be rejected.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}