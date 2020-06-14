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
        'Authorization':'Bearer BQD23FWz7WwAiaELFQPYCobvakuv_qUpYFdH8UwuPAyXdYEoFDRMuMMw8JDluF__Hjvz5L_Sml1QdgKq2YI'
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

  getArtistas( termino : string ) {

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

  getArtista( id : string ) {
   
     return this.getQuery(`artists/${ id }`);
 
   }

  getTopTracks( id : string ) {
   
    return this.getQuery(`artists/${ id }/top-tracks?country=ES`)
        .pipe(map(data=>{
          return data['tracks'];
        }));

  }


}
