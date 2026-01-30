import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { chartApi } from '../../services/api';
import { Plane } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    startDate: string;
    endDate: string;
}

const SectorTrendChart = ({ startDate, endDate }: ChartProps) => {
    const { data } = useQuery(
        ['sector-trend', startDate, endDate],
        () => chartApi.getSectorTrend(startDate, endDate),
        { staleTime: 5 * 60 * 1000 }
    );

    const chartData = {
        labels: data?.data?.labels || [],
        datasets: [
            {
                label: 'Commercial Sectors',
                data: data?.data?.sectors || [],
                backgroundColor: 'rgba(14, 165, 233, 0.5)',
                borderColor: '#0ea5e9',
                borderWidth: 1,
                borderRadius: 4,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false }
        },
        scales: {
            y: {
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    return (
        <div className="glass-card p-6 h-80 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <span className="kpi-label">Sector Trend</span>
                <Plane size={16} className="text-slate-500" />
            </div>
            <div className="flex-1">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default SectorTrendChart;
