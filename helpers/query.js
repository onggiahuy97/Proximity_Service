const client = require('../db');

async function query(sql, params) {
    try {
        const result = await client.query(sql, params);
        return result.rows;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { query };