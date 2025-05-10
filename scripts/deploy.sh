#!/bin/bash
set -e  # Exit on any error

# Get the branch name from argument, default to 'main'
BRANCH=${1:-main}

echo "🚀 Deploying Web - ichha-ui from branch: $BRANCH..."

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/dist"

echo "📂 Current Directory: $SCRIPT_DIR"
echo "📂 Project Root: $PROJECT_ROOT"

# Navigate to the project root
cd "$PROJECT_ROOT"

# Ensure we're on the correct branch
echo "🔄 Checking out branch: $BRANCH"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"
echo "✅ Git pull completed."

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed."

# Print Node.js and NPM versions
echo "🛠 Node Version: $(node -v)"
echo "🛠 NPM Version: $(npm -v)"

# Build the project
echo "🏗 Building the project..."
npm run build
echo "✅ Build completed."

# Verify and list build directory
if [ -d "$BUILD_DIR" ]; then
    echo "📂 Build directory exists: $BUILD_DIR"
    ls -lh "$BUILD_DIR"
else
    echo "❌ Build directory not found!"
    exit 1
fi

# Deploy the built files (Add actual deployment logic)
echo "🚀 Web - ichha-ui deployment completed!"
