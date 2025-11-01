import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <TrendingUp className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Credit Risk Assessment
          </h1>
        </div>
        <p className="text-center text-muted-foreground mt-2">
          AI-Powered Credit Scoring with 3D Visualization
        </p>
      </div>
    </motion.header>
  );
}
