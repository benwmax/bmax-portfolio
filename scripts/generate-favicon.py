# Generates public/favicon.svg: the BM_ wordmark outlined to SVG paths.
#
# Outlined (not <text>) because a favicon can't load the Space Mono webfont.
# Bold, not the NavBar's Regular, so strokes survive at 16px. Tracking is pulled
# in by TRACKING font units so three monospace glyphs fill the square instead of
# leaving it mostly empty; past ~40 the B and M collide.
#
# Usage (from the project root):
#   pip install fonttools brotli
#   python3 scripts/generate-favicon.py path/to/SpaceMono-Bold.(ttf|woff2) 30 > public/favicon.svg
# Then regenerate public/favicon-32.png and public/apple-touch-icon.png (180px)
# by rendering the SVG at those sizes (any rasterizer; this repo used Playwright).
#
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
f=TTFont(sys.argv[1]); gs=f.getGlyphSet(); cmap=f.getBestCmap(); upm=f['head'].unitsPerEm
chars=[('B','#ccd4b0'),('M','#ccd4b0'),('_','#00e054')]
adv=f['hmtx'][cmap[ord('B')]][0]-int(sys.argv[2])
# measure ink bounds of the whole run (font units, y-up)
bp=BoundsPen(gs); x=0
for c,_ in chars:
    g=cmap[ord(c)]; gs[g].draw(TransformPen(bp,(1,0,0,1,x,0))); x+=adv
xmin,ymin,xmax,ymax=bp.bounds
SIZE=64; PAD=4
s=(SIZE-2*PAD)/(xmax-xmin)
ox=PAD-xmin*s; oy=SIZE/2+(ymax+ymin)/2*s  # vertically center ink
paths=[]; x=0
for c,col in chars:
    pen=SVGPathPen(gs); g=cmap[ord(c)]
    gs[g].draw(TransformPen(pen,(s,0,0,-s,ox+x*s,oy))); x+=adv
    paths.append(f'<path fill="{col}" d="{pen.getCommands()}"/>')
print(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}">
  <!-- BM_ favicon: the NavBar wordmark set in Space Mono Bold, outlined to paths so it
       renders without the webfont. Bold (not the wordmark's Regular) so the strokes survive
       at 16px; tracked tight per the display-size rule in CLAUDE.md. Colors: --color-bg-page, --color-text-primary, --color-accent green. -->
  <rect width="{SIZE}" height="{SIZE}" rx="6" fill="#0e100f"/>
  {chr(10).join("  "+p for p in paths).strip()}
</svg>''')
