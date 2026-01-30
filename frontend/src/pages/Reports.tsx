import { useState } from 'react';
import { useQuery } from 'react-query';
import { format, subDays } from 'date-fns';
import { reportApi } from '../services/api';
import DateRangeFilter from '../components/Filters/DateRangeFilter';
import { FileText, Plane, Users, Download } from 'lucide-react';

const Reports = () => {
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [activeTab, setActiveTab] = useState<'flights' | 'roster'>('flights');

    const { data: flightsData, isLoading: loadingFlights } = useQuery(
        ['report-flights', startDate, endDate],
        () => reportApi.getFlights(startDate, endDate),
        { enabled: activeTab === 'flights' }
    );

    const { data: rosterData, isLoading: loadingRoster } = useQuery(
        ['report-roster', startDate, endDate],
        () => reportApi.getRoster(startDate, endDate),
        { enabled: activeTab === 'roster' }
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FileText className="text-sky-500" size={32} />
                        Operational Reports
                    </h1>
                    <p className="text-slate-400 mt-1">Detailed auditing and historical logs</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700">
                        <Download size={18} />
                        Export CSV
                    </button>
                    <DateRangeFilter onChange={(s, e) => { setStartDate(s); setEndDate(e); }} />
                </div>
            </div>

            <div className="flex gap-4 border-b border-slate-800 mb-6">
                <button
                    onClick={() => setActiveTab('flights')}
                    className={`pb-4 px-2 flex items-center gap-2 font-medium transition-all ${activeTab === 'flights' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Plane size={18} />
                    Flight Movements
                </button>
                <button
                    onClick={() => setActiveTab('roster')}
                    className={`pb-4 px-2 flex items-center gap-2 font-medium transition-all ${activeTab === 'roster' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Users size={18} />
                    Crew Roster
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-700">
                                {activeTab === 'flights' ? (
                                    <>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Flight No</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Date</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Route</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">STD/STA</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Status</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Staff ID</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Date</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Duty Code</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Leg Detail</th>
                                        <th className="p-4 text-slate-400 font-semibold text-sm">Source</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {activeTab === 'flights' ? (
                                loadingFlights ? (
                                    <tr><td colSpan={5} className="p-10 text-center text-slate-500">Loading flights...</td></tr>
                                ) : flightsData?.data?.data?.map((f: any) => (
                                    <tr key={f.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 text-white font-medium">{f.flight_no}</td>
                                        <td className="p-4 text-slate-300">{format(new Date(f.flight_date), 'dd MMM yyyy')}</td>
                                        <td className="p-4 text-slate-300">{f.dep_airport} → {f.arr_airport}</td>
                                        <td className="p-4 text-slate-300">{f.std} / {f.sta}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                loadingRoster ? (
                                    <tr><td colSpan={5} className="p-10 text-center text-slate-500">Loading roster...</td></tr>
                                ) : rosterData?.data?.data?.map((r: any) => (
                                    <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 text-white font-medium">{r.staff_id}</td>
                                        <td className="p-4 text-slate-300">{format(new Date(r.roster_date), 'dd MMM yyyy')}</td>
                                        <td className="p-4 text-slate-300">{r.duty_code}</td>
                                        <td className="p-4 text-slate-300">{r.dep_airport || '-'} → {r.arr_airport || '-'}</td>
                                        <td className="p-4">
                                            <span className="text-slate-400 text-xs italic">{r.source}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
