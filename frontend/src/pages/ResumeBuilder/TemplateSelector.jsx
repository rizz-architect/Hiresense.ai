import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Palette, Layout } from 'lucide-react';

const templates = [
    {
        id: 'professional',
        name: 'Executive Elite',
        description: 'Clean, ATS-friendly structure perfect for corporate roles and senior positions.',
        preview: 'bg-slate-100', // We can replace these with actual img urls later
        tags: ['ATS-Optimized', 'Corporate', 'Traditional']
    },
    {
        id: 'creative',
        name: 'Creative Studio',
        description: 'Bold typography and dynamic layouts to help your portfolio stand out.',
        preview: 'bg-indigo-100',
        tags: ['Design', 'Modern', 'Portfolio']
    },
    {
        id: 'minimalist',
        name: 'Scandinavian Minimal',
        description: 'Focus purely on content with extremely generous whitespace and elegant fonts.',
        preview: 'bg-stone-100',
        tags: ['Clean', 'Tech', 'Simple']
    }
];

const TemplateSelector = ({ onSelect, onBack }) => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="max-w-7xl mx-auto pt-12 pb-16 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div>
                    <button
                        onClick={onBack}
                        className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-indigo-600 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Start
                    </button>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Select your Template</h1>
                    <p className="text-gray-400 mt-2 font-medium">Choose a foundation. You can easily switch this later in the editor.</p>
                </div>

                <button
                    onClick={() => selectedId && onSelect(selectedId)}
                    disabled={!selectedId}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    Continue to Editor
                    <ChevronRight className="w-4 h-4 ml-2" />
                </button>
            </div>

            {/* Template Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => setSelectedId(template.id)}
                        className={`group relative bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${selectedId === template.id
                            ? 'border-indigo-600 shadow-[0_8px_30px_rgba(99,102,241,0.15)] ring-4 ring-indigo-50'
                            : 'border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
                            }`}
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-20">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${selectedId === template.id ? 'bg-indigo-600 text-white scale-100 shadow-lg' : 'bg-white/80 text-transparent scale-90 opacity-0 group-hover:opacity-100'
                                }`}>
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Preview Skeleton/Image Area */}
                        <div className={`w-full relative overflow-hidden ${template.preview}`} style={{ aspectRatio: '1 / 1.414' }}>
                            {/* Decorative elements representing a resume */}
                            <div className="absolute inset-x-8 top-8 bottom-8 flex flex-col gap-4 opacity-50">
                                <div className="h-8 bg-black/10 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-black/5 rounded w-3/4"></div>
                                <div className="h-4 bg-black/5 rounded w-full"></div>
                                <div className="h-4 bg-black/5 rounded w-5/6"></div>
                                <div className="mt-8 space-y-4">
                                    <div className="h-6 bg-black/10 rounded w-1/4"></div>
                                    <div className="h-4 bg-black/5 rounded w-full"></div>
                                    <div className="h-4 bg-black/5 rounded w-full"></div>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${selectedId === template.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                                }`}>
                                <span className="bg-white text-white px-6 py-2 rounded-full font-bold text-sm flex items-center shadow-xl">
                                    <Layout className="w-4 h-4 mr-2 text-indigo-600" />
                                    Preview Layout
                                </span>
                            </div>
                        </div>

                        {/* Template Info */}
                        <div className="p-6 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                {template.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] uppercase font-black tracking-wider rounded-md border border-gray-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{template.name}</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{template.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
