var letters = /^[a-zA-Z]+$/;
const searchArtist = document.getElementById('searchArtist');
var song = document.getElementById('searchSong');
const searchAlbum = document.getElementById('searchAlbum');
const songDiv = document.getElementById('songDiv');
const songTable = document.createElement('table');
songDiv.appendChild(songTable);
songTable.setAttribute("id","display1");
const detailsDiv = document.getElementById('detailsDiv');
const playlistTable = document.createElement('table');
detailsDiv.appendChild(playlistTable);
playlistTable.setAttribute("id","display2");


document.getElementById("addPlaylist").addEventListener(
    "click",
    () => {
      document.getElementById("playlistDiv").hidden = false;
      getList();
    },
    false
);

//Appends the html element to a parent that is inputted through the variables.  
function append(parent, ...el) {
    el.forEach(node =>{
        return parent.appendChild(node);
    })
}

//Search songs by album name.
function searchAl() {
    const table = document.getElementById('display1');
    if(table.innerHTML != " ") {
        table.innerHTML = " ";
    }
    const album = new Promise((resolve,reject) => {
        var input = document.getElementById('searchAlbum').value;
        if(!(input.match(letters))) {
            alert("Input invalid, Please input letters only.")
            return null;
        } else {
            resolve(input);
        }
    });
    let cat = document.createElement('tr'),
         th1 = document.createElement('th'),
         th2 = document.createElement('th'),
         th3 = document.createElement('th'),
         th4 = document.createElement('th'),
         th5 = document.createElement('th');
        th1.innerHTML = "No.";
        th2.innerHTML = "Title";
        th3.innerHTML = "Artist";
        th4.innerHTML ="Album";
        th5.innerHTML = "Duration"
        append(cat, th1,th2,th3,th4,th5);
        append(table,cat);
        
    album.then((input) => {
        var url = `http://`+window.location.host+`/api/tracks?albumName=${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://`+window.location.host+`/api/tracks/${element}`)
       .then(resp => resp.json())
       .then(data2 => {
        const trackDet = data2;

        let tr = document.createElement('tr'),
            td1 = document.createElement('td');
            td2 = document.createElement('td');
            td3 = document.createElement('td');
            td4 = document.createElement('td');
            td5 = document.createElement('td');
            td1.innerHTML = `${trackDet.track_id}`;
            td2.innerHTML = `${trackDet.track_title}`;
            td3.innerHTML = `${trackDet.artist_name}`;
            td4.innerHTML = `${trackDet.album_title}`;
            td5.innerHTML = `${trackDet.track_duration}`;
            append(tr, td1,td2,td3,td4,td5);
            append(table, tr);
          }
       ); 
       });  
    }) 
    })
    
}

//Search songs by song name
function searchTrack() {
    const table = document.getElementById('display1');
    if(table.innerHTML != " ") {
        table.innerHTML = " ";
    }
    const song = new Promise((resolve,reject) => {
        var input = document.getElementById('searchSong').value;
        if(!(input.match(letters))) {
            alert("Input invalid, Please input letters only.")
            return null;
        } else {
            resolve(input);
        }
    });
    let cat = document.createElement('tr'),
         th1 = document.createElement('th'),
         th2 = document.createElement('th'),
         th3 = document.createElement('th'),
         th4 = document.createElement('th'),
         th5 = document.createElement('th');
        th1.innerHTML = "No.";
        th2.innerHTML = "Title";
        th3.innerHTML = "Artist";
        th4.innerHTML ="Album";
        th5.innerHTML = "Duration"
        append(cat, th1,th2,th3,th4,th5);
        append(table,cat);
        
    song.then((input) => {
        var url = `http://`+window.location.host+`/api/tracks?trackTitle=${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://`+window.location.host+`/api/tracks/${element}`)
       .then(resp => resp.json())
       .then(data2 => {
        const trackDet = data2;

        let tr = document.createElement('tr'),
            td1 = document.createElement('td');
            td2 = document.createElement('td');
            td3 = document.createElement('td');
            td4 = document.createElement('td');
            td5 = document.createElement('td');
            td1.innerHTML = `${trackDet.track_id}`;
            td2.innerHTML = `${trackDet.track_title}`;
            td3.innerHTML = `${trackDet.artist_name}`;
            td4.innerHTML = `${trackDet.album_title}`;
            td5.innerHTML = `${trackDet.track_duration}`;
            append(tr, td1,td2,td3,td4,td5);
            append(table, tr);
          }
       ); 
       });  
    }) 
    })
    
}

