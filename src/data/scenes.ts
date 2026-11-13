/**
 * Cinematic backdrop for each section of the home page.
 * Images live in src/images/scenes as `NN-key-desktop.*` and `NN-key-mobile.*`.
 * A missing image falls back to the CSS space gradient, so the build never breaks.
 */
export interface SceneConfig {
  /** ID of the section that activates this scene. */
  section: string;
  /** File prefix inside src/images/scenes. */
  file: string;
  /** Horizontal focus of the subject, used for object-position (desktop). */
  focusX: number;
  /** Vertical framing on both variants; keep the top safety margin visible. */
  focusY: number;
  /**
   * Camera move used to arrive at this scene from the previous one: direction of travel
   * (screen space, -1…1) and how far the outgoing shot pushes in (0 = pan, 1 = strong approach).
   */
  travel: { x: number; y: number; push: number };
}

export const scenes: readonly SceneConfig[] = [
  { section: 'home', file: '01-inicio', focusX: 50, focusY: 0, travel: { x: 0, y: 0, push: 0 } },
  { section: 'about', file: '02-sobre-mi', focusX: 55, focusY: 0, travel: { x: 0.8, y: 0.35, push: 0.9 } },
  { section: 'experience', file: '03-experiencia', focusX: 45, focusY: 0, travel: { x: -1, y: 0.1, push: 0.35 } },
  { section: 'services', file: '04-tecnologias', focusX: 55, focusY: 0, travel: { x: 0.35, y: -0.8, push: 1 } },
  { section: 'projects', file: '05-proyectos', focusX: 45, focusY: 0, travel: { x: 1, y: -0.1, push: 0.6 } },
  { section: 'contact', file: '06-contacto', focusX: 55, focusY: 0, travel: { x: -0.8, y: 0.3, push: 0.4 } },
];
