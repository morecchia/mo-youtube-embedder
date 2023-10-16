import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  term = new FormControl('stereolab');

  constructor(private search: SearchService) { }
  
  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.search
      .searchVideos(this.term.value || '')
      .subscribe(res => console.log(res));
  }
}
