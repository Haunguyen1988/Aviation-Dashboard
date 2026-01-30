import { Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800/50 flex items-center px-8 justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span>Production</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-200">Main Dashboard</span>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-slate-400 hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-sky-500 rounded-full border-2 border-slate-900" />
                </button>

                <div className="h-8 w-[1px] bg-slate-800" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-semibold text-white">Ops Manager</div>
                        <div className="text-xs text-slate-400 uppercase tracking-tighter">AOC Admin</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 p-[2px]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white ring-2 ring-slate-900">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
