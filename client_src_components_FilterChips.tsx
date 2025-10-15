import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterChipsProps {
  priceRange?: string;
  style?: string;
  occasion?: string;
  onRemovePrice?: () => void;
  onRemoveStyle?: () => void;
  onRemoveOccasion?: () => void;
}

export default function FilterChips({
  priceRange,
  style,
  occasion,
  onRemovePrice,
  onRemoveStyle,
  onRemoveOccasion,
}: FilterChipsProps) {
  const hasFilters = priceRange || style || occasion;
  
  if (!hasFilters) return null;
  
  return (
    <div className="flex gap-3 flex-wrap items-center" data-testid="filter-chips">
      {priceRange && (
        <Badge
          variant="secondary"
          className="text-lg px-4 py-2 gap-2 cursor-pointer hover-elevate"
          onClick={onRemovePrice}
          data-testid="chip-price"
        >
          {priceRange}
          <X className="w-4 h-4" />
        </Badge>
      )}
      {style && (
        <Badge
          variant="secondary"
          className="text-lg px-4 py-2 gap-2 cursor-pointer hover-elevate"
          onClick={onRemoveStyle}
          data-testid="chip-style"
        >
          {style}
          <X className="w-4 h-4" />
        </Badge>
      )}
      {occasion && (
        <Badge
          variant="secondary"
          className="text-lg px-4 py-2 gap-2 cursor-pointer hover-elevate"
          onClick={onRemoveOccasion}
          data-testid="chip-occasion"
        >
          {occasion}
          <X className="w-4 h-4" />
        </Badge>
      )}
    </div>
  );
}
