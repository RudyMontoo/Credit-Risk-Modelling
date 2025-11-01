import { motion } from 'framer-motion';
import { TrendingDown, Award, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PredictionResponse } from '@/types';

interface ResultCardsProps {
  result: PredictionResponse;
}

export function ResultCards({ result }: ResultCardsProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Good':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Average':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Poor':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, rotateX: -15 },
    show: { opacity: 1, y: 0, rotateX: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto mt-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Default Probability Card */}
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            transition: { type: 'spring', stiffness: 300 },
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border/50 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Default Probability</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {(result.default_probability * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Likelihood of loan default
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit Score Card */}
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            transition: { type: 'spring', stiffness: 300 },
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border/50 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">
                {result.credit_score}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Out of 900 (300-900 scale)
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rating Card */}
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            transition: { type: 'spring', stiffness: 300 },
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border/50 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Rating</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              >
                <Badge
                  className={`text-lg px-4 py-2 ${getRatingColor(result.rating)}`}
                  variant="outline"
                >
                  {result.rating}
                </Badge>
              </motion.div>
              <p className="text-xs text-muted-foreground mt-4">
                LTI Ratio: {result.loan_to_income_ratio}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
