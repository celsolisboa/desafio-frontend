export interface Curso {
    id: string;
    nome: string;
    inicio: string;
    fim: string;
    salas: Sala[];
    professores: Professor[];
}

export interface Sala {
    id: number;
    sala: string;
}

export interface Professor {
    id: number;
    nome: string;
}