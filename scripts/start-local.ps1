param(
  [int]$Port = 5173
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$pidFile = Join-Path $projectRoot '.local-vite.pid'
$stdoutLog = Join-Path $projectRoot '.local-vite.out.log'
$stderrLog = Join-Path $projectRoot '.local-vite.err.log'

$knownProcessId = if (Test-Path -LiteralPath $pidFile) {
  Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue
}

if ($knownProcessId) {
  $knownProcess = Get-Process -Id $knownProcessId -ErrorAction SilentlyContinue
  if ($knownProcess) {
    Write-Output "ALREADY_RUNNING http://127.0.0.1:$Port/ (PID=$knownProcessId)"
    exit 0
  }
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
}

$listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
  Select-Object -First 1

if ($listener) {
  $listener.OwningProcess | Set-Content -LiteralPath $pidFile -Encoding ascii
  Write-Output "ALREADY_RUNNING http://127.0.0.1:$Port/ (PID=$($listener.OwningProcess))"
  exit 0
}

$viteEntry = Join-Path $projectRoot 'node_modules\vite\bin\vite.js'
if (-not (Test-Path -LiteralPath $viteEntry)) {
  throw 'Dependencies are missing. Run npm ci first.'
}

$argumentLine = "node_modules/vite/bin/vite.js --host 127.0.0.1 --port $Port --strictPort"
$process = Start-Process `
  -FilePath 'node.exe' `
  -ArgumentList $argumentLine `
  -WorkingDirectory $projectRoot `
  -WindowStyle Hidden `
  -PassThru `
  -RedirectStandardOutput $stdoutLog `
  -RedirectStandardError $stderrLog

$process.Id | Set-Content -LiteralPath $pidFile -Encoding ascii

for ($attempt = 0; $attempt -lt 20; $attempt++) {
  Start-Sleep -Milliseconds 500
  $listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1
  if ($listener) {
    Write-Output "STARTED http://127.0.0.1:$Port/ (PID=$($listener.OwningProcess))"
    exit 0
  }
}

throw "Local preview did not start. Check $stderrLog."
