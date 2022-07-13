import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InViewDirective } from './directives/in-view.directive';
import { BoxComponent } from './components/box/box.component';
import { BoxLoadingComponent } from './components/box-loading/box-loading.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BoxComponent, BoxLoadingComponent, InViewDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
