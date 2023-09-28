#!/bin/bash

# Start the Flask app in the background
cd flask_backend/
python3 app.py

# Start the React Native app
cd /teammate_grid
react-native run-ios
