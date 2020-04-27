import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { TablegameComponent } from './components/tablegame/tablegame.component';

const routes: Routes = [
    {path: 'main', component: MessageComponent },
    {path: 'game', component: TablegameComponent },
    {path: '', redirectTo: '/main', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    TablegameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
