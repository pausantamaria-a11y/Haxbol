# 🎮 HAXBALL - INSTRUCCIONES FINALES

## ✅ Estado Actual

Tu proyecto está **100% LISTO** en:
```
C:\Users\ytpau\Desktop\Haxbol\
```

✅ Código completo  
✅ Variables de entorno configuradas (.env.local)  
✅ Supabase conectado  

---

## 🚀 AHORA: Sube a GitHub en 3 MINUTOS

### Opción A: SIN INSTALAR GIT (La más fácil)

**1. Abre tu repo en GitHub:**
```
https://github.com/pausantamaria-a11y/Haxbol
```

**2. Haz clic en "Add file" → "Upload files"**

**3. Selecciona archivos para subir:**
- Abre tu carpeta `C:\Users\ytpau\Desktop\Haxbol`
- Selecciona TODO EXCEPTO la carpeta `node_modules`
- Los archivos importantes son:
  - `src/` (carpeta completa)
  - `package.json`
  - `vite.config.js`
  - `index.html`
  - `.env.example` (NO subas .env.local, ya lo ignora .gitignore)
  - `README.md`
  - `001_initial_schema.sql`
  - Todos los archivos .md

**4. Haz clic en "Commit changes"**

**5. Espera a que termine de subir**

✅ ¡Tu código está en GitHub!

---

### Opción B: CON GIT (Si lo instalas)

Si instalas Git desde https://git-scm.com, abre PowerShell en tu carpeta y ejecuta:

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

✅ Tu código en GitHub en 30 segundos

---

## 🌐 LUEGO: Deploy a Vercel (3 MINUTOS)

**1. Ve a Vercel:**
```
https://vercel.com
```

**2. Inicia sesión con GitHub**
(Si no tienes cuenta, créala con tu GitHub)

**3. Haz clic en "New Project"**

**4. Busca y selecciona tu repositorio "Haxbol"**

**5. IMPORTANTE: Configura las variables de entorno:**

Ve a **Environment Variables** y agrega estas DOS variables:

```
Variable 1:
  Name: VITE_SUPABASE_URL
  Value: https://btznzavyoxxchhwrjzae.supabase.co

Variable 2:
  Name: VITE_SUPABASE_ANON_KEY
  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0em56YXZ5b3h4Y2hvd3JqemFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTU1NDksImV4cCI6MjA5MzYzMTU0OX0.RcmvDg22GA9AGssJ_eDE4n9b1T9OQi_XWobj7ovADuA
```

**6. Haz clic en "Deploy"**

**7. Espera 2-3 minutos**

✅ ¡TU JUEGO ESTÁ ONLINE! 🎉

---

## 🎉 ¡RESULTADO!

Vercel te dará una URL como:
```
https://haxbol-pausantamaria-a11y.vercel.app
```

(O algo similar, Vercel generará el nombre)

**¡Esa es tu URL pública!** 🌐

---

## 🎮 Para jugar:

1. Abre la URL
2. Regístrate (email + contraseña + username)
3. Haz clic en **JUGAR**
4. Espera otro jugador
5. ¡Que comience el partido!

**Controles:**
- W/A/S/D o Flechas = Moverte
- Contacto con pelota = Golpearla
- Primero en 3 goles = Gana

---

## 📊 Resumen de URLs:

| Lugar | URL |
|-------|-----|
| **Tu código** | https://github.com/pausantamaria-a11y/Haxbol |
| **Tu juego online** | https://haxbol-pausantamaria-a11y.vercel.app |
| **Supabase** | https://btznzavyoxxchhwrjzae.supabase.co |

---

## 🆘 Problemas?

❌ "El repo no existe en GitHub"
→ Crea uno nuevo en https://github.com/new

❌ "Las variables de entorno no están"
→ Verifica que las agregaste ANTES de hacer Deploy

❌ "La página es blanca"
→ Verifica las variables de entorno en Vercel Settings

❌ "No puedo jugar"
→ Verifica que Supabase está activo y tu proyecto existe

---

## ✨ ¡Eso es todo!

Solo necesitas:
1. Subir archivos a GitHub (3 min)
2. Conectar a Vercel (2 min)
3. ¡Compartir URL con amigos! (♾️ diversión)

**¡Que disfrutes el juego! 🎮⚽**

---

*Hecho con ❤️ usando React, Vite y Supabase*
