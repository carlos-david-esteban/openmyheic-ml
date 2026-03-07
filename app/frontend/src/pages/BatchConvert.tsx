import { useState, useCallback, useRef } from "react";
import { Upload, Download, RefreshCw, Shield, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/Layout";
import {
  convertHeicToFormat,
  downloadAsZip,
  getFilePreview,
  formatFileSize,
  type ConversionResult,
  type FileWithPreview,
} from "@/lib/converter";
import { useLanguage } from "@/i18n/LanguageContext";

type BatchState = "idle" | "previewing" | "converting" | "done" | "error";

interface FileProgress {
  file: FileWithPreview;
  progress: number;
  result?: ConversionResult;
  error?: string;
}

export default function BatchConvert() {
  const [state, setState] = useState<BatchState>("idle");
  const [fileProgresses, setFileProgresses] = useState<FileProgress[]>([]);
  const [quality, setQuality] = useState(92);
  const [outputFormat, setOutputFormat] = useState("jpg");
  const [totalProgress, setTotalProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFiles = useCallback(async (fileList: FileList | File[]) => {
    const heicFiles = Array.from(fileList).filter((f) =>
      /\.(heic|heif)$/i.test(f.name)
    );

    if (heicFiles.length === 0) {
      setError(t.converter.invalidFiles);
      return;
    }

    setError("");
    setState("previewing");

    const previews = await Promise.all(heicFiles.map((f) => getFilePreview(f)));
    setFileProgresses((prev) => [
      ...prev,
      ...previews.map((p) => ({ file: p, progress: 0 })),
    ]);
  }, [t]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleConvert = useCallback(async () => {
    setState("converting");
    setTotalProgress(0);
    setError("");

    const results: ConversionResult[] = [];
    const updated = [...fileProgresses];

    for (let i = 0; i < updated.length; i++) {
      try {
        const result = await convertHeicToFormat(
          updated[i].file.file,
          outputFormat,
          quality / 100,
          (p) => {
            updated[i] = { ...updated[i], progress: p };
            setFileProgresses([...updated]);
            setTotalProgress(((i + p / 100) / updated.length) * 100);
          }
        );
        updated[i] = { ...updated[i], result, progress: 100 };
        results.push(result);
      } catch (err) {
        updated[i] = {
          ...updated[i],
          error: err instanceof Error ? err.message : "Conversion failed",
          progress: 100,
        };
      }
      setFileProgresses([...updated]);
    }

    setTotalProgress(100);
    setState(results.length > 0 ? "done" : "error");
  }, [fileProgresses, outputFormat, quality]);

  const handleDownloadZip = useCallback(async () => {
    const results = fileProgresses
      .filter((fp) => fp.result)
      .map((fp) => fp.result!);
    if (results.length > 0) {
      await downloadAsZip(results);
    }
  }, [fileProgresses]);

  const handleReset = useCallback(() => {
    fileProgresses.forEach((fp) => {
      if (fp.file.preview) URL.revokeObjectURL(fp.file.preview);
      if (fp.result?.url) URL.revokeObjectURL(fp.result.url);
    });
    setFileProgresses([]);
    setTotalProgress(0);
    setError("");
    setState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [fileProgresses]);

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...fileProgresses];
      const removed = newFiles.splice(index, 1);
      removed.forEach((fp) => {
        if (fp.file.preview) URL.revokeObjectURL(fp.file.preview);
      });
      setFileProgresses(newFiles);
      if (newFiles.length === 0) setState("idle");
    },
    [fileProgresses]
  );

  const successCount = fileProgresses.filter((fp) => fp.result).length;
  const errorCount = fileProgresses.filter((fp) => fp.error).length;

  return (
    <Layout format="batch">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t.batch.title}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {t.batch.subtitle}
        </p>
      </div>

      {/* Privacy Badge */}
      <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
        <Shield className="w-4 h-4 flex-shrink-0" />
        <span>{t.converter.privacyBadge}</span>
      </div>

      {/* Drop Zone */}
      {(state === "idle" || state === "previewing") && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 mb-4 ${
            isDragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".heic,.heif"
            multiple
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <p className="text-lg font-semibold text-gray-700">
            {t.converter.dropTitle}
          </p>
          <p className="text-sm text-gray-500 mt-1">{t.batch.selectMultiple}</p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* File List */}
      {fileProgresses.length > 0 && (
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 max-h-[400px] overflow-y-auto space-y-2">
            {fileProgresses.map((fp, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200"
              >
                {fp.file.preview ? (
                  <img
                    src={fp.file.preview}
                    alt={fp.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{fp.file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(fp.file.size)}</p>
                  {state === "converting" && (
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${fp.progress}%` }}
                      />
                    </div>
                  )}
                  {fp.error && (
                    <p className="text-xs text-red-500 mt-1">{fp.error}</p>
                  )}
                  {fp.result && (
                    <p className="text-xs text-emerald-600 mt-1">
                      ✓ {fp.result.name} ({formatFileSize(fp.result.size)})
                    </p>
                  )}
                </div>
                {state === "previewing" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Total Progress */}
          {state === "converting" && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">{t.batch.overallProgress}</span>
                <span className="text-emerald-600 font-bold">{Math.round(totalProgress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Done Summary */}
          {state === "done" && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <p className="font-semibold text-emerald-800">
                {t.batch.conversionComplete} {t.batch.filesConverted.replace("{success}", String(successCount)).replace("{total}", String(fileProgresses.length))}
                {errorCount > 0 && ` ${t.batch.filesFailed.replace("{failed}", String(errorCount))}`}
              </p>
            </div>
          )}

          {/* Options */}
          {state === "previewing" && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {t.batch.outputFormat}
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="jpg">{t.batch.formatJpg}</option>
                  <option value="png">{t.batch.formatPng}</option>
                  <option value="webp">{t.batch.formatWebp}</option>
                </select>
              </div>

              {(outputFormat === "jpg" || outputFormat === "webp") && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">{t.batch.quality}</label>
                    <span className="text-sm font-bold text-emerald-600">{quality}%</span>
                  </div>
                  <Slider
                    value={[quality]}
                    onValueChange={(v) => setQuality(v[0])}
                    min={1}
                    max={100}
                    step={1}
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {state === "previewing" && (
              <>
                <Button
                  onClick={handleConvert}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  {t.batch.convertFiles.replace("{count}", String(fileProgresses.length))}
                </Button>
                <Button variant="outline" onClick={handleReset} className="py-6 rounded-xl">
                  {t.batch.clearAll}
                </Button>
              </>
            )}
            {state === "done" && (
              <>
                <Button
                  onClick={handleDownloadZip}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.batch.downloadZip.replace("{count}", String(successCount))}
                </Button>
                <Button variant="outline" onClick={handleReset} className="py-6 rounded-xl">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  {t.batch.convertMore}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}