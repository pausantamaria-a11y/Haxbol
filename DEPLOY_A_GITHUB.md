# 🚀 DEPLOY A GITHUB Y VERCEL - GUÍA RÁPIDA

## ⚠️ NECESITAS INSTALAR GIT PRIMERO

### Opción A: Instalador (Recomendado)
1. Ve a https://git-scm.com
2. Descarga **Git for Windows**
3. Ejecuta el instalador (todo por defecto)
4. **Reinicia PowerShell**

### Opción B: Windows Package Manager
```powershell
winget install Git.Git
```

---

## Una vez instalado Git, ejecuta ESTO:

Abre PowerShell en tu carpeta y copia-pega:

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"

# Inicializar Git
git init
git config user.name "pausantamaria-a11y"
git config user.email "pau.santamaria@inslapineda.cat"

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: HaxBall multiplayer game"

# Agregar repositorio remoto
git remote add origin https://github.com/pausantamaria-a11y/Haxbol.git

# Hacer push
git branch -M main
git push -u origin main
```

---

## DESPUÉS, Deploy a Vercel:

1. Ve a https://vercel.com
2. Inicia sesión (o crea cuenta)
3. Haz clic en **New Project**
4. Selecciona tu repo `Haxbol` de GitHub
5. **IMPORTANTE:** Ve a **Environment Variables** y agrega:
   - `VITE_SUPABASE_URL` = `https://btznzavyoxxchowrjzae.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0em56YXZ5b3h4Y2hvd3JqemFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTU1NDksImV4cCI6MjA5MzYzMTU0OX0.RcmvDg22GA9AGssJ_eDE4n9b1T9OQi_XWobj7ovADuA`
6. Haz clic en **Deploy**

---

## 🎉 ¡Listo!

Tu juego estará en: `https://haxbol.vercel.app` (o similar)

---

## 🆘 Problemas?

Si al hacer `git push` te dice que el repo no existe en GitHub:
1. Ve a https://github.com/new
2. Crea un repo llamado `Haxbol`
3. Luego intenta `git push` de nuevo

¡Buena suerte! 🚀
