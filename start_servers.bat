@echo off
echo ========================================
echo  Credit Risk Assessment - Full Stack
echo ========================================
echo.

REM Start Backend API
echo [1/2] Starting Backend API Server...
start "Backend API" cmd /k "python api_server.py"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [2/2] Starting Frontend Dev Server...
cd frontend
start "Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo  Servers Started Successfully!
echo ========================================
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:5173
echo  API Docs: http://localhost:8000/docs
echo ========================================
echo.
pause
