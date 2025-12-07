# Comprehensive script to verify and commit all files for Vercel deployment
cd "c:\Users\avish\VS Code\Assignment\House of EdTech"

Write-Host "=== Verifying Required Files ===" -ForegroundColor Cyan

# Check if all required component files exist
$requiredFiles = @(
    "components\ui\button.tsx",
    "components\ui\card.tsx",
    "components\ui\dialog.tsx",
    "components\ui\input.tsx",
    "components\ui\label.tsx",
    "components\ui\textarea.tsx",
    "components\ui\toast.tsx",
    "components\ui\toaster.tsx",
    "components\ui\use-toast.ts",
    "components\auth\LoginForm.tsx",
    "components\auth\RegisterForm.tsx",
    "components\tasks\CreateTaskDialog.tsx",
    "components\tasks\EditTaskDialog.tsx",
    "components\tasks\TaskItem.tsx",
    "components\tasks\TaskList.tsx",
    "components\Footer.tsx",
    "components\Navbar.tsx",
    "lib\utils.ts",
    "tsconfig.json",
    "jsconfig.json",
    "next.config.js"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        Write-Host "✗ MISSING: $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "`nERROR: Missing required files!" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Adding All Files to Git ===" -ForegroundColor Cyan
git add -A

Write-Host "`n=== Files to be Committed ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Committing Files ===" -ForegroundColor Cyan
git commit -m "fix: configure path aliases and ensure all component files are committed for Vercel deployment"

Write-Host "`n=== Pushing to Remote ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Verification Complete ===" -ForegroundColor Green
Write-Host "All files should now be in the repository and ready for Vercel deployment!" -ForegroundColor Green
