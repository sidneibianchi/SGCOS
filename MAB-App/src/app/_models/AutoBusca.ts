import { Comodo } from './Comodo';
import { Arrecadacao } from './Arrecadacao';
import { Testemunha } from './Testemunha';

export interface AutoBusca {
     id: number;
     data: Date;
     hora: Date;
     incidentes: string;
     fl_FranqueadaVistoria: boolean;
     fl_NecessarioForca: boolean;
     fl_NecessarioArrombamento: boolean;
     fl_HouveResistencia: boolean;
     fl_UnicoVolume: boolean;
     qtdTotalLacres: number;
     nrLacreUnicoVolume: number;
     dataEncerramento: Date;
     horaEncerramento: Date;
     tipoAutoBuscaId: number;
     mandadoId: number;
     enderecoId?: number;
     automovelId?: number;
     comodos: Comodo[];
     arrecadacoes: Arrecadacao[];
     testemunhas: Testemunha[];
}
