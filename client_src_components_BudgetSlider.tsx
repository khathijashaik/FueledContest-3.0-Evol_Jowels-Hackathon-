import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface BudgetSliderProps {
  onBudgetChange: (range: [number, number]) => void;
}

export default function BudgetSlider({ onBudgetChange }: BudgetSliderProps) {
  const [range, setRange] = useState<[number, number]>([500, 5000]);
  
  const handleChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setRange(newRange);
    onBudgetChange(newRange);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-12"
    >
      <Card className="p-12 space-y-12">
        <h2 className="font-serif text-5xl text-center" data-testid="text-budget-question">
          What's your budget range?
        </h2>
        
        <div className="space-y-8">
          <Slider
            value={range}
            onValueChange={handleChange}
            min={100}
            max={10000}
            step={100}
            className="cursor-pointer"
            data-testid="slider-budget"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-muted-foreground text-lg">From</p>
              <p className="font-serif text-4xl text-primary" data-testid="text-budget-min">
                ${range[0].toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-lg">To</p>
              <p className="font-serif text-4xl text-primary" data-testid="text-budget-max">
                ${range[1].toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
