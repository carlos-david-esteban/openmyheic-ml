export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  keywords: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const SITE_NAME = "OpenMyHEIC";
export const SITE_URL = "https://openmyheic.com";
export const OG_IMAGE = "https://openmyheic.com/images/og-image.jpg";

export const formatInfo: Record<string, { label: string; mime: string; ext: string; description: string; supportsQuality: boolean }> = {
  jpg: {
    label: "JPG",
    mime: "image/jpeg",
    ext: "jpg",
    description: "JPEG is the most widely supported image format, perfect for photos and web use.",
    supportsQuality: true,
  },
  png: {
    label: "PNG",
    mime: "image/png",
    ext: "png",
    description: "PNG offers lossless compression, ideal for images requiring transparency or maximum quality.",
    supportsQuality: false,
  },
  webp: {
    label: "WebP",
    mime: "image/webp",
    ext: "webp",
    description: "WebP is a modern format that provides superior compression for web images.",
    supportsQuality: true,
  },
  bmp: {
    label: "BMP",
    mime: "image/bmp",
    ext: "bmp",
    description: "BMP is an uncompressed format that preserves every pixel of your image.",
    supportsQuality: false,
  },
  gif: {
    label: "GIF",
    mime: "image/gif",
    ext: "gif",
    description: "GIF supports animation and is perfect for extracting Live Photo frames.",
    supportsQuality: false,
  },
  pdf: {
    label: "PDF",
    mime: "application/pdf",
    ext: "pdf",
    description: "PDF is a universal document format, great for sharing and printing photos.",
    supportsQuality: true,
  },
};

export function getSEOData(format: string): SEOData {
  const map: Record<string, SEOData> = {
    jpg: {
      title: `HEIC to JPG Converter — Free Online, No Upload | ${SITE_NAME}`,
      description: "Convert HEIC to JPG instantly in your browser. Free, private, no upload needed. Transform iPhone photos to JPG format with adjustable quality.",
      canonical: `${SITE_URL}/heic-to-jpg`,
      h1: "Convert HEIC to JPG Online — Free & Private",
      keywords: "heic to jpg, heic converter, convert heic to jpeg, iphone photo converter",
    },
    png: {
      title: `HEIC to PNG Converter — Lossless Quality, Free Online | ${SITE_NAME}`,
      description: "Convert HEIC to PNG with lossless quality. Free online converter that works in your browser. No upload, no registration required.",
      canonical: `${SITE_URL}/heic-to-png`,
      h1: "Convert HEIC to PNG — Lossless Quality Conversion",
      keywords: "heic to png, heic png converter, lossless heic conversion, transparent png from heic",
    },
    webp: {
      title: `HEIC to WebP Converter — Modern Format, Free Online | ${SITE_NAME}`,
      description: "Convert HEIC to WebP for optimized web images. Free browser-based converter with adjustable quality. No files uploaded to any server.",
      canonical: `${SITE_URL}/heic-to-webp`,
      h1: "Convert HEIC to WebP — Modern Web Format",
      keywords: "heic to webp, heic webp converter, modern image format, web optimized images",
    },
    bmp: {
      title: `HEIC to BMP Converter — Uncompressed Quality, Free | ${SITE_NAME}`,
      description: "Convert HEIC to BMP format for uncompressed image quality. Free online tool, no upload needed. All processing happens in your browser.",
      canonical: `${SITE_URL}/heic-to-bmp`,
      h1: "Convert HEIC to BMP — Uncompressed Format",
      keywords: "heic to bmp, heic bmp converter, uncompressed image converter",
    },
    gif: {
      title: `HEIC to GIF Converter — Animate Live Photos, Free | ${SITE_NAME}`,
      description: "Convert HEIC Live Photos to animated GIFs. Extract frames and create animations from your iPhone photos. Free, private, browser-based.",
      canonical: `${SITE_URL}/heic-to-gif`,
      h1: "Convert HEIC to GIF — Animate Your Live Photos",
      keywords: "heic to gif, live photo to gif, heic gif converter, animate iphone photos",
    },
    pdf: {
      title: `HEIC to PDF Converter — Create PDFs from Photos, Free | ${SITE_NAME}`,
      description: "Convert one or multiple HEIC images into a single PDF document. Free online tool with no upload required. Perfect for sharing photo collections.",
      canonical: `${SITE_URL}/heic-to-pdf`,
      h1: "Convert HEIC to PDF — Create PDF Documents from Photos",
      keywords: "heic to pdf, heic pdf converter, photos to pdf, iphone photos to pdf",
    },
    home: {
      title: `HEIC to JPG Converter — Free Online, No Upload | ${SITE_NAME}`,
      description: "Convert HEIC to JPG, PNG, WebP, PDF and more — instantly in your browser. 100% free, private, and fast. Your iPhone photos never leave your device.",
      canonical: SITE_URL,
      h1: "Convert HEIC to JPG — Free, Private, Instant",
      keywords: "heic converter, heic to jpg, convert heic, iphone photo converter, heic online",
    },
    batch: {
      title: `Batch HEIC Converter — Convert Multiple Files at Once | ${SITE_NAME}`,
      description: "Convert multiple HEIC files at once to JPG, PNG, or WebP. Download all converted files as a ZIP. Free, private, browser-based batch conversion.",
      canonical: `${SITE_URL}/batch-convert`,
      h1: "Batch HEIC Converter — Convert Multiple Files at Once",
      keywords: "batch heic converter, bulk heic to jpg, multiple heic files, heic batch conversion",
    },
  };
  return map[format] || map.home;
}

