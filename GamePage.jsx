import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useGame } from '../hooks/useGame'
import GameCanvas from '../components/GameCanvas'
import Scoreboard from '../components/Scoreboard'

export default function GamePage({ gameId, onLeave }) {
  const { profile } = useAuth()
  const { players, ball, scores, gameStatus, winner, myTeam } = useGame(gameId, profile?.id)

  // Auto-leave when game finishes
  useEffect(() => {
    if (gameStatus === 'finished') {
      const t = setTimeout(() => onLeave(), 4000)
      return () => clearTimeout(t)
    }
  }, [gameStatus, onLeave])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ maxWidth: 940, width: '100%' }}>
        <Scoreboard scores={scores} players={players} myTeam={myTeam} />

        <GameCanvas
          ball={ball}
          players={players}
          scores={scores}
          gameStatus={gameStatus}
          winner={winner}
          myUserId={profile?.id}
        />

        {/* Controls bar */}
        <div style={{
          background: 'rgba(10,21,32,0.95)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: '0 0 12px 12px',
          padding: '0.6rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ color: '#4a7a8a', fontSize: '0.75rem', letterSpacing: '0.1em', fontFamily: 'Rajdhani, sans-serif' }}>
            WASD / ↑↓←→ — MOVER
          </span>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{
              padding: '0.2rem 0.6rem',
              borderRadius: 6,
              fontSize: '0.7rem',
              background: myTeam === 'red' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)',
              border: `1px solid ${myTeam === 'red' ? 'rgba(239,68,68,0.4)' : 'rgba(59,130,246,0.4)'}`,
              color: myTeam === 'red' ? '#ef4444' : '#3b82f6',
              fontFamily: 'Orbitron, monospace',
              letterSpacing: '0.1em',
            }}>
              {myTeam === 'red' ? 'EQUIPO ROJO' : 'EQUIPO AZUL'}
            </span>

            <button
              onClick={onLeave}
              style={{
                background: 'transparent',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171',
                padding: '0.3rem 0.8rem',
                borderRadius: 6,
                fontSize: '0.7rem',
                cursor: 'pointer',
                fontFamily: 'Orbitron, monospace',
                letterSpacing: '0.1em',
              }}
            >
              SALIR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
