# 💎 Evol Jewels – AI-Powered Jewelry Kiosk (Fueled 3.0 Hackathon)

> An interactive in-store **mirror kiosk** that acts as a personal jewelry stylist.  
> Built for the **Fueled Content 3.0 Hackathon** by Evol Jewels & Student Tribe.  
> Developed solo by **Khathija Shaik Chintakrindi**.

---

## 🌟 Overview

Evol Jewels aims to revolutionize the in-store jewelry buying experience.  
This project is a **55-inch mirror-based touchscreen kiosk** that greets customers, learns their style through a conversational survey, and uses AI-inspired logic to recommend jewelry pieces — complete with celebrity-style matching and personalized filters.

The prototype demonstrates:
- AI-powered personalization  
- Realistic kiosk interface with animations  
- Extensible architecture ready for real-world deployment  

---

## 🧱 Tech Stack

### 🖥️ Frontend
- **React + TypeScript** – Component-based UI
- **Framer Motion** – Elegant animations and transitions
- **Tailwind CSS + Shadcn UI** – Fast, modern styling
- **React Query** – Smart data fetching and caching
- **Wouter** – Lightweight routing

### ⚙️ Backend
- **Express.js + TypeScript** – RESTful API server
- **PostgreSQL (Drizzle ORM)** – Relational data modeling
- **In-memory storage** – Mock data for quick prototype setup
- **REST API Endpoints** – For celebrities, products, surveys, analytics

---

## ✨ Key Features

| Feature | Description |
|----------|--------------|
| 🪞 Mirror Mode | Wake-up screen mimicking smart mirror reflection |
| 💬 Conversational Survey | Adaptive Q&A flow for style discovery |
| 🌟 Celebrity Style Matching | Matches users with celebrity “vibes” |
| 💍 Product Recommendations | Dynamic filtering by price, style, occasion |
| 📊 Progress Tracking | Step-based navigation for smooth UX |
| 🎞️ Framer Motion Animations | Realistic kiosk transitions and touch effects |
| 📡 REST APIs | `/api/celebrities`, `/api/products`, `/api/surveys`, `/api/analytics` |
| 🧠 Extensible AI Layer | Placeholder hooks for ML/AI service integration |

---

## 🧰 Project Structure

evol-jewels-kiosk/
│
├── frontend/ # React + TS client app
│ ├── src/
│ │ ├── components/ # UI components (Mirror, Survey, Results)
│ │ ├── pages/ # Route views
│ │ ├── api/ # React Query hooks
│ │ ├── utils/ # Helpers, constants
│ │ ├── assets/ # Images, icons
│ │ └── main.tsx # Entry point
│ └── package.json
│
├── backend/ # Express + TS server
│ ├── src/
│ │ ├── routes/ # API endpoints
│ │ ├── models/ # Drizzle ORM schema
│ │ ├── controllers/ # Business logic
│ │ ├── db/ # PostgreSQL setup
│ │ └── server.ts # Express app entry
│ └── package.json
│
├── data/ # Mock JSON data (celebrities, products)
├── docs/ # Architecture diagrams, notes
└── README.md



---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/khathijashaik/evol-jewels-kiosk.git
cd evol-jewels-kiosk

2️⃣ Setup the Backend
cd backend
npm install
npm run dev

This runs an Express.js + TypeScript server with in-memory mock data.

Default API Endpoints

Method	Endpoint	Description
GET	/api/celebrities	Returns list of celebrity profiles
GET	/api/products	Returns jewelry catalog
POST	/api/survey	Submits survey answers & returns recommendations
GET	/api/analytics	Returns mock engagement data


3️⃣ Setup the Frontend
cd ../frontend
npm install
npm run dev
This launches the kiosk UI on http://localhost:5173


Frontend routes (Wouter):

Path	Description
/	Mirror wake-up screen
/survey	Conversational survey flow
/results	Celebrity match & product recommendations


🧠 How It Works

1.User Interaction
The kiosk greets the customer (mirror wake-up).
They answer short, adaptive survey questions.

2. AI Matching Logic
User answers are scored against celebrity “vibes” and mapped to jewelry styles using mock AI.

3. Product Recommendation
Matching Evol Jewels products are fetched and displayed with filtering options.

4.Analytics & Insights
User choices and activity are logged via the /api/analytics endpoint (for future business use).

🔮 Future Enhancements

Integration with real AI model (e.g., OpenAI, Hugging Face) for style prediction

Live trend detection from Instagram/Pinterest APIs

Cloud-based product inventory sync

Multilingual voice-enabled survey flow

Real-time analytics dashboard for store insights


🧑‍💻 Developer Notes

The current prototype uses mock JSON data for celebrities and products.

All AI scoring and recommendations are rule-based for now.

The architecture allows easy replacement of mock logic with real ML services.


🏆 Hackathon Alignment
Criterion	Implementation
User Experience & Design	Clean kiosk UI, mirror visuals, animations
Survey Intelligence	Conversational adaptive flow
Celebrity AI Analysis	Dataset + vibe-based mapping
Recommendation Engine	Dynamic, accurate mock recommendations
Technical Innovation	Modern stack, scalable architecture
Business Viability	Scalable, brand-enhancing in-store experience


📹 Demo Video
 LINK:https://drive.google.com/file/d/1IrQlU97lTt8yVKqHFdAyeXDcHTb-QsUL/view?usp=sharing
 
 
 
 📄 License

This project is built solely for Fueled Content 3.0 Hackathon purposes.
All jewelry images belong to their respective owners.
© 2025 Evol Jewels – Prototype by Khathija Shaik Chintakrindi


🙌 Acknowledgements

Evol Jewels & Student Tribe for organizing the challenge

Fueled by Fountane mentors for guidance

Open-source contributors of React, Tailwind, and Express ecosystems
