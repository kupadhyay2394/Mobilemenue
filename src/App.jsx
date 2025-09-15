
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  ChevronRight,
  Search,
  Menu,
  X,
  Mic,
  FileText,
  File,
  RefreshCw,
} from "lucide-react";

const menuItems = [
  {
    name: "Industry",
    href: "https://addverb.com/industry/",
    subMenu: [
      { name: "Automotive and Tyre", href: "https://addverb.com/industry/automotive-and-tyre-automation/" },
      { name: "Consumer Goods", href: "https://addverb.com/industry/consumer-goods-warehouse-automation/" },
      { name: "Grocery", href: "https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "Solar and Battery", href: "#" },
      { name: "Chemicals", href: "#" },
      { name: "E-Commerce", href: "#" },
      { name: "Pharmaceuticals", href: "#" },
      { name: "Third Party Logistics", href: "#",subMenu:[{name:"Cold Storage",href:"#"},{name:'Fashion',href:"#"},{name:"Semiconductor",href:"#"}] },
      { name: "Cold Storage", href: "#" },
      { name: "Fashion", href: "#" },
      { name: "Semiconductors", href: "https://addverb.com/" },
    ],
  },
  {
    name: "Solutions",
    href: "https://addverb.com/functionality/",
    subMenu: [
      {
        name: "Functionality",
        href: "https://addverb.com/functionality/",
        subMenu: [
          { name: "Material Movement", href: "https://addverb.com/functionality/" },
          { name: "Sortation", href: "https://addverb.com/functionality/" },
          { name: "Picking", href: "https://addverb.com/functionality/" },
          { name: "Storage", href: "https://addverb.com/functionality/" },
          { name: "Reverse Logistics", href: "https://addverb.com/functionality/" },
        ],
      },
      {
        name: "Product",
        href: "https://addverb.com/functionality/",
        subMenu: [
          {
            name: "Mobile Robots",
            href: "https://addverb.com/functionality/",
            subMenu: [
              { name: "Autonomous Forklift", href: "https://addverb.com/functionality/" },
              { name: "Autonomous Mobile", href: "https://addverb.com/functionality/" },
              { name: "Multi-Carton Picking", href: "https://addverb.com/functionality/" },
              { name: "Rail Guided Vehicle", href: "https://addverb.com/functionality/" },
            ],
          },
          {
            name: "Sorting Robots",
            href: "https://addverb.com/functionality/",
            subMenu: [
              { name: "Robotic Sorter", href: "https://addverb.com/functionality/" },
              { name: "Vertical Sortation", href: "https://addverb.com/functionality/" },
            ],
          },
          {
            name: "ASRS",
            href: "https://addverb.com/functionality/",
            subMenu: [
              { name: "4 Way Pallet", href: "" },
              { name: "Mother-Child", href: "#" },
              { name: "Pallet", href: "#" },
              { name: "Crane", href: "#" },
              { name: "Carton", href: "#" },
              { name: "Multi Level", href: "#" },
            ],
          },
          { name: "Carousel", href: "#" },
          { name: "Picking", href: "#", subMenu: [{ name: "Pick-to-Light", href: "#" }] },
          {
            name: "Software",
            href: "#",
            subMenu: [
              { name: "Management", href: "#" },
              { name: "Execution System", href: "#" },
              { name: "Control System", href: "#" },
              { name: "Fleet Management", href: "#" },
            ],
          },
        ],
      },
    ],
  },
  {name:"Services", href:"https://addverb.com/"},
  {
    name: "Newsroom",
    href: "#",
    subMenu: [
      { name: "Case Studies", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "Blogs", href: "https://addverb.com/blog/" },
      { name: "Whitepapers", href: "https://addverb.com/" },
      { name: "Events", href: "https://addverb.com/" },
      { name: "News", href: "https://addverb.com/" },
      { name: "Podcasts", href: "https://addverb.com/podcasts/" },
      { name: "Sustainability", href: "https://addverb.com/" },
    ],
  },
  {
    name: "Menue",
    href: "#",
    subMenu: [
      { name: "Careers", href: "https://careers.addverb.com/" },
      { name: "About Us", href: "https://addverb.com/about-us/" },
      { name: "Partners", href: "https://addverb.com/partnerships-and-alliances/" },
    ],
  },
];

function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) handler(e);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [ref, handler]);
}

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= breakpoint : true);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isDesktop;
}


function filterMenu(items, query) {
  if (!query) return items;
  const q = query.toLowerCase();
  return items
    .map((it) => {
      if (it.name.toLowerCase().includes(q)) return it;
      if (it.subMenu) {
        const sub = filterMenu(it.subMenu, query);
        if (sub.length) return { ...it, subMenu: sub };
      }
      return null;
    })
    .filter(Boolean);
}

