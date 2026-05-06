# 🎮 HAXBALL - PASO A PASO PARA PONER ONLINE

## 📋 ¿Dónde está mi proyecto?

```
C:\Users\ytpau\Desktop\Haxbol\
```

Está **100% completado** y listo para subir a GitHub.

---

## 🌐 Cómo ponerlo ONLINE (3 pasos)

### Paso 1: Crear repositorio en GitHub ⚙️

1. Abre https://github.com/new
2. Nombre: **Haxbol**
3. Descripción: **Multiplayer HaxBall Game**
4. Selecciona **Public**
5. Clic en **Create repository**

✅ Listo, tienes tu repo vacío en GitHub

---

### Paso 2: Subir el código 📤

**Opción A: CON GIT** (si lo instalas)

```powershell
cd "C:\Users\ytpau\Desktop\Haxbol"
git init
git config user.name "pausantamaria-a11y"
git config user.email "pau.santamaria@inslapineda.cat"
git add .
git commit -m "Initial commit: HaxBall multiplayer game"
git remote add origin https://github.com/pausantamaria-a11y/Haxbol.git
git branch -M main
git push -u origin main
```

**Opción B: SIN GIT** (Upload web)

1. Ve a tu repo en https://github.com/pausantamaria-a11y/Haxbol
2. Haz clic en **Add file** → **Upload files**
3. Arrastra toda tu carpeta `Haxbol`
4. Commit

✅ Tu código está en GitHub

---

### Paso 3: Deploy a Vercel 🚀

1. Ve a https://vercel.com
2. Inicia sesión (o crea cuenta con GitHub)
3. Haz clic en **New Project**
4. Selecciona tu repo `Haxbol`
5. **⚠️ IMPORTANTE:** Antes de dar Deploy, ve a **Environment Variables**
6. Agrega estas dos variables:

```
VITE_SUPABASE_URL = https://btznzavyoxxchowrjzae.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0em56YXZ5b3h4Y2hvd3JqemFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTU1NDksImV4cCI6MjA5MzYzMTU0OX0.RcmvDg22GA9AGssJ_eDE4n9b1T9OQi_XWobj7ovADuA
```

7. Haz clic en **Deploy**
8. Espera 2-3 minutos

✅ ¡TU JUEGO ESTÁ ONLINE! 🎉

---

## 🎉 ¡Resultado!

Vercel te dará una URL como:
```
https://haxbol-pausantamaria-a11y.vercel.app
```

**Esa es tu URL pública.** Puedes compartirla con tus amigos y ¡todos pueden jugar!

---

## 📱 Para jugar:

1. Abre la URL en tu navegador
2. Haz clic en **Regístrate**
3. Crea una cuenta (email + contraseña + username)
4. Haz clic en **JUGAR**
5. Espera a que se una otro jugador

**Controles:**
- W/A/S/D o Flechas para moverte
- Golpea la pelota al hacer contacto
- Primero en 3 goles gana

---

## 🆘 Problemas?

### ❌ "git is not recognized"
→ Instala Git desde https://git-scm.com

### ❌ "Cannot push to GitHub"
→ Asegúrate de que el repo existe en https://github.com/pausantamaria-a11y/Haxbol

### ❌ "Vercel shows blank page"
→ Verifica que las variables de entorno están correctas en Vercel Settings

### ❌ "Cannot connect to Supabase"
→ Verifica que tu proyecto en Supabase está activo

---

## 📚 Archivos útiles en tu carpeta:

- `DEPLOY_A_GITHUB.md` - Instrucciones detalladas con Git
- `DEPLOY_SIN_GIT.md` - Instrucciones sin Git
- `.env.local` - Tu configuración (NO subas esto a GitHub)
- `package.json` - Dependencias del proyecto
- `src/` - Todo el código React

---

## 🎊 ¡Eso es todo!

Tu juego está:
✅ Completado  
✅ Configurado  
✅ Listo para subir a GitHub  
✅ Listo para deployar a Vercel  
✅ Listo para que tus amigos jueguen  

**¡Que disfrutes!** 🎮⚽

---

*¿Necesitas más ayuda? Lee los otros archivos .md en tu carpeta.*
