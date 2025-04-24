
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { MotionDiv } from "@/components/ui/MotionDiv";

interface CtaSectionProps {
  onExploreMenu: () => void;
}

export function CtaSection({ onExploreMenu }: CtaSectionProps) {
  return (
    <section className="py-24 bg-amber-50 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <MotionDiv animation="fade-in">
            <span className="tag bg-amber-100 text-amber-800 inline-block mb-4">
              Taste the Tradition
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready to Experience Our Culinary Delights?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore our menu and treat yourself to the authentic flavors of India. Each dish is prepared with care using traditional recipes and the finest ingredients.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="rounded-full text-base bg-amber-600 hover:bg-amber-700 text-white"
                onClick={onExploreMenu}
              >
                Explore Our Menu
              </Button>
            </div>
          </MotionDiv>
        </div>
      </Container>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-amber-500"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-amber-500"></div>
      </div>
    </section>
  );
}