//Search songs by artist
function searchArt() {
    const table = document.getElementById('display1');
    if(table.innerHTML != " ") {
        table.innerHTML = " ";
    }
    const artist = new Promise((resolve,reject) => {
        var input = document.getElementById('searchArtist').value;
        if(!(input.match(letters))) {
            alert("Input invalid, Please input letters only.")
            return null;
        } else {
            resolve(input);
        }
    });
    let cat = document.createElement('tr'),
         th1 = document.createElement('th'),
         th2 = document.createElement('th'),
         th3 = document.createElement('th'),
         th4 = document.createElement('th'),
         th5 = document.createElement('th');
        th1.innerHTML = "No.";
        th2.innerHTML = "Title";
        th3.innerHTML = "Artist";
        th4.innerHTML ="Album";
        th5.innerHTML = "Duration"
        append(cat, th1,th2,th3,th4,th5);
        append(table,cat);
        
    artist.then((input) => {
        var url = `http://`+window.location.host+`/api/tracks?artistName=${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://`+window.location.host+`/api/tracks/${element}`)
       .then(resp => resp.json())
       .then(data2 => {
        const trackDet = data2;

        let tr = document.createElement('tr'),
            td1 = document.createElement('td');
            td2 = document.createElement('td');
            td3 = document.createElement('td');
            td4 = document.createElement('td');
            td5 = document.createElement('td');
            td1.innerHTML = `${trackDet.track_id}`;
            td2.innerHTML = `${trackDet.track_title}`;
            td3.innerHTML = `${trackDet.artist_name}`;
            td4.innerHTML = `${trackDet.album_title}`;
            td5.innerHTML = `${trackDet.track_duration}`;
            append(tr, td1,td2,td3,td4,td5);
            append(table, tr);
          }
       ); 
       });  
    }) 
    })
    
}

//Gets the playlist names to use in the drop down list.
function getList() {
    const drop = document.getElementById('playlists');
    if(drop.innerHTML != " ") {
        drop.innerHTML = " ";
    }
    var url = "http://`+window.location.host+`/playlists/create"
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const playlists = data;
       playlists.forEach(element => {
        let option = document.createElement('option');
        option.innerHTML = `${element.PlaylistName}`;
        option.setAttribute("value",`${element.PlaylistName}`);
        append(drop, option);
       });  
    }) 
}
//Used the POST url to send the name of the playlist to the database.
function addName() {
    const add = new Promise((resolve,reject) => {
        var input = document.getElementById('insertPlaylist').value;
        if(input != null) {
            console.log(input);
            resolve(input);
        } else {
            alert("Please type a playlist name!");
        }
        
    });

    add.then((input) => {
        var url = "http://`+window.location.host+`/playlists/create"
        const data = {PlaylistName : input};
        fetch(url, 
            {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify(data)
            })
    .then(resp => resp.text())
    .then(data => {
       const playlists = data;
       console.log(playlists);
       if(playlists == "Playlist already exists") {
        alert("Playlist already exists!");
        getList();
       } else {
        alert("Playlist name added!");
        getList();
       }
    });
    });
    
}

