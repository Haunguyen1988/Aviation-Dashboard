import { useQuery } from 'react-query';
import { RotateCcw, TrendingUp } from 'lucide-react';
import { kpiApi } from '../../services/api';

interface WidgetProps {
    startDate: string;
    endDate: string;
}

const ACChangesWidget = ({ startDate, endDate }: WidgetProps) => {
    const { data, isLoading } = useQuery(
        ['ac-changes', startDate, endDate],
        () => kpiApi.getACChanges(startDate, endDate),
        { staleTime: 2 * 60 * 1000 }
    );

    if (isLoading) return <div className="animate-pulse h-[140px] bg-slate-800/50 rounded-xl" />;

    const count = data?.data?.data?.count || 0;
    const trend = -2; // Mocked trend

    return (
        <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <span className="kpi-label">AC Changes</span>
                <RotateCcw className="text-orange-500" size={20} />
            </div>
            <div className="mt-4">
                <div className="kpi-value text-orange-400">{count}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    {trend >= 0 ? <TrendingUp className="text-teal-400" size={14} /> : <TrendingUp className="text-red-400 rotate-180" size={14} />}
                    <span className={trend >= 0 ? "text-teal-400 font-medium" : "text-red-400 font-medium"}>
                        {Math.abs(trend)} vs last period
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ACChangesWidget;
