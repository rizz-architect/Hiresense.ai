@echo off
TITLE Claude Proxy (NVIDIA NIM)
echo [SYSTEM] Starting Claude Proxy Server...

:: 1. Kill any existing proxy processes to release file locks
echo [SYSTEM] Cleaning up existing sessions...
taskkill /F /IM uvicorn.exe /T 2>nul
taskkill /F /IM python.exe /T 2>nul

:: Configuration
set "PROXY_PATH=D:\free-claude-code"
set NVIDIA_NIM_API_KEY=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
set MODEL_OPUS=nvidia_nim/meta/llama-3.3-70b-instruct
set MODEL_SONNET=nvidia_nim/meta/llama-3.3-70b-instruct
set MODEL_HAIKU=nvidia_nim/meta/llama-3.1-8b-instruct
set MODEL=nvidia_nim/meta/llama-3.1-8b-instruct
set ENABLE_THINKING=true

cd /d "%PROXY_PATH%"

:: Always run sync to ensure environment is healthy (very fast if no changes)
echo [PROXY] Synchronizing environment...
uv sync

:: Start the Proxy Server in the current window
echo [PROXY] Launching uvicorn on port 8082...

:: Open a second window for the Claude Interface
start "Claude Interface" cmd /k "echo [SYSTEM] Waiting for proxy to wake up... && timeout /t 8 /nobreak >nul && echo [SYSTEM] Launching Claude Interface... && set ANTHROPIC_BASE_URL=http://127.0.0.1:8082 && set ANTHROPIC_AUTH_TOKEN=freecc && C:\Users\iamra\AppData\Roaming\npm\claude.cmd"

:: Run the server using the absolute path to the environment's python
echo [PROXY] Starting server with local environment...
.venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8082 --log-level debug

pause
