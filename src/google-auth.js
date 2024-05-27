// google-auth.js
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

export async function googleAuth(req, res) {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });

    res.redirect(authorizeUrl);
}

export async function handleOAuthCallback(req, res) {
    const code = req.query.code;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Store tokens in session or database as needed
    req.session.tokens = tokens;

    res.redirect('/success'); // Or wherever you want to redirect after successful auth
}
