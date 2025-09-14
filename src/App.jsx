// import { useState,useRef } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Search,
//   Menu,
//   X,
// } from "lucide-react";


// // ✅ Example nested data
// const menuItems = [
//   {
//     name: "Industry",
//     subMenu: [
//       { name: "afgdfg", href: "#" },
//       { name: "bgfdfg", href: "#" },
//     ],
//   },
//   {
//     name: "Solutions",
//     subMenu: [
//       {
//         name: "sub1",
//         subMenu: [
//           { name: "sub1.2", subMenu: [{ name: "sub1.2.1", href: "#" }, { name: "sub1.2.2", href: "#" }] },
//           { name: "sub1.3", subMenu: [{ name: "sub1.3.1", href: "#" }, { name: "sub1.3.2", href: "#" }, { name: "sub1.3.3", href: "#" }] },
//           { name: "sub1.4", subMenu: [{ name: "sub1.4.1", href: "#" }, { name: "sub1.4.2", href: "#" }] },
//           { name: "sub1.5", subMenu: [{ name: "sub1.5.1", href: "#" }, { name: "sub1.5.2", href: "#" }] },
//         ],
//       },
//       {
//         name: "sub2",
//         subMenu: [
//           { name: "sub2.1", subMenu: [{ name: "sub2.1.1", href: "#" }, { name: "sub2.1.2", href: "#" }] },
//           { name: "sub2.2", subMenu: [{ name: "sub2.2.1", href: "#" }, { name: "sub2.2.2", href: "#" }] },
//           { name: "sub2.3", subMenu: [{ name: "sub2.3.1", href: "#" }, { name: "sub2.3.2", href: "#" }, { name: "sub2.3.3", href: "#" }] },
//           { name: "sub2.4", subMenu: [{ name: "sub2.4.1", href: "#" }, { name: "sub2.4.2", href: "#" }] },
//         ],
//       },
//     ],
//   },
//   { name: "Services", href: "#" },
//   {
//     name: "Newsroom",
//     subMenu: [
//       { name: "sub1", href: "#" },
//       { name: "sub2", href: "#" },
//       { name: "sub3", href: "#" },
//       { name: "sub4", href: "#" },
//       { name: "sub5", href: "#" },
//       { name: "sub6", href: "#" },
//     ],
//   },
//   {
//     name: "Menu",
//     subMenu: [
//       { name: "sub1", href: "#" },
//       { name: "sub2", href: "#" },
//     ],
//   },
// ];

// import { useEffect } from "react";

// // ✅ Hook: detect if screen is desktop
// function useIsDesktop(breakpoint = 768) {
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= breakpoint);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [breakpoint]);

//   return isDesktop;
// }


// // 🔎 Recursive filter
// function filterMenu(items, query) {
//   if (!query) return items;
//   return items
//     .map((item) => {
//       if (item.name.toLowerCase().includes(query.toLowerCase())) return item;
//       if (item.subMenu) {
//         const filteredSub = filterMenu(item.subMenu, query);
//         if (filteredSub.length > 0) return { ...item, subMenu: filteredSub };
//       }
//       return null;
//     })
//     .filter(Boolean);
// }

// // const RecursiveMenu = ({ items, isRoot = true }) => {
// //   const [openIdx, setOpenIdx] = useState(null);
// //   const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? null : idx));

// //   return (
// //     <ul className={`${isRoot ? "divide-y divide-black" : ""}`}>
// //       {items.map((item, idx) => (
// //         <li key={idx} className="py-2 pl-2">
// //           <div className="flex justify-between  items-center">
// //             {item.subMenu ? (
// //               <p
// //                 className={`${
// //                   openIdx === idx ? "text-red-800" : "text-black-800"
// //                 } text-xl  py-4 transition`}
// //               >
// //                 {item.name}
// //               </p>
// //             ) : (
// //               <p href={item.href || "#"} className="text-black-800 hover:text-red-500 transition text-xl py-4">
// //                 {item.name}
// //               </p>
// //             )}
// //             {item.subMenu && (
// //               <button onClick={() => toggle(idx)}>
// //                 {openIdx === idx ? (
// //                   <ChevronDown size={16} className="text-black-800" />
// //                 ) : (
// //                   <ChevronRight size={16} className="text-black-800" />
// //                 )}
// //               </button>
// //             )}
// //           </div>

