const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// تنظیمات Multer برای ذخیره فایل‌های آپلودی
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));

// مسیر بارگذاری موزیک و ارسال پیام به تلگرام
app.post('/upload', upload.single('musicFile'), async (req, res) => {
    const musicTitle = req.body.musicTitle;
    const filePath = req.file.path;

    // اطلاعات بات تلگرام
    const telegramToken = '7901203126:AAHdctO95WMVFgZaqdS0guzrmJURuz4tS3Q';
    const telegramChatId = '6087657605';
    const message = `عنوان موزیک: ${musicTitle}`;

    try {
        // ابتدا ارسال پیام متنی با عنوان موزیک
        await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            chat_id: telegramChatId,
            text: message
        });

        // سپس ارسال فایل موزیک
        const fileStream = fs.createReadStream(filePath);
        const formData = {
            chat_id: telegramChatId,
            audio: fileStream, // ارسال فایل به‌عنوان "audio"
            caption: `موزیک: ${musicTitle}` // توضیح همراه فایل
        };

        await axios.post(`https://api.telegram.org/bot${telegramToken}/sendAudio`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        res.status(200).json({ message: 'موزیک شما با موفقیت بارگذاری شد و پیام به تلگرام ارسال شد!' });
    } catch (error) {
        res.status(500).json({ message: 'خطا در ارسال پیام به تلگرام.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.post('/upload', upload.single('musicFile'), async (req, res) => {
    console.log('Request Body:', req.body); // لاگ اطلاعات بدنه درخواست
    console.log('Uploaded File:', req.file); // لاگ اطلاعات فایل آپلود شده

    if (!req.file) {
        return res.status(400).json({ message: 'فایل موزیک پیدا نشد.' });
    }

    // ادامه کد...
});
