


import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";


const menuItems = [
  {
    name: "Industry",
    href: "https://addverb.com/industry/",
    subMenu: [
      { name: "Automotive and Tyre", href: "https://addverb.com/industry/automotive-and-tyre-automation/" },
      { name: "Consumer Goods", href: "https://addverb.com/industry/consumer-goods-warehouse-automation/" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "Solar and Battery", href: "#" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "Chemicals and Petrochemicals", href: "#" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "E-Commerce", href: "#" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "Pharmaceuticals", href: "#" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
      { name: "Third Party Logistics", href: "#" },
      { name: "Grocery", href: "#https://addverb.com/industry/intralogistics-solutions-for-grocery/" },
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
          {
            name: "Horizontal Carousel",
            href: "#",
          },
          {
            name: "Picking Systems",
            href: "#",
            subMenu: [
              { name: "Pick-to-Light", href: "#" },
            ],
          },
          {
            name: "Software",
            href: "#",
            subMenu: [
              { name: "Management System", href: "#" },
              { name: "Execution System", href: "#" },
              { name: "Control System", href: "#" },
              { name: "Fleet Management", href: "#" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Newsroom",
    href: "#",
    subMenu: [
      { name: "Case Studies", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "Blogs", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "Whitepapers", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "Events", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "News", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "Podcasts", href: "https://addverb.com/warehouse-automation-case-studies/" },
      { name: "Sustainability", href: "https://addverb.com/warehouse-automation-case-studies/" },
    ],
  },
  {
    name: "Company",
    href: "#",
    subMenu: [
      { name: "Careers", href: "https://careers.addverb.com/?_gl=1%2Ajrunz3%2A_ga%2AMTE4OTM4ODQwNy4xNzU3NTc0MTU4%2A_ga_YKN3VND4SB%2AczE3NTc5MjQ2MTMkbzIkZzEkdDE3NTc5MjUzMzEkajQxJGwwJGg4Mjg5NDc1NDg.%2A_gcl_au%2ANzQyNTc5OTc1LjE3NTc1NzQxNjE." },
      { name: "About Us", href: "https://addverb.com/about-us/" },
      { name: "Partners", href: "https://addverb.com/partnerships-and-alliances/" },
    ],
  },
];



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
      results.push({
        name: item.name,
        href: item.href || null,
        path: itemPath,
        item,
      });
    }
    if (item.subMenu) {
      results.push(...searchMenu(item.subMenu, query, itemPath));
    }
  }

  return results;
}



function RecursiveMenu({ items, level = 0 }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <ul className={`${level === 0 ? "flex items-center gap-5" : "mt-1 space-y-1"}`}>
      {items.map((item, idx) => (
        <li key={idx} className="relative">
          <div className="flex items-center gap-2">
        
            {item.href ? (
              <a href={item.href} className="px-2 hover:text-red-500 transition">
                {item.name}
              </a>
            ) : (
              <span className="px-2">{item.name}</span>
            )}

         
            {item.subMenu && (
              <button
                onClick={() => toggle(idx)}
                className={`p-1 rounded hover:bg-gray-100 transition`}
                aria-expanded={openIdx === idx}
                aria-haspopup="true"
              >
                <ChevronRight
                  size={14}
                  className={`transition-transform ${openIdx === idx ? "rotate-90 text-red-600" : ""}`}
                />
              </button>
            )}
          </div>

        
          {item.subMenu && openIdx === idx && (
            <div
              className={`absolute min-w-[200px] bg-white border rounded shadow-lg z-30 ${
                level === 0 ? "left-0 top-full mt-2" : "left-full top-0 ml-2"
              }`}
            >
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





function FlatSearchResults({ results, onClose }) {
  if (!results || results.length === 0) {
    return <p className="px-3 py-4 text-sm text-gray-500">No matches found</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {results.map((r, i) => (
        <li key={i} className="px-3 py-3">
          {r.href ? (
            <a
              href={r.href}
              onClick={() => onClose && onClose()}
              className="block text-left w-full text-base text-gray-800 hover:text-red-600"
            >
              <div className="truncate font-medium">{r.name}</div>
            </a>
          ) : (
            <div className="block text-left w-full text-base text-gray-800">
              <div className="truncate font-medium">{r.name}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function MobileRecursiveList({ items, onOpen}) {
  return (
    <ul className="divide-y divide-gray-200 ">
       
      {items.map((it, i) => (
        <li key={i} className="py-3 ">
          <div className="flex items-center justify-between w-full">
            <div  href={it.href} className=" truncate text-xl"><a href={it.href}>{it.name}</a></div>
            {it.subMenu ? (
              <button
                onClick={() => onOpen(it)}
                aria-haspopup="true"
                className="p-2 rounded hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            ) : it.href ? (
              <a href={it.href} className="text-sm text-gray-700 hover:text-red-500">
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ items, query, setQuery, onClose, flatMatches }) {
  const DURATION = 380;
  const [stack, setStack] = useState([{ title: "Menu", items }]);
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    setStack([{ title: "Menu", items }]);
    setIndex(0);
    return () => clearTimeout(timer.current);
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
    const newIdx = stack.length - 2;
    setIndex(newIdx);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStack((s) => s.slice(0, -1)), 1);
  };

  const isSearching = query && query.trim().length > 0;

  return (
    <div className="h-auto">
      {/* Header: Back/Close + Title (search moved to Navbar) */}
      <div className="flex items-center gap-2 px-3 py-3 border-b ">
        <div className="flex-shrink-0">
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

      {/* If searching, show flat results (access to all menu & sub-menu). Otherwise show panels */}
      <div className="relative overflow-hidden h-full">
        {isSearching ? (
          <div className="p-2 overflow-auto">
            <FlatSearchResults results={flatMatches} onClose={onClose} />
          </div>
        ) : (
          <div
            style={{
              width: `${stack.length * 100}%`,
              transform: `translateX(-${index * (100 / stack.length)}%)`,
              transition: `transform ${DURATION}ms ease`,
              display: "flex",
              height: "100%",
            }}
          >
            {stack.map((panel, pIdx) => (
              <div key={pIdx} style={{ width: `${100 / stack.length}%` }} className="p-3 overflow-auto">
                <MobileRecursiveList items={panel.items} onOpen={openItem} />
              </div>
            ))}
          </div>
        )}
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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-red-600">ADDVERB</div>

            {/* Desktop search container */}
            <div className="hidden sm:block relative">
              <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1 w-[360px]">
                <Search size={16} className="text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search menu & sub-menu"
                  className="w-full text-sm outline-none"
                  aria-label="Search menu"
                />
              </div>

              {/* Desktop: show results under input while typing */}
              {query && query.trim().length > 0 && (
                <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
                  <FlatSearchResults results={flatMatches} onClose={closeAndClear} />
                </div>
              )}
            </div>
          </div>
          <div className="sm:hidden mt-2 px-0 relative">
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

          {/* Mobile small-screen inline search results */}
          {query && query.trim().length > 0 && (
            <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
              <FlatSearchResults results={flatMatches} onClose={closeAndClear} />
            </div>
          )}
        </div>

          <div className="flex items-center gap-3">
           

            <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="hidden md:block">
              <RecursiveMenu items={menuItems} />
            </div>
          </div>
        </div>

        {/* Mobile visible search row (under navbar) — shown only on small screens */}
        
      </div>
    </nav>
  );
}



function BannerCarousel({ slides, interval = 5000 }) {
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [slides.length, interval]);

  const goPrev = () => setIndex((index - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((index + 1) % slides.length);

  return (
    <section className="relative w-full h-[500px] overflow-hidden rounded-2xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 h-[500px] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${s.image})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-6">
              <div className="text-white max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{s.title}</h2>
                <p className="text-lg md:text-xl mb-6">{s.subtitle}</p>
                {s.cta && (
                  <a
                    href={s.cta.href}
                    className="inline-block px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
                  >
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 -translate-y-1/2 left-4 p-2 bg-white/80 rounded-full shadow"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-white/80 rounded-full shadow"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}



function Hero() {
  const slides = [
    {
      title: "Build fast, responsive web apps",
      subtitle: "Modern React, optimized performance, and delightful UX.",
      cta: { label: "View Projects", href: "#projects" },
      image: "/banner/image1.png",
    },
    {
      title: "Design systems & components",
      subtitle: "Reusable UI patterns for consistent interfaces.",
      cta: { label: "See Components", href: "#components" },
      image: "/banner/image2.png",
    },
    {
      title: "Consulting & Engineering",
      subtitle: "Delivering quality front-end engineering for product teams.",
      cta: { label: "Contact Me", href: "#contact" },
      image: "/banner/image3.png",
    },
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
    <footer className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-gray-600">© {new Date().getFullYear()} Krishna Upadhyay</div>
    </footer>
  );
}






import { Mic, FileText, File, RefreshCw } from "lucide-react";

const IconRow = () => {
  return (
    <div className="flex justify-around items-center w-full max-w-md mx-auto py-4">
    <div className="flex flex-col items-center text-red-600">
      <a href='https://addverb.com/podcasts/'>
        <Mic size={40} />
        <span className="mt-1 text-sm text-black">Podcast</span>
      </a>
    </div>
    <div className="flex flex-col items-center text-red-600">
      <a href="https://addverb.com/contact-us/">
        <FileText size={40} />
        <span className="mt-1 text-sm text-black">Enquire</span>
      </a>
    </div>
    <div className="flex flex-col items-center text-red-600">
      <a href="https://addverb.com/blog/">
        <File size={40} />
        <span className="mt-1 text-sm text-black">Blog</span>
      </a>
    </div>
    <div className="flex flex-col items-center text-red-600">
      <a href="https://support.addverb.com/">
        <RefreshCw size={40} />
        <span className="mt-1 text-sm text-black">Support</span>
      </a>
    </div>
  </div>
  );
};



function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = filterMenu(menuItems, query);
  const flatMatches = searchMenu(menuItems, query);
  const isDesktop = useIsDesktop();

  return (
    <>
      <Navbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        query={query}
        setQuery={setQuery}
        flatMatches={flatMatches}
      />

   
<div
  className={`h-auto fixed top-0 right-0 w-1/2 bg-white z-40 md:hidden transform transition-transform duration-500 ease-out border border-gray-300 rounded-l-2xl shadow-lg ${
    mobileOpen ? "translate-x-0" : "translate-x-full"
  }`}
  aria-hidden={!mobileOpen}
>

  <MobileMenu 
    items={filtered}
    query={query}
    setQuery={setQuery}
    onClose={() => setMobileOpen(false)}
    flatMatches={flatMatches}
  />

  <IconRow></IconRow>
</div>


      <main >
        <Hero />
      </main>

      <Footer />
     
    </>
  );
}

export default App;



