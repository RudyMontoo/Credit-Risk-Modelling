import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormData } from '@/types';

interface InputFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
}

export function InputForm({ onSubmit, loading }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: '' as any,
    income: '' as any,
    loan_amount: '' as any,
    loan_tenure_months: '' as any,
    avg_dpd_per_delinquency: '' as any,
    delinquency_ratio: '' as any,
    credit_utilization_ratio: '' as any,
    num_open_accounts: '' as any,
    residence_type: 'Owned',
    loan_purpose: 'Home',
    loan_type: 'Secured',
  });

  const loanToIncome = formData.income && formData.loan_amount 
    ? ((Number(formData.loan_amount) / Number(formData.income)).toFixed(2))
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert empty strings to numbers before submitting
    const submitData = {
      ...formData,
      age: Number(formData.age) || 0,
      income: Number(formData.income) || 0,
      loan_amount: Number(formData.loan_amount) || 0,
      loan_tenure_months: Number(formData.loan_tenure_months) || 0,
      avg_dpd_per_delinquency: Number(formData.avg_dpd_per_delinquency) || 0,
      delinquency_ratio: Number(formData.delinquency_ratio) || 0,
      credit_utilization_ratio: Number(formData.credit_utilization_ratio) || 0,
      num_open_accounts: Number(formData.num_open_accounts) || 1,
    };
    await onSubmit(submitData);
  };

  const handleNumberChange = (field: keyof FormData, value: string) => {
    // Keep as string to allow empty inputs and show placeholders
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card className="w-full max-w-5xl mx-auto backdrop-blur-sm bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl">Loan Application Details</CardTitle>
          <CardDescription>Enter the applicant's information for credit risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Age</label>
                <Input
                  type="number"
                  placeholder="e.g., 28"
                  value={formData.age}
                  onChange={(e) => handleNumberChange('age', e.target.value)}
                  min={18}
                  max={100}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Annual Income (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1200000"
                  value={formData.income}
                  onChange={(e) => handleNumberChange('income', e.target.value)}
                  min={0}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Loan Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2560000"
                  value={formData.loan_amount}
                  onChange={(e) => handleNumberChange('loan_amount', e.target.value)}
                  min={0}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>
            </div>

            {/* Loan Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Loan Tenure (months)</label>
                <Input
                  type="number"
                  placeholder="e.g., 36"
                  value={formData.loan_tenure_months}
                  onChange={(e) => handleNumberChange('loan_tenure_months', e.target.value)}
                  min={1}
                  max={360}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Residence Type</label>
                <Select
                  value={formData.residence_type}
                  onValueChange={(value: 'Owned' | 'Rented' | 'Mortgage') =>
                    setFormData((prev) => ({ ...prev, residence_type: value }))
                  }
                  disabled={loading}
                >
                  <SelectTrigger className="transition-all hover:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owned">Owned</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="Mortgage">Mortgage</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Loan Purpose</label>
                <Select
                  value={formData.loan_purpose}
                  onValueChange={(value: 'Education' | 'Home' | 'Auto' | 'Personal') =>
                    setFormData((prev) => ({ ...prev, loan_purpose: value }))
                  }
                  disabled={loading}
                >
                  <SelectTrigger className="transition-all hover:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Auto">Auto</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* Credit History */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Avg DPD per Delinquency</label>
                <Input
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.avg_dpd_per_delinquency}
                  onChange={(e) => handleNumberChange('avg_dpd_per_delinquency', e.target.value)}
                  min={0}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Delinquency Ratio (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.delinquency_ratio}
                  onChange={(e) => handleNumberChange('delinquency_ratio', e.target.value)}
                  min={0}
                  max={100}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Credit Utilization (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.credit_utilization_ratio}
                  onChange={(e) => handleNumberChange('credit_utilization_ratio', e.target.value)}
                  min={0}
                  max={100}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Open Loan Accounts</label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.num_open_accounts}
                  onChange={(e) => handleNumberChange('num_open_accounts', e.target.value)}
                  min={1}
                  max={10}
                  disabled={loading}
                  className="transition-all hover:border-primary focus:scale-[1.02]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Loan Type</label>
                <Select
                  value={formData.loan_type}
                  onValueChange={(value: 'Secured' | 'Unsecured') =>
                    setFormData((prev) => ({ ...prev, loan_type: value }))
                  }
                  disabled={loading}
                >
                  <SelectTrigger className="transition-all hover:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Secured">Secured</SelectItem>
                    <SelectItem value="Unsecured">Unsecured</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Loan to Income Ratio</label>
                <Input 
                  value={loanToIncome} 
                  placeholder="Auto-calculated"
                  disabled 
                  className="bg-muted" 
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center pt-4"
            >
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full md:w-auto min-w-[200px] bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Calculate Risk'
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
