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

app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})


app.use(express.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "listener",
    database: "musicApp",
    multipleStatements : true
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

//Using csv parser to parse the csv files into json and store them in arrays.
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

//Using static to display the main HTML page.
app.use('/', express.static('static'));

//Backend task 1
app.get('/api/genres', (req,res) => {
    //Using the function selectProps to filter the genre array into the inputted properties.
    const newGenres = genres.map(selectProps("genre_id","parent","title"))
    res.send(newGenres);
});

//Back-end task 2
app.get('/api/artists/:artist_id', (req,res) => {
    console.log(`GET request for ${req.url}`);
    //Uses a promise to filter the artist array into the desired values.
    const artistSearch = new Promise((resolve,reject) => {
        const artistList = artists.map(selectProps("artist_id","artist_date_created","artist_name","artist_members","artist_favorites","artist_location","artist_website"))
       if(artistList != null) {
        console.log('not null');
        resolve(artistList)
       }         
    });
    //After the array is made it is then searched for the first artist id match.
    artistSearch.then((artistList) => {
        const id = req.params.artist_id;
        const artistDet = artistList.find(a => parseInt(a.artist_id) === parseInt(id))
        res.send(artistDet);
    })

});

//Back-end task 3
app.get('/api/tracks/:track_id', (req,res) => {
    console.log(`GET request for ${req.url}`);
    //Uses a promise to filter the tracks array into the desired values.
    const trackSearch = new Promise((resolve,reject) => {
        const trackList = tracks.map(selectProps("track_id","album_id", "album_title", "artist_id", "artist_name", "tags", 
        "track_date_created", "track_date_recorded","track_duration", "track_genres", "track_number", "track_title"))
       if(trackList != null) {
        console.log('not null');
        resolve(trackList)
       }         
    });
    //After the array is made it is then searched for the first track id match.
    trackSearch.then((trackList) => {
        const id = req.params.track_id;
        const trackDet = trackList.find(a => parseInt(a.track_id) === parseInt(id))
        if(trackDet == null) {
            res.send("Track does not exist");
        } else {
            res.send(trackDet);
        }
    })
});

//Back-end task 4
app.get('/api/tracks', (req,res) => {
    console.log(`GET request for ${req.url}`);
    //Uses a promise to filter the tracks array into the desired values.
    const trackSearch = new Promise((resolve,reject) => {
        const trackList = tracks.map(selectProps("track_id", "album_title", "track_title", "artist_name"))
       if(trackList != null) {
        
        resolve(trackList)
       }         
    });
    /*Searches through the array for a trackName match or an albumName match 
    and sends back the matching track ids the results stop 10 or the max matches.*/
    trackSearch.then((trackList) => {
        let results = [];
        const trackName = req.query.trackTitle;
        const albumName = req.query.albumName;
        const artistName = req.query.artistName;
        console.log(trackName);
        for (let i = 0; i < trackList.length && results.length < 15; i++) {
            
            if(trackName != undefined) {
                
                if((trackList[i]['track_title']).toLowerCase().includes(trackName.toLowerCase())){
                    results.push(trackList[i]['track_id']);
                }
            } else if(albumName != null) {
                if((trackList[i]['album_title']).toLowerCase().includes(albumName.toLowerCase())){
                    results.push(trackList[i]['track_id']);
                }
            }  else if(artistName != null) {
                if((trackList[i]['artist_name']).toLowerCase().includes(artistName.toLowerCase())){
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
    //Uses a promise to filter the artists array into the desired values.
    const trackSearch = new Promise((resolve,reject) => {
        const artistList = artists.map(selectProps("artist_id","artist_name"))
       if(artistList != null) {
        
        resolve(artistList)
       }         
    });
    //After the array is made it is then searched for the first artist name match and sends back the artist id.
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
    console.log(req.body);
    const {PlaylistName} = req.body;
        
    var sql = "INSERT INTO playlists (PlaylistName, trackCount, playTime) VALUES ?";
    var values = [[PlaylistName,0,'00:00:00']];
  con.query(sql,[values], function (err, result) {
    if (err) {
        res.send("Playlist already exists");
    } else {
        res.send("Playlist created");
    }
  });
});

//Displays the playlist names.
app.get('/playlists/create',(req,res) => {
    var sql = "SELECT PlaylistName FROM playlists";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});

//Creates the table to hold the trackIDs added to a playlist.
app.get('/playlists/create/add', (req,res) => {
    var sql = "CREATE TABLE contents (track_id int NOT NULL,PlaylistName VARCHAR(255) NOT NULL, duration TIME, FOREIGN KEY (PlaylistName)REFERENCES playlists(PlaylistName), CONSTRAINT Pk_single PRIMARY KEY (track_id, PlaylistName))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Song Table created");
    res.send("created");
  });
});

//Uses the create song function with a req body input.
app.post('/playlists/create/add', (req,res) => {
    console.log(`POST request for ${req.url}`);
    const {track_id,PlaylistName} = req.body;
    var sql =  "INSERT INTO contents (track_id, PlaylistName, duration) VALUES ?";
    var sql2 = "UPDATE playlists SET trackCount = trackCount+1 WHERE PlaylistName = ?"
    var sql3 = "UPDATE playlists SET playTime = sec_to_time(time_to_sec(playTime) + time_to_sec(?)) WHERE PlaylistName = ?"
    const duration = tracks.find(a => parseInt(a.track_id) === parseInt(track_id));
    var TIME = duration.track_duration;
    console.log(TIME);
    var values = [[track_id,PlaylistName, TIME]];
    var val2 = [[PlaylistName]];
    var val3 = [[TIME]]
  con.query(sql+";"+sql2+";"+sql3,[values,val2,val3,val2], function (err, result) {
    if (err) {
        res.send("Track already exists in playlist or Playlist does not exist.")
    } else {
       res.send("1 song inserted");
    }
});
});

//Gets the track ids for a certain playlist.
app.get('/playlists/tracks/:list_name',(req,res) => {
    var playlist = req.params.list_name;
    var sql = "SELECT track_id FROM contents WHERE PlaylistName = ?";
    con.query(sql, [playlist], function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});

//Detetes the playlist along with the tracks in it.
app.get('/playlists/delete/:list_name',(req,res) => {
    console.log(`DELETE request for ${req.url}`);
    var playlist = req.params.list_name;
    const sql = "DELETE FROM contents WHERE PlaylistName = ?";
    const sql2 = "DELETE FROM playlists WHERE PlaylistName = ?";
    con.query(sql+";"+sql2, [playlist,playlist], function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    
});

//Gets the info of the playlists table.
app.get('/playlists/info', (req,res) =>{
    var sql = "SELECT * FROM playlists";
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