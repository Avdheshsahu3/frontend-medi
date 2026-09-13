import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import loginIllustration from '../assets/isometric-illustration-featuring-laptop-accompanied-by-pills-medicine_1176614-2760.avif'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || err?.response?.data?.message || err?.response?.data?.error || 'Invalid email or password')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f4f8f6,_#d8e4e1_75%)] px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[rgba(18,56,47,0.09)] bg-[rgba(234,247,239,0.72)] shadow-2xl shadow-[#15352e]/[0.10] lg:grid-cols-[0.95fr_1.05fr]">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[rgba(255,255,255,0.96)] p-8 backdrop-blur sm:p-10"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563C9] text-white shadow-sm" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white">MediStock</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Manage inventory with confidence</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium muted-text">Email</label>
            <input
              className="w-full rounded-xl border border-[rgba(21,155,104,0.2)] bg-white px-3 py-2.5 text-sm text-[var(--text-main)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(21,155,104,0.2)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium muted-text">Password</label>
            <input
              className="w-full rounded-xl border border-[rgba(21,155,104,0.2)] bg-white px-3 py-2.5 text-sm text-[var(--text-main)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(21,155,104,0.2)]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#2563C9] px-4 py-2.5 font-medium text-white transition hover:bg-[#1D4FA3] disabled:cursor-not-allowed disabled:opacity-70" disabled={busy}>
          {busy ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="mt-5 text-sm">
          <Link to="/forgot-password" className="accent-link transition hover:text-[#95ffc4]">
            Forgot password?
          </Link>
        </div>
      </motion.form>
      <div className="relative order-first h-52 overflow-hidden sm:h-64 lg:order-none lg:h-auto lg:min-h-[560px]">
        <img
          src={loginIllustration}
          alt="Medical inventory platform preview"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(90deg, rgba(7, 61, 53, 0.12), transparent 42%)' }}
        />
      </div>
      </div>
    </div>
  )
}
