import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";



export const Loading = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center"
        >
            <div className="bg-white/10 backdrop-blur-md border border-indigo-400/30 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto animate-pulse">
                <h1 className="text-2xl font-semibold text-[#2D336B]">⏳ Uploading...</h1>
                <p className="text-sm mt-2 text-[#2D336B]">Please wait while we upload your post.</p>
            </div>
        </motion.div>
    );
}

export const LoadingPost = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center"
        >
            <div className="bg-white/10 backdrop-blur-md border border-indigo-400/30 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto animate-pulse">
                <h1 className="text-2xl font-semibold text-[#2D336B]">⏳ Loading...</h1>
            </div>
        </motion.div>
    );
}

export const ErrorState = () => {
    const naviagte = useNavigate();
    return (

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center"
        >
            <div className="bg-white/10 backdrop-blur-lg border border-red-300/40 p-10 rounded-3xl shadow-2xl text-center max-w-md mx-auto space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D336B] tracking-wider drop-shadow-sm">
                    Error fetching posts
                </h1>
                <button
                    className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full text-sm text-white font-semibold transition-all shadow-lg hover:scale-105"
                    onClick={() => naviagte("/home")}
                >
                    Go to Home
                </button>
            </div>

        </motion.div>


    )
}

export const SuccessState = () => {
    const naviagte = useNavigate();
    return (


        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center"
        >
            <div className="bg-white/10 backdrop-blur-lg border border-red-300/40 p-10 rounded-3xl shadow-2xl text-center max-w-md mx-auto space-y-6">
                <h1 className=" text-2xl sm:text-3xl font-extrabold text-[#2D336B] tracking-wider drop-shadow-sm">
                    ✅ Post Created
                </h1>
                <p className="text-sm font-semibold mt-2 text-[#2D336B]">Your post has been uploaded successfully.</p>

                <button
                    className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-full text-sm text-white font-semibold transition-all shadow-lg hover:scale-105"
                    onClick={() => naviagte("/home")}
                >
                    Go to Home
                </button>
            </div>

        </motion.div>

    )
}



export const NoPostsFound = () => {
    const queryClient = useQueryClient();
    const setSearchUser = useAuthStore((state) => state.setSearchUser);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-[300px] flex items-center justify-center px-4 py-4"
        >
            <div className="bg-white/10 backdrop-blur-xl border border-[#2D336B]/40 text-[#2D336B] rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center space-y-6">
                <div>
                    <h1 className="text-3xl font-extrabold">🧐 No Posts Found</h1>
                    <p className="text-md mt-2 text-[#2D336B]/80">
                        We couldn’t find any posts matching your search.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setSearchUser("");
                        queryClient.invalidateQueries(["posts"]);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#2D336B] to-[#13173e] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
                >
                    Show All Posts
                </motion.button>
            </div>
        </motion.div>
    );
};

