
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { MotionDiv } from "@/components/ui/MotionDiv";

interface HeroSectionProps {
  onExploreMenu: () => void;
}

export function HeroSection({ onExploreMenu }: HeroSectionProps) {
  return (
    <section 
      className="relative pt-20 min-h-[90vh] flex items-center bg-cover bg-center" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/f38bb9f8-a76d-4ed2-9fbc-41b2527a0913.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Container className="relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <MotionDiv animation="fade-in">
            <div className="mb-2">
              <span className="tag bg-amber-600/30 text-amber-50 inline-block mb-4">
                Authentic Indian Cuisine
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-6 text-white">
              Savor the <span className="relative">Authentic<span className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-500 rounded-full"></span></span> Taste of India
            </h1>
            <p className="text-lg text-amber-50/90 mb-8 leading-relaxed">
              Experience the perfect blend of tradition and innovation with our carefully crafted menu. Every dish tells a story of passion and dedication to Indian culinary arts.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="rounded-full text-base bg-amber-600 hover:bg-amber-700 text-white"
                onClick={onExploreMenu}
              >
                Explore Menu
              </Button>
            </div>
          </MotionDiv>
        </div>
      </Container>
    </section>
  );
}
