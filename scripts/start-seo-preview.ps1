[CmdletBinding()]
param(
    [ValidateRange(1, 65535)]
    [int]$Port = 3000,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$url = "http://localhost:$Port"
$mutex = [System.Threading.Mutex]::new($false, 'Local\TableTurnerrSeoPreview')
$hasLock = $false

function Test-LocalPort {
    param([int]$TargetPort)

    $client = [System.Net.Sockets.TcpClient]::new()
    try {
        $task = $client.ConnectAsync('127.0.0.1', $TargetPort)
        if (-not $task.Wait(500)) {
            return $false
        }

        return $client.Connected
    }
    catch {
        return $false
    }
    finally {
        $client.Dispose()
    }
}

try {
    try {
        $hasLock = $mutex.WaitOne([TimeSpan]::FromSeconds(10))
    }
    catch [System.Threading.AbandonedMutexException] {
        $hasLock = $true
    }

    if (-not $hasLock) {
        throw 'Another TableTurnerr preview startup is already in progress. Wait a moment and run this script again.'
    }

    if (Test-LocalPort -TargetPort $Port) {
        Write-Output "PREVIEW_URL=$url"
        Write-Output 'PREVIEW_STATUS=existing-listener-reused'
        Write-Output "A process is already listening on port $Port, so no second preview server was started."
        return
    }

    if ($DryRun) {
        Write-Output "PREVIEW_URL=$url"
        Write-Output 'PREVIEW_STATUS=dry-run'
        return
    }

    $pnpm = Get-Command 'pnpm.cmd' -ErrorAction SilentlyContinue
    if (-not $pnpm) {
        $pnpm = Get-Command 'pnpm' -ErrorAction SilentlyContinue
    }
    if (-not $pnpm) {
        throw 'pnpm is not available. Complete the project dependency setup before starting a preview.'
    }

    $nextDirectory = Join-Path $repositoryRoot '.next'
    New-Item -ItemType Directory -Force -Path $nextDirectory | Out-Null
    $stdoutLog = Join-Path $nextDirectory 'seo-preview.log'
    $stderrLog = Join-Path $nextDirectory 'seo-preview-error.log'

    $process = Start-Process -FilePath $pnpm.Source `
        -ArgumentList @('dev', '--', '--hostname', '127.0.0.1', '--port', $Port) `
        -WorkingDirectory $repositoryRoot `
        -WindowStyle Hidden `
        -RedirectStandardOutput $stdoutLog `
        -RedirectStandardError $stderrLog `
        -PassThru

    $deadline = (Get-Date).AddSeconds(45)
    while ((Get-Date) -lt $deadline) {
        if (Test-LocalPort -TargetPort $Port) {
            Write-Output "PREVIEW_URL=$url"
            Write-Output "PREVIEW_STATUS=started"
            Write-Output "PREVIEW_PID=$($process.Id)"
            return
        }

        if ($process.HasExited) {
            throw "The preview server exited before it was ready. See $stderrLog."
        }

        Start-Sleep -Seconds 1
    }

    if (-not $process.HasExited) {
        Stop-Process -Id $process.Id -Force
    }
    throw "The preview server did not become available within 45 seconds. See $stdoutLog and $stderrLog."
}
finally {
    if ($hasLock) {
        $mutex.ReleaseMutex()
    }
    $mutex.Dispose()
}
