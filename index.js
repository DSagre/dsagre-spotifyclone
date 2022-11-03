const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const genres = [];
const app = express();
const port = 3000;

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

fs.createReadStream('lab3-data/genres.csv')
    .pipe(csv({}))
    .on('data', (data) => genres.push(data))
    .on('end',() => {
        console.log(genres);
    });