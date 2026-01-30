import { useState } from 'react';
import { format, subDays } from 'date-fns';
import SectorCountWidget from '../components/Widgets/SectorCountWidget';
import LayoverTrendChart from '../components/Charts/LayoverTrendChart';
import DateRangeFilter from '../components/Filters/DateRangeFilter';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Operations Overview</h1>
                <DateRangeFilter onChange={handleDateChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SectorCountWidget startDate={startDate} endDate={endDate} />
                {/* Placeholder for other widgets */}
                <div className="bg-navy rounded-lg p-6 flex items-center justify-center text-gray-400">
                    AC Changes Widget (TODO)
                </div>
                <div className="bg-navy rounded-lg p-6 flex items-center justify-center text-gray-400">
                    Block Hours Widget (TODO)
                </div>
                <div className="bg-navy rounded-lg p-6 flex items-center justify-center text-gray-400">
                    Layovers Widget (TODO)
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LayoverTrendChart startDate={startDate} endDate={endDate} />
                <div className="bg-navy rounded-lg p-6 h-80 flex items-center justify-center text-gray-400">
                    Sector Trend Chart (TODO)
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
