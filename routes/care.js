import express from 'express';
var router = express.Router();
import { User, Article } from '../models.js';
import fs from 'fs';

router.post('/', async (req, res) => {
    try {
        // update the current users cared topics in the associations table 
        console.log('article they cared about:', req.body['idT']);

        // update database if auth
        if (req.session.isAuthenticated) {
            console.log('add to database')

            // get current user
            let userIn = await User.findOne({name: req.session.account.username});
            if (userIn === null) { // user not in database, add them
                console.log('user not in database, adding them')
                userIn = await User.create({name: req.session.account.username});
            }

            // if the user has not already made a choice on the topic, add it to their cared topics
            // if no articles have been cared, add the article. 
            // if that isn't the case, check if the article has been cared about
            if (userIn['caredArticles'] === null | !userIn['caredArticles'].includes(req.body['idT'])) {
                await User.findOneAndUpdate({name: req.session.account.username}, {$push: {caredArticles: req.body['idT']}}); 
                console.log('added to users cared topics')
            } else {
                console.log('already in users cared topics')
            }

            // get a list of all topics the user has seen
            const allArticles = [...userIn['caredArticles'], ...userIn['notCaredArticles']]

            // send response of topic user has not seen
            const randomArticle = await Article.aggregate([
                {
                    $match:
                    {
                        archived: false,
                        _id: { $nin: allArticles}
                    },
                },
                {
                    $sample:
                    {
                        size: 1,
                    },
                }
            ]);
            res.json(randomArticle);
        } else {
            // TODO: alert user that they need to be logged in to save a topic!
            // res.status(401).json({ error: 'Unauthorized' });
            console.error('User not authenticated: display random topic')
            // unauthenticated user, send random topic
            const randomArticle = await Article.aggregate([
                {
                    $match:
                    {
                        archived: false,
                    },
                },
                {
                    $sample:
                    {
                        size: 1,
                    },
                },
            ]); 
            // console.log(randomArticle);
            res.json(randomArticle);
        }
    } catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('Loading page: care');
        if (req.session.isAuthenticated) {
            console.log('User is authenticated');

            // Load all the user's cared topics
            let userIn = await User.findOne({ name: req.session.account.username });
            if (!userIn) {
                console.log('User not in database, adding them');
                userIn = await User.create({ name: req.session.account.username });
            }

            const cared = await Article.find({ _id: { $in: userIn['caredArticles'] } });

            const caredList = cared.map(article => {
                return `
                    <div class="card">
                        <img src="${article.urlToImage}" alt="Article Image" class="article-image">
                        <div class="card-content">
                            <h2 class="card-title">${article.title}</h2>
                            <p class="card-description">${article.description}</p>
                        </div>
                        <div class="toggle-container">
                            <label class="switch">
                                <input type="checkbox" checked> <!-- Default to checked -->
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                `;
            }).join('');

            // Read carepage.html and replace the placeholder with cared topics
            let carepageHTML = await fs.promises.readFile('public/carepage.html', 'utf-8');
            carepageHTML = carepageHTML.replace('<!-- cared_topics -->', caredList);
            res.send(carepageHTML);
        } else {
            // User not authenticated
            // res.json({ message: 'This page cannot be accessed if you are not logged in. Please log in to continue.' });
            const loginPromptHTML = `
                <html>
                <head>
                    <title>Login Required</title>
                    <link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font-family: "Encode Sans", sans-serif;
                            text-align: center;
                            padding-top: 50px;
                        }
                        h1 {
                            color: #4b2e83;
                        }
                        p {
                            color: #333;
                        }
                        a {
                            color: #4b2e83;
                        }
                        a:hover {
                            color: #6b4eaf;
                        }
                    </style>
                </head>
                <body>
                    <h1>Login Required</h1>
                    <p>This page cannot be accessed if you are not logged in. Please <a href="/signin">log in</a> to continue.</p>
                </body>
                </html>
            `;
            res.send(loginPromptHTML);
        }
    } catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;