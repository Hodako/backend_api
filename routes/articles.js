const express = require('express');
const router = express.Router();
const { createArticle, getArticles, getArticle, addComment, getComments } = require('../controllers/articleController');
const auth = require('../middleware/auth');

router.post('/', auth, createArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);
router.post('/comments', auth, addComment);
router.get('/:articleId/comments', getComments);

module.exports = router;
