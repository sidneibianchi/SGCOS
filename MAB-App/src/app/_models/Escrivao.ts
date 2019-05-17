import { Mandado } from './Mandado';

export interface Escrivao {
    id: number;
    nome: string;
    nvisto: string;
    assinatura: string;
    postoGraduacaoId: number;
    mandados: Mandado[];
}
