const pool = require('../config/db');

class Article {
    static async create(title, author, institution, abstract, content, tags, imageUrl) {
        const result = await pool.query(
            'INSERT INTO articles (title, author, institution, abstract, content, tags, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, author, institution, abstract, content, tags, imageUrl]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM articles ORDER BY views DESC');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async updateViews(id) {
        await pool.query('UPDATE articles SET views = views + 1 WHERE id = $1', [id]);
    }

    static async addComment(articleId, userId, content) {
        const result = await pool.query(
            'INSERT INTO comments (article_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [articleId, userId, content]
        );
        return result.rows[0];
    }

    static async getComments(articleId) {
        const result = await pool.query('SELECT * FROM comments WHERE article_id = $1', [articleId]);
        return result.rows;
    }
}

module.exports = Article;
