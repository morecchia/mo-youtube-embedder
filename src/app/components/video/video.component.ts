import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { SearchService } from '../../services/search.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoId: string;
  description: string;
  owner: string;
  hideDescription = true;

  constructor(private videoService: VideoService, private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.videoSelected$
      .pipe(mergeMap(v => this.searchService.getDescription(v)))
      .subscribe(video => {
        console.log(video)
        this.videoId = video?.id;
        this.description = video?.description;
        this.owner = video?.owner;
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
    this.hideDescription = true;
  }

  toggleInfo() {
    this.hideDescription = !this.hideDescription;
  }

  hidePlayer() {
    this.videoId = null;
    this.hideDescription = true;
  }
}
