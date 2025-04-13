import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#ddd3d3]  dark:bg-gray-900 py-8 rounded-2xl">
            <div className="container mx-auto px-6 flex flex-col items-center">
                {/* Personal Info */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#2D336B]">Srivastav Kancharala</h2>
                    <p className="mt-1 text-md text-gray-600 dark:text-gray-300">Web Developer</p>
                </div>

                {/* Social Links */}
                <div className="mt-4 flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0">
                    <a
                        href="https://www.linkedin.com/in/sri-vastav"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-[#2D336B] transition"
                    >
                        <svg className="mr-2 w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.7v2.3h.1c.7-1.3 2.4-2.6 4.9-2.6 5.2 0 6.1 3.4 6.1 7.8V24h-5V14.6c0-2.2 0-5-3.1-5s-3.6 2.4-3.6 4.8V24h-5V8z" />
                        </svg>
                        LinkedIn Sri Vastav
                    </a>

                    <a
                        href="https://github.com/srivastav_04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-[#2D336B] transition"
                    >
                        <svg className="mr-2 w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.84 10.91.57.11.78-.25.78-.55 0-.27-.01-1.17-.02-2.13-3.19.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.17 1.18a11.07 11.07 0 012.89-.39c.98 0 1.96.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.57.23 2.73.11 3.02.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.09.8 2.2 0 1.58-.02 2.86-.02 3.25 0 .3.2.66.8.55A10.51 10.51 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                        </svg>
                        GitHub srivastav_04
                    </a>

                    <a
                        href="mailto:srivastavkancharala@gmail.com"
                        className="flex items-center text-gray-600 hover:text-[#2D336B] transition"
                    >
                        <svg className="mr-2 w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M2.01 4.5A2.5 2.5 0 014.5 2h15a2.5 2.5 0 012.5 2.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15zM4.5 4a.5.5 0 00-.5.5v.638l8 5.263 8-5.263V4.5a.5.5 0 00-.5-.5h-15zm15 2.966l-6.827 4.496a1.5 1.5 0 01-1.346 0L4.5 6.966V19.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V6.966z" />
                        </svg>
                        srivastavkancharala@gmail.com
                    </a>
                </div>

                {/* Copyright */}
                <p className="mt-6 text-sm text-gray-500">
                    © {new Date().getFullYear()} Srivastav Kancharala. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
