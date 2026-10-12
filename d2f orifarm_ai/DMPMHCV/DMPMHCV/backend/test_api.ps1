$registerUrl = "http://localhost:5000/api/auth/register"
$loginUrl = "http://localhost:5000/api/auth/login"

$registerBody = @{
    name = "Test User"
    email = "test123@farm.com"
    password = "Test123456"
} | ConvertTo-Json

$loginBody = @{
    email = "test123@farm.com"
    password = "Test123456"
} | ConvertTo-Json

Write-Host "================================" -ForegroundColor Cyan
Write-Host "TESTING REGISTER ENDPOINT" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri $registerUrl -Method POST -Body $registerBody -ContentType "application/json" -UseBasicParsing
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody" -ForegroundColor Yellow
    }
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "TESTING LOGIN ENDPOINT" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri $loginUrl -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor White
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody" -ForegroundColor Yellow
    }
}
