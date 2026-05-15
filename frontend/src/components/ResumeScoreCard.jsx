import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, TrendingUp, AlertTriangle, Building2, Target, Zap } from 'lucide-react';

const ProgressBar = ({ label, score, colorClass }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
            <span className={`text-xs font-bold ${colorClass}`}>{score}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
                className={`h-full transition-all duration-1000 ease-out rounded-full ${colorClass.replace('text-', 'bg-')}`}
                style={{ width: `${score}%` }}
            />
        </div>
    </div>
);

const ResumeScoreCard = ({ score, analysis, summary }) => {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = score;
        if (start === end) {
            setDisplayScore(end);
            return;
        }

        let totalDuration = 1500;
        let incrementTime = Math.max(totalDuration / end, 10);

        let timer = setInterval(() => {
            start += 1;
            setDisplayScore(start);
            if (start >= end) {
                setDisplayScore(end);
                clearInterval(timer);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [score]);

    if (!analysis) return null;

    const { 
        categories = {}, 
        strengths = [], 
        deductions = [], 
        personalizedEdits = [],
        checks = [],
        weaknesses = [] // Fallback for old data
    } = analysis;

    const displayDeductions = deductions.length > 0 ? deductions : weaknesses.map(w => ({ reason: w.area, pointsLost: 10, fix: w.fix }));

    return (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header / Score Overview */}
            <div className="grid md:grid-cols-3 gap-16 items-start">
                {/* Score Column */}
                <div className="flex flex-col items-center text-center space-y-10">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="fill-none stroke-white/5 stroke-[8]"
                            />
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="fill-none stroke-white stroke-[8] transition-all duration-1000 ease-out"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * displayScore) / 100}
                                strokeLinecap="round"
                            />
                        </svg>

                        <div className="relative z-10 flex flex-col">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">Impact Score</span>
                            <div className="flex items-end justify-center">
                                <span className="text-8xl font-black text-white tracking-tighter leading-none">{displayScore}</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-8 pt-10 border-t border-white/10">
                        <ProgressBar label="Content Quality" score={categories.content || 0} colorClass="text-white" />
                        <ProgressBar label="ATS Essentials" score={categories.ats || 0} colorClass="text-white/60" />
                        <ProgressBar label="Industry Alignment" score={analysis.industryAlignment || 0} colorClass="text-white/40" />
                    </div>
                </div>

                {/* Summary Column */}
                <div className="md:col-span-2 space-y-16 flex flex-col">
                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-[0.3em] uppercase">
                            Executive Audit Summary
                        </div>
                        <p className="text-white text-4xl font-black leading-tight tracking-tight">{summary}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-10 border-t border-white/10">
                        <div className="group">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md"><TrendingUp className="w-6 h-6 text-white" /></div>
                                <h4 className="font-black uppercase text-sm tracking-[0.3em] text-white">Core Strengths</h4>
                            </div>
                            <ul className="space-y-6">
                                {strengths.slice(0, 3).map((s, i) => (
                                    <li key={i} className="flex items-start text-lg text-white/60 font-medium leading-tight">
                                        <CheckCircle2 className="w-5 h-5 text-white mr-4 shrink-0 mt-1" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="group">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-rose-500/10 rounded-2xl backdrop-blur-md"><Zap className="w-6 h-6 text-rose-500" /></div>
                                <h4 className="font-black uppercase text-sm tracking-[0.3em] text-white">Score Deductions</h4>
                            </div>
                            <ul className="space-y-8">
                                {displayDeductions.slice(0, 3).map((d, i) => (
                                    <li key={i} className="flex flex-col text-lg text-white/60 font-medium leading-tight">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-start">
                                                <XCircle className="w-5 h-5 text-rose-500 mr-4 shrink-0 mt-1" />
                                                <span className="text-white font-black">{d.reason}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-2 py-1 rounded">-{d.pointsLost}</span>
                                        </div>
                                        <p className="ml-9 text-sm opacity-50 italic">Fix: {d.fix}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personalized Edits Section */}
            {personalizedEdits.length > 0 && (
                <div className="space-y-16 pt-24 border-t border-white/10">
                    <div className="flex items-center space-x-6">
                        <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white tracking-tight">Personalized Transformation</h3>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Industrial Grade Edits</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {personalizedEdits.map((edit, i) => (
                            <div key={i} className="group grid md:grid-cols-2 gap-8 items-stretch">
                                <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Current Version</span>
                                    <p className="text-xl font-medium text-white/60 italic leading-relaxed">"{edit.originalText}"</p>
                                </div>
                                <div className="p-10 bg-white/10 border border-white/40 rounded-[3rem] space-y-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute top-0 right-0 p-6 opacity-20"><Zap className="w-12 h-12 text-white" /></div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Hiresense Optimized</span>
                                    <p className="text-xl font-black text-white leading-relaxed">"{edit.suggestedEdit}"</p>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Why this works</p>
                                        <p className="text-sm text-white/60 mt-2">{edit.why}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Detailed Checks Grid */}
            <div className="space-y-16 pt-24 border-t border-white/10">
                <div className="flex items-center space-x-6">
                    <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-4xl font-black text-white tracking-tight">Compliance Audit</h3>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Multi-Vector Analysis</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {checks.map((check, i) => (
                        <div key={i} className="space-y-6 group">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{check.name}</span>
                                {check.passed ? (
                                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                                ) : (
                                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                )}
                            </div>
                            <p className="text-xl font-black text-white leading-tight">{check.feedback}</p>
                            <div className="pt-6 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs text-white/60 font-medium leading-relaxed italic">{check.companyExpectation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeScoreCard;
