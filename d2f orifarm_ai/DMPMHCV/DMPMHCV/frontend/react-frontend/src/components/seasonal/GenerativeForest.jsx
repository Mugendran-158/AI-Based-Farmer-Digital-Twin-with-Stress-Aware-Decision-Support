import React, { useMemo } from 'react';
import GenerativePlant from './GenerativePlant';

/**
 * Procedural Realistic Forest
 * Assembles a dense, varied ecosystem of image-free vegetation.
 */
const GenerativeForest = ({ season, weather, farmerActions, growthStage, sun }) => {
    const ecosystem = useMemo(() => {
        // Create 24 unique instances of vegetation with varied seeds
        return [...Array(24)].map((_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;

            return {
                id: i,
                type: i % 3 === 0 ? 'RICE' : (i % 5 === 0 ? 'APPLE' : 'WHEAT'),
                x: (col * 16) + (Math.random() * 8), // Organic jitter
                y: (row * 24) + (Math.random() * 10),
                scale: 0.6 + Math.random() * 0.5,
                z: i * 2 // Stagger for 3D depth
            };
        });
    }, []);

    return (
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {ecosystem.map((item) => (
                <div
                    key={item.id}
                    className="absolute"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: `translateZ(${item.z}px)`,
                        zIndex: Math.floor(item.y)
                    }}
                >
                    <GenerativePlant
                        type={item.type}
                        scale={item.scale}
                        season={season}
                        weather={weather}
                        farmerActions={farmerActions}
                        growthStage={growthStage}
                        sun={sun}
                    />
                </div>
            ))}
        </div>
    );
};

export default GenerativeForest;
