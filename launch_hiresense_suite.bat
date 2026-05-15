@echo off
TITLE Hiresense Full Stack Intelligence Control
echo [SYSTEM] Initiating full stack automation...

:: 1. Start Backend
echo [BACKEND] Starting AI Core on port 5000...
start cmd /k "cd /d d:\Hiresense\backend && npm run dev"

:: 2. Start Frontend
echo [FRONTEND] Starting User Interface on port 5173...
start cmd /k "cd /d d:\Hiresense\frontend && npm run dev"

:: 3. Start Claude Proxy (NVIDIA NIM)
:: WARNING: Update the path below if you move your proxy folder!
echo [PROXY] Starting Claude Proxy on port 8082...
set "PROXY_PATH=C:\Windows\System32\free-claude-code"
start cmd /k "cd /d %PROXY_PATH% && set NVIDIA_NIM_API_KEY=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 && set MODEL_OPUS=nvidia_nim/meta/llama-3.3-70b-instruct && set MODEL_SONNET=nvidia_nim/meta/llama-3.3-70b-instruct && set MODEL_HAIKU=nvidia_nim/meta/llama-3.1-8b-instruct && set MODEL=nvidia_nim/meta/llama-3.1-8b-instruct && set ENABLE_THINKING=true && uv run uvicorn server:app --host 0.0.0.0 --port 8082"

echo [SUCCESS] All systems active.
echo [LINK] Frontend: http://localhost:5173
echo [LINK] Backend: http://localhost:5000
echo [LINK] Proxy: http://localhost:8082

:: Wait for frontend to warm up then open browser
timeout /t 5
start http://localhost:5173

exit
