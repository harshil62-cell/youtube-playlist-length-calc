# 🎬 YouTube Playlist Length Calculator

A simple web application that calculates the total duration of a public YouTube playlist (up to the first 50 videos).

This project was built to practice using external APIs, creating a secure backend, and deploying a full-stack application.

**Live Demo: [youtube-playlist-length-calculator](https://youtube-playlist-length-calc.netlify.app/)**

---

## 🏗️ Architecture

This project uses a ** decoupled "client-server" architecture**:

* **Frontend (Client):** A static site built with pure HTML, CSS, and JavaScript. It's responsible for taking user input and displaying the final result.
* **Backend (Server):** A Node.js & Express.js server. Its only job is to securely handle the YouTube Data API key, fetch data from Google, perform the calculations, and send a clean response to the frontend.

This separation ensures that the **API key is never exposed** to the user's browser.

---

## 🛠️ Tech Stack

### Frontend (Client)
* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API

### Backend (Server)
* **Node.js**
* **Express.js** (for the server and API endpoint)
* **YouTube Data API v3** (to get playlist data)
* **`cors`** (to allow the frontend to make requests)
* **`dotenv`** (to manage the secret API key)
* **`node-fetch`** (to make API calls from the server)

---

## 🚀 How to Run Locally

You will need two terminals open to run this project.

### 1. Backend Server Setup
1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install all the required packages:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` folder and add your API key:
    ```
    YOUTUBE_API_KEY=YOUR_API_KEY_GOES_HERE
    ```
4.  Start the server:
    ```bash
    node server.js
    ```
    Your backend is now running on `http://localhost:5000` (or your chosen port).

### 2. Frontend Client Setup
1.  Navigate to the `client` directory:
    ```bash
    cd ../client 
    ```
2.  Open the `index.html` file in your browser (using an extension like VS Code's "Live Server" is recommended).
3.  **Important:** Make sure the `fetch` URL in your `client/script.js` points to your local server:
    ```javascript
    // in script.js
    const response = await fetch(`http://localhost:5000/api/playlistInfo?id=${playlistId}`);
    ```

You can now use the application in your local browser!

---

## ☁️ Deployment

This project is deployed using a standard, modern workflow:

* **Frontend:** Deployed as a **Static Site** on **Netlify**.
* **Backend:** Deployed as a **Web Service** on **Render**.
