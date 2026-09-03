param(
  [string]$Repository = "TableTurnerr/Parent-Site"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI is required. Install it, run 'gh auth login', then rerun this script."
}

gh auth status --hostname github.com
if ($LASTEXITCODE -ne 0) {
  throw "Authenticate GitHub CLI with 'gh auth login' as a repository owner, then rerun this script."
}

$protection = @{
  required_status_checks = @{
    strict = $true
    contexts = @("SEO Content Governance")
  }
  enforce_admins = $true
  required_pull_request_reviews = @{
    dismiss_stale_reviews = $true
    require_code_owner_reviews = $false
    required_approving_review_count = 0
    require_last_push_approval = $false
  }
  restrictions = $null
  required_linear_history = $false
  allow_force_pushes = $false
  allow_deletions = $false
  block_creations = $false
  required_conversation_resolution = $true
  lock_branch = $false
  allow_fork_syncing = $true
} | ConvertTo-Json -Depth 5

$tempPath = Join-Path $env:TEMP "tableturnerr-release-protection.json"
try {
  # Windows PowerShell's Set-Content -Encoding utf8 adds a byte-order mark.
  # GitHub's JSON endpoint rejects that leading marker, so write UTF-8 explicitly
  # without one and verify the resulting file before sending it.
  $utf8WithoutBom = [System.Text.UTF8Encoding]::new($false)
  [System.IO.File]::WriteAllText($tempPath, $protection, $utf8WithoutBom)
  $null = Get-Content -LiteralPath $tempPath -Raw | ConvertFrom-Json
  $bytes = [System.IO.File]::ReadAllBytes($tempPath)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    throw "Release-protection JSON unexpectedly contains a UTF-8 byte-order mark."
  }

  gh api --method PUT "repos/$Repository/branches/release/protection" `
    -H "Accept: application/vnd.github+json" `
    -H "X-GitHub-Api-Version: 2022-11-28" `
    --input $tempPath
  if ($LASTEXITCODE -ne 0) {
    throw "GitHub rejected the release protection update. Confirm repository-owner permissions and workflow permissions."
  }
  Write-Host "Release protection configured for $Repository."
}
finally {
  if (Test-Path -LiteralPath $tempPath) {
    Remove-Item -LiteralPath $tempPath -Force
  }
}
