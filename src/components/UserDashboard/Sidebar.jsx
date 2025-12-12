 
 

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FiBookOpen, FiHeart, FiUser, FiLogOut, FiClipboard, FiStar, FiShoppingCart, FiMessageSquare } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ selection, setSelection, sidebarOpen, setSidebarOpen }) => {
        const navigate = useNavigate();
        const { signOut } = useAuth();
        const [isLoggingOut, setIsLoggingOut] = useState(false);

        const handleLogout = async () => {
            // ask user for confirmation first
            const ok = window.confirm('Are you sure you want to logout?');
            if (!ok) return;

            if (isLoggingOut) return;
            setIsLoggingOut(true);
            try {
                await signOut();
                // Close mobile sidebar if open
                try { setSidebarOpen(false); } catch {}

                // Show a toast on the right side after successful logout
                toast.success('You have been logged out.', { position: 'top-right', autoClose: 2500 });

                navigate('/login');
                // Refresh the page to clear all cached data
                setTimeout(() => window.location.reload(), 100);
            } catch (err) {
                console.error('Logout failed', err);
                toast.error('Logout failed. Please try again.', { position: 'top-right', autoClose: 3000 });
            } finally {
                setIsLoggingOut(false);
            }
        };


    const getButtonClass = (key) => {
        const base = "flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all duration-300 cursor-pointer group w-full";

        if (selection === key) {
            return `${base} text-yellow-400 bg-yellow-400/10 border-r-4 border-yellow-400`;
        }

        return `${base} text-zinc-400 hover:text-white hover:bg-white/5 hover:pl-7`;
    };

    return (
        <>
            {/* Mobile slide-in sidebar */}
            <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-black border-r border-zinc-800 z-40 transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
 
                <div className="flex flex-col py-6 mt-6">
                    <p className="px-8 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Menu</p>

                    <button onClick={() => { setSelection('profile'); setSidebarOpen(false); }} className={getButtonClass('profile')}>
                        <FiUser size={20} />
                        <span>My Profile</span>
                    </button>

                    <button onClick={() => { setSelection('courses'); setSidebarOpen(false); }} className={getButtonClass('courses')}>
                        <FiBookOpen size={20} />
                        <span>Enrolled Courses</span>
                    </button>

                    <button onClick={() => { setSelection('wishlist'); setSidebarOpen(false); }} className={getButtonClass('wishlist')}>
                        <FiHeart size={20} />
                        <span>Wishlist</span>
                    </button>

                    <button onClick={() => { setSelection('quiz'); setSidebarOpen(false); }} className={getButtonClass('quiz')}>
                        <FiClipboard size={20} />
                        <span>Quiz Attempts</span>
                    </button>

                    <button onClick={() => { setSelection('review'); setSidebarOpen(false); }} className={getButtonClass('review')}>
                        <FiStar size={20} />
                        <span>Review</span>
                    </button>

                    <button onClick={() => { setSelection('orders'); setSidebarOpen(false); }} className={getButtonClass('orders')}>
                        <FiShoppingCart size={20} />
                        <span>Order History</span>
                    </button>

                    <button onClick={() => { setSelection('qna'); setSidebarOpen(false); }} className={getButtonClass('qna')}>
                        <FiMessageSquare size={20} />
                        <span>Questions & Answers</span>
                    </button>
                </div>

                <div className="mt-auto p-8 border-t border-zinc-800">
                    <button
                         onClick={handleLogout}
                        className="flex items-center gap-3 text-zinc-500 hover:text-red-500 transition-colors font-medium text-sm w-full"
                    >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-72 h-screen bg-black border-r border-zinc-800 flex-col shrink-0 sticky top-0 z-20">
                  
                <div className="flex flex-col py-6 mt-10">
                    <p className="px-8 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Menu</p>

                    <button onClick={() => setSelection('profile')} className={getButtonClass('profile')}>
                        <FiUser size={20} />
                        <span>My Profile</span>
                    </button>

                    <button onClick={() => setSelection('courses')} className={getButtonClass('courses')}>
                        <FiBookOpen size={20} />
                        <span>Enrolled Courses</span>
                    </button>

                    <button onClick={() => setSelection('wishlist')} className={getButtonClass('wishlist')}>
                        <FiHeart size={20} />
                        <span>Wishlist</span>
                    </button>

                    <button onClick={() => setSelection('quiz')} className={getButtonClass('quiz')}>
                        <FiClipboard size={20} />
                        <span>Quiz Attempts</span>
                    </button>

                    <button onClick={() => setSelection('review')} className={getButtonClass('review')}>
                        <FiStar size={20} />
                        <span>Review</span>
                    </button>

                    <button onClick={() => setSelection('orders')} className={getButtonClass('orders')}>
                        <FiShoppingCart size={20} />
                        <span>Order History</span>
                    </button>

                    <button onClick={() => setSelection('qna')} className={getButtonClass('qna')}>
                        <FiMessageSquare size={20} />
                        <span>Questions & Answers</span>
                    </button>
               

                <div className="mt-auto p-8 border-t border-zinc-800">
                    <button
                         onClick={handleLogout}
                        className="flex items-center gap-3 text-zinc-500 hover:text-red-500 transition-colors font-medium text-sm w-full"
                    >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
                 </div>
            </div>
        </>
    )
}

export default Sidebar
