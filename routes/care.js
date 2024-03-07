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
    try{
        console.log('Loading page: care')
        if (req.session.isAuthenticated) {
            console.log('user is authenticated')
            // need to add a time of cared in for some of the sorting functionality to work
            // load all the user's cared topics
            const userIn = await User.findOne({name: req.session.account.username});
            if (userIn === null) { // user not in database, add them
                console.log('user not in database, adding them')
                userIn = await User.create({name: req.session.account.username});
            }
            const cared = await Article.find({_id: {$in: userIn['caredArticles']}});
            // create a list html element of each cared topic
            function escapeHTML(text) {
                return text.replace(/&/g, '&amp;')
                           .replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;')
                           .replace(/"/g, '&quot;')
                           .replace(/'/g, '&#039;');
            }
            // need to change the look of the switch button
            const caredList = cared.map(article => 
                `<li _id=${article._id}><a href=${article.url} target="_blank">${escapeHTML(article.title)}</a>: you cared about this topic  </li>`
            ).join('');
            
            // the switch button on click needs to change the topic to not cared
            const dynamicContent = `
            <script>
                // const docList = document.getElementById('careContainer');
                document.getElementById('careContainer').innerHTML = '${caredList}';
                // function switchButtonClicked(button) {
                //     console.log('switch button clicked');
                //     const listElement = button.parentElement;
                //     const textElement = listElement.innerHTML;
                //     textElement.textContent = 'You don\'t care about this topic';
                // }

                // function createListItem(text) {
                //     const listItem = document.createElement('li');
                //     const anchor = document.createElement('a');
                //     const switchButton = document.createElement('button');
                // }

                // function populateList(data) {
                //     data.forEach(function(item) {
                //         const listItem = item;
                //         const switchButton = document.createElement('button');
                //         switchButton._id = listItem._id;

                //         switchButton.textContent = 'Switch';
                //         switchButton.addEventListener("click", function() {
                //             console.log(switchButton._id)
                //             console.log('switch button clicked');
                //         });
                //         // switchButton.onclick = function() {
                //         //     console.log(switchButton._id)
                //         //     console.log('switch button clicked');
                //         //     // listItem.textContent = 'You don\'t care about this topic';
                //         // };
                //     });
                // }

                // docList.appendChild(populateList(${caredList}));
            </script>
            `;
            let carepageHTML = await fs.promises.readFile('public/carepage.html', 'utf-8');
            carepageHTML = carepageHTML.replace('</body>', `${dynamicContent}</body>`);

            res.send(carepageHTML);
        } else { // don't allow access if the user is not logged in
            res.json({message: 'This page cannot be accessed if you are not logged in. Please log in to continue.'});
        }
    } 
    catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;