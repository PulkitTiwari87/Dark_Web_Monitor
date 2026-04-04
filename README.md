# DARK: Cyber Threat & Dark Web Intelligence Platform

![DARK Platform Overview](https://img.shields.io/badge/Status-Production_Ready-success) ![License](https://img.shields.io/badge/License-MIT-blue)

**DARK** is a state-of-the-art Threat Intelligence Platform designed to monitor, ingest, and analyze dark web chatter and credential leaks. Powered by a custom Python AI/NLP pipeline and a high-performance React dashboard, this platform automatically prioritizes cyber risks associated with leaked data and threat actor activities.

---

## ⚡ Key Features

- **NLP Intelligence Engine:** Automatically parses raw dark web forum data to extract critical entities (IP Addresses, Threat Actor Aliases, Target Domains, and Cryptocurrencies) using `spaCy`.
- **Heuristic Threat Scoring:** Real-time assignment of severity risks (Critical/High/Medium/Low) based on contextual keyword extraction.
- **Data Ingestion Portal:** Dynamically ingest JSON intercepts (Forums) or CSV dumps (Leaked Credentials) straight through the UI.
- **Glassmorphism Visual Dashboard:** A modern, incredibly responsive "Cyber-Dark" themed React frontend utilizing `Recharts` for live threat plotting.
- **Automated PDF Reporting:** Client-side generation of high-quality cyber threat briefing reports using `jsPDF`.
- **RBAC Authentication:** Full JWT token-based operative authorization linked seamlessly to a remote MongoDB Atlas database.

---

## 🛠️ Architecture & Tech Stack

**Backend (Microservice Architecture)**
- **Framework:** FastAPI (Python 3.10+)
- **Database:** MongoDB Atlas (Async `motor` & `pymongo`)
- **Machine Learning:** `spaCy` (en_core_web_sm)
- **Security:** JWT Authentication, `pbkdf2_sha256` hashing (via `passlib`)

**Frontend (Client Presentation)**
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Custom Dark Theme & Glassmorphism)
- **Visuals:** `Recharts`, `Lucide-React`
- **Data Fetching:** Axios (Asynchronous Polling)
- **Reporting:** `jspdf` & `jspdf-autotable`

---

## 🚀 Local Development Setup

### 1. Clone the Codebase
```bash
git clone https://github.com/your-username/dark-web-monitor.git
cd dark-web-monitor
```

### 2. Configure the Backend (FastAPI Engine)
Navigate to the `backend` directory and set up the Python environment:
```bash
cd backend
python -m venv venv

# Windows Prompt:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

**Environment Variables:**
Create a `.env` file inside `/backend` (refer to `.env.example`):
```env
MONGODB_URL="mongodb+srv://<username>:<password>@cluster0.abc.mongodb.net/?retryWrites=true&w=majority"
SECRET_KEY="your-secure-random-secret-key"
```

Start the API Server:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Configure the Frontend (React / Vite)
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```

The system will now be live at `http://localhost:3000`. Create an operative profile to access the intelligence feeds.

---

## 🌍 Production Deployment Guide

Ready to push your platform to the public internet? Here is the recommended hosting architecture:

### 1. Deploy the Database (MongoDB Atlas)
- Make sure your MongoDB Atlas instance Network Access is set to allow connections from `0.0.0.0/0` (or specifically from your Backend host IP).

### 2. Deploy the Python Backend (Render / Railway)
The backend is completely stateless and ready for PaaS platforms.
1. Create a "New Web Service" on [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Point it to this GitHub repository.
3. **Build Command:** `pip install -r backend/requirements.txt && python -m spacy download en_core_web_sm`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Inject your `.env` variables into the platform dashboard.

### 3. Deploy the Frontend (Vercel / Netlify)
1. In `frontend/src/App.jsx`, update the `axios` URLs to point to your new LIVE Python backend URL instead of `http://127.0.0.1:8000`.
2. Connect the repository to [Vercel](https://vercel.com).
3. Set the Root Directory to `frontend`.
4. Deploy. Vercel will auto-detect Vite and build the dashboard globally.

---

*Disclaimer: This platform was built for conceptual cybersecurity analysis and intelligence monitoring. It strictly processes synthesized/simulated datasets for Threat Intelligence demonstration purposes.*