export function getFAQs(format: string): FAQ[] {
  const commonFAQs: FAQ[] = [
    {
      question: "Is this HEIC converter safe to use?",
      answer: "Yes, absolutely. All file conversion happens directly in your browser using JavaScript. Your files are never uploaded to any server. Your photos remain 100% private on your device.",
    },
    {
      question: "What is a HEIC file?",
      answer: "HEIC (High Efficiency Image Container) is the default photo format used by Apple iPhones and iPads since iOS 11. It offers better compression than JPEG while maintaining higher image quality, but it's not universally supported by all devices and software.",
    },
    {
      question: "Is there a file size limit?",
      answer: "There is no strict file size limit since all processing happens in your browser. However, very large files (over 50MB) may take longer to convert depending on your device's processing power.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No. Our converter is completely free to use with no registration, no account, and no limits on the number of conversions.",
    },
  ];

  const formatSpecific: Record<string, FAQ[]> = {
    jpg: [
      {
        question: "What quality setting should I use for HEIC to JPG?",
        answer: "For most purposes, 92% quality provides an excellent balance between file size and image quality. Use 100% if you need maximum quality, or lower values (70-80%) for smaller file sizes suitable for web use.",
      },
      {
        question: "Will converting HEIC to JPG lose quality?",
        answer: "JPG uses lossy compression, so there is some quality loss. However, at 92% quality (our default), the difference is virtually imperceptible to the human eye. For truly lossless conversion, consider using PNG format instead.",
      },
    ],
    png: [
      {
        question: "Why choose PNG over JPG for HEIC conversion?",
        answer: "PNG uses lossless compression, meaning zero quality loss during conversion. Choose PNG when you need perfect quality, transparency support, or plan to edit the image further. The tradeoff is larger file sizes compared to JPG.",
      },
      {
        question: "Does PNG support transparency from HEIC files?",
        answer: "Yes. If your HEIC file contains transparency data, converting to PNG will preserve it. JPG does not support transparency.",
      },
    ],
    webp: [
      {
        question: "What is WebP and why should I use it?",
        answer: "WebP is a modern image format developed by Google that provides superior compression. WebP images are typically 25-35% smaller than equivalent JPG files at the same quality, making them ideal for websites and web applications.",
      },
      {
        question: "Is WebP supported by all browsers?",
        answer: "WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge. It's the recommended format for web use due to its excellent compression and quality balance.",
      },
    ],
    pdf: [
      {
        question: "Can I combine multiple HEIC files into one PDF?",
        answer: "Yes! Our HEIC to PDF converter allows you to upload multiple HEIC files and combine them into a single PDF document. Each image becomes a separate page in the PDF.",
      },
      {
        question: "What is the quality of images in the PDF?",
        answer: "Images are embedded in the PDF at high quality (92% JPEG compression by default). You can adjust the quality slider to balance between file size and image quality.",
      },
    ],
    gif: [
      {
        question: "Can I convert Live Photos to animated GIFs?",
        answer: "Our converter extracts the image from your HEIC file and converts it to GIF format. For full Live Photo animation, the HEIC file needs to contain multiple frames. Single-frame HEIC files will produce a static GIF.",
      },
      {
        question: "What about GIF quality and file size?",
        answer: "GIF is limited to 256 colors, so photo-quality images may show some color banding. For better quality, consider using WebP which also supports animation with millions of colors.",
      },
    ],
    bmp: [
      {
        question: "Why would I convert HEIC to BMP?",
        answer: "BMP (Bitmap) is an uncompressed format that preserves every pixel without any compression artifacts. It's useful for specific software compatibility requirements or when you need raw, uncompressed image data.",
      },
      {
        question: "Why are BMP files so large?",
        answer: "BMP files are uncompressed, meaning every pixel's color data is stored individually. A 12-megapixel photo can produce a BMP file of 36MB or more. For smaller files, consider JPG or WebP instead.",
      },
    ],
    batch: [
      {
        question: "How many files can I convert at once?",
        answer: "There's no hard limit on the number of files. However, converting many large files simultaneously depends on your device's available memory. We recommend batches of 20-50 files for optimal performance.",
      },
      {
        question: "How does the ZIP download work?",
        answer: "After all files are converted, they are packaged into a single ZIP file that downloads automatically. Each converted file retains its original filename with the new extension.",
      },
    ],
  };

  return [...commonFAQs, ...(formatSpecific[format] || formatSpecific["jpg"] || [])];
}

