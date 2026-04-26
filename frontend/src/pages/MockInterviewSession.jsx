import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, MessageSquare, ArrowRight, XCircle, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

const MOCK_QUESTIONS = [
    "Can you elaborate on a challenging technical project you've orchestrated, highlighting your specific contributions to the outcome?",
    "How do you prioritize your tasks when you're working under pressure with tight deadlines?",
    "Describe a time you had a conflict with a teammate. How did you resolve it?",
    "What is your approach to learning new technologies or frameworks you're unfamiliar with?",
    "Why are you interested in this role and what makes you a unique candidate for our team?"
];

const MockInterviewSession = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { company, role, type } = location.state || { company: 'General', role: 'Software Engineer', type: 'Mixed' };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500); // 25:00 in seconds

    const handleNext = () => {
        if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setAnswer('');
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="max-w-4xl mx-auto mt-24 space-y-16 text-center animate-in zoom-in-95 duration-700 relative z-10">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-10 backdrop-blur-md border border-white/20">
                    <Award className="w-16 h-16 text-white" />
                </div>
                <div className="space-y-6">
                    <h2 className="text-7xl font-black text-white mb-4 tracking-tighter leading-none">Complete.</h2>
                    <p className="text-white/40 text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                        You have successfully navigated the <span className="text-white font-bold">{company}</span> assessment protocol. Your neural synthesis has been synchronized.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-10 border-t border-white/10">
                    <div className="space-y-2">
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Status</div>
                        <div className="text-white text-3xl font-black">SYNCHRONIZED</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Evaluation</div>
                        <div className="text-white text-3xl font-black">PENDING...</div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-16 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 transition-all active:scale-95 shadow-2xl flex items-center justify-center mx-auto"
                >
                    Return to Mission Control
                    <CheckCircle2 className="w-4 h-4 ml-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="p-10 lg:p-20 max-w-7xl mx-auto space-y-16 pb-24 relative z-10">
            {/* Minimalist Header */}
            <header className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-white/10">
                <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white font-black text-3xl backdrop-blur-md">
                        {company.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <h2 className="text-3xl font-black text-white tracking-tighter">{company}</h2>
                            <ShieldCheck className="w-5 h-5 text-white/40" />
                        </div>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">{role} • {type} PROTOCOL</p>
                    </div>
                </div>

                <div className="flex items-center space-x-12 mt-8 sm:mt-0">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Time Remaining</span>
                        <div className="flex items-center text-white bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 font-mono font-black text-xl">
                            <Timer className="w-5 h-5 mr-4 text-white" />
                            25:00
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-3 text-white/20 hover:text-white transition-all active:scale-90"
                        title="Quit Protocol"
                    >
                        <XCircle className="w-10 h-10" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Question Panel */}
                <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}</span>
                            </div>
                            <div className="flex gap-2">
                                {MOCK_QUESTIONS.map((_, n) => (
                                    <div key={n} className={`w-12 h-1 rounded-full transition-all duration-700 ${n === currentQuestionIndex ? 'bg-white scale-y-150' : n < currentQuestionIndex ? 'bg-white/40' : 'bg-white/5'}`}></div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
                            {MOCK_QUESTIONS[currentQuestionIndex]}
                        </h3>

                        <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md flex items-start space-x-8">
                            <div className="text-4xl">💡</div>
                            <div className="space-y-4">
                                <p className="font-black text-[10px] text-white/20 uppercase tracking-[0.4em]">Strategic recommendation</p>
                                <p className="text-white/60 text-lg font-medium leading-relaxed">
                                    Apply the <span className="text-white font-black">STAR Method</span> to maximize cognitive clarity and professional impact in your response.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Answer Input */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="flex flex-col space-y-6">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Neural Response Input</label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full p-10 bg-white/10 border border-white/20 rounded-[3rem] text-white font-medium placeholder:text-white/10 outline-none focus:bg-white/[0.15] focus:border-white/40 min-h-[450px] resize-none transition-all shadow-2xl text-xl leading-relaxed backdrop-blur-xl"
                            placeholder="Type your strategic response here..."
                        ></textarea>

                        <div className="pt-6 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Sync Threshold</span>
                                <span className="text-sm font-black text-white">{answer.length} / 500 CHARS</span>
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={!answer.trim()}
                                className="px-12 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 disabled:opacity-50 transition-all shadow-2xl flex items-center group"
                            >
                                {currentQuestionIndex === MOCK_QUESTIONS.length - 1 ? 'Finish Protocol' : 'Next Question'}
                                <ArrowRight className="w-4 h-4 ml-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md flex items-center space-x-6 group">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10b981]"></div>
                        <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">
                            Video/Biometric acquisition suspended to maintain data integrity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockInterviewSession;
