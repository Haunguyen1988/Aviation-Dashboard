import { useState } from 'react';
import { Upload as UploadIcon, FileUp, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState<'flights' | 'swaps' | 'crew'>('flights');
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post(`/upload/${type}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus('success');
            setMessage(`Successfully uploaded ${file.name} to ${type} vault.`);
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.error || 'Upload failed. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                    <UploadIcon className="text-sky-500" size={32} />
                    Data Integration Vault
                </h1>
                <p className="text-slate-400 mt-2 text-lg">Securely upload manual CSV manifests for operational processing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['flights', 'swaps', 'crew'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${type === t
                            ? 'bg-sky-500/10 border-sky-500 text-sky-100 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                            : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="uppercase tracking-widest text-xs font-bold">{t}</span>
                            <FileUp size={20} className={type === t ? 'text-sky-400' : 'text-slate-600'} />
                        </div>
                        <h3 className="text-lg font-semibold capitalize">{t === 'swaps' ? 'AC Changes' : t} Manifest</h3>
                        <p className="text-sm mt-1 opacity-70">
                            {t === 'flights' && 'Standard flight movements CSV'}
                            {t === 'swaps' && 'Aircraft maintenance and swaps'}
                            {t === 'crew' && 'Detailed roster and standby logs'}
                        </p>
                    </button>
                ))}
            </div>

            <div className="glass-card p-10 flex flex-col items-center justify-center border-dashed border-2 border-slate-700 hover:border-sky-500/50 transition-all group">
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv,.xml"
                />

                <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-4 w-full h-full"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center transition-transform group-hover:scale-110">
                        <FileUp size={32} className="text-sky-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-medium text-white">
                            {file ? file.name : `Select ${type} manifest file`}
                        </p>
                        <p className="text-slate-500 mt-1">Drag and drop or click to browse</p>
                    </div>
                </label>

                {file && status === 'idle' && (
                    <button
                        onClick={handleUpload}
                        className="mt-8 px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg transition-all shadow-lg shadow-sky-500/20 active:scale-95"
                    >
                        Initiate Upload
                    </button>
                )}

                {status === 'uploading' && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <Loader2 className="text-sky-500 animate-spin" size={32} />
                        <p className="text-slate-300 font-medium">Encrypting and synchronizing...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3 text-emerald-400">
                        <CheckCircle size={20} />
                        <span className="font-medium">{message}</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400">
                        <AlertCircle size={20} />
                        <span className="font-medium">{message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;
