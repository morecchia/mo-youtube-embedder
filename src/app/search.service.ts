import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  videoList$ = new BehaviorSubject<any[]>([]);
  videoSelected$ = new BehaviorSubject<any>(null);
  selectedItem: any;

  constructor(private http: HttpClient) { }

  searchVideos(keywords: string) {
    return this.http.get<any[]>(`http://localhost:3000?term=${keywords}`)
      .pipe(tap(list => this.videoList$.next(list.filter(i => i.channelTitle))));
  }

  selectItem(video) {
    this.selectedItem = video;
    this.videoSelected$.next(video.id);
  }
}
