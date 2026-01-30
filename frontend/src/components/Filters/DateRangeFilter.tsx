import { useState } from 'react';
import { format, subDays } from 'date-fns';

interface DateRangeFilterProps {
    onChange: (start: string, end: string) => void;
}

const DateRangeFilter = ({ onChange }: DateRangeFilterProps) => {
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const presets = [
        { label: 'Last 7 Days', days: 7 },
        { label: 'Last 14 Days', days: 14 },
        { label: 'Last 30 Days', days: 30 }
    ];

    const handlePresetClick = (days: number) => {
        const end = new Date();
        const start = subDays(end, days);
        const startStr = format(start, 'yyyy-MM-dd');
        const endStr = format(end, 'yyyy-MM-dd');
        setStartDate(startStr);
        setEndDate(endStr);
        onChange(startStr, endStr);
    };

    return (
        <div className="flex items-center gap-4 bg-navy rounded-lg p-4">
            <div className="flex gap-2">
                {presets.map(preset => (
                    <button
                        key={preset.days}
                        onClick={() => handlePresetClick(preset.days)}
                        className="px-4 py-2 bg-navy-light rounded hover:bg-teal hover:text-white transition text-sm font-medium text-gray-300"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-navy-light rounded px-3 py-2 text-white border border-transparent focus:border-teal outline-none"
                />
                <span className="text-gray-400">to</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-navy-light rounded px-3 py-2 text-white border border-transparent focus:border-teal outline-none"
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;
