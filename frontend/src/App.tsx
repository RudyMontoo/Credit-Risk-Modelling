import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Header } from '@/components/Header';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { InputForm } from '@/components/InputForm';
import { ResultCards } from '@/components/ResultCards';
import { predictCreditRisk } from '@/lib/api';
import type { FormData, PredictionResponse } from '@/types';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  useEffect(() => {
    // Enable dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await predictCreditRisk(data);
      setResult(response);
      toast.success('Credit risk assessment completed!');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to calculate credit risk. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <BackgroundEffects />
      <Toaster position="top-right" richColors />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <InputForm onSubmit={handleSubmit} loading={loading} />
          
          {result && <ResultCards result={result} />}
        </main>

        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p>Powered by Machine Learning • Built with React + Framer Motion</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
