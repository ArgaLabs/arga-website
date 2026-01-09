import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/theme-provider";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex items-center justify-center p-8 pb-[99px]">
      <div className="max-w-5xl text-center space-y-6">
        <div className="flex justify-center mb-4">
        <div className="flex justify-center mt-24 mb-4">
          <img 
            src={theme === "dark" ? "/blackLogo-removebg-preview.png" : "/domain.png"}
            alt="Domain Logo" 
            className="h-[120px] w-auto"
          />
        </div>

        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
          Automated incident response, powered by AI
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Fixing production bugs should be fast and easy. 
        <br/>
        Arga helps remediate incidents before any user impact.
        </p>
        
        <div className="flex justify-center pt-4 mb-4">
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
