import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
//import { MaterializeModule } from 'angular2-materialize';


import { UserregisterService } from './register/userregister.service';
import { NavbarService } from './navbar/navbar.service';


import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule } from 'ngx-materialize';


import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DashboardComponent } from './dashboard';
import { SinglePostComponent } from './SinglePost';
import { FeedComponent } from './feed';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MzButtonModule,
        MzInputModule,
       // MaterializeModule,
        SweetAlert2Module,
        appRoutingModule
    ],
    providers: [UserregisterService,NavbarService],
    
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FeedComponent,
        SinglePostComponent,
        DashboardComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };