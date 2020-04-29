import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { TablegameComponent } from './components/tablegame/tablegame.component';
import { BasicAuthHttpInterceptorService } from 'src/app/service/basic-auth-http-interceptor.service';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { LobbyComponent } from './components/lobby/lobby.component';

const routes: Routes = [
    {path: 'main', component: MessageComponent },
    {path: 'room1', component: TablegameComponent, canActivate:[AuthGuardService] },
    {path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
    {path: 'lobby', component: LobbyComponent, canActivate:[AuthGuardService] },
    {path: '', redirectTo: '/main', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    TablegameComponent,
    LogoutComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
