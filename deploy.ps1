# Script de Deploy a Vercel para HaxBall
# Este script prepara el proyecto para subir a GitHub y Vercel

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  DEPLOY A GITHUB Y VERCEL                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan

# 1. Verificar que Git está instalado
Write-Host "`n✓ Verificando Git..." -ForegroundColor Yellow
git --version

# 2. Inicializar repositorio Git
Write-Host "`n✓ Inicializando Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit: HaxBall multiplayer game"

# 3. Pedir URL del repositorio
Write-Host "`n✓ Configurar GitHub..." -ForegroundColor Yellow
$repoUrl = Read-Host "Ingresa la URL de tu repositorio GitHub (ej: https://github.com/tu-usuario/haxbol.git)"

# 4. Agregar remote
git remote add origin $repoUrl

# 5. Push inicial
Write-Host "`n✓ Enviando código a GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "`n✓ Código subido a GitHub!" -ForegroundColor Green
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a https://vercel.com" -ForegroundColor White
Write-Host "2. Crea una cuenta o inicia sesión" -ForegroundColor White
Write-Host "3. Haz clic en 'New Project'" -ForegroundColor White
Write-Host "4. Importa tu repositorio de GitHub" -ForegroundColor White
Write-Host "5. En 'Environment Variables', agrega:" -ForegroundColor White
Write-Host "   - VITE_SUPABASE_URL" -ForegroundColor White
Write-Host "   - VITE_SUPABASE_ANON_KEY" -ForegroundColor White
Write-Host "6. ¡Deploy!" -ForegroundColor White
