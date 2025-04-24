
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { MenuItem } from "@/lib/menu-data";
import { ChevronRight } from "lucide-react";
import { PopularItemCard } from "./PopularItemCard";

interface PopularItemsSectionProps {
  items: MenuItem[];
  onViewMenu: () => void;
  onAddToCart: (e: React.MouseEvent, item: MenuItem) => void;
}

export function PopularItemsSection({ items, onViewMenu, onAddToCart }: PopularItemsSectionProps) {
  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-wrap items-center justify-between mb-12">
          <MotionDiv animation="fade-in" className="max-w-lg mb-6 md:mb-0">
            <span className="tag bg-amber-100 text-amber-800 inline-block mb-4">
              Customer Favorites
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Our Most Popular Dishes
            </h2>
            <p className="text-muted-foreground">
              Discover what our customers love the most. These dishes have earned their place as the stars of our menu.
            </p>
          </MotionDiv>
          
          <MotionDiv animation="fade-in" delay={200}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full group border-amber-300 hover:bg-amber-50"
              onClick={onViewMenu}
            >
              View All Menu
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MotionDiv>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <PopularItemCard
              key={item.id}
              item={item}
              delay={index * 100}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
