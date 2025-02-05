const Article = require('../models/Article');
const cloudinary = require('../config/cloudinary');

exports.createArticle = async (req, res) => {
    const { title, author, institution, abstract, content, tags } = req.body;
    try {
        const article = await Article.create(title, author, institution, abstract, content, tags);
        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.json(articles);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        await Article.updateViews(id);
        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.addComment = async (req, res) => {
    const { articleId, userId, content } = req.body;
    try {
        const comment = await Article.addComment(articleId, userId, content);
        res.json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getComments = async (req, res) => {
    const { articleId } = req.params;
    try {
        const comments = await Article.getComments(articleId);
        res.json(comments);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
