/**
 * BiologicalInferenceEngine.js
 * 
 * A software-only biological inference system for agriculture.
 * Derives crop biological states using explainable agronomic logic.
 * 
 * Label: "Derived biological indicators (not direct measurements)"
 */

export const calculateBiologicalState = ({
    season = 'SUMMER',
    weather = {},
    timeOfDay = { isDay: true, altitude: 1 },
    cropType = 'WHEAT',
    actions = { irrigated: false, fertilized: false, observedStress: false },
    growthStage = 'VEGETATIVE'
}) => {
    const safeSeason = season || 'SUMMER';
    const safeTimeOfDay = timeOfDay || { isDay: true, altitude: 1 };

    // 1. Seasonal Baseline & Metabolic Activity
    // Rainy: High Activity | Summer: Reduced (Heat Stress) | Winter: Low (Dormancy) | Autumn: Balanced
    const seasonalBaselines = {
        RAINY: 1.1,
        SUMMER: 0.8, // Heat stress reduces baseline metabolism
        WINTER: 0.5, // Dormancy
        AUTUMN: 0.9
    };
    const baseline = seasonalBaselines[safeSeason] || 1.0;

    const safeWeather = weather || {};
    const temp = safeWeather.temp || 25;
    const tempFactor = Math.max(0, 1 - Math.abs(temp - 25) / 20); // Optimal at 25C

    const condition = safeWeather.condition || 'Clear';
    const rainProb = safeWeather.rainProb || 0; // Real-time rain probability

    // Day-Night Rhythm Awareness
    const metabolicActivity = safeTimeOfDay.isDay
        ? (0.4 + (0.6 * safeTimeOfDay.altitude) * tempFactor) * baseline
        : 0.15 * baseline; // Natural maintenance metabolism

    // 2. Photosynthesis Readiness Index
    const photosynthesisReadiness = safeTimeOfDay.isDay
        ? Math.min(1, (actions.irrigated ? 1.1 : 0.8) * (actions.fertilized ? 1.1 : 0.9))
        : 0;

    // 3. Water Uptake Condition (Decision Support)
    const isRaining = condition === 'Rain' || condition === 'Rainy' || safeSeason === 'RAINY';
    const waterUptake = (isRaining || actions.irrigated || rainProb > 50)
        ? 0.95
        : (safeSeason === 'SUMMER' ? 0.35 : 0.65);

    // 4. Early Growth Stress Indication (Interpretive)
    let earlyStress = false;
    let hint = "Healthy biological rhythm detected.";

    if (metabolicActivity > 0.9 && !actions.fertilized) {
        earlyStress = true;
        hint = "Possible early nutrient imbalance — observation recommended.";
    } else if (waterUptake < 0.4 && safeSeason === 'SUMMER') {
        earlyStress = true;
        hint = "Visual indicators suggest reviewing irrigation timing.";
    } else if (rainProb > 60) {
        hint = "High rain probability detected. Natural irrigation expected.";
    } else if (safeSeason === 'WINTER' && metabolicActivity < 0.3) {
        hint = "Normal seasonal dormancy slowing metabolic cycles.";
    } else if (actions.observedStress) {
        hint = "Heightened stress indicators confirmed by field observation.";
    }

    // Determine metaphorical glow state
    let glowColor = 'green';
    let intensity = metabolicActivity;

    // Health Status Logic
    if (actions.observedStress || (earlyStress && metabolicActivity < 0.5)) {
        glowColor = 'yellow';
        intensity = 0.7;
    } else if (waterUptake < 0.4) {
        glowColor = 'dim';
        intensity = 0.3;
    } else if (rainProb > 40 || (waterUptake > 0.8 && (isRaining || actions.irrigated))) {
        glowColor = 'blue';
        intensity = 0.85; // Increased water activity glow
    } else if (temp > 35) {
        glowColor = 'yellow';
        intensity = 0.5; // Heat stress reduces glow intensity
    } else {
        glowColor = 'green';
        intensity = Math.min(1.0, metabolicActivity);
    }

    return {
        indicators: {
            metabolicActivity,
            photosynthesisReadiness,
            waterUptake,
            earlyStress,
            rainProb
        },
        visualization: {
            glowColor,
            intensity: Math.max(0.15, intensity * (safeTimeOfDay.isDay ? 0.35 : 1.0)) // Prominent at night
        },
        interpretation: {
            hint,
            context: `Based on ${safeSeason.toLowerCase()} season and current ${safeTimeOfDay.isDay ? 'daytime' : 'night'} cycle.`
        },
        disclaimer: "Biological indicators are derived from weather context, not sensors."
    };
};
