import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DecamelizePipe, WikiPagePipe } from './pipes';
import { WikiLinkComponent } from './wiki-link.component';

@NgModule({
  declarations: [
    AppComponent,
    DecamelizePipe,
    WikiLinkComponent,
    WikiPagePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
