# Script de Diagnóstico para HaxBall

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  DIAGNÓSTICO DE HAXBALL                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan

$issues = @()

# 1. Verificar Node.js
Write-Host "`n[1/6] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js NO instalado" -ForegroundColor Red
    $issues += "Node.js no encontrado. Descárgalo de https://nodejs.org"
}

# 2. Verificar npm
Write-Host "`n[2/6] Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm NO instalado" -ForegroundColor Red
    $issues += "npm no encontrado"
}

# 3. Verificar carpeta del proyecto
Write-Host "`n[3/6] Verificando archivos del proyecto..." -ForegroundColor Yellow
$files = @("package.json", "vite.config.js", "index.html", "src/main.jsx")
$missingFiles = @()
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✓ $file existe" -ForegroundColor Green
    } else {
        Write-Host "✗ $file NO existe" -ForegroundColor Red
        $missingFiles += $file
    }
}
if ($missingFiles.Count -gt 0) {
    $issues += "Faltan archivos: $($missingFiles -join ', ')"
}

# 4. Verificar node_modules
Write-Host "`n[4/6] Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules existe" -ForegroundColor Green
} else {
    Write-Host "✗ node_modules NO existe (necesitas ejecutar: npm install)" -ForegroundColor Red
    $issues += "Falta ejecutar 'npm install'"
}

# 5. Verificar .env.local
Write-Host "`n[5/6] Verificando variables de entorno..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    $envContent = Get-Content ".env.local"
    if ($envContent -match "VITE_SUPABASE_URL" -and $envContent -match "VITE_SUPABASE_ANON_KEY") {
        Write-Host "✓ .env.local configurado correctamente" -ForegroundColor Green
    } else {
        Write-Host "✗ .env.local no tiene las credenciales necesarias" -ForegroundColor Red
        $issues += ".env.local no tiene VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY"
    }
} else {
    Write-Host "✗ .env.local NO existe" -ForegroundColor Red
    $issues += "Falta crear .env.local con tus credenciales de Supabase"
}

# 6. Verificar Git (opcional)
Write-Host "`n[6/6] Verificando Git (opcional)..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git instalado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ Git NO instalado (necesario para GitHub, pero opcional por ahora)" -ForegroundColor Yellow
}

# Resumen
Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  RESUMEN                                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "`n✓ ¡Todo está bien! Puedes ejecutar: npm run dev" -ForegroundColor Green
} else {
    Write-Host "`n✗ Se encontraron $($issues.Count) problema(s):`n" -ForegroundColor Red
    $issues | ForEach-Object { Write-Host "  • $_" -ForegroundColor Yellow }
    Write-Host "`nResolve los problemas anteriores y vuelve a ejecutar este diagnóstico." -ForegroundColor White
}

Read-Host "`nPresiona Enter para salir"
