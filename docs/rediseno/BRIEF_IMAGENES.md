# Encargo v3: 12 ilustraciones (solo imágenes)

Tu ÚNICA tarea es generar imágenes con tu herramienta de generación de imágenes y guardarlas en esta carpeta. No escribas ni modifiques código ni toques otras carpetas.

## Referencia: el estilo de la versión 1
Las imágenes de `..\scenes\` (versión 1) gustaron por su ambiente: espacio negro profundo, poco poblado, mucho aire, iluminación sobria y cinematográfica. **Mantén exactamente ese estilo, esa luz y esa densidad baja.** Úsalas como referencia visual.

Las de `..\scenes-v2\` NO gustaron: demasiado pobladas, demasiado luminosas, demasiada nebulosa. Evita ese resultado.

## Lo único que cambia: la distribución
En la versión 1, toda la acción estaba en el tercio derecho y el resto de la imagen quedaba vacío. Ahora, **los elementos deben repartirse por distintas zonas del encuadre**: arriba a la izquierda, centro, derecha, abajo… según la escena. Seguirá habiendo mucho espacio negro, pero repartido entre los elementos, no como media imagen vacía.

- Pocos elementos: 1 protagonista grande, 1–2 naves medianas y unas pocas escuadrillas o cazas pequeños dispersos. Nunca enjambres.
- Cada escena con una distribución distinta (el protagonista no siempre a la derecha).
- **Zona de rótulo:** el cuarto inferior izquierdo queda libre (solo estrellas) porque ahí irá un título.
- Nada importante pegado a los bordes: la imagen se recorta para 16:9 y para móvil.

## Formato
- Por escena: `NN-nombre-desktop.png` horizontal (mínimo 1536×1024) y `NN-nombre-mobile.png` vertical (mínimo 1024×1536). En la vertical, reparte los elementos a lo alto y deja libre el cuarto inferior.
- Sin texto, letras, logotipos, marcas de agua, interfaz, marcos ni bordes.

## Estilo (repítelo en cada prompt)
Fotografía cinematográfica de efectos especiales prácticos de ciencia ficción clásica: maquetas filmadas a contraluz en el espacio. Fotorrealista y muy detallada. Negros profundos azulados, mucho espacio vacío con estrellas finas, luz clave cálida y dura desde un lado que dibuja filos, relleno azul frío muy débil. Nebulosa apenas perceptible o ninguna. Láseres finos y escasos, rojos de un bando y verdes del otro. Toberas blanco-azuladas. Grano de película sutil. Nada de amarillo saturado.

## Diseños recurrentes (los mismos que en la versión 1)
- **Estación de combate:** esfera gigantesca gris oscura con bandas de paneles, trinchera ecuatorial y gran disco cóncavo en el hemisferio superior, con luces en el lado en sombra.
- **Nave capital de mando:** cuña alargada gris oscura con casco escalonado, torre de mando con dos cúpulas de sensores y tres toberas azuladas.
- **Cazas atacantes:** cuatro alas en X. **Cazas defensores:** cabina esférica y dos alas hexagonales.

## Escenas (protagonista y reparto)
1. `01-inicio`: vista general. La estación grande arriba a la derecha y la nave capital en el centro-izquierda, más baja. Una escuadrilla pequeña en el centro y un par de cazas lejanos arriba a la izquierda.
2. `02-sobre-mi`: la curvatura de la superficie de la estación cruza la parte superior del encuadre de lado a lado. Una formación de cazas atacantes rasantes en el centro, perseguida por dos defensores a la izquierda. La nave capital, pequeña, a la derecha.
3. `03-experiencia`: el casco de la nave capital en diagonal desde arriba a la izquierda hacia el centro-derecha, con alguna batería disparando. Una escolta pequeña a la derecha. La estación lejana en la parte superior central.
4. `04-tecnologias`: desde el puente en penumbra, grandes ventanales con marcos a lo ancho de la parte superior y central. A través de ellos, la estación a la izquierda, la nave capital pequeña a la derecha y unos pocos cazas. Las consolas, tenues, abajo a la derecha.
5. `05-proyectos`: entre escuadrillas. Un caza grande en primer plano en el centro-derecha, dos o tres cazas medianos repartidos a la izquierda y arriba, y la estación pequeña arriba a la izquierda.
6. `06-contacto`: la nave capital ocupa la mitad superior en horizontal, con su hangar iluminado en el centro. Un caza defensor regresa desde la izquierda. La batalla, lejana y tenue, abajo a la derecha.

## Coherencia
Genera primero `01-inicio-desktop` usando como referencia `..\scenes\01-inicio-desktop.png` para mantener diseños, luz y densidad. Úsala después como referencia para las demás. Revisa cada resultado y repite cualquiera con texto, deformaciones, exceso de naves, nebulosa intensa o con la acción concentrada en un solo lado.

Al terminar, responde con la lista de archivos y sus dimensiones.
