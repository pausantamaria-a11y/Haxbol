# 🚀 GUÍA RÁPIDA DE INSTALACIÓN

## Paso 1: Instalar Node.js

**Node.js no está instalado en tu sistema.** Necesitas instalarlo:

### Opción A: Descarga Manual (Recomendado)
1. Ve a https://nodejs.org
2. Descarga la versión **LTS** (Long Term Support) - versión 20.x o 22.x
3. Ejecuta el instalador (.msi)
4. Sigue los pasos (puedes dejar todo por defecto)
5. Cuando termine, **reinicia tu computadora** o abre una nueva PowerShell

### Opción B: Instala con Windows Package Manager (si tienes WinGet)
```powershell
winget install OpenJS.NodeJS
```

---

## Paso 2: Verificar instalación

Abre PowerShell y ejecuta:
```powershell
node --version
npm --version
```

Deberías ver dos versiones (ej: v20.11.0 y 10.5.0)

---

## Paso 3: Instalar dependencias del proyecto

En PowerShell, navega a tu carpeta del proyecto:

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
npm install
```

Esto descargará React, Vite, Supabase, etc. (tardará 1-2 minutos)

---

## Paso 4: Configurar variables de entorno

Ve a tu carpeta del proyecto (`C:\Users\ytpau\Desktop\Haxbol`) y crea un archivo llamado:
**`.env.local`** (con el punto al inicio)

Dentro de ese archivo, pega esto (reemplaza con TUS valores de Supabase):

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Para encontrar esos valores:**
1. Ve a https://supabase.com
2. Inicia sesión
3. Abre tu proyecto
4. Ve a **Settings** → **API**
5. Copia **Project URL** y **anon public**

---

## Paso 5: Ejecutar en desarrollo

```powershell
npm run dev
```

Se abrirá en http://localhost:3000

---

## Paso 6: Subir a GitHub y Deployar

Cuando todo funcione localmente:

```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/haxbol.git
git push -u origin main
```

Luego ve a https://vercel.com y conecta tu repo. Vercel deployará automáticamente.

---

¿Necesitas ayuda en algún paso? 😊
