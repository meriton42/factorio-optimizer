import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DecamelizePipe, WikiPagePipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    DecamelizePipe,
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
