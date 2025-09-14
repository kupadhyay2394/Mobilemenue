import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";


// ✅ Example nested data
const menuItems = [
  {
    name: "Industry",
    subMenu: [
      { name: "afgdfg", href: "#" },
      { name: "bgfdfg", href: "#" },
    ],
  },
  {
    name: "Solutions",
    subMenu: [
      {
        name: "sub1",
        subMenu: [
          { name: "sub1.2", subMenu: [{ name: "sub1.2.1", href: "#" }, { name: "sub1.2.2", href: "#" }] },
          { name: "sub1.3", subMenu: [{ name: "sub1.3.1", href: "#" }, { name: "sub1.3.2", href: "#" }, { name: "sub1.3.3", href: "#" }] },
          { name: "sub1.4", subMenu: [{ name: "sub1.4.1", href: "#" }, { name: "sub1.4.2", href: "#" }] },
          { name: "sub1.5", subMenu: [{ name: "sub1.5.1", href: "#" }, { name: "sub1.5.2", href: "#" }] },
        ],
      },
      {
        name: "sub2",
        subMenu: [
          { name: "sub2.1", subMenu: [{ name: "sub2.1.1", href: "#" }, { name: "sub2.1.2", href: "#" }] },
          { name: "sub2.2", subMenu: [{ name: "sub2.2.1", href: "#" }, { name: "sub2.2.2", href: "#" }] },
          { name: "sub2.3", subMenu: [{ name: "sub2.3.1", href: "#" }, { name: "sub2.3.2", href: "#" }, { name: "sub2.3.3", href: "#" }] },
          { name: "sub2.4", subMenu: [{ name: "sub2.4.1", href: "#" }, { name: "sub2.4.2", href: "#" }] },
        ],
      },
    ],
  },
  { name: "Services", href: "#" },
  {
    name: "Newsroom",
    subMenu: [
      { name: "sub1", href: "#" },
      { name: "sub2", href: "#" },
      { name: "sub3", href: "#" },
      { name: "sub4", href: "#" },
      { name: "sub5", href: "#" },
      { name: "sub6", href: "#" },
    ],
  },
  {
    name: "Menu",
    subMenu: [
      { name: "sub1", href: "#" },
      { name: "sub2", href: "#" },
    ],
  },
];

import { useEffect } from "react";

// ✅ Hook: detect if screen is desktop
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isDesktop;
}


// 🔎 Recursive filter
function filterMenu(items, query) {
  if (!query) return items;
  return items
    .map((item) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) return item;
      if (item.subMenu) {
        const filteredSub = filterMenu(item.subMenu, query);
        if (filteredSub.length > 0) return { ...item, subMenu: filteredSub };
      }
      return null;
    })
    .filter(Boolean);
}

