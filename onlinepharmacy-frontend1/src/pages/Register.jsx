import { useState } from 'react'
import { register as apiRegister } from '../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import "../styles/Auth.css"

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',   
    gender: '',
    state: '',
    country: '',
    role: 'USER'   // default role
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErr('')
    setMsg('')
    try {
      await apiRegister(form)
      setMsg('Registration successful!')
      navigate('/login')
    } catch (e) {
      setErr('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>

        <div>
          <label>Username:</label>
          <input
            type="text"
            value={form.username}
            onChange={e => update('username', e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={e => update('password', e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            value={form.mobile}
            onChange={e => update('mobile', e.target.value)}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit mobile number"
            required
          />
        </div>

        <div>
          <label>Gender:</label>
          <select
            value={form.gender}
            onChange={e => update('gender', e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>State:</label>
          <input
            type="text"
            value={form.state}
            onChange={e => update('state', e.target.value)}
            required
          />
        </div>

        <div>
          <label>Country:</label>
          <input
            type="text"
            value={form.country}
            onChange={e => update('country', e.target.value)}
            required
          />
        </div>

        {/* ✅ Role Selection */}
        <div>
          <label>Role:</label>
          <select
            value={form.role}
            onChange={e => update('role', e.target.value)}
            required
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        {err && <p style={{ color: 'red' }}>{err}</p>}
      </form>
    </div>
  )
}
