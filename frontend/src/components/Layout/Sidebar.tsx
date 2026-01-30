import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 w-64 h-full bg-navy-dark border-r border-navy p-4 overflow-y-auto z-10">
            <h1 className="text-xl font-bold text-teal mb-8">Aviation Dashboard</h1>
            <nav className="space-y-2">
                <Link to="/" className="block p-3 hover:bg-navy rounded text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/reports" className="block p-3 hover:bg-navy rounded text-gray-300 hover:text-white transition-colors">Reports</Link>
                <Link to="/upload" className="block p-3 hover:bg-navy rounded text-gray-300 hover:text-white transition-colors">Data Upload</Link>
            </nav>
        </div>
    );
};
export default Sidebar;
