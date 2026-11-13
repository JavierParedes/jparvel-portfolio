# Rediseño: batalla cinematográfica

La portada se lee sobre un fondo fijo a pantalla completa con una ilustración por sección. Cada sección abre con un plano completo de su escena y el título como rótulo; al seguir bajando, el contenido entra en paneles a todo el ancho y la escena se atenúa detrás. Entre secciones hay un cambio de plano: la cámara viaja hacia el siguiente punto de la batalla con desenfoque de movimiento y las estrellas se estiran en estelas. Un campo de estrellas en movimiento da sensación de vuelo: avanza a velocidad de crucero, acelera al hacer scroll y solo ocupa el espacio abierto de cada composición, sin pasar por delante de las naves.

Este enfoque sustituye al motor 3D en tiempo real (Three.js) de la especificación inicial: los modelos generados en código no alcanzaban la calidad visual buscada.

## Piezas

| Archivo | Función |
| --- | --- |
| `src/data/scenes.ts` | Escena de cada sección: archivo y punto de interés para el encuadre. |
| `src/data/sceneImages.ts` | Localiza las imágenes en `src/images/scenes`; si falta alguna, se usa el degradado de respaldo. |
| `src/components/scenes/SceneBackdrop.astro` | Capas de imagen (AVIF/WebP, varios anchos, versión vertical para móvil), canvas de efectos y máscara de contraste. |
| `src/components/scenes/SceneControls.astro` | Botón "Reducir efectos" en la barra táctica. La preferencia se guarda en el navegador. |
| `src/scripts/sceneDirector.ts` | Mide las secciones, calcula el cambio de plano, el zoom y la atenuación de lectura, carga las imágenes vecinas y salta directamente en las navegaciones largas del menú. |
| `src/scripts/sceneEffects.ts` | Canvas con el campo de estrellas; un mapa de luminosidad de la imagen activa oculta las estrellas sobre naves y estación. |
| `src/scripts/starfield.ts` | Estrellas en perspectiva: crucero lento, aceleración con estelas al hacer scroll, variación de brillo y tono. También se usa en las páginas legales. |
| `src/styles/scenes.css` | Barra táctica, rótulos de sección, paneles HUD a todo el ancho, componentes de cada sección y adaptación a móvil. |

## Cambiar o añadir imágenes

Coloca los archivos en `src/images/scenes/` con estos nombres:

```
NN-clave-desktop.webp   horizontal, encuadre completo; el cuarto inferior izquierdo algo más tranquilo para el rótulo
NN-clave-mobile.webp    vertical, encuadre completo; el tercio inferior algo más tranquilo
```

Se aceptan `.webp`, `.png`, `.jpg` y `.avif`; conviene subir WebP de alta calidad para no engordar el repositorio.

Las claves son `01-inicio`, `02-sobre-mi`, `03-experiencia`, `04-tecnologias`, `05-proyectos` y `06-contacto`. Astro genera en el build las versiones optimizadas. Si una escena no tiene imagen, la página sigue funcionando con el fondo de respaldo.

`BRIEF_IMAGENES.md` contiene el encargo con el que se generaron las imágenes actuales (versión a pantalla completa), por si hay que regenerarlas.

Si cambias el encuadre de una imagen, ajusta en `scenes.ts` `focusX` / `focusY`: el punto que debe conservarse al recortar la imagen.

## Accesibilidad y robustez

- Las imágenes y el canvas son decorativos (`aria-hidden`, `alt=""`) y no capturan el ratón ni el teclado.
- Con `prefers-reduced-motion` o el botón "Reducir efectos": sin zoom, estrellas fijas y cambio de escena sin fundido.
- Sin JavaScript se ve la primera escena y todo el contenido.
- Solo se descarga la imagen de la escena actual y las de las vecinas.
- Los efectos se pausan con la pestaña oculta y en la caché de navegación atrás/adelante.
- Las páginas legales y la 404 usan el mismo campo de estrellas a pantalla completa, sin las imágenes de escena.

## Contenido

Se conservan los textos, los enlaces, los proyectos y el formulario (mismo endpoint, campos y script de envío). Cambios de presentación:
- se ha añadido "Experiencia" al menú;
- los formularios tienen etiquetas asociadas a sus campos y los enlaces de iconos tienen nombre accesible;
- la cronología de Experiencia pasa a una sola columna;
- se han retirado del Hero los símbolos decorativos flotantes;
- las barras de habilidad del Hero, antes duplicadas para móvil y escritorio, son ahora un solo bloque.
