const db = require('../config/database');

const Category = {

    // CREATE CATEGORY
    create: (data, callback) => {

        const sql = `
            INSERT INTO categories (user_id, name)
            VALUES (?, ?)
        `;

        db.query(sql, [data.user_id, data.name], callback);
    },


    // GET ALL CATEGORY
    getAll: (callback) => {

        const sql = `
            SELECT * FROM categories
        `;

        db.query(sql, callback);
    },


    // GET CATEGORY BY ID
    getById: (id, callback) => {

        const sql = `
            SELECT * FROM categories
            WHERE id_category = ?
        `;

        db.query(sql, [id], callback);
    },


    // UPDATE CATEGORY
    update: (id, data, callback) => {

        const sql = `
            UPDATE categories
            SET name = ?
            WHERE id_category = ?
        `;

        db.query(sql, [data.name, id], callback);
    },


    // DELETE CATEGORY
    delete: (id, callback) => {

        const sql = `
            DELETE FROM categories
            WHERE id_category = ?
        `;

        db.query(sql, [id], callback);
    }

};

module.exports = Category;