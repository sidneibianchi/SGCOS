import { AutoBusca } from './AutoBusca';

export interface Mandado {
    Id: number;
    NumeroMandado: number;
    AlvoId: number;
    EncarregadoId: number;
    EscrivaoId: number;
    AutosBusca: AutoBusca[];
    InqueritoId: number;
}
