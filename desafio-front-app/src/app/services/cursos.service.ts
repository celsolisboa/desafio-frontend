import { API_CONFIG } from './../config/api.config';
import { LoginDTO } from './../models/login.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs'; //IMPORTAÇÃO CORRETA DE OBSERVABLE

@Injectable()
export class CursoService{

    constructor(public http : HttpClient){

    }

    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${API_CONFIG.baseUrl}/api/curso`);
    }
} 