function searchMenu(items, query, path = []) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  const results = [];
  for (const item of items) {
    const itemPath = [...path, item.name];
    if (item.name.toLowerCase().includes(q)) {
      results.push({ name: item.name, href: item.href || null, path: itemPath });
    }
    if (item.subMenu) results.push(...searchMenu(item.subMenu, query, itemPath));
  }
  return results;
}


const styles = {
  link: "px-2 hover:text-red-600 transition text-gray-800",
  btn: "p-2 rounded hover:bg-gray-100 transition",
  panel: "absolute min-w-[220px] bg-white border rounded-lg shadow-lg z-30",
};

function SearchBox({ value, onChange, placeholder = "Search menu & sub-menu" }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1 w-full">
        <Search size={16} className="text-gray-500" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm outline-none bg-transparent"
          aria-label="Search menu"
        />
      </div>
    </div>
  );
}

function FlatSearchResults({ results, onClose }) {
  if (!results || results.length === 0) return <p className="px-3 py-4 text-sm text-gray-500">No matches found</p>;
  return (
    <ul className="divide-y divide-gray-200">
      {results.map((r, i) => (
        <li key={i} className="px-3 py-3">
          {r.href ? (
            <a href={r.href} onClick={() => onClose && onClose()} className="block text-base text-gray-800 hover:text-red-600">
              <div className="truncate font-medium">{r.name}</div>
              <div className="text-xs text-gray-500 truncate">{r.path?.join(" » ")}</div>
            </a>
          ) : (
            <div className="block text-base text-gray-800">
              <div className="truncate font-medium">{r.name}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function RecursiveMenu({ items, level = 0 }) {
  const [openIdx, setOpenIdx] = useState(null);
  const rootRef = useRef(null);
  useOutsideClick(rootRef, () => setOpenIdx(null));

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <ul ref={rootRef} className={`${level === 0 ? "flex items-center gap-5" : "mt-1 space-y-1"}`}>
      {items.map((item, idx) => (
        <li key={idx} className="relative">
          <div className="flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className={styles.link}>
                {item.name}
              </a>
            ) : (
              <span className="px-2">{item.name}</span>
            )}

            {item.subMenu && (
              <button onClick={() => toggle(idx)} className={styles.btn} aria-expanded={openIdx === idx} aria-haspopup="true">
                <ChevronRight size={14} className={`transition-transform ${openIdx === idx ? "rotate-90 text-red-600" : ""}`} />
              </button>
            )}
          </div>

          {item.subMenu && openIdx === idx && (
            <div className={`${styles.panel} ${level === 0 ? "left-0 top-full mt-2" : "left-full top-0 ml-2"}`}>
              <div className="p-2">
                <RecursiveMenu items={item.subMenu} level={level + 1} />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function MobileRecursiveList({ items, onOpen }) {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((it, idx) => (
        <li key={idx} className="py-3">
          <div className="flex items-center justify-between w-full">
            {it.href ? (
              <a href={it.href} className="truncate text-lg font-medium">
                {it.name}
              </a>
            ) : (
              <div className="truncate text-lg font-medium">{it.name}</div>
            )}

            {it.subMenu ? (
              <button onClick={() => onOpen(it)} aria-haspopup="true" className="p-2 rounded hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ items, query, setQuery, onClose, flatMatches }) {
  const DURATION = 320;
  const [stack, setStack] = useState([{ title: "Menu", items }]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setStack([{ title: "Menu", items }]);
    setIndex(0);
  }, [items]);

  const openItem = (item) => {
    if (!item.subMenu) return;
    setStack((s) => {
      const next = [...s, { title: item.name, items: item.subMenu }];
      setIndex(next.length - 1);
      return next;
    });
  };

  const goBack = () => {
    if (stack.length <= 1) return;
    setIndex((i) => i - 1);
    setStack((s) => s.slice(0, -1));
  };

  const isSearching = query && query.trim().length > 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-3 border-b">
        <div>
          {stack.length > 1 ? (
            <button onClick={goBack} className="px-2 py-1 rounded hover:bg-gray-100" aria-label="Back">
              <X size={16} />
            </button>
          ) : (
            <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100" aria-label="Close">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex-1 px-2 text-center">
          <div className="font-medium truncate">{stack[index]?.title}</div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {isSearching ? (
          <div className="p-2 overflow-auto">
            <FlatSearchResults results={flatMatches} onClose={onClose} />
          </div>
        ) : (
          <div className="h-full flex transition-transform duration-300" style={{ transform: `translateX(-${index * 100}%)` }}>
            {stack.map((panel, pIdx) => (
              <div key={pIdx} style={{ minWidth: "100%" }} className="p-3 overflow-auto">
                <MobileRecursiveList items={panel.items} onOpen={openItem} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <div className="flex justify-around items-center w-full max-w-md mx-auto py-2">
          <div className="flex flex-col items-center text-red-600">
            <a href="https://addverb.com/podcasts/">
              <Mic size={28} />
              <span className="mt-1 text-sm text-black">Podcast</span>
            </a>
          </div>
          <div className="flex flex-col items-center text-red-600">
            <a href="https://addverb.com/contact-us/">
              <FileText size={28} />
              <span className="mt-1 text-sm text-black">Enquire</span>
            </a>
          </div>
          <div className="flex flex-col items-center text-red-600">
            <a href="https://addverb.com/blog/">
              <File size={28} />
              <span className="mt-1 text-sm text-black">Blog</span>
            </a>
          </div>
          <div className="flex flex-col items-center text-red-600">
            <a href="https://support.addverb.com/">
              <RefreshCw size={28} />
              <span className="mt-1 text-sm text-black">Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar({ mobileOpen, setMobileOpen, query, setQuery, flatMatches }) {
  const closeAndClear = () => {
    setQuery("");
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-red-600">ADDVERB</div>

            <div className="hidden sm:block relative">
              <div className="w-[360px]">
                <SearchBox value={query} onChange={setQuery} />
                {query && query.trim().length > 0 && (
                  <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
                    <FlatSearchResults results={flatMatches} onClose={closeAndClear} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sm:hidden mt-2 px-0 relative w-full">
            <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1">
              <Search size={14} className="text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu & sub-menu"
                className="w-full text-sm outline-none"
                aria-label="Search menu (mobile)"
              />
            </div>

            {query && query.trim().length > 0 && (
              <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
                <FlatSearchResults results={flatMatches} onClose={closeAndClear} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <RecursiveMenu items={menuItems} />
            </div>

            <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function BannerCarousel({ slides = [], interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!slides.length) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(timerRef.current);
  }, [slides.length, interval]);

  if (!slides.length) return null;

  return (
    <section className="relative w-full h-[420px] overflow-hidden rounded-2xl">
      <div className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {slides.map((s, i) => (
          <div key={i} className="w-full flex-shrink-0 snap-center relative h-[420px] bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }}>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-6">
              <div className="text-white max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{s.title}</h2>
                <p className="text-base md:text-lg mb-4">{s.subtitle}</p>
                {s.cta && (
                  <a href={s.cta.href} className="inline-block px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-400"}`} />
        ))}
      </div>
    </section>
  );
}

function Hero() {
  const slides = [
    { title: "Build fast, responsive web apps", subtitle: "Modern React, optimized performance, and delightful UX.", cta: { label: "View Projects", href: "#projects" }, image: "/banner/image1.png" },
    { title: "Design systems & components", subtitle: "Reusable UI patterns for consistent interfaces.", cta: { label: "See Components", href: "#components" }, image: "/banner/image2.png" },
    { title: "Consulting & Engineering", subtitle: "Delivering quality front-end engineering for product teams.", cta: { label: "Contact Me", href: "#contact" }, image: "/banner/image3.png" },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <BannerCarousel slides={slides} interval={6000} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-6 border-t border-gray-100 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Krishna Upadhyay. All rights reserved.
    </footer>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 220);

  const filtered = useMemo(() => filterMenu(menuItems, debouncedQuery), [debouncedQuery]);
  const flatMatches = useMemo(() => searchMenu(menuItems, debouncedQuery), [debouncedQuery]);

  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} query={query} setQuery={setQuery} flatMatches={flatMatches} />

      {/* Mobile Drawer + backdrop */}
      {!isDesktop && (
        <>
          <div className={`fixed inset-0 z-30 transition-opacity ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          </div>

          <div className={`fixed top-0 right-0 z-40 h-full w-3/4 max-w-sm bg-white transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!mobileOpen}>
            <MobileMenu items={filtered} query={query} setQuery={setQuery} onClose={() => setMobileOpen(false)} flatMatches={flatMatches} />
          </div>
        </>
      )}

      <main>
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
// src/App.jsx
// import React, { useState, useMemo } from "react";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import BannerCarousel from "./components/Carousel/BannerCaroussel.jsx";
// import Hero from "./components/Hero/Hero";
// import IconRow from "./components/IconRow/IconRow";
// import Footer from "./components/Footer/Footer";

// import { menuItems } from "./utils/menuItems";
// import { searchMenu } from "./utils/searchMenu";
// import MobileRecursiveList from "./components/Menu/MobileRecursiveList";

// export default function App() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [query, setQuery] = useState("");

//   // flat matches for search dropdown
//   const flatMatches = useMemo(() => searchMenu(menuItems, query), [query]);

//   return (
//     <div className="font-sans">
//       {/* Navbar */}
//       <Navbar
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//         query={query}
//         setQuery={setQuery}
//         flatMatches={flatMatches}
//       />

//       {/* Mobile Menu Drawer */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-40 bg-black/30 md:hidden">
//           <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto">
//             <MobileRecursiveList items={menuItems} onOpen={() => {}} />
//           </div>
//         </div>
//       )}

//       {/* Main Sections */}
//       <Hero />
//       <BannerCarousel />
//       <IconRow />

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

