import express from 'express';
import verify from './verifyToken.js';



const router = express.Router();

export default router.get('/', verify , (req, res) => {
    res.json({
        post: {
            title: 'My first post',
            description: 'Do not access message without login'
        }
    });
});