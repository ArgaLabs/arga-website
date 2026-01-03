import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Our models are often trained in-house with a lot of pre-defined context, for example, if one window has 180k tokens, up to 120k can already be defined before you open the agent tab window, meaning you'd only have 60k window to work with.",
    author: "Senior Software Engineer",
    title: "Amazon",
    company: "AWS",
  },
  {
    quote:
      "A lot of context is missing in our models, I need to provide exact file paths of all relevant files and open them on my IDE to paste into Cursor/agent tab.",
    author: "Software Engineer",
    title: "Google",
    company: "Google Voice",
  },
  {
    quote:
      "Since the codebase we own is so large, everyone is expected to be available and there's no oncall on our team; if your code caused an issue, you will get pinged 24/7. It caused a lot of unnecessary stress and burnout.",
    author: "Software Engineer",
    title: "Tesla",
    company: "Service Platform",
  },
  {
    quote:
      "Our team moves really fast. There's no time to write super detailed PRs or runbooks at startups. Usually you know your PR reviewer so minimal context is needed. So it's hard to provide context to agents because it lives in our heads.",
    author: "Machine Learning Engineer",
    title: "Baseten",
    company: "ML Infrastructure",
  },
  {
    quote:
      "Our team manages lots of internal platforms and our on-call is crazy. Whenever something breaks it's pretty critical so we gotta fix it fast.",
    author: "Production Engineer",
    title: "Meta",
    company: "Dev Infrastructure",
  },
  {
    quote:
      "I'd use something like this if it existed, but nothing on the market is even close to being reliable while fully autonomous.",
    author: "Member of Technical Staff",
    title: "Microsoft AI",
    company: "Copilot",
  },
];

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(index));
            setHasAnimated((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const observeCard = (element: HTMLDivElement | null, index: number) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return (
    <section id="testimonials" className="scroll-mt-20 px-8 py-24 bg-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            What teams say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Current pain points in enterprise environments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              ref={(el) => observeCard(el, index)}
              data-index={index}
              className={`p-6 bg-card border border-border hover:border-border/80 flex flex-col justify-between ${
                hasAnimated.has(index) 
                  ? 'transition-all duration-700' 
                  : ''
              } ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : hasAnimated.has(index) 
                    ? 'opacity-0 translate-y-10' 
                    : 'opacity-100 translate-y-0'
              }`}
              style={hasAnimated.has(index) ? { transitionDelay: `${(index % 3) * 100}ms` } : undefined}
            >
              <p className="text-base leading-relaxed mb-6 flex-grow">
                {testimonial.quote}
              </p>
              
              <div>
                <p className="font-semibold text-sm">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
