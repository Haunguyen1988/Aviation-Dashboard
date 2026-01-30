import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error | null): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', backgroundColor: '#1e293b', color: '#f87171', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Dashboard component crashed.</h2>
                    <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '5px' }}>
                        <code style={{ whiteSpace: 'pre-wrap', color: '#fda4af' }}>
                            {this.state.error && this.state.error.toString()}
                        </code>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
