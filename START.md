# 🎮 HAXBALL - START AQUÍ

## ⚡ Resumen Rápido

1. **Instala Node.js** desde https://nodejs.org (versión LTS)
2. **Abre PowerShell** y navega a esta carpeta
3. **Ejecuta el setup**
4. **¡Juega!**

---

## 📋 Instrucciones Paso a Paso

### Paso 1: Instalar Node.js ⏬

1. Ve a **https://nodejs.org**
2. Descarga **LTS** (la versión recomendada)
3. Ejecuta el instalador (.msi)
4. Sigue los pasos (todo por defecto está bien)
5. **Reinicia tu PC** o abre una nueva PowerShell

**Verifica que funcionó:**
```powershell
node --version
npm --version
```

Deberías ver dos números de versión.

---

### Paso 2: Obtén tus Credenciales de Supabase 🔑

1. Ve a **https://supabase.com**
2. **Inicia sesión** con tu cuenta
3. Abre **tu proyecto**
4. En el menú izquierdo, ve a **Settings** → **API**
5. **Copia estas dos cosas:**
   - **Project URL** (ej: `https://xyz123.supabase.co`)
   - **anon public** (es una llave larga que empieza con `eyJ...`)

Guárdalas en un lugar seguro por ahora.

---

### Paso 3: Ejecutar Setup 🚀

Abre **PowerShell** y copia-pega esto:

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.\setup.ps1
```

El script te pedirá que pegues las dos credenciales de Supabase.

**¿Qué pasa?**
- Instala todas las dependencias
- Crea el archivo `.env.local` con tus credenciales
- Inicia el servidor de desarrollo
- Se abrirá automáticamente en tu navegador (http://localhost:3000)

---

### Paso 4: ¡Usa el Juego! 🎮

- **Regístrate** con email y contraseña
- Crea un **nombre de usuario**
- Haz clic en **JUGAR**
- Espera a que se una otro jugador (o abre otra ventana en incógnito)
- **Controles:** WASD o Flechas para moverte

---

## 🌐 Deploy a Internet (Vercel) 🚀

Cuando quieras que tu juego esté **online para que otros lo jueguen**:

### Paso 1: Crea un repositorio en GitHub

1. Ve a **https://github.com**
2. Haz clic en **+** (esquina superior derecha) → **New repository**
3. **Nombre:** `haxbol`
4. **Descripción:** `Multiplayer HaxBall Game`
5. Haz clic en **Create repository**
6. Copia la URL que ves (ej: `https://github.com/tu-usuario/haxbol.git`)

### Paso 2: Sube tu código a GitHub

En PowerShell:

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
.\deploy.ps1
```

Pega la URL de tu repo cuando lo pida.

### Paso 3: Deploy a Vercel

1. Ve a **https://vercel.com**
2. Crea una cuenta (o inicia sesión)
3. Haz clic en **New Project**
4. Selecciona tu repositorio `haxbol` de GitHub
5. **Importante:** Antes de deployar, ve a **Environment Variables** y agrega:
   - **Nombre:** `VITE_SUPABASE_URL`
     **Valor:** (tu URL de Supabase)
   - **Nombre:** `VITE_SUPABASE_ANON_KEY`
     **Valor:** (tu ANON KEY)
6. Haz clic en **Deploy**
7. ¡Listo! Tu juego estará en https://algo.vercel.app 🎉

---

## 🆘 Problemas Comunes

### ❌ "npm: The term 'npm' is not recognized"
→ Node.js no está instalado. Ve a https://nodejs.org y descarga LTS.

### ❌ "EACCES: permission denied"
→ En PowerShell, ejecuta primero:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
```

### ❌ "Cannot find module '@supabase/supabase-js'"
→ Ejecuta `npm install` en la carpeta del proyecto

### ❌ "VITE_SUPABASE_URL is not set"
→ Asegúrate de que `.env.local` existe y tiene tus credenciales

---

## 📞 Necesitas Ayuda?

Si algo no funciona:
1. **Copia el error completo**
2. Verifica que ejecutaste todos los pasos
3. Intenta de nuevo

¡Buena suerte! 🎮⚽
