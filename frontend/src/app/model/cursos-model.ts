import { Salas } from './salas.model';
import { Professores } from './professores-model';
export class Cursos {
    fim: String
id: String
inicio: String
nome: String
professores: Professores[]
salas: Salas[]
}