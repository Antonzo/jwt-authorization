const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

class GoogleService {
    constructor() {
        this.oauth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        );
        this.oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
    }

    async getNewAccessToken() {
        this.accessToken = await this.oauth2Client.getAccessToken();
        return this.accessToken;
    }
}

module.exports = new GoogleService();
