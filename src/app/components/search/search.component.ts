import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  term = new FormControl('');
  selectedVideo: any;

  constructor(private search: SearchService) {
    this.search.videoSelected$
      .subscribe(video => {
        this.selectedVideo = video;
      });
  }

  ngOnInit() {
    this.getVideos(this.search.getRandomTerm());
  }

  getVideos(term = '') {
    this.search.searchVideos(term || this.term.value).subscribe((res: unknown) => {
      if (!Array.isArray(res)) {
        this.term.reset();
      }
    });
  }

  openSelectedVideo() {
    this.search.selectItem(this.selectedVideo);
  }
}
