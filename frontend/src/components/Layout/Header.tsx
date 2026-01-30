const Header = () => {
    return (
        <header className="h-16 bg-navy-dark border-b border-navy flex items-center px-6 justify-between sticky top-0 z-0">
            <h2 className="text-lg font-semibold text-white">Dashboard Overview</h2>
            <div className="flex items-center gap-4">
                <div className="text-gray-400 text-sm">Welcome, User</div>
                <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-navy-dark font-bold">U</div>
            </div>
        </header>
    );
};
export default Header;
