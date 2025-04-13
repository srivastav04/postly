import React from "react";
import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FBFBFB] to-[#dcc5c5] relative overflow-hidden">
            {/* Background Animated Elements */}
            {/* Top-Left Floating Circle */}
            <motion.div
                initial={{ opacity: 0, x: -80, y: -80, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" stroke="#2D336B" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                </svg>
            </motion.div>

            {/* Top-Right Floating Square */}
            <motion.div
                initial={{ opacity: 0, x: 80, y: -80, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect x="10" y="10" width="80" height="80" stroke="#13173e" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                </svg>
            </motion.div>

            {/* Bottom-Left Floating Polygon */}
            <motion.div
                initial={{ opacity: 0, x: -80, y: 80, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,10 90,90 10,90" stroke="#2D336B" strokeWidth="2" fill="none" />
                </svg>
            </motion.div>

            {/* Bottom-Right Floating X-Shape */}
            <motion.div
                initial={{ opacity: 0, x: 80, y: 80, scale: 0.5 }}
                animate={{ opacity: 0.2, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 4.5, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <line x1="10" y1="10" x2="90" y2="90" stroke="#13173e" strokeWidth="2" />
                    <line x1="90" y1="10" x2="10" y2="90" stroke="#13173e" strokeWidth="2" />
                </svg>
            </motion.div>

            {/* Subtle Floating Center Accent */}
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="#2D336B" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                </svg>
            </motion.div>

            {/* Mind Blowing Center Vortex */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 0 }}
            >
                <motion.svg
                    viewBox="0 0 100 100"
                    className="w-[600px] h-[600px]"
                    initial={{ rotate: 0, scale: 0.9, opacity: 0.3 }}
                    animate={{ rotate: 360, scale: 1.1, opacity: 0.6 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <defs>
                        <radialGradient id="vortexGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#2D336B" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#13173e" stopOpacity="0" />
                        </radialGradient>
                        {/* Additional gradient for fractal beams */}
                        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#13173e" stopOpacity="0" />
                            <stop offset="50%" stopColor="#2D336B" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#13173e" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Main vortex circle */}
                    <circle cx="50" cy="50" r="45" fill="url(#vortexGrad)" />

                    {/* Fractal beam paths layered on top */}
                    <motion.path
                        d="M50 50 L70 40 L65 50 L70 60 Z"
                        fill="url(#beamGrad)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M50 50 L30 40 L35 50 L30 60 Z"
                        fill="url(#beamGrad)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M50 50 L60 70 L50 65 L40 70 Z"
                        fill="url(#beamGrad)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M50 50 L60 30 L50 35 L40 30 Z"
                        fill="url(#beamGrad)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                </motion.svg>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen  text-center">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 60 }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent p-4 bg-clip-text bg-gradient-to-r from-[#2D336B] to-[#13173e] drop-shadow-2xl"
                >
                    Sign In to Postly
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl text-[#2D336B] font-medium tracking-wide"
                >
                    Enter a digital realm of endless creativity. Your future awaits.
                </motion.p>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mt-10"
                >
                    <SignInButton forceRedirectUrl={"/"}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#2D336B] to-[#13173e] text-white font-bold rounded-full shadow-2xl transition transform"
                        >
                            Sign In
                        </motion.button>
                    </SignInButton>
                </motion.div>
            </div>
        </div>
    );
};

export default SignInPage;
