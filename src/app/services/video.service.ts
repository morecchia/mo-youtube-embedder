import { Injectable } from '@angular/core';
import YouTubePlayer from 'youtube-player';

const isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  YT: any;
  video: string;
  reframed: boolean = false;
  player: any;

  async play(id: string) {
    const currentVideo = this.video;
    this.video = id;

    if (currentVideo && currentVideo !== id) {
      await this.player.loadVideoById(id);
      return;
    }

    this.player = YouTubePlayer('player', {
      width: '900',
      height: '600',
      videoId: id,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        playsinline: 1,
      },
    });
  }

  async stop() {
    await this.player.stopVideo();
  }
}
