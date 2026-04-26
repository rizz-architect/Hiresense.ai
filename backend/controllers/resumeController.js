const Resume = require('../models/Resume');
const resumeService = require('../services/resumeService');
const fs = require('fs');

const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded or invalid format' });
        }

        const userId = req.user._id;
        const fileBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;
        const originalFileName = req.file.originalname;
 
        // Extract text
        const extractedText = await resumeService.extractTextFromFile(fileBuffer, mimeType);
 
        // Analyze resume (AI Scoring) - Pass fileData for multimodal (image) support
        const analysisResults = await resumeService.analyzeResume(extractedText, {
            buffer: fileBuffer,
            mimeType: mimeType
        });

        // Save to DB (Only if connected)
        const mongoose = require('mongoose');
        let resume;
        const isDbConnected = mongoose.connection.readyState === 1;

        if (isDbConnected) {
            resume = await Resume.create({
                userId,
                originalFileName,
                extractedText,
                score: analysisResults.score,
                analysis: analysisResults.detailedAnalysis
            });
        } else {
            console.warn('Resume Upload: Database OFFLINE. Returning transient analysis results.');
            resume = {
                userId,
                originalFileName,
                extractedText,
                score: analysisResults.score,
                analysis: analysisResults.detailedAnalysis,
                _doc: {
                    userId,
                    originalFileName,
                    score: analysisResults.score,
                    analysis: analysisResults.detailedAnalysis,
                    createdAt: new Date().toISOString()
                }
            };
        }

        // No temp file to delete (Memory Storage)

        res.status(201).json({
            success: true,
            message: isDbConnected ? 'Resume uploaded and analyzed successfully.' : 'Resume analyzed efficiently (Guest Mode).',
            data: {
                ...(resume._doc || resume),
                summary: analysisResults.summary
            }
        });

    } catch (error) {
        next(error);
    }
};

const extractResumeData = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded or invalid format' });
        }

        const fileBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;
 
        // Extract text
        const extractedText = await resumeService.extractTextFromFile(fileBuffer, mimeType);
 
        // Extract structured data using AI
        const structuredData = await resumeService.extractStructuredData(extractedText);
 
        res.status(200).json({
            success: true,
            data: structuredData
        });
 
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadResume,
    extractResumeData
};
