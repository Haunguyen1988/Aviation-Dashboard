import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// KPI APIs
export const kpiApi = {
    getSectorCount: (start: string, end: string) =>
        api.get(`/kpi/sectors?start_date=${start}&end_date=${end}`),
    getACChanges: (start: string, end: string) =>
        api.get(`/kpi/ac-changes?start_date=${start}&end_date=${end}`),
    getBlockHours: (start: string, end: string) =>
        api.get(`/kpi/block-hours?start_date=${start}&end_date=${end}`),
    getLayovers: (start: string, end: string) =>
        api.get(`/kpi/layovers?start_date=${start}&end_date=${end}`),
    getDeadheads: (start: string, end: string) =>
        api.get(`/kpi/deadheads?start_date=${start}&end_date=${end}`)
};

// Chart APIs
export const chartApi = {
    getLayoverTrend: (start: string, end: string) =>
        api.get(`/charts/layover-trend?start_date=${start}&end_date=${end}`),
    getSectorTrend: (start: string, end: string) =>
        api.get(`/charts/sectors-trend?start_date=${start}&end_date=${end}`)
};

export default api;
