import React from 'react';
import { Shield, ShieldCheck, ShieldAlert, Activity } from 'lucide-react';

const SecurityHealthIndicator = ({ user, isDarkMode }) => {
    // Determine status based on user data
    // Green: Verified + Face/Voice ID + Low Risk
    // Yellow: Partial verification or medium risk
    // Red: High risk or unverified

    const riskScore = user?.risk_score || 0;
    const isVerified = user?.is_verified;
    const hasBiometrics = user?.has_face_id || user?.has_voice_id;

    let status = 'green';
    let label = 'Fully Protected';
    let Icon = ShieldCheck;
    let colorClass = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
    let bgClass = isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50';

    if (riskScore > 60 || !isVerified) {
        status = 'red';
        label = 'Suspicious Activity Detected';
        Icon = ShieldAlert;
        colorClass = isDarkMode ? 'text-red-400' : 'text-red-600';
        bgClass = isDarkMode ? 'bg-red-500/10' : 'bg-red-50';
    } else if (riskScore > 20 || !hasBiometrics) {
        status = 'yellow';
        label = 'Extra Verification Required';
        Icon = Shield;
        colorClass = isDarkMode ? 'text-amber-400' : 'text-amber-600';
        bgClass = isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50';
    }

    return (
        <div className={`p-2 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'} hover:shadow-md group/security`}>
            <div className="relative">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${bgClass} ${colorClass} group-hover/security:scale-105`}>
                    <Icon size={20} strokeWidth={2.5} />
                </div>
                {status === 'green' && (
                    <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecurityHealthIndicator;
