@echo off
TITLE Hiresense Core (Backend + Frontend)
echo [SYSTEM] Starting Hiresense Platform...

:: Start Backend
echo [BACKEND] Starting on port 5000...
start "Hiresense Backend" cmd /k "cd /d d:\Hiresense\backend && npm run dev"

:: Start Frontend
echo [FRONTEND] Starting on port 5173...
start "Hiresense Frontend" cmd /k "cd /d d:\Hiresense\frontend && npm run dev"

:: Open Browser
timeout /t 5
start http://localhost:5173

echo [SUCCESS] Hiresense is running.
exit
