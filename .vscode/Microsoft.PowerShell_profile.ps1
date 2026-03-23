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
    Set-Location "C:\DevProjects\Mech-Relay"
    Write-Host "Moved to MechRelay project." -ForegroundColor Green
}

function mechui {
    Set-Location "C:\DevProjects\Mech-Relay\client"
    Write-Host "Moved to MechRelay UI folder." -ForegroundColor Green
}

function mechapi {
    Set-Location "C:\DevProjects\Mech-Relay\server"
    Write-Host "Moved to MechRelay API folder." -ForegroundColor Green
}

function devprojects {
    Set-Location "C:\DevProjects"
    Write-Host "Moved to DevProjects root." -ForegroundColor Green
}


# --- SECTION 3: Run Commands ---
function Start-MechUI {
    Set-Location "C:\DevProjects\Mech-Relay\client"
    Write-Host "Starting MechRelay UI..." -ForegroundColor Yellow
    npm run dev
}

function Start-MechAPI {
    Set-Location "C:\DevProjects\Mech-Relay\server"
    Write-Host "Starting MechRelay API..." -ForegroundColor Yellow
    npm run dev
}

function mechfull {
    Write-Host "Launching UI + API in split terminals..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Start-MechUI"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Start-MechAPI"
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
        "3" { mechfull }
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