
import { useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DISCOUNT_OPTIONS = [5, 10, 0, 15, 50, 100];

interface SpinnerDiscountProps {
  onDiscountApply: (discount: number) => void;
}

export function SpinnerDiscount({ onDiscountApply }: SpinnerDiscountProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedDiscount(null);
    
    // Simulate spinning animation with longer duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
      setSelectedDiscount(DISCOUNT_OPTIONS[randomIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  const handleApplyDiscount = () => {
    if (selectedDiscount !== null) {
      onDiscountApply(selectedDiscount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="relative">
            <Loader 
              className={cn(
                "h-32 w-32 mx-auto mb-6 rounded-full",
                "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 p-2",
                "text-white shadow-lg",
                isSpinning && "animate-spin"
              )} 
            />
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-red-500 border-b-8 border-b-transparent" />
          </div>
          
          {selectedDiscount !== null ? (
            <div className="space-y-4">
              <p className="text-3xl font-bold text-amber-600 animate-bounce">
                {selectedDiscount}% OFF!
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
                onClick={handleApplyDiscount}
              >
                Apply Discount
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? "Spinning..." : "SPIN"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
