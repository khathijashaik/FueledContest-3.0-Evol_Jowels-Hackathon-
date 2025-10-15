import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface CelebrityMatchProps {
  name: string;
  image: string;
  matchPercentage: number;
  vibes: string[];
  description: string;
}

export default function CelebrityMatch({
  name,
  image,
  matchPercentage,
  vibes,
  description,
}: CelebrityMatchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
      data-testid="card-celebrity-match"
    >
      <div className="relative h-[600px] rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute top-8 right-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm border-4 border-primary flex items-center justify-center"
            data-testid="badge-match-percentage"
          >
            <p className="font-serif text-3xl text-primary">{matchPercentage}%</p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
          <p className="text-lg text-primary font-accent">Your style matches</p>
          <h1 className="font-serif text-6xl" data-testid="text-celebrity-name">
            {name}
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-celebrity-description">
            {description}
          </p>
          
          <div className="flex gap-2 flex-wrap">
            {vibes.map((vibe) => (
              <Badge
                key={vibe}
                variant="secondary"
                className="text-base px-4 py-2"
                data-testid={`badge-vibe-${vibe.toLowerCase()}`}
              >
                {vibe}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
