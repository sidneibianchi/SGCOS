import { Servico } from './Servico';

export interface Equipamento {
    id: number;
    nrSerie: string;
    descricao: string;
    marca: string;
    modelo: string;
    clienteId: number;
    servicos: Servico[];
}
