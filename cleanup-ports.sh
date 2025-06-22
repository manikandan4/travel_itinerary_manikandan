#!/bin/bash

# Kill any process using port 3000
echo "🧹 Cleaning up port 3000..."

# Find process using port 3000
PID=$(lsof -ti:3000)

if [ ! -z "$PID" ]; then
    echo "Found process $PID using port 3000. Stopping it..."
    kill -9 $PID
    echo "✅ Port 3000 is now free"
else
    echo "✅ Port 3000 is already free"
fi

# Also check port 3001 for backend
echo "🧹 Cleaning up port 3001..."
PID=$(lsof -ti:3001)

if [ ! -z "$PID" ]; then
    echo "Found process $PID using port 3001. Stopping it..."
    kill -9 $PID
    echo "✅ Port 3001 is now free"
else
    echo "✅ Port 3001 is already free"
fi

echo "🎉 All ports cleaned up!"
