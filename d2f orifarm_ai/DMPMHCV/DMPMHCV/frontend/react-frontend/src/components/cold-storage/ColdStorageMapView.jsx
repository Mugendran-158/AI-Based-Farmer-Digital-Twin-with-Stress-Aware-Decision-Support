import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Container style for the map
const containerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '12px'
};

// Default center (South India)
const defaultCenter = {
    lat: 10.8505,
    lng: 76.2711
};

// Custom marker icon colors
const getMarkerIcon = (status) => {
    const color = status === 'Available' ? '#10b981' : '#ef4444';
    return {
        path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
        scale: 10
    };
};

const ColdStorageMapView = ({ facilities = [], selectedFacility, language = 'en', onFacilitySelect }) => {
    // 🔑 Google Maps API Key - Replace with your key
    const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    // Safety: Ensure facilities is always an array
    const safeFacilities = Array.isArray(facilities) ? facilities : [];

    // Filter valid facilities
    const validFacilities = safeFacilities.filter(f =>
        f.location && !isNaN(parseFloat(f.location.lat)) && !isNaN(parseFloat(f.location.lon))
    );

    // Determine center
    let center = defaultCenter;
    if (selectedFacility?.location?.lat && selectedFacility?.location?.lon) {
        center = {
            lat: parseFloat(selectedFacility.location.lat),
            lng: parseFloat(selectedFacility.location.lon)
        };
    } else if (validFacilities.length > 0) {
        center = {
            lat: parseFloat(validFacilities[0].location.lat),
            lng: parseFloat(validFacilities[0].location.lon)
        };
    }

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const handleMarkerClick = (facility) => {
        setActiveMarker(facility.id);
        if (onFacilitySelect) {
            onFacilitySelect(facility);
        }
    };

    if (loadError) {
        return (
            <div className="w-full h-[600px] bg-slate-800 rounded-xl flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h3 className="text-lg font-bold">Map Loading Error</h3>
                    <p className="text-sm text-white/60 mt-2">Please check your Google Maps API Key</p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-[600px] bg-slate-800 rounded-xl flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm font-bold">Loading Google Maps...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative" style={{ height: '600px', borderRadius: '12px', overflow: 'hidden' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={selectedFacility ? 12 : 8}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: [
                        { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
                        { elementType: 'labels.text.stroke', stylers: [{ color: '#1e293b' }] },
                        { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
                        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
                        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] }
                    ],
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true
                }}
            >
                {/* Markers */}
                {validFacilities.map((facility) => (
                    <Marker
                        key={facility.id}
                        position={{
                            lat: parseFloat(facility.location.lat),
                            lng: parseFloat(facility.location.lon)
                        }}
                        icon={getMarkerIcon(facility.status)}
                        onClick={() => handleMarkerClick(facility)}
                    >
                        {activeMarker === facility.id && (
                            <InfoWindow
                                position={{
                                    lat: parseFloat(facility.location.lat),
                                    lng: parseFloat(facility.location.lon)
                                }}
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <div className="p-2 min-w-[180px] bg-white rounded-lg">
                                    <h3 className="font-bold text-slate-900 text-sm">{facility.name?.[language] || facility.name?.en || 'Facility'}</h3>
                                    <p className="text-xs text-slate-600 mt-1">📍 {facility.location?.name || 'Location'}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${facility.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {facility.status === 'Available' ? 'Available' : 'Full'}
                                        </span>
                                        <span className="text-sm font-black text-slate-800">
                                            ₹{facility.costPerKg || 0}/kg
                                        </span>
                                    </div>
                                    {facility.distance && (
                                        <p className="text-xs text-slate-500 mt-2">🚗 {facility.distance} km away</p>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
                <div className="bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        {language === 'ta' ? 'கிடைக்கும்' : 'Available'}
                    </span>
                </div>
                <div className="bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        {language === 'ta' ? 'நிரம்பிவிட்டது' : 'Full'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ColdStorageMapView;
