$projectRoot = Split-Path -Parent $PSScriptRoot
$pidFile = Join-Path $projectRoot '.local-vite.pid'

if (-not (Test-Path -LiteralPath $pidFile)) {
  Write-Output 'NOT_RUNNING'
  exit 0
}

$processId = Get-Content -LiteralPath $pidFile -ErrorAction Stop | Select-Object -First 1
if ([string]::IsNullOrWhiteSpace($processId)) {
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
  Write-Output 'NOT_RUNNING'
  exit 0
}

$process = Get-Process -Id $processId -ErrorAction SilentlyContinue

if ($process) {
  Stop-Process -Id $processId -Force
  Write-Output "STOPPED PID=$processId"
} else {
  Write-Output 'NOT_RUNNING'
}

Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
