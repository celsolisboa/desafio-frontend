export class Course {
    id: string;
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