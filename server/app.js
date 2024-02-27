import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectDB, Topic } from './models.js';
import fs from 'fs';

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

app.get('/', async (req, res) => {
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


app.post('/care', async (req, res) => {
    try {
        const randomTopic = await Topic.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomTopic);
    } catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/dontcare', async (req, res) => {
    try {
        const randomTopic = await Topic.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomTopic);
    } catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})

export default app;
