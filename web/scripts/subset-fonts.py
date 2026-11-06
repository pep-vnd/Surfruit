"""Retain Latin languages and site symbols. Requires fonttools[woff]."""
from pathlib import Path
from fontTools import subset

root = Path(__file__).resolve().parents[1]
text = ''.join(p.read_text() for p in (root / 'src').glob('*.mjs'))
unicodes = set(range(0x250)) | set(range(0x2000, 0x2070)) | set(range(0x2190, 0x2200)) | {ord(c) for c in text}
for name in ['sans', 'display']:
    options = subset.Options()
    options.flavor = 'woff2'
    font = subset.load_font(str(root / 'assets' / f'{name}.woff2'), options)
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=unicodes)
    worker.subset(font)
    output = root / 'assets' / f'{name}-latin.woff2'
    subset.save_font(font, str(output), options)
    print(name, (root / 'assets' / f'{name}.woff2').stat().st_size, '->', output.stat().st_size)
