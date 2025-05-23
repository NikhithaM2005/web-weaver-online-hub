import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { adaptMenuItemToDatabase } from "@/lib/menu-adapters";
import { useState } from "react";
import { SpinnerDiscount } from "@/components/discount/SpinnerDiscount";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { menuItems } from "@/lib/menu-data";
import { HeroSection } from "@/components/home/HeroSection";
import { FoodCategoriesSection } from "@/components/home/FoodCategoriesSection";
import { PopularItemsSection } from "@/components/home/PopularItemsSection";
import { CtaSection } from "@/components/home/CtaSection";
import type { MenuItem as DatabaseMenuItem } from "@/types/database";
import type { MenuItem as MenuDataItem } from "@/lib/menu-data";

export default function Index() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);
  
  const popularItems = menuItems
    .filter((item: MenuDataItem) => item.popular)
    .slice(0, 4)
    .map(item => ({
      ...adaptMenuItemToDatabase({
        ...item,
        id: uuidv4(),
        price: item.price * 82,
      }),
      category: item.category,
    })) as MenuDataItem[];

  const handleViewMenu = () => {
    navigate("/menu");
  };

  const handleAddToCart = async (e: React.MouseEvent, item: DatabaseMenuItem) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    
    try {
      const databaseItem = adaptMenuItemToDatabase(item);
      
      if (!databaseItem.id || typeof databaseItem.id !== 'string' || 
          !databaseItem.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        databaseItem.id = uuidv4();
      }
      
      await addToCart(databaseItem, 1);
      toast.success(`${item.name} added to your cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("There was an error adding this item to your cart");
    }
  };

  const handleSpinnerApply = (discount: number) => {
    toast.success(`${discount}% discount has been applied to your order!`);
    navigate("/cart");
  };

  return (
    <>
      <Header />
      <main>
        <HeroSection onExploreMenu={handleViewMenu} />
        <FoodCategoriesSection onCategoryClick={handleViewMenu} />
        <PopularItemsSection 
          items={popularItems}
          onViewMenu={handleViewMenu}
          onAddToCart={handleAddToCart}
        />
        <CtaSection onExploreMenu={handleViewMenu} />
      </main>
      {isSpinnerActive && (
        <SpinnerDiscount onDiscountApply={handleSpinnerApply} />
      )}
      <Footer />
    </>
  );
}
