#!/bin/bash

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Function to take screenshot
take_screenshot() {
    local url=$1
    local output=$2
    local width=$3
    local height=$4
    
    /usr/bin/brave-browser \
        --headless \
        --disable-gpu \
        --no-sandbox \
        --disable-setuid-sandbox \
        --window-size=${width},${height} \
        --screenshot="screenshots/${output}" \
        "${url}"
}

# Desktop screenshots
echo "Taking desktop screenshots..."
take_screenshot "http://localhost:8000/index.html" "home-desktop.png" 1600 900
take_screenshot "http://localhost:8000/about.html" "about-desktop.png" 1600 900
take_screenshot "http://localhost:8000/technology.html" "tech-desktop.png" 1600 900
take_screenshot "http://localhost:8000/contact.html" "contact-desktop.png" 1600 900

# Mobile screenshots
echo "Taking mobile screenshots..."
take_screenshot "http://localhost:8000/index.html" "home-mobile.png" 375 812
take_screenshot "http://localhost:8000/about.html" "about-mobile.png" 375 812
take_screenshot "http://localhost:8000/technology.html" "tech-mobile.png" 375 812
take_screenshot "http://localhost:8000/contact.html" "contact-mobile.png" 375 812

echo "Screenshots saved in screenshots/ directory"