const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const businessRouters = require('./routes/businessRoutes');

app.use('/api', businessRouters);

const client = require('./db');

client.query(`
    CREATE TABLE IF NOT EXISTS businesses (
        id SERIAL PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
    );
`);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});