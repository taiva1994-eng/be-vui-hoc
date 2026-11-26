@echo off
chcp 65001 >nul
title Bé Vui Học - Máy Chủ Internet (Cloudflare)
echo ======================================================
echo    🌈 BÉ VUI HỌC - KHỞI ĐỘNG MÁY CHỦ INTERNET TỐC ĐỘ CAO
echo ======================================================
echo.

cd /d "%~dp0"
echo [1/2] Đang khởi động máy chủ Web nội bộ...
start /b node server.js

timeout /t 2 /nobreak >nul

echo [2/2] Đang kết nối đường truyền Cloudflare Tunnel...
echo.
echo ======================================================
echo 👉 Bạn mở đường link dưới đây trên điện thoại (4G / Wi-Fi khác):
echo ======================================================
echo.
"C:\Users\Admin\.gemini\antigravity\scratch\cloudflared.exe" tunnel --url http://localhost:3000

pause
