const express = require('express');
const router = express.Router();
const multer = require('multer');
const supabase = require('../config/supabase'); // Import Supabase client

// Use memory storage to keep file in buffer before uploading to Supabase
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

const uploadToSupabase = async (file, bucketName, filePath) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });

    if (error) throw error;
    return data;
};

router.post('/flights', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileName = `${Date.now()}_${req.file.originalname}`;
        const filePath = `flights/${fileName}`;

        await uploadToSupabase(req.file, 'raw-files', filePath);

        // Trigger logic? For now, just confirm upload.
        // In real migration, we might trigger a Supabase Function or webhook here.
        // User asked for "Logic ... via Webhooks ... for heavy post processing".
        // Use Supabase Webhooks on Storage Upload is possible, or on Database Insert.
        // Since we are just uploading here, users might want to trigger a process.
        // For migration scope, ensuring file is in Supabase Storage is key.

        res.json({ success: true, message: "File uploaded to Supabase Storage", path: filePath });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/swaps', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const filePath = `swaps/${Date.now()}_${req.file.originalname}`;
        await uploadToSupabase(req.file, 'raw-files', filePath);
        res.json({ success: true, message: "File uploaded to Supabase Storage", path: filePath });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/crew', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const filePath = `crew/${Date.now()}_${req.file.originalname}`;
        await uploadToSupabase(req.file, 'raw-files', filePath);
        res.json({ success: true, message: "File uploaded to Supabase Storage", path: filePath });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/status/:jobId', (req, res) => res.json({ message: "Check status endpoint (Not implemented for Supabase yet)" }));

module.exports = router;
