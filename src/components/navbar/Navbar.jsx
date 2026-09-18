// import NavDropdown from "./NavDropdown"
// import { mainNavLinks, productLinks, resourcesLinks } from "./navLinksData"
// import Button from "../buttons/Button"
// import { useState, useEffect } from "react"
// import { Link, NavLink } from "react-router-dom"
// import clsx from "clsx"
// import { Menu, Landmark, X, ArrowRight} from "lucide-react"


// export default function Navbar() {
//     const [isScrolled, setIsScrolled] = useState(false)

//     useEffect(() => {
//         const handleScroll = () => setIsScrolled(window.scrollY > 8)
//         window.addEventListener("scroll", handleScroll)
//         return() => window.removeEventListener("scroll",handleScroll)
//     }, [])


//     return (
//     <header
//         className={clsx(
//             "sticky top-0 z-40 w-full transition-shadow duration-200",
//             isScrolled ? "bg-white/95 backdrop-blur shadow-soft" : "bg-white/80 backdrop-blur"
//         )}
//     >
//         <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//             <Link to="/" className="flex items-center gap-2 text-mist-700 font-semibold text-lg">
//                 <span className="flex h-9 w-9 items-center justify-center bg-emerald-700 text-white rounded-2xl">
//                     <Landmark size={18} />
                    
//                 </span>
//                 Safepay
//             </Link>

//             <div className="hidden lg:flex items-center gap-6">
//                 <NavLink
//                     to="/"
//                     className={({ isActive }) =>
//                         clsx(
//                             "text-sm font-medium transition-colors",
//                             isActive ? "text-emerald-700" : "text-mist-700 hover:text-emerald-700"
//                         )
//                     }
//                 >
//                     Home
//                 </NavLink>
//                 <NavDropdown label="Products" links={productLinks} />
//                 <NavDropdown label="Resources" links={resourcesLinks} />
//                 {mainNavLinks.slice(1).map((link) => (
//                     <NavLink
//                         key={link.path}
//                         to={link.path}
//                         className={({ isActive }) =>
//                             clsx(
//                                 "text-sm font-medium transition-colors",
//                                 isActive ? "text-emerald-700" : "text-mist-700 hover:text-emerald-700"
//                             )
//                         }
//                     >
//                         {link.label}
//                     </NavLink>
//                 ))}
//             </div>

//             <div className="hidden items-center gap-3 lg:flex">
//                 <Link to="/login" className="text-sm font-medium text-mist-700 hover:text-emerald-700">
//                     Login
//                 </Link>
//                 <Link to="/signup">
//                     <Button variant="primary" className="cursor-pointer">Open an Account <ArrowRight size={18} /></Button>
//                 </Link>
                
//             </div>
//         </nav>
//     </header>
// )};


import { mainNavLinks, productLinks, resourcesLinks } from "./navLinksData";
import NavDropdown from "./NavDropdown";
import Button from "../buttons/Button";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { Menu, Landmark, X, ArrowRight, ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState(null); // "products" | "resources" | null

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // lock body scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    function closeMenu() {
        setIsMenuOpen(false);
        setOpenMobileDropdown(null);
    }

    function toggleMobileDropdown(key) {
        setOpenMobileDropdown((prev) => (prev === key ? null : key));
    }

    const navLinkClass = ({ isActive }) =>
        clsx(
            "text-sm font-medium transition-colors",
            isActive ? "text-emerald-700" : "text-mist-700 hover:text-emerald-700"
        );

    return (
        <header
            className={clsx(
                "sticky top-0 z-40 w-full transition-shadow duration-200",
                isScrolled ? "bg-white/95 backdrop-blur shadow-soft" : "bg-white/80 backdrop-blur"
            )}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center gap-2 text-mist-700 font-semibold text-lg" onClick={closeMenu}>
                    <span className="flex h-9 w-9 items-center justify-center bg-emerald-700 text-white rounded-2xl">
                        <Landmark size={18} />
                    </span>
                    Safepay
                </Link>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center gap-6">
                    <NavLink to="/" end className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavDropdown label="Products" links={productLinks} />
                    <NavDropdown label="Resources" links={resourcesLinks} />
                    {mainNavLinks.slice(1).map((link) => (
                        <NavLink key={link.path} to={link.path} className={navLinkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link to="/login" className="text-sm font-medium text-mist-700 hover:text-emerald-700">
                        Login
                    </Link>
                    <Link to="/signup">
                        <Button variant="primary" className="cursor-pointer">
                            Open an Account <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>

                {/* Mobile hamburger toggle */}
                <button
                    className="lg:hidden flex items-center justify-center rounded-lg p-2 text-mist-700 hover:bg-slate-100 transition-colors"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile menu panel */}
            <div
                className={clsx(
                    "lg:hidden overflow-hidden border-t border-slate-100 transition-all duration-300 ease-in-out",
                    isMenuOpen ? "max-h-[calc(100vh-64px)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 border-t-0"
                )}
            >
                <div className="flex flex-col gap-1 px-6 py-4">
                    <NavLink
                        to="/"
                        end
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            clsx(
                                "py-3 text-base font-medium border-b border-slate-100",
                                isActive ? "text-emerald-700" : "text-mist-700"
                            )
                        }
                    >
                        Home
                    </NavLink>

                    {/* Products accordion (mobile equivalent of the hover-based NavDropdown) */}
                    <div className="border-b border-slate-100">
                        <button
                            onClick={() => toggleMobileDropdown("products")}
                            className="flex w-full items-center justify-between py-3 text-base font-medium text-mist-700"
                        >
                            Products
                            <ChevronDown
                                size={18}
                                className={clsx("transition-transform duration-200", openMobileDropdown === "products" && "rotate-180")}
                            />
                        </button>
                        <div
                            className={clsx(
                                "overflow-hidden transition-all duration-300",
                                openMobileDropdown === "products" ? "max-h-96 pb-3" : "max-h-0"
                            )}
                        >
                            {productLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={closeMenu}
                                    className="block py-2 pl-4 text-sm text-mist-700/70 hover:text-emerald-700"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resources accordion */}
                    <div className="border-b border-slate-100">
                        <button
                            onClick={() => toggleMobileDropdown("resources")}
                            className="flex w-full items-center justify-between py-3 text-base font-medium text-mist-700"
                        >
                            Resources
                            <ChevronDown
                                size={18}
                                className={clsx("transition-transform duration-200", openMobileDropdown === "resources" && "rotate-180")}
                            />
                        </button>
                        <div
                            className={clsx(
                                "overflow-hidden transition-all duration-300",
                                openMobileDropdown === "resources" ? "max-h-96 pb-3" : "max-h-0"
                            )}
                        >
                            {resourcesLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={closeMenu}
                                    className="block py-2 pl-4 text-sm text-mist-700/70 hover:text-emerald-700"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {mainNavLinks.slice(1).map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                clsx(
                                    "py-3 text-base font-medium border-b border-slate-100",
                                    isActive ? "text-emerald-700" : "text-mist-700"
                                )
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <div className="flex flex-col gap-3 pt-5">
                        <Link to="/login" onClick={closeMenu} className="text-center text-sm font-medium text-mist-700 py-2">
                            Login
                        </Link>
                        <Link to="/signup" onClick={closeMenu}>
                            <Button variant="primary" className="w-full justify-center">
                                Open an Account <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}