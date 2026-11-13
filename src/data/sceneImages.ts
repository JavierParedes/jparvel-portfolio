import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../images/scenes/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

/** Returns the image for a scene variant, or undefined if it has not been added yet. */
export function sceneImage(file: string, variant: 'desktop' | 'mobile'): ImageMetadata | undefined {
  const match = Object.entries(files).find(([path]) =>
    path.split('/').pop()?.startsWith(`${file}-${variant}.`),
  );
  return match?.[1].default;
}
