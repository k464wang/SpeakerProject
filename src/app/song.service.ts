import { SongComponent } from './song/song.component';
import { Injectable, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  sendSongLink = new EventEmitter();
  subsVar: Subscription;
  isSpeaker: boolean;

  currSong: string;

  constructor() {}

  getSong(){
    return this.currSong;
  }

  setSong(name:string){
    this.currSong = name;
  }
  onSongClick(){
    this.sendSongLink.emit();
  }

  setSpeaker(state:boolean){
    this.isSpeaker = state;
  }

  getSpeaker(){
    return this.isSpeaker;
  }
}
