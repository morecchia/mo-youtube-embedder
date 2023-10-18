import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  videoList$ = new BehaviorSubject<any[]>([]);
  videoSelected$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  searchVideos(keywords: string) {
    if (this.isUrl(keywords)) {
      this.selectItem(this.getIdFromLink(keywords));
      return of({})
    } else {
      return this.http.get<any[]>(`${environment.apiUrl}/search?term=${keywords}`)
        .pipe(tap(list => this.videoList$.next(list.filter(i => i.channelTitle))));
    }
  }

  selectItem(videoId: string) {
    this.videoSelected$.next(videoId);
  }

  private getIdFromLink(link: string) {
    const urlParts = link.split('?');
    const urlParams = new URLSearchParams(`?${urlParts[1]}`);
    return urlParams.get('v');
  }

  private isUrl(url: string) {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  }
}
