import React, { useEffect, Suspense } from 'react';
import HeroSection from '../components/landing/HeroSection';
import { useTheme } from '../context/ThemeContext';
import Ballpit from '../components/reactbits/Ballpit';

const Landing = () => {
    const { setTheme } = useTheme();

    // Force Dark Mode for the Premium Cinematic Experience
    useEffect(() => {
        setTheme('dark');
    }, [setTheme]);

    return (
        <div className="bg-black text-white selection:bg-white/20 relative">
            {/* Main Immersive Hero - Single Section Only */}
            <div className="relative z-10">
                <HeroSection />
            </div>
        </div>
    );
};

export default Landing;
