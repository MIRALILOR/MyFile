const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express(); // تعریف app
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

    // ارسال پیام به تلگرام
    const telegramToken = '7901203126:AAHdctO95WMVFgZaqdS0guzrmJURuz4tS3Q';
    const telegramChatId = '6087657605';
    const message = `عنوان موزیک: ${musicTitle}`;

    try {
        await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            chat_id: telegramChatId,
            text: message
        });
        res.status(200).json({ message: 'موزیک شما با موفقیت بارگذاری شد و پیام به تلگرام ارسال شد!' });
    } catch (error) {
        res.status(500).json({ message: 'خطا در ارسال پیام به تلگرام.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
