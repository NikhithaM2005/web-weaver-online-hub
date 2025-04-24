
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/menu-data";
import { AnimatedImage } from "@/components/ui/AnimatedImage";
import { useNavigate } from "react-router-dom";

interface PopularItemCardProps {
  item: MenuItem;
  delay: number;
  onAddToCart: (e: React.MouseEvent, item: MenuItem) => void;
}

export function PopularItemCard({ item, delay, onAddToCart }: PopularItemCardProps) {
  const navigate = useNavigate();
  
  return (
    <MotionDiv animation="slide-up" delay={delay}>
      <div className="card-hover group h-full flex flex-col">
        <div className="relative aspect-square w-full overflow-hidden">
          <AnimatedImage
            src={item.image}
            alt={item.name}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{item.name}</h3>
            <div className="font-medium text-base ml-2 whitespace-nowrap">
              ₹{item.price.toFixed(0)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-auto flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-full border-amber-300 hover:bg-amber-50"
              onClick={() => navigate("/menu")}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="text-xs rounded-full bg-amber-600 hover:bg-amber-700 text-white"
              onClick={(e) => onAddToCart(e, item)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
