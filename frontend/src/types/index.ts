export interface PredictionRequest {
  age: number;
  income: number;
  loan_amount: number;
  loan_tenure_months: number;
  avg_dpd_per_delinquency: number;
  delinquency_ratio: number;
  credit_utilization_ratio: number;
  num_open_accounts: number;
  residence_type: 'Owned' | 'Rented' | 'Mortgage';
  loan_purpose: 'Education' | 'Home' | 'Auto' | 'Personal';
  loan_type: 'Secured' | 'Unsecured';
}

export interface PredictionResponse {
  default_probability: number;
  credit_score: number;
  rating: 'Poor' | 'Average' | 'Good' | 'Excellent';
  loan_to_income_ratio: number;
}

export interface FormData extends PredictionRequest {}
