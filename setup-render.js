#!/usr/bin/env node

/**
 * Quick Setup Script for Render Deployment
 * Run: node setup-render.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🚀 Ultimate File Converter - Render Deployment Setup\n');
console.log('=' . repeat(60));

// Check if git is initialized
console.log('\n📦 Step 1: Checking Git...');
try {
  execSync('git status', { stdio: 'ignore' });
  console.log('✅ Git repository found');
} catch {
  console.log('⚠️  Git not initialized. Initializing...');
  try {
    execSync('git init', { stdio: 'inherit' });
    console.log('✅ Git initialized');
  } catch (error) {
    console.error('❌ Failed to initialize git:', error.message);
    process.exit(1);
  }
}

// Check if render.yaml exists
console.log('\n📦 Step 2: Checking render.yaml...');
const renderYamlPath = path.join(__dirname, 'render.yaml');
if (fs.existsSync(renderYamlPath)) {
  console.log('✅ render.yaml found');
} else {
  console.error('❌ render.yaml not found. Please create it first.');
  process.exit(1);
}

// Check package.json for required scripts
console.log('\n📦 Step 3: Checking package.json scripts...');
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const requiredScripts = ['build', 'start'];
const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);

if (missingScripts.length > 0) {
  console.error('❌ Missing required scripts:', missingScripts.join(', '));
  process.exit(1);
}
console.log('✅ All required scripts found');

// Check for .env.example
console.log('\n📦 Step 4: Environment variables...');
console.log('ℹ️  Remember to set these in Render dashboard:');
console.log('   - NODE_VERSION=20.11.0');
console.log('   - UPLOADS_DIR=/tmp/uploads');
console.log('   - NEXT_PUBLIC_BASE_URL=<your-render-url>');

console.log('\n' + '='.repeat(60));
console.log('\n✅ Setup complete! Next steps:\n');
console.log('1. Push your code to GitHub:');
console.log('   git add .');
console.log('   git commit -m "Ready for Render deployment"');
console.log('   git remote add origin <your-github-repo-url>');
console.log('   git push -u origin main\n');
console.log('2. Go to https://dashboard.render.com');
console.log('3. Click "New +" → "Blueprint"');
console.log('4. Connect your GitHub repository');
console.log('5. Click "Apply" to deploy\n');
console.log('📖 For detailed instructions, see DEPLOY_RENDER.md\n');
console.log('🎉 Your app will be live in ~5-10 minutes!\n');
