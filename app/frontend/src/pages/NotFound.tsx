import { Link } from "react-router-dom";
import { ArrowLeft, FileImage } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <FileImage className="w-16 h-16 text-emerald-300 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
      <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Try one of our conversion tools instead.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}