import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './_services/authentication.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {UserService} from './_services/user.service';
import {AuthGuard} from './_guards/auth-guard';
import { routing } from './app.routing';
import {JwtHelper} from 'angular2-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from './_helpers/token-interceptor';
import { RegisterComponent } from './register/register.component';
import { EqualValidator } from './equal-validator.directive';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        EqualValidator
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        JwtHelper,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
