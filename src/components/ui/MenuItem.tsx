import { useState } from "react";
import { AnimatedImage } from "./AnimatedImage";
import { MotionDiv } from "./MotionDiv";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { MenuItem as MenuItemType } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface MenuItemProps {
  item: MenuItemType;
  delay?: number;
  className?: string;
  onClick?: (item: MenuItemType) => void;
}

export function MenuItem({ item, delay = 0, className, onClick }: MenuItemProps) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const displayPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    
    try {
      const itemToAdd = { ...item };
      
      if (!itemToAdd.id || typeof itemToAdd.id !== 'string' || 
          !itemToAdd.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        console.log("Converting non-UUID item ID to UUID:", itemToAdd.id);
        itemToAdd.id = uuidv4();
      }
      
      await addToCart(itemToAdd, 1);
      toast.success(`${item.name} added to your cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("There was an error adding this item to your cart.");
    }
  };
  
  return (
    <MotionDiv
      animation="fade-in"
      delay={delay}
      className={cn("w-full", className)}
    >
      <div
        className={cn(
          "card-hover cursor-pointer group transition-all duration-300",
          "h-full flex flex-col"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick?.(item)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <AnimatedImage
            src={item.image || ""}
            alt={item.name}
            className="transition-transform duration-500 ease-out group-hover:scale-105"
            aspectRatio="auto"
          />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {item.vegetarian && (
              <span className="tag bg-green-100 text-green-800 border border-green-200">
                Veg
              </span>
            )}
            {item.spicy && (
              <span className="tag bg-red-100 text-red-800 border border-red-200">
                Spicy
              </span>
            )}
            {item.popular && (
              <span className="tag bg-amber-100 text-amber-800 border border-amber-200">
                Popular
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-lg leading-tight">
              {item.name}
            </h3>
            <div className="font-medium text-base ml-2 whitespace-nowrap flex items-center">
              <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
              {displayPrice.toFixed(0)}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {item.description || ""}
          </p>
          
          <div className="mt-auto">
            <button 
              className={cn(
                "button-hover w-full py-2 px-4 rounded-md border border-amber-400 bg-amber-50",
                "font-medium text-sm transition-all duration-300",
                "hover:bg-amber-600 hover:text-white"
              )}
              onClick={handleAddToCart}
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
