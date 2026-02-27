import React, { useState, useRef } from 'react';
import { Sparkles, FileText, PenLine, ArrowRight, UploadCloud, X, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

const Onboarding = ({ onComplete }) => {
    const [isHovered, setIsHovered] = useState(null);
    const [view, setView] = useState('selection'); // 'selection' | 'upload'

    // Upload state
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleSelect = (mode) => {
        if (mode === 'new') {
            onComplete('new', null);
        } else {
            setView('upload');
        }
    };

    const validateFile = (selectedFile) => {
        setError('');
        if (!selectedFile) return false;

        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword'
        ];

        if (!validTypes.includes(selectedFile.type)) {
            setError('Invalid format. Please upload a PDF or DOCX file.');
            return false;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File too large. Maximum size is 5MB.');
            return false;
        }

        return true;
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
            }
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await api.post('/resume/extract', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onComplete('existing', response.data.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to extract resume data. Please try again or start fresh.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    AI Resume Generation
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {view === 'selection' ? (
                        <>How would you like to <span className="text-indigo-400">start?</span></>
                    ) : (
                        <>Upload your <span className="text-indigo-400">Resume</span></>
                    )}
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    {view === 'selection'
                        ? 'Choose to upload an existing resume for our AI to revamp, or start fresh and build a new one from scratch.'
                        : 'We will securely analyze your document and extract the foundation for your new resume.'}
                </p>
            </header>

            {view === 'selection' && (
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-in fade-in duration-500">
                    <button
                        onClick={() => handleSelect('existing')}
                        onMouseEnter={() => setIsHovered('existing')}
                        onMouseLeave={() => setIsHovered(null)}
                        className="group relative bg-white border-2 border-transparent hover:border-indigo-500 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-300 text-left overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <UploadCloud className="w-32 h-32 text-indigo-600" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <UploadCloud className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Existing</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Upload your old resume. Our AI will extract your details, re-write content for impact, and fit it into a beautiful new template.
                                </p>
                            </div>

                            <div className="flex items-center text-indigo-600 font-bold text-sm">
                                Revamp my resume
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleSelect('new')}
                        onMouseEnter={() => setIsHovered('new')}
                        onMouseLeave={() => setIsHovered(null)}
                        className="group relative bg-white border-2 border-transparent hover:border-indigo-500 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-300 text-left overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <PenLine className="w-32 h-32 text-indigo-600" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <PenLine className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Start with a clean slate. Answer a few questions or chat with our AI to generate a brand new, highly optimized resume.
                                </p>
                            </div>

                            <div className="flex items-center text-indigo-600 font-bold text-sm">
                                Start from scratch
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </button>
                </div>
            )}

            {view === 'upload' && (
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
                    <button
                        onClick={() => setView('selection')}
                        className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-indigo-600 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to options
                    </button>

                    {error && (
                        <div className="mb-6 p-4 flex items-start bg-red-50 border border-red-100 text-red-600 rounded-2xl">
                            <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide">Upload Failed</h3>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    <div
                        className={`relative w-full h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${dragActive ? 'border-indigo-500 bg-indigo-50/30 scale-[1.01]' : 'border-gray-200 bg-gray-50/30 hover:bg-white hover:border-indigo-300'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                        />

                        {!file ? (
                            <>
                                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                                    <UploadCloud className="w-10 h-10 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Drop Identity Document</h3>
                                <p className="text-gray-400 mt-2 text-sm font-medium">PDF or DOCX (Max 5MB)</p>
                                <button
                                    onClick={() => inputRef.current.click()}
                                    className="mt-8 px-8 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Browse Directory
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center w-full px-8">
                                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 relative">
                                    <FileText className="w-12 h-12 text-indigo-500" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setFile(null); setError(''); }}
                                        className="absolute -top-3 -right-3 bg-white text-gray-400 border border-gray-200 rounded-full p-2 hover:text-red-500 shadow-md transition-all active:scale-90"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 truncate max-w-sm">{file.name}</h3>
                                <div className="mt-4 px-4 py-1 rounded-full bg-indigo-50 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB Ready
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 flex items-center group"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                                    Extracting Resume Data...
                                </>
                            ) : (
                                <>
                                    Proceed to Template
                                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
