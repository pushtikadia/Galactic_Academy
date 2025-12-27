# 🪐 GALACTIC ACADEMY

![Backend](https://img.shields.io/badge/Backend-Python_Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-Three.js_&_WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Design](https://img.shields.io/badge/Design-SciFi_Glassmorphism-00F3FF?style=for-the-badge&logo=css3&logoColor=black)
![Asset Engine](https://img.shields.io/badge/Assets-Procedural_Generation-BC13FE?style=for-the-badge&logo=python&logoColor=white)

**Galactic Academy** is a next-generation "Edutainment" platform that transforms standard planetary data into an immersive **3D Solar System Experience**. It combines a high-performance **Python (Flask)** backend with a reactive **Three.js** rendering engine to create a gamified, interactive universe for students.

---

## ⚡ Key Features

* **🌌 Real-Time 3D Rendering:** Uses **WebGL** to render a living solar system where planets orbit the sun at relative speeds, featuring realistic lighting and rotation mechanics.
* **🖱️ Interactive Exploration:** A "Point & Click" interface where users can select any celestial body to trigger dynamic API calls, retrieving facts and missions instantly.
* **🎨 Procedural Asset Engine:** Includes a custom Python automation script (`setup_assets.py`) that generates high-resolution planetary textures and starfields using the **Pillow** library, ensuring zero missing-asset errors.
* **💠 Neon Glassmorphism UI:** A modern "Dark Mode" interface designed with translucent glass panels, neon glows, and responsive layouts to mimic a futuristic spaceship terminal.
* **📡 Dynamic Data API:** A dedicated Flask REST endpoint (`/api/info/<planet>`) that serves educational content, enabling easy expansion of the knowledge base without touching the frontend code.

---

## 🛠️ Tech Stack

* **Server Core:** Python 3.x (Flask Web Framework)
* **Visual Engine:** JavaScript (Three.js, WebGL)
* **Asset Pipeline:** Python (Pillow/PIL) for texture generation
* **Frontend Design:** HTML5, CSS3 (Custom Variables & Animations)
* **Data Structure:** JSON-based REST API

---

## 🚀 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/galactic-academy.git](https://github.com/yourusername/galactic-academy.git)
    cd galactic-academy
    ```

2.  **Verify Prerequisites**
    * Ensure **Python 3.x** is installed.
    * Install the required dependencies:
    ```bash
    pip install flask pillow
    ```

3.  **Initialize the Universe**
    * Run the auto-asset generator to create the planet textures and starfields.
    ```bash
    python setup_assets.py
    ```
    * *Output should confirm: "🎉 Success! All texture files created."*

4.  **Ignite the Server**
    * Start the Flask backend engine.
    ```bash
    python app.py
    ```

5.  **Launch Mission**
    * Open your browser and navigate to the academy:
    * `http://127.0.0.1:5000`

---

## 🧩 System Architecture

**1. The Visual Core (Three.js Engine):**
The frontend utilizes a `Raycaster` system to detect mouse interactions in 3D space. When a user clicks a planet mesh, the camera calculates the intersection coordinates and identifies the target object (e.g., "Mars").

**2. The Data Bridge (Flask API):**
Upon selection, the frontend dispatches an asynchronous `fetch()` request to the Python backend. The Flask server queries its internal planetary dictionary—acting as a lightweight database—and returns a JSON payload containing the Title, Fact, and Student Activity.

**3. The Texture Pipeline (Asset Generation):**
Unlike standard web apps that rely on static image downloads, Galactic Academy includes a self-healing asset script. If textures are missing, `setup_assets.py` algorithmically draws planetary surfaces and star maps using noise patterns and color tuples, ensuring the 3D model always has a skin to render.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
<p align="center">
  <b> Galactic Academy </b> • Exploring the Cosmos, One Click at a Time
</p>

<p align="center">
  Created by <a href="https://github.com/yourusername"><b>Pushti Kadia</b></a>
</p>




