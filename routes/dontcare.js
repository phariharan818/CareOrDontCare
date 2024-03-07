import express from 'express';
var router = express.Router();
import { User, Article } from '../models.js';

router.post('/', async (req, res) => {
    try {
        // update the current users cared topics in the associations table 
        console.log('article they not cared:', req.body['idT']);

        // update database if auth
        if (req.session.isAuthenticated) {
            console.log('add to database')

            // get current user
            let userIn = await User.findOne({name: req.session.account.username});
            if (userIn === null) { // user not in database, add them
                console.log('user not in database, adding them')
                userIn = await User.create({name: req.session.account.username});
            }

            // if the user has not already made a choice about the topic, add it to their not cared topics
            // if no articles have been not cared, add the article. 
            // if that isn't the case, check if the article has been not cared about
            if (userIn === null | !userIn['notCaredArticles'].includes(req.body['idT'])) {
                await User.findOneAndUpdate({name: req.session.account.username}, {$push: {notCaredArticles: req.body['idT']}}); 
                console.log('added to users not cared topics')
            } else {
                console.log('already in users not cared topics')
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

export default router;