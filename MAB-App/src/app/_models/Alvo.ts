import { Mandado } from './Mandado';

export interface Alvo {
    id: number;
    nome: string;
    visto: string;
    assinatura: string;
    companhia: string;
    batalhao: string;
    postoGraduacaoId: number;
    mandados: Mandado[];
}