import { SearchIcon, PlusIcon, BellIcon } from "lucide-react";
const TopHeader = () => {
    return (
        <div>
            <div className="flex flex-row items-center">
                <header class="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 md:px-10 lg:px-20">
                    <div class="flex items-center gap-8">
                       
                        <div class="hidden md:flex items-center">
                            <label class="relative flex items-center">
                                <SearchIcon className="absolute left-3 text-slate-400 size-4" />
                                <input class="w-64 lg:w-80 rounded-lg border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500 transition-all" placeholder="Search projects or sellers..." type="text" />
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 lg:gap-6">
                        <button class="hidden sm:flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors">
                            <PlusIcon className="size-4" />
                            <span>Post a Requirement</span>
                        </button>
                        <div class="flex items-center gap-2">
                            <button class="relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                                <BellIcon className="size-4" />
                                <span class="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            <div class="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-slate-200">
                                <img class="h-full w-full object-cover" data-alt="User profile photo of Alex Johnson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALw2V8slUgbFR7vy4iV909JrD2vrI-VzKIqrBW3UdYdFQbTsd94CYn2yGqJhsdUfyiTrQmacH6fL9tyxJeQB2wH1U0pDWSBeHZ9XHNoU9eFqqbkVpWdSHX3Ekm_TKpUqCIvicqKsu8aKryrJQA61_uX5qMlzqmZPW7bCZv1IbD4yp_bOPz0ibjXDLAuy-dXmx-EcPw4m4bgLTE2DdI3dz7ZzwHbGfSVGMFYfOPvdQd4T_gqHDY3PGh831-_25UFXNhxMaYdoKOYgk" />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default TopHeader;