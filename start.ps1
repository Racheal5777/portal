# Start the Django app using Waitress (Windows-friendly)
# Usage: Open PowerShell, activate venv, then run: .\start.ps1

$venv = Join-Path $PSScriptRoot 'venv\Scripts\Activate.ps1'
if (Test-Path $venv) {
    . $venv
} else {
    Write-Host "Virtual environment activate script not found at $venv. Activate your venv manually."
}

pip install -r "$PSScriptRoot\requirements.txt"
python "$PSScriptRoot\serve_with_waitress.py"
