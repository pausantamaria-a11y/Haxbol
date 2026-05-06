@echo off
REM Script para instalar Node.js LTS en Windows
REM Ejecutar como Administrador

echo Descargando Node.js LTS...
powershell -Command "(New-Object System.Net.ServicePointManager).SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/nvm-sh/nvm-windows/master/nvm-setup.exe'))"

echo.
echo Node.js ha sido instalado. Por favor, cierra y reabre PowerShell/CMD
echo Luego ejecuta: npm install
pause
