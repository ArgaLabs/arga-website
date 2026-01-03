import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/context/theme-provider";
import { cn } from "@/lib/utils";

const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const headerClassName = cn("w-full", isDark ? "bg-white text-black" : "bg-black text-white");
  const borderClassName = cn("fixed top-0 z-50 w-full border-b", isDark ? "border-black/10" : "border-white/10");
  const linkClassName = cn(
    "text-base font-medium transition-colors",
    isDark ? "text-black hover:text-black" : "text-white hover:text-white",
  );
  const logoSrc = isDark ? "/logo_white.png" : "/black_header.jpg";

  return (
    <div className={borderClassName}>
      <header className={headerClassName}>
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoSrc} alt="Arga Labs" className="h-10 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className={linkClassName}>
              Product
            </a>
            <a href="#features" className={linkClassName}>
              Features
            </a>
            <a href="#testimonials" className={linkClassName}>
              Testimonials
            </a>
            <a href="#cta" className={linkClassName}>
              Waitlist
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className={cn(isDark ? "hover:bg-black/10" : "hover:bg-white/10")} />
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "bg-transparent font-semibold",
                isDark
                  ? "border-black text-black hover:bg-black/10 hover:text-black"
                  : "border-white text-white hover:bg-white/10 hover:text-white",
              )}
              asChild
            >
              <a href="https://login.argalabs.com">Login</a>
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
