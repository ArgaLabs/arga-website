import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Connect your GitHub repo and entire DevOps stack",
    description:
      "Seamlessly integrate with your existing workflow. Connect your GitHub repositories and alerting systems like Grafana or AWS Cloudwatch to get started in minutes.",
    videoSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/Intergration3-1080.mp4",
    posterSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/Intergration3-poster.jpg",
    position: "left" as const,
  },
  {
    title: "Root cause analysis with dynamic context graph",
    description:
      "Arga finds the root cause and localizes issues in seconds with a constantly updating knowledge graph that maps files, diffs, and context.",
    videoSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/Rootcause-1080.mp4",
    posterSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/Rootcause-poster.jpg",
    position: "right" as const,
  },
  {
    title: "Intelligent rollback suggestions",
    description:
      "Arga suggests multiple rollback options with a confidence score. You can either set it to automatically select the best option, or select manually.",
    videoSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/SuggestFix-1080.mp4",
    posterSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/SuggestFix-poster.jpg",
    position: "left" as const,
  },
  {
    title: "Production-mirrored testing",
    description:
      "Arga spins an isolated sandbox mirroring production. It runs the minimal set of tests to validate behavior before merge.",
    videoSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/ConfidenceScore-1080.mp4",
    posterSrc:
      "https://nxjedundtzyivalxlqsi.supabase.co/storage/v1/object/public/demos/ConfidenceScore-poster.jpg",
    position: "right" as const,
  },
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [hasAnimated, setHasAnimated] = useState<Set<number>>(new Set());

  // store video refs by index so we can play/pause like YouTube does
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          const index = parseInt(entry.target.getAttribute("data-index") || "0");

          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
            setHasAnimated((prev) => new Set(prev).add(index));

            // try to play the video when it comes into view
            const vid = videoRefs.current[index];
            if (vid) {
              try {
                vid.muted = true; // ensure muted BEFORE play
                vid.playsInline = true;
                await vid.play();
              } catch {
                // if autoplay is blocked, it will fail silently; staying muted helps.
              }
            }
          } else {
            // pause when off-screen to avoid stuck states / wasted CPU
            const vid = videoRefs.current[index];
            if (vid && !vid.paused) vid.pause();
          }
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    // Manually start the first video immediately (browser priority fix)
    const startFirstVideo = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        try {
          firstVideo.muted = true;
          firstVideo.playsInline = true;
          await firstVideo.play();
        } catch {
          // autoplay blocked
        }
      }
    };
    
    startFirstVideo();

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const observeElement = (element: HTMLDivElement | null, index: number) => {
    if (element && observerRef.current) observerRef.current.observe(element);
  };

  return (
    <section
      id="features"
      className="scroll-mt-20 px-8 py-24 border-t border-border"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="space-y-64">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => observeElement(el, index)}
              data-index={index}
              className={`flex flex-col ${
                feature.position === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20 ${
                hasAnimated.has(index) ? "transition-all duration-1000" : ""
              } ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : hasAnimated.has(index)
                    ? "opacity-0 translate-y-10"
                    : "opacity-100 translate-y-0"
              }`}
            >
              {/* Text Content */}
              <div
                className={`lg:w-1/4 space-y-4 lg:-mt-16 ${
                  feature.position === "left" ? "lg:pr-8" : "lg:pl-8"
                }`}
              >
                <h3 className="text-3xl md:text-4xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Video Content */}
              <div className="lg:w-3/4 w-full">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden max-w-[1920px]">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="w-full h-full block object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={feature.posterSrc}
                    preload={index === 0 ? "auto" : "metadata"}
                    {...(index === 0 ? { fetchpriority: "high" } : {})}
                    // iOS Safari hint (React will pass it through)
                    {...({ "webkit-playsinline": "true" } as any)}
                    // matches your old iframe behavior
                    style={{ pointerEvents: "none" }}
                  >
                    <source src={feature.videoSrc} type="video/mp4" />
                  </video>
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
