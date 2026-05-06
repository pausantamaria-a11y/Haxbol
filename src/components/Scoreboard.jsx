export default function Scoreboard({ scores, players, myTeam }) {
  const redPlayers = players.filter(p => p.team === 'red')
  const bluePlayers = players.filter(p => p.team === 'blue')

  return (
    <div style={{
      background: 'rgba(10,21,32,0.95)',
      border: '1px solid rgba(0,212,255,0.15)',
      borderRadius: '12px 12px 0 0',
      padding: '1rem 1.5rem',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* Red Team */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#ef4444',
          fontFamily: 'Orbitron, monospace',
          marginBottom: '0.5rem',
        }}>
          {scores.red}
        </div>
        <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          EQUIPO ROJO
        </div>
        <div style={{ color: '#7ab8d8', fontSize: '0.7rem', marginTop: '0.5rem' }}>
          {redPlayers.map(p => p.username).join(', ')}
        </div>
      </div>

      {/* Center */}
      <div style={{ flex: 0, padding: '0 2rem', color: '#4a7a8a', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        VS
      </div>

      {/* Blue Team */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#3b82f6',
          fontFamily: 'Orbitron, monospace',
          marginBottom: '0.5rem',
        }}>
          {scores.blue}
        </div>
        <div style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          EQUIPO AZUL
        </div>
        <div style={{ color: '#7ab8d8', fontSize: '0.7rem', marginTop: '0.5rem' }}>
          {bluePlayers.map(p => p.username).join(', ')}
        </div>
      </div>
    </div>
  )
}