const RecursiveMenu = ({ items, isRoot = true }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <ul className={`${isRoot ? "divide-y divide-black" : ""}`}>
      {items.map((item, idx) => (
        <li key={idx} className="py-2 pl-2">
          <div className="flex justify-between  items-center">
            {item.subMenu ? (
              <p
                className={`${
                  openIdx === idx ? "text-red-800" : "text-black-800"
                } text-xl  py-4 transition`}
              >
                {item.name}
              </p>
            ) : (
              <p href={item.href || "#"} className="text-black-800 hover:text-red-500 transition text-xl py-4">
                {item.name}
              </p>
            )}
            {item.subMenu && (
              <button onClick={() => toggle(idx)}>
                {openIdx === idx ? (
                  <ChevronDown size={16} className="text-black-800" />
                ) : (
                  <ChevronRight size={16} className="text-black-800" />
                )}
              </button>
            )}
          </div>

          {item.subMenu && openIdx === idx && (
            <div className="mt-1 rounded-md">
              <RecursiveMenu items={item.subMenu} isRoot={false} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

function Navbar({ mobileOpen, setMobileOpen }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-red-600">ADDVERB</div>
          <button
            className="md:hidden text-black"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {menuItems.map((item, idx) => (
              <li key={idx} className="relative group">
                <a
                  href={item.href || "#"}
                  className="flex items-center gap-1 hover:text-red-500 transition"
                >
                  {item.name}
                  {item.subMenu && <ChevronDown size={16} />}
                </a>
                {item.subMenu && (
                  <ul className="absolute left-0 mt-2 min-w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.subMenu.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <a
                          href={sub.href || "#"}
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="py-18">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-3">Frontend Developer</h1>
          <p className="text-gray-600 mb-4">I build fast, responsive web apps with React and modern tooling.</p>
          <div className="flex gap-3 flex-wrap">
            <a className="inline-block px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors" href="#projects">
              View Projects
            </a>
            <a className="inline-block px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 hover:border-blue-200 transition-colors" href="#contact">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-500">© {new Date().getFullYear()} Krishna Upadhyay. All rights reserved.</p>
      </div>
    </footer>
  );
}
// src/components/PodcastButton.jsx
import { Play } from "lucide-react";

const PodcastIcon = ({ size = 64, color = "text-red-500" }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${color}`}
        fill="none"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth="3"
      >
        {/* Microphone body */}
        <rect x="24" y="12" width="16" height="28" rx="8" />
        {/* Microphone stand */}
        <line x1="32" y1="40" x2="32" y2="52" />
        <line x1="24" y1="52" x2="40" y2="52" />

       
        <path d="M28 16 Q32 12 36 16" />   
        <path d="M24 12 Q32 4 40 10" />  
 
      </svg>
      <span className="text-gray-700 text-sm font-medium">Podcasts</span>
    </div>
  );
};
// src/components/EnquireIcon.jsx
import React from "react";

const EnquireIcon = ({ size = 64, color = "text-red-500" }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${color}`}
        fill="none"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth="3"
      >
        {/* Paper */}
        <rect x="14" y="10" width="36" height="44" rx="2" />
        <line x1="20" y1="20" x2="36" y2="20" />
        <line x1="20" y1="28" x2="36" y2="28" />
        <line x1="20" y1="36" x2="28" y2="36" />

        {/* Pen (diagonal) */}
        <path d="M38 34 L48 44 L44 48 L34 38 Z" />
      </svg>
      <span className="text-gray-700 text-sm font-medium">Enquire</span>
    </div>
  );
};
const BlogIcon = ({ size = 64, color = "text-red-500" }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${color}`}
        fill="none"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth="3"
      >
        {/* Document outline */}
        <rect x="16" y="10" width="32" height="44" rx="2" />

        {/* Folded corner */}
        <polyline points="40,10 48,18 48,10" />

        {/* Text lines */}
        <line x1="22" y1="24" x2="42" y2="24" />
        <line x1="22" y1="32" x2="42" y2="32" />
        <line x1="22" y1="40" x2="34" y2="40" />
      </svg>
      <span className="text-gray-700 text-sm font-medium">Blog</span>
    </div>
  );
};

const SupportIcon = ({ size = 64, color = "text-red-500" }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${color}`}
        fill="none"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth="3"
      >
        {/* Hand */}
        <path d="M12 42 Q20 36 28 40 H44 Q48 40 48 44 Q48 48 44 48 H28 Q20 48 16 52 Z" />

        {/* 24/7 circle arrows */}
        <circle cx="46" cy="20" r="10" />
        <polyline points="46,12 50,16 46,20" />
        <polyline points="46,28 42,24 46,20" />

        {/* "24" text (simplified as bars for minimal icon style) */}
        <text x="41" y="23" fontSize="6" fill="currentColor">24</text>
      </svg>
      <span className="text-gray-700 text-sm font-medium">Support</span>
    </div>
  );
};


function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredItems = filterMenu(menuItems, query);

  return (
    <>
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {mobileOpen ? (
        <div className="px-4 py-2  space-y-4">
          {/* 🔎 Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Filtered menu */}
          {filteredItems.length > 0 ? (
            <div>
              <RecursiveMenu className="border-solid-black border-b block mt-2" items={filteredItems} />
              {/* <span className="border-solid-black border-b block mt-2"></span> */}
              
            </div>
          ) : (
            <p className="text-gray-500 text-sm ">No matches found</p>
          )}
          
          <div className="flex justify-around mt-6">
          <PodcastIcon />
          <EnquireIcon />
          <BlogIcon />
          <SupportIcon />
          </div>

        </div>
      ) : (
        <div>
          <Hero />
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
