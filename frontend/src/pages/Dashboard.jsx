import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Brain, Video, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    const modules = [
        {
            title: "Resume Intelligence",
            description: "AI-powered analysis of your CV architecture for ATS compliance.",
            icon: <Brain className="w-10 h-10 text-indigo-600 mb-6" />,
            link: "/resume"
        },
        {
            title: "Mock Interview",
            description: "Simulated high-pressure protocols with AI-driven proctoring.",
            icon: <Video className="w-10 h-10 text-indigo-500 mb-6" />,
            link: "/mock-interview/setup"
        },
        {
            title: "Performance Metrics",
            description: "Track your trajectory with real-time telemetry and history.",
            icon: <Activity className="w-10 h-10 text-slate-600 mb-6" />,
            link: "/performance"
        }
    ];

    return (
        <div className="p-10 lg:p-20 max-w-7xl mx-auto space-y-20 pb-24 relative z-10">
            <header className="relative space-y-4">
                <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">
                    Hello, <span className="text-white/40">{user?.name?.split(' ')[0] || 'Member'}</span>.
                </h1>
                <p className="text-white/20 text-xs font-black uppercase tracking-[0.5em] pl-2">Quantum Career Telemetry Initialized</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-10">
                {modules.map((mod, index) => (
                    <div key={index} className="group relative flex flex-col items-start space-y-6">
                        <div className="relative z-10">
                            <div className="mb-8 inline-flex p-4 rounded-[2rem] bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm">
                                {React.cloneElement(mod.icon, { className: 'w-10 h-10 text-white mb-0' })}
                            </div>
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tight leading-none">{mod.title}</h3>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-sm">{mod.description}</p>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Link 
                                to={mod.link} 
                                className="px-8 py-3 bg-white text-black rounded-full text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                Get Started
                            </Link>
                            <Link 
                                to={mod.link} 
                                className="px-8 py-3 bg-white/10 text-white border border-white/10 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-md"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
