import type { BlogPost } from "@/lib/seo";

const guides: Record<string, BlogPost> = {
  "what-is-heic": {
    slug: "what-is-heic",
    title: "¿Qué es un archivo HEIC? Formato y extensión .heic explicados | OpenMyHEIC",
    description: "¿Qué es un archivo HEIC? Aprende qué significa, qué es la extensión .heic, HEIF vs HEIC y cómo abrir archivos HEIC o convertirlos en cualquier dispositivo.",
    h1: "¿Qué es un archivo HEIC? La guía completa del formato de imagen de Apple",
    content: `## ¿Qué es un archivo HEIC?

HEIC son las siglas de **High Efficiency Image Container** (contenedor de imagen de alta eficiencia). Es un formato de archivo basado en el estándar HEIF (High Efficiency Image Format), desarrollado por el Moving Picture Experts Group (MPEG). Apple adoptó HEIC como formato de foto predeterminado en iPhone y iPad a partir de iOS 11, en 2017. Si ves una foto con la **extensión .heic**, casi con total seguridad procede de un dispositivo Apple.

## HEIF vs HEIC: ¿en qué se diferencian?

Estos dos términos se confunden a menudo. **HEIF** es el estándar contenedor (algo así como una familia de formatos), mientras que **HEIC** es la variante concreta que guarda imágenes comprimidas con el códec HEVC (H.265) — la que usa Apple. En la práctica, un archivo .heif y uno .heic se comportan igual, y cualquier herramienta que abra uno suele abrir el otro.

## ¿Por qué Apple usa HEIC?

Apple eligió HEIC por varias razones de peso:

### Compresión superior
Un archivo HEIC ocupa aproximadamente un **50% menos** que un JPEG equivalente manteniendo la misma calidad visual. Eso significa que tu iPhone puede guardar casi el doble de fotos en el mismo espacio de almacenamiento.

### Mejor calidad de imagen
A igual tamaño de archivo, HEIC ofrece una calidad de imagen notablemente mejor que JPEG. Esto se debe a que HEIC usa algoritmos de compresión más avanzados (basados en el códec de vídeo HEVC/H.265) que conservan mejor los detalles finos y reducen los artefactos de compresión.

### Funciones avanzadas
HEIC admite funciones que JPEG no puede ofrecer:
- **Profundidad de color de 16 bits** (frente a los 8 bits de JPEG), con degradados más suaves y colores más precisos
- **Transparencia** (canal alfa)
- **Varias imágenes** en un solo archivo (Live Photos, ráfagas, secuencias de imágenes)
- **Edición no destructiva**: los ajustes se guardan junto a la imagen original
- **Mapas de profundidad** para las fotos en modo Retrato

## El problema de compatibilidad

Pese a sus ventajas técnicas, HEIC tiene un gran inconveniente: la **compatibilidad limitada**. Muchos dispositivos y programas no admiten HEIC de forma nativa:

- **Windows**: Windows 10/11 requiere instalar las HEIF Image Extensions desde la Microsoft Store (a veces de pago)
- **Android**: la mayoría de dispositivos Android no pueden abrir archivos HEIC de forma nativa
- **Navegadores web**: ningún navegador importante muestra archivos HEIC directamente
- **Redes sociales**: la mayoría de plataformas convierten HEIC a JPEG al subirlo, pero algunas pueden rechazar los archivos HEIC
- **Correo electrónico**: los adjuntos HEIC pueden no previsualizarse correctamente para los destinatarios

## Cómo abrir archivos HEIC

### En Mac
macOS es compatible con HEIC de forma nativa. Basta con hacer doble clic en el archivo para abrirlo en Vista Previa. También puedes usar Fotos, Pixelmator o cualquier editor de imágenes moderno para Mac.

### En Windows
Tienes varias opciones:
1. Instalar las **HEIF Image Extensions** desde la Microsoft Store
2. Usar un conversor gratuito como **OpenMyHEIC.com** para convertir a JPG
3. Usar programas de terceros como IrfanView o GIMP

### En cualquier dispositivo
La solución universal más sencilla para abrir archivos HEIC es usar un conversor online como OpenMyHEIC.com. Funciona en cualquier navegador y convierte tus archivos al instante sin subirlos a ningún servidor.

## HEIC vs JPEG: comparativa detallada

| Característica | HEIC | JPEG |
|---------|------|------|
| Tamaño de archivo | ~50% menor | Referencia |
| Calidad | Superior | Buena |
| Profundidad de color | 16 bits | 8 bits |
| Transparencia | Sí | No |
| Animación | Sí (Live Photos) | No |
| Compatibilidad | Limitada | Universal |
| Edición | No destructiva | Destructiva |

## ¿Conviene guardar las fotos en HEIC?

Para almacenarlas en tu iPhone, HEIC es la mejor opción: ahorra espacio sin perder calidad. Sin embargo, cuando compartes fotos con otras personas o las usas en plataformas que no son de Apple, lo recomendable es convertirlas a JPG o PNG.

## Cómo hacer que el iPhone deje de sacar fotos en HEIC

Si prefieres que tu iPhone dispare en JPEG:
1. Abre **Ajustes**
2. Toca **Cámara**
3. Toca **Formatos**
4. Selecciona **Más compatible**

Con esto, tu iPhone guardará las fotos como JPEG en lugar de HEIC. Ten en cuenta que ocuparán aproximadamente el doble de espacio.

## Convierte tus archivos HEIC fácilmente

¿Listo para convertir tus archivos HEIC? Usa nuestro [conversor gratuito de HEIC a JPG](/es): es instantáneo, privado y funciona directamente en tu navegador. Sin subir archivos y sin crear cuenta.`,
  },
  "how-to-convert-heic-to-jpg-windows": {
    slug: "how-to-convert-heic-to-jpg-windows",
    title: "Cómo pasar de HEIC a JPG en Windows 10/11 (3 métodos fáciles) | OpenMyHEIC",
    description: "Cómo pasar de HEIC a JPG en Windows 10 y 11 paso a paso. Tres métodos fáciles de convertir HEIC a JPG: conversor online gratis, extensiones HEIF y software libre.",
    h1: "Cómo pasar de HEIC a JPG en Windows 10/11 — paso a paso",
    content: `## Cómo pasar de HEIC a JPG en Windows

¿Te han enviado fotos HEIC desde un iPhone y no puedes abrirlas en tu PC con Windows? No eres el único. HEIC es el formato de foto predeterminado de Apple, y Windows no lo admite del todo de serie. Aquí tienes tres formas fáciles de cambiar el formato HEIC a JPG en Windows 10 y Windows 11.

## Método 1: Usar OpenMyHEIC.com (el más rápido y privado)

La forma más rápida de convertir HEIC a JPG en Windows es usar nuestro conversor online gratuito. No hay que instalar ningún programa.

### Pasos:
1. **Abre tu navegador** y entra en [OpenMyHEIC.com](/es)
2. **Arrastra y suelta** tu archivo HEIC sobre el conversor, o haz clic en "Seleccionar archivos" para buscarlo
3. **Ajusta la calidad** con el deslizador (recomendamos 92%)
4. **Haz clic en "Convertir"** y espera unos segundos
5. **Haz clic en "Descargar"** para guardar el archivo JPG

**Por qué este método es el mejor:**
- No hay que instalar nada
- Los archivos nunca salen de tu ordenador (la conversión ocurre en tu navegador)
- Funciona en cualquier versión de Windows
- Totalmente gratis y sin límites

## Método 2: Instalar las extensiones HEIF en Windows

Windows 10 y 11 pueden abrir archivos HEIC de forma nativa si instalas las extensiones adecuadas.

### Pasos:
1. Abre la **Microsoft Store** en tu PC con Windows
2. Busca **"HEIF Image Extensions"**
3. Haz clic en **Instalar** (puede ser gratis o costar 0,99 $)
4. Puede que también necesites las **"HEVC Video Extensions"** (0,99 $) para compatibilidad completa
5. Tras la instalación, podrás abrir archivos HEIC con la app **Fotos**
6. Para guardar como JPG: abre el archivo HEIC en Fotos → haz clic en el menú de los tres puntos → **Guardar como** → elige **JPG**

**Nota:** este método requiere una compra en la Microsoft Store y solo funciona en Windows 10/11.

## Método 3: Usar software gratuito de escritorio

Hay varios programas gratuitos capaces de convertir HEIC a JPG en Windows:

### IrfanView (gratis)
1. Descarga e instala [IrfanView](https://www.irfanview.com/)
2. Instala el paquete de **Plugins** (incluye compatibilidad con HEIC)
3. Abre tu archivo HEIC en IrfanView
4. Ve a **Archivo → Guardar como** → selecciona el formato **JPG**
5. Haz clic en **Guardar**

### GIMP (gratis)
1. Descarga e instala [GIMP](https://www.gimp.org/)
2. Abre tu archivo HEIC (GIMP 2.10+ es compatible con HEIC)
3. Ve a **Archivo → Exportar como**
4. Cambia la extensión a **.jpg**
5. Haz clic en **Exportar**

## ¿Qué método elegir?

| Método | Velocidad | Privacidad | Coste | Conversión en lote |
|--------|-------|---------|------|---------------|
| OpenMyHEIC.com | ⚡ Instantáneo | 🔒 Máxima | Gratis | ✅ Sí |
| Extensiones HEIF | Rápido | Buena | 0-0,99 $ | ❌ De uno en uno |
| IrfanView | Rápido | Buena | Gratis | ✅ Sí |
| GIMP | Lento | Buena | Gratis | ❌ No |

Para la mayoría de usuarios, **OpenMyHEIC.com** es la opción más rápida y cómoda. No requiere instalación, funciona al instante y mantiene tus fotos completamente privadas.

## Cómo abrir archivos HEIC en Windows 11 (sin convertirlos)

Si solo quieres **abrir un archivo HEIC en Windows 11** o Windows 10 sin convertirlo, instala las HEIF Image Extensions gratuitas desde la Microsoft Store (método 2 de arriba). A partir de ese momento, las fotos HEIC se abrirán en la app Fotos y mostrarán miniaturas en el Explorador de archivos. Si necesitas que la foto funcione en otros programas — o quieres evitar la Store por completo — pasar de HEIC a JPG sigue siendo la opción más fiable.

## Conversión en lote en Windows

¿Necesitas convertir muchos archivos HEIC de una vez? Usa nuestro [conversor por lotes](/es/batch-convert) para convertir varios archivos a la vez y descargarlos todos en un ZIP.`,
    schemaSteps: [
      { name: "Abre el conversor", text: "Abre tu navegador web y entra en OpenMyHEIC.com" },
      { name: "Sube tu archivo HEIC", text: "Arrastra y suelta tu archivo HEIC sobre el área del conversor, o haz clic en 'Seleccionar archivos' para buscarlo en tu ordenador" },
      { name: "Ajusta la calidad", text: "Usa el deslizador de calidad para elegir el nivel que prefieras. Para la mayoría de usos recomendamos 92%." },
      { name: "Convierte el archivo", text: "Haz clic en el botón 'Convertir' y espera unos segundos a que termine la conversión" },
      { name: "Descarga el JPG", text: "Haz clic en el botón 'Descargar' para guardar el archivo JPG convertido en tu ordenador" },
    ],
  },
  "how-to-convert-heic-to-jpg-mac": {
    slug: "how-to-convert-heic-to-jpg-mac",
    title: "Cómo pasar de HEIC a JPG en Mac (4 métodos fáciles) | OpenMyHEIC",
    description: "Cómo convertir HEIC a JPG en Mac con Vista Previa, Automator, Terminal o un conversor online gratis. Cuatro métodos paso a paso para pasar HEIC a JPG en macOS.",
    h1: "Cómo pasar de HEIC a JPG en Mac — 4 formas fáciles",
    content: `## Cómo convertir HEIC a JPG en Mac

Aunque macOS es compatible con los archivos HEIC de forma nativa, puede que necesites convertirlos a JPG para compartirlos con usuarios de Windows, subirlos a alguna web o usarlos en ciertas aplicaciones. Aquí tienes cuatro métodos fáciles.

## Método 1: Usar OpenMyHEIC.com (el más rápido)

El método más rápido, y funciona en cualquier Mac con un navegador.

### Pasos:
1. **Abre Safari** (o cualquier navegador) y entra en [OpenMyHEIC.com](/es)
2. **Arrastra y suelta** tu archivo HEIC sobre el conversor
3. **Ajusta la calidad** si lo necesitas (el 92% por defecto va muy bien)
4. **Haz clic en "Convertir"** — la conversión tarda segundos
5. **Haz clic en "Descargar"** para guardar el JPG

**Ventajas:** no necesitas instalar nada, los archivos se quedan en tu Mac (privacidad total) y funciona al instante.

## Método 2: Usar Vista Previa (integrado en macOS)

Vista Previa es el visor de imágenes integrado de macOS y puede exportar de HEIC a JPG.

### Pasos:
1. **Haz clic derecho** en el archivo HEIC → **Abrir con** → **Vista Previa**
2. Haz clic en **Archivo** en la barra de menús
3. Selecciona **Exportar...**
4. En el desplegable **Formato**, elige **JPEG**
5. Ajusta el deslizador de **Calidad**
6. Haz clic en **Guardar**

### Para varios archivos:
1. Selecciona todos los archivos HEIC en el Finder
2. Clic derecho → **Abrir con** → **Vista Previa**
3. En Vista Previa, pulsa **Cmd+A** para seleccionar todas las imágenes de la barra lateral
4. Haz clic en **Archivo** → **Exportar imágenes seleccionadas...**
5. Elige el formato y la carpeta de destino

## Método 3: Usar Automator (conversión en lote)

Automator te permite crear un flujo de trabajo reutilizable para convertir en lote.

### Pasos:
1. Abre **Automator** (búscalo en Spotlight)
2. Elige **Acción rápida** como tipo de documento
3. En "El flujo de trabajo recibe", selecciona **archivos de imagen** en el **Finder**
4. Arrastra la acción **"Cambiar tipo de imágenes"** desde la biblioteca
5. Selecciona **JPEG** como formato de salida
6. Guarda el flujo de trabajo con un nombre tipo "Convertir a JPG"
7. Desde entonces podrás hacer clic derecho en cualquier archivo HEIC → **Acciones rápidas** → **Convertir a JPG**

## Método 4: Usar la Terminal (avanzado)

Para usuarios avanzados, la Terminal permite convertir rápidamente con el comando integrado \`sips\`.

### Convertir un solo archivo:
\`\`\`bash
sips -s format jpeg input.heic --out output.jpg
\`\`\`

### Convertir todos los archivos HEIC de una carpeta:
\`\`\`bash
for file in *.heic; do sips -s format jpeg "$file" --out "\${file%.heic}.jpg"; done
\`\`\`

## Comparativa de métodos

| Método | Ideal para | Conversión en lote | Facilidad de uso |
|--------|----------|---------------|-------------|
| OpenMyHEIC.com | Conversiones rápidas puntuales | ✅ Sí | ⭐⭐⭐⭐⭐ |
| Vista Previa | Conversiones sencillas | ✅ Limitada | ⭐⭐⭐⭐ |
| Automator | Lotes recurrentes | ✅ Sí | ⭐⭐⭐ |
| Terminal | Usuarios avanzados | ✅ Sí | ⭐⭐ |

## Consejos para usuarios de Mac

- **Ajustes de AirDrop**: al recibir fotos por AirDrop, puedes configurar tu iPhone para enviarlas como "Más compatible" (JPEG) en lugar de HEIC
- **Fotos de iCloud**: si usas iCloud, las fotos pueden descargarse en HEIC. Usa cualquiera de los métodos anteriores para convertirlas
- **Conservar la calidad**: para máxima calidad, usa el formato PNG en lugar de JPG. Nuestro conversor también permite pasar de [HEIC a PNG](/es/heic-to-png).

¿Listo para convertir? Prueba nuestro [conversor HEIC gratuito](/es): funciona al instante en tu navegador y con total privacidad.`,
    schemaSteps: [
      { name: "Abre el conversor", text: "Abre Safari o cualquier navegador en tu Mac y entra en OpenMyHEIC.com" },
      { name: "Sube tu archivo HEIC", text: "Arrastra y suelta tu archivo HEIC desde el Finder sobre el área del conversor, o haz clic en 'Seleccionar archivos' para buscarlo" },
      { name: "Ajusta la calidad", text: "Mueve el deslizador de calidad a tu gusto. El 92% ofrece una calidad excelente con un tamaño de archivo razonable." },
      { name: "Convierte el archivo", text: "Haz clic en el botón 'Convertir'. La conversión ocurre al instante en tu navegador." },
      { name: "Descarga el resultado", text: "Haz clic en 'Descargar' para guardar el archivo JPG convertido en la carpeta Descargas de tu Mac" },
    ],
  },
};

export default guides;