export function generateWebAppSchema(format: string) {
  const seo = getSEOData(format);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${SITE_NAME} - HEIC to ${formatInfo[format]?.label || "JPG"} Converter`,
    url: seo.canonical,
    description: seo.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Client-side conversion",
      "No file upload required",
      "Privacy-first design",
      "Adjustable quality settings",
      "Instant download",
    ],
  };
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateHowToSchema(title: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function getSEOContent(format: string): string {
  const contents: Record<string, string> = {
    jpg: `## Understanding HEIC to JPG Conversion

HEIC (High Efficiency Image Container) is Apple's default photo format, introduced with iOS 11. While HEIC offers superior compression — producing files roughly half the size of equivalent JPEGs — its limited compatibility across Windows, Android, and many web platforms makes conversion to JPG essential for everyday use.

### Why Convert HEIC to JPG?

**Universal Compatibility**: JPG (JPEG) is the most widely supported image format in the world. Every device, browser, email client, and social media platform supports JPG natively. Converting your iPhone photos to JPG ensures they can be viewed and shared anywhere.

**Easy Sharing**: When you share HEIC files with friends or colleagues who use Windows or Android, they may not be able to open them. JPG eliminates this problem entirely.

**Web Publishing**: Most websites and content management systems are optimized for JPG images. Whether you're uploading to a blog, e-commerce store, or social media, JPG is the safest choice.

### How Our Converter Works

Our HEIC to JPG converter uses the heic2any JavaScript library to decode HEIC files directly in your web browser. Here's what happens when you convert a file:

1. **File Selection**: You select or drag-and-drop your HEIC file into the converter
2. **Browser Decoding**: The HEIC file is decoded using WebAssembly-powered libraries running entirely in your browser
3. **Format Conversion**: The decoded image data is re-encoded as a JPG file at your chosen quality level
4. **Instant Download**: The converted JPG file is ready for immediate download

**No server processing is involved at any step.** Your photos never leave your device, ensuring complete privacy.

### Quality Settings Explained

Our converter defaults to 92% quality, which provides an excellent balance between file size and visual quality. Here's a general guide:

- **100%**: Maximum quality, largest file size. Best for professional photography or printing.
- **90-95%**: Excellent quality with minimal visible difference from the original. Recommended for most uses.
- **70-85%**: Good quality with noticeable file size reduction. Suitable for web use and email sharing.
- **Below 70%**: Significant compression artifacts may be visible. Only recommended when file size is critical.

### Privacy & Security

Unlike cloud-based converters that upload your files to remote servers, OpenMyHEIC processes everything locally in your browser. This means:

- Your photos are never transmitted over the internet
- No copies of your files are stored on any server
- Your conversion history is completely private
- No account or registration is required`,

    png: `## Understanding HEIC to PNG Conversion

PNG (Portable Network Graphics) is a lossless image format that preserves every detail of your original photo. When you convert HEIC to PNG, you get pixel-perfect quality with zero compression artifacts.

### When to Choose PNG Over JPG

**Lossless Quality**: Unlike JPG, PNG compression is lossless — meaning the converted image is identical in quality to the original HEIC file. This makes PNG ideal for images that will be edited further or used in professional contexts.

**Transparency Support**: PNG supports alpha transparency, which JPG does not. If your HEIC file contains any transparency data, PNG is the only format that will preserve it.

**Text and Graphics**: For screenshots, diagrams, or images containing text, PNG produces sharper results than JPG because it doesn't introduce compression artifacts around sharp edges.

### File Size Considerations

PNG files are typically 3-5x larger than equivalent JPG files. This is the tradeoff for lossless quality. If file size is a concern and you don't need perfect quality, consider using JPG or WebP instead.

### Our Privacy Commitment

All HEIC to PNG conversion happens entirely in your browser. Your files are never uploaded to any server, ensuring complete privacy for your personal photos.`,

    webp: `## Understanding HEIC to WebP Conversion

WebP is a modern image format developed by Google that provides superior compression for web images. It supports both lossy and lossless compression, making it incredibly versatile.

### Why WebP?

**Smaller File Sizes**: WebP images are typically 25-35% smaller than equivalent JPG files at the same visual quality. This means faster loading websites and less storage space.

**Modern Browser Support**: All major browsers — Chrome, Firefox, Safari, and Edge — now support WebP. It's the recommended format for web developers and content creators.

**Quality and Compression**: WebP offers adjustable quality settings similar to JPG, but achieves better compression ratios. A WebP file at 80% quality often looks as good as a JPG at 92% quality.

### Perfect for Web Use

If you're converting iPhone photos for use on a website, blog, or online store, WebP is the optimal choice. It provides the best balance of quality and file size for web delivery.`,

    bmp: `## Understanding HEIC to BMP Conversion

BMP (Bitmap) is one of the oldest image formats, storing pixel data in an uncompressed format. While not commonly used for everyday purposes, BMP has specific use cases where it remains valuable.

### When to Use BMP

**Software Compatibility**: Some legacy software and specialized applications require BMP format input. Converting HEIC to BMP ensures compatibility with these tools.

**Uncompressed Data**: BMP stores raw pixel data without any compression, making it useful for image processing pipelines where you need direct access to pixel values.

**Note on File Size**: BMP files are significantly larger than other formats because they store uncompressed data. A 12-megapixel photo can produce a BMP file of 36MB or more.`,

    gif: `## Understanding HEIC to GIF Conversion

GIF (Graphics Interchange Format) is a classic image format known for its support of animation and wide compatibility across all platforms.

### Converting HEIC to GIF

Our converter extracts the image data from your HEIC file and converts it to GIF format. For HEIC files containing Live Photo data with multiple frames, the converter can create an animated GIF.

### GIF Limitations

**Color Palette**: GIF is limited to 256 colors per frame, which means photographic images may show color banding or dithering. For photo-quality images, JPG or WebP are better choices.

**File Size**: Despite the color limitation, animated GIFs can be quite large. For web use, consider WebP which supports animation with better compression and full color support.

### Best Use Cases

GIF conversion is ideal for creating shareable animations from Live Photos, creating simple image previews, or when you need maximum compatibility with older systems and platforms.`,

    pdf: `## Understanding HEIC to PDF Conversion

PDF (Portable Document Format) is the universal standard for document sharing. Converting your HEIC photos to PDF creates professional documents that can be viewed on any device.

### Why Convert HEIC to PDF?

**Document Creation**: Combine multiple iPhone photos into a single, organized PDF document. Perfect for creating photo albums, reports, or documentation.

**Universal Viewing**: PDF files can be opened on virtually any device without special software. They maintain consistent formatting across all platforms.

**Print Ready**: PDF is the preferred format for printing. Converting your HEIC photos to PDF ensures they'll print correctly at any size.

### Multi-Page Support

Our converter supports uploading multiple HEIC files and combining them into a single PDF document. Each image becomes a separate page, maintaining the original aspect ratio and quality.`,

    batch: `## Batch HEIC Conversion

Need to convert a large collection of iPhone photos? Our batch converter handles multiple HEIC files simultaneously, saving you time and effort.

### How Batch Conversion Works

1. **Select Multiple Files**: Drag and drop or select multiple HEIC/HEIF files at once
2. **Choose Output Format**: Select your preferred output format (JPG, PNG, or WebP)
3. **Set Quality**: Adjust the quality slider for your desired balance of quality and file size
4. **Convert All**: Click convert and watch the progress bars as each file is processed
5. **Download ZIP**: All converted files are packaged into a single ZIP file for easy download

### Performance Tips

- Convert in batches of 20-50 files for optimal performance
- Close other browser tabs to free up memory for large batches
- JPG conversion is fastest; PNG produces the largest files
- All processing happens in your browser — no upload wait times`,
  };

  return contents[format] || contents["jpg"];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  h1: string;
  content: string;
  schemaSteps?: { name: string; text: string }[];
}

