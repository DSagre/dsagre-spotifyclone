const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
const genres = [];
const albums = [];
const artists = [];
const tracks = [];
const app = express();
const port = 3000;

fs.createReadStream('lab3-data/genres.csv')
    .pipe(csv({}))
    .on('data', (data) => genres.push(data));

fs.createReadStream('lab3-data/raw_artists.csv')
    .pipe(csv({}))
    .on('data', (data) => artists.push(data));

fs.createReadStream('lab3-data/raw_tracks.csv')
    .pipe(csv({}))
    .on('data', (data) => tracks.push(data));
    
fs.createReadStream('lab3-data/raw_albums.csv')
    .pipe(csv({}))
    .on('data', (data) => albums.push(data));

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.get('/api/artists/:artist_id', (req,res) => {
    console.log(`GET request for ${req.url}`);
    const artistSearch = new Promise((resolve,reject) => {
        const artistList = artists.map(selectProps("artist_id","artist_date_created","artist_handle"))
       if(artistList != null) {
        console.log('not null');
        resolve(artistList)
       }         
    });

    artistSearch.then((artistList) => {
        const id = req.params.artist_id;
        const artistDet = artistList.find(a => parseInt(a.artist_id) === parseInt(id))
        res.send(artistDet);
    })

});

app.get('/api/genres', (req,res) => {
    const newGenres = genres.map(selectProps("genre_id","parent","title"))
    res.send(newGenres);
});

app.get('/api/artists', (req,res) => {
    const newArtists = artists.map(selectProps("artist_id","artist_handle","artist_date_created"))
    res.send(newArtists);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



function selectProps(...props){
    return function(obj){
    const newObj = {};
    props.forEach(name =>{
        newObj[name] = obj[name];
    });
          
    return newObj;
    }
}

