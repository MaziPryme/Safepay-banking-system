import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function NavDropdown({ label, links = [] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className="flex items-center gap-1 text-sm font-medium text-mist-700
                hover:text-primary transition-colors duration-200"
            >
                {label}
                <ChevronDown />
            </button>
            {isOpen && (
                <div className="absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-card">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className="rounded-lg px-3 py-2 text-sm text-mist-700
                                hover:bg-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";

// export default function NavDropdown({ label, links = [] }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const hasDescriptions = links.some((link) => link.description);

//     return (
//         <div
//             className="relative"
//             onMouseEnter={() => setIsOpen(true)}
//             onMouseLeave={() => setIsOpen(false)}
//         >
//             <button
//                 className="flex items-center gap-1 text-sm font-medium text-mist-700
//                 hover:text-primary transition-colors duration-200"
//             >
//                 {label}
//                 <ChevronDown />
//             </button>
//             {isOpen && (
//                 <div
//                     className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 ${
//                         hasDescriptions ? "w-96" : "w-72"
//                     }`}
//                 >
//                     <div
//                         className={`grid gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-card ${
//                             hasDescriptions ? "grid-cols-1" : "grid-cols-2"
//                         }`}
//                     >
//                         {links.map((link) => (
//                             <Link
//                                 key={link.label}
//                                 to={link.to}
//                                 className="rounded-lg px-3 py-2 text-sm text-mist-700
//                                 hover:bg-primary transition-colors"
//                             >
//                                 <p className="font-medium">{link.label}</p>
//                                 {link.description && (
//                                     <p className="text-xs text-mist-700/60 mt-0.5 font-normal leading-relaxed">
//                                         {link.description}
//                                     </p>
//                                 )}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
