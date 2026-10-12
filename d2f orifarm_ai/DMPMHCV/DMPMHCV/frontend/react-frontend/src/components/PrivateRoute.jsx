import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu, Activity } from 'lucide-react';

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center gap-8">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-nature-medium/10 blur-xl animate-pulse" />
                    <div className="relative w-full h-full border border-white/20 bg-[#0F0F0F] rounded-2xl flex items-center justify-center">
                        <Cpu size={32} className="text-nature-medium animate-pulse" strokeWidth={1} />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Activity size={16} className="text-nature-medium animate-pulse" />
                    <span className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">
                        Initializing Farmer Portal
                    </span>
                </div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
