import React from 'react'
import { FiTrash2, FiShoppingCart } from 'react-icons/fi'

const Wishlist = () => {
    const items = [
        { id: 1, title: 'Advanced Node.js Backend', price: 3999, author: 'Code Master' },
        { id: 2, title: 'UI/UX Design Principles', price: 2499, author: 'Sarah Smith' },
    ];

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-white">Wishlist</h2>
                <div className="h-1 w-20 bg-yellow-400 rounded-full mt-2"></div>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-yellow-400/30 transition-all group">

                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-3xl text-yellow-400 shadow-inner">
                                📚
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                                <p className="text-sm text-zinc-500">{item.author}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-6 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                            {/* Changed to Indian Rupee with formatting */}
                            <span className="text-2xl font-bold text-white">
                                ₹{item.price.toLocaleString('en-IN')}
                            </span>

                            <div className="flex gap-4">
                                {/* Trash Button */}
                                <button className="h-12 w-12 flex items-center justify-center rounded-full bg-zinc-800 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                    <FiTrash2 size={20} />
                                </button>

                                {/* Buy Button */}
                                <button className="h-12 flex items-center gap-2 px-6 rounded-full bg-white text-black font-bold hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all cursor-pointer">
                                    <FiShoppingCart size={18} />
                                    <span>Buy Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist