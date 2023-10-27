import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { SearchService } from '../../services/search.service';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  term = new FormControl('');
  selectedVideo: Video;

  constructor(private search: SearchService, private videoService: VideoService) {
    this.search.videoSelected$
      .subscribe(video => {
        this.selectedVideo = video;
      });
  }

  ngOnInit() {
    this.getVideos(this.search.getRandomTerm());
  }

  getVideos(term = '') {
    this.search.searchVideos(term || this.term.value)
      .subscribe((res: unknown) => {
        if (!Array.isArray(res)) {
          this.term.reset();
        }
      });
  }

  openSelectedVideo() {
    this.search.videoToggled$.next(this.selectedVideo.id);
  }
}
