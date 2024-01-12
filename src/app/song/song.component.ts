import { SongService } from './../song.service';
import { Component, OnInit } from '@angular/core';
import AudioMotionAnalyzer from 'audiomotion-analyzer';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  audioMotion: any;
  constructor(private _songService: SongService) { 
    if(this._songService.subsVar==undefined){
      this._songService.subsVar=this._songService.sendSongLink.subscribe(() =>{
        this.songSelected();
      })
    }
  }

  loadCarve(){
    // audio source
    var audioEl : any;
    audioEl = document.getElementById('audio');
    // instantiate analyzer
    this.audioMotion = new AudioMotionAnalyzer(
      document.getElementById('container')!,
      {
        source: audioEl,
        height: window.innerHeight - 600,
       //  you can set other options below - check the docs!
        mode: 1,
        barSpace: .6,
        showLeds: false,
     }
    );
  }

  ngOnInit(): void {
      this.loadCarve();
  }

  songSelected(){
    var link = this._songService.getSong();
    if(link != null)
      this.playSong(link);
  }

  playSong(link:string){
    var audioEl : any;
    audioEl = document.getElementById('audio');
    audioEl.src = link;
    if(this._songService.getSpeaker() == false)
      audioEl.play();
  }

}
