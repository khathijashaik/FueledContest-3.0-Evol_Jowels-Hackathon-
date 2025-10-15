import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-12 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-12"
      >
        <Sparkles className="w-20 h-20 mx-auto mb-8 text-primary" />
        <h1 className="font-serif text-7xl mb-6" data-testid="text-welcome-title">
          Welcome to
          <br />
          <span className="text-primary">Evol Jewels</span>
        </h1>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-12" data-testid="text-welcome-subtitle">
          Discover your perfect jewelry style with AI-powered celebrity inspiration
        </p>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="default"
          size="lg"
          onClick={onStart}
          className="h-20 text-2xl px-16 rounded-2xl"
          data-testid="button-start-journey"
        >
          Begin Your Style Journey
        </Button>
      </motion.div>
    </motion.div>
  );
}
