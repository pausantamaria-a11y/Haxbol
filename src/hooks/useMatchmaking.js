import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useMatchmaking(userId) {
  const [gameId, setGameId] = useState(null)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)

  const assignTeam = (existingPlayers) => {
    const redCount = existingPlayers.filter(p => p.team === 'red').length
    const blueCount = existingPlayers.filter(p => p.team === 'blue').length
    return redCount <= blueCount ? 'red' : 'blue'
  }

  const joinGame = useCallback(async () => {
    if (!userId) return
    setSearching(true)
    setError(null)

    try {
      // Look for a waiting or already-playing game to join
      const { data: games, error: gErr } = await supabase
        .from('games')
        .select('id, status, game_players(*)')
        .in('status', ['waiting', 'playing'])
        .order('created_at', { ascending: true })
        .limit(10)

      if (gErr) throw gErr

      // Find a game the user isn't already in
      const available = (games || []).find(g =>
        !g.game_players.some(p => p.user_id === userId)
      )

      let targetGameId

      if (available) {
        // Join existing game
        targetGameId = available.id
        const team = assignTeam(available.game_players)

        await supabase.from('game_players').insert({
          game_id: targetGameId,
          user_id: userId,
          team,
        })

        // Start immediately once at least one player is in the game
        const newCount = available.game_players.length + 1
        if (available.status === 'waiting' && newCount >= 1) {
          await supabase.from('games').update({ status: 'playing' }).eq('id', targetGameId)
        }
      } else {
        // Create a new game
        const { data: newGame, error: cgErr } = await supabase
          .from('games')
          .insert({ status: 'playing' })
          .select()
          .single()

        if (cgErr) throw cgErr
        targetGameId = newGame.id

        await supabase.from('game_players').insert({
          game_id: targetGameId,
          user_id: userId,
          team: 'red',
        })

        // Initialize ball state
        await supabase.from('ball_state').insert({
          game_id: targetGameId,
          x: 450,
          y: 250,
          vx: 0,
          vy: 0,
        })
      }

      // Initialize player position
      await supabase.from('player_positions').upsert({
        game_id: targetGameId,
        user_id: userId,
        x: 200,
        y: 250,
      })

      setGameId(targetGameId)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSearching(false)
    }
  }, [userId])

  const leaveGame = useCallback(async () => {
    if (!gameId || !userId) return
    await supabase.from('game_players').delete().eq('game_id', gameId).eq('user_id', userId)
    await supabase.from('player_positions').delete().eq('game_id', gameId).eq('user_id', userId)

    // Check if game is now empty
    const { data: remaining } = await supabase
      .from('game_players')
      .select('id')
      .eq('game_id', gameId)

    if (!remaining || remaining.length === 0) {
      await supabase.from('games').update({ status: 'finished' }).eq('id', gameId)
    }

    setGameId(null)
  }, [gameId, userId])

  return { gameId, searching, error, joinGame, leaveGame }
}
