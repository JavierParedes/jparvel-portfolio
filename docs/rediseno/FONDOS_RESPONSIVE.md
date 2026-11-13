# Fondos adaptados a escritorio y móvil

## Entregables

Generados con la herramienta integrada de generación de imágenes, sin API ni CLI. Se conservaron los originales generados y se guardaron las versiones WebP de uso web en `src/images/scenes/`:

- `01-inicio-mobile.webp`
- `02-sobre-mi-mobile.webp`
- `03-experiencia-mobile.webp`
- `04-tecnologias-desktop.webp`
- `04-tecnologias-mobile.webp`
- `05-proyectos-mobile.webp`
- `06-contacto-mobile.webp`

Las seis imágenes móviles son composiciones verticales independientes, no recortes de las horizontales. La escena de Tecnologías se sustituye por una flota en el espacio exterior, sin cristal ni cabina. Se mantiene la imagen original de Inicio en escritorio.

## Encuadre

Las imágenes empiezan debajo de la cabecera. El encuadre se alinea arriba para conservar el margen sobre la Estrella de la Muerte. En Inicio se elimina el zoom de reposo. En el resto se suavizan el zoom y los desplazamientos.

En pantallas verticales, el panel de presentación empieza más abajo para mostrar el planeta y la flota antes del texto.

Las pantallas con relación de aspecto entre 4:3 y 21:9 usan `cover`. Las pantallas verticales hasta 4:5 seleccionan la variante móvil, la ajustan al ancho con altura automática y añaden una ampliación fija del 8 % para dar más presencia a las naves y planetas. Así se evitan márgenes laterales sin que una pantalla muy alta fuerce recortes grandes de las alas o los motores. En los demás formatos se usa `contain`, con el campo de estrellas completando el espacio libre. Las consultas CSS, el director de cámara y la máscara de estrellas usan los mismos criterios.

El fondo base es negro, como el espacio de las imágenes, para que los márgenes de `contain` no formen franjas de otro color.

## Prompts utilizados

### Tecnologías, escritorio

Use case: stylized-concept. Asset type: final cinematic website background, panoramic desktop composition, 2560x1440 landscape 16:9. The supplied image is a STYLE REFERENCE ONLY for dark photorealistic Star Wars space cinematography, detailed metal, restrained warm gold rim lighting and blue engines. Create a NEW exterior deep-space fleet scene: a complete Nebulon-B escort frigate with its distinctive connecting spine on the right half, a smaller Corellian CR90 corvette below and to its left, two distant A-wing fighters. Viewed from empty outer space, absolutely NO cockpit, NO glass, NO window frames, NO interior. Subtle stars on near-black space. All ships fully inside frame with generous 15% safety margins from top and sides, fleet concentrated upper-middle/right between 20% and 60% height, left lower third spacious dark negative space for a website text overlay. Elegant realistic cinematic shot, detailed practical-model realism, not cartoon, not infographic, no text, no logos, no watermarks. No large Death Star in this scene. Maintain a coherent aesthetic with the reference while clearly using different ships.

Referencia: `01-inicio-desktop.webp`.

### Inicio, móvil

Use case: stylized-concept. Asset type: final portrait phone website background, tall 9:19.5 aspect ratio, ideally 1080x2340. The supplied image is the reference for the exact scene and style: Death Star, Star Destroyer, small X-wing and TIE fighters in realistic dark Star Wars outer space. Recompose this scene specifically for a tall phone screen, do not simply crop the landscape image. Show the ENTIRE spherical Death Star centered around x60%, y24%, occupying 45% of image width, with clear empty space above its top (at least 12% image height) and all of its edges visible. A complete smaller Star Destroyer across x25-65%, y42%, two tiny fully visible fighters near y48%. All subjects must fit within the central 80% width, with ample black space on every side. Bottom 40% is quiet near-black starfield to receive website text. Restrained warm gold rim lighting, subtle blue engines, sparse realistic stars, film model photorealism. No windows, no cockpit, no text, no logos, no watermark. Deliver one single tall image, not a collage.

Referencia: `01-inicio-desktop.webp`.

### Base común para las otras cinco escenas móviles

Se concatenó esta base con el texto específico de cada escena:

Use case: stylized-concept. Asset type: final tall mobile website background, portrait 9:19.5 aspect ratio ideally 1080x2340. One single portrait image, not a collage. Use the reference ONLY for coherent dark photorealistic Star Wars space cinematography with detailed practical-model ships, restrained gold rim lighting and blue engines. Recompose natively for a phone, NOT a cropped landscape. Sparse stars, deep nearly-black space. Keep all main subjects within central 80% width and between 12% and 55% image height with generous safety margins; lower 40% quiet dark starfield for website text. No text, no watermark, no UI, no logos, no cockpit, no windows, no glass.

#### Tecnologías

New exterior space fleet scene matching the reference fleet: a COMPLETE Nebulon-B escort frigate seen from a three-quarter angle, long connecting spine diagonally from upper-left to lower-right in the top half, a smaller CR90 Corellian corvette below it, two tiny A-wings. Entire frigate visible with all antennae inside frame, fit its long shape within phone width by using depth perspective. Absolutely exterior space only, no Death Star.

Referencia: la nueva imagen de Tecnologías de escritorio.

#### Sobre mí

Scene: flying BELOW a distant immense Death Star, its curved detailed underside hangs across the top quarter with its lower curved edge around y30%; this deliberate partial view should look like a huge spherical space station overhead, NOT a window frame. Below at y35-50% a small squadron of three complete X-wing fighters and two tiny TIE fighters approach the viewer. Keep all fighters fully visible and away from edges, majestic scale, quiet lower half.

#### Experiencia

Scene: one COMPLETE large Imperial Star Destroyer seen in three-quarter view, diagonal composition from x20% y24% to x75% y46%, all of its bridge, engines, and pointed bow INSIDE frame. A small distant complete Death Star at x65% y16%, a tiny escort Star Destroyer and two tiny fighters below the main ship. Distinctive triangular hull, detailed metal, no cut-off bow or engine.

#### Proyectos

Scene: one COMPLETE detailed X-wing starfighter as the hero, three-quarter view with ALL FOUR open wings, ALL laser tips, nose and engines clearly within frame. Fighter positioned around x50% y35%, angled diagonally toward viewer; distant small complete Death Star at x30% y17%, small TIE fighter at x75% y23%, two distant X-wings lower down around y50%. Dramatic but restrained realistic blue engines, not fiery.

#### Contacto

Scene: one COMPLETE Imperial Star Destroyer viewed from slightly behind and below in three-quarter profile, triangular hull crossing x15-85% around y22-38%, all its bow and engines INSIDE frame, bright but restrained blue thrusters. One small complete TIE fighter below around x40% y46%, a few tiny distant escort ships at y50%. Deep space view, no Death Star, uncluttered.

Referencia para Sobre mí, Experiencia, Proyectos y Contacto: `01-inicio-desktop.webp`.

Las proporciones y dimensiones descritas son las solicitadas al generador. Los archivos finales conservan sus dimensiones nativas; Astro crea las variantes optimizadas AVIF y WebP sin ampliarlas.
