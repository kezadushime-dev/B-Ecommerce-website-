@echo off
echo Starting deployment to Render...

echo Step 1: Installing dependencies...
npm install

echo Step 2: Building the project...
npm run build

echo Step 3: Build completed successfully!
echo Your dist folder is ready for deployment.
echo.
echo Next steps:
echo 1. Push your code to GitHub
echo 2. Connect your GitHub repo to Render
echo 3. Set environment variables in Render dashboard
echo 4. Deploy!

pause