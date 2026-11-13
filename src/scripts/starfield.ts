interface Star {
  x: number;
  y: number;
  z: number;
  /** Previous projected position, used to draw motion streaks. */
  px: number;
  py: number;
  tint: string;
  size: number;
  phase: number;
}

/** Returns 0–1 visibility for a screen position; lets the field avoid the scene's subject. */
export type StarMask = (x: number, y: number) => number;

const TINTS = ['255, 255, 255', '255, 255, 255', '255, 255, 255', '196, 216, 255', '255, 228, 196'];
const NEAR = 0.04;
/** Cruise speed in depth units per second, and the ceiling reached while scrolling fast. */
const CRUISE = 0.035;
const MAX_SPEED = 0.42;
/** Speed at which streaks reach full length (kept independent of MAX_SPEED). */
const STREAK_SPEED = 0.33;

/**
 * Perspective starfield flying slowly towards the viewer.
 * Scrolling adds thrust: stars accelerate and stretch into streaks, then ease back to cruise.
 */
export class Starfield {
  private stars: Star[] = [];
  private speed = CRUISE;
  private thrust = 0;
  private width = 0;
  private height = 0;
  private time = 0;

  constructor(private count: number) {}

  resize(width: number, height: number) {
    const reseed = this.stars.length === 0;
    this.width = width;
    this.height = height;
    if (reseed) {
      this.stars = Array.from({ length: this.count }, () => this.spawn(Math.random()));
    }
    this.stars.forEach((star) => this.reproject(star));
  }

  /** Feed the absolute scroll speed in px/s. */
  push(scrollSpeed: number) {
    this.thrust = Math.max(this.thrust, Math.min(1, scrollSpeed / 3200));
  }

  /** Hold thrust at least at `level` (0–1), e.g. during a change of shot. */
  boost(level: number) {
    this.thrust = Math.max(this.thrust, Math.min(1, level));
  }

  update(dt: number) {
    this.time += dt;
    // Thrust decays smoothly so a scroll gesture feels like a short burst of engines.
    this.thrust *= Math.exp(-dt * 2.2);
    const target = CRUISE + (MAX_SPEED - CRUISE) * this.thrust;
    this.speed += (target - this.speed) * (1 - Math.exp(-dt * 6));

    for (const star of this.stars) {
      const [sx, sy] = this.project(star);
      star.px = sx;
      star.py = sy;
      star.z -= this.speed * dt;
      if (star.z <= NEAR || !this.onScreen(this.project(star))) {
        Object.assign(star, this.spawn(1));
        this.reproject(star);
      }
    }
  }

  draw(context: CanvasRenderingContext2D, mask: StarMask, still = false) {
    const streak = still ? 0 : Math.min(1, (this.speed - CRUISE) / STREAK_SPEED);
    context.lineCap = 'round';

    for (const star of this.stars) {
      const [x, y] = this.project(star);
      const visible = mask(x / this.width, y / this.height);
      if (visible <= 0.01) continue;

      const depth = 1 - star.z;
      const twinkle = still ? 1 : 0.85 + 0.15 * Math.sin(this.time * 2.5 + star.phase);
      const alpha = Math.min(1, 0.15 + depth * depth * 1.1) * twinkle * visible;
      const radius = star.size * (0.35 + depth * 1.6);

      if (streak > 0.05) {
        // Stretch from the previous position; longer for nearer, faster stars.
        const tailX = x + (star.px - x) * (1 + streak * 4);
        const tailY = y + (star.py - y) * (1 + streak * 4);
        context.strokeStyle = `rgba(${star.tint}, ${(alpha * 0.9).toFixed(3)})`;
        context.lineWidth = Math.max(0.6, radius * 1.4);
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(x, y);
        context.stroke();
      } else {
        context.fillStyle = `rgba(${star.tint}, ${alpha.toFixed(3)})`;
        context.beginPath();
        context.arc(x, y, Math.max(0.45, radius), 0, Math.PI * 2);
        context.fill();
      }

      // A soft glint on the brightest, closest stars.
      if (depth > 0.82 && radius > 1.1) {
        context.fillStyle = `rgba(${star.tint}, ${(alpha * 0.18).toFixed(3)})`;
        context.beginPath();
        context.arc(x, y, radius * 3.2, 0, Math.PI * 2);
        context.fill();
      }
    }
  }

  private spawn(depth: number): Star {
    const z = NEAR + depth * (1 - NEAR);
    return {
      x: (Math.random() * 2 - 1) * 1.6,
      y: (Math.random() * 2 - 1) * 1.6,
      z: Math.max(NEAR + 0.05, z * (0.6 + Math.random() * 0.4)),
      px: 0,
      py: 0,
      tint: TINTS[Math.floor(Math.random() * TINTS.length)]!,
      size: 0.5 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
    };
  }

  private reproject(star: Star) {
    const [x, y] = this.project(star);
    star.px = x;
    star.py = y;
  }

  /** Vanishing point near the centre of the frame, slightly towards the scene subject. */
  private project(star: Star): [number, number] {
    const portrait = this.height > this.width * 1.25;
    const cx = this.width * (portrait ? 0.5 : 0.58);
    const cy = this.height * (portrait ? 0.38 : 0.45);
    const focal = Math.max(this.width, this.height) * 0.5;
    return [cx + (star.x / star.z) * focal * 0.5, cy + (star.y / star.z) * focal * 0.5];
  }

  private onScreen([x, y]: [number, number]) {
    const margin = 40;
    return x > -margin && x < this.width + margin && y > -margin && y < this.height + margin;
  }
}
