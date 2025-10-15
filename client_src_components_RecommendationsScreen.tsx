import { useState } from "react";
import { motion } from "framer-motion";
import CelebrityMatch from "./CelebrityMatch";
import ProductCard from "./ProductCard";
import FilterChips from "./FilterChips";
import NavigationControls from "./NavigationControls";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  style: string;
  occasion: string;
}

interface CelebrityData {
  name: string;
  image: string;
  matchPercentage: number;
  vibes: string[];
  description: string;
}

interface RecommendationsScreenProps {
  celebrity: CelebrityData;
  products: Product[];
  onReset: () => void;
}

export default function RecommendationsScreen({
  celebrity,
  products,
  onReset,
}: RecommendationsScreenProps) {
  const [priceFilter, setPriceFilter] = useState<string>();
  const [styleFilter, setStyleFilter] = useState<string>();
  const [occasionFilter, setOccasionFilter] = useState<string>();
  
  const filteredProducts = products.filter((product) => {
    if (styleFilter && product.style !== styleFilter) return false;
    if (occasionFilter && product.occasion !== occasionFilter) return false;
    return true;
  });
  
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-12 py-12 space-y-12">
        <CelebrityMatch {...celebrity} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-serif text-4xl" data-testid="text-recommendations-title">
              Curated For You
            </h2>
            
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={styleFilter === "Minimal" ? "default" : "outline"}
                onClick={() => setStyleFilter(styleFilter === "Minimal" ? undefined : "Minimal")}
                data-testid="button-filter-minimal"
              >
                Minimal
              </Button>
              <Button
                variant={styleFilter === "Bold" ? "default" : "outline"}
                onClick={() => setStyleFilter(styleFilter === "Bold" ? undefined : "Bold")}
                data-testid="button-filter-bold"
              >
                Bold
              </Button>
              <Button
                variant={occasionFilter === "Everyday" ? "default" : "outline"}
                onClick={() => setOccasionFilter(occasionFilter === "Everyday" ? undefined : "Everyday")}
                data-testid="button-filter-everyday"
              >
                Everyday
              </Button>
              <Button
                variant={occasionFilter === "Special" ? "default" : "outline"}
                onClick={() => setOccasionFilter(occasionFilter === "Special" ? undefined : "Special")}
                data-testid="button-filter-special"
              >
                Special Occasions
              </Button>
            </div>
          </div>
          
          <FilterChips
            priceRange={priceFilter}
            style={styleFilter}
            occasion={occasionFilter}
            onRemovePrice={() => setPriceFilter(undefined)}
            onRemoveStyle={() => setStyleFilter(undefined)}
            onRemoveOccasion={() => setOccasionFilter(undefined)}
          />
          
          <div className="grid grid-cols-2 gap-6" data-testid="grid-products">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </motion.div>
      </div>
      
      <NavigationControls
        onReset={onReset}
        showBack={false}
        showNext={false}
        showReset={true}
      />
    </div>
  );
}
