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
        clientId: "415cde75-c8b7-4356-9c31-df9562579604",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "W.G8Q~fm~vgaFnKACA1KCMlCRxZxeWpgKBwGRcS.",
        redirectUri: "/redirect" //"https://websharer-a4-phariha.azurewebsites.net/redirect", //"localhost:3000/redirect" or "examplesite.me/redirect"
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
    secret: "0aba862a-6a5f-4841-9289-c403e125cfc9",
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
