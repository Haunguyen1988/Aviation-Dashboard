import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query'; // Using the newer package name or react-query depending on what was installed
// Wait, I installed "react-query" package in the command? "npm install react-query ...". 
// If so, import from 'react-query'. 
// But earlier I decided to downgrade React for react-query v3.
// Let's check package.json again. 
// It says "react-query": "^3.39.3". So 'react-query' is correct.

import { chartApi } from '../../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    startDate: string;
    endDate: string;
}

const LayoverTrendChart = ({ startDate, endDate }: ChartProps) => {
    const { data } = useQuery(
        ['layover-trend', startDate, endDate],
        () => chartApi.getLayoverTrend(startDate, endDate),
        { staleTime: 5 * 60 * 1000 }
    );

    const chartData = {
        labels: data?.data?.labels || [],
        datasets: [
            {
                label: 'Domestic',
                data: data?.data?.domestic || [],
                borderColor: '#0ea5e9', // Sky
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: 'International',
                data: data?.data?.international || [],
                borderColor: '#14b8a6', // Teal
                backgroundColor: 'rgba(20, 184, 166, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: '#94a3b8', font: { size: 12 } }
            },
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
        <div className="h-full w-full min-h-[250px]">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LayoverTrendChart;
