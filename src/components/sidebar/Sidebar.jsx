

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col hidden md:flex"
            data-purpose="sidebar-navigation">
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">B</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800">BidMarket</span>
                </div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <a className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl font-medium"
                    data-purpose="nav-link-active" href="#">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    Dashboard
                </a>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-xl"
                    data-purpose="nav-link" href="#">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    My Posts
                </a>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-xl"
                    data-purpose="nav-link" href="#">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    Messages
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                </a>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-xl"
                    data-purpose="nav-link" href="#">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    Bids
                </a>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-xl"
                    data-purpose="nav-link" href="#">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    Reviews
                </a>
            </nav>
            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl" data-purpose="user-footer-card">
                    <img alt="User" className="w-10 h-10 rounded-full border border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE2t6-f_lulDXFiMNUCaJELRZgrsQBzDRKxDBN7TDEhpZPird4fxjoJ5jZFmu9cLteikIDlj-iKIKgsMlpKRwiJV0l4bNn2f4ISIG5gQBXuNj83T37zu99TSK_ySwUQraeGsq6XXRlU9FiUcunu-oisTiXPIwlQ2OSQdqSpgjTlPWhlrlI_zYUVidgnuFsaq_5l4GhR23cBccC7uawZzSbDxnIVKAl4knlW4fzC1Ok3RjVPTRkscV0xENlmdsYPi7DXExb6pzUJVQ" />
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate">Alex Thompson</p>
                        <p className="text-xs text-slate-500 truncate">Buyer Account</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;