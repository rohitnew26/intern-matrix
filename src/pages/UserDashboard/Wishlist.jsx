import React, { useEffect, useState } from 'react'
import { FiTrash2, FiShoppingCart } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { fetchWishlist, removeFromWishlist } from '../../services/wishlistService'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!user?.id) {
            setLoading(false)
            return
        }

        const loadWishlist = async () => {
            try {
                setLoading(true)
                const data = await fetchWishlist()
                setItems(data)
            } catch (err) {
                console.error('Failed to load wishlist:', err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadWishlist()
    }, [user?.id])

    const handleRemove = async (courseSlug) => {
        try {
            await removeFromWishlist(courseSlug)
            setItems(items.filter(item => item.course_slug !== courseSlug))
        } catch (err) {
            console.error('Failed to remove from wishlist:', err)
        }
    }

    const handleBuyNow = (courseSlug) => {
        navigate(`/course/${courseSlug}`)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="w-full text-center text-zinc-200">
                <h2 className="text-2xl font-semibold">Sign in to view wishlist</h2>
                <p className="text-zinc-500 mt-2">Your saved courses will show up here once you are logged in.</p>
            </div>
        )
    }

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-white">Wishlist</h2>
                <div className="h-1 w-20 bg-yellow-400 rounded-full mt-2"></div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                    Failed to load wishlist. Please try again.
                </div>
            )}

            {items.length === 0 ? (
                <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
                    <p className="text-gray-400 text-lg">Your wishlist is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Add courses to your wishlist to save them for later</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-yellow-400/30 transition-all group">

                            <div className="flex items-center gap-6">
                                {item.course_image ? (
                                    <img 
                                        src={item.course_image} 
                                        alt={item.course_title}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-3xl text-yellow-400 shadow-inner">
                                        📚
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{item.course_title}</h3>
                                    <p className="text-sm text-zinc-500">{item.instructor_name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mt-6 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                                <span className="text-2xl font-bold text-white">
                                    ₹{(item.price_cents / 100).toLocaleString('en-IN')}
                                </span>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => handleRemove(item.course_slug)}
                                        className="h-12 w-12 flex items-center justify-center rounded-full bg-zinc-800 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>

                                    <button 
                                        onClick={() => handleBuyNow(item.course_slug)}
                                        className="h-12 flex items-center gap-2 px-6 rounded-full bg-white text-black font-bold hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all cursor-pointer"
                                    >
                                        <FiShoppingCart size={18} />
                                        <span>Buy Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist