const nodemailer = require('nodemailer');
require('dotenv').config();

exports.mailSender = async (mail, subject, body) => {
    try {
        //* Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        //* Send Mail
        let info = await transporter.sendMail({
            from: `"StudyNotion | Tejas Angadi" <${process.env.MAIL_USER}>`,
            to: mail,
            subject: subject,
            html: body
        });

        //* Mail sent successfully!
        console.log("Mail sent successfully!\nInfo: ", info);
    } catch (error) {
        console.error("Failed to send mail:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
