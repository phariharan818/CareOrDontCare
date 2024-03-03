import express from 'express';
var router = express.Router();
import {Topic} from '../models.js';
import fs from 'fs'


router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find({}).exec();
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const dynamicContent = `
            <script>
                document.getElementById('topicHeading').innerText = '${randomTopic.title}';
                document.getElementById('topicDescription').innerText = '${randomTopic.description}';
            </script>
        `;
        let homepageHTML = await fs.promises.readFile('public/homepage.html', 'utf-8');
        homepageHTML = homepageHTML.replace('</body>', `${dynamicContent}</body>`);
        res.send(homepageHTML);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).send('Internal server error');
    }
});

export default router;
