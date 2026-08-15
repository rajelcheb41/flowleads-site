$ErrorActionPreference = "Continue"
$root = "C:\Users\rayan\flowleads-lp-draft"
$logDir = Join-Path $root "automation\logs"
$stamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$runLog = Join-Path $logDir "daily-publish-run-$stamp.txt"

Set-Location $root

"=== daily-publish run $stamp ===" | Out-File -FilePath $runLog -Encoding utf8

$promptPath = Join-Path $root "automation\daily-publish-prompt.md"
$claudeExe = "C:\Users\rayan\AppData\Roaming\npm\claude.cmd"
$output = Get-Content -Raw -Encoding utf8 $promptPath | & $claudeExe -p --dangerously-skip-permissions --output-format text 2>&1
$output | Out-File -FilePath $runLog -Append -Encoding utf8

"=== end run (exit code $LASTEXITCODE) ===" | Out-File -FilePath $runLog -Append -Encoding utf8
