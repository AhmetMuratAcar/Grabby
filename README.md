# Grabby

<p align="center">
  <img src="https://raw.githubusercontent.com/AhmetMuratAcar/grabby/main/public/images/logo.png">
</p>

## What is Grabby
Grabby was a website for students to add important dates from syllabuses to their Google Calendars. It is no longer hosted and this is a rewrite to archive it.

Shoutout to [Manuel Pinto](https://codepen.io/P1N2O/pen/pyBNzX) for the header and footer gradient animation.

## Tech Stack
Grabby is an [Express](https://expressjs.com/) application written in JavaScript that utilizes [Node](https://nodejs.org/). [EJS](https://ejs.co/) is used for some quick and easy templating and [Bootstrap](https://getbootstrap.com/) is used for styling.

## Hosting Locally
Technically you can clone this repo and host it locally but it will be an unreasonable amount of work. 

```sh
git clone https://github.com/AhmetMuratAcar/grabby.git
cd grabby
npm install
```
At this point you have to set up your own Google Cloud OAuth project and OpenAI developer account. From these accounts you have to set up the following local variables in your `.env` file.

```
CLIENT_ID = your-google-client-id
CLIENT_SECRET = your-google-client-secret
REDIRECT_URL = http://localhost:3000/auth/google/callback
SESSION_SECRET = your-session-secret
OPENAI_API_KEY = your-openai-api-key
```
### Explanation:
CLIENT_ID: Your Google OAuth client ID.  
CLIENT_SECRET: Your Google OAuth client secret.  
REDIRECT_URL: The OAuth callback URL (should match the one set in Google Cloud Console).  
SESSION_SECRET: A secret key for session management.  
OPENAI_API_KEY: Your OpenAI API key for extracting dates from the PDF.

If you made it this far, you can `node app.js` in terminal and open `http://localhost:3000` in your browser.

## Views
<p align="center">
  <img src="https://raw.githubusercontent.com/AhmetMuratAcar/grabby/main/public/images/README-1.png">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/AhmetMuratAcar/grabby/main/public/images/README-2.png">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/AhmetMuratAcar/grabby/main/public/images/README-3.png">
</p>
