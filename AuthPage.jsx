import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'login') {
        await signIn(form.email, form.password)
      } else {
        if (form.username.trim().length < 3) {
          throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
        }
        await signUp(form.email, form.password, form.username.trim())
        setSuccess('¡Cuenta creada! Puedes iniciar sesión ahora.')
        setMode('login')
      }
    } catch (err) {
      const msg = err.message || 'Error desconocido'
      setError(
        msg.includes('Invalid login') ? 'Email o contraseña incorrectos' :
        msg.includes('already registered') ? 'Este email ya está registrado' :
        msg.includes('Email not confirmed') ? 'Confirma tu email antes de entrar' :
        msg
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="logo">
          <h1>HAXBALL</h1>
          <span>ONLINE MULTIPLAYER</span>
        </div>

        {error && <div className="error-msg">{error}</div>}
        {success && (
          <div style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            color: '#86efac',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="futbolero99"
                required
                minLength={3}
                maxLength={20}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="divider">o</div>

        <button
          className="btn btn-ghost"
          onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
        >
          {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  )
}
