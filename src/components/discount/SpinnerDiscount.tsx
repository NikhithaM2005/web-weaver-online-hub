
import { useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DISCOUNT_OPTIONS = [5, 10, 0, 15, 50, 100];

interface SpinnerDiscountProps {
  onDiscountApply: (discount: number) => void;
}

export function SpinnerDiscount({ onDiscountApply }: SpinnerDiscountProps) {
  const [isActive, setIsActive] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showLargeSpinner, setShowLargeSpinner] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  
  const handleSpinnerClick = () => {
    if (!isActive) return;
    setShowLargeSpinner(true);
  };

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

  if (!showLargeSpinner) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full",
            isActive ? "text-amber-600 hover:text-amber-700" : "text-gray-300"
          )}
          onClick={handleSpinnerClick}
        >
          <Loader className={cn("h-6 w-6", isActive && "animate-spin")} />
        </Button>
      </div>
    );
  }

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
          
          <button
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setShowLargeSpinner(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
