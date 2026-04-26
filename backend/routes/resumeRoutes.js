const express = require('express');
const multer = require('multer');
const { uploadResume, extractResumeData } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for memory storage (Vercel compatible)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and DOCX files are allowed. Legacy .doc is not supported.'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter
});

// Apply multer middleware
const uploadMiddleware = (req, res, next) => {
    const uploader = upload.single('resume');
    uploader(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

// Routes
router.post('/upload', protect, uploadMiddleware, uploadResume);
router.post('/extract', protect, uploadMiddleware, extractResumeData);

module.exports = router;
