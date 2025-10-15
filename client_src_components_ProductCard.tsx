import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  style: string;
  occasion: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  style,
  occasion,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      data-testid={`card-product-${id}`}
    >
      <Card className="overflow-hidden hover-elevate cursor-pointer">
        <div className="aspect-[3/4] bg-muted relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <Badge variant="secondary" className="mb-2" data-testid={`badge-category-${id}`}>
              {category}
            </Badge>
            <h3 className="font-serif text-2xl mb-1" data-testid={`text-product-name-${id}`}>
              {name}
            </h3>
            <p className="text-primary text-xl font-semibold" data-testid={`text-product-price-${id}`}>
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
