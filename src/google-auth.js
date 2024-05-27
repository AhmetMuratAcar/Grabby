import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
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

    res.redirect('/finalize-submission'); // Redirect to a route to finalize submission
}

export async function addEventsToCalendar(events, tokens) {
    oAuth2Client.setCredentials(tokens);
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    for (const event of events) {
        const calendarEvent = {
            summary: event.title,
            start: {
                dateTime: event.date + (event.time ? `T${event.time}` : ''),
                timeZone: 'America/Los_Angeles', // Adjust time zone as needed
            },
            end: {
                dateTime: event.date + (event.time ? `T${event.time}` : ''),
                timeZone: 'America/Los_Angeles', // Adjust time zone as needed
            },
        };

        await calendar.events.insert({
            calendarId: 'primary',
            resource: calendarEvent,
        });
    }
}
