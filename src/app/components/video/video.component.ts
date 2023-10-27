import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoId: string;

  constructor(private videoService: VideoService, private searchService: SearchService) {
    this.videoId = videoService.video;
  }

  ngOnInit() {
    this.searchService.videoSelected$
      .subscribe(video => {
        this.videoId = video?.id;
        if (this.videoId) {
          this.videoService.play(this.videoId);
        }
      })
    this.searchService.videoToggled$
      .subscribe(videoId => {
        this.videoId = videoId;
      })
  }

  closePlayer() {
    this.searchService.videoSelected$.next(null);
    this.videoService.stop();
  }

  hidePlayer() {
    this.videoId = null;
  }
}
