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
//Backend task 1
app.get('/api/genres', (req,res) => {
    const newGenres = genres.map(selectProps("genre_id","parent","title"))
    res.send(newGenres);
});

//Back-end task 2
app.get('/api/artists/:artist_id', (req,res) => {
    console.log(`GET request for ${req.url}`);
    const artistSearch = new Promise((resolve,reject) => {
        const artistList = artists.map(selectProps("artist_id","artist_date_created","artist_name","artist_members","artist_favorites","artist_location","artist_website"))
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

//Back-end task 3
app.get('/api/tracks/:track_id', (req,res) => {
    console.log(`GET request for ${req.url}`);
    const trackSearch = new Promise((resolve,reject) => {
        const trackList = tracks.map(selectProps("track_id","album_id", "album_title", "artist_id", "artist_name", "tags", 
        "track_date_created", "track_date_recorded","track_duration", "track_genres", "track_number", "track_title"))
       if(trackList != null) {
        console.log('not null');
        resolve(trackList)
       }         
    });

    trackSearch.then((trackList) => {
        const id = req.params.track_id;
        const trackDet = trackList.find(a => parseInt(a.track_id) === parseInt(id))
        res.send(trackDet);
    })

});

//Back-end task 4
app.get('/api/tracks', (req,res) => {
    console.log(`GET request for ${req.url}`);
    const trackSearch = new Promise((resolve,reject) => {
        const trackList = tracks.map(selectProps("track_id", "album_title", "track_title"))
       if(trackList != null) {
        
        resolve(trackList)
       }         
    });
    
    trackSearch.then((trackList) => {
        let results = [];
        const trackName = req.query.trackTitle;
        const albumName = req.query.albumName;
        console.log(trackName);
        for (let i = 0; i < trackList.length && results.length < 10; i++) {
            
            if(trackName != undefined) {
                
                if((trackList[i]['track_title']).toLowerCase().includes(trackName.toLowerCase())){
                    results.push(trackList[i]['track_id']);
                }
            } else if(albumName != null) {
                if((trackList[i]['album_title']).toLowerCase().includes(albumName.toLowerCase())){
                    results.push(trackList[i]['track_id']);
                }
            }  
        }
       res.send(results);
    })

});

//Back-end task 5
app.get('/api/artist', (req,res) => {
    console.log(`GET request for ${req.url}`);
    const trackSearch = new Promise((resolve,reject) => {
        const artistList = artists.map(selectProps("artist_id","artist_name"))
       if(artistList != null) {
        
        resolve(artistList)
       }         
    });
    
    trackSearch.then((artistList) => {
        let results = [];
        const artistName = req.query.artistName;
        console.log(artistName);
        for (let i = 0; i < artistList.length; i++) {
                if((artistList[i]['artist_name']).toLowerCase().includes(artistName.toLowerCase())){
                    results.push(artistList[i]['artist_id']);
                }
            }
       res.send(results);
    })

});


app.get('/api/artists', (req,res) => {
    const newArtists = artists.map(selectProps("artist_id","artist_handle","artist_date_created"))
    res.send(newArtists);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Function to filter JSON arrays for specific properties.
function selectProps(...props){
    return function(obj){
    const newObj = {};
    props.forEach(name =>{
        newObj[name] = obj[name];
    });
          
    return newObj;
    }
}