export const blogPosts: Record<string, BlogPost> = {
  "what-is-heic": {
    slug: "what-is-heic",
    title: `What Is a HEIC File? HEIC Format & Extension Explained | ${SITE_NAME}`,
    description: "What is a HEIC file? Learn the HEIC meaning, what the .heic extension is, HEIF vs HEIC, and how to open or convert HEIC photos on any device.",
    h1: "What Is a HEIC File? The Complete Guide to Apple's Image Format",
    content: `## What Is a HEIC File?

HEIC stands for **High Efficiency Image Container**. It's a file format based on the HEIF (High Efficiency Image Format) standard, which was developed by the Moving Picture Experts Group (MPEG). Apple adopted HEIC as the default photo format for iPhones and iPads starting with iOS 11 in 2017. If you see a photo with the **.heic extension**, it almost certainly came from an Apple device.

## HEIF vs HEIC: What's the Difference?

The two terms are often confused. **HEIF** is the container standard (like a family of formats), while **HEIC** is the specific variant that stores images compressed with the HEVC (H.265) codec — it's the one Apple uses. In practice, a .heif and a .heic file behave the same way, and any tool that opens one usually opens the other.

## Why Does Apple Use HEIC?

Apple chose HEIC for several compelling reasons:

### Superior Compression
HEIC files are approximately **50% smaller** than equivalent JPEG files while maintaining the same visual quality. This means your iPhone can store roughly twice as many photos in the same amount of storage space.

### Better Image Quality
At the same file size, HEIC produces noticeably better image quality than JPEG. This is because HEIC uses more advanced compression algorithms (based on HEVC/H.265 video codec) that are better at preserving fine details and reducing compression artifacts.

### Advanced Features
HEIC supports features that JPEG cannot:
- **16-bit color depth** (vs JPEG's 8-bit), allowing for smoother gradients and more accurate colors
- **Transparency** (alpha channel support)
- **Multiple images** in a single file (Live Photos, burst shots, image sequences)
- **Non-destructive editing** — edits can be stored alongside the original image
- **Depth maps** for Portrait Mode photos

## The Compatibility Problem

Despite its technical advantages, HEIC has one major drawback: **limited compatibility**. Many devices and software don't natively support HEIC:

- **Windows**: Windows 10/11 requires installing the HEIF Image Extensions from the Microsoft Store (sometimes paid)
- **Android**: Most Android devices cannot open HEIC files natively
- **Web Browsers**: No major browser can display HEIC files directly
- **Social Media**: Most platforms convert HEIC to JPEG during upload, but some may reject HEIC files
- **Email**: HEIC attachments may not preview correctly for recipients

## How to Open HEIC Files

### On Mac
macOS has native HEIC support. Simply double-click the file to open it in Preview. You can also use Photos, Pixelmator, or any modern Mac image editor.

### On Windows
You have several options:
1. Install the **HEIF Image Extensions** from the Microsoft Store
2. Use a free converter like **OpenMyHEIC.com** to convert to JPG
3. Use third-party software like IrfanView or GIMP

### On Any Device
The easiest universal solution is to use an online converter like OpenMyHEIC.com. It works in any web browser and converts your files instantly without uploading them to any server.

## HEIC vs JPEG: Detailed Comparison

| Feature | HEIC | JPEG |
|---------|------|------|
| File Size | ~50% smaller | Baseline |
| Quality | Superior | Good |
| Color Depth | 16-bit | 8-bit |
| Transparency | Yes | No |
| Animation | Yes (Live Photos) | No |
| Compatibility | Limited | Universal |
| Editing | Non-destructive | Destructive |

## Should You Keep Photos as HEIC?

For storage on your iPhone, HEIC is the best choice — it saves space while maintaining quality. However, when sharing photos with others or using them on non-Apple platforms, converting to JPG or PNG is recommended.

## How to Stop iPhone from Taking HEIC Photos

If you prefer your iPhone to shoot in JPEG:
1. Open **Settings**
2. Tap **Camera**
3. Tap **Formats**
4. Select **Most Compatible**

This will make your iPhone save photos as JPEG instead of HEIC. Note that this will use approximately twice the storage space.

## Convert HEIC Files Easily

Ready to convert your HEIC files? Use our [free HEIC to JPG converter](/) — it's instant, private, and works right in your browser. No upload needed, no account required.`,
  },
  "how-to-convert-heic-to-jpg-windows": {
    slug: "how-to-convert-heic-to-jpg-windows",
    title: `How to Convert HEIC to JPG on Windows 10/11 (3 Easy Methods) | ${SITE_NAME}`,
    description: "How to convert or change HEIC to JPG on Windows 10 and Windows 11 — step by step. Three easy methods: free online converter (no install), HEIF extensions, and free software.",
    h1: "How to Convert HEIC to JPG on Windows 10/11 — Step by Step",
    content: `## How to Convert HEIC to JPG on Windows

Received HEIC photos from an iPhone and can't open them on your Windows PC? You're not alone. HEIC is Apple's default photo format, and Windows doesn't fully support it out of the box. Here are three easy ways to change HEIC to JPG on Windows 10 and Windows 11.

## Method 1: Use OpenMyHEIC.com (Fastest & Most Private)

The quickest way to convert HEIC to JPG on Windows is using our free online converter. No software installation required.

### Steps:
1. **Open your browser** and go to [OpenMyHEIC.com](/)
2. **Drag and drop** your HEIC file onto the converter, or click "Select Files" to browse
3. **Adjust quality** using the slider (92% recommended)
4. **Click "Convert"** and wait a few seconds
5. **Click "Download"** to save the JPG file

**Why this method is best:**
- No software to install
- Files never leave your computer (conversion happens in your browser)
- Works on any Windows version
- Completely free with no limits

## Method 2: Install HEIF Extensions on Windows

Windows 10 and 11 can open HEIC files natively with the right extensions installed.

### Steps:
1. Open the **Microsoft Store** on your Windows PC
2. Search for **"HEIF Image Extensions"**
3. Click **Install** (it may be free or cost $0.99)
4. You may also need **"HEVC Video Extensions"** ($0.99) for full support
5. After installation, you can open HEIC files with the **Photos** app
6. To save as JPG: Open the HEIC file in Photos → Click the three dots menu → **Save as** → Choose **JPG**

**Note:** This method requires a Microsoft Store purchase and only works on Windows 10/11.

## Method 3: Use Free Desktop Software

Several free programs can convert HEIC to JPG on Windows:

### IrfanView (Free)
1. Download and install [IrfanView](https://www.irfanview.com/)
2. Install the **Plugins** package (includes HEIC support)
3. Open your HEIC file in IrfanView
4. Go to **File → Save As** → Select **JPG** format
5. Click **Save**

### GIMP (Free)
1. Download and install [GIMP](https://www.gimp.org/)
2. Open your HEIC file (GIMP 2.10+ supports HEIC)
3. Go to **File → Export As**
4. Change the extension to **.jpg**
5. Click **Export**

## Which Method Should You Choose?

| Method | Speed | Privacy | Cost | Batch Support |
|--------|-------|---------|------|---------------|
| OpenMyHEIC.com | ⚡ Instant | 🔒 Maximum | Free | ✅ Yes |
| HEIF Extensions | Fast | Good | $0-0.99 | ❌ One at a time |
| IrfanView | Fast | Good | Free | ✅ Yes |
| GIMP | Slow | Good | Free | ❌ No |

For most users, **OpenMyHEIC.com** is the fastest and most convenient option. It requires no installation, works instantly, and keeps your photos completely private.

## How to Open HEIC Files on Windows 11 (Without Converting)

If you just want to **open a HEIC file in Windows 11** or Windows 10 without converting it, install the free HEIF Image Extensions from the Microsoft Store (Method 2 above). After that, HEIC photos will open in the Photos app and show thumbnails in File Explorer. If you need the photo to work in other programs — or want to avoid the Store entirely — converting it to JPG remains the most reliable option.

## Batch Conversion on Windows

Need to convert many HEIC files at once? Use our [batch converter](/batch-convert) to convert multiple files simultaneously and download them all as a ZIP file.`,
    schemaSteps: [
      { name: "Open the converter", text: "Open your web browser and navigate to OpenMyHEIC.com" },
      { name: "Upload your HEIC file", text: "Drag and drop your HEIC file onto the converter area, or click 'Select Files' to browse your computer" },
      { name: "Adjust quality settings", text: "Use the quality slider to set your preferred quality level. 92% is recommended for most uses." },
      { name: "Convert the file", text: "Click the 'Convert' button and wait a few seconds for the conversion to complete" },
      { name: "Download the JPG", text: "Click the 'Download' button to save the converted JPG file to your computer" },
    ],
  },
  "how-to-convert-heic-to-jpg-mac": {
    slug: "how-to-convert-heic-to-jpg-mac",
    title: `How to Convert HEIC to JPG on Mac (4 Easy Methods) | ${SITE_NAME}`,
    description: "How to convert or change HEIC to JPG on Mac using Preview, Automator, Terminal, or a free online converter. Four easy step-by-step methods for macOS.",
    h1: "How to Convert HEIC to JPG on Mac — 4 Easy Ways",
    content: `## How to Convert HEIC to JPG on Mac

While macOS natively supports HEIC files, you may need to convert them to JPG for sharing with Windows users, uploading to websites, or compatibility with certain applications. Here are four easy methods.

## Method 1: Use OpenMyHEIC.com (Quickest)

The fastest method that works on any Mac with a web browser.

### Steps:
1. **Open Safari** (or any browser) and go to [OpenMyHEIC.com](/)
2. **Drag and drop** your HEIC file onto the converter
3. **Adjust quality** if needed (92% default is great)
4. **Click "Convert"** — conversion takes seconds
5. **Click "Download"** to save the JPG

**Advantages:** No software needed, files stay private on your Mac, works instantly.

## Method 2: Use Preview (Built-in)

Preview is macOS's built-in image viewer and can export HEIC to JPG.

### Steps:
1. **Right-click** the HEIC file → **Open With** → **Preview**
2. Click **File** in the menu bar
3. Select **Export...**
4. In the **Format** dropdown, choose **JPEG**
5. Adjust the **Quality** slider
6. Click **Save**

### For Multiple Files:
1. Select all HEIC files in Finder
2. Right-click → **Open With** → **Preview**
3. In Preview, press **Cmd+A** to select all images in the sidebar
4. Click **File** → **Export Selected Images...**
5. Choose format and destination

## Method 3: Use Automator (Batch Processing)

Automator lets you create a reusable workflow for batch conversion.

### Steps:
1. Open **Automator** (search in Spotlight)
2. Choose **Quick Action** as the document type
3. Set "Workflow receives current" to **image files** in **Finder**
4. Drag **"Change Type of Images"** action from the library
5. Select **JPEG** as the output type
6. Save the workflow with a name like "Convert to JPG"
7. Now you can right-click any HEIC file → **Quick Actions** → **Convert to JPG**

## Method 4: Use Terminal (Advanced)

For power users, the Terminal offers quick conversion using the built-in \`sips\` command.

### Convert a Single File:
\`\`\`bash
sips -s format jpeg input.heic --out output.jpg
\`\`\`

### Convert All HEIC Files in a Folder:
\`\`\`bash
for file in *.heic; do sips -s format jpeg "$file" --out "\${file%.heic}.jpg"; done
\`\`\`

## Comparison of Methods

| Method | Best For | Batch Support | Ease of Use |
|--------|----------|---------------|-------------|
| OpenMyHEIC.com | Quick one-off conversions | ✅ Yes | ⭐⭐⭐⭐⭐ |
| Preview | Simple conversions | ✅ Limited | ⭐⭐⭐⭐ |
| Automator | Repeated batch jobs | ✅ Yes | ⭐⭐⭐ |
| Terminal | Power users | ✅ Yes | ⭐⭐ |

## Tips for Mac Users

- **AirDrop Settings**: When receiving photos via AirDrop, you can set your iPhone to send as "Most Compatible" (JPEG) instead of HEIC
- **iCloud Photos**: If using iCloud, photos may download as HEIC. Use any method above to convert them
- **Quality Preservation**: For maximum quality, use PNG format instead of JPG. Our converter also supports [HEIC to PNG](/heic-to-png) conversion.

Ready to convert? Try our [free HEIC converter](/) — it works instantly in your browser with complete privacy.`,
    schemaSteps: [
      { name: "Open the converter", text: "Open Safari or any browser on your Mac and navigate to OpenMyHEIC.com" },
      { name: "Upload your HEIC file", text: "Drag and drop your HEIC file from Finder onto the converter area, or click 'Select Files' to browse" },
      { name: "Set quality preferences", text: "Adjust the quality slider to your preference. 92% provides excellent quality with reasonable file size." },
      { name: "Convert the file", text: "Click the 'Convert' button. The conversion happens instantly in your browser." },
      { name: "Download the result", text: "Click 'Download' to save the converted JPG file to your Mac's Downloads folder" },
    ],
  },
};