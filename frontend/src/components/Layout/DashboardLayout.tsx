import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
                {/* Background Blobs for Glass Effect */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full -z-10" />
                <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full -z-10" />

                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
