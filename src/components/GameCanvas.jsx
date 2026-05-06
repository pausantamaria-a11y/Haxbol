import { useEffect, useRef } from 'react'
import { FIELD, PLAYER, BALL } from '../lib/constants'

export default function GameCanvas({ ball, players, scores, gameStatus, winner, myUserId }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw field lines
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Center line
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    ctx.setLineDash([])

    // Center circle
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2)
    ctx.stroke()

    // Goal areas (left and right)
    ctx.strokeRect(0, canvas.height / 2 - 60, 30, 120)
    ctx.strokeRect(canvas.width - 30, canvas.height / 2 - 60, 30, 120)

    // Draw players
    players.forEach(player => {
      const color = player.team === 'red' ? '#ef4444' : '#3b82f6'
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(player.x, player.y, PLAYER.RADIUS, 0, Math.PI * 2)
      ctx.fill()

      // Player number/id
      ctx.fillStyle = '#000'
      ctx.font = 'bold 10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(player.username.slice(0, 2).toUpperCase(), player.x, player.y)
    })

    // Draw ball
    ctx.fillStyle = '#fbbf24'
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, BALL.RADIUS, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw game status
    if (gameStatus === 'finished' && winner) {
      const winnerText = winner === 'red' ? 'EQUIPO ROJO GANA' : 'EQUIPO AZUL GANA'
      const color = winner === 'red' ? '#ef4444' : '#3b82f6'

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = color
      ctx.font = 'bold 48px Orbitron'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(winnerText, canvas.width / 2, canvas.height / 2)
    } else if (gameStatus === 'waiting') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00d4ff'
      ctx.font = 'bold 24px Orbitron'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('ESPERANDO JUGADORES...', canvas.width / 2, canvas.height / 2)
    }
  }, [ball, players, scores, gameStatus, winner])

  return (
    <canvas
      ref={canvasRef}
      width={FIELD.WIDTH}
      height={FIELD.HEIGHT}
      style={{
        display: 'block',
        margin: '0 auto',
        border: '2px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '12px 12px 0 0',
        background: '#000',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  )
}
