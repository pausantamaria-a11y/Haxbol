# 📘 GUÍA COMPLETA - HAXBALL SETUP

## Índice
1. [Instalación Rápida](#instalación-rápida)
2. [Instalación Detallada](#instalación-detallada)
3. [Como Jugar](#como-jugar)
4. [Deploy a Internet](#deploy-a-internet)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Instalación Rápida

Si tienes prisa, aquí está todo resumido:

```powershell
# 1. Abre PowerShell
# 2. Ve a tu carpeta
cd "C:\Users\ytpau\Desktop\Haxbol"

# 3. Ejecuta el diagnóstico (opcional pero recomendado)
.\diagnose.ps1

# 4. Ejecuta el setup (si no tienes node.js, instálalo primero)
.\setup.ps1

# El script te pedirá tus credenciales de Supabase
# Pégalas cuando pida
```

---

## 🔧 Instalación Detallada

### Requisito 1: Node.js

**¿Por qué lo necesitas?** Porque es el entorno que ejecuta todo en tu computadora.

**Cómo instalarlo:**

1. Abre tu navegador
2. Ve a **https://nodejs.org**
3. Verás dos botones. Descarga **LTS** (Long Term Support) - la que está recomendada
4. Ejecuta el archivo que descargaste (.msi)
5. En el instalador, puedes dejar todo por defecto
6. Cuando termine, **reinicia tu computadora** o abre una nueva PowerShell

**Verifica que se instaló:**
```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v20.11.0
10.5.0
```

---

### Requisito 2: Credenciales de Supabase

**¿Dónde obtenerlas?**

1. Abre **https://supabase.com** en tu navegador
2. Inicia sesión con tu cuenta
3. Elige tu proyecto (el que Claude ya preparó)
4. En el menú izquierdo, haz clic en **Settings**
5. Luego en **API**
6. Ahora ves dos secciones:
   - **Project URL** — cópialo (ej: `https://xyz123.supabase.co`)
   - **Project API keys** → busca **anon public** — cópiala

**Guárdalo temporalmente en un bloc de notas.**

---

### Paso 3: Setup Automático

Abre **PowerShell** en tu carpeta y ejecuta:

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.\setup.ps1
```

Esto hará automáticamente:
1. ✅ Verifica Node.js
2. ✅ Ejecuta `npm install` (instala React, Vite, Supabase, etc.)
3. ✅ Te pide tus credenciales de Supabase
4. ✅ Crea el archivo `.env.local` automáticamente
5. ✅ Inicia el servidor local
6. ✅ Abre http://localhost:3000 en tu navegador

---

## 🎮 Como Jugar

### Primer jugador (Registro):

1. En http://localhost:3000
2. Haz clic en "¿No tienes cuenta? Regístrate"
3. Crea una cuenta con:
   - Email: cualquier email (puede ser falso)
   - Contraseña: cualquier contraseña (mínimo 6 caracteres)
   - Nombre de usuario: tu nickname (mínimo 3 caracteres)
4. Haz clic en **JUGAR**

### Segundo jugador (para jugar de verdad):

Opción A: En **otra ventana** del navegador (o incógnito):
- Ve a http://localhost:3000
- Registra otro usuario
- Haz clic en **JUGAR**

Opción B: **Espera** a que otra persona se conecte (cuando esté en internet)

### Controles:

| Tecla | Acción |
|-------|--------|
| **W** o **↑** | Mover arriba |
| **S** o **↓** | Mover abajo |
| **A** o **←** | Mover izquierda |
| **D** o **→** | Mover derecha |

**Objetivo:** Meter goles. Primero en 3 goles gana.

---

## 🌐 Deploy a Internet (Vercel)

Cuando quieras que tu juego esté **online para que otros lo jueguen desde cualquier lugar**, necesitas deployarlo.

### Paso 1: Crear Repositorio en GitHub

1. Ve a **https://github.com**
2. Inicia sesión (o crea cuenta si no tienes)
3. En la esquina superior derecha, ve a **+** → **New repository**
4. Nombre: **haxbol**
5. Descripción: **Multiplayer HaxBall Game**
6. Haz clic en **Create repository**
7. Verás una página con instrucciones. La URL será algo como:
   ```
   https://github.com/tu-usuario/haxbol.git
   ```
   **Cópiala**

### Paso 2: Subir tu código a GitHub

En PowerShell:

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.\deploy.ps1
```

Cuando pida la URL, pega la que copiaste arriba.

Esto subirá tu código a GitHub.

### Paso 3: Conectar a Vercel

1. Ve a **https://vercel.com**
2. Crea una cuenta (gratuita) o inicia sesión
3. Haz clic en **New Project**
4. Busca tu repo **haxbol** y selecciónalo
5. **IMPORTANTE:** Antes de dar clic en Deploy, ve a **Environment Variables**
6. Agrega dos variables:
   - **Nombre:** `VITE_SUPABASE_URL` → **Valor:** (tu URL de Supabase)
   - **Nombre:** `VITE_SUPABASE_ANON_KEY` → **Valor:** (tu ANON KEY)
7. Haz clic en **Deploy**
8. Espera 1-2 minutos
9. ¡Listo! Tu juego estará en: `https://algo.vercel.app` 🎉

---

## 🆘 Troubleshooting

### Problema: "npm: The term 'npm' is not recognized"

**Causa:** Node.js no está instalado

**Solución:**
1. Ve a https://nodejs.org
2. Descarga e instala **LTS**
3. **Reinicia tu PC o abre una nueva PowerShell**
4. Intenta de nuevo

---

### Problema: "EACCES: permission denied" (en Mac/Linux) o error en PowerShell

**Causa:** Permisos de ejecución

**Solución:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.\setup.ps1
```

---

### Problema: "Cannot find module '@supabase/supabase-js'"

**Causa:** Las dependencias no se instalaron

**Solución:**
```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
npm install
```

---

### Problema: "VITE_SUPABASE_URL is not set"

**Causa:** El archivo `.env.local` no existe o está vacío

**Solución:**
1. Ve a tu carpeta `C:\Users\ytpau\Desktop\Haxbol`
2. Crea un archivo llamado `.env.local` (con el punto)
3. Abre con Notepad y pega:
```
VITE_SUPABASE_URL=https://tu-url.supabase.co
VITE_SUPABASE_ANON_KEY=tu-llave-aqui
```
4. Guarda y cierra
5. Ejecuta `npm run dev` de nuevo

---

### Problema: "Port 3000 is already in use"

**Causa:** Ya hay otro servidor corriendo

**Solución:**
```powershell
# Detén el servidor que está corriendo (Ctrl+C)
# Intenta en otro puerto
npm run dev -- --port 3001
```

---

### Problema: Las páginas se cargan pero no pasa nada / está en blanco

**Causa:** Posible problema con las credenciales de Supabase

**Solución:**
1. Abre la **Consola del Navegador** (F12)
2. Ve a **Console** (pestaña)
3. Busca mensajes de error rojos
4. Verifica que `.env.local` tiene las credenciales correctas
5. Si dice "Missing Supabase credentials", el archivo `.env.local` está mal

---

### Problema: "Failed to fetch" o errores de conexión

**Causa:** Supabase no está accesible

**Solución:**
1. Verifica tu conexión a internet
2. Verifica que las credenciales son correctas
3. Ve a https://supabase.com y verifica que tu proyecto está activo
4. Prueba en incógnito (por si hay cache)

---

## ✅ Checklist Final

Antes de considerar que está completo:

- [ ] Node.js instalado (`node --version` funciona)
- [ ] npm funciona (`npm --version` funciona)
- [ ] Carpeta `C:\Users\ytpau\Desktop\Haxbol` existe
- [ ] `.env.local` existe con tus credenciales de Supabase
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona y se abre http://localhost:3000
- [ ] Puedes registrarte e iniciar sesión
- [ ] Puedes hacer clic en **JUGAR**
- [ ] Juego carga y ves el canvas negro
- [ ] (Opcional) Código subido a GitHub
- [ ] (Opcional) Deploy a Vercel funciona

---

## 🎯 Resumen

| Paso | Comando/Acción | Tiempo |
|------|-----------------|--------|
| 1 | Instalar Node.js | 5 min |
| 2 | Obtener credenciales Supabase | 2 min |
| 3 | Ejecutar `.\setup.ps1` | 2-3 min |
| 4 | ¡Jugar! | ♾️ |
| 5 (Opcional) | Ejecutar `.\deploy.ps1` | 2 min |
| 6 (Opcional) | Deploy a Vercel | 2-5 min |

**Total tiempo para tener funcionando localmente: ~15 minutos**
**Total tiempo para tener online: ~25 minutos**

¡Buena suerte! 🚀⚽
