import React, { useState } from 'react';

import useAuthStore from "../store";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPosts, addComment } from "../apiFunctions";
import PostCardOther from "../components/PostCardOther";
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorState, LoadingPost, NoPostsFound } from '../components/States';
import { Avatar } from '@heroui/react';

const HomePage = () => {
    const setSearchUser = useAuthStore(state => state.setSearchUser);
    const searchUser = useAuthStore(state => state.searchUser);
    const userName = useAuthStore(state => state.userName);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts", searchUser],
        queryFn: () => getPosts(searchUser),
        refetchOnMount: "always",

    });

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    const commentMutation = useMutation({
        // mutationFn waits for the API call to add comment and returns updated post data
        mutationFn: async ({ postId, comment, userName }) => {
            const updatedPost = await addComment(postId, userName, comment);
            return updatedPost;
        },
        onSuccess: (updatedPost) => {
            try {

                if (selectedPost && selectedPost._id === updatedPost._id) {
                    setSelectedPost(updatedPost);
                }
                queryClient.invalidateQueries(["posts"]);
                setNewComment("");
            } catch (error) {
                console.error("❌ Error in onSuccess:", error);
                throw error; // will trigger onError
            }
        },

        onError: (err) => {
            alert(err.response?.data?.message);
        },
    });

    // Handler for comment form submission
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !selectedPost) return;

        // Pass an object with postId, comment and userName to mutate()
        commentMutation.mutate({
            postId: selectedPost._id,
            comment: newComment,
            userName,
        });
    }
    if (isLoading) return <LoadingPost />;
    if (isError) return <ErrorState />;
    if (data?.length === 0 && !isLoading) return <NoPostsFound />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen"
        >
            {/* Hero Section */}
            <section className="w-full bg-[#eee9e9] p-6 rounded-2xl shadow-lg my-8 relative z-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto text-center"
                >
                    <h2 className="text-5xl font-extrabold text-[#2D336B] drop-shadow-lg mb-4">
                        Share Your Stories
                    </h2>
                    <p className="text-lg text-gray-700 ">
                        Explore posts, share your moments, and connect with creative minds.
                    </p>
                </motion.div>
            </section>

            {/* Posts Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
                {data &&
                    data.map((post) => (
                        <motion.div
                            key={post._id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handlePostClick(post)}
                            className="cursor-pointer"
                        >
                            <PostCardOther post={post} />
                        </motion.div>
                    ))}

            </div>
            {searchUser !== "" && <div className='w-full flex items-center justify-center pb-4'>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setSearchUser("");
                        queryClient.invalidateQueries(["posts"]);
                    }}
                    className="h-[50px]  px-6 py-3 bg-gradient-to-r from-[#2D336B] to-[#13173e] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
                >
                    Show All Posts
                </motion.button>

            </div>}

            {/* Modal for Selected Post */}
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
                            {/* Left Side: Post Image */}
                            <div className="lg:w-1/2 w-full h-1/2 lg:h-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={selectedPost.Image}
                                    alt="Post content"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Right Side: Post Details */}
                            <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col">
                                {/* Post Header */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <Avatar size="sm" src={selectedPost.UserAvatar} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                {selectedPost.User}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(selectedPost.Date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-600 dark:text-gray-300 text-lg"
                                        aria-label="Close"
                                    >
                                        &#x2715;
                                    </button>
                                </div>

                                {/* Post Content: Description, Likes & Comments */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Description */}
                                    <p className="text-gray-900 dark:text-gray-100 break-words whitespace-pre-wrap">
                                        {selectedPost.Description}
                                    </p>

                                    {/* Likes */}
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                            <span className="font-semibold">
                                                {selectedPost.Likes.LikeCount}
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4 text-red-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M3.172 5.172a4.001 4.001 0 015.656 0L10 6.343l1.172-1.171a4.001 4.001 0 115.656 5.656L10 18.657l-6.828-6.829a4.001 4.001 0 010-5.656z" />
                                            </svg>
                                        </p>
                                    </div>

                                    {/* Comments Section */}
                                    <div className="max-h-[200px] overflow-y-auto space-y-3">
                                        {selectedPost.Comments.map((comment, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-sm"
                                            >
                                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                                    <span className="font-semibold">
                                                        {comment.userName}
                                                    </span>{" "}
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Comment Input */}
                                <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                                    <form
                                        onSubmit={handleCommentSubmit}
                                        className="flex items-center space-x-3"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#2D336B] text-white rounded-full font-semibold hover:bg-blue-600 transition"
                                        >
                                            Post
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default HomePage;
