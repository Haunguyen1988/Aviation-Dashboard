#!/usr/bin/env python3
"""Generate aviation-themed backgrounds for technical specification document"""
from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "/mnt/okcomputer/output/bg_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGE_W = 794
PAGE_H = 1123

# Aviation Dashboard Theme - Dark Navy Professional
COLORS = {
    'navy': '#2C3E50',
    'teal': '#1ABC9C',
    'orange': '#E67E22',
    'dark': '#1A252F',
    'light': '#ECF0F1',
}

# Cover - Professional Aviation Dashboard Theme
COVER_BG_HTML = f'''
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
    width: {PAGE_W}px;
    height: {PAGE_H}px;
    background: linear-gradient(145deg, {COLORS['navy']} 0%, {COLORS['dark']} 100%);
    position: relative;
    overflow: hidden;
}}

/* Top-right glow effect */
.glow-1 {{
    position: absolute;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse at center,
        {COLORS['teal']}30 0%,
        {COLORS['teal']}10 40%,
        transparent 70%
    );
    border-radius: 50%;
}}

/* Bottom-left glow */
.glow-2 {{
    position: absolute;
    bottom: -250px;
    left: -200px;
    width: 700px;
    height: 700px;
    background: radial-gradient(ellipse at center,
        {COLORS['orange']}20 0%,
        {COLORS['orange']}08 45%,
        transparent 70%
    );
    border-radius: 50%;
}}

/* Center accent glow */
.glow-3 {{
    position: absolute;
    top: 40%;
    right: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(ellipse at center,
        {COLORS['teal']}15 0%,
        transparent 60%
    );
    border-radius: 50%;
}}

/* Top accent bar - Teal */
.accent-bar {{
    position: absolute;
    top: 60px;
    left: 60px;
    width: 160px;
    height: 5px;
    background: linear-gradient(90deg, {COLORS['teal']}, {COLORS['teal']}80);
    border-radius: 3px;
}}

/* Grid pattern overlay */
.grid-pattern {{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        linear-gradient({COLORS['light']}05 1px, transparent 1px),
        linear-gradient(90deg, {COLORS['light']}05 1px, transparent 1px);
    background-size: 50px 50px;
}}

/* Bottom corner decoration */
.corner-accent {{
    position: absolute;
    bottom: 60px;
    right: 60px;
    width: 80px;
    height: 80px;
    border: 2px solid {COLORS['teal']}40;
    border-radius: 8px;
    transform: rotate(45deg);
}}

/* Small dots pattern */
.dots {{
    position: absolute;
    bottom: 150px;
    left: 60px;
    width: 100px;
    height: 60px;
    background-image: radial-gradient({COLORS['teal']}40 2px, transparent 2px);
    background-size: 15px 15px;
}}
</style>
</head>
<body>
    <div class="grid-pattern"></div>
    <div class="glow-1"></div>
    <div class="glow-2"></div>
    <div class="glow-3"></div>
    <div class="accent-bar"></div>
    <div class="corner-accent"></div>
    <div class="dots"></div>
</body>
</html>
'''

# Back Cover - Mirrored theme
BACKCOVER_BG_HTML = f'''
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
    width: {PAGE_W}px;
    height: {PAGE_H}px;
    background: linear-gradient(215deg, {COLORS['navy']} 0%, {COLORS['dark']} 100%);
    position: relative;
    overflow: hidden;
}}

/* Bottom-left glow */
.glow-1 {{
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(ellipse at center,
        {COLORS['teal']}25 0%,
        {COLORS['teal']}08 40%,
        transparent 70%
    );
    border-radius: 50%;
}}

/* Top-right glow */
.glow-2 {{
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(ellipse at center,
        {COLORS['orange']}18 0%,
        transparent 65%
    );
    border-radius: 50%;
}}

/* Grid pattern */
.grid-pattern {{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        linear-gradient({COLORS['light']}05 1px, transparent 1px),
        linear-gradient(90deg, {COLORS['light']}05 1px, transparent 1px);
    background-size: 50px 50px;
}}

/* Top accent */
.top-accent {{
    position: absolute;
    top: 60px;
    right: 60px;
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, {COLORS['teal']}80, {COLORS['teal']});
    border-radius: 2px;
}}

/* Corner decoration */
.corner-accent {{
    position: absolute;
    bottom: 60px;
    left: 60px;
    width: 60px;
    height: 60px;
    border: 2px solid {COLORS['teal']}30;
    border-radius: 50%;
}}
</style>
</head>
<body>
    <div class="grid-pattern"></div>
    <div class="glow-1"></div>
    <div class="glow-2"></div>
    <div class="top-accent"></div>
    <div class="corner-accent"></div>
</body>
</html>
'''

# Body pages - Clean professional with subtle accents
BODY_BG_HTML = f'''
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
    width: {PAGE_W}px;
    height: {PAGE_H}px;
    background: #FFFFFF;
    position: relative;
    overflow: hidden;
}}

/* Top gradient band */
.top-gradient {{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(180deg,
        {COLORS['navy']}08 0%,
        {COLORS['navy']}03 50%,
        transparent 100%
    );
}}

/* Left side accent bar */
.side-bar {{
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg,
        {COLORS['teal']}60 0%,
        {COLORS['teal']}30 30%,
        {COLORS['teal']}10 70%,
        transparent 100%
    );
}}

/* Bottom-right subtle decoration */
.corner-blob {{
    position: absolute;
    bottom: -60px;
    right: -60px;
    width: 150px;
    height: 150px;
    background: radial-gradient(ellipse at center,
        {COLORS['navy']}06 0%,
        transparent 70%
    );
    border-radius: 50%;
}}
</style>
</head>
<body>
    <div class="top-gradient"></div>
    <div class="side-bar"></div>
    <div class="corner-blob"></div>
</body>
</html>
'''

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={'width': PAGE_W, 'height': PAGE_H},
            device_scale_factor=2
        )
        
        page.set_content(COVER_BG_HTML)
        page.screenshot(path=os.path.join(OUTPUT_DIR, 'cover_bg.png'), type='png')
        print("Generated: cover_bg.png")
        
        page.set_content(BACKCOVER_BG_HTML)
        page.screenshot(path=os.path.join(OUTPUT_DIR, 'backcover_bg.png'), type='png')
        print("Generated: backcover_bg.png")
        
        page.set_content(BODY_BG_HTML)
        page.screenshot(path=os.path.join(OUTPUT_DIR, 'body_bg.png'), type='png')
        print("Generated: body_bg.png")
        
        browser.close()
    print("All aviation-themed backgrounds generated!")

if __name__ == '__main__':
    main()
