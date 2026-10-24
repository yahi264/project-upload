@echo off
rem Double-click to run the website on this computer, then it opens in the browser.
title Hieron website
cd /d "%~dp0"

where node >/dev/null 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed. The download page is opening now:
  echo install the "LTS" version, then double-click this file again.
  start https://nodejs.org
  pause
  exit /b
)

node -e "process.exit(+process.versions.node.split(\".\")[0] >= 20 ? 0 : 1)"
if errorlevel 1 (
  echo.
  echo Your Node.js is too old. Install the latest "LTS" version, then double-click this file again.
  start https://nodejs.org
  pause
  exit /b
)

if not exist node_modules (
  echo Installing - only the first time, please wait 1-2 minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation failed. Send a screenshot of this window.
    pause
    exit /b
  )
)

echo.
echo Starting the website. KEEP THIS WINDOW OPEN while you look at the site.
echo The browser opens by itself at http://localhost:3000
echo.
start "" cmd /c "timeout /t 10 >/dev/null & start http://localhost:3000/tr"
call npm run dev
pause
