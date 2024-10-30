const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// تنظیمات Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // اضافه کردن timestamp به نام فایل
    }
});

const upload = multer({ storage: storage });

// تنظیمات ارسال ایمیل
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codshadow.official@gmail.com', // آدرس ایمیل خود را اینجا وارد کنید
        pass: 'amirali.2086' // رمز عبور ایمیل خود را اینجا وارد کنید
    }
});

// میدل‌ویر برای سرو کردن فایل‌های استاتیک
app.use(express.static('public'));

// مسیر بارگذاری موزیک
app.post('/upload', upload.single('musicFile'), (req, res) => {
    const musicTitle = req.body.musicTitle;
    const filePath = req.file.path;

    // ارسال ایمیل به شما برای بررسی موزیک
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com', // آدرس ایمیل شما
        subject: 'موزیک جدید بارگذاری شده',
        text: `عنوان موزیک: ${musicTitle}\nفایل موزیک: ${filePath}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'خطا در ارسال ایمیل.' });
        }
        res.status(200).json({ message: 'موزیک شما با موفقیت بارگذاری شد!' });
    });
});

// راه‌اندازی سرور
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

