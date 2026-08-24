const swatches = [['Warm Light Bone Cream', '#F8F5EC'], ['Deep Obsidian', '#121316'], ['Retro Electric Purple', '#6C3BFF'], ['Flat black wordmark', '#000000']];

export function BrandSwatches() {
  return <div className="brand-swatches">{swatches.map(([label, value]) => <div className="swatch" key={label}><span style={{ backgroundColor: value }} /><b>{label}</b><code>{value}</code></div>)}</div>;
}
