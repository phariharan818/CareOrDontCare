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
                        <a href="${article.url}" target="_blank">
                            <img src="${article.urlToImage}" alt="Article Image" class="article-image">
                        </a>
                        <div class="card-content">
                            <a href="${article.url}" target="_blank">
                                <h2 class="card-title">${article.title}</h2>
                            </a>
                            <p class="card-description">${article.description}</p>
                        </div>
                        <div class="toggle-container">
                            <div class="toggle-content">
                                <span class="dont-care-text">Don't Care</span>
                                <!-- Add dataset attribute to store article ID -->
                                <label class="switch" data-article-id="${article._id}">
                                    <!-- Add onclick event to trigger toggleArticle function -->
                                    <input type="checkbox" onclick="confirmDelete('${article._id}')" checked>
                                    <span class="slider round"></span>
                                </label>
                                <span class="care-text">Care</span>
                            </div>
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
            let loginHtml = await fs.promises.readFile('public/loginPrompt.html', 'utf-8');
            res.send(loginHtml)
        }
    } catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/updateArticleStatus', async (req, res) => {
    try {
        const { articleId, action } = req.body;
        const user = await User.findOne({ name: req.session.account.username });

        if (action === 'Not Cared') {
            // Move article to the don't care list
            await User.findOneAndUpdate({ name: req.session.account.username }, { $addToSet: { notCaredArticles: articleId } });
        }
        // Other actions like moving to cared list can be implemented similarly

        res.status(200).send('Article status updated successfully');
    } catch (error) {
        console.error('Error updating article status:', error);
        res.status(500).send('Internal server error');
    }
});

router.delete('/:articleId', async (req, res) => {
    // Things assumed when this route is called:
    // The user is signed in and authenticated
    // The article id is in one of the user's lists

    const articleId = req.params.articleId;
    try {
        // Load all the user's cared topics
        let userIn = await User.findOne({ name: req.session.account.username });
        if (!userIn) {
            console.log('User not in database, adding them');
            userIn = await User.create({ name: req.session.account.username });
        }
        // if the user already cares about the article, remove it from that list and add it to the don't care list
        if (userIn.caredArticles.includes(articleId)){
            await User.findOneAndUpdate({name: req.session.account.username}, {$pull: {caredArticles: articleId}}); 
            await User.findOneAndUpdate({name: req.session.account.username}, {$push: {notCaredArticles: articleId}});
        } else {
            await User.findOneAndUpdate({name: req.session.account.username}, {$pull: {notCaredArticles: articleId}}); 
            await User.findOneAndUpdate({name: req.session.account.username}, {$push: {caredArticles: articleId}});
        }
        // console.log('articleId:', articleId, ' in cared? ', userIn.caredArticles, 'or don\'t care:', userIn.notCaredArticles);
        res.status(200).send('article swapped successfully');
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).send('Internal server error');
    }
});



export default router;