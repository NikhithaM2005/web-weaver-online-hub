
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
    
    // Simulate spinning animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DISCOUNT_OPTIONS.length);
      setSelectedDiscount(DISCOUNT_OPTIONS[randomIndex]);
      setIsSpinning(false);
    }, 2000);
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
          <Loader 
            className={cn(
              "h-24 w-24 mx-auto mb-6 text-amber-600",
              isSpinning && "animate-spin"
            )} 
          />
          
          {selectedDiscount !== null ? (
            <div className="space-y-4">
              <p className="text-2xl font-bold text-amber-600">
                {selectedDiscount}% OFF!
              </p>
              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700"
                onClick={handleApplyDiscount}
              >
                Apply Discount
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700"
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
