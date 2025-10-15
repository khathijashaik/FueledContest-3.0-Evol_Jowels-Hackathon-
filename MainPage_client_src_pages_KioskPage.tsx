import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MirrorScreen from "@/components/MirrorScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import SurveyQuestion from "@/components/SurveyQuestion";
import BudgetSlider from "@/components/BudgetSlider";
import RecommendationsScreen from "@/components/RecommendationsScreen";
import ProgressBar from "@/components/ProgressBar";
import NavigationControls from "@/components/NavigationControls";

import celebMinimal from "@assets/generated_images/Celebrity_minimal_style_inspiration_ae1f008c.png";
import celebBold from "@assets/generated_images/Celebrity_bold_style_inspiration_0903d4de.png";
import celebTraditional from "@assets/generated_images/Celebrity_traditional_style_inspiration_0b3d5180.png";
import celebModern from "@assets/generated_images/Celebrity_modern_style_inspiration_90e1a27a.png";

import product1 from "@assets/generated_images/Minimal_necklace_product_cb3f6cce.png";
import product2 from "@assets/generated_images/Bold_earrings_product_fe122bc7.png";
import product3 from "@assets/generated_images/Traditional_bracelet_product_6a41456b.png";
import product4 from "@assets/generated_images/Modern_ring_product_5fc0c90d.png";

type Step = "mirror" | "welcome" | "style" | "occasion" | "budget" | "lifestyle" | "results";

interface SurveyAnswers {
  style?: string;
  occasion?: string;
  budget?: [number, number];
  lifestyle?: string;
}

