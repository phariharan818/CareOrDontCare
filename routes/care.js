import express from 'express';
var router = express.Router();
import {Article} from '../models.js';


// import { connectDB, Article } from './models.js';

router.post('/', async (req, res) => {
    try {
        const randomTopic = await Topic.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomTopic);
    } catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try{
        res.json({message: 'Success!'})
    } 
    catch (error) {
        console.error('Error fetching random topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;