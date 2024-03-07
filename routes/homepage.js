import express from 'express';
var router = express.Router();
import escapeHTML from 'escape-html';
import { User, Article } from '../models.js';
import fs from 'fs';


router.get('/', async (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            console.log('add to database');

            // get current user
            let userIn = await User.findOne({ name: req.session.account.username });
            if (userIn === null) { // user not in database, add them
                console.log('user not in database, adding them');
                userIn = await User.create({ name: req.session.account.username });
            }

            // get a list of all topics the user has seen
            const allArticles = [...userIn['caredArticles'], ...userIn['notCaredArticles']];

            // send response of topic user has not seen
            const randomArticle = await Article.aggregate([
                {
                    $match:
                    {
                        archived: false,
                        _id: { $nin: allArticles }
                    },
                },
                {
                    $sample:
                    {
                        size: 1,
                    },
                }
            ]);

            const dynamicContent = `
                <script>
                    document.getElementById('topicHeading').innerText = '${escapeHTML(randomArticle[0]['title'])}';
                    document.getElementById('topicDescription').innerText = '${escapeHTML(randomArticle[0]['description'])}';
                    document.getElementById('topicDescription').setAttribute('data-id', '${randomArticle[0]['_id']}');
                </script>
            `;
            let homepageHTML = await fs.promises.readFile('public/homepage.html', 'utf-8');
            homepageHTML = homepageHTML.replace('</body>', `${dynamicContent}</body>`);
            res.send(homepageHTML);
        } else {
            console.error('User not authenticated: display random topic');
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
            const dynamicContent = `
                <script>
                    document.getElementById('topicHeading').innerText = '${escapeHTML(randomArticle[0]['title'])}';
                    document.getElementById('topicDescription').innerText = '${escapeHTML(randomArticle[0]['description'])}';
                    document.getElementById('topicDescription').setAttribute('data-id', '${randomArticle[0]['_id']}');
                </script>
            `;
            let homepageHTML = await fs.promises.readFile('public/homepage.html', 'utf-8');
            homepageHTML = homepageHTML.replace('</body>', `${dynamicContent}</body>`);
            res.send(homepageHTML);
        }
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).send('Internal server error');
    }
});

export default router;