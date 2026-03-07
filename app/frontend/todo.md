# OpenMyHEIC.com - HEIC Converter Web App

## Design Guidelines

### Design References
- Clean, trustworthy utility tool aesthetic (similar to CloudConvert, Convertio)
- Professional and privacy-focused feel

### Color Palette
- Background: #FFFFFF (white), #F9FAFB (gray-50)
- Primary/Action: #059669 (emerald-600)
- Primary Hover: #047857 (emerald-700)
- Text Primary: #111827 (gray-900)
- Text Secondary: #6B7280 (gray-500)
- Border: #E5E7EB (gray-200)
- Drop Zone BG: #F0FDF4 (emerald-50)
- Drop Zone Border: #059669 dashed

### Typography
- Font: Inter (system default via Tailwind)
- H1: text-4xl md:text-5xl font-bold
- H2: text-3xl font-bold
- H3: text-xl font-semibold
- Body: text-base
- Small: text-sm

### Key Component Styles
- Drop Zone: Large dashed border area, emerald accent, hover effect
- Buttons: bg-emerald-600 text-white rounded-lg px-6 py-3, hover:bg-emerald-700
- Cards: bg-white rounded-xl shadow-sm border border-gray-200, hover:shadow-md
- Progress bar: bg-emerald-600 rounded-full
- Ad placeholders: border-2 border-dashed border-gray-300 bg-gray-50

### Images to Generate
1. **hero-shield-privacy.jpg** - A modern shield icon with a lock, representing privacy and security, green tones on white background (Style: minimalist)
2. **hero-conversion-speed.jpg** - Abstract speed/lightning bolt imagery representing fast conversion, green and white tones (Style: minimalist)
3. **og-preview-heic-converter.jpg** - Open Graph preview image showing "OpenMyHEIC.com - Free HEIC Converter" text with iPhone photo icons (Style: minimalist, 1200x630)
4. **hero-banner-iphone-photos.jpg** - Beautiful iPhone photos being converted, showing the transformation process, clean modern design (Style: photorealistic)

---

## Development Tasks & File Structure

### Core Files (8 file limit - using smart component organization)

1. **src/pages/Index.tsx** - Homepage with integrated HEIC-to-JPG converter, hero, format cards, why section, FAQ
2. **src/pages/ConvertPage.tsx** - Reusable conversion page for all formats (JPG, PNG, WebP, BMP, GIF, PDF) - route param driven
3. **src/pages/BatchConvert.tsx** - Batch conversion page with multi-file, ZIP download
4. **src/pages/BlogPage.tsx** - Reusable blog/article page for all 3 blog posts
5. **src/components/HeicConverter.tsx** - Core converter component (drop zone, preview, conversion, download) - used by all conversion pages
6. **src/components/Layout.tsx** - Header, footer, ad placeholders, SEO helmet, navigation
7. **src/lib/converter.ts** - Conversion logic using heic2any, Web Worker setup, PDF/GIF helpers
8. **src/lib/seo.ts** - SEO data, schema markup generators, FAQ data per page

### Routes
- / → Index.tsx (homepage + HEIC to JPG)
- /heic-to-jpg → ConvertPage (format=jpg)
- /heic-to-png → ConvertPage (format=png)
- /heic-to-webp → ConvertPage (format=webp)
- /heic-to-bmp → ConvertPage (format=bmp)
- /heic-to-gif → ConvertPage (format=gif)
- /heic-to-pdf → ConvertPage (format=pdf)
- /batch-convert → BatchConvert
- /what-is-heic → BlogPage (slug=what-is-heic)
- /how-to-convert-heic-to-jpg-windows → BlogPage (slug=windows)
- /how-to-convert-heic-to-jpg-mac → BlogPage (slug=mac)