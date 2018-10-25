export class Course {
    id: number;
    nome: string;
    inicio: string;
    fim: string;
    salas: [
        {
            id: number;
            sala: string
        }
    ];
    professores: [
        {
            id: number;
            nome: string
        }
    ]
}