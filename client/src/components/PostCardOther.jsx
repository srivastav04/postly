import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserButton, useUser } from '@clerk/clerk-react';
import { likePost } from '../apiFunctions';
import { motion } from 'framer-motion';
import { Avatar } from "@heroui/react";


const PostCardOther = ({ post }) => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const currentPost = queryClient.getQueryData(['posts'])?.find(p => p._id === post._id) || post;
    const isLiked = currentPost.Likes.LikedUsers.includes(user.username);


    const likeMutation = useMutation({
        mutationFn: async () => {
            const updatedPost = await likePost(post._id, user.username);
            return updatedPost;
        },

        onSuccess: async (updatedPost) => {
            try {
                queryClient.setQueryData(['posts'], (oldPosts) => {
                    if (!oldPosts) return [];
                    return oldPosts.map(p =>
                        p._id === updatedPost._id ? updatedPost : p
                    );
                });
                await queryClient.invalidateQueries(['posts']);

            } catch (error) {

                throw error;
            }
        },

        onError: (err) => {
            alert(err.response?.data?.message || "Failed to update like.");
        }
    });


    // Display preview comments but do not include comment input here.
    const visibleComments = currentPost.Comments.slice(0, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[#ddd3d3] 
          dark:from-orange-900 dark:via-pink-900 dark:to-yellow-900
          backdrop-blur-md p-4 rounded-2xl shadow-lg transition-all duration-300 
          max-w-2xl mx-auto font-sans"

        >
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-64 w-full">
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                    <div >
                        <Avatar size='sm' src={post.UserAvatar} />
                    </div>
                    <span className="text-sm text-white dark:text-gray-100 bg-black/30 px-3 py-1 rounded-full">
                        {new Date(post.Date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <img
                    src={post.Image}
                    alt="Post content"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex justify-between gap-4 mt-4 px-2">
                <div className='flex '>
                    <div className='flex'>
                        <button
                            onClick={() => {

                                likeMutation.mutate()
                            }}
                            className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                            <motion.svg
                                animate={{ scale: isLiked ? 1.2 : 1 }}
                                className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </motion.svg>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {currentPost.Likes.LikeCount}
                            </span>
                        </button>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 ml-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-sm font-medium">
                                {post.Comments.length}
                            </span>
                        </div>
                    </div>

                </div>
                <div>{
                    post.EditedOn && <p className="pt-0.5 text-sm uppercase tracking-wide text-black font-semibold">
                        {currentPost.EditedOn}(Edited)
                    </p>
                }</div>
            </div>

            <p className="mt-3 px-2 text-gray-800 dark:text-gray-100 text-sm leading-relaxed truncate">
                {currentPost.Description}
            </p>

            <div className="mt-4 space-y-3 px-2">
                {visibleComments.map((comment, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 group"
                    >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {comment.userName}:
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">

                            {comment.comment}
                        </p>
                    </motion.div>
                ))}
                {post.Comments.length >= 1 ? (
                    <p className="text-xs text-blue-500">
                        View all comments...
                    </p>
                ) : (<p className="text-xs text-blue-500">
                    No comments
                </p>)}
            </div>
        </motion.div>
    );
};

export default PostCardOther;
