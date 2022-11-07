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

function append(parent, ...el) {
    el.forEach(node =>{
        return parent.appendChild(node);
    })
}

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
        var url = `http://localhost:3000/api/tracks?albumName=${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://localhost:3000/api/tracks/${element}`)
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
        var url = `http://localhost:3000/api/tracks?trackTitle=${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://localhost:3000/api/tracks/${element}`)
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
        var url = `http://localhost:3000/api/tracks?artistName=${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://localhost:3000/api/tracks/${element}`)
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

function getList() {
    const drop = document.getElementById('playlists');
    if(drop.innerHTML != " ") {
        drop.innerHTML = " ";
    }
    var url = "http://localhost:3000/playlists/create"
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

function addName() {
    const drop = document.getElementById('playlists');
    if(drop.innerHTML != " ") {
        drop.innerHTML = " ";
    }
    var url = "http://localhost:3000/playlists/create"
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
        var url = `http://localhost:3000/playlists/delete/${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       if(data != null) {
        alert(`Playlist ${input} was deleted.`)
        getList();
       }  
    }) 
    });
     
}

function addToPlay() {
    const drop = document.getElementById('playlists');
    if(drop.innerHTML != " ") {
        drop.innerHTML = " ";
    }
    var url = "http://localhost:3000/playlists/create"
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
        var url = `http://localhost:3000/playlists/tracks/${input}`
        fetch(url)
    .then(resp => resp.json())
    .then(data => {
       const tracks = data;
       tracks.forEach(element => {
       fetch(`http://localhost:3000/api/tracks/${element.track_id}`)
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

        var url = "http://localhost:3000/playlists/info"
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