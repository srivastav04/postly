import { useState } from "react";
import { Link } from "react-router-dom";
import { UserButton, SignOutButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store";



const NavBar = () => {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const setSearchUser = useAuthStore((state) => state.setSearchUser);
    const isAdmin = useAuthStore((state) => state.isAdmin);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleSearch = () => {
        setSearchUser(searchText);
        queryClient.invalidateQueries(["posts"]);
        setSearchText("");
        if (isSidebarOpen) toggleSidebar();
    }

    return (
        <>
            {/* NavBar */}
            <nav className="flex items-center justify-between px-6 py-4 bg-[#eee9e9]  shadow-md rounded-2xl top-0 z-[10000]">
                <Link to="/" className="text-2xl font-bold text-[#2D336B]">
                    Postly
                </Link>
                {/* Inline Search Bar for md and up */}
                <div className="hidden md:flex flex-1 px-4">
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search Users..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full pl-4 pr-12 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2D336B] transition duration-300 shadow-sm"
                        />

                        <button
                            type="button"
                            className="absolute right-0 top-0 bottom-0 flex items-center px-4 
               bg-[#2D336B] bg-opacity-100 hover:bg-[#13173e] text-white 
               rounded-r-full transition duration-300 
               focus:outline-none focus:ring-0 active:ring-0"
                            onClick={handleSearch}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.35z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="hidden sm:flex gap-6">
                    <Link to="/home" className="text-[#2D336B] font-semibold hover:font-bold">
                        Home
                    </Link>
                    <Link to="/create" className="text-[#2D336B] font-semibold hover:font-bold">
                        Create
                    </Link>
                    <Link to="/myPosts" className="text-[#2D336B] font-semibold hover:font-bold">
                        My Posts
                    </Link>
                    {isAdmin ? <Link to="/admin" className="text-[#2D336B] font-semibold hover:font-bold">Admin</Link> : ""}
                    <UserButton />
                </div>
                {/* Hamburger Icon */}
                <div className="sm:hidden">
                    <button onClick={toggleSidebar} className="focus:outline-none">
                        <svg
                            className="w-6 h-6 text-[#2D336B]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Sidebar for Small Screens */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/40 z-[9999]"
                            onClick={toggleSidebar}
                        />

                        {/* Sidebar Panel */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 left-0 h-full w-72 bg-white z-[10000] shadow-lg px-6 py-8 sm:hidden"
                        >
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search posts..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="w-full pl-4 pr-12 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2D336B] transition duration-300 shadow-sm"
                                    />
                                    <button className="absolute right-0 top-0 bottom-0 flex items-center px-4 bg-[#2D336B] hover:bg-[#13173e] text-white rounded-r-full transition duration-300"
                                        onClick={handleSearch}>
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1012 19.5a7.5 7.5 0 004.65-1.35z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <nav className="flex flex-col gap-4">
                                <Link
                                    to="/home"
                                    onClick={toggleSidebar}
                                    className="text-[#2D336B] hover:font-bold font-semibold"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/create"
                                    onClick={toggleSidebar}
                                    className="text-[#2D336B] hover:font-bold font-semibold"
                                >
                                    Create
                                </Link>

                                <Link
                                    to="/myPosts"
                                    onClick={toggleSidebar}
                                    className="text-[#2D336B] hover:font-bold font-semibold"
                                >
                                    My Posts
                                </Link>
                                {isAdmin ? <Link to="/admin" className="text-[#2D336B] font-semibold hover:font-bold">Admin</Link> : ""}

                                <div onClick={toggleSidebar}>
                                    <SignOutButton className="text-[#2D336B] hover:font-bold font-semibold"
                                    />
                                </div>
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavBar;
