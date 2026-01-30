import { useQuery } from 'react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { kpiApi } from '../../services/api';

interface SectorCountWidgetProps {
    startDate: string;
    endDate: string;
}

const SectorCountWidget = ({ startDate, endDate }: SectorCountWidgetProps) => {
    // Use @tanstack/react-query syntax (assuming v4/v5 installed or v3 compat)
    // v3: useQuery(['key', vars], func)
    // v4/v5: useQuery({ queryKey: [], queryFn: ... })
    // Since I installed react-query v3 (via legacy-peer-deps or default npm install attempt), I'll stick to v3 syntax as per README.
    // Although README says npm install react-query (implies v3).
    // Wait, if I'm using TypeScript, I need to check types.

    const { data, isLoading } = useQuery(
        ['sectors', startDate, endDate],
        () => kpiApi.getSectorCount(startDate, endDate),
        { staleTime: 2 * 60 * 1000 }
    );

    if (isLoading) return <div className="animate-pulse h-32 bg-navy rounded-lg" />;

    const count = data?.data?.data?.count || 0; // Axis response structure data.data.count
    const trend = 5.2; // Calculate from previous period (mocked)

    return (
        <div className="bg-navy rounded-lg p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">Total Sectors</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{count.toLocaleString()}</h3>
                </div>
                <div className={`flex items-center ${trend >= 0 ? 'text-teal' : 'text-orange'}`}>
                    {trend >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                    <span className="ml-1 font-semibold">{Math.abs(trend)}%</span>
                </div>
            </div>
        </div>
    );
};

export default SectorCountWidget;
