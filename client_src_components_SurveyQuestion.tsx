import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SurveyQuestionProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string;
  multiSelect?: boolean;
}

export default function SurveyQuestion({
  question,
  options,
  onSelect,
  selectedOption,
  multiSelect = false,
}: SurveyQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-12"
    >
      <Card className="p-12 space-y-8">
        <h2 className="font-serif text-5xl text-center" data-testid="text-survey-question">
          {question}
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {options.map((option) => {
            const isSelected = selectedOption === option;
            
            return (
              <Button
                key={option}
                variant={isSelected ? "default" : "outline"}
                size="lg"
                onClick={() => onSelect(option)}
                className="h-20 text-2xl justify-start px-10 rounded-2xl"
                data-testid={`button-option-${option.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {option}
              </Button>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
