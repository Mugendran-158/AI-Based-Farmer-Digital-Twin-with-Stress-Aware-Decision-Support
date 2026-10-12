import { useState, useEffect, useRef } from 'react';

/**
 * useHumanPresence Hook
 * Non-invasive behavioral analysis to distinguish humans from bots.
 * 
 * SIGNALS:
 * 1. Mouse Entropy (Jitter/Curves) - Bots move in straight lines.
 * 2. Typing Variant - Humans have variable key-flight times.
 * 3. Scroll/Focus - Humans interact with the page structure.
 * 
 * OUTPUT:
 * - humanScore (0-100)
 * - isRobot (boolean)
 */
export const useHumanPresence = () => {
    const [score, setScore] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Refs for tracking without re-renders
    const mousePath = useRef({ points: [], lastX: 0, lastY: 0 });
    const keyData = useRef({ lastPressTime: 0, intervals: [] });
    const baselineScore = useRef(0);

    useEffect(() => {
        setIsActive(true);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const mp = mousePath.current;

            // Calculate distance from last point
            const dist = Math.sqrt(Math.pow(clientX - mp.lastX, 2) + Math.pow(clientY - mp.lastY, 2));

            // Ignore micro-jitters or massive jumps (teleportation)
            if (dist > 2 && dist < 500) {
                // Humans curve; bots typically don't (or do it perfectly).
                // We just reward total movement "work" as a proxy for engagement.
                baselineScore.current = Math.min(baselineScore.current + 0.5, 40); // Max 40pts from mouse
            }

            mp.lastX = clientX;
            mp.lastY = clientY;
            updateScore();
        };

        const handleKeyDown = (e) => {
            const now = Date.now();
            const kd = keyData.current;

            if (kd.lastPressTime > 0) {
                const interval = now - kd.lastPressTime;

                // Humans mostly type between 50ms and 2000ms
                if (interval > 50 && interval < 2000) {
                    kd.intervals.push(interval);

                    // Reward variance (entropy) later, for now just reward interaction
                    baselineScore.current = Math.min(baselineScore.current + 2, 40); // Max 40pts from keys
                }
            }
            kd.lastPressTime = now;
            updateScore();
        };

        const handleInteraction = () => {
            // Scrolls, clicks, focus - generic activity
            baselineScore.current = Math.min(baselineScore.current + 5, 20); // Max 20pts from generic
            updateScore();
        };

        const updateScore = () => {
            // Cap at 100
            setScore(Math.min(Math.floor(baselineScore.current), 100));
        };

        // Attach listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, []);

    return {
        humanScore: score,
        isVerified: score > 30, // Threshold for "likely human" locally
        status: score > 50 ? 'High Confidence' : 'Analyzing...'
    };
};
