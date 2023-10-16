import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../video.service';
import { Serializer } from '@angular/compiler';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoId: string;

  constructor(private videoService: VideoService, private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.videoSelected$
      .subscribe(id => {
        this.videoId = id;
        if (this.videoId) {
          this.videoService.play(this.videoId);
        }
      })
  }

  closePlayer() {
    this.videoId = null;
    this.videoService.stop();
  }
}
