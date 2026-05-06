# 🚀 DEPLOY RÁPIDO A VERCEL (SIN GIT)

## Si NO quieres instalar Git, hay una forma más rápida:

### Opción 1: Usar GitHub Web (Sin Git)

1. **Crea un repo en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `Haxbol`
   - Descripción: `Multiplayer HaxBall Game`
   - Selecciona **Public**
   - Haz clic en **Create repository**

2. **Descarga tu proyecto como ZIP**
   - Ve a tu carpeta: `C:\Users\ytpau\Desktop\Haxbol`
   - Selecciona TODO excepto `node_modules`
   - Clic derecho → Enviar a → Carpeta comprimida
   - O comprime manualmente (incluye: src/, package.json, vite.config.js, etc.)

3. **Sube a GitHub:**
   - En tu nuevo repo en GitHub, haz clic en **uploading an existing file**
   - O haz clic en **Add file** → **Upload files**
   - Sube los archivos comprimidos o cada uno
   - Commit

4. **Deploy a Vercel:**
   - https://vercel.com → New Project
   - Selecciona tu repo `Haxbol`
   - Configura variables de entorno (ver abajo)
   - Deploy

---

### Opción 2: Upload directo a GitHub via Web (MÁS FÁCIL)

1. Ve a https://github.com/new
2. Crea repo `Haxbol`
3. Haz clic en **uploading an existing file**
4. Arrastra tu carpeta completa
5. GitHub sube TODO
6. Luego deploy a Vercel

---

## Variables de Entorno para Vercel:

Cuando estés en Vercel creando el proyecto, antes de dar Deploy:

**Environment Variables:**
```
VITE_SUPABASE_URL=https://btznzavyoxxchowrjzae.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0em56YXZ5b3h4Y2hvd3JqemFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTU1NDksImV4cCI6MjA5MzYzMTU0OX0.RcmvDg22GA9AGssJ_eDE4n9b1T9OQi_XWobj7ovADuA
```

---

## 🎉 ¡Resultado!

Tu juego estará en internet en: `https://tuusername-haxbol.vercel.app`

¡Listo! 🚀⚽
