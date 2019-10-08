import { Servico } from './Servico';

export interface Equipamento {
    id: number;
    nrSerie: string;
    descricao: string;
    marca: string;
    modelo: string;
    imagemURL: string;
    clienteId: number;
    servicos: Servico[];
}
