///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../_models/user';


@Injectable()
export class UserService {
    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        const headers = new HttpHeaders({ 'x-access-token': this.authenticationService.token });

        return this.httpClient.get<User[]>('/api/users', { headers: headers });
    }
}
