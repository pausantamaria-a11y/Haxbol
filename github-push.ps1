# Script: Push a GitHub via API (sin necesidad de Git instalado)
# Este script usa la API de GitHub para subir el código

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  SUBIENDO HAXBALL A GITHUB...                                 ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Necesitaríamos un token de GitHub personal para esto
# Por eso, es mejor hacer el upload via web

Write-Host "Como no tienes Git instalado, vamos a usar el método web:" -ForegroundColor Yellow
Write-Host "`n📋 PASOS MANUALES:" -ForegroundColor White

Write-Host "`n1️⃣ Ve a tu repo vacío en GitHub:" -ForegroundColor Cyan
Write-Host "   https://github.com/pausantamaria-a11y/Haxbol" -ForegroundColor White

Write-Host "`n2️⃣ Haz clic en 'Add file' → 'Upload files'" -ForegroundColor Cyan

Write-Host "`n3️⃣ Arrastra y suelta tu carpeta HAXBOL (excluyendo node_modules):" -ForegroundColor Cyan
Write-Host "   • Selecciona TODO excepto node_modules" -ForegroundColor White
Write-Host "   • O: node_modules está en .gitignore así que no se sube" -ForegroundColor White

Write-Host "`n4️⃣ Haz clic en 'Commit changes'" -ForegroundColor Cyan

Write-Host "`n5️⃣ Espera a que termine de subir" -ForegroundColor Cyan

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host "`n🎯 ALTERNATIVA: Instala Git y usa los comandos de DEPLOY_A_GITHUB.md" -ForegroundColor Yellow

Write-Host "`n✨ Una vez subido a GitHub, puedes deployar a Vercel:" -ForegroundColor Green
Write-Host "   https://vercel.com → New Project → Selecciona tu repo" -ForegroundColor White

Read-Host "`nPresiona Enter para continuar"
