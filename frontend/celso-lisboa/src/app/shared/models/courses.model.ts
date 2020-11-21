
export interface CoursesModel {
  cursos: CourseModel[];
}

export interface CourseModel {
  id: string;
  nome: string;
  inicio: string;
  fim: string;
  salas: Rooms[];
  professores: Teachers[];
}

export interface Rooms {
  id: string;
  sala: string;
}

export interface Teachers {
  id: string;
  nome: string;
}
