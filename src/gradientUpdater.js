// src/utils/gradientUpdater.js
const colorThemes = [
    { color1: '#4d094d', color2: '#181818' },  // Default
    { color1: '#1a1a2e', color2: '#16213e' },  // Dark Blue
    { color1: '#1e3c72', color2: '#2a5298' },  // Blue
    { color1: '#614385', color2: '#516395' },  // Purple
    { color1: '#1D2B64', color2: '#F8CDDA' },  // Purple to Pink
    { color1: '#0F2027', color2: '#2C5364' },  // Dark Teal
    { color1: '#200122', color2: '#6f0000' }   // Maroon
];

const STORAGE_KEY = 'gradientTheme';
const TEST_MODE = true; // Set to false to go back to 24-hour rotation

let themeIndex = 0;

export const updateGradient = () => {
    const root = document.documentElement;
    
    // For testing: cycle through themes every 2 seconds
    if (TEST_MODE) {
        themeIndex = (themeIndex + 1) % colorThemes.length;
        console.log('Changing theme to index:', themeIndex);
    } else {
        // Original 24-hour rotation logic
        const now = new Date().getTime();
        const lastUpdate = localStorage.getItem(STORAGE_KEY + '_lastUpdate');
        themeIndex = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
        
        if (!lastUpdate || (now - parseInt(lastUpdate)) >= (24 * 60 * 60 * 1000)) {
            themeIndex = (themeIndex + 1) % colorThemes.length;
            localStorage.setItem(STORAGE_KEY, themeIndex.toString());
            localStorage.setItem(STORAGE_KEY + '_lastUpdate', now.toString());
        }
    }

    // Apply the current theme
    const theme = colorThemes[themeIndex];
    root.style.setProperty('--color1', theme.color1);
    root.style.setProperty('--color2', theme.color2);

    return theme;
};

export const initGradientUpdater = () => {
    // Set initial theme
    updateGradient();
    
    // Set up interval for updates
    const interval = TEST_MODE ? 2000 : 60000; // 2 seconds for testing, 1 minute for production
    setInterval(updateGradient, interval);
};