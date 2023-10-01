import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TreeModule} from "../tree/tree.module";
import {FindPathModule} from "../find-path/find-path.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        TreeModule,
        FindPathModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
