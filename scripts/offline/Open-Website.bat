@echo off
rem Double-click to open the Hieron website on this computer (nothing to install).
title Hieron website
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
if errorlevel 1 pause