export default function KioskPage() {
  const [currentStep, setCurrentStep] = useState<Step>("mirror");
  const [answers, setAnswers] = useState<SurveyAnswers>({});

  const handleWakeUp = () => {
    setCurrentStep("welcome");
  };

  const handleStart = () => {
    setCurrentStep("style");
  };

  const handleStyleSelect = (style: string) => {
    setAnswers({ ...answers, style });
  };

  const handleOccasionSelect = (occasion: string) => {
    setAnswers({ ...answers, occasion });
  };

  const handleBudgetChange = (budget: [number, number]) => {
    setAnswers({ ...answers, budget });
  };

  const handleLifestyleSelect = (lifestyle: string) => {
    setAnswers({ ...answers, lifestyle });
  };

  const handleNext = () => {
    if (currentStep === "style") setCurrentStep("occasion");
    else if (currentStep === "occasion") setCurrentStep("budget");
    else if (currentStep === "budget") setCurrentStep("lifestyle");
    else if (currentStep === "lifestyle") setCurrentStep("results");
  };

  const handleBack = () => {
    if (currentStep === "occasion") setCurrentStep("style");
    else if (currentStep === "budget") setCurrentStep("occasion");
    else if (currentStep === "lifestyle") setCurrentStep("budget");
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep("mirror");
  };

  const getStepNumber = () => {
    const stepMap = {
      mirror: 0,
      welcome: 0,
      style: 1,
      occasion: 2,
      budget: 3,
      lifestyle: 4,
      results: 5,
    };
    return stepMap[currentStep];
  };

  const getCelebrityMatch = () => {
    const style = answers.style || "Minimal & Elegant";
    
    if (style.includes("Minimal")) {
      return {
        name: "Zendaya",
        image: celebMinimal,
        matchPercentage: 94,
        vibes: ["Minimal", "Elegant", "Modern"],
        description: "Known for her refined, minimal approach to jewelry that lets her natural elegance shine",
      };
    } else if (style.includes("Bold")) {
      return {
        name: "Rihanna",
        image: celebBold,
        matchPercentage: 92,
        vibes: ["Bold", "Statement", "Confident"],
        description: "Fearless with jewelry, always making a statement with chunky chains and dramatic pieces",
      };
    } else if (style.includes("Traditional")) {
      return {
        name: "Priyanka Chopra",
        image: celebTraditional,
        matchPercentage: 96,
        vibes: ["Traditional", "Ornate", "Heritage"],
        description: "Celebrates cultural heritage with intricate, ornate jewelry that honors tradition",
      };
    } else {
      return {
        name: "Emma Stone",
        image: celebModern,
        matchPercentage: 90,
        vibes: ["Modern", "Contemporary", "Architectural"],
        description: "Embraces geometric, architectural designs that push the boundaries of modern jewelry",
      };
    }
  };

  const getProducts = () => {
    return [
      {
        id: "1",
        name: "Delicate Diamond Pendant",
        price: 1299,
        image: product1,
        category: "Necklace",
        style: "Minimal",
        occasion: "Everyday",
      },
      {
        id: "2",
        name: "Statement Gold Hoops",
        price: 899,
        image: product2,
        category: "Earrings",
        style: "Bold",
        occasion: "Special",
      },
      {
        id: "3",
        name: "Heritage Bracelet",
        price: 2499,
        image: product3,
        category: "Bracelet",
        style: "Traditional",
        occasion: "Special",
      },
      {
        id: "4",
        name: "Geometric Ring",
        price: 799,
        image: product4,
        category: "Ring",
        style: "Minimal",
        occasion: "Everyday",
      },
    ];
  };

  const showProgress = currentStep !== "mirror" && currentStep !== "welcome" && currentStep !== "results";

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentStep === "mirror" && (
          <motion.div key="mirror" exit={{ opacity: 0 }}>
            <MirrorScreen onWakeUp={handleWakeUp} />
          </motion.div>
        )}

        {currentStep === "welcome" && (
          <motion.div key="welcome" exit={{ opacity: 0, x: -100 }}>
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentStep === "style" && (
          <motion.div key="style" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            {showProgress && <ProgressBar currentStep={getStepNumber()} totalSteps={4} />}
            <div className="py-12">
              <SurveyQuestion
                question="What's your style vibe?"
                options={["Minimal & Elegant", "Bold & Statement", "Traditional & Classic", "Modern & Contemporary"]}
                onSelect={handleStyleSelect}
                selectedOption={answers.style}
              />
            </div>
            <NavigationControls
              onNext={handleNext}
              showBack={false}
              nextLabel="Continue"
            />
          </motion.div>
        )}

        {currentStep === "occasion" && (
          <motion.div key="occasion" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            {showProgress && <ProgressBar currentStep={getStepNumber()} totalSteps={4} />}
            <div className="py-12">
              <SurveyQuestion
                question="When will you wear your jewelry?"
                options={["Everyday Wear", "Special Occasions", "Work & Professional", "Mix of Everything"]}
                onSelect={handleOccasionSelect}
                selectedOption={answers.occasion}
              />
            </div>
            <NavigationControls onBack={handleBack} onNext={handleNext} nextLabel="Continue" />
          </motion.div>
        )}

        {currentStep === "budget" && (
          <motion.div key="budget" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            {showProgress && <ProgressBar currentStep={getStepNumber()} totalSteps={4} />}
            <div className="py-12">
              <BudgetSlider onBudgetChange={handleBudgetChange} />
            </div>
            <NavigationControls onBack={handleBack} onNext={handleNext} nextLabel="Continue" />
          </motion.div>
        )}

        {currentStep === "lifestyle" && (
          <motion.div key="lifestyle" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
            {showProgress && <ProgressBar currentStep={getStepNumber()} totalSteps={4} />}
            <div className="py-12">
              <SurveyQuestion
                question="How would you describe your lifestyle?"
                options={["Active & Sporty", "Professional & Polished", "Creative & Artistic", "Relaxed & Casual"]}
                onSelect={handleLifestyleSelect}
                selectedOption={answers.lifestyle}
              />
            </div>
            <NavigationControls onBack={handleBack} onNext={handleNext} nextLabel="See My Matches" />
          </motion.div>
        )}

        {currentStep === "results" && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <RecommendationsScreen
              celebrity={getCelebrityMatch()}
              products={getProducts()}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
