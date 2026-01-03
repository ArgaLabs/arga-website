import { useTheme } from "@/context/theme-provider";

const Footer = () => {
  const { theme } = useTheme();
  const logo = theme === "light" ? "/logo_white.png" : "/black_header.jpg";

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Arga Labs" className="h-6 w-auto" />
            <div className="ml-4 flex gap-6 text-sm text-muted-foreground">
              <a href="https://x.com/ArgaLabs" className="hover:text-foreground transition-colors">
                X (Twitter)
              </a>
              <a href="https://www.linkedin.com/company/arga-labs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="mailto:phillip@argalabs.com,akira@argalabs.com" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 Arga Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
