@echo off
setlocal
cd /d "%~dp0"
if not exist "server\.env" (
  echo.
  echo server\.env is missing.
  echo Copy server\.env.example to server\.env and fill in your MongoDB and Razorpay values.
  echo.
  pause
  exit /b 1
)
start "Tiffin Wallah API" cmd /k "cd /d ""%~dp0server"" && npm start"
timeout /t 5 /nobreak >nul
start "Tiffin Wallah Client" cmd /k "cd /d ""%~dp0client"" && npm run dev"
echo.
echo Backend: http://localhost:5000/api/health
echo Frontend: http://localhost:5173/
