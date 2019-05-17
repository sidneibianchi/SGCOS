import { Alvo } from './Alvo';
import { Escrivao } from './Escrivao';
import { Encarregado } from './Encarregado';

export interface PostoGraduacao {
    Id: number;
    Descricao: string;
    Alvos: Alvo[];
    Escrivoes: Escrivao[];
    Encarregados: Encarregado[];
}
