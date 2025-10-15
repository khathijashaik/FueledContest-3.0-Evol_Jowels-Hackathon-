import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface NavigationControlsProps {
  onBack?: () => void;
  onNext?: () => void;
  onReset?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  showReset?: boolean;
  nextLabel?: string;
}

export default function NavigationControls({
  onBack,
  onNext,
  onReset,
  showBack = true,
  showNext = true,
  showReset = false,
  nextLabel = "Continue",
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between px-12 py-8">
      <div>
        {showBack && onBack && (
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            className="text-xl gap-2"
            data-testid="button-back"
          >
            <ChevronLeft className="w-6 h-6" />
            Back
          </Button>
        )}
      </div>
      
      <div className="flex gap-4">
        {showReset && onReset && (
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="text-xl gap-2"
            data-testid="button-reset"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </Button>
        )}
        
        {showNext && onNext && (
          <Button
            variant="default"
            size="lg"
            onClick={onNext}
            className="text-xl gap-2 min-w-[200px]"
            data-testid="button-next"
          >
            {nextLabel}
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
