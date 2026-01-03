import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex items-start justify-start p-8">
      <div className="max-w-5xl text-left space-y-6">
        <div className="flex justify-start mb-4">
          <img 
            src="/domain.png" 
            alt="Domain Logo" 
            className="h-20 w-auto"
          />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
          Automated incident response, powered by AI
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
        Fixing production incidents should be easy. 
        <br/>
        Arga helps fix production bugs before user impact.
        </p>
        
        <div className="flex justify-start pt-4">
          <Button size="lg" className="text-base group bg-black text-white hover:bg-black/90 border border-white/20" asChild>
            <a href="#cta">
              Try Arga now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
