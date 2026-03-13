import { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'

export default function AdminUsers() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getUsers()
      .then(r => setUsers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const buyers = users.filter(u => u.role === 'BUYER')

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 24, marginBottom: 22 }}>Buyers</h1>
      {loading ? (
        <p style={{ color: 'var(--text3)' }}>Loading...</p>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Company</th>
                <th>City</th><th>Phone</th><th>Joined</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {buyers.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>No buyers yet</td></tr>
              ) : buyers.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: 'var(--text3)', fontSize: 13 }}>{u.email}</td>
                  <td>{u.companyName || '—'}</td>
                  <td style={{ fontSize: 13 }}>{u.city || '—'}</td>
                  <td style={{ fontSize: 13 }}>{u.phone || '—'}</td>
                  <td style={{ fontSize: 12, color: 'var(--text3)' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: '#065f46', background: '#d1fae5',
                      padding: '3px 10px', borderRadius: 20
                    }}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
