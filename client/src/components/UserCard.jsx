import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { deletePost, likePost, addComment } from '../apiFunctions'
import { motion } from 'framer-motion'
import useAuthStore from '../store'

const UserCard = ({ post }) => {
    const username = useAuthStore(state => state.userName)
    const { user } = useUser()
    const [showModal, setShowModal] = useState(false)
    const [newComment, setNewComment] = useState("")
    const queryClient = useQueryClient()

    // Mutation to delete the post
    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["posts"])
            alert(data.message)
            setShowModal(false)
        },
        onError: (error) => {
            const message =
                error.response?.data?.message || "Something went wrong. Please try again."
            alert(message)
            setShowModal(false)
        }
    })

    // Mutation to toggle like for the post
    const likeMutation = useMutation({
        mutationFn: () => likePost(post._id, user.username),
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
        onError: (error) => {
            const message =
                error.response?.data?.message || "Failed to update like."
            alert(message)
        }
    })

    // Mutation to add a comment to the post
    const commentMutation = useMutation({
        mutationFn: () => addComment(post._id, user.username, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
            setNewComment("")
        },
        onError: (error) => {
            const message =
                error.response?.data?.message || "Failed to add comment."
            alert(message)
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate(post._id)
    }

    const handleLike = () => {
        likeMutation.mutate()
    }

    const handleAddComment = (e) => {
        e.preventDefault()
        if (newComment.trim() !== "") {
            commentMutation.mutate()
        }
    }

    const isLiked = post.Likes.LikedUsers.includes(username)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto rounded-t-2xl shadow-2xl overflow-hidden bg-[#ddd3d3] px-6 pt-6 transform hover:scale-105 transition-all font-sans"
        >

            <img
                src={post.Image}
                alt="Post"
                className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <div className="space-y-4">
                <p className="text-base  truncate">
                    {post.Description}
                </p>

                <div className="flex justify-between items-center text-sm">
                    <div className='flex items-center'>
                        <button onClick={handleLike} className="focus:outline-none text-lg flex items-center">
                            {isLiked ? "❤️" : "🤍"}
                            <span className="ml-1">{post.Likes.LikeCount}</span>
                        </button>
                        <div className='flex items-center ml-4'>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="ml-1">{post.Comments.length}</span>
                        </div>
                    </div>
                    <span className="text-gray-300"> {post.EditedOn !== null &&
                        <p className="text-xs uppercase tracking-wide text-black ">
                            {post.EditedOn}(Edited)
                        </p>
                    }</span>
                </div>
            </div>
        </motion.div>
    )
}

export default UserCard
