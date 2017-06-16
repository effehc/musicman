import base64 from 'base-64' ;
import axios from 'axios' ;

const client_id = "0975ec990c44436096effa6c690fd1c9" ;
const client_secret = "bd19dd987abc42cbab65615d6763904c" ;
const auth_url = "https://accounts.spotify.com/api/token" ;

const secret = `${client_id}:${client_secret}` ;
const Authorization = `Basic ${base64.encode(secret)}` ;
const SPOTIFY_API = 'https://api.spotify.com/v1/';

const cfg = {
  headers: {
    "Authorization": Authorization
  }
}

export function authorize (callback) {
  axios.post(auth_url, "grant_type=client_credentials",cfg)
    .then(response => {
      callback({
        headers: {
          Authorization: `Bearer ${response.data.access_token}`
        }
      })
    })
    .catch(error=> {
      console.log(error) ;
    })
}


export function searchArtist(query, credentials, callback) {
  const query_url = `${SPOTIFY_API}search?q=${query}&type=artist&limit=1`;
  axios.get(query_url, credentials)
    .then(response => {
      const artist = response.data.artists.items[0] ;
      const toptracks = `${SPOTIFY_API}artists/${artist.id}/top-tracks?country=US` ;
      axios.get(toptracks, credentials)
        .then(response => {
          callback({artist, tracks: response.data.tracks})
        })
        .catch(error => console.log(error))
    } )
    .catch(error => console.log(error))
}