// //           {item.subMenu && openIdx === idx && (
// //             <div className="mt-1 rounded-md">
// //               <RecursiveMenu items={item.subMenu} isRoot={false} />
// //             </div>
// //           )}
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // };

// // ...existing code...
// function Navbar({ mobileOpen, setMobileOpen }) {
//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <div className="text-xl font-bold text-red-600">ADDVERB</div>
//           <button
//             className="md:hidden text-black"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex space-x-5">
//             {menuItems.map((item, idx) => (
//               <li key={idx} className="relative group">
//                 <a
//                   href={item.href || "#"}
//                   className="flex items-center  hover:text-red-500 transition"
//                 >
//                   {item.name}
//                   {/* show ChevronRight for any item that has subMenu */}
//                   {item.subMenu && <ChevronRight size={16} />}
//                 </a>

//                 {item.subMenu && (
//                   <ul className="absolute left-0 mt-2 min-w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
//                     {item.subMenu.map((sub, subIdx) => (
//                       <li key={subIdx}>
//                         <a
//                           href={sub.href || "#"}
//                           className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50"
//                         >
//                           <span>{sub.name}</span>
//                           {/* show ChevronRight for nested items that have their own subMenu */}
                  
//                           {sub.subMenu && <ChevronRight size={14} />}
//                         </a>

//                         {/* optional deeper nested dropdown (keeps showing chevrons) */}
//                         {sub.subMenu && (
//                           <ul className="pl-4">
//                             {sub.subMenu.map((deep, dIdx) => (
//                               <li key={dIdx}>
//                                 <a
//                                   href={deep.href || "#"}
//                                   className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50"
//                                 >
//                                   <span>{deep.name}</span>
//                                   {deep.subMenu && <ChevronRight size={12} />}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
// // ...existing code...

// function Hero() {
//   return (
//     <section id="home" className="py-18">
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
//         <div>
//           <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-3">Frontend Developer</h1>
//           <p className="text-gray-600 mb-4">I build fast, responsive web apps with React and modern tooling.</p>
//           <div className="flex gap-3 flex-wrap">
//             <a className="inline-block px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors" href="#projects">
//               View Projects
//             </a>
//             <a className="inline-block px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 hover:border-blue-200 transition-colors" href="#contact">
//               Contact Me
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// // ...existing code...

// // ------------------ Mobile-specific menu that replaces parent with child ------------------
// // ...existing code...
// // ...existing code...
// // ...existing code...
// function MobileMenu({ items, query, setQuery }) {
//   const DURATION = 1000; // ms
//   const [stack, setStack] = useState([items]);
//   const [targetIndex, setTargetIndex] = useState(0);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     // reset when top-level items change (search etc.)
//     setStack([items]);
//     setTargetIndex(0);
//     return () => clearTimeout(timerRef.current);
//   }, [items]);

//   const openItem = (item) => {
//     if (!item.subMenu) return;
//     setStack((s) => {
//       const newStack = [...s, item.subMenu];
//       // slide to the newly pushed panel (each panel is 100% width)
//       setTargetIndex(newStack.length - 1);
//       return newStack;
//     });
//   };

//   const goBack = () => {
//     if (stack.length <= 1) return;
//     const newIndex = stack.length - 2;
//     // slide back to previous panel
//     setTargetIndex(newIndex);

//     clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       setStack((s) => s.slice(0, -1));
//       // keep targetIndex valid after popping
//       setTargetIndex((idx) => Math.min(idx, Math.max(0, newIndex)));
//     }, DURATION);
//   };

//   return (
//     <div className="relative">
//       {/* Header: Back button + Search on same row */}
//       <div className="flex items-center gap-2 px-2 py-3 border-b">
        

//         <div className="flex-1">
//           <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1">
//             <Search size={16} className="text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search menu..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full outline-none text-sm"
//             />
//           </div>
//         </div>
//         <div className="flex-shrink-0">
//           {stack.length > 1 ? (
//             <button
//               onClick={goBack}
//               className="px-2 py-1 rounded hover:bg-gray-100 text-sm"
//               aria-label="Go back"
//             >
//               ← Back
//             </button>
//           ) : null}
//         </div>
//       </div>

