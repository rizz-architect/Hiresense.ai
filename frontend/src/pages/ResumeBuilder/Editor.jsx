import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Trash2, Wand2, Download, Save, MessageSquareMore, UploadCloud, Image as ImageIcon, Sparkles } from 'lucide-react';
import Professional from '../../components/Resume/Templates/Professional';

const Editor = ({ resumeData, setResumeData, template, isExisting, onBack }) => {
    // Initialize state with provided data or empty defaults
    const [data, setData] = useState({
        name: '', role: '', email: '', phone: '', location: '', linkedin: '',
        profileImage: '',
        summary: '',
        experience: [],
        education: [],
        skills: [],
        certificates: []
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (resumeData) {
            // Merge existing data structure with our default shape
            setData(prev => ({ ...prev, ...resumeData }));
        }
    }, [resumeData]);

    // Input handlers
    const handleChange = (field, value) => {
        const newData = { ...data, [field]: value };
        setData(newData);
        setResumeData(newData);
    };

    const handleArrayChange = (field, index, subfield, value) => {
        const newArray = [...(data[field] || [])];
        if (subfield) {
            newArray[index] = { ...newArray[index], [subfield]: value };
        } else {
            newArray[index] = value;
        }
        handleChange(field, newArray);
    };

    const addArrayItem = (field, emptyItem) => {
        handleChange(field, [...(data[field] || []), emptyItem]);
    };

    const removeArrayItem = (field, index) => {
        handleChange(field, (data[field] || []).filter((_, i) => i !== index));
    };

    const handleImageUpload = (e, field, index = null) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (index !== null) {
                handleArrayChange('certificates', index, 'image', url);
            } else {
                handleChange(field, url);
            }
        }
    };

    return (
        <div className="flex h-screen bg-[#030303] overflow-hidden font-sans relative z-20">
            {/* Left Panel: Editor Form */}
            <div className="w-[55%] flex flex-col bg-white border-r border-gray-200 shadow-xl z-10 relative">

                {/* Header */}
                <header className="px-8 py-5 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900">Resume Studio</h1>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Live Editing Session</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center px-4 py-2 text-sm font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors group">
                            <Wand2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                            Re-build with AI
                        </button>
                    </div>
                </header>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 pb-32">

                    {/* Basic Info */}
                    <section>
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                            <span className="w-6 border-t border-gray-200 mr-4"></span>
                            Identity Protocol
                        </h2>

                        <div className="mb-6 flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {data.profileImage ? (
                                    <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-indigo-500" />
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <UploadCloud className="w-6 h-6 text-white" />
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Profile Photo</h3>
                                <p className="text-xs text-gray-500 font-medium mt-1">Upload a professional headshot. Recommended size 400x400px.</p>
                                {data.profileImage && (
                                    <button onClick={(e) => { e.stopPropagation(); handleChange('profileImage', ''); }} className="text-xs text-red-500 font-bold mt-2 hover:underline">Remove Photo</button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                                <input type="text" value={data.name || ''} onChange={e => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium transition-all" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Role</label>
                                <input type="text" value={data.role || ''} onChange={e => handleChange('role', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium transition-all" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                <input type="email" value={data.email || ''} onChange={e => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium transition-all" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone</label>
                                <input type="text" value={data.phone || ''} onChange={e => handleChange('phone', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium transition-all" />
                            </div>
                        </div>
                    </section>

                    {/* Summary */}
                    <section>
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                            <span className="w-6 border-t border-gray-200 mr-4"></span>
                            Executive Summary
                        </h2>
                        <textarea rows="4" value={data.summary || ''} onChange={e => handleChange('summary', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium transition-all resize-none"
                            placeholder="Write a brief professional summary..." />
                    </section>

                    {/* Experience */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                                <span className="w-6 border-t border-gray-200 mr-4"></span>
                                Experience Flow
                            </h2>
                            <button onClick={() => addArrayItem('experience', { title: '', company: '', duration: '', description: '' })}
                                className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 flex items-center">
                                <Plus className="w-3 h-3 mr-1" /> Add Role
                            </button>
                        </div>

                        <div className="space-y-6">
                            {(data.experience || []).map((exp, idx) => (
                                <div key={idx} className="p-6 bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl relative group">
                                    <button onClick={() => removeArrayItem('experience', idx)}
                                        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <input type="text" placeholder="Job Title" value={exp.title || ''} onChange={e => handleArrayChange('experience', idx, 'title', e.target.value)}
                                            className="col-span-2 sm:col-span-1 px-4 py-2.5 rounded-xl bg-gray-50/50 border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-indigo-500 text-sm font-bold" />
                                        <input type="text" placeholder="Company Name" value={exp.company || ''} onChange={e => handleArrayChange('experience', idx, 'company', e.target.value)}
                                            className="col-span-2 sm:col-span-1 px-4 py-2.5 rounded-xl bg-gray-50/50 border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-indigo-500 text-sm font-bold" />
                                        <input type="text" placeholder="Duration (e.g. 2020 - Present)" value={exp.duration || ''} onChange={e => handleArrayChange('experience', idx, 'duration', e.target.value)}
                                            className="col-span-2 px-4 py-2.5 rounded-xl bg-gray-50/50 border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-indigo-500 text-sm font-bold" />
                                    </div>
                                    <textarea rows="3" placeholder="Describe responsibilities (Markdown/Bullets supported later)" value={exp.description || ''} onChange={e => handleArrayChange('experience', idx, 'description', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-indigo-500 text-sm font-medium resize-none text-gray-600" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certificates & Media */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                                <span className="w-6 border-t border-gray-200 mr-4"></span>
                                Certifications & Media
                            </h2>
                            <button onClick={() => addArrayItem('certificates', { name: '', issuer: '', image: '' })}
                                className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 flex items-center">
                                <Plus className="w-3 h-3 mr-1" /> Add Certificate
                            </button>
                        </div>

                        <div className="space-y-6">
                            {(data.certificates || []).map((cert, idx) => (
                                <div key={idx} className="p-6 bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl relative group flex gap-6">
                                    <button onClick={() => removeArrayItem('certificates', idx)}
                                        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 z-10">
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    {/* Cert Image Uploader */}
                                    <div className="w-32 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden group/image cursor-pointer hover:border-indigo-400 transition-colors">
                                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" onChange={(e) => handleImageUpload(e, 'certificates', idx)} />
                                        {cert.image ? (
                                            <img src={cert.image} alt="Certificate" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center">
                                                <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1 group-hover/image:text-indigo-500" />
                                                <span className="text-[10px] font-bold text-gray-400">Upload Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Cert Details */}
                                    <div className="flex-1 space-y-3">
                                        <input type="text" placeholder="Certificate Name (e.g. AWS Certified Developer)" value={cert.name || ''} onChange={e => handleArrayChange('certificates', idx, 'name', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50/50 border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-indigo-500 text-sm font-bold" />
                                        <input type="text" placeholder="Issuing Organization (e.g. Amazon Web Services)" value={cert.issuer || ''} onChange={e => handleArrayChange('certificates', idx, 'issuer', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50/50 border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-indigo-500 text-sm font-bold" />
                                    </div>
                                </div>
                            ))}
                            {(!data.certificates || data.certificates.length === 0) && (
                                <div className="text-center p-8 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <p className="text-sm font-medium text-gray-400">No certificates added yet. Showcase your specialized skills to stand out.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* AI Chat Widget Toggle */}
                <div className="absolute bottom-6 left-8 z-30">
                    <button className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-indigo-500/50 transition-all duration-300 relative group">
                        <MessageSquareMore className="w-6 h-6" />
                        <span className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                            Chat with Retell AI
                            <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 justify-center flex items-center bg-gray-900 transform rotate-45"></div>
                        </span>
                        <div className="absolute inset-0 rounded-full border-2 border-indigo-400 opacity-0 group-hover:animate-ping"></div>
                    </button>
                </div>
            </div>

            {/* Right Panel: Live Preview */}
            <div className="flex-1 bg-slate-100 overflow-hidden relative flex flex-col">
                <div className="absolute top-4 right-6 z-20 flex gap-2">
                    <button className="flex items-center px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Export PDF
                    </button>
                    <button className="flex items-center px-4 py-2 text-xs font-bold text-white bg-green-600 border border-transparent rounded-lg shadow-md shadow-green-200 hover:bg-green-700 transition-colors">
                        <Sparkles className="w-3.5 h-3.5 mr-2" />
                        Check CTC Score
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                    {/* A4 Paper Scaler Container */}
                    <div className="w-full max-w-[850px] transition-all transform origin-top shadow-2xl ring-1 ring-black/5 rounded-sm" style={{ aspectRatio: '1 / 1.414' }}>
                        {template === 'professional' ? (
                            <Professional data={data} />
                        ) : (
                            <div className="w-full h-full bg-white flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-200">
                                Template Not Configured Yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
