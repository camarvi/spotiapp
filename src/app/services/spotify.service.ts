import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    
    console.log("Spotify Service Listo")
  }


  getQuery( query : string){

      const url =`https://api.spotify.com/v1/${ query }`;
    
      const headers = new HttpHeaders({
        'Authorization':'Bearer BQBBduUC5nielVlrYAe0sJ0aws8ibEKYN5JX-zUD8mPgfuE1EWWy4glsxPAeK4rGIGrf1C0I45sx3SPpzXo'
      });

      return this.http.get(url, { headers})


  }

  getNewReleases() {

   // const headers = new HttpHeaders({
   //   'Authorization':'Bearer BQD68fknUTbfEPFnRQanac2v0BTRL_gSoRa7ZOEQZiw5DDoiSTpbwaRLuNlU7hyHFJYtyneuS6y5xIzD5hk'
   // });

     return this.getQuery('browse/new-releases?limit=20')
       .pipe( map(data => {
          return data['albums'].items;
       })); 

     //return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20',{headers})
     //     .pipe( map(data => {
     //       return data['albums'].items;
     //     }));
       

  }

  getArtista( termino : string ) {

   // const headers = new HttpHeaders({
   //   'Authorization':'Bearer BQD68fknUTbfEPFnRQanac2v0BTRL_gSoRa7ZOEQZiw5DDoiSTpbwaRLuNlU7hyHFJYtyneuS6y5xIzD5hk'
   // });

    //return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`,{headers})
    //        .pipe( map(data=>{
    //            return data['artists'].items;
    //        }));
      
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
        .pipe(map(data=>{
            return data['artists'].items;
        }));


  }
}