//        <div className="relative overflow-hidden">
//         <div
//           // panels are full width; translateX moves by 100% per panel
//           style={{
//             width: `${stack.length * 100}%`,
//             transform: `translateX(-${targetIndex * 100}%)`,
//             transition: `transform ${DURATION}ms ease`,
//             display: "flex",
//           }}
//         >
//           {stack.map((level, lvlIdx) => (
//             <div
//               key={lvlIdx}
//               // each panel occupies 100% of the viewport area inside the carousel
//               style={{ width: "100%" }}
//               className="flex-shrink-0 px-4 py-2"
//             >
//               <ul className="divide-y divide-black">
//                 {level.map((item, idx) => (
//                   <li key={idx} className="py-2"> {/* removed pl-2 to eliminate indentation */}
//                     <div className="flex justify-between items-center">
//                       {item.subMenu ? (
//                         <button
//                           onClick={() => openItem(item)}
//                           className="text-left text-xl py-4 w-full flex items-center justify-between text-blue-800 hover:text-red-500 transition"
//                         >
//                           <span className="text-black-800">{item.name}</span>
//                           <ChevronRight size={16} className="text-black-800" />
//                         </button>
//                       ) : (
//                         <a
//                           href={item.href || "#"}
//                           className="text-black-800 hover:text-red-500 text-left text-xl py-4 w-full flex items-center justify-between transition"
//                         >
//                           {item.name}
//                         </a>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // ...existing code...
// // ...existing code...
// // ...existing code...

// // ...existing code...

// // ...existing code...
// function App() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [query, setQuery] = useState("");

//   const filteredItems = filterMenu(menuItems, query);
//   const isDesktop = useIsDesktop();

//   return (
//     <>
//       <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

//       {/* Mobile sliding panel: stays in DOM and slides in/out from left */}
 
//       <div
//         className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white z-40 md:hidden transform transition-transform duration-700 ease-out ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         aria-hidden={!mobileOpen}
//       >
//         <div className="px-4 py-2 space-y-4">
//           {/* Removed the separate search here — search moved into MobileMenu header */}
//           {/* Mobile: show replaced menus via MobileMenu; Desktop still uses RecursiveMenu */}
//           {filteredItems.length > 0 ? (
//             <div>
//               {isDesktop ? (
//                 <RecursiveMenu className="border-solid-black border-b block mt-2 " items={filteredItems} />
//               ) : (
//                 <MobileMenu items={filteredItems} query={query} setQuery={setQuery} />
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-sm ">No matches found</p>
//           )}

//           <div className="flex justify-around mt-6">
//             <PodcastIcon />
//             <EnquireIcon />
//             <BlogIcon />
//             <SupportIcon />
//           </div>
//         </div>
//       </div>
//       {/* Main content (Hero) remains — optionally dim when mobile menu open */}
//       <div className={`transition-opacity duration-300 ${mobileOpen ? "opacity-50" : "opacity-100"}`}>
//         {!mobileOpen && <Hero />}
//         {/* If you want Hero visible under the sliding panel on mobile, keep it rendered always:
//             <Hero /> 
//            but above code preserves previous behavior while still enabling slide animation.
//         */}
//       </div>

//       <Footer />
//     </>
//   );
// }
// export default App;
// // ...existing code...
// // ...existing code...


// function Footer() {
//   return (
//     <footer className="py-6 border-t border-gray-200 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <p className="text-gray-500">© {new Date().getFullYear()} Krishna Upadhyay. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }
// // src/components/PodcastButton.jsx
// import { Play } from "lucide-react";

// const PodcastIcon = ({ size = 64, color = "text-red-500" }) => {
//   return (
//     <div className="flex flex-col items-center space-y-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className={`${color}`}
//         fill="none"
//         viewBox="0 0 64 64"
//         width={size}
//         height={size}
//         stroke="currentColor"
//         strokeWidth="3"
//       >
//         {/* Microphone body */}
//         <rect x="24" y="12" width="16" height="28" rx="8" />
//         {/* Microphone stand */}
//         <line x1="32" y1="40" x2="32" y2="52" />
//         <line x1="24" y1="52" x2="40" y2="52" />

       
//         <path d="M28 16 Q32 12 36 16" />   
//         <path d="M24 12 Q32 4 40 10" />  
 
