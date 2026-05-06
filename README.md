# ⚽ HaxBall Clone

Un clon multijugador en tiempo real de HaxBall construido con React, Vite y Supabase.

## Características

- 🔐 Login / Registro con email y contraseña
- 🔍 Matchmaking automático — busca partida y empieza cuando llegue otro jugador
- 👥 Soporte para múltiples jugadores (3, 4, más...) con equipos equilibrados
- ⚽ Física de pelota en tiempo real sincronizada entre clientes
- 🏆 Sistema de puntuación (primero en 3 goles gana)
- 📊 Estadísticas de jugador (goles, partidas, victorias)

## Stack

- **Frontend**: React 18 + Vite
- **Backend / DB**: Supabase (Auth, PostgreSQL, Realtime)
- **Física**: Motor propio en JS (canvas 2D)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/haxball-clone.git
cd haxball-clone
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y rellena tus credenciales de Supabase:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### 4. Configurar Supabase

Ejecuta el archivo de migración en tu proyecto de Supabase:

```bash
# Pega el contenido de supabase/migrations/001_initial_schema.sql
# en el SQL Editor de tu dashboard de Supabase
```

### 5. Arrancar en desarrollo

```bash
npm run dev
```

## Estructura del proyecto

```
src/
├── components/
│   ├── GameCanvas.jsx     # Canvas de juego con física visual
│   └── Scoreboard.jsx     # Marcador y equipos
├── hooks/
│   ├── useAuth.jsx        # Contexto de autenticación
│   ├── useGame.js         # Lógica del juego + sync Supabase Realtime
│   └── useMatchmaking.js  # Búsqueda y creación de partidas
├── lib/
│   ├── constants.js       # Constantes físicas y de campo
│   ├── physics.js         # Motor de física
│   └── supabase.js        # Cliente Supabase
├── pages/
│   ├── AuthPage.jsx       # Login / Registro
│   ├── LobbyPage.jsx      # Lobby con botón Jugar
│   └── GamePage.jsx       # Pantalla de juego
└── App.jsx                # Enrutamiento principal
```

## Controles

| Tecla | Acción |
|-------|--------|
| W / ↑ | Mover arriba |
| S / ↓ | Mover abajo |
| A / ← | Mover izquierda |
| D / → | Mover derecha |

La pelota se golpea al hacer contacto con tu jugador.

## Arquitectura multijugador

- El **primer jugador en unirse** actúa como "host" y ejecuta la física de la pelota
- Todas las posiciones se sincronizan via **Supabase Realtime** (postgres_changes)
- Los nuevos jugadores se asignan al equipo con menos jugadores automáticamente
- Cuando el host se va, el siguiente jugador toma el rol automáticamente

## Deploy

```bash
npm run build
# Sube la carpeta /dist a Vercel, Netlify, etc.
```

## Base de datos

Ver `supabase/migrations/001_initial_schema.sql` para el esquema completo.

Tablas principales:
- `profiles` — datos de usuario (stats, username)
- `games` — partidas (estado, marcador)
- `game_players` — qué jugadores están en qué partida y equipo
- `ball_state` — posición de la pelota en tiempo real
- `player_positions` — posiciones de los jugadores en tiempo real
