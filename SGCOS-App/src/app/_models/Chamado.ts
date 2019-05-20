import { Equipamento } from './Equipamento';

export interface Chamado {
    id: number; 
    data: Date; 
    hora: Date; 
    observacao: string; 
    clienteId: number; 
    chamadosEquipamentos: Equipamento[]; 
}
