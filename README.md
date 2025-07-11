﻿# Trendsetter-fashion-influence-website
# 👗 Fashion Influence Platform

A full-stack web application that analyzes **fashion trends** using influencer data and real-time insights. Built using the **MERN** stack — MongoDB, Express.js, React, and Node.js.

> 📊 Stay ahead of the curve by tracking what's trending in the fashion world through social signals and influencer activity.

---

## 🚀 Features

- 🔍 **Influencer Trend Analysis**  
- 🧠 **AI-Powered Data Insights** *(optional future upgrade)*
- 🌐 **Real-Time Fashion Feed**
- 🧵 **Category-based Filtering (Streetwear, Luxury, Indie, etc.)**
- 👥 **User Profiles & Saved Trends**
- 📈 **Analytics Dashboard**

---

## 🛠 Tech Stack

| Frontend   | Backend   | Database | Styling        | Other        |
|------------|-----------|----------|----------------|--------------|
| React.js   | Node.js   | MongoDB  | Tailwind CSS   | Express.js   |
| React Router | Express APIs | Mongoose | Axios       | RESTful APIs |

---

## 📁 Folder Structure

root/
├── client/ # React Frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── api/ # Axios calls
│ └── App.tsx
├── server/ # Express Backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── server.js
└── README.md


## 🔌 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/SeiaShibu/fashion-influence
   cd fashion-influence
1.Install client dependencies
cd client
npm install

2.Install server dependencies

cd ../server
npm install
3.Create .env in /server

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
4.Run both frontend and backend
# In root or using concurrently
npm run dev
