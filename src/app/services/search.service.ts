import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  videoList$ = new BehaviorSubject<any[]>([]);
  videoSelected$ = new BehaviorSubject<Video>(null);
  videoToggled$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  searchVideos(keywords: string) {
    const directUrl = this.isUrl(keywords);
    const searchTerm = directUrl ? this.getVideoFromLink(keywords)?.id : keywords;

    if (!searchTerm) {
      return of({});
    }

    return this.http.get<any[]>(`${environment.apiUrl}/search?term=${searchTerm}`)
        .pipe(map(list => {
            let results = {};
            if (directUrl) {
              this.selectItem(list[0]);
            } else {
              this.videoList$.next(list.filter(i => i.channelTitle));
              results = list;
            }
            return results;
          })
        );
  }

  getDescription(video: Video): Observable<any> {
    if (!video) {
      return of({});
    }
    
    return this.http.get<any>(`${environment.apiUrl}/description/${video.id}`)
      .pipe(map(res => {
        return {
          id: video.id,
          owner: video.channelTitle,
          ...res
        }
      }));
  }

  selectItem(video: Video) {
    this.videoSelected$.next(video);
  }

  getRandomTerm(): string {
    const terms = SearchService.termSelection;
    return terms[Math.floor(Math.random() * terms.length)];
  }

  private getVideoFromLink(link: string) {
    const urlParts = link.split('?');
    const urlParams = new URLSearchParams(`?${urlParts[1]}`);
    const id = urlParams.get('v');
    return { id };
  }

  private isUrl(url: string) {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  }

  private static termSelection = [
    'stereolab',
    'broadcast band',
    'the gentle people',
    'aphex twin',
    'autechre',
    'boards of canada',
    'the orb',
    'plaid idm',
    'mouse on mars',
    'lfo idm',
    'seefeel',
    'pan sonic',
    'cabaret voltaire',
    'rrose',
    'katsunori sawa',
    'khruangbin',
    'afx',
    'peder mannerfelt',
    'bogdan raczynski',
    'tolouse low trax',
    'pole dub',
    'tm404',
    'boronko',
    'oneohtrix point never',
    'kiefer',
    'Atom™',
    'kp transmission',
    'fanny kaplan band',
    'hainbach',
    'vladislav delay',
    'run the jewels',
  ];
}
