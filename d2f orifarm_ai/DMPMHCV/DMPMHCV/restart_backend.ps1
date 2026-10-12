# This script will:
# 1. Stop all Python processes (backend servers)
# 2. Delete the old database
# 3. Restart the backend with fresh database

Write-Host "Stopping all Python processes..." -ForegroundColor Yellow
Get-Process python -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "Deleting old database..." -ForegroundColor Yellow
if (Test-Path "backend\instance\site.db") {
    Remove-Item "backend\instance\site.db" -Force
    Write-Host "Database deleted." -ForegroundColor Green
} else {
    Write-Host "No database found (will be created fresh)." -ForegroundColor Green
}

Write-Host "`nStarting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\hp\Pictures\digi\DMPMHCV\DMPMHCV\backend'; python app.py"

Write-Host "`nBackend restarted! Wait 5 seconds then test registration." -ForegroundColor Green
Write-Host "The database will be created automatically with the correct schema." -ForegroundColor Cyan
