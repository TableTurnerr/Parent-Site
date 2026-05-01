@echo off
title Tableturnerr - Reports Archive Manager
cd /d "%~dp0\.."
set PYTHONIOENCODING=utf-8
set PYTHONUTF8=1
python scripts\manage_reports.py
echo.
echo --- Manager closed. Press any key to close this window. ---
pause >nul
