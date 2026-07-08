import type { BlogPost } from "@/lib/seo";

const guides: Record<string, BlogPost> = {
  "what-is-heic": {
    slug: "what-is-heic",
    title: "Was ist eine HEIC-Datei? HEIC-Format einfach erklärt | OpenMyHEIC",
    description: "Was ist eine HEIC-Datei? Alles zum HEIC-Format und zur .heic-Endung: HEIF vs. HEIC, Vorteile und wie Sie eine HEIC-Datei öffnen oder umwandeln.",
    h1: "Was ist eine HEIC-Datei? Der komplette Guide zu Apples Bildformat",
    content: `## Was ist eine HEIC-Datei?

HEIC steht für **High Efficiency Image Container**. Das HEIC-Format basiert auf dem HEIF-Standard (High Efficiency Image Format), der von der Moving Picture Experts Group (MPEG) entwickelt wurde. Apple hat HEIC mit iOS 11 im Jahr 2017 als Standard-Fotoformat für iPhones und iPads eingeführt. Wenn Sie ein Foto mit der **Endung .heic** sehen, stammt es also mit ziemlicher Sicherheit von einem Apple-Gerät.

## HEIF vs. HEIC: Wo liegt der Unterschied?

Die beiden Begriffe werden oft verwechselt. **HEIF** ist der Container-Standard (gewissermaßen eine Formatfamilie), während **HEIC** die konkrete Variante ist, die Bilder mit dem HEVC-Codec (H.265) komprimiert speichert — genau die, die Apple verwendet. In der Praxis verhalten sich eine .heif- und eine .heic-Datei gleich: Jedes Programm, das die eine öffnet, öffnet in der Regel auch die andere.

## Warum setzt Apple auf HEIC?

Apple hat sich aus mehreren guten Gründen für HEIC entschieden:

### Überlegene Kompression
HEIC-Dateien sind rund **50 % kleiner** als vergleichbare JPEG-Dateien — bei gleicher Bildqualität. Ihr iPhone kann also im selben Speicherplatz ungefähr doppelt so viele Fotos ablegen.

### Bessere Bildqualität
Bei gleicher Dateigröße liefert HEIC eine sichtbar bessere Bildqualität als JPEG. Der Grund: HEIC nutzt modernere Kompressionsalgorithmen (basierend auf dem HEVC/H.265-Videocodec), die feine Details besser erhalten und Kompressionsartefakte reduzieren.

### Erweiterte Funktionen
HEIC-Dateien beherrschen Funktionen, die JPEG nicht bietet:
- **16 Bit Farbtiefe** (statt 8 Bit bei JPEG) für weichere Verläufe und genauere Farben
- **Transparenz** (Unterstützung eines Alphakanals)
- **Mehrere Bilder** in einer einzigen Datei (Live Photos, Serienaufnahmen, Bildsequenzen)
- **Nicht-destruktive Bearbeitung** — Änderungen können neben dem Originalbild gespeichert werden
- **Tiefenkarten** für Porträtmodus-Fotos

## Das Kompatibilitätsproblem

Trotz aller technischen Vorteile hat das HEIC-Format einen großen Nachteil: **eingeschränkte Kompatibilität**. Viele Geräte und Programme unterstützen HEIC-Dateien nicht von Haus aus:

- **Windows**: Unter Windows 10/11 müssen erst die HEIF-Bilderweiterungen („HEIF Image Extensions") aus dem Microsoft Store installiert werden (teils kostenpflichtig)
- **Android**: Die meisten Android-Geräte können HEIC-Dateien nicht nativ öffnen
- **Webbrowser**: Kein großer Browser zeigt HEIC-Dateien direkt an
- **Soziale Netzwerke**: Die meisten Plattformen wandeln HEIC beim Hochladen in JPEG um, manche lehnen HEIC-Dateien aber komplett ab
- **E-Mail**: HEIC-Anhänge werden beim Empfänger unter Umständen nicht korrekt angezeigt

## HEIC-Datei öffnen: So geht's

### Auf dem Mac
macOS unterstützt HEIC nativ. Einfach doppelklicken, und die Datei öffnet sich in der Vorschau. Auch Fotos, Pixelmator oder jeder moderne Mac-Bildeditor können HEIC öffnen.

### HEIC-Datei öffnen unter Windows
Sie haben mehrere Möglichkeiten:
1. Die **HEIF-Bilderweiterungen (HEIF Image Extensions)** aus dem Microsoft Store installieren
2. Einen kostenlosen Konverter wie **OpenMyHEIC.com** nutzen und die Datei in JPG umwandeln
3. Drittanbieter-Software wie IrfanView oder GIMP verwenden

### Auf jedem beliebigen Gerät
Die einfachste universelle Lösung, um HEIC zu öffnen, ist ein Online-Konverter wie OpenMyHEIC.com. Er funktioniert in jedem Webbrowser und konvertiert Ihre Dateien sofort — ohne sie auf einen Server hochzuladen.

## HEIC vs. JPEG: Der direkte Vergleich

| Merkmal | HEIC | JPEG |
|---------|------|------|
| Dateigröße | ~50 % kleiner | Referenzwert |
| Qualität | Überlegen | Gut |
| Farbtiefe | 16 Bit | 8 Bit |
| Transparenz | Ja | Nein |
| Animation | Ja (Live Photos) | Nein |
| Kompatibilität | Eingeschränkt | Universell |
| Bearbeitung | Nicht-destruktiv | Destruktiv |

## Sollten Sie Ihre Fotos als HEIC behalten?

Für die Speicherung auf dem iPhone ist HEIC die beste Wahl — es spart Platz bei voller Qualität. Wenn Sie Fotos jedoch mit anderen teilen oder auf Nicht-Apple-Plattformen verwenden, empfiehlt sich die Umwandlung in JPG oder PNG.

## So verhindern Sie, dass das iPhone HEIC-Fotos aufnimmt

Wenn Ihr iPhone lieber direkt in JPEG fotografieren soll:
1. Öffnen Sie die **Einstellungen**
2. Tippen Sie auf **Kamera**
3. Tippen Sie auf **Formate**
4. Wählen Sie **Maximale Kompatibilität**

Damit speichert Ihr iPhone Fotos als JPEG statt als HEIC-Dateien. Beachten Sie, dass dies ungefähr doppelt so viel Speicherplatz benötigt.

## HEIC-Dateien einfach umwandeln

Bereit, Ihre HEIC-Dateien zu konvertieren? Nutzen Sie unseren [kostenlosen HEIC-zu-JPG-Konverter](/de) — sofort, privat und direkt in Ihrem Browser. Kein Upload, kein Konto erforderlich.`,
  },
  "how-to-convert-heic-to-jpg-windows": {
    slug: "how-to-convert-heic-to-jpg-windows",
    title: "HEIC in JPG umwandeln unter Windows 10/11 (3 Methoden) | OpenMyHEIC",
    description: "HEIC in JPG umwandeln unter Windows 10 und 11 — Schritt für Schritt. Drei einfache Methoden: kostenloser Online-Konverter, HEIF-Erweiterungen, Gratis-Software.",
    h1: "HEIC in JPG umwandeln unter Windows 10/11 — Schritt für Schritt",
    content: `## HEIC in JPG umwandeln unter Windows

Sie haben HEIC-Fotos von einem iPhone erhalten und können sie auf Ihrem Windows-PC nicht öffnen? Damit sind Sie nicht allein. HEIC ist Apples Standard-Fotoformat, und Windows unterstützt es ab Werk nicht vollständig. Hier sind drei einfache Wege, um unter Windows 10 und Windows 11 eine HEIC-Datei in JPG umzuwandeln.

## Methode 1: OpenMyHEIC.com nutzen (am schnellsten & privatesten)

Der schnellste Weg, um unter Windows HEIC zu JPG zu konvertieren, ist unser kostenloser Online-Konverter. Es muss keinerlei Software installiert werden.

### Schritte:
1. **Browser öffnen** und [OpenMyHEIC.com](/de) aufrufen
2. Ihre HEIC-Datei per **Drag & Drop** auf den Konverter ziehen oder auf „Dateien auswählen" klicken
3. **Qualität anpassen** über den Schieberegler (92 % empfohlen)
4. **Auf „Konvertieren" klicken** und ein paar Sekunden warten
5. **Auf „Herunterladen" klicken**, um die JPG-Datei zu speichern

**Warum diese Methode die beste ist:**
- Keine Software-Installation nötig
- Ihre Dateien verlassen den Computer nie (die Konvertierung läuft im Browser)
- Funktioniert mit jeder Windows-Version
- Komplett kostenlos, ohne Limits

## Methode 2: HEIF-Erweiterungen unter Windows installieren

Windows 10 und 11 können HEIC-Dateien nativ öffnen — vorausgesetzt, die richtigen Erweiterungen sind installiert.

### Schritte:
1. Öffnen Sie den **Microsoft Store** auf Ihrem Windows-PC
2. Suchen Sie nach **„HEIF Image Extensions"** (HEIF-Bilderweiterungen)
3. Klicken Sie auf **Installieren** (kostenlos oder für 0,99 $)
4. Für volle Unterstützung brauchen Sie ggf. zusätzlich die **„HEVC Video Extensions"** (0,99 $)
5. Nach der Installation lassen sich HEIC-Dateien mit der **Fotos**-App öffnen
6. Als JPG speichern: HEIC-Datei in Fotos öffnen → Drei-Punkte-Menü anklicken → **Speichern unter** → **JPG** wählen

**Hinweis:** Diese Methode erfordert unter Umständen einen Kauf im Microsoft Store und funktioniert nur unter Windows 10/11.

## Methode 3: Kostenlose Desktop-Software verwenden

Mehrere kostenlose Programme können unter Windows HEIC in JPG umwandeln:

### IrfanView (kostenlos)
1. [IrfanView](https://www.irfanview.com/) herunterladen und installieren
2. Das **Plugins**-Paket installieren (enthält die HEIC-Unterstützung)
3. Ihre HEIC-Datei in IrfanView öffnen
4. **Datei → Speichern unter** → Format **JPG** wählen
5. Auf **Speichern** klicken

### GIMP (kostenlos)
1. [GIMP](https://www.gimp.org/) herunterladen und installieren
2. Ihre HEIC-Datei öffnen (GIMP ab Version 2.10 unterstützt HEIC)
3. **Datei → Exportieren als** aufrufen
4. Die Endung auf **.jpg** ändern
5. Auf **Exportieren** klicken

## Welche Methode sollten Sie wählen?

| Methode | Geschwindigkeit | Datenschutz | Kosten | Stapelverarbeitung |
|--------|-------|---------|------|---------------|
| OpenMyHEIC.com | ⚡ Sofort | 🔒 Maximal | Kostenlos | ✅ Ja |
| HEIF-Erweiterungen | Schnell | Gut | 0–0,99 $ | ❌ Einzeln |
| IrfanView | Schnell | Gut | Kostenlos | ✅ Ja |
| GIMP | Langsam | Gut | Kostenlos | ❌ Nein |

Für die meisten Nutzer ist **OpenMyHEIC.com** die schnellste und bequemste Option, um HEIC in JPG umzuwandeln — kostenlos, ohne Installation, sofort einsatzbereit, und Ihre Fotos bleiben komplett privat.

## HEIC-Datei öffnen unter Windows 11 (ohne Umwandlung)

Wenn Sie eine **HEIC-Datei unter Windows 11** oder Windows 10 nur öffnen möchten, ohne sie zu konvertieren, installieren Sie die kostenlosen HEIF-Bilderweiterungen aus dem Microsoft Store (Methode 2 oben). Danach öffnen sich HEIC-Fotos in der Fotos-App, und der Datei-Explorer zeigt Vorschaubilder an. Soll das Foto auch in anderen Programmen funktionieren — oder wollen Sie den Store ganz umgehen —, bleibt die Umwandlung in JPG die zuverlässigste Lösung.

## Stapelkonvertierung unter Windows

Sie müssen viele HEIC-Dateien auf einmal umwandeln? Nutzen Sie unseren [Batch-Konverter](/de/batch-convert), um mehrere Dateien gleichzeitig zu konvertieren und alle zusammen als ZIP-Datei herunterzuladen.`,
    schemaSteps: [
      { name: "Konverter öffnen", text: "Öffnen Sie Ihren Webbrowser und rufen Sie OpenMyHEIC.com auf" },
      { name: "HEIC-Datei hochladen", text: "Ziehen Sie Ihre HEIC-Datei per Drag & Drop auf den Konverter-Bereich oder klicken Sie auf 'Dateien auswählen', um sie auf Ihrem Computer auszuwählen" },
      { name: "Qualität einstellen", text: "Stellen Sie mit dem Qualitätsregler die gewünschte Qualitätsstufe ein. Für die meisten Zwecke sind 92 % empfehlenswert." },
      { name: "Datei konvertieren", text: "Klicken Sie auf 'Konvertieren' und warten Sie ein paar Sekunden, bis die Umwandlung abgeschlossen ist" },
      { name: "JPG herunterladen", text: "Klicken Sie auf 'Herunterladen', um die konvertierte JPG-Datei auf Ihrem Computer zu speichern" },
    ],
  },
  "how-to-convert-heic-to-jpg-mac": {
    slug: "how-to-convert-heic-to-jpg-mac",
    title: "HEIC in JPG umwandeln am Mac (4 einfache Methoden) | OpenMyHEIC",
    description: "HEIC in JPG umwandeln auf dem Mac: mit Vorschau, Automator, Terminal oder kostenlosem Online-Konverter. Vier einfache Methoden Schritt für Schritt erklärt.",
    h1: "HEIC in JPG umwandeln am Mac — 4 einfache Wege",
    content: `## HEIC in JPG umwandeln auf dem Mac

macOS unterstützt HEIC-Dateien zwar nativ, doch manchmal müssen Sie sie in JPG umwandeln — etwa um sie mit Windows-Nutzern zu teilen, auf Websites hochzuladen oder in bestimmten Programmen zu verwenden. Hier sind vier einfache Methoden, um am Mac eine HEIC-Datei zu öffnen und zu konvertieren.

## Methode 1: OpenMyHEIC.com nutzen (am schnellsten)

Die schnellste Methode, die auf jedem Mac mit Webbrowser funktioniert.

### Schritte:
1. **Safari öffnen** (oder einen anderen Browser) und [OpenMyHEIC.com](/de) aufrufen
2. Ihre HEIC-Datei per **Drag & Drop** auf den Konverter ziehen
3. Bei Bedarf die **Qualität anpassen** (die Voreinstellung von 92 % ist ideal)
4. **Auf „Konvertieren" klicken** — die Umwandlung dauert nur Sekunden
5. **Auf „Herunterladen" klicken**, um das JPG zu speichern

**Vorteile:** Keine Software nötig, Ihre Dateien bleiben privat auf dem Mac, funktioniert sofort und kostenlos.

## Methode 2: Vorschau verwenden (vorinstalliert)

Die Vorschau ist der integrierte Bildbetrachter von macOS — mit ihr können Sie eine HEIC-Datei öffnen und als JPG exportieren.

### Schritte:
1. **Rechtsklick** auf die HEIC-Datei → **Öffnen mit** → **Vorschau**
2. In der Menüleiste auf **Ablage** klicken
3. **Exportieren…** wählen
4. Im Dropdown-Menü **Format** die Option **JPEG** auswählen
5. Den **Qualitätsregler** anpassen
6. Auf **Sichern** klicken

### Für mehrere Dateien:
1. Alle HEIC-Dateien im Finder auswählen
2. Rechtsklick → **Öffnen mit** → **Vorschau**
3. In der Vorschau **Cmd+A** drücken, um alle Bilder in der Seitenleiste auszuwählen
4. **Ablage** → **Ausgewählte Bilder exportieren…** anklicken
5. Format und Zielordner wählen

## Methode 3: Automator verwenden (Stapelverarbeitung)

Mit Automator erstellen Sie einen wiederverwendbaren Arbeitsablauf für die Stapelkonvertierung.

### Schritte:
1. **Automator** öffnen (über Spotlight suchen)
2. Als Dokumenttyp **Schnellaktion** wählen
3. „Arbeitsablauf empfängt aktuelle" auf **Bilddateien** in **Finder** setzen
4. Die Aktion **„Typ von Bildern ändern"** aus der Bibliothek hineinziehen
5. **JPEG** als Ausgabetyp auswählen
6. Den Arbeitsablauf unter einem Namen wie „In JPG umwandeln" sichern
7. Ab jetzt genügt ein Rechtsklick auf eine HEIC-Datei → **Schnellaktionen** → **In JPG umwandeln**

## Methode 4: Terminal verwenden (für Fortgeschrittene)

Für Power-User bietet das Terminal eine schnelle Konvertierung über den integrierten Befehl \`sips\`.

### Eine einzelne Datei konvertieren:
\`\`\`bash
sips -s format jpeg input.heic --out output.jpg
\`\`\`

### Alle HEIC-Dateien in einem Ordner konvertieren:
\`\`\`bash
for file in *.heic; do sips -s format jpeg "$file" --out "\${file%.heic}.jpg"; done
\`\`\`

## Methoden im Vergleich

| Methode | Ideal für | Stapelverarbeitung | Bedienkomfort |
|--------|----------|---------------|-------------|
| OpenMyHEIC.com | Schnelle Einzelkonvertierungen | ✅ Ja | ⭐⭐⭐⭐⭐ |
| Vorschau | Einfache Umwandlungen | ✅ Eingeschränkt | ⭐⭐⭐⭐ |
| Automator | Wiederkehrende Stapeljobs | ✅ Ja | ⭐⭐⭐ |
| Terminal | Power-User | ✅ Ja | ⭐⭐ |

## Tipps für Mac-Nutzer

- **AirDrop-Einstellungen**: Beim Empfangen von Fotos per AirDrop können Sie Ihr iPhone so einstellen, dass es mit „Maximale Kompatibilität" (JPEG) statt HEIC sendet
- **iCloud-Fotos**: Bei iCloud-Nutzung werden Fotos unter Umständen als HEIC heruntergeladen. Wandeln Sie sie mit einer der obigen Methoden um
- **Maximale Qualität**: Wer keinerlei Qualitätsverlust möchte, nutzt PNG statt JPG. Unser Konverter unterstützt auch die Umwandlung von [HEIC in PNG](/de/heic-to-png).

Bereit zum Konvertieren? Probieren Sie unseren [kostenlosen HEIC-Konverter](/de) — er funktioniert sofort in Ihrem Browser, mit vollständigem Datenschutz.`,
    schemaSteps: [
      { name: "Konverter öffnen", text: "Öffnen Sie Safari oder einen anderen Browser auf Ihrem Mac und rufen Sie OpenMyHEIC.com auf" },
      { name: "HEIC-Datei hochladen", text: "Ziehen Sie Ihre HEIC-Datei per Drag & Drop aus dem Finder auf den Konverter-Bereich oder klicken Sie auf 'Dateien auswählen'" },
      { name: "Qualität festlegen", text: "Stellen Sie den Qualitätsregler nach Wunsch ein. 92 % liefern hervorragende Qualität bei angemessener Dateigröße." },
      { name: "Datei konvertieren", text: "Klicken Sie auf 'Konvertieren'. Die Umwandlung erfolgt sofort in Ihrem Browser." },
      { name: "Ergebnis herunterladen", text: "Klicken Sie auf 'Herunterladen', um die konvertierte JPG-Datei im Downloads-Ordner Ihres Mac zu speichern" },
    ],
  },
};

export default guides;
