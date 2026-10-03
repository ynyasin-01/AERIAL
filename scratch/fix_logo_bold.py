import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()


# 1. Update Header Logo
header_old = """            <text
              x="0"
              y="50%"
              dominantBaseline="central"
              fontFamily="NeveraSVG, Nevera, sans-serif"
              className={`svg-nevera tracking-wider uppercase transition-all duration-300 ${
                isScrolled ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
              }`}
            >"""

header_new = """            <text
              x="0"
              y="50%"
              dominantBaseline="central"
              fontFamily="NeveraSVG, Nevera, sans-serif"
              fontWeight="bold"
              className={`svg-nevera tracking-wider uppercase transition-all duration-300 font-bold ${
                isScrolled ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
              }`}
            >"""

content = content.replace(header_old, header_new)


# 2. Update Footer Logo
footer_old = """          <div className="flex items-center gap-3">
            <span className="font-nevera text-2xl tracking-wider uppercase text-white">
              Aerial
            </span>
          </div>"""

footer_new = """          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('Home')}>
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

content = content.replace(footer_old, footer_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Logos updated successfully")
