import { useEffect, useState } from 'react'
import { adminAPI } from '../../services/api'

export default function AdminBuyers() {
  const [users, setUsers] = useState([])
  useEffect(() => { adminAPI.getUsers().then(r => setUsers(r.data.filter(u => u.role !== 'ADMIN'))).catch(() => {}) }, [])

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Buyers</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Company</th>
              <th>City</th><th>Phone</th><th>Joined</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>No buyers yet</td></tr>
            ) : users.map(u => (
              <tr key={u.id}>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td style={{ color: 'var(--text3)' }}>{u.email}</td>
                <td>{u.companyName || '—'}</td>
                <td>{u.city || '—'}</td>
                <td>{u.phone || '—'}</td>
                <td style={{ color: 'var(--text3)', fontSize: 13 }}>
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                </td>
                <td><span className="badge badge-green">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}