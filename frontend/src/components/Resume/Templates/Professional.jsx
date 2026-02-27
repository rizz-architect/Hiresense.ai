import React from 'react';

const Professional = ({ data }) => {
    // data contains: name, role, email, phone, location, summary, experience, education, skills
    if (!data) return <div className="p-8 text-center text-gray-400">Loading template data...</div>;

    return (
        <div className="bg-white w-full h-full p-8 md:p-12 text-gray-800 shadow-xl overflow-y-auto font-sans leading-relaxed flex flex-col gap-6" style={{ aspectRatio: '1 / 1.414' }}>
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-2 flex items-center gap-6">
                {data.profileImage && (
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                        <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className={data.profileImage ? 'text-left' : 'text-center w-full'}>
                    <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">
                        {data.name || 'Your Name'}
                    </h1>
                    <p className="text-lg text-indigo-700 font-semibold mb-3">
                        {data.role || 'Your Professional Title'}
                    </p>
                    <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 font-medium ${data.profileImage ? 'justify-start' : 'justify-center'}`}>
                        {data.email && <span>{data.email}</span>}
                        {data.phone && <span>• {data.phone}</span>}
                        {data.location && <span>• {data.location}</span>}
                        {data.linkedin && <span>• {data.linkedin}</span>}
                    </div>
                </div>
            </header>

            {/* Summary */}
            {data.summary && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
                    <p className="text-xs text-gray-700 leading-relaxed text-justify">
                        {data.summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">Experience</h2>
                <div className="space-y-4">
                    {(data.experience || []).map((exp, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xs font-bold text-gray-900">{exp.title || 'Job Title'}</h3>
                                <span className="text-[10px] text-gray-500 font-bold">{exp.duration || 'Date - Date'}</span>
                            </div>
                            <div className="text-[11px] text-indigo-700 font-bold mb-1.5">{exp.company || 'Company Name'}</div>
                            <p className="text-xs text-gray-700 leading-relaxed text-justify">
                                {exp.description || 'Describe your responsibilities and achievements.'}
                            </p>
                        </div>
                    ))}
                    {(!data.experience || data.experience.length === 0) && (
                        <div className="text-xs text-gray-400 italic">No experience added yet.</div>
                    )}
                </div>
            </section>

            {/* Education */}
            <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">Education</h2>
                <div className="space-y-3">
                    {(data.education || []).map((edu, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xs font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                                <span className="text-[10px] text-gray-500 font-bold">{edu.year || 'Year'}</span>
                            </div>
                            <div className="text-[11px] text-gray-700">{edu.institution || 'Institution Name'}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">Core Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {(data.skills || []).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-sm border border-gray-200 font-medium">
                            {skill}
                        </span>
                    ))}
                    {(!data.skills || data.skills.length === 0) && (
                        <span className="text-xs text-gray-400 italic">No skills added yet.</span>
                    )}
                </div>
            </section>

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">Certifications</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {data.certificates.map((cert, idx) => (
                            <div key={idx} className="flex gap-3 items-center">
                                {cert.image && (
                                    <div className="w-12 h-12 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
                                        <img src={cert.image} alt="Certificate" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <div className="text-xs font-bold text-gray-900">{cert.name || 'Certificate Name'}</div>
                                    <div className="text-[10px] text-gray-500">{cert.issuer || 'Issuer Name'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Professional;
