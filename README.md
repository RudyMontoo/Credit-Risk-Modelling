# 🎯 Credit Risk Assessment - Full Stack Application

AI-powered credit risk prediction with a beautiful 3D animated frontend.

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  React Frontend │ ───> │  FastAPI Backend │ ───> │  ML Model       │
│  (Port 5173)    │      │  (Port 8000)     │      │  (artifacts/)   │
│  - Framer Motion│      │  - Pydantic      │      │  - Logistic Reg │
│  - shadcn/ui    │      │  - CORS enabled  │      │  - SMOTE        │
│  - Tailwind CSS │      │  - Auto docs     │      │  - Optuna       │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

## ✨ Features

### Frontend
- 🎨 **3D Animations** - Framer Motion powered card tilts and transitions
- 🌙 **Dark Theme** - Beautiful gradient backgrounds with floating orbs
- 📱 **Responsive** - Works on mobile, tablet, and desktop
- ⚡ **Fast** - Built with Vite for lightning-fast dev experience
- 🎭 **shadcn/ui** - 10 premium UI components
- 🔔 **Toast Notifications** - Real-time feedback

### Backend
- 🚀 **FastAPI** - Modern, fast Python API framework
- 📊 **ML Model** - Trained LogisticRegression with SMOTE
- 🔒 **Type Safe** - Pydantic validation on all inputs
- 📖 **Auto Docs** - Interactive API documentation
- 🌐 **CORS Enabled** - Ready for frontend integration

### ML Model
- 🤖 **Algorithm**: Logistic Regression
- ⚖️ **Balancing**: SMOTE (Synthetic Minority Over-sampling)
- 🎯 **Optimization**: Optuna hyperparameter tuning
- 📈 **Score Range**: 300-900 (Poor → Average → Good → Excellent)
- 📊 **Features**: 13 engineered features

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn

### Option 1: Automated Start (Windows)
```bash
# Double-click or run:
start_servers.bat
```

### Option 2: Manual Start

**Backend:**
```bash
# Install dependencies
pip install -r requirements.txt

# Start API server
python api_server.py
```

**Frontend:**
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 📡 API Endpoints

### POST `/api/predict`
Predict credit risk for a loan application.

**Request:**
```json
{
  "age": 28,
  "income": 1200000,
  "loan_amount": 2560000,
  "loan_tenure_months": 36,
  "avg_dpd_per_delinquency": 20,
  "delinquency_ratio": 30,
  "credit_utilization_ratio": 30,
  "num_open_accounts": 2,
  "residence_type": "Owned",
  "loan_purpose": "Home",
  "loan_type": "Secured"
}
```

**Response:**
```json
{
  "default_probability": 0.15,
  "credit_score": 720,
  "rating": "Good",
  "loan_to_income_ratio": 2.13
}
```

### GET `/api/health`
Health check endpoint.

### GET `/api/model-info`
Get model metadata.

### GET `/docs`
Interactive API documentation (Swagger UI).

## 📁 Project Structure

```
credit-risk-assessment/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── InputForm.tsx
│   │   │   ├── ResultCards.tsx
│   │   │   └── BackgroundEffects.tsx
│   │   ├── lib/
│   │   │   ├── api.ts       # API client
│   │   │   └── utils.ts
│   │   ├── types/
│   │   │   └── index.ts     # TypeScript types
│   │   └── App.tsx
│   └── package.json
├── app/
│   ├── main.py              # Original Streamlit app
│   └── prediction_helper.py # ML prediction logic
├── artifacts/
│   └── model_data.joblib    # Trained ML model
├── dataset/
│   ├── customers.csv        # Training data
│   ├── loans.csv
│   └── bureau_data.csv
├── api_server.py            # FastAPI backend
├── requirements.txt         # Python dependencies
├── start_servers.bat        # Quick start script
└── README.md
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - 3D animations
- **shadcn/ui** - UI components
- **Axios** - HTTP client
- **Sonner** - Toast notifications

### Backend
- **FastAPI** - Web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### ML Stack
- **scikit-learn** - ML algorithms
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization

## 🔧 Development

### Backend Development
```bash
# Run with auto-reload
python api_server.py

# Access API docs
open http://localhost:8000/docs
```

### Frontend Development
```bash
cd frontend

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Model Details

### Input Features (11)
1. **Personal**: Age, Income
2. **Loan**: Amount, Tenure, Purpose, Type
3. **Credit History**: DPD, Delinquency Ratio, Credit Utilization
4. **Accounts**: Number of Open Accounts
5. **Residence**: Type (Owned/Rented/Mortgage)

### Engineered Features
- Loan to Income Ratio
- Delinquency Ratio
- Average DPD per Delinquency
- One-hot encoded categorical variables

### Output
- **Default Probability**: 0-1 (likelihood of default)
- **Credit Score**: 300-900 scale
- **Rating**: Poor / Average / Good / Excellent

## 🎯 Credit Score Ranges

| Score Range | Rating    | Color  |
|-------------|-----------|--------|
| 300-499     | Poor      | 🔴 Red |
| 500-649     | Average   | 🟠 Orange |
| 650-749     | Good      | 🔵 Blue |
| 750-900     | Excellent | 🟢 Green |

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Module not found:**
```bash
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# Kill the process or change port in vite.config.ts
```

**Build errors:**
```bash
cd frontend
rm -rf node_modules
npm install
```

## 📝 License

This project is for educational purposes.

## 🙏 Acknowledgments

- ML model trained using Jupyter notebooks
- UI components from shadcn/ui
- Animations powered by Framer Motion

---

**Built with ❤️ using React, FastAPI, and Machine Learning**
