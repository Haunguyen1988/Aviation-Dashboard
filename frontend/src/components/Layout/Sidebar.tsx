import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Upload, Settings, Plane } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Reports', path: '/reports', icon: FileText },
        { name: 'Data Upload', path: '/upload', icon: Upload },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="fixed top-0 left-0 w-64 h-full bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto z-10">
            <div className="flex items-center gap-3 mb-10 px-2">
                <Plane className="text-sky-500 rotate-45" size={28} />
                <h1 className="text-xl font-bold text-white tracking-tight">SkyDash</h1>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${location.pathname === item.path
                                ? 'bg-sky-500/10 text-sky-400'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                            }`}
                    >
                        <item.icon size={20} className={location.pathname === item.path ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'} />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};
export default Sidebar;
