import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SearchComponent,
    ListComponent,
    VideoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
