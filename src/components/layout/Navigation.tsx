"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? 'bg-transparent' : 'bg-black/50 backdrop-blur-md border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-montserrat font-bold text-xl tracking-wider hover:opacity-80 transition-opacity">
          <span className="text-[#6c63ff]">X</span>
          <span className="text-white">OM</span>
          <span className="text-[#6c63ff]">X</span>
          <span className="text-white">IK</span>
        </Link>

        <div className="flex gap-8 text-xs font-light tracking-[0.2em] uppercase text-gray-400">
          {[
            { name: "About", path: "/about" },
            { name: "Projects", path: "/projects" },
            { name: "Gallery", path: "/gallery" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`hover:text-white transition-colors duration-300 relative group ${pathname === item.path ? "text-white" : ""}`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-[#6c63ff] transition-all duration-300 group-hover:w-full ${pathname === item.path ? "w-full" : ""}`} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
