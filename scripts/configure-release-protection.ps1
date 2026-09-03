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
  Set-Content -LiteralPath $tempPath -Value $protection -Encoding utf8
  gh api --method PUT "repos/$Repository/branches/release/protection" --input $tempPath
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
