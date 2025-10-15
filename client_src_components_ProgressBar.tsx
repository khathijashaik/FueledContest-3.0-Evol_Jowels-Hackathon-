import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center gap-3 pt-8 pb-4" data-testid="progress-bar">
      {steps.map((step) => (
        <div key={step} className="flex items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{
              scale: step === currentStep ? 1.1 : 1,
              backgroundColor: step <= currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full"
            data-testid={`progress-step-${step}`}
          />
          {step < totalSteps && (
            <div
              className={`w-12 h-0.5 mx-1 transition-colors duration-300 ${
                step < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
