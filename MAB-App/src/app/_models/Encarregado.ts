import { Mandado } from './Mandado';

export interface Encarregado {
    id: number;
    nome: string;
    visto: string;
    assinatura: string;
    postoGraduacaoId: number;
    mandados: Mandado[];
}
