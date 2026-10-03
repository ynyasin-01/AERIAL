import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add state and ref
state_old = "  const [bookingDuplicateError, setBookingDuplicateError] = useState<string | null>(null);"
state_new = """  const [bookingDuplicateError, setBookingDuplicateError] = useState<string | null>(null);

  // Footer animation state
  const footerLogoRef = useRef<SVGSVGElement>(null);
  const [isFooterLogoVisible, setIsFooterLogoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterLogoVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (footerLogoRef.current) {
      observer.observe(footerLogoRef.current);
    }
    return () => observer.disconnect();
  }, []);"""
content = content.replace(state_old, state_new)

# 2. Update Footer Logo
footer_old = """          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('Home')}>
            <svg 
              className="overflow-visible transition-all duration-300 group-hover:opacity-85 h-8 w-24"
              fill="none"
            >
              <style>
                {`
                  @font-face {
                    font-family: 'NeveraSVG';
                    src: url('/fonts/Nevera-Regular.otf') format('opentype');
                  }
                  .svg-nevera {
                    font-family: 'NeveraSVG', 'Nevera', sans-serif !important;
                  }
                `}
              </style>
              <text
                x="0"
                y="50%"
                dominantBaseline="central"
                fontFamily="NeveraSVG, Nevera, sans-serif"
                fontWeight="bold"
                className="svg-nevera tracking-wider uppercase transition-all duration-300 font-bold text-2xl"
              >
                <tspan className="logo-letter" style={{ animationDelay: '0s' }}>A</tspan>
                <tspan className="logo-letter" style={{ animationDelay: '0.15s' }}>E</tspan>
                <tspan className="logo-letter" style={{ animationDelay: '0.3s' }}>R</tspan>
                <tspan className="logo-letter" style={{ animationDelay: '0.45s' }}>I</tspan>
                <tspan className="logo-letter" style={{ animationDelay: '0.6s' }}>A</tspan>
                <tspan className="logo-letter" style={{ animationDelay: '0.75s' }}>L</tspan>
              </text>
            </svg>
          </div>"""

footer_new = """          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('Home')}>
            <svg 
              ref={footerLogoRef}
              className="overflow-visible transition-all duration-300 group-hover:opacity-85 h-8 w-24"
              fill="none"
            >
              <style>
                {`
                  @font-face {
                    font-family: 'NeveraSVG';
                    src: url('/fonts/Nevera-Regular.otf') format('opentype');
                  }
                  .svg-nevera {
                    font-family: 'NeveraSVG', 'Nevera', sans-serif !important;
                  }
                `}
              </style>
              <text
                x="0"
                y="50%"
                dominantBaseline="central"
                fontFamily="NeveraSVG, Nevera, sans-serif"
                fontWeight="bold"
                className="svg-nevera tracking-wider uppercase transition-all duration-300 font-bold text-2xl"
              >
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0s', opacity: isFooterLogoVisible ? 1 : 0 }}>A</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.15s', opacity: isFooterLogoVisible ? 1 : 0 }}>E</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.3s', opacity: isFooterLogoVisible ? 1 : 0 }}>R</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.45s', opacity: isFooterLogoVisible ? 1 : 0 }}>I</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.6s', opacity: isFooterLogoVisible ? 1 : 0 }}>A</tspan>
                <tspan className={isFooterLogoVisible ? "logo-letter" : ""} style={{ animationDelay: '0.75s', opacity: isFooterLogoVisible ? 1 : 0 }}>L</tspan>
              </text>
            </svg>
          </div>"""

content = content.replace(footer_old, footer_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Footer animation trigger added successfully")
