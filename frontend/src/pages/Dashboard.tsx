import { useState } from 'react';
import { format, subDays } from 'date-fns';
import SectorCountWidget from '../components/Widgets/SectorCountWidget';
import ACChangesWidget from '../components/Widgets/ACChangesWidget';
import BlockHoursWidget from '../components/Widgets/BlockHoursWidget';
import LayoversWidget from '../components/Widgets/LayoversWidget';
import LayoverTrendChart from '../components/Charts/LayoverTrendChart';
import SectorTrendChart from '../components/Charts/SectorTrendChart';
import DateRangeFilter from '../components/Filters/DateRangeFilter';
import { LayoutDashboard, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <LayoutDashboard className="text-sky-500" size={32} />
                        Operations Overview
                    </h1>
                    <p className="text-slate-400 mt-1">Real-time aviation performance metrics</p>
                </div>
                <DateRangeFilter onChange={handleDateChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SectorCountWidget startDate={startDate} endDate={endDate} />
                <ACChangesWidget startDate={startDate} endDate={endDate} />
                <BlockHoursWidget startDate={startDate} endDate={endDate} />
                <LayoversWidget startDate={startDate} endDate={endDate} />
            </div>

            {/* Alert Section */}
            <div className="glass-card border-l-4 border-l-red-500 p-4 bg-red-500/5">
                <div className="flex items-center gap-3 text-red-400">
                    <AlertCircle size={20} />
                    <span className="font-semibold uppercase tracking-wider text-sm">Critical Alerts</span>
                </div>
                <div className="mt-2 text-slate-300 text-sm">
                    No critical operational disruptions detected in the selected period.
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="kpi-label">Layover Analysis</span>
                    </div>
                    <LayoverTrendChart startDate={startDate} endDate={endDate} />
                </div>
                <SectorTrendChart startDate={startDate} endDate={endDate} />
            </div>
        </div>
    );
};

export default Dashboard;
