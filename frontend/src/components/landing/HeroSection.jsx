import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Globe, ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const videoRef = useRef(null);
    const fadeAnimRef = useRef(null);
    const fadingOutRef = useRef(false);

    const handleGetInside = () => {
        const mockUser = {
            id: 'guest-user-123',
            name: 'Hiresense Explorer',
            email: 'explorer@hiresense.ai',
            picture: 'https://ui-avatars.com/api/?name=Hiresense+Explorer&background=5227FF&color=fff'
        };
        const mockToken = 'guest_token_123';
        login(mockUser, mockToken);
        navigate('/dashboard');
    };

    const animateOpacity = (target, duration) => {
        if (!videoRef.current) return;
        if (fadeAnimRef.current) cancelAnimationFrame(fadeAnimRef.current);
        
        const startTime = performance.now();
        const startOpacity = parseFloat(videoRef.current.style.opacity) || 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentOpacity = startOpacity + (target - startOpacity) * progress;
            
            if (videoRef.current) {
                videoRef.current.style.opacity = currentOpacity;
            }

            if (progress < 1) {
                fadeAnimRef.current = requestAnimationFrame(animate);
            }
        };

        fadeAnimRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.style.opacity = 0;

        const handleTimeUpdate = () => {
            if (!video.duration) return;
            const timeLeft = video.duration - video.currentTime;
            if (timeLeft <= 0.55 && !fadingOutRef.current) {
                fadingOutRef.current = true;
                animateOpacity(0, 500);
            }
        };

        const handleEnded = () => {
            video.currentTime = 0;
            video.play();
            fadingOutRef.current = false;
            animateOpacity(1, 500);
        };

        const handleLoadedData = () => {
            video.play().catch(() => {});
            animateOpacity(1, 500);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('loadeddata', handleLoadedData);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('loadeddata', handleLoadedData);
            if (fadeAnimRef.current) cancelAnimationFrame(fadeAnimRef.current);
        };
    }, []);

    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex flex-col font-sans">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
                >
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Navigation Bar - Centered Logo Only, high up to avoid girl */}
            <nav className="relative z-20 px-6 py-8 w-full flex justify-center">
                <div className="flex items-center gap-3 text-white font-sans font-bold text-xl tracking-[0.2em] uppercase">
                    <Globe size={20} className="text-white/80" />
                    <span>Hiresense</span>
                </div>
            </nav>

            {/* Hero Content Area - Pushed even HIGHER to avoid the girl's face */}
            <div className="relative z-10 flex-1 flex flex-col items-center pt-12 px-6 text-center">
                <h1 
                    style={{ fontFamily: "'Instrument Serif', serif" }} 
                    className="italic text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight whitespace-nowrap"
                >
                    Built for the curious.
                </h1>

                <div className="max-w-xl w-full flex flex-col items-center">
                    {/* Integrated CTA: The bar is now the button */}
                    <button 
                        onClick={handleGetInside}
                        className="liquid-glass rounded-full px-2 py-2 flex items-center justify-between w-full max-w-sm border border-white/20 group hover:scale-105 transition-all duration-500 shadow-2xl"
                    >
                        <span className="pl-6 text-white/90 text-base font-medium">Get In</span>
                        <div className="bg-white rounded-full p-3 text-black group-hover:bg-gray-100 transition-colors">
                            <ArrowRight size={20} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Empty Footer to keep the bottom clear for the video content (the girl) */}
            <div className="pb-24"></div>
        </section>
    );
};

export default HeroSection;
