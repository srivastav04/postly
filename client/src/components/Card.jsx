import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from "../apiFunctions"

const Card = ({ post }) => {
    const [showModal, setShowModal] = useState(false)
    const queryClient = useQueryClient()

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
            setShowModal(false)
        },
        onError: (error) => {
            const message =
                error.response?.data?.message || "Something went wrong. Please try again."
            alert(message)
            setShowModal(false)
        }
    })

    const handleDelete = () => {
        mutate(post._id)
    }

    return (
        <>
            <div className="flex gap-4 justify-between bg-[#ddd3d3] pt-2 pb-6 px-6 rounded-b-2xl shadow-2xl">
                <Link
                    to={`/edit/${post._id}`}
                    state={{ Description: post.Description }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition text-center font-bold"
                >
                    Edit
                </Link>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition font-bold"
                >
                    Delete
                </button>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-xl w-11/12 max-w-md">
                            <p className="mb-4 text-gray-800 dark:text-gray-300 font-bold">
                                Are you sure you want to delete this post?
                            </p>
                            <div className="mb-4">
                                <img
                                    src={post.Image}
                                    alt="Post preview"
                                    className="w-full h-40 object-cover rounded"
                                />
                                <p className="mt-2 text-gray-700 dark:text-gray-300">{post.Description}</p>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md font-bold hover:bg-gray-400 transition"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 rounded-md font-bold hover:bg-red-600 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                            {isError && (
                                <p className="text-red-500 mt-2 text-sm">
                                    Something went wrong while deleting.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Card


