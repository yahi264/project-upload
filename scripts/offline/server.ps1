# Serves the ready-built website in the "site" folder on this computer and opens it in the browser.
# Needs nothing installed: PowerShell comes with Windows. Started by Open-Website.bat.
$ErrorActionPreference = "Stop"
$root = Join-Path $PSScriptRoot "site"
if (-not (Test-Path (Join-Path $root "index.html"))) {
  Write-Host "The 'site' folder is missing. Unzip the whole archive first, then run Open-Website.bat again." -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

$types = @{
  ".html" = "text/html; charset=utf-8"; ".txt" = "text/plain; charset=utf-8"; ".js" = "application/javascript"
  ".css" = "text/css"; ".json" = "application/json"; ".svg" = "image/svg+xml"; ".png" = "image/png"
  ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".webp" = "image/webp"; ".avif" = "image/avif"
  ".ico" = "image/x-icon"; ".woff" = "font/woff"; ".woff2" = "font/woff2"
}

# First free port from 8080 upwards
$listener = $null
foreach ($port in 8080..8099) {
  try {
    $l = New-Object System.Net.HttpListener
    $l.Prefixes.Add("http://localhost:$port/")
    $l.Start()
    $listener = $l
    break
  } catch { }
}
if (-not $listener) {
  Write-Host "Could not start: ports 8080-8099 are all busy." -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

$url = "http://localhost:$port/"
Write-Host ""
Write-Host "  Hieron website is running at $url" -ForegroundColor Green
Write-Host "  KEEP THIS WINDOW OPEN while you look at the site. Close it to stop."
Write-Host ""
try { Start-Process "${url}tr/" } catch { Write-Host "  Open ${url}tr/ in your browser." }

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart("/")
    $file = Join-Path $root $path
    if (Test-Path $file -PathType Container) { $file = Join-Path $file "index.html" }
    elseif (-not (Test-Path $file -PathType Leaf) -and (Test-Path "$file.html" -PathType Leaf)) { $file = "$file.html" }

    $res = $ctx.Response
    # Never serve anything outside the site folder
    $full = [IO.Path]::GetFullPath($file)
    if ($full.StartsWith([IO.Path]::GetFullPath($root)) -and (Test-Path $full -PathType Leaf)) {
      $res.StatusCode = 200
    } else {
      $res.StatusCode = 404
      $full = Join-Path $root "404.html"
    }
    $ext = [IO.Path]::GetExtension($full).ToLower()
    $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
    $bytes = [IO.File]::ReadAllBytes($full)
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    # The browser closed the connection early; carry on.
  } finally {
    try { $ctx.Response.OutputStream.Close() } catch { }
  }
}
