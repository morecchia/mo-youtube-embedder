import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  term = new FormControl('');

  constructor(private search: SearchService) { }
  
  ngOnInit() {
    this.getVideos(this.randomTerm());
  }

  getVideos(term = '') {
    this.search
      .searchVideos(term || this.term.value)
      .subscribe(res => console.log(res));
  }

  private randomTerm(): string {
    const termSelection = [
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
      'cabaret voltaire'
    ];

    return termSelection[Math.floor(Math.random() * termSelection.length)];
  }
}
