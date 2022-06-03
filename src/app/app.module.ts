import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmDefaultModule } from './shared/layouts/adm-default/adm-default.module';
import { AlunoDefaultModule } from './shared/layouts/aluno-default/aluno-default.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AdmDefaultModule,
    AlunoDefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
