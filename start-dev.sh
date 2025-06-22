#!/bin/bash

# Enhanced development script using Express dev server
echo "🚀 Starting MADK Travel Blog with Authentication (Express Dev Server)"
echo "=================================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Clean up any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
sleep 1

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if main dependencies are installed (for dev-server)
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚙️  Creating backend environment file..."
    cp backend/.env.example backend/.env
    echo "⚠️  WARNING: Please edit backend/.env with your Google OAuth credentials!"
    echo "   Required: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ALLOWED_EMAILS"
    echo ""
    read -p "Press Enter to continue (you can edit .env later)..."
fi

echo ""
echo "🌟 Starting services..."
echo "Frontend (Express Dev Server): http://localhost:3000"
echo "Backend API: http://localhost:3001"
echo ""
echo "🔐 To test authentication:"
echo "1. Visit: http://localhost:3000/login"
echo "2. Click 'Continue with Google'"
echo "3. Sign in with a whitelisted Gmail account"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start backend in background
echo "🖥️  Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend dev server
echo "🌐 Starting frontend Express dev server..."
node dev-server.js &
FRONTEND_PID=$!

# Wait for user to stop
wait

# Cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "✅ All services stopped"
}

trap cleanup EXIT
