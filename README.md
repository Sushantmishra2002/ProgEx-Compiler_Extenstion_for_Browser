# ProgEx — Run Code Anywhere
---


<img width="1290" height="620" alt="image" src="https://github.com/user-attachments/assets/8d72dfab-fcd2-417b-9584-c15d163f1b5b" />


---
---


**ProgEx** is a Chrome Extension that allows you to run programming code instantly from any web page — without switching to an IDE or online compiler.  

Whether you are reading documentation, browsing Stack Overflow, or scrolling through GitHub repos, you can highlight a code snippet, click a small floating icon, and immediately see its output in a popup right on the same page.


---

## 📸 Screenshots

|  |  |
|-------------|----------------|
| <img width="474" height="579" alt="image" src="https://github.com/user-attachments/assets/dbb88b11-862f-49ac-9e22-a8423c92754c" />| <img width="471" height="638" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/729a5d2e-1574-4a5b-91e3-52706197a149" />

|






---
---


## 🚀 What is this?

ProgEx is your **mini-universal compiler** inside your browser.  
You don’t need to copy → paste → select language → run on another site.  
Just **select the code** → click the floating **ProgEx icon** → output appears instantly.

---

## ⚙ How it Works

1. **Select code** on any webpage.
2. A small **floating ProgEx icon** appears near the selection.
3. Click the icon.
4. The extension **auto-detects the programming language** or uses your chosen language.
5. It sends the code to a secure **Code Execution API** (Piston API).
6. The API runs your code in a sandbox and returns:
   - Output (standard output)
   - Error logs (if any)
7. The extension displays the results **in a popup overlay** right where you selected the code.

---

## 🛠 Features

- **Select & Run** → Highlight any code snippet and execute instantly.
- **Auto Language Detection** → No need to manually pick the language (still supports manual selection in popup mode).
- **Multiple Language Support** → Python, JavaScript, C++, Java, Go, PHP, and more (50+ supported via Piston API).
- **In-place Output** → View results directly on the same page.
- **Popup IDE Mode** → Optionally open the popup and paste code manually.
- **Error Handling** → Compile/runtime errors displayed neatly.
- **Modern UI** → Professional glassmorphism-inspired design.
- **Dark/Light Mode** (optional customization in code).

---

## 📦 How it’s Created

- **Manifest V3 Chrome Extension** architecture.
- **Content Script** detects text selection, injects floating icon, and handles in-page UI.
- **Service Worker (Background Script)** communicates with the **Piston API** to execute code securely.
- **Popup UI** for manual code execution.
- **CSS + JavaScript** for modern, responsive design.
- **Icons** designed to match the developer theme.


---

## 📋 How to Use

### Method 1: Select & Run (Auto Execution)
1. Highlight any code snippet on a webpage.
2. Click the **floating ProgEx icon** that appears near your selection.
3. The code will run automatically, and the output will be shown **right there**.

### Method 2: Manual Paste & Run
1. Click the ProgEx extension icon in Chrome.
2. Paste your code in the popup window.
3. Select the programming language from the dropdown.
4. Click **Run** to see the output instantly.

---

## 🔧 How to Install Locally

1. Download the latest release `.zip` file and extract it.  
2. Open **Chrome** and go to:
3. Enable **Developer Mode** (toggle in the top right).
4. Click **Load unpacked**.
5. Select the folder containing the extracted extension files.
6. ProgEx will now be available in your Chrome toolbar.

---

## 🌍 How Anyone Can Use It for Themselves

- This extension is open for **personal customization**.
- You can:
- Change the icon in the `icons/` folder.
- Modify styling in `content/content.css` and `ui/popup.css`.
- Add or remove supported languages in the API request function.
- Simply clone, edit, and load it in Developer Mode.

---

## 📜 License

This project is released under the **MIT License** — feel free to modify and distribute with credit.

---

