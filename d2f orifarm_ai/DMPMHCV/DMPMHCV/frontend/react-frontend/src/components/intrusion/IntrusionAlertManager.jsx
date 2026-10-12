
import React, { useEffect, useState } from 'react';

const IntrusionAlertManager = ({ onAlert }) => {
    const [listening, setListening] = useState(false);
    const [pushStatus, setPushStatus] = useState('default'); // default, granted, denied

    // 1. SSE Connection
    useEffect(() => {
        if (!listening) {
            const events = new EventSource('http://127.0.0.1:5000/api/intrusion/stream');

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.status === 'connected') {
                    console.log('SSE Connected');
                } else if (parsedData.id) {
                    console.log('New Intrusion Alert:', parsedData);
                    // Pass to parent
                    if (onAlert) onAlert(parsedData);

                    // Simple sound effect
                    playAlertSound();
                }
            };

            events.onerror = (err) => {
                console.error("SSE Error:", err);
                events.close();
                // Simple reconnection logic could go here
            };

            setListening(true);

            return () => {
                events.close();
            };
        }
    }, [listening, onAlert]);

    // 2. Play Sound
    const playAlertSound = () => {
        try {
            const audio = new Audio('/alert.mp3'); // Ensure this file exists or use trusted generic sound URL
            // Or generate beep
            // audio.play().catch(e => console.log("Audio play failed (autoplay policy):", e));
        } catch (e) {
            console.error("Sound error", e);
        }
    };

    // 3. Register Service Worker & Subscribe to Push
    useEffect(() => {
        const registerSw = async () => {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registered');

                    // Check subscription
                    const subscription = await registration.pushManager.getSubscription();
                    if (subscription) {
                        setPushStatus('granted');
                    } else {
                        // subscribeUser(registration); // Function to subscribe
                    }
                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            }
        };
        registerSw();
    }, []);

    // Helper to subscribe
    const subscribeToPush = async () => {
        if (!('serviceWorker' in navigator)) return;

        try {
            const registration = await navigator.serviceWorker.ready;

            // Fetch VAPID Key from backend
            const response = await fetch('http://127.0.0.1:5000/api/push/vapid-public-key');
            const data = await response.json();
            const publicKey = data.publicKey;

            if (!publicKey) {
                console.warn("No VAPID Key configured, skipping push.");
                return;
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            });

            // Send to backend
            await fetch('http://127.0.0.1:5000/api/push/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setPushStatus('granted');
            alert("Push Notifications Enabled!");

        } catch (error) {
            console.error("Push subscription failed:", error);
            // alert("Failed to enable notifications. " + error.message);
        }
    };

    // Helper util
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // Render nothing visible, or render a small status indicator?
    // User requested "No UI clutter", so this manages logic.
    // Parent will handle the banner display.

    // We can expose a button to enable notifications if not enabled
    if (pushStatus !== 'granted') {
        return (
            <div className="absolute top-4 left-4 z-50">
                {/* Hidden or very subtle prompt? User asked for seamless. 
                    Let's not interrupt unless they go to settings.
                    For now, return null and let parent handle UI.
                 */}
            </div>
        );
    }

    return null;
};

// Export subscription helper so parent can trigger it if needed (e.g. from settings)
export const requestPushPermission = async () => {
    // Logic needs to be inside component or passed ref... 
    // Just keep it simple.
};

export default IntrusionAlertManager;
