
import { Container } from "@/components/ui/Container";
import { FoodCategory } from "@/components/ui/FoodCategory";
import { foodCategories } from "@/lib/food-categories";

interface FoodCategoriesSectionProps {
  onCategoryClick: () => void;
}

export function FoodCategoriesSection({ onCategoryClick }: FoodCategoriesSectionProps) {
  return (
    <section className="py-12 bg-amber-50">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-2">What's on your mind?</h2>
          <p className="text-muted-foreground">Explore our diverse menu categories</p>
        </div>
        
        <div className="relative overflow-x-auto pb-4">
          <div className="flex gap-8 px-4 py-4 overflow-x-auto snap-x scrollbar-hide">
            {foodCategories.map((category) => (
              <FoodCategory 
                key={category.id}
                name={category.name}
                image={category.image}
                onClick={onCategoryClick}
              />
            ))}
          </div>
          
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none"></div>
        </div>
      </Container>
    </section>
  );
}
