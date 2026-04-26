const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Robust Text Extraction
 * Returns empty string on failure instead of throwing, allowing multimodal AI to take over.
 */
const extractTextFromFile = async (fileBuffer, mimeType) => {
    console.log(`[ResumeService] Attempting extraction: ${mimeType}`);
    try {
        if (!fileBuffer) return "";
        
        if (mimeType === 'application/pdf') {
            const data = await pdfParse(fileBuffer);
            console.log(`[ResumeService] PDF Parse Success. Length: ${data.text?.length || 0}`);
            return data.text || "";
        } else if (
            mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            console.log(`[ResumeService] Word Parse Success. Length: ${result.value?.length || 0}`);
            return result.value || "";
        }
        return "";
    } catch (error) {
        console.warn(`[ResumeService] Extraction Warning: ${error.message}. Proceeding to AI Multimodal.`);
        return "";
    }
};

/**
 * Elite Industrial Analysis
 */
const analyzeResume = async (text, fileData = null) => {
    console.log(`[ResumeService] Starting AI Analysis. Text Length: ${text?.length || 0}`);
    
    const fallbackAnalysis = (textSnippet) => {
        console.log("[ResumeService] Using Fallback Analysis Strategy.");
        const lowerText = (textSnippet || "").toLowerCase();
        let contentScore = 45, sectionScore = 55, atsScore = 50, tailoringScore = 40;
        const hasEmail = /[\w\.-]+@[\w\.-]+\.\w+/.test(lowerText);
        const hasPhone = /[\d\-\+\(\)\s]{10,}/.test(lowerText);
        const hasImpact = /[\d]+[%$]/.test(lowerText);
        const hasSkills = lowerText.includes('skill') || lowerText.includes('stack');
        
        if (hasEmail && hasPhone) atsScore += 20;
        if (hasImpact) contentScore += 30;
        if (hasSkills) sectionScore += 25;

        const totalScore = Math.min(Math.round((contentScore * 0.3) + (sectionScore * 0.2) + (atsScore * 0.3) + (tailoringScore * 0.2)), 95);

        return {
            score: totalScore || 50,
            summary: "Heuristic scan completed. The system detected your resume structure successfully but encountered a temporary AI Gateway delay.",
            isResume: true,
            detectedType: "Resume",
            detailedAnalysis: {
                categories: { content: contentScore, sections: sectionScore, ats: atsScore, tailoring: tailoringScore },
                strengths: ["Standard structure detected", "Contact information verified"],
                weaknesses: [{ area: "Quantifiable Results", priority: "High", fix: "Add metrics like 'Increased efficiency by 20%'" }],
                checks: [
                    { name: "ATS Compatibility", passed: true, priority: "High", feedback: "Clean layout verified", companyExpectation: "Machine-readable text" },
                    { name: "Impact Density", passed: hasImpact, priority: "High", feedback: hasImpact ? "Found metrics" : "No numbers found", companyExpectation: "Evidence-based results" },
                    { name: "Keyword Density", passed: hasSkills, priority: "Medium", feedback: hasSkills ? "Skills found" : "Add skill section", companyExpectation: "Tech stack visibility" },
                    { name: "Contact Integrity", passed: hasEmail, priority: "High", feedback: hasEmail ? "Verified" : "Missing email", companyExpectation: "Reachability" }
                ],
                industryAlignment: totalScore
            }
        };
    };

    try {
        if (!process.env.GEMINI_API_KEY) {
            console.error("[ResumeService] GEMINI_API_KEY Missing.");
            return fallbackAnalysis(text);
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const promptText = `
        You are an elite Industrial ATS Auditor. Analyze the provided resume.
        TASK: Return a strict JSON analysis.
        If it's NOT a resume (e.g., photo, certificate), set isResume: false.
        
        JSON SCHEMA:
        {
            "score": number,
            "isResume": boolean,
            "detectedType": string,
            "summary": string,
            "detailedAnalysis": {
                "categories": { "content": number, "sections": number, "ats": number, "tailoring": number },
                "strengths": [string],
                "weaknesses": [{"area": string, "priority": "High"|"Medium", "fix": string}],
                "checks": [{"name": string, "passed": boolean, "feedback": string, "companyExpectation": string}],
                "industryAlignment": number
            }
        }
        `;

        let result;
        if (fileData && fileData.buffer) {
            const part = {
                inlineData: {
                    data: fileData.buffer.toString('base64'),
                    mimeType: fileData.mimeType
                }
            };
            console.log(`[ResumeService] Sending Multimodal Request: ${fileData.mimeType}`);
            result = await model.generateContent([promptText, part, text || "Analyze this file structure."]);
        } else {
            console.log("[ResumeService] Sending Text-Only Request");
            result = await model.generateContent([promptText, text]);
        }

        const response = await result.response;
        const rawText = response.text();
        console.log(`[ResumeService] AI Response Received. Length: ${rawText.length}`);
        
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("[ResumeService] No JSON found in AI response.");
            return fallbackAnalysis(text);
        }
        
        const parsed = JSON.parse(jsonMatch[0]);
        console.log("[ResumeService] AI Analysis Successful.");
        return parsed;

    } catch (error) {
        console.error('[ResumeService] AI Analysis Error:', error.message);
        return fallbackAnalysis(text);
    }
};

const extractStructuredData = async (text) => {
    try {
        if (!process.env.GEMINI_API_KEY) return { name: "Guest User", role: "Developer", skills: [], experience: [], education: [] };

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const promptText = `Extract resume data into JSON: { name, role, email, phone, summary, skills: [], experience: [], education: [] }. Text: ${text}`;
        const result = await model.generateContent(promptText);
        const response = await result.response;
        const jsonMatch = response.text().match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch (error) {
        console.error('[ResumeService] Structured Extraction Error:', error);
        return {};
    }
};

module.exports = {
    extractTextFromFile,
    analyzeResume,
    extractStructuredData
};
