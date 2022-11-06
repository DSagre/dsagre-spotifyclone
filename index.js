const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
const mysql = require('mysql');
const genres = [];
const albums = [];
const artists = [];
const tracks = [];
const app = express();
const port = 3000;

app.use(express.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "listener",
    database: "musicApp"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE musicApp", function (err, result) {
      if (err) {
        console.log("Database already created");
      } else {
        console.log("New database created");
      }
    });
});

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

//Create table to hold the names of the playlists and their details.
app.get('/playlists', (req,res) => {
    var sql = "CREATE TABLE playlists (PlaylistName VARCHAR(255) PRIMARY KEY, trackCount INTEGER, playTime TIME)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    res.send("created");
  });
});

//Send the created name for the playlist to the database.
app.post('/playlists/create', (req,res) => {
    console.log(`POST request for ${req.url}`);
    const {PlaylistName} = req.body;
    console.log(PlaylistName);
    const playlist = createPlaylist(PlaylistName.toString());
    res.send(playlist);
});

//Displays the playlist names.
app.get('/playlists/create',(req,res) => {
    var sql = "SELECT PlaylistName FROM playlists";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
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

function createPlaylist(name) {
    var sql = "INSERT INTO playlists (PlaylistName, trackCount, playTime) VALUES ?";
    var values = [[name,0,'00:00:00']];
  con.query(sql,[values], function (err, result) {
    if (err) {
        console.log("Playlist already exists.")
    } else {
        console.log("1 record inserted");
    }
  });
}