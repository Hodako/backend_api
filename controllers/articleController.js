const Article = require('../models/Article');
const cloudinary = require('../config/cloudinary');

exports.createArticle = async (req, res) => {
    const { title, author, institution, abstract, content, tags } = req.body;
    try {
        let imageUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream({
                resource_type: 'image'
            }, (error, result) => {
                if (error) throw error;
                return result;
            }).end(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const article = await Article.create(title, author, institution, abstract, content, tags, imageUrl);
        res.json(article);
    } catch (err) {
        console.error('Error creating article:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.json(articles);
    } catch (err) {
        console.error('Error fetching articles:', err.message);
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
        console.error('Error fetching article:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.addComment = async (req, res) => {
    const { articleId, userId, content } = req.body;
    try {
        const comment = await Article.addComment(articleId, userId, content);
        res.json(comment);
    } catch (err) {
        console.error('Error adding comment:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.getComments = async (req, res) => {
    const { articleId } = req.params;
    try {
        const comments = await Article.getComments(articleId);
        res.json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err.message);
        res.status(400).json({ message: err.message });
    }
};
