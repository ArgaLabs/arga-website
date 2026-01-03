import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Connect your GitHub repo and your alerting system",
    description:
      "Seamlessly integrate with your existing workflow. Connect your GitHub repositories and alerting systems like Grafana or AWS Cloudwatch to get started in minutes.",
    videoId: "3nHpN0BGsjs",
    position: "left" as const,
  },
  {
    title: "Root cause analysis with dynamic context graph",
    description:
      "Arga finds the root cause and localizes issues in seconds with a constantly updating knowledge graph that maps files, diffs, and context.",
    videoId: "TKIgAWvRAl4",
    position: "right" as const,
  },
  {
    title: "Intelligent rollback suggestions",
    description:
      "Arga suggests multiple rollback options with a confidence score. You can either set it to automatically select the best option, or select manually.",
    videoId: "tLoMx16nKCU",
    position: "left" as const,
  },
  {
    title: "Production-mirrored testing",
    description:
      "Arga spins an isolated sandbox mirroring production. It runs the minimal set of tests to validate behavior before merge.",
    videoId: "FpMg1Wn-kdo",
    position: "right" as const,
  },
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [hasAnimated, setHasAnimated] = useState<Set<number>>(new Set());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
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

  const observeElement = (element: HTMLDivElement | null, index: number) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return (
    <section id="features" className="scroll-mt-20 px-8 py-24 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => observeElement(el, index)}
              data-index={index}
              className={`flex flex-col ${
                feature.position === "left" 
                  ? "lg:flex-row" 
                  : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20 ${
                hasAnimated.has(index) 
                  ? 'transition-all duration-1000' 
                  : ''
              } ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : hasAnimated.has(index) 
                    ? 'opacity-0 translate-y-10' 
                    : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Text Content */}
              <div className={`lg:w-2/5 space-y-4 ${
                feature.position === "left" ? "lg:pr-8" : "lg:pl-8"
              }`}>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Video Content */}
              <div className="lg:w-3/5 w-full">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden max-w-[1920px]">
                  <iframe
                    width="1920"
                    height="1080"
                    className="w-full h-full block"
                    src={`https://www.youtube.com/embed/${feature.videoId}?autoplay=1&mute=1&loop=1&playlist=${feature.videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&hd=1`}
                    title={feature.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