//Delete a playlist and the tracks inside it.
function deletePlay() {
    const playlist = new Promise((resolve,reject) => {
        var input = document.getElementById('playlists').value;
        console.log(input);
        if(input == null) {
            alert("Please select input")
            return null;
        } else {
            resolve(input);
        }
    });

    playlist.then((input) => {
        var url = `http://`+window.location.host+`/playlists/delete/${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       if(data != null) {
        alert(`Playlist ${input} was deleted.`)
        getList();
        viewAllPlaylists();
       }  
    }) 
    });
     
}

//Used the POST url from the REST API to send the track to the specified playlist.
function addToPlay() {
    const add = new Promise((resolve,reject) => {
        const num = document.getElementById('trackNumber').value;
        var input = document.getElementById('playlists').value;
        if((num != null) && (input != null)) {
            const select = [num, input]
            resolve(select);
        } else {
            alert("Please choose a playlist name or enter a number!");
        }
        
    });

    add.then((select) => {
        var url = "http://`+window.location.host+`/playlists/create/add"
        const data = {track_id : select[0], PlaylistName : select[1]};
        fetch(url, 
            {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify(data)
            })
    .then(resp => resp.text())
    .then(data => {
       const songs = data;
       console.log(songs);
       if(songs == "Track already exists in playlist or Playlist does not exist.") {
        alert("Track was not added due to playlist not there or track is already on playlist.");
       } else {
        alert("Track has been added to playlist!");
       }
    });
    });
}

//View the songs in a playlist
function viewPlaylist() {
    const table = document.getElementById('display1');
    if(table.innerHTML != " ") {
        table.innerHTML = " ";
    }
    const playlist = new Promise((resolve,reject) => {
        var input = document.getElementById('playlists').value;
        if(input == null) {
            alert("Input invalid, Please select input.")
            return null;
        } else {
            resolve(input);
        }
    });
    let cat = document.createElement('tr'),
         th1 = document.createElement('th'),
         th2 = document.createElement('th'),
         th3 = document.createElement('th'),
         th4 = document.createElement('th'),
         th5 = document.createElement('th');
        th1.innerHTML = "No.";
        th2.innerHTML = "Title";
        th3.innerHTML = "Artist";
        th4.innerHTML ="Album";
        th5.innerHTML = "Duration"
        append(cat, th1,th2,th3,th4,th5);
        append(table,cat);
        
    playlist.then((input) => {
        var url = `http://`+window.location.host+`/playlists/tracks/${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://`+window.location.host+`/api/tracks/${element.track_id}`)
       .then(resp => resp.json())
       .then(data2 => {
        const trackDet = data2;

        let tr = document.createElement('tr'),
            td1 = document.createElement('td');
            td2 = document.createElement('td');
            td3 = document.createElement('td');
            td4 = document.createElement('td');
            td5 = document.createElement('td');
            td1.innerHTML = `${trackDet.track_id}`;
            td2.innerHTML = `${trackDet.track_title}`;
            td3.innerHTML = `${trackDet.artist_name}`;
            td4.innerHTML = `${trackDet.album_title}`;
            td5.innerHTML = `${trackDet.track_duration}`;
            append(tr, td1,td2,td3,td4,td5);
            append(table, tr);
          }
       ); 
       });  
    }) 
    })
}

//View the details of each playlist
function viewAllPlaylists() {
    const table = document.getElementById('display2');
    if(table.innerHTML != " ") {
        table.innerHTML = " ";
    }

    let cat = document.createElement('tr'),
        th1 = document.createElement('th'),
        th2 = document.createElement('th'),
        th3 = document.createElement('th');

        th1.innerHTML = "Playlist Name";
        th2.innerHTML = "Track Count";
        th3.innerHTML = "Total Duration";
        
        append(cat, th1,th2,th3);
        append(table,cat);

        var url = "http://`+window.location.host+`/playlists/info"
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const playlistDet = data;
       
       playlistDet.forEach(element => {
        let tr = document.createElement('tr'),
            td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td');
            
            td1.innerHTML = `${element.PlaylistName}`;
            td2.innerHTML = `${element.trackCount}`;
            td3.innerHTML = `${element.playTime}`;
           
            append(tr, td1,td2,td3);
            append(table, tr);
          }
       ); 
       });    
}