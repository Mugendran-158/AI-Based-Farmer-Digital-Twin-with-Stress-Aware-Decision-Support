import React, { createContext, useContext, useState } from 'react';

const MobileViewContext = createContext();

export const useMobileView = () => useContext(MobileViewContext);

export const MobileViewProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('desktop'); // 'desktop', 'mobile', 'tablet'
    const [mysteriousMode, setMysteriousMode] = useState(false);
    const [worldMode, setWorldMode] = useState(false);
    const [seaMode, setSeaMode] = useState(false);
    const [monsoonMode, setMonsoonMode] = useState(false);
    const [activeTheme, setActiveTheme] = useState(() => {
        const saved = localStorage.getItem('appThemeConfig');
        return saved || 'default';
    });

    const setTheme = (themeId) => {
        setActiveTheme(themeId);
        localStorage.setItem('appThemeConfig', themeId);
    };

    const setMobile = () => setViewMode(prev => prev === 'mobile' ? 'desktop' : 'mobile');
    const setTablet = () => setViewMode(prev => prev === 'tablet' ? 'desktop' : 'tablet');
    const toggleMysterious = () => {
        setMysteriousMode(prev => !prev);
        if (!mysteriousMode) {
            setWorldMode(false);
            setSeaMode(false);
            setMonsoonMode(false);
        }
    };
    const toggleWorld = () => {
        setWorldMode(prev => !prev);
        if (!worldMode) {
            setMysteriousMode(false);
            setSeaMode(false);
            setMonsoonMode(false);
        }
    };
    const toggleSea = () => {
        setSeaMode(prev => !prev);
        if (!seaMode) {
            setMysteriousMode(false);
            setWorldMode(false);
            setMonsoonMode(false);
        }
    };
    const toggleMonsoon = () => {
        setMonsoonMode(prev => !prev);
        if (!monsoonMode) {
            setMysteriousMode(false);
            setWorldMode(false);
            setSeaMode(false);
        }
    };

    return (
        <MobileViewContext.Provider value={{
            viewMode, setViewMode, setMobile, setTablet,
            mysteriousMode, toggleMysterious,
            worldMode, toggleWorld,
            seaMode, toggleSea,
            monsoonMode, toggleMonsoon,
            activeTheme, setTheme
        }}>
            {children}
        </MobileViewContext.Provider>
    );
};
