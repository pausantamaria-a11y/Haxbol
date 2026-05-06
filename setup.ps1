# Script de Setup Automático para HaxBall
# Ejecuta este script después de instalar Node.js

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  SETUP AUTOMÁTICO - HAXBALL              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan

# Verificar Node.js
Write-Host "`n✓ Verificando Node.js..." -ForegroundColor Yellow
node --version
npm --version

# Instalar dependencias
Write-Host "`n✓ Instalando dependencias..." -ForegroundColor Yellow
npm install

# Pedir credenciales de Supabase
Write-Host "`n✓ Configurar Supabase..." -ForegroundColor Yellow
$url = Read-Host "Ingresa tu VITE_SUPABASE_URL (ej: https://xyz.supabase.co)"
$key = Read-Host "Ingresa tu VITE_SUPABASE_ANON_KEY"

# Crear .env.local
$envContent = @"
VITE_SUPABASE_URL=$url
VITE_SUPABASE_ANON_KEY=$key
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✓ .env.local creado correctamente" -ForegroundColor Green

# Iniciar dev server
Write-Host "`n✓ Iniciando servidor de desarrollo..." -ForegroundColor Yellow
Write-Host "Se abrirá en http://localhost:3000`n" -ForegroundColor Cyan
npm run dev
