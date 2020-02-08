const { client } = require('./pg');

module.exports = function (app) {

    app.post('/api/posts', async (req, res) => {
        try {
            const { rows } = !req.body.sql ? [] : await client.query(req.body.sql);
            res.send(rows);
        } catch (err) {
            console.log(err.stack)
            res.send("Error");
        }
    });
};
