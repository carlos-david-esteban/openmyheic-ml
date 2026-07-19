import { useState, useCallback, useRef } from "react";
import { Upload, Download, RefreshCw, Shield, Lock, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  convertHeicToFormat,
  convertHeicToPdf,
  getFilePreview,
  downloadFile,
  formatFileSize,
  type ConversionResult,
  type FileWithPreview,
} from "@/lib/converter";
import { formatInfo } from "@/lib/seo";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeicConverterProps {
  format: string;
  allowMultiple?: boolean;
}

type ConvertState = "idle" | "previewing" | "converting" | "done" | "error";

export default function HeicConverter({ format, allowMultiple = false }: HeicConverterProps) {
  const [state, setState] = useState<ConvertState>("idle");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [quality, setQuality] = useState(92);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const info = formatInfo[format];
  const supportsQuality = info?.supportsQuality ?? false;
  const isMultiFile = format === "pdf" || allowMultiple;

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
      setState("previewing");

      const previews = await Promise.all(heicFiles.map((f) => getFilePreview(f)));
      setFiles(isMultiFile ? previews : [previews[0]]);
    },
    [isMultiFile, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const handleConvert = useCallback(async () => {
    if (files.length === 0) return;

    setState("converting");
    setProgress(0);
    setError("");

    try {
      let conversionResult: ConversionResult;

      if (format === "pdf") {
        conversionResult = await convertHeicToPdf(
          files.map((f) => f.file),
          quality / 100,
          setProgress
        );
      } else {
        conversionResult = await convertHeicToFormat(
          files[0].file,
          format,
          quality / 100,
          setProgress
        );
      }

      setResult(conversionResult);
      setState("done");
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during conversion."
      );
      setState("error");
    }
  }, [files, format, quality]);

  const handleDownload = useCallback(() => {
    if (result) {
      downloadFile(result.blob, result.name);
    }
  }, [result]);

  const handleReset = useCallback(() => {
    files.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    if (result?.url) URL.revokeObjectURL(result.url);

    setFiles([]);
    setResult(null);
    setProgress(0);
    setError("");
    setState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [files, result]);

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      const removed = newFiles.splice(index, 1);
      removed.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      setFiles(newFiles);
      if (newFiles.length === 0) {
        setState("idle");
      }
    },
    [files]
  );

  return (
    <div className="w-full">
      {/* Privacy Badge */}
      <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
        <Shield className="w-4 h-4 flex-shrink-0" />
        <span>{t.converter.privacyBadge}</span>
      </div>

      {/* EXIF / metadata privacy note */}
      <p className="flex items-start gap-2 mb-4 -mt-2 px-1 text-xs text-gray-500">
        <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <span>{t.converter.exifNote}</span>
      </p>

      {/* Drop Zone */}
      {state === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
              : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".heic,.heif"
            multiple={isMultiFile}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <Upload className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {t.converter.dropTitle}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isMultiFile ? t.converter.dropSubtitleMultiple : t.converter.dropSubtitle}
              </p>
            </div>
            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              {t.converter.selectFiles}
            </Button>
          </div>
        </div>
      )}

      {/* File Preview */}
      {(state === "previewing" || state === "converting" || state === "done" || state === "error") && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-lg p-3 border border-gray-200"
              >
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                    {file.width && file.height ? ` • ${file.width}×${file.height}px` : ""}
                  </p>
                </div>
                {state === "previewing" && (
                  <button
                    onClick={() => removeFile(i)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {isMultiFile && state === "previewing" && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
              >
                {t.converter.addMoreFiles}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".heic,.heif"
              multiple={isMultiFile}
              onChange={handleInputChange}
              className="hidden"
            />
          </div>

          {/* Quality Slider */}
          {supportsQuality && state === "previewing" && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  {t.converter.outputQuality}
                </label>
                <span className="text-sm font-bold text-emerald-600">{quality}%</span>
              </div>
              <div className="flex gap-2 mb-4" role="group" aria-label={t.converter.qualityPresets}>
                {([
                  [100, t.converter.presetMax],
                  [92, t.converter.presetBalanced],
                  [65, t.converter.presetSmaller],
                ] as [number, string][]).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setQuality(value)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      quality === value
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Slider
                value={[quality]}
                onValueChange={(v) => setQuality(v[0])}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{t.converter.smallerFile}</span>
                <span>{t.converter.higherQuality}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {state === "converting" && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{t.converter.converting}</span>
                <span className="text-sm font-bold text-emerald-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {state === "error" && error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{t.converter.conversionFailed}</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Result Preview */}
          {state === "done" && result && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-4">
                {result.url && format !== "pdf" ? (
                  <img
                    src={result.url}
                    alt="Converted"
                    className="w-20 h-20 object-cover rounded-lg border border-emerald-200"
                  />
                ) : (
                  <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-emerald-500" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-emerald-800">{t.converter.conversionComplete}</p>
                  <p className="text-sm text-emerald-600 mt-1">
                    {result.name} • {formatFileSize(result.size)}
                    {result.width && result.height ? ` • ${result.width}×${result.height}px` : ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {state === "previewing" && (
              <>
                <Button
                  onClick={handleConvert}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  {t.converter.convertTo} {info?.label || format.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="py-6 rounded-xl"
                >
                  {t.converter.cancel}
                </Button>
              </>
            )}

            {state === "done" && (
              <>
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t.converter.download} {info?.label || format.toUpperCase()}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="py-6 rounded-xl"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  {t.converter.convertAnother}
                </Button>
              </>
            )}

            {state === "error" && (
              <>
                <Button
                  onClick={handleConvert}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  {t.converter.tryAgain}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="py-6 rounded-xl"
                >
                  {t.converter.startOver}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}