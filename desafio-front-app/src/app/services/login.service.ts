import { API_CONFIG } from './../config/api.config';
import { LoginDTO } from './../models/login.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs'; //IMPORTAÇÃO CORRETA DE OBSERVABLE

@Injectable()
export class LoginService{

    constructor(public http : HttpClient){

    }

    login(obj: LoginDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/api/user/login`, obj);
    }
} 