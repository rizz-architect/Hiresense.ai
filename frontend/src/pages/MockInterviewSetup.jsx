import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, UserCircle, Briefcase, Play, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const MockInterviewSetup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState(null);
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('Software Engineer');
    const [type, setType] = useState('Mixed');

    useEffect(() => {
        const checkAccess = async () => {
            try {
                // Bypass access verification as requested
                setCompany('General Core');
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to initialize session. Please try again.');
                setLoading(false);
            }
        };

        checkAccess();
    }, []);

    const handleStart = () => {
        setVerifying(true);
        setTimeout(() => {
            navigate('/mock-interview/session', {
                state: { company, role, type }
            });
        }, 800);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-6" />
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Verifying Authorization...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-24 space-y-8 text-center animate-in zoom-in-95 duration-500 relative z-10">
                <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-10 backdrop-blur-md">
                    <AlertCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Access Locked.</h2>
                <p className="text-white/40 mb-12 font-medium leading-relaxed">{error}</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 transition-all active:scale-95 shadow-2xl"
                >
                    Return to Mission Control
                </button>
            </div>
        );
    }

    return (
        <div className="p-10 lg:p-20 max-w-2xl mx-auto space-y-16 pb-24 relative z-10">
            <header className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 mb-2">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Protocol Setup</span>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter leading-none">AI Proctor</h1>
                <p className="text-white/40 text-lg font-medium max-w-md">Configure your session parameters for the high-pressure assessment protocol.</p>
            </header>

            <div className="space-y-12">
                {/* Company Field (Auto-filled) */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center">
                        <Building2 className="w-4 h-4 mr-3" /> Target Environment
                    </label>
                    <input
                        type="text"
                        value={company}
                        disabled
                        className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white/40 font-black cursor-not-allowed backdrop-blur-md"
                    />
                </div>

                {/* Role Dropdown */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center">
                        <UserCircle className="w-4 h-4 mr-3" /> Persona Alignment
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-[2rem] text-white font-black focus:border-white focus:bg-white/20 outline-none transition-all shadow-2xl backdrop-blur-xl appearance-none"
                    >
                        <option value="Software Engineer" className="bg-black text-white">Software Engineer</option>
                        <option value="Data Analyst" className="bg-black text-white">Data Analyst</option>
                        <option value="Backend Developer" className="bg-black text-white">Backend Developer</option>
                        <option value="Frontend Developer" className="bg-black text-white">Frontend Developer</option>
                    </select>
                </div>

                {/* Interview Type */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Protocol Mode</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['General Technical', 'Behavioral', 'Mixed'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`px-6 py-4 rounded-full border text-[10px] font-black transition-all uppercase tracking-[0.2em] backdrop-blur-md ${type === t
                                    ? 'bg-white border-white text-black shadow-2xl scale-105'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-white/10">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Intensity Matrix</span>
                        <span className="text-sm font-black text-white">5 QUESTIONS • 15 MINS</span>
                    </div>
                    <button
                        onClick={handleStart}
                        disabled={verifying}
                        className="px-16 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 disabled:opacity-50 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center group"
                    >
                        {verifying ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                Synchronizing...
                            </>
                        ) : (
                            <>
                                Begin Session
                                <Play className="w-4 h-4 ml-4 fill-current" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockInterviewSetup;
