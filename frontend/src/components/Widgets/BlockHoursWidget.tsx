import { useQuery } from 'react-query';
import { Clock, TrendingUp } from 'lucide-react';
import { kpiApi } from '../../services/api';

interface WidgetProps {
    startDate: string;
    endDate: string;
}

const BlockHoursWidget = ({ startDate, endDate }: WidgetProps) => {
    const { data, isLoading } = useQuery(
        ['block-hours', startDate, endDate],
        () => kpiApi.getBlockHours(startDate, endDate),
        { staleTime: 2 * 60 * 1000 }
    );

    if (isLoading) return <div className="animate-pulse h-[140px] bg-slate-800/50 rounded-xl" />;

    const hours = data?.data?.data?.block_hours || 0;
    const trend = +5; // Mocked trend

    return (
        <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <span className="kpi-label">Block Hours</span>
                <Clock className="text-teal-500" size={20} />
            </div>
            <div className="mt-4">
                <div className="kpi-value text-teal-400">{hours.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="text-teal-400" size={14} />
                    <span className="text-teal-400 font-medium">{trend}%</span>
                    <span>vs last period</span>
                </div>
            </div>
        </div>
    );
};

export default BlockHoursWidget;
