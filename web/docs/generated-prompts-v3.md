# Materiales naturales — revisión de textura

Herramienta integrada `image_gen`, 12 de octubre de 2026. Texturas generadas para la demo; no son fotogrametría de producto real.

Referencia observada: la lámina original `exec-dc527b46-3a3f-4695-ac1f-1d5132ec3ab0.png`. Se mantiene la geometría 3D y la apertura por scroll.

## skin

```text
Use case: product-mockup. Create a square full-bleed PBR color texture of the WHOLE avocado peel in the reference image. The reference is the exact material/color target: dark almost black olive skin, irregular large tightly packed rounded raised pebbles, little lime olive flecks in valleys, smooth oily surfaces on each pebble. Extreme tangible natural macro photography, exactly like reference. Texture only, unwrapped flat sheet, NO fruit outline, no background, no text. About 25 to 35 irregular pebbles across image width, varied size and shape, no regular grid. Gentle diffuse light that retains pebble relief and micro-sheen, no large gradients or broad cast shadow. Seamless edge to edge texture. Avoid small sand grain noise, leathery cracks, uniform green, reptile scales, illustration or CGI.
```

## pulp

```text
Use case: product-mockup. Make a square seamless full-bleed photographic PBR color texture of ONLY the creamy yellow avocado flesh from the supplied reference. Exact texture reference is the yellow cut flesh around the seed: buttery warm pale yellow, delicate irregular moist fibers and tiny pores, translucent creamy edible tissue, faint wispy streaks, natural very subtle yellow mottling, micro droplets. Entire square should be this fairly uniform yellow flesh material. NO green rim, NO brown seed, NO cavity, NO silhouette, NO avocado outline, NO background, NO shadow gradient, NO text. Diffuse macro food photography, even illumination. This will cover real 3D avocado flesh geometry; organic detail clearly resolved, absolutely not featureless flat color and not coarse noise, no bread, no sponge.
```

## stone

```text
Use case: product-mockup. Create a square seamless full-bleed photographic PBR color texture matching ONLY the reddish chestnut avocado seed skin in the supplied reference. Exact target: deep warm reddish brown with fine irregular dark russet mottling and wispy tiny lighter flecks, thin taut moist natural seed skin, subtle pores, satin oily surface, rich chestnut brown. Flatten the material into a uniform sheet for wrapping a real sphere. NO ball outline, NO avocado flesh, no background, no text, no large highlights or cast shadows. Moderate fine-scale organic mottling like reference, mostly dark reddish brown with small amber freckles. NOT cracked, NOT flaky papery bark, NOT bread crust, NOT marble, NOT wood grain, NOT beige patches. Macro photographic detail and even diffuse illumination.
```

## Pulpa refinada

```text
Use case: product-mockup. Generate a technical material texture map for a 3D avocado, square. Every pixel must be covered with pale creamy avocado flesh: light buttery yellow with extremely fine moist pores and wispy delicate irregular fibers, almost smooth from a distance but photorealistic close up. This image represents an area 12 cm wide, so pores/fibers are MICRO detail, not huge channels. Restrained fine yellow variation; mostly light cream yellow, like the pale yellow flesh of a ripe Hass avocado. Orthographic flat macro photograph under even diffuse lighting, no shadows or highlights. FULL BLEED entirely filled square with seamless repeating edges. Absolutely NO fruit outline, no isolated object, no transparency, no background, no pit, no cavity, no rind, no green edge. NOT mango, NOT pineapple, NOT butter, no broad fibrous ribbons, no large diagonal grooves, no noise/grain filter. Natural fresh cut avocado tissue.
```


## Recursos finales

- `web/assets/avocado-skin-natural.webp` ← `exec-f3ffdcce-6d17-4635-94da-119a77ed854e.png`.
- `web/assets/avocado-stone-natural.webp` ← `exec-0ecbe582-488c-4223-84ed-e48fc19f697b.png`.
- `web/assets/avocado-pulp-natural.webp` ← `exec-c88a2e61-a498-4e8e-901e-6b0b759deb5b.png`.

Los tres archivos finales son WebP de 1254 × 1254, optimizados a calidad 91. Se descartó la primera pulpa (`exec-e887dc31-8ce7-4bf0-bd2e-43f000dc832a.png`) por tener fibras demasiado grandes. Los originales permanecen en la carpeta de generación; los archivos usados por la web están dentro del proyecto.
