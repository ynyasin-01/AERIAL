import re

file_path = 'src/index.css'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

logo_css = """
/* SVG Logo Draw Animation */
@keyframes logoDraw {
  0% {
    stroke-dashoffset: 400;
    fill: transparent;
    stroke: white;
    stroke-width: 0.5px;
  }
  65% {
    stroke-dashoffset: 0;
    fill: transparent;
    stroke: white;
    stroke-width: 0.5px;
  }
  100% {
    stroke-dashoffset: 0;
    fill: white;
    stroke: transparent;
  }
}

.logo-letter {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: logoDraw 1.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .logo-letter {
    animation: none !important;
    stroke-dashoffset: 0;
    fill: white;
    stroke: transparent;
  }
}
"""

content += logo_css

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("CSS Updated successfully")
