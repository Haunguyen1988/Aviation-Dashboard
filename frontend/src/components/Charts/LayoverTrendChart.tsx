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
                borderColor: '#1ABC9C',
                backgroundColor: 'rgba(26, 188, 156, 0.1)',
                tension: 0.4
            },
            {
                label: 'International',
                data: data?.data?.international || [],
                borderColor: '#E67E22',
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Layover Trend Analysis' }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#ECF0F1' }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#ECF0F1' }
            }
        }
    };

    return (
        <div className="bg-navy rounded-lg p-6 h-80">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LayoverTrendChart;
