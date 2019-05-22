import { Equipamento } from './Equipamento';

export interface Chamado {
    id: number;
    data: Date;
    hora: Date;
    observacao: string;
    status: boolean;
    clienteId: number;
    chamadosEquipamentos: Equipamento[];
}
