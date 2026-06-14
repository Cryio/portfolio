// ============================================================================
// Firewatch "Launch Site" parallax — using the original codepen's exact layer
// assets (the Firewatch website art), recolored to this site's palette.
//
// Each PNG is a single-silhouette layer; we render it as a CSS mask and fill it
// with a palette color (CSS var), so the shapes are pixel-for-pixel the originals
// but the colors follow the page theme (warm sunset in light, deep dusk in dark).
//
// Source order (back → front): layer6 … layer1. layer7 (the sky/sun plate) is
// replaced by this site's own themed sky + sun.
// ============================================================================
import layer1 from "@/assets/parallax/layer1.png";
import layer2 from "@/assets/parallax/layer2.png";
import layer3 from "@/assets/parallax/layer3.png";
import layer4 from "@/assets/parallax/layer4.png";
import layer5 from "@/assets/parallax/layer5.png";
import layer6 from "@/assets/parallax/layer6.png";

export interface FWLayer {
  src: string;
  /** Palette CSS variable used to fill the silhouette. */
  colorVar: string;
  /** Horizontal mouse-parallax shift (px) at full pointer deflection. */
  shift: number;
  /** Vertical scroll-parallax travel (px). */
  scroll: number;
  /** Gaussian blur (px) applied to the silhouette — softens the most distant row. */
  blur?: number;
}

// Back (lightest) → front (darkest).
export const FW_LAYERS: FWLayer[] = [
  { src: layer6, colorVar: "--fw-r0", shift: 8, scroll: 30, blur: 6 },
  { src: layer5, colorVar: "--fw-r1", shift: 14, scroll: 48 },
  { src: layer4, colorVar: "--fw-r2", shift: 22, scroll: 70 },
  { src: layer3, colorVar: "--fw-r3", shift: 32, scroll: 96 },
  { src: layer2, colorVar: "--fw-r4", shift: 46, scroll: 128 },
  { src: layer1, colorVar: "--fw-r5", shift: 64, scroll: 168 },
];
