import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../apiFunctions';
import useStore from "../store";
import UserCard from '../components/UserCard';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import { Avatar } from '@heroui/react';
import { LoadingPost, ErrorState } from '../components/States';


const MyPostsPage = () => {
    const userName = useStore((state) => state.userName);
    const userId = useStore((state) => state.userId);
    const [selectedPost, setSelectedPost] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["userPosts"],
        queryFn: () => getUserPosts(userId),
        refetchOnMount: "always",
    });

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    if (isLoading) return <LoadingPost />

    if (isError) return <ErrorState />

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen py-6"
        >
            <motion.h2
                initial={{ x: -60 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-2xl md:text-4xl font-extrabold text-[#2D336B] mb-10 tracking-wider"
            >
                {userName[0].toUpperCase() + userName.slice(1)}'s  posts
            </motion.h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data && data.map((post, index) => (
                    <div key={post._id || index} className="flex-col">
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handlePostClick(post)}
                            className="cursor-pointer"
                        >
                            <UserCard post={post} />
                        </motion.div>
                        <Card post={post} /></div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 w-full h-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-xl rounded-lg"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="lg:w-1/2 w-full h-1/2 lg:h-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={selectedPost.Image}
                                    alt="Post content"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col">
                                <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div><Avatar size="sm" src={selectedPost.UserAvatar} /></div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedPost.User}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(selectedPost.Date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button onClick={closeModal} className="text-gray-600 dark:text-gray-300 text-lg" aria-label="Close">&#x2715;</button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <p className="text-gray-900 dark:text-gray-100">
                                        <span className="font-semibold">{selectedPost.User}</span> {selectedPost.Description}
                                    </p>
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            <span className="font-semibold">{selectedPost.Likes.LikeCount}</span> likes
                                        </p>
                                    </div>
                                    <div className="max-h-[200px] overflow-y-auto space-y-3">
                                        {selectedPost.Comments.map((comment, idx) => (
                                            <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                                    <span className="font-semibold">{comment.userName}</span> {comment.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default MyPostsPage;
