import { SongService } from './song.service';
import {Component, Pipe} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.css']

})


export class SongListComponent{

    title = "List of songs";
    //songs!: JSON;
    keys : string[] = [];
    selectedSong?: string;
    isSpeaker = false;

    constructor(private httpClient: HttpClient, private _songService:SongService, private router : Router){
        
    }

    PrintSongs (){
        this.httpClient.get('http://192.168.2.59:5000/songs').subscribe(data => {
            console.log(JSON.stringify(data));
            var result = JSON.parse(JSON.stringify(data)) ;
           
            this.keys  = [];
            for (let k in result.songs)
                this.keys.push(result.songs[k].name);

            //this.songs = data  as JSON;
            //console.log(this.songs);
            
            //for (let k in this.songs.["songs"])
            //    this.keys.push(k.toString());
        })


    }
    ngOnInit(): void {
        this.httpClient.get('http://192.168.2.59:5000/switchSpeaker?get=true&value=true').subscribe(data => {
            console.log(JSON.stringify(data));
            var currState = JSON.parse(JSON.stringify(data)) ;
            this.isSpeaker = (currState.state == "false"? false: true);
            this._songService.setSpeaker(this.isSpeaker);
            //this.songs = data  as JSON;
            //console.log(this.songs);
            
            //for (let k in this.songs.["songs"])
            //    this.keys.push(k.toString());
        })
        this.PrintSongs();
        
    }
  
    songComponentLink(name: string){
        this.selectedSong = name;
        this.ChangeSong(name);
        this._songService.onSongClick();
        
        
    }

    ChangeSong(name:string){    
        this._songService.setSong('http://192.168.2.59:5000/playSongs?file='+ name);
        /*
        this.httpClient.get('http://127.0.0.1:5000/playSongs?start=0&file='+ name).subscribe(data => {
            console.log(JSON.stringify(data));
            var result = JSON.parse(JSON.stringify(data));

            alert(result.song[0].name);
        })*/
    }

    reloadComponent(){
        //let currentUrl = this.router.url;
        //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //this.router.onSameUrlNavigation = 'reload';
        //this.router.navigate([currentUrl]);
        this.ngOnInit();
    }

    SpeakerEnable(e:any){
        this.httpClient.get('http://192.168.2.59:5000/switchSpeaker?get=false&value=' + (e.target.checked==true?"true":"false")).subscribe(data => {
            console.log(JSON.stringify(data));
            var currState = JSON.parse(JSON.stringify(data)) ;
            this.isSpeaker = (currState.state == "false"? false: true);
            this._songService.setSpeaker(this.isSpeaker);
            //this.songs = data  as JSON;
            //console.log(this.songs);
            
            //for (let k in this.songs.["songs"])
            //    this.keys.push(k.toString());
        })
    }
    

}