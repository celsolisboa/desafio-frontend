import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public sendGetListaProfessores() {
    return this.httpClient.get(this.REST_API_SERVER+'/api/professor');
  }

  public sendGetListaCurso() {
    return this.httpClient.get(this.REST_API_SERVER+'/api/curso/');
  }

  public sendGetCursoPorId(id: number) {
    return this.httpClient.get(this.REST_API_SERVER + '/api/curso/:' + id );
  }

  public sendGetSala() {
    return this.httpClient.get(this.REST_API_SERVER+'/api/sala');
  }

  public sendPostLogin(email: string, password: string) {
    return this.httpClient.post(this.REST_API_SERVER + '/api/user/login', {email: email, password:password});
  }

  public sendPostCurso(param: any) {
    return this.httpClient.post(this.REST_API_SERVER + '/api/curso', param);
  }

  public sendPatchCurso(param: any, id: number) {
    return this.httpClient.patch(this.REST_API_SERVER + '/api/curso/:' + id, param);
  }
  
  public sendDeleteCurso(param: any, id: number) {
    return this.httpClient.patch(this.REST_API_SERVER + '/api/curso/:' + id, param);
  }
}