//       </svg>
//       <span className="text-gray-700 text-sm font-medium">Podcasts</span>
//     </div>
//   );
// };
// // src/components/EnquireIcon.jsx
// import React from "react";

// const EnquireIcon = ({ size = 64, color = "text-red-500" }) => {
//   return (
//     <div className="flex flex-col items-center space-y-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className={`${color}`}
//         fill="none"
//         viewBox="0 0 64 64"
//         width={size}
//         height={size}
//         stroke="currentColor"
//         strokeWidth="3"
//       >
//         {/* Paper */}
//         <rect x="14" y="10" width="36" height="44" rx="2" />
//         <line x1="20" y1="20" x2="36" y2="20" />
//         <line x1="20" y1="28" x2="36" y2="28" />
//         <line x1="20" y1="36" x2="28" y2="36" />

//         {/* Pen (diagonal) */}
//         <path d="M38 34 L48 44 L44 48 L34 38 Z" />
//       </svg>
//       <span className="text-gray-700 text-sm font-medium">Enquire</span>
//     </div>
//   );
// };
// const BlogIcon = ({ size = 64, color = "text-red-500" }) => {
//   return (
//     <div className="flex flex-col items-center space-y-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className={`${color}`}
//         fill="none"
//         viewBox="0 0 64 64"
//         width={size}
//         height={size}
//         stroke="currentColor"
//         strokeWidth="3"
//       >
//         {/* Document outline */}
//         <rect x="16" y="10" width="32" height="44" rx="2" />

//         {/* Folded corner */}
//         <polyline points="40,10 48,18 48,10" />

//         {/* Text lines */}
//         <line x1="22" y1="24" x2="42" y2="24" />
//         <line x1="22" y1="32" x2="42" y2="32" />
//         <line x1="22" y1="40" x2="34" y2="40" />
//       </svg>
//       <span className="text-gray-700 text-sm font-medium">Blog</span>
//     </div>
//   );
// };

// const SupportIcon = ({ size = 64, color = "text-red-500" }) => {
//   return (
//     <div className="flex flex-col items-center space-y-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className={`${color}`}
//         fill="none"
//         viewBox="0 0 64 64"
//         width={size}
//         height={size}
//         stroke="currentColor"
//         strokeWidth="3"
//       >
//         {/* Hand */}
//         <path d="M12 42 Q20 36 28 40 H44 Q48 40 48 44 Q48 48 44 48 H28 Q20 48 16 52 Z" />

//         {/* 24/7 circle arrows */}
//         <circle cx="46" cy="20" r="10" />
//         <polyline points="46,12 50,16 46,20" />
//         <polyline points="46,28 42,24 46,20" />

//         {/* "24" text (simplified as bars for minimal icon style) */}
//         <text x="41" y="23" fontSize="6" fill="currentColor">24</text>
//       </svg>
//       <span className="text-gray-700 text-sm font-medium">Support</span>
//     </div>
//   );
// };


// // function App() {
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [query, setQuery] = useState("");

// //   const filteredItems = filterMenu(menuItems, query);

// //   return (
// //     <>
// //       <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
// //       {mobileOpen ? (
// //         <div className="px-4 py-2  space-y-4">
// //           {/* 🔎 Search */}
// //           <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
// //             <Search size={18} className="text-gray-500" />
// //             <input
// //               type="text"
// //               placeholder="Search menu..."
// //               value={query}
// //               onChange={(e) => setQuery(e.target.value)}
// //               className="w-full outline-none text-sm"
// //             />
// //           </div>

// //           {/* Filtered menu */}
// //           {filteredItems.length > 0 ? (
// //             <div>
// //               <RecursiveMenu className="border-solid-black border-b block mt-2" items={filteredItems} />
// //               {/* <span className="border-solid-black border-b block mt-2"></span> */}
              
// //             </div>
// //           ) : (
// //             <p className="text-gray-500 text-sm ">No matches found</p>
// //           )}
          
// //           <div className="flex justify-around mt-6">
// //           <PodcastIcon />
// //           <EnquireIcon />
// //           <BlogIcon />
// //           <SupportIcon />
// //           </div>

// //         </div>
// //       ) : (
// //         <div>
// //           <Hero />
// //         </div>
// //       )}
// //       <Footer />
// //     </>
// //   );
// // }

// // export default App;

// ...existing code...
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";

