import { Injectable } from '@angular/core';

const isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  public YT: any;
  public video: string;
  public reframed: boolean = false;
  public player: any;

  play(id: string) {
    const origVideo = this.video;
    this.video = id;

    if (origVideo && origVideo !== id) {
      this.player.loadVideoById(id);
      return;
    }

    if (window['YT']) {
      this.startVideo();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      width: '900',
      height: '600',
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    if (isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if (!this.player.getCurrentTime || !this.player.getDuration) {
          break;
        }
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }

  cleanTime() {
    return this.player.getCurrentTime
      ? Math.round(this.player.getCurrentTime())
      : 0;
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  stop() {
    if (this.player.pauseVideo) {
      this.player.pauseVideo();
    }
  }
}
