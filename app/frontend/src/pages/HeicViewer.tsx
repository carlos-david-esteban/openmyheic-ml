import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import {
  getFilePreview,
  convertHeicToFormat,
  downloadFile,
  formatFileSize,
  type FileWithPreview,
} from "@/lib/converter";
import { useLanguage } from "@/i18n/LanguageContext";

interface ViewerItem extends FileWithPreview {
  id: string;
  downloading?: boolean;
}

export default function HeicViewer() {
  const [items, setItems] = useState<ViewerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, localizedPath } = useLanguage();

  const v = t.viewer;

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const heicFiles = Array.from(fileList).filter((f) =>
        /\.(heic|heif)$/i.test(f.name)
      );
      if (heicFiles.length === 0) {
        setError(t.converter.invalidFiles);
        return;
      }
      setError("");
      setLoading(true);
      const previews = await Promise.all(heicFiles.map((f) => getFilePreview(f)));
      setItems((prev) => [
        ...prev,
        ...previews.map((p, i) => ({ ...p, id: `${Date.now()}-${i}` })),
      ]);
      setLoading(false);
    },
    [t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDownload = useCallback(async (item: ViewerItem) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, downloading: true } : it))
    );
    try {
      const result = await convertHeicToFormat(item.file, "jpg", 0.92);
      downloadFile(result.blob, result.name);
    } finally {
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, downloading: false } : it))
      );
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  return (
    <Layout format="viewer">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {v.h1}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {v.intro} {t.convert.freePrivateInstant}
        </p>
      </div>

      {/* Drop zone */}
      <div className="mb-8">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-emerald-400 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".heic,.heif"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <Upload className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
          <p className="font-medium text-gray-900 mb-1">{v.dropTitle}</p>
          <p className="text-sm text-gray-500 mb-4">
            {t.converter.dropSubtitleMultiple}
          </p>
          <Button type="button" className="bg-emerald-600 hover:bg-emerald-700">
            {t.converter.selectFiles}
          </Button>
        </div>
        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
        <p className="text-xs text-gray-400 text-center mt-3">
          {t.converter.privacyBadge}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{v.decoding}</span>
        </div>
      )}

      {/* Gallery */}
      {items.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {v.yourPhotos.replace("{count}", String(items.length))}
            </h2>
            <button
              onClick={() => setItems([])}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              {t.batch.clearAll}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                {item.preview ? (
                  <a href={item.preview} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.preview}
                      alt={item.name}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    {v.previewUnavailable}
                  </div>
                )}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
                    {formatFileSize(item.size)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled={item.downloading}
                      onClick={() => handleDownload(item)}
                    >
                      {item.downloading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" /> JPG
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEO copy */}
      <section className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{v.aboutTitle}</h2>
        <p className="text-gray-600 leading-relaxed mb-4">{v.aboutText1}</p>
        <p className="text-gray-600 leading-relaxed">{v.aboutText2}</p>
      </section>

      {/* Internal links */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t.formats.otherTools}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to={localizedPath("/heic-to-jpg")}
            className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
          >
            {t.nav.heicToJpg}
          </Link>
          <Link
            to={localizedPath("/heic-to-png")}
            className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
          >
            {t.formats.heicToPng}
          </Link>
          <Link
            to={localizedPath("/heic-to-pdf")}
            className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
          >
            {t.formats.heicToPdf}
          </Link>
          <Link
            to={localizedPath("/batch-convert")}
            className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
          >
            {t.formats.batchConvert}
          </Link>
          <Link
            to={localizedPath("/what-is-heic")}
            className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
          >
            {t.footer.whatIsHeic}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
