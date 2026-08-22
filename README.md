# JUDAS EXPERIENCE

**JUDAS** es la capa narrativa, musical e inmersiva del ecosistema BELENTANI. Este repositorio conserva la superficie canónica de experiencia y sus activos de referencia; no es todavía una aplicación web ejecutable.

## Estado actual

| Área | Estado |
| --- | --- |
| Contrato de integración | Definido en `ecosystem.json` y `docs/ECOSYSTEM.md`. |
| Mapa de relaciones | Documentado en `docs/RELATIONSHIP-MAP.md`. |
| Audio canónico | `Judas-demo-pura.mp3`, 239,184 segundos (3:59.184). |
| Integridad de medios | Verificada mediante `media-manifest.json` y SHA-256. |
| Interfaz interactiva | Pendiente de construir en una futura superficie web o móvil. |

## Estructura

`ecosystem.json` es el contrato legible por máquinas. La carpeta `docs/` contiene la arquitectura humana y el mapa de relaciones. `Judas-demo-pura.mp3` es el activo musical actualmente asociado a esta experiencia. `media-manifest.json` registra el tipo, duración, tamaño y huella criptográfica de cada medio.

## Validación local

Requiere Node.js 20 o posterior:

```bash
node scripts/validate-assets.mjs
```

La validación comprueba que todos los archivos declarados existen, conservan el tamaño esperado y coinciden con su hash SHA-256. Debe ejecutarse después de sustituir, comprimir o mover cualquier activo multimedia.

## Dirección de producto

La siguiente evolución no debe consistir en añadir archivos arbitrarios al repositorio. Debe definir primero una experiencia ejecutable con identidad, reproducción de audio, estado de interacción, accesibilidad, diseño responsive y enlaces de integración con BELENTANI y OMEGA. La separación del repositorio es intencional: JUDAS debe seguir siendo un mundo creativo independiente y no una carpeta absorbida por otro producto.
