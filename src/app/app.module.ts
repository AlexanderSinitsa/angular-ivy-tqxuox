import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InViewDirective } from './directives/in-view.directive';
import { BoxComponent } from './components/box/box.component';
import { LazyScrollComponent } from './components/lazy-scroll/lazy-scroll.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BoxComponent, LazyScrollComponent, InViewDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
