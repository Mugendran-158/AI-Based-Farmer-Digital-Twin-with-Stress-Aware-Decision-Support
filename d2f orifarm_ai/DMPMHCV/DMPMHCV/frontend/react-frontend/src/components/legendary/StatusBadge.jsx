import React from 'react';
import { ShieldCheck, Activity, Zap, Lock } from 'lucide-react';

const StatusBadge = ({
    type = 'confidence',
    value,
    status = 'active',
    className = ''
}) => {
    const configs = {
        confidence: {
            icon: ShieldCheck,
            color: 'text-nature-medium bg-nature-medium/5 border-nature-medium/10',
            label: 'CONFIDENCE'
        },
        system: {
            icon: Activity,
            color: 'text-trust-blue bg-trust-blue/5 border-trust-blue/10',
            label: 'SYSTEM'
        },
        security: {
            icon: Lock,
            color: 'text-harvest-gold bg-harvest-gold/5 border-harvest-gold/10',
            label: 'SECURITY'
        },
        intelligence: {
            icon: Zap,
            color: 'text-nature-deep bg-nature-deep/5 border-nature-deep/10',
            label: 'AI STATUS'
        }
    };

    const config = configs[type];
    const Icon = config.icon;

    return (
        <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md
      ${config.color}
      ${className}
    `}>
            <Icon size={12} className={status === 'active' ? 'animate-pulse' : ''} />
            <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-black uppercase tracking-wider opacity-60">{config.label}</span>
                <span className="text-[10px] font-mono font-bold tracking-tight">{value}</span>
            </div>
        </div>
    );
};

export default StatusBadge;
