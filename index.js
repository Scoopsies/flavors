const pg = require('pg');
const client = new pg.Client('postgres://localhost/ice_cream_shop_db');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

app.get('/api/flavors', async (req, res, next) => {
    try {
        const SQL = `
          SELECT *
          FROM flavors
        `;
        const response = await client.query(SQL);
        res.send(response.rows);
    } 
    catch(ex) {
        next(ex);
    }
});




const setup = async () => {
    await client.connect('')
    console.log('connected to database')
    const SQL = `
        DROP TABLE IF EXISTS flavors;
        CREATE TABLE flavors(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            is_favorite BOOLEAN
        );
        INSERT INTO flavors (name, is_favorite) VALUES ('vanilla', true);
        INSERT INTO flavors (name, is_favorite) VALUES ('chocolate', false);
        INSERT INTO flavors (name, is_favorite) VALUES ('strawberry', false);
        INSERT INTO flavors (name, is_favorite) VALUES ('peanut butter', true);

    `;
    await client.query(SQL)
    console.log('tables created and data seeded')

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    }); 
};

setup()
