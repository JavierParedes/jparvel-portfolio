import { Starfield, type StarMask } from './starfield';

/** The image on screen and its current framing, as applied by the scene director. */
export interface Backdrop {
  img: HTMLImageElement;
  scale: number;
  /** Layer translation in % of the viewport. */
  x: number;
  y: number;
  focusX: number;
  focusY: number;
  /** Offset of the image layer from the top of the screen (the tactical bar). */
  top: number;
  /** Match the image's CSS object-fit so the star mask stays aligned with every composition. */
  fit: 'cover' | 'contain' | 'width';
}

interface LuminanceGrid {
  width: number;
  height: number;
  data: Float32Array;
}

const GRID_WIDTH = 72;

const smooth = (edge0: number, edge1: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/**
 * Full-screen moving starfield over the backdrop images.
 * A coarse luminance map of the image on screen hides stars over anything lit
 * (station, ships, lasers), so they only travel through open space.
 */
export class SceneEffects {
  private context: CanvasRenderingContext2D | null;
  private stars: Starfield;
  private width = 0;
  private height = 0;
  private frame = 0;
  private last = 0;
  private lastScroll = window.scrollY;
  private enabled = true;
  private visible = !document.hidden;
  private backdrop: Backdrop | null = null;
  private grids = new Map<string, LuminanceGrid | null>();

  constructor(
    private canvas: HTMLCanvasElement,
    private masked = true,
  ) {
    this.context = canvas.getContext('2d');
    this.stars = new Starfield(window.innerWidth < 768 ? 260 : 620);
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  setBackdrop(backdrop: Backdrop | null) {
    this.backdrop = backdrop;
    if (!this.enabled) this.paint(true);
  }

  /** Sustained thrust (0–1) while the camera travels between scenes. */
  warp(level: number) {
    if (level > 0) this.stars.boost(level);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.restart();
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.restart();
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    window.removeEventListener('resize', this.resize);
    this.context?.clearRect(0, 0, this.width, this.height);
  }

  private mask: StarMask = (x, y) => {
    if (!this.masked || !this.backdrop) return 1;
    const grid = this.gridFor(this.backdrop.img);
    if (!grid) return 1;
    const [u, v] = this.toImage(x * this.width, y * this.height, this.backdrop);
    if (u < 0 || u > 1 || v < 0 || v > 1) return 1;
    const gx = Math.min(grid.width - 1, Math.floor(u * grid.width));
    const gy = Math.min(grid.height - 1, Math.floor(v * grid.height));
    return 1 - smooth(0.06, 0.18, grid.data[gy * grid.width + gx]!);
  };

  /** Screen pixel -> normalised image coordinates, undoing the layer transform and object-fit. */
  private toImage(sx: number, sy: number, b: Backdrop): [number, number] {
    // The image layer starts below the tactical bar.
    const W = this.width;
    const H = this.height - b.top;
    const ly = sy - b.top;
    const originX = (b.focusX / 100) * W;
    const originY = (b.focusY / 100) * H;
    const px = originX + (sx - originX - (b.x / 100) * W) / b.scale;
    const py = originY + (ly - originY - (b.y / 100) * H) / b.scale;
    const nw = b.img.naturalWidth;
    const nh = b.img.naturalHeight;
    const k = b.fit === 'width' ? W / nw : b.fit === 'contain' ? Math.min(W / nw, H / nh) : Math.max(W / nw, H / nh);
    const dw = nw * k;
    const dh = nh * k;
    const posX = b.focusX / 100;
    const posY = b.focusY / 100;
    return [(px - (W - dw) * posX) / dw, (py - (H - dh) * posY) / dh];
  }

  /** Builds (once per image) a blurred, dilated luminance map at low resolution. */
  private gridFor(img: HTMLImageElement): LuminanceGrid | null {
    const key = img.currentSrc || img.src;
    if (!key || !img.complete || !img.naturalWidth) return null;
    if (this.grids.has(key)) return this.grids.get(key)!;
    let grid: LuminanceGrid | null = null;
    try {
      const width = GRID_WIDTH;
      const height = Math.max(1, Math.round((GRID_WIDTH * img.naturalHeight) / img.naturalWidth));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { willReadFrequently: true })!;
      context.drawImage(img, 0, 0, width, height);
      const pixels = context.getImageData(0, 0, width, height).data;
      const raw = new Float32Array(width * height);
      for (let i = 0; i < raw.length; i++) {
        raw[i] = (0.299 * pixels[i * 4]! + 0.587 * pixels[i * 4 + 1]! + 0.114 * pixels[i * 4 + 2]!) / 255;
      }
      // Dilate so stars also keep clear of the edges of lit objects.
      const data = new Float32Array(raw.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let max = 0;
          for (let oy = -1; oy <= 1; oy++) {
            for (let ox = -1; ox <= 1; ox++) {
              const nx = Math.min(width - 1, Math.max(0, x + ox));
              const ny = Math.min(height - 1, Math.max(0, y + oy));
              max = Math.max(max, raw[ny * width + nx]!);
            }
          }
          data[y * width + x] = max;
        }
      }
      grid = { width, height, data };
    } catch {
      grid = null;
    }
    this.grids.set(key, grid);
    return grid;
  }

  private restart() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.last = 0;
    if (!this.enabled) {
      // Reduced motion: a still sky instead of an empty one.
      this.paint(true);
      return;
    }
    if (this.visible) this.frame = requestAnimationFrame(this.tick);
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.context?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.stars.resize(this.width, this.height);
    if (!this.enabled) this.paint(true);
  };

  private paint(still: boolean) {
    if (!this.context) return;
    this.context.clearRect(0, 0, this.width, this.height);
    this.stars.draw(this.context, this.mask, still);
  }

  private tick = (now: number) => {
    this.frame = 0;
    if (!this.enabled || !this.visible) return;
    // Clamp the step so returning to the tab never makes the stars jump.
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 0;
    this.last = now;
    if (dt > 0) {
      const scrolled = Math.abs(window.scrollY - this.lastScroll);
      this.stars.push(scrolled / dt);
    }
    this.lastScroll = window.scrollY;
    this.stars.update(dt);
    this.paint(false);
    this.frame = requestAnimationFrame(this.tick);
  };
}
