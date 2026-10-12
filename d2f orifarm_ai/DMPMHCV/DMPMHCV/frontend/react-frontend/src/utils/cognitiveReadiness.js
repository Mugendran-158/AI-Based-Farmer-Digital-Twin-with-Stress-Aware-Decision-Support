/**
 * Cognitive Readiness Inference Module
 * Performs strict local inference of decision readiness based on non-invasive behavioral signals.
 * 
 * SIGNALS:
 * 1. Interaction Time (ms): Fast (<3s) = Rushed; Slow (>60s) = Hesitant.
 * 2. Correction Rate: High backspaces relative to length = Hesitant/Stressed.
 * 3. Circadian Risk: Late night (11 PM - 4 AM) = Fatigue.
 * 
 * OUTPUTS:
 * - READY: Normal baseline behavior.
 * - CAUTION: Slight deviations, potential fatigue or rushing.
 * - OBSERVE: Significant deviations, high correction rate or extreme timing.
 */

export class CognitiveReadinessTracker {
    constructor() {
        this.startTime = Date.now();
        this.corrections = 0;
        this.keyPresses = 0;
    }

    // Track a keypress event to count total presses and corrections
    trackInput(e) {
        this.keyPresses++;
        if (e.key === 'Backspace' || e.key === 'Delete') {
            this.corrections++;
        }
    }

    // Calculate the readiness state
    calculateReadiness() {
        const endTime = Date.now();
        const duration = (endTime - this.startTime) / 1000; // seconds

        let score = 100;
        const reasons = [];

        // 1. Circadian Rhythm Check (Fatigue)
        const hour = new Date().getHours();
        if (hour >= 23 || hour < 4) {
            score -= 20;
            reasons.push('Late night activity');
        }

        // 2. Interaction Speed (Impulsivity vs Distraction)
        if (duration < 2.5) {
            score -= 15; // Too fast (Impulsive/Rushed)
            reasons.push('Rushed interaction');
        } else if (duration > 60) {
            score -= 10; // Too slow (Distracted/Hesitant)
            reasons.push('Prolonged interaction');
        }

        // 3. Motor Control / Confidence (Corrections)
        // If corrections are more than 25% of total keypresses
        if (this.keyPresses > 5) {
            const correctionRate = this.corrections / this.keyPresses;
            if (correctionRate > 0.3) {
                score -= 25; // High hesitation/correction
                reasons.push('High correction rate');
            } else if (correctionRate > 0.15) {
                score -= 10;
                reasons.push('Moderate corrections');
            }
        }

        // Determine State
        let state = 'READY';
        if (score < 50) {
            state = 'OBSERVE';
        } else if (score < 80) {
            state = 'CAUTION';
        }

        return {
            state,
            score, // Internal use only, normally not exposed
            reasons
        };
    }
}
