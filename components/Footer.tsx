import Link from "next/link";
import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-gray-200/80 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/30 backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Section - Branding & Copyright */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Task Manager
              </span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Made with{" "}
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Avishkar Kakde
              </span>
            </p>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="https://github.com/Avishkar2004"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:shadow-md hover:shadow-gray-200/50 hover:-translate-y-0.5"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium hidden sm:inline">
                GitHub
              </span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/avishkar-kakde-6592b825b/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/80 hover:bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:shadow-md hover:shadow-blue-200/50 hover:-translate-y-0.5"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium hidden sm:inline">
                LinkedIn
              </span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
