#!/bin/bash

# Start the Flask app in the background
cd /flask_backend
python app.py &
cd ..

# Start the React Native app
cd /teammate_grid
react-native run-ios
