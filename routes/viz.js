import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('viz.html', { root: 'public' });
});

export default router;