/* -------------------------
   Data (example nested menu)
   ------------------------- */
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
          {
            name: "sub1.2",
            subMenu: [
              { name: "sub1.2.1", href: "#" },
              { name: "sub1.2.2", href: "#" },
            ],
          },
          {
            name: "sub1.3",
            subMenu: [
              { name: "sub1.3.1", href: "#" },
              { name: "sub1.3.2", href: "#" },
              { name: "sub1.3.3", href: "#" },
            ],
          },
        ],
      },
      {
        name: "sub2",
        subMenu: [
          {
            name: "sub2.1",
            subMenu: [
              { name: "sub2.1.1", href: "#" },
              { name: "sub2.1.2", href: "#" },
            ],
          },
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
    ],
  },
];

/* -------------------------
   Utilities & hooks
   ------------------------- */
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

/* -------------------------
   Recursive Desktop Menu
   ------------------------- */
function RecursiveMenu({ items, level = 0 }) {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <ul className={`${level === 0 ? "flex items-center gap-5" : "mt-1"}`}>
      {items.map((item, idx) => (
        <li key={idx} className={`relative ${level > 0 ? "py-1" : ""}`}>
          <div className="flex items-center">
            {item.href ? (
              <a href={item.href} className="hover:text-red-500 transition px-2">
                {item.name}
              </a>
            ) : (
              <button
                onClick={() => (item.subMenu ? toggle(idx) : undefined)}
                className={`flex items-center gap-2 px-2 ${openIdx === idx ? "text-red-600" : "text-black"}`}
                aria-expanded={item.subMenu ? openIdx === idx : undefined}
              >
                <span>{item.name}</span>
                {item.subMenu && (
                  <ChevronRight size={14} className={`transition-transform ${openIdx === idx ? "rotate-90" : ""}`} />
                )}
              </button>
            )}
          </div>

          {item.subMenu && openIdx === idx && (
            <div className="absolute left-0 top-full mt-2 min-w-[200px] bg-white border rounded shadow-lg z-30">
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

/* -------------------------
   Mobile recursive list (renders nested items but opens panels on click)
   ------------------------- */
function MobileRecursiveList({ items, onOpen}) {
  return (
    <ul className="divide-y divide-gray-200 ">
       
      {items.map((it, i) => (
        <li key={i} className="py-3 ">
          <div className="flex items-center justify-between">
            <div className="truncate text-xl">{it.name}</div>
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

/* -------------------------
   Mobile Menu (stacked panels with horizontal slide)
   width: 50% of viewport
   ------------------------- */
function MobileMenu({ items, query, setQuery, onClose }) {
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

  return (
    <div className="">
      {/* Header: Back + Title + Search (all on one row) */}
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

        {/* <div className="flex-1 text-center">
          <div className="font-medium truncate">{stack[index]?.title}</div>
        </div> */}

        <div className="w-36">
          <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1">
            <Search size={14} className="text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Panels container */}
      <div className="relative overflow-hidden h-full">
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
      </div>
    </div>
  );
}

/* -------------------------
   Navbar & other UI
   ------------------------- */
function Navbar({ mobileOpen, setMobileOpen }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-red-600">ADDVERB</div>

          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            <RecursiveMenu items={menuItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}

/* -------------------------
   Simple Hero + Footer (kept minimal)
   ------------------------- */
function Hero() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Frontend Developer</h1>
        <p className="text-gray-600 mt-3">I build fast, responsive web apps with React and modern tooling.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-gray-600">© {new Date().getFullYear()} Krishna Upadhyay</div>
    </footer>
  );
}

/* -------------------------
   App (wires desktop + mobile)
   ------------------------- */
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = filterMenu(menuItems, query);
  const isDesktop = useIsDesktop();

  return (
    <>
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile sliding panel: covers 50% of viewport width and slides in from the right */}
      <div
        className={`fixed inset-y-0 right-0 w-1/2 bg-white z-40 md:hidden transform transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <MobileMenu items={filtered} query={query} setQuery={setQuery} onClose={() => setMobileOpen(false)} />
      </div>
      {/* dimmed backdrop when menu open */}
      {/* {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
          aria-hidden="true"
        />
      )} */}

      <main >
        <Hero />
      </main>

      <Footer />
    </>
  );
}

export default App;
// ...existing code...



