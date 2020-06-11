import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
 
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista : any = {};
  topTracks : any[] = [];
  loading : boolean;

  constructor(private activatedRoute : ActivatedRoute,
              private spotiservice : SpotifyService) { 
      
      this.loading = true;

      this.activatedRoute.params.subscribe(params =>{
        //console.log(params['id']);
        
        this.getDatosArtista(params['id']);
        this.getTopTracks(params['id']);
      });

  }

  getDatosArtista(id : string){

    this.loading = true; 

      this.spotiservice.getArtista(id)
          .subscribe( data => {
            //console.log(data);
            this.artista = data;
            this.loading = false;
          });
  }

  getTopTracks(id : string){

    this.spotiservice.getTopTracks(id)
      .subscribe( toptracks =>{
        console.log(toptracks);
        this.topTracks = toptracks;
      });

  }

}
