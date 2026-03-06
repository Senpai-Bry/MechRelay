# ============================
#   BRYAN'S POWERSHELL PROFILE
#   Local‑Only, Stable, Clean
# ============================

# --- SECTION 1: Banner ---

function Show-MechBanner {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "        MECHRELAY DEV TERMINAL        " -ForegroundColor Yellow
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host ""
}
Show-MechBanner


# --- SECTION 2: Navigation Shortcuts ---
function mechrelay {
    Set-Location "S:\DevProjects\MechRelay"
    Write-Host "Moved to MechRelay project." -ForegroundColor Green
}

function mechui {
    Set-Location "S:\DevProjects\MechRelay\client"
    Write-Host "Moved to MechRelay UI folder." -ForegroundColor Green
}

function mechapi {
    Set-Location "S:\DevProjects\MechRelay\server"
    Write-Host "Moved to MechRelay API folder." -ForegroundColor Green
}

function devprojects {
    Set-Location "S:\DevProjects"
    Write-Host "Moved to DevProjects root." -ForegroundColor Green
}


# --- SECTION 3: Run Commands (mechrun) ---
function Start-MechUI {
    Set-Location "S:\DevProjects\MechRelay\client"
    Write-Host "Starting MechRelay UI..." -ForegroundColor Yellow
    npm run dev
}

function Start-MechAPI {
    Set-Location "S:\DevProjects\MechRelay\server"
    Write-Host "Starting MechRelay API..." -ForegroundColor Yellow
    npm run dev
}

function Start-MechRelay {
    Write-Host "Which service do you want to run?" -ForegroundColor Cyan
    Write-Host "1) UI" -ForegroundColor Yellow
    Write-Host "2) API" -ForegroundColor Yellow
    Write-Host "3) Both" -ForegroundColor Yellow

    $choice = Read-Host "Enter 1, 2, or 3"

    switch ($choice) {
        "1" { Start-MechUI }
        "2" { Start-MechAPI }
        "3" { 
            Write-Host "Launching UI + API in split terminals..." -ForegroundColor Green
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "Start-MechUI"
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "Start-MechAPI"
        }
        default { Write-Host "Invalid choice." -ForegroundColor Red }
    }
}


# --- SECTION 4: Diagnostics ---
function mechstatus {
    Write-Host ""
    Write-Host "=== MECHRELAY SYSTEM STATUS ===" -ForegroundColor Cyan

    Write-Host "Node version:" -ForegroundColor Yellow
    node -v

    Write-Host "`nNPM version:" -ForegroundColor Yellow
    npm -v

    Write-Host "`nGit version:" -ForegroundColor Yellow
    git --version

    Write-Host "`nCurrent directory:" -ForegroundColor Yellow
    Get-Location

    Write-Host "`nProfile path:" -ForegroundColor Yellow
    Write-Host $PROFILE
}
function mechdoctor {
    param(
        [string]$action = "",
        [switch]$FixAll
    )

    Write-Host "🔧 Running MechRelay System Doctor..." -ForegroundColor Cyan

    # Resolve project root (best-effort): try git, then profile parent folder
    $projectRoot = $null
    if (Get-Command git -ErrorAction SilentlyContinue) {
        try {
            $gitTop = git rev-parse --show-toplevel 2>$null
            if ($gitTop) { $projectRoot = $gitTop.Trim() }
        } catch { }
    }
    if (-not $projectRoot) {
        $profileDir = Split-Path -Parent $PROFILE
        $projectRoot = Split-Path -Parent $profileDir
    }

    $clientPath = Join-Path $projectRoot 'client'

    # Helpers for checking commands and versions
    function Get-ToolVersion($exe, $arguments='--version') {
        if (-not (Get-Command $exe -ErrorAction SilentlyContinue)) { return $null }
        try {
            $out = & $exe $arguments 2>$null
            return ($out -split "`n")[0].Trim()
        } catch { return $null }
    }

    $nodeVer = Get-ToolVersion node '--version'
    if ($nodeVer) { Write-Host "✅ Node.js detected: $nodeVer" -ForegroundColor Green } else { Write-Host "❌ Node.js not found." -ForegroundColor Red }

    $npmVer = Get-ToolVersion npm '--version'
    if ($npmVer) { Write-Host "✅ NPM detected: $npmVer" -ForegroundColor Green } else { Write-Host "❌ NPM not found." -ForegroundColor Red }

    $gitVer = Get-ToolVersion git '--version'
    if ($gitVer) { Write-Host "✅ Git detected: $gitVer" -ForegroundColor Green } else { Write-Host "❌ Git not found." -ForegroundColor Yellow }

    if (Test-Path $projectRoot) { Write-Host "📁 Project root: $projectRoot" -ForegroundColor Green } else { Write-Host "❌ Project root not found (tried $projectRoot)" -ForegroundColor Red }

    $shouldFix = $FixAll.IsPresent -or ($action -eq '--fix-all')
    if ($shouldFix) {
        Write-Host "`n🛠 Running full repair..." -ForegroundColor Yellow

        if (Test-Path (Join-Path $clientPath 'package.json')) {
            Write-Host "📦 Reinstalling UI node modules in $clientPath..." -ForegroundColor Yellow
            Push-Location $clientPath
            try {
                Remove-Item -LiteralPath (Join-Path $clientPath 'node_modules') -Recurse -Force -ErrorAction SilentlyContinue
                & npm install
                Write-Host "✅ Node modules reinstalled." -ForegroundColor Green
            } catch {
                Write-Host "⚠️ Error reinstalling node modules: $_" -ForegroundColor Red
            } finally {
                Pop-Location
            }
        } else {
            Write-Host "ℹ️ No package.json found in $clientPath; skipping node_modules reinstall." -ForegroundColor Yellow
        }

        if ($npmVer) {
            Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
            try { & npm cache clean --force; Write-Host "✅ Cache cleared." -ForegroundColor Green } catch { Write-Host "⚠️ npm cache clean failed: $_" -ForegroundColor Red }
        }

        Write-Host "`n🎉 All repairs completed!" -ForegroundColor Cyan
    }

    Write-Host ""; Write-Host "=== MECHRELAY DOCTOR SUMMARY ===" -ForegroundColor Cyan
    if ($nodeVer) { Write-Host "- Node: $nodeVer" -ForegroundColor Green } else { Write-Host "- Node: missing" -ForegroundColor Red }
    if ($npmVer)  { Write-Host "- NPM:  $npmVer" -ForegroundColor Green } else { Write-Host "- NPM: missing" -ForegroundColor Red }
    if ($gitVer)  { Write-Host "- Git:  $gitVer" -ForegroundColor Green } else { Write-Host "- Git: missing" -ForegroundColor Yellow }
    if (Test-Path $projectRoot) { Write-Host "- Project: $projectRoot" -ForegroundColor Green } else { Write-Host "- Project: not found" -ForegroundColor Red }
}
