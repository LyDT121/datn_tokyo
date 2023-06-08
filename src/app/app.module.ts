import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoute } from './app.route';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { PrintComponent } from '../print/print.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponentComponent,
    PrintComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule.forRoot(AppRoute,{preloadingStrategy: PreloadAllModules}), SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
