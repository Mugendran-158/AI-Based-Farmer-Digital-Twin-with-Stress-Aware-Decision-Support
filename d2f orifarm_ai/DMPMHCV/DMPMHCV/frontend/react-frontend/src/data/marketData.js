export const MARKET_DATA = [
    {
        id: 'rice',
        name: 'Rice (Paddy)',
        currentPrice: 2250,
        unit: 'Quintal',
        currency: 'INR',
        change: +4.2,
        trend: 'up',
        sentiment: 'Bullish',
        volume: '1.2M Tons',
        projections: [
            { date: '2024-01-01', price: 2100 },
            { date: '2024-01-05', price: 2150 },
            { date: '2024-01-10', price: 2180 },
            { date: '2024-01-15', price: 2250 },
            { date: '2024-01-20', price: 2310, type: 'projected' },
            { date: '2024-01-25', price: 2380, type: 'projected' },
            { date: '2024-01-30', price: 2420, type: 'projected' }
        ]
    },
    {
        id: 'wheat',
        name: 'Wheat',
        currentPrice: 2125,
        unit: 'Quintal',
        currency: 'INR',
        change: -1.5,
        trend: 'down',
        sentiment: 'Neutral',
        volume: '850K Tons',
        projections: [
            { date: '2024-01-01', price: 2200 },
            { date: '2024-01-05', price: 2180 },
            { date: '2024-01-10', price: 2150 },
            { date: '2024-01-15', price: 2125 },
            { date: '2024-01-20', price: 2110, type: 'projected' },
            { date: '2024-01-25', price: 2090, type: 'projected' },
            { date: '2024-01-30', price: 2105, type: 'projected' }
        ]
    },
    {
        id: 'tomato',
        name: 'Tomato',
        currentPrice: 3500,
        unit: 'Quintal',
        currency: 'INR',
        change: +12.8,
        trend: 'up',
        sentiment: 'High Volatility',
        volume: '120K Tons',
        projections: [
            { date: '2024-01-01', price: 2800 },
            { date: '2024-01-05', price: 3100 },
            { date: '2024-01-10', price: 3300 },
            { date: '2024-01-15', price: 3500 },
            { date: '2024-01-20', price: 3800, type: 'projected' },
            { date: '2024-01-25', price: 4100, type: 'projected' },
            { date: '2024-01-30', price: 3900, type: 'projected' }
        ]
    },
    {
        id: 'onion',
        name: 'Onion',
        currentPrice: 1800,
        unit: 'Quintal',
        currency: 'INR',
        change: +2.1,
        trend: 'up',
        sentiment: 'Stable',
        volume: '450K Tons',
        projections: [
            { date: '2024-01-01', price: 1750 },
            { date: '2024-01-05', price: 1760 },
            { date: '2024-01-10', price: 1780 },
            { date: '2024-01-15', price: 1800 },
            { date: '2024-01-20', price: 1820, type: 'projected' },
            { date: '2024-01-25', price: 1850, type: 'projected' },
            { date: '2024-01-30', price: 1880, type: 'projected' }
        ]
    }
];

export const GLOBAL_MARKET_SENTIMENT = {
    score: 72,
    description: 'Bullish market conditions driven by supply constraints and festive demand.',
    riskLevel: 'Moderate',
    lastUpdate: new Date().toISOString()
};
