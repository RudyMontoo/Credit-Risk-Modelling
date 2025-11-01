"""
Credit Risk Assessment API Server
A minimal FastAPI wrapper around the existing prediction logic.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime
import sys
sys.path.append('app')
from prediction_helper import predict

# ============================================================================
# Pydantic Models
# ============================================================================

class PredictionRequest(BaseModel):
    """Request model for credit risk prediction"""
    age: int = Field(..., ge=18, le=100, description="Applicant age")
    income: float = Field(..., gt=0, description="Annual income")
    loan_amount: float = Field(..., gt=0, description="Requested loan amount")
    loan_tenure_months: int = Field(..., ge=1, le=360, description="Loan tenure in months")
    avg_dpd_per_delinquency: float = Field(..., ge=0, description="Average days past due")
    delinquency_ratio: float = Field(..., ge=0, le=100, description="Delinquency ratio %")
    credit_utilization_ratio: float = Field(..., ge=0, le=100, description="Credit utilization %")
    num_open_accounts: int = Field(..., ge=1, le=10, description="Number of open accounts")
    residence_type: Literal["Owned", "Rented", "Mortgage"]
    loan_purpose: Literal["Education", "Home", "Auto", "Personal"]
    loan_type: Literal["Secured", "Unsecured"]

    class Config:
        json_schema_extra = {
            "example": {
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
        }


class PredictionResponse(BaseModel):
    """Response model for credit risk prediction"""
    default_probability: float = Field(..., description="Probability of default (0-1)")
    credit_score: int = Field(..., ge=300, le=900, description="Credit score (300-900)")
    rating: Literal["Poor", "Average", "Good", "Excellent"]
    loan_to_income_ratio: float = Field(..., description="Loan to income ratio")


# ============================================================================
# FastAPI App Configuration
# ============================================================================

app = FastAPI(
    title="Credit Risk Assessment API",
    description="AI-powered credit risk prediction using machine learning",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative React port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Credit Risk Assessment API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "predict": "/api/predict",
            "health": "/api/health",
            "model_info": "/api/model-info",
            "docs": "/docs"
        }
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "service": "credit-risk-api"
    }


@app.get("/api/model-info")
async def model_info():
    """Get model information"""
    return {
        "model_type": "LogisticRegression",
        "features": 13,
        "version": "1.0.0",
        "training_method": "SMOTE + Optuna",
        "score_range": "300-900"
    }


@app.post("/api/predict", response_model=PredictionResponse)
async def predict_credit_risk(request: PredictionRequest):
    """
    Predict credit risk for a loan application
    
    Returns:
    - default_probability: Likelihood of loan default (0-1)
    - credit_score: Credit score on 300-900 scale
    - rating: Credit rating (Poor/Average/Good/Excellent)
    - loan_to_income_ratio: Calculated LTI ratio
    """
    try:
        # Call the existing prediction function
        probability, credit_score, rating = predict(
            age=request.age,
            income=request.income,
            loan_amount=request.loan_amount,
            loan_tenure_months=request.loan_tenure_months,
            avg_dpd_per_delinquency=request.avg_dpd_per_delinquency,
            delinquency_ratio=request.delinquency_ratio,
            credit_utilization_ratio=request.credit_utilization_ratio,
            num_open_accounts=request.num_open_accounts,
            residence_type=request.residence_type,
            loan_purpose=request.loan_purpose,
            loan_type=request.loan_type
        )
        
        # Calculate loan to income ratio
        loan_to_income = round(request.loan_amount / request.income, 2)
        
        return PredictionResponse(
            default_probability=round(probability, 4),
            credit_score=credit_score,
            rating=rating,
            loan_to_income_ratio=loan_to_income
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# ============================================================================
# Server Entry Point
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Credit Risk Assessment API...")
    print("📊 Model loaded from artifacts/model_data.joblib")
    print("🌐 Server running at http://localhost:8000")
    print("📖 API docs available at http://localhost:8000/docs")
    
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
