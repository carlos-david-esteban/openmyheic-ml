import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { langConfig, languages, switchLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        aria-label="Switch language"
      >
        <span className="text-base">{langConfig.flag}</span>
        <span className="hidden sm:inline">{langConfig.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-80 overflow-y-auto">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                switchLanguage(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                l.code === langConfig.code
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span>{l.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}