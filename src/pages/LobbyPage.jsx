import { useAuth } from '../hooks/useAuth'

export default function LobbyPage({ onPlay, searching, error }) {
  const { profile, signOut } = useAuth()

  return (
    <div className="page">
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <button
          onClick={signOut}
          style={{
            background: 'transparent',
            border: '1px solid rgba(0,212,255,0.2)',
            color: '#7ab8d8',
            padding: '0.5rem 1rem',
            borderRadius: 8,
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            fontFamily: 'Rajdhani, sans-serif',
          }}
        >
          SALIR
        </button>
      </div>

      <div className="card" style={{ maxWidth: 500, textAlign: 'center' }}>
        <div className="logo">
          <h1>HAXBALL</h1>
          <span>ONLINE MULTIPLAYER</span>
        </div>

        <div style={{
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.1)',
          borderRadius: 12,
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            {profile?.username}
          </div>
          <div style={{ color: '#7ab8d8', fontSize: '0.85rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
            <span>⚽ {profile?.goals_scored} goles</span>
            <span>🎮 {profile?.games_played} partidas</span>
            <span>🏆 {profile?.wins} victorias</span>
          </div>
        </div>

        {error && <div className="error-msg" style={{ marginBottom: '1rem' }}>{error}</div>}

        <button
          className="btn btn-primary"
          onClick={onPlay}
          disabled={searching}
          style={{ fontSize: '1.1rem', padding: '1.1rem', marginBottom: '1rem' }}
        >
          {searching ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Spinner /> BUSCANDO PARTIDA...
            </span>
          ) : '⚽  JUGAR'}
        </button>

        <p style={{ color: '#7ab8d8', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
          Controles: WASD o ↑↓←→ para moverte
        </p>
      </div>

      <FieldPreview />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function Spinner() {
  return (
    <span style={{
      display: 'inline-block',
      width: 16,
      height: 16,
      border: '2px solid rgba(0,0,0,0.3)',
      borderTopColor: '#000',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  )
}

function FieldPreview() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 120,
      overflow: 'hidden',
      opacity: 0.07,
      pointerEvents: 'none',
    }}>
      <svg width="100%" height="120" viewBox="0 0 900 120">
        <rect x="0" y="0" width="900" height="120" fill="none" stroke="#00d4ff" strokeWidth="2" />
        <line x1="450" y1="0" x2="450" y2="120" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="450" cy="60" r="50" fill="none" stroke="#00d4ff" strokeWidth="1" />
        <rect x="0" y="30" width="15" height="60" fill="none" stroke="#00d4ff" strokeWidth="2" />
        <rect x="885" y="30" width="15" height="60" fill="none" stroke="#00d4ff" strokeWidth="2" />
      </svg>
    </div>
  )
}
