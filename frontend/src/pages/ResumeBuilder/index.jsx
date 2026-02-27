import React, { useState } from 'react';
import Onboarding from './Onboarding';
import TemplateSelector from './TemplateSelector';
import Editor from './Editor';

export default function ResumeBuilder() {
    const [step, setStep] = useState('onboarding'); // 'onboarding', 'templates', 'editor'
    const [resumeData, setResumeData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('professional');
    const [isExisting, setIsExisting] = useState(false);

    const handleOnboardingComplete = (mode) => {
        setIsExisting(mode === 'existing');
        setStep('templates');
    };

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
        setStep('editor');
    };

    return (
        <div className="min-h-screen">
            {step === 'onboarding' && (
                <Onboarding onComplete={handleOnboardingComplete} />
            )}
            {step === 'templates' && (
                <TemplateSelector
                    onSelect={handleTemplateSelect}
                    onBack={() => setStep('onboarding')}
                />
            )}
            {step === 'editor' && (
                <Editor
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    template={selectedTemplate}
                    isExisting={isExisting}
                    onBack={() => setStep('templates')}
                />
            )}
        </div>
    );
}
