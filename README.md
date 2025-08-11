
ProgEx — Run Code Anywhere (Chrome Extension)
===========================================

Contents:
- manifest.json
- background/service_worker.js
- content/content.js
- content/content.css
- ui/popup.html, popup.css, popup.js
- ui/options.html
- icons/*
- README.md

How it works:
1. Select code on any page -> a small 'Run code' bubble appears.
2. Click the bubble to open the ProgEx popup (or open from toolbar).
3. Choose language, press Run — the extension sends code to the Piston public API (emkc.org) and displays the output.

To install (developer mode):
1. Download and unzip the ProgEx.zip.
2. In Chrome, go to chrome://extensions, enable 'Developer mode'.
3. Click 'Load unpacked' and select the 'ProgEx' folder.
4. Try selecting code on any page and use the toolbar popup or the floating bubble.

Notes & Security:
- The extension uses the public Piston API at https://emkc.org by default. This API is rate-limited and may be unavailable. You may self-host Piston or provide another endpoint in settings.
- Do NOT send sensitive/private code to public execution services.
- This is an MVP; advanced features like syntax highlighting, auto-detection and saved snippets are left as enhancements.

