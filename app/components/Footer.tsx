import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 pb-6 text-center">
      <Link 
        href="https://evandro.dev.br"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
          bg-gradient-to-r from-slate-900 to-slate-700 
          dark:from-slate-200 dark:to-slate-400 
          text-white dark:text-slate-900 
          hover:shadow-lg transition-all duration-300 
          transform hover:scale-105 hover:-translate-y-0.5"
      >
        <span className="font-medium tracking-wide">evandro.dev.br</span>
        <svg 
          className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </Link>
    </footer>
  );
}