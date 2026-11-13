import { scenes } from '../data/scenes';
import { SceneEffects } from './sceneEffects';

interface Bounds {
  top: number;
  height: number;
  /** Bottom of the full-frame intro shot, where the content panels begin. */
  introBottom: number;
}

export interface SceneState {
  from: number;
  to: number;
  /** 0–1 blend between `from` and `to`. */
  blend: number;
  /** 0–1 progress through the active section, drives the slow camera push. */
  local: number;
  active: number;
}

const STORAGE_KEY = 'jparvel:scene-reduced';
/** Backdrop dim during the intro shot and while reading content panels. */
const REST_DIM = 0.08;
const READ_DIM = 0.5;
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothRange = (edge0: number, edge1: number, t: number) => smooth(clamp((t - edge0) / (edge1 - edge0)));

/**
 * Drives the fixed cinematic backdrop from the page scroll:
 * cross-fades between section scenes, applies a slow camera push inside each section,
 * lazy-loads neighbouring images and feeds the effects layer.
 */
export function startSceneDirector() {
  const root = document.getElementById('scene-backdrop');
  const canvas = document.getElementById('scene-effects') as HTMLCanvasElement | null;
  if (!root || !canvas) return;

  const layers = scenes.map(
    (scene) => root.querySelector<HTMLElement>(`[data-scene="${scene.section}"]`)!,
  );
  const sections = scenes.map((scene) => document.getElementById(scene.section));
  if (sections.some((section) => !section) || layers.some((layer) => !layer)) return;

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let userReduced = false;
  try {
    userReduced = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    /* Storage may be unavailable. */
  }
  const reduced = () => userReduced || motion.matches;

  const effects = new SceneEffects(canvas);
  const dip = root.querySelector<HTMLElement>('.scene-dip') ?? document.createElement('div');
  // Motion blur on full-screen images is costly: only on desktop-class screens.
  const blurAllowed = !matchMedia('(pointer: coarse)').matches && window.innerWidth >= 1024;
  const events = new AbortController();
  const options = { signal: events.signal };
  let bounds: Bounds[] = [];
  let header = 97;
  let frame = 0;
  let jumpTarget: number | null = null;
  let jumpTimer = 0;

  const activate = (index: number) => {
    const layer = layers[index];
    if (!layer || layer.dataset.loaded === 'true') return;
    layer.dataset.loaded = 'true';
    layer.querySelectorAll<HTMLSourceElement | HTMLImageElement>('[data-srcset]').forEach((node) => {
      node.srcset = node.dataset.srcset!;
      node.removeAttribute('data-srcset');
    });
    const img = layer.querySelector<HTMLImageElement>('img[data-src]');
    if (img) {
      img.src = img.dataset.src!;
      img.removeAttribute('data-src');
    }
  };
  layers[0]!.dataset.loaded = 'true';

  const measure = () => {
    header =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) ||
      97;
    bounds = sections.map((section) => {
      const rect = section!.getBoundingClientRect();
      const intro = section!.querySelector('.scene-intro')?.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        height: rect.height,
        introBottom: (intro ?? rect).bottom + window.scrollY,
      };
    });
  };

  const sample = (): SceneState => {
    if (jumpTarget !== null) {
      return { from: jumpTarget, to: jumpTarget, blend: 0, local: 0, active: jumpTarget };
    }
    const viewport = window.innerHeight;
    // Probe a little below the header so the scene follows what is being read.
    const probe = window.scrollY + header + viewport * 0.3;
    let active = 0;
    for (let i = 1; i < bounds.length; i++) {
      const previous = bounds[i - 1]!;
      const current = bounds[i]!;
      const width = Math.min(0.55 * viewport, 0.4 * Math.min(previous.height, current.height));
      const start = current.top - width / 2;
      if (probe < start) break;
      if (probe < start + width) {
        const blend = clamp((probe - start) / width);
        return { from: i - 1, to: i, blend, local: blend < 0.5 ? 1 : 0, active: blend < 0.5 ? i - 1 : i };
      }
      active = i;
    }
    const section = bounds[active]!;
    const local = clamp((probe - section.top) / Math.max(1, section.height));
    return { from: active, to: active, blend: 0, local, active };
  };

  /** Resting camera inside a section: a slow push-in and drift as the section is read. */
  const restPose = (local: number) => ({ scale: 1.015 - 0.015 * local, x: 0, y: 0 });

  const poses = layers.map(() => ({ opacity: 0, scale: 1, x: 0, y: 0 }));
  // Match the picture sources and CSS framing, including portrait tablets and ultrawide displays.
  const portrait = matchMedia('(max-aspect-ratio: 4/5)');
  const cover = matchMedia('(min-aspect-ratio: 4/3) and (max-aspect-ratio: 21/9)');

  const pose = (layer: HTMLElement, opacity: number, rawScale: number, rawX: number, rawY: number, blur: number) => {
    const damp = portrait.matches ? 0.15 : 0.35;
    // A constant closer framing gives the phone compositions more presence.
    const scale = (portrait.matches ? 1.08 : 1) * (1 + (rawScale - 1) * damp);
    const x = rawX * damp;
    const y = rawY * damp;
    Object.assign(poses[layers.indexOf(layer)]!, { opacity, scale, x, y });
    layer.style.opacity = opacity.toFixed(3);
    layer.dataset.active = String(opacity > 0);
    if (opacity <= 0) return;
    layer.style.transform = `translate3d(${x.toFixed(2)}%, ${y.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
    layer.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : '';
  };

  /** The scene shows in full during the intro shot and dims while its content is read. */
  const dimFor = (index: number) => {
    const section = bounds[index];
    if (!section || index === 0) return REST_DIM;
    const viewportBottom = window.scrollY + window.innerHeight;
    const reading = smoothRange(section.introBottom, section.introBottom + window.innerHeight * 0.5, viewportBottom);
    return REST_DIM + (READ_DIM - REST_DIM) * reading;
  };

  /** Tell the starfield which image is on screen and how it is framed, so stars avoid ships. */
  const describeBackdrop = () => {
    let dominant = 0;
    poses.forEach((current, index) => {
      if (current.opacity > poses[dominant]!.opacity) dominant = index;
    });
    const img = layers[dominant]!.querySelector('img');
    const scene = scenes[dominant]!;
    const { scale, x, y } = poses[dominant]!;
    effects.setBackdrop(
      img
        ? { img, scale, x, y, focusX: portrait.matches ? 50 : scene.focusX, focusY: scene.focusY, top: header, fit: portrait.matches ? 'width' : cover.matches ? 'cover' : 'contain' }
        : null,
    );
  };

  const render = () => {
    frame = 0;
    const state = sample();
    const still = reduced();
    const moving = state.from !== state.to;

    activate(state.active);
    activate(Math.min(scenes.length - 1, state.active + 1));
    if (state.active > 0) activate(state.active - 1);

    if (still || !moving) {
      // Reduced motion cuts straight to the scene at the midpoint of the transition.
      const shown = moving ? (state.blend < 0.5 ? state.from : state.to) : state.active;
      layers.forEach((layer, index) => {
        if (index !== shown) return pose(layer, 0, 1, 0, 0, 0);
        const rest = still || shown === 0 ? { scale: 1, x: 0, y: 0 } : restPose(state.local);
        pose(layer, 1, rest.scale, rest.x, rest.y, 0);
      });
      dip.style.opacity = '0';
      effects.warp(0);
      root.style.setProperty('--scene-dim', dimFor(state.active).toFixed(3));
    } else {
      // Change of shot: the camera travels towards the next point of the battle.
      const t = smooth(state.blend);
      const { x: dx, y: dy, push } = scenes[state.to]!.travel;
      const travel = 9;
      const blurMax = blurAllowed ? 4 : 0;
      const exit = restPose(1);
      const enter = restPose(0);
      layers.forEach((layer, index) => {
        if (index === state.from) {
          // Outgoing shot pushes in and slides away opposite to the direction of travel.
          const opacity = 1 - smoothRange(0.35, 0.75, t);
          pose(
            layer,
            opacity,
            exit.scale * (1 + 0.45 * push * t),
            exit.x - dx * travel * t,
            exit.y - dy * travel * t,
            blurMax * t,
          );
        } else if (index === state.to) {
          // Incoming shot arrives from the direction of travel, slightly close, and settles.
          const opacity = smoothRange(0.25, 0.65, t);
          const remaining = 1 - t;
          pose(
            layer,
            opacity,
            enter.scale * (1 + 0.2 * remaining),
            enter.x + dx * travel * remaining,
            enter.y + dy * travel * remaining,
            blurMax * remaining,
          );
        } else {
          pose(layer, 0, 1, 0, 0, 0);
        }
      });
      // A brief darkening marks the cut; the stars surge like a short jump.
      const peak = Math.sin(Math.PI * t);
      dip.style.opacity = (0.35 * peak).toFixed(3);
      effects.warp(peak);
      const dim = dimFor(state.from) + (REST_DIM - dimFor(state.from)) * t;
      root.style.setProperty('--scene-dim', dim.toFixed(3));
    }

    root.dataset.scene = scenes[state.active]!.section;
    describeBackdrop();
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  const relayout = () => {
    measure();
    schedule();
  };

  const applyMotion = () => {
    const still = reduced();
    document.documentElement.dataset.sceneReduced = String(still);
    effects.setEnabled(!still);
    schedule();
  };

  // Long menu jumps cut straight to the destination instead of flying through every scene.
  const onAnchor = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const index = scenes.findIndex((scene) => `#${scene.section}` === link.hash);
    if (index < 0 || Math.abs(index - sample().active) <= 1) return;
    activate(index);
    jumpTarget = index;
    schedule();
    clearTimeout(jumpTimer);
    jumpTimer = window.setTimeout(endJump, 1500);
  };
  const endJump = () => {
    if (jumpTarget === null) return;
    jumpTarget = null;
    clearTimeout(jumpTimer);
    schedule();
  };

  const onEffects = (event: Event) => {
    userReduced = (event as CustomEvent<{ reduced: boolean }>).detail.reduced;
    applyMotion();
  };

  const resizeObserver = new ResizeObserver(relayout);
  const main = document.querySelector('main');
  if (main) resizeObserver.observe(main);

  window.addEventListener('scroll', schedule, { ...options, passive: true });
  window.addEventListener('resize', relayout, options);
  window.addEventListener('load', relayout, options);
  window.addEventListener('scene:layout', relayout, options);
  window.addEventListener('scene:effects', onEffects, options);
  window.addEventListener('scrollend', endJump, options);
  window.addEventListener('hashchange', relayout, options);
  document.addEventListener('click', onAnchor, options);
  document.addEventListener(
    'visibilitychange',
    () => effects.setVisible(!document.hidden),
    options,
  );
  motion.addEventListener('change', applyMotion);
  document.fonts?.ready.then(relayout);

  // Pages kept in the back/forward cache only pause; real unloads release everything.
  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) {
        effects.setVisible(false);
        return;
      }
      events.abort();
      motion.removeEventListener('change', applyMotion);
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(jumpTimer);
      effects.dispose();
    },
    options,
  );
  window.addEventListener(
    'pageshow',
    (event) => {
      if (!event.persisted) return;
      effects.setVisible(!document.hidden);
      relayout();
    },
    options,
  );

  measure();
  applyMotion();
  render();
  root.dataset.ready = 'true';
}
