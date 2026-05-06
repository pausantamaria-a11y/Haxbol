# 🎮 BIENVENIDO A HAXBALL

**¡Tu juego multijugador está listo para funcionar!**

---

## ⚡ TL;DR (La versión corta)

1. **Instala Node.js** desde https://nodejs.org (versión LTS)
2. **Abre PowerShell** en esta carpeta
3. **Ejecuta:** `.\setup.ps1`
4. **Listo!** Se abrirá en http://localhost:3000

---

## 📚 Documentación

Tengo varias guías disponibles según lo que necesites:

### 🚀 **Quiero empezar YA**
→ Lee: **[START.md](./START.md)** (guía rápida paso a paso)

### 📖 **Quiero entender todo en detalle**
→ Lee: **[GUIA_COMPLETA.md](./GUIA_COMPLETA.md)** (documentación completa)

### 🔍 **Algo no funciona / Tengo problemas**
→ Ejecuta: `.\diagnose.ps1` (diagnóstico automático)

### 🌐 **Quiero poner mi juego en internet**
→ Ejecuta: `.\deploy.ps1` (sube a GitHub y Vercel)

### 📋 **Quiero ver la arquitectura del proyecto**
→ Lee: **[README.md](./README.md)** (documentación técnica)

### 💾 **Quiero ver el schema de la base de datos**
→ Lee: **[001_initial_schema.sql](./001_initial_schema.sql)** (schema SQL)

---

## 🎯 Flujo recomendado

```
┌─────────────────────────────────────────────────────┐
│ 1. INSTALA NODE.JS (5 min)                          │
│    https://nodejs.org → descargar LTS → instalar   │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 2. ABRE POWERSHELL EN ESTA CARPETA                 │
│    cd "C:\Users\ytpau\Desktop\Haxbol"              │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 3. EJECUTA EL SETUP (3 min)                         │
│    .\setup.ps1                                       │
│    → Te pedirá tus credenciales de Supabase         │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 4. ¡JUEGA! (♾ tiempo)                             │
│    Se abrirá en http://localhost:3000               │
│    Regístrate, invita a un amigo, ¡a jugar!        │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 5. (OPCIONAL) DEPLOY A INTERNET                     │
│    .\deploy.ps1                                      │
│    Luego ve a https://vercel.com                    │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 ¿Dónde obtengo mis credenciales de Supabase?

1. Ve a **https://supabase.com**
2. Inicia sesión
3. Abre tu proyecto
4. **Settings** → **API**
5. Copia:
   - **Project URL** 
   - **anon public** (bajo Project API keys)

---

## 📁 Estructura del Proyecto

```
Haxbol/
├── src/                          # Código React
│   ├── pages/                    # Pantallas (Auth, Lobby, Game)
│   ├── components/               # Componentes (Canvas, Scoreboard)
│   ├── hooks/                    # Lógica personalizada (Auth, Game, Matchmaking)
│   ├── lib/                      # Librerías (Supabase, Physics, Constants)
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos
├── package.json                  # Dependencias
├── vite.config.js                # Configuración Vite
├── index.html                    # HTML principal
├── .env.example                  # Variables de entorno (plantilla)
├── .env.local                    # Variables de entorno (local, no se sube)
├── 001_initial_schema.sql        # Schema de base de datos
├── START.md                      # Guía rápida
├── GUIA_COMPLETA.md              # Guía detallada
├── setup.ps1                     # Script de setup automático
├── deploy.ps1                    # Script de deploy
├── diagnose.ps1                  # Script de diagnóstico
└── README.md                     # Documentación técnica
```

---

## 🎮 Cómo Jugar

**Controles:**
- **W/↑** → Arriba
- **S/↓** → Abajo
- **A/←** → Izquierda
- **D/→** → Derecha

**Objetivo:**
- Meter goles a la portería del equipo contrario
- Primero en 3 goles gana

---

## 💡 Tips

✅ **Usa dos ventanas incógnito** para probar el juego multijugador localmente  
✅ **Los cambios se recargan automáticamente** cuando editas código  
✅ **El hosting en Vercel es totalmente gratuito**  
✅ **Supabase también ofrece plan gratuito** (hasta 500MB de BD)  

---

## 🆘 Problemas?

Si algo no funciona:

1. **Ejecuta el diagnóstico:**
   ```powershell
   .\diagnose.ps1
   ```

2. **Lee la sección de Troubleshooting** en GUIA_COMPLETA.md

3. **Verifica los requisitos:**
   - ✅ Node.js instalado
   - ✅ Credenciales de Supabase correctas
   - ✅ `.env.local` existe y está lleno
   - ✅ `npm install` ejecutado sin errores

---

## ✨ Próximos Pasos

- [ ] Instalar Node.js
- [ ] Ejecutar `.\setup.ps1`
- [ ] Jugar localmente
- [ ] (Opcional) Ejecutar `.\deploy.ps1`
- [ ] (Opcional) Deploy a Vercel
- [ ] ¡Invitar amigos a jugar!

---

## 📞 Contacto / Soporte

Si necesitas ayuda:
1. Lee **[GUIA_COMPLETA.md](./GUIA_COMPLETA.md)**
2. Ejecuta el diagnóstico: `.\diagnose.ps1`
3. Verifica que Node.js está instalado: `node --version`

---

**¡Que disfrutes el juego! 🎮⚽**

Hecho con ❤️ usando React, Vite y Supabase
