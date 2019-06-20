export class Curso {
    id: number;
    nome: string;
    inicio: string;
    fim: string;
    salas: Array<Sala>;
    professores: Array<Professor>;
}

export interface Professor {
    id: number;
    nome: string;
}

export interface Sala {
    id: number;
    sala: string;
}


