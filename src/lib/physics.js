import { BALL, FIELD, PLAYER } from './constants'

export function stepPhysics(ball, players) {
  // Damping only: no gravity in top-down HaxBall style physics
  const newBall = { ...ball }
  newBall.vx *= BALL.DAMPING
  newBall.vy *= BALL.DAMPING
  newBall.x += newBall.vx
  newBall.y += newBall.vy

  // Wall collisions
  if (newBall.x - BALL.RADIUS < 0) {
    newBall.x = BALL.RADIUS
    newBall.vx *= -0.8
  }
  if (newBall.x + BALL.RADIUS > FIELD.WIDTH) {
    newBall.x = FIELD.WIDTH - BALL.RADIUS
    newBall.vx *= -0.8
  }
  if (newBall.y - BALL.RADIUS < 0) {
    newBall.y = BALL.RADIUS
    newBall.vy *= -0.8
  }
  if (newBall.y + BALL.RADIUS > FIELD.HEIGHT) {
    newBall.y = FIELD.HEIGHT - BALL.RADIUS
    newBall.vy *= -0.8
  }

  // Goal detection (left and right sides)
  let scored = null
  if (newBall.x < -20) scored = 'blue'
  if (newBall.x > FIELD.WIDTH + 20) scored = 'red'

  // Player-ball collisions
  for (const player of players) {
    const dx = newBall.x - player.x
    const dy = newBall.y - player.y
    const dist = Math.hypot(dx, dy)

    if (dist < BALL.RADIUS + PLAYER.RADIUS) {
      const angle = Math.atan2(dy, dx)
      const speed = Math.hypot(newBall.vx, newBall.vy)

      newBall.x = player.x + Math.cos(angle) * (BALL.RADIUS + PLAYER.RADIUS)
      newBall.y = player.y + Math.sin(angle) * (BALL.RADIUS + PLAYER.RADIUS)

      newBall.vx = Math.cos(angle) * (speed + 4)
      newBall.vy = Math.sin(angle) * (speed + 4)
    }
  }

  return { ball: newBall, scored }
}

export function resetBall() {
  return {
    x: FIELD.WIDTH / 2,
    y: FIELD.HEIGHT / 2,
    vx: 0,
    vy: 0,
  }
}

export function resetPositions(players) {
  return players.map(p => ({
    ...p,
    x: p.team === 'red' ? FIELD.WIDTH * 0.25 : FIELD.WIDTH * 0.75,
    y: FIELD.HEIGHT / 2,
    vx: 0,
    vy: 0,
  }))
}
