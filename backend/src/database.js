const express = require('express');
const { Client } = require('pg');

const app = express();

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'HRMS',
    password: '2003',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
