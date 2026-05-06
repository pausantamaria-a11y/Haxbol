import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { useMatchmaking } from './hooks/useMatchmaking'
import { supabase } from './lib/supabase'
import AuthPage from './pages/AuthPage'
import LobbyPage from './pages/LobbyPage'
import GamePage from './pages/GamePage'

function AppInner() {
  const { user, profile, loading } = useAuth()
  const [currentGameId, setCurrentGameId] = useState(null)
  const { gameId, searching, error, joinGame, leaveGame } = useMatchmaking(profile?.id)

  // Listen for game ID changes from matchmaking hook
  useEffect(() => {
    if (gameId) {
      setCurrentGameId(gameId)
    }
  }, [gameId])

  // Realtime: auto-enter game when it starts
  useEffect(() => {
    if (!currentGameId) return

    const ch = supabase
      .channel(`lobby-game-${currentGameId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'games',
        filter: `id=eq.${currentGameId}`,
      }, ({ new: g }) => {
        if (g.status === 'playing' || g.status === 'waiting') {
          setCurrentGameId(g.id)
        }
      })
      .subscribe()

    return () => supabase.removeChannel(ch)
  }, [currentGameId])

  if (loading) return <LoadingScreen />
  if (!user || !profile) return <AuthPage />
  if (currentGameId) {
    return (
      <GamePage
        gameId={currentGameId}
        onLeave={async () => {
          await leaveGame()
          setCurrentGameId(null)
        }}
      />
    )
  }

  return (
    <LobbyPageWrapper
      profile={profile}
      searching={searching}
      error={error}
      onPlay={async () => {
        await joinGame()
      }}
    />
  )
}

function LobbyPageWrapper({ profile, searching, error, onPlay }) {
  const { signOut } = useAuth()
  return <LobbyPage
    profile={profile}
    searching={searching}
    error={error}
    onPlay={onPlay}
    onSignOut={signOut}
  />
}

function LoadingScreen() {
  return (
    <div className="page">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '2rem',
          background: 'linear-gradient(135deg, #00d4ff, #0088cc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
        }}>HAXBALL</h1>
        <div style={{ color: '#4a7a8a', fontSize: '0.8rem', letterSpacing: '0.3em' }}>CARGANDO...</div>
      </div>
    </div>
  )
}

export default function App() {
  return <AppInner />
}
