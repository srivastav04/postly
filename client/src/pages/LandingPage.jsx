import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
    return (
        <div className="min-h-screen  relative overflow-hidden">
            {/* Background Animated Shapes */}
            {/* Top-left shape */}
            <motion.div
                initial={{ opacity: 0, x: -100, y: -100, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute top-0 left-0"
            >
                <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" stroke="#2D336B" strokeWidth="2" fill="none" />
                </svg>
            </motion.div>
            {/* Top-right shape */}
            <motion.div
                initial={{ opacity: 0, x: 100, y: -100, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute top-0 right-0"
            >
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                    <rect x="10" y="10" width="80" height="80" stroke="#13173e" strokeWidth="2" fill="none" />
                </svg>
            </motion.div>
            {/* Bottom-left shape */}
            <motion.div
                initial={{ opacity: 0, x: -100, y: 100, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute bottom-0 left-0"
            >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <polygon points="50,10 90,90 10,90" stroke="#2D336B" strokeWidth="2" fill="none" />
                </svg>
            </motion.div>
            {/* Bottom-right shape */}
            <motion.div
                initial={{ opacity: 0, x: 100, y: 100, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute bottom-0 right-0"
            >
                <svg width="130" height="130" viewBox="0 0 100 100" fill="none">
                    <line x1="10" y1="10" x2="90" y2="90" stroke="#13173e" strokeWidth="2" />
                    <line x1="90" y1="10" x2="10" y2="90" stroke="#13173e" strokeWidth="2" />
                </svg>
            </motion.div>

            {/* Floating Center Element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ delay: 1, duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <svg width="300" height="300" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" stroke="#2D336B" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                </svg>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen  text-center">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2D336B] to-[#13173e] drop-shadow-2xl"
                >
                    Welcome to Postly
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-[#2D336B] font-semibold tracking-wide"
                >
                    Share your moments in a digital realm of endless possibilities. Connect, create, and inspire.
                </motion.p>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mt-10"
                >
                    <Link to="/home">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#2D336B] to-[#13173e] text-white font-bold rounded-full shadow-2xl transition transform"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
