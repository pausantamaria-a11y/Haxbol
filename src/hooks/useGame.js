import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { stepPhysics, resetPositions, resetBall } from '../lib/physics'
import { PLAYER, FIELD, GOALS_TO_WIN } from '../lib/constants'

const KEYS = {
  ArrowUp: [0, -1], w: [0, -1], W: [0, -1],
  ArrowDown: [0, 1], s: [0, 1], S: [0, 1],
  ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0],
  ArrowRight: [1, 0], d: [1, 0], D: [1, 0],
}

export function useGame(gameId, userId) {
  const [players, setPlayers] = useState([])
  const [ball, setBall] = useState({ x: FIELD.WIDTH / 2, y: FIELD.HEIGHT / 2, vx: 0, vy: 0 })
  const [scores, setScores] = useState({ red: 0, blue: 0 })
  const [gameStatus, setGameStatus] = useState('waiting')
  const [winner, setWinner] = useState(null)
  const [myTeam, setMyTeam] = useState(null)

  const keysDown = useRef({})
  const ballRef = useRef(ball)
  const playersRef = useRef(players)
  const scoresRef = useRef(scores)
  const isHostRef = useRef(false)
  const rafRef = useRef(null)
  const lastPositionsRef = useRef({}) // Cache de últimas posiciones enviadas

  ballRef.current = ball
  playersRef.current = players
  scoresRef.current = scores

  // Load initial state and determine if this user is the "host" (first player)
  useEffect(() => {
    if (!gameId) return

    async function init() {
      const { data: gamePlayers } = await supabase
        .from('game_players')
        .select('*, profiles(username)')
        .eq('game_id', gameId)

      if (!gamePlayers) return

      // Host = first player who joined (earliest)
      const sorted = [...gamePlayers].sort((a, b) => new Date(a.joined_at) - new Date(b.joined_at))
      isHostRef.current = sorted[0]?.user_id === userId

      const me = gamePlayers.find(p => p.user_id === userId)
      if (me) setMyTeam(me.team)

      const { data: ballData } = await supabase
        .from('ball_state')
        .select('*')
        .eq('game_id', gameId)
        .single()

      if (ballData) {
        const nextBall = { x: ballData.x, y: ballData.y, vx: ballData.vx, vy: ballData.vy }
        setBall(nextBall)
        ballRef.current = nextBall
      }

      const { data: positions } = await supabase
        .from('player_positions')
        .select('*')
        .eq('game_id', gameId)

      const merged = gamePlayers.map(gp => {
        const pos = positions?.find(p => p.user_id === gp.user_id)
        return {
          user_id: gp.user_id,
          username: gp.profiles?.username || 'Player',
          team: gp.team,
          x: pos?.x ?? (gp.team === 'red' ? FIELD.WIDTH * 0.25 : FIELD.WIDTH * 0.75),
          y: pos?.y ?? FIELD.HEIGHT / 2,
          vx: 0,
          vy: 0,
        }
      })
      setPlayers(merged)
      playersRef.current = merged

      const { data: gameData } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single()

      if (gameData) {
        setGameStatus(gameData.status)
        setScores({ red: gameData.score_red, blue: gameData.score_blue })
        if (gameData.winner) setWinner(gameData.winner)
      }
    }

    init()
  }, [gameId, userId])

  // Fallback synchronization when realtime events are delayed/lost
  useEffect(() => {
    if (!gameId || gameStatus !== 'playing') return

    const interval = setInterval(async () => {
      const [{ data: dbPositions }, { data: dbBall }, { data: dbPlayers }] = await Promise.all([
        supabase.from('player_positions').select('*').eq('game_id', gameId),
        supabase.from('ball_state').select('*').eq('game_id', gameId).maybeSingle(),
        supabase.from('game_players').select('user_id, team, profiles(username)').eq('game_id', gameId),
      ])

      if (dbPlayers) {
        setPlayers(prev => {
          const existing = new Map(prev.map(p => [p.user_id, p]))
          const nextPlayers = dbPlayers.map(gp => {
            const pos = dbPositions?.find(p => p.user_id === gp.user_id)
            return {
              ...existing.get(gp.user_id),
              user_id: gp.user_id,
              username: gp.profiles?.username || 'Player',
              team: gp.team,
              x: pos?.x ?? existing.get(gp.user_id)?.x ?? (gp.team === 'red' ? FIELD.WIDTH * 0.25 : FIELD.WIDTH * 0.75),
              y: pos?.y ?? existing.get(gp.user_id)?.y ?? FIELD.HEIGHT / 2,
              vx: existing.get(gp.user_id)?.vx ?? 0,
              vy: existing.get(gp.user_id)?.vy ?? 0,
            }
          })
          playersRef.current = nextPlayers
          return nextPlayers
        })
      }

      if (dbBall && !isHostRef.current) {
        const nextBall = { x: dbBall.x, y: dbBall.y, vx: dbBall.vx, vy: dbBall.vy }
        ballRef.current = nextBall
        setBall(nextBall)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [gameId, gameStatus])

  // Realtime subscriptions
  useEffect(() => {
    if (!gameId) return

    const gamesSub = supabase
      .channel(`game-${gameId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'games', filter: `id=eq.${gameId}` },
        ({ new: g }) => {
          if (g) {
            setGameStatus(g.status)
            setScores({ red: g.score_red, blue: g.score_blue })
            if (g.winner) setWinner(g.winner)
          }
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'game_players', filter: `game_id=eq.${gameId}` },
        async () => {
          const { data: gamePlayers } = await supabase
            .from('game_players')
            .select('*, profiles(username)')
            .eq('game_id', gameId)

          if (!gamePlayers) return

          const { data: positions } = await supabase
            .from('player_positions')
            .select('*')
            .eq('game_id', gameId)

          const sorted = [...gamePlayers].sort((a, b) => new Date(a.joined_at) - new Date(b.joined_at))
          isHostRef.current = sorted[0]?.user_id === userId

          setPlayers(prev => {
            const existing = new Map(prev.map(p => [p.user_id, p]))
            const nextPlayers = gamePlayers.map(gp => {
              const pos = positions?.find(p => p.user_id === gp.user_id)
              return ({
              ...existing.get(gp.user_id),
              user_id: gp.user_id,
              username: gp.profiles?.username || 'Player',
              team: gp.team,
              x: pos?.x ?? existing.get(gp.user_id)?.x ?? (gp.team === 'red' ? FIELD.WIDTH * 0.25 : FIELD.WIDTH * 0.75),
              y: pos?.y ?? existing.get(gp.user_id)?.y ?? FIELD.HEIGHT / 2,
              vx: existing.get(gp.user_id)?.vx ?? 0,
              vy: existing.get(gp.user_id)?.vy ?? 0,
            })})
            playersRef.current = nextPlayers
            return nextPlayers
          })
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ball_state', filter: `game_id=eq.${gameId}` },
        ({ new: b }) => {
          if (b && !isHostRef.current) {
            const nextBall = { x: b.x, y: b.y, vx: b.vx, vy: b.vy }
            ballRef.current = nextBall
            setBall(nextBall)
          }
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'player_positions', filter: `game_id=eq.${gameId}` },
        ({ new: pos }) => {
          if (pos && pos.user_id !== userId) {
            setPlayers(prev => {
              const nextPlayers = prev.map(p =>
                p.user_id === pos.user_id ? { ...p, x: pos.x, y: pos.y } : p
              )
              playersRef.current = nextPlayers
              return nextPlayers
            })
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(gamesSub)
  }, [gameId, userId])

  // Keyboard handlers
  useEffect(() => {
    const down = (e) => {
      if (KEYS[e.key]) {
        e.preventDefault()
        keysDown.current[e.key] = true
      }
    }
    const up = (e) => {
      delete keysDown.current[e.key]
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // Game loop - Physics + Position sync combined
  useEffect(() => {
    if (gameStatus !== 'playing') return

    let lastBallUpdate = 0
    let lastPosUpdate = 0

    const loop = (ts) => {
      rafRef.current = requestAnimationFrame(loop)

      let localPlayerSnapshot = null

      // Update my player position from keys
      setPlayers(prev => {
        let dx = 0, dy = 0
        for (const key of Object.keys(keysDown.current)) {
          if (KEYS[key]) { dx += KEYS[key][0]; dy += KEYS[key][1] }
        }
        if (dx !== 0 || dy !== 0) {
          const len = Math.hypot(dx, dy)
          dx = (dx / len) * PLAYER.SPEED
          dy = (dy / len) * PLAYER.SPEED
        }

        const nextPlayers = prev.map(p => {
          if (p.user_id !== userId) return p
          const newVx = (p.vx || 0) * PLAYER.FRICTION + dx
          const newVy = (p.vy || 0) * PLAYER.FRICTION + dy
          const next = {
            ...p,
            x: Math.max(PLAYER.RADIUS, Math.min(FIELD.WIDTH - PLAYER.RADIUS, p.x + newVx)),
            y: Math.max(PLAYER.RADIUS, Math.min(FIELD.HEIGHT - PLAYER.RADIUS, p.y + newVy)),
            vx: newVx,
            vy: newVy,
          }
          localPlayerSnapshot = next
          return next
        })

        playersRef.current = nextPlayers
        return nextPlayers
      })

      // Only host runs physics for ball
      if (isHostRef.current) {
        const result = stepPhysics(ballRef.current, playersRef.current)
        ballRef.current = result.ball
        setBall(result.ball)

        if (result.scored) {
          const newScores = {
            ...scoresRef.current,
            [result.scored]: scoresRef.current[result.scored] + 1,
          }
          scoresRef.current = newScores

          const isFinished = newScores.red >= GOALS_TO_WIN || newScores.blue >= GOALS_TO_WIN
          const winTeam = newScores.red >= GOALS_TO_WIN ? 'red' : 'blue'

          supabase.from('games').update({
            score_red: newScores.red,
            score_blue: newScores.blue,
            ...(isFinished ? { status: 'finished', winner: winTeam } : {}),
          }).eq('id', gameId)

          // Reset positions after goal
          const reset = resetBall()
          setBall(reset)
          supabase.from('ball_state').update(reset).eq('game_id', gameId)

          setPlayers(prev => resetPositions(prev))
          return
        }

        // Sync ball to DB every ~50ms
        if (ts - lastBallUpdate > 50) {
          lastBallUpdate = ts
          supabase.from('ball_state').update({
            x: result.ball.x,
            y: result.ball.y,
            vx: result.ball.vx,
            vy: result.ball.vy,
          }).eq('game_id', gameId)
        }
      }

      // Sync player position every ~50ms
      if (ts - lastPosUpdate > 50) {
        lastPosUpdate = ts
        const me = localPlayerSnapshot || playersRef.current.find(p => p.user_id === userId)
        if (me && gameId && userId) {
          // Only send meaningful movement deltas
          const lastPos = lastPositionsRef.current
          if (!lastPos || Math.hypot(me.x - lastPos.x, me.y - lastPos.y) > 0.5) {
            lastPositionsRef.current = { x: me.x, y: me.y }
            supabase
              .from('player_positions')
              .update({
                x: me.x,
                y: me.y,
              })
              .eq('game_id', gameId)
              .eq('user_id', userId)
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [gameStatus, gameId, userId])

  return { players, ball, scores, gameStatus, winner, myTeam }
}
