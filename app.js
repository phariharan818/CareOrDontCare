import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session'

// To install msal-node-wrapper, run:
// npm install https://gitpkg.now.sh/kylethayer/ms-identity-javascript-nodejs-tutorial-msal-node-v2-/Common/msal-node-wrapper?main
import WebAppAuthProvider from 'msal-node-wrapper'

const authConfig = {
    auth: {
        clientId: "d0eca815-3913-4038-9694-884f566c8013",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "nWa8Q~zZQZXBu_.qlrZUYB4aMBPQF39F8nmKIciC",
        redirectUri: "/redirect" //"localhost:3000/redirect" or "https://care-or-dont-care.vercel.app/redirect"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
};

import { connectDB, Topic } from './models.js';

import indexRouter from './routes/homepage.js';
import careRouter from './routes/care.js';
import dontcareRouter from './routes/dontcare.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "nWa8Q~zZQZXBu_.qlrZUYB4aMBPQF39F8nmKIci",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());


app.use('/', indexRouter);
app.use('/care', careRouter);
app.use('/dontcare', dontcareRouter);

app.get('/signin', (req, res, next) => {
	return req.authContext.login({
		postLoginRedirectUri: "/",
	})
    (req, res, next);
});

app.get( '/signout', (req, res, next) => {
	return req.authContext.logout({
		postLogoutRedirectUri: "/", // redirect here after logout
	})
    (req, res, next);
});

app.use(authProvider.interactionErrorHandler());

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})

export default app;
