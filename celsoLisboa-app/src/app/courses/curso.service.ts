import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './curso';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  constructor() {}
}
