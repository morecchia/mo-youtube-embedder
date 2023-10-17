import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  videos$!: Observable<any[]>;

  constructor(private searchService: SearchService) {
    this.videos$ = this.searchService.videoList$;
  }

  selectVideo(video: any) {
    this.searchService.selectItem(video);
  }
}