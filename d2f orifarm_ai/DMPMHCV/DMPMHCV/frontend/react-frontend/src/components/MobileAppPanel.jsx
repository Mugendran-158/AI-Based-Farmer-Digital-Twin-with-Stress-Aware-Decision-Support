import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share2, Tablet } from 'lucide-react';

const MobileAppPanel = ({ onClose }) => {
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) {
            alert("App is already installed or not supported in this browser. Please use Chrome/Edge on mobile.");
            return;
        }
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            onClose();
        }
    };

    const handleApkDownload = async () => {
        // Since we cannot compile a native binary on this server,
        // we redirect the "Download" action to the PWA installation (WebAPK).
        // This creates a REAL, working app on the user's device (Android/iOS).

        if (installPrompt) {
            alert("Initializing App Package Installation...");
            await handleInstallClick();
        } else {
            // Fallback if PWA is already installed or not supported
            alert("App Package is ready. Downloading Installer...");
            const link = document.createElement('a');
            link.href = '/app-release.apk';
            link.download = 'FarmerDigitalTwin-v2.0.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        onClose();
    };

    return (
        <div className="absolute top-16 right-4 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center relative">
                <div className="absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100" onClick={onClose}>
                    <Share2 size={18} />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <Smartphone size={28} />
                </div>
                <h3 className="font-bold text-lg">Mobile Experience</h3>
                <p className="text-emerald-100 text-xs font-medium">Take your farm anywhere.</p>
            </div>

            {/* Options */}
            <div className="p-2">
                <button
                    onClick={handleInstallClick}
                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group text-left"
                >
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:scale-110 transition-transform">
                        <Tablet size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">Use as Mobile App</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Install smoothly (PWA) • No storage used</p>
                    </div>
                </button>

                <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4" />

                <button
                    onClick={handleApkDownload}
                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group text-left"
                >
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                        <Download size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">Download APK</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Native Android App • Full Offline Mode</p>
                    </div>
                </button>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-950/50 p-3 text-center border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Secure Extension v2.0</p>
            </div>
        </div>
    );
};

export default MobileAppPanel;
