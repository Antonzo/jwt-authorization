const nodemailer = require('nodemailer');
const googleService = require('../services/google-service');

class MailService {
    async sendActivationMail(to, link) {
        const googleAccessToken = await googleService.getNewAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GOOGLE_USER_EMAIL,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: googleAccessToken,
            }
        })
        await transporter.sendMail({
            from: process.env.GOOGLE_USER_EMAIL,
            to,
            subject: `Account activation on ${process.env.API_URL}`,
            text: '',
            html: `
                <div>
                    <h1>For activation follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService();