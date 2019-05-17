import { Mandado } from './Mandado';

export interface Inquerito {
   id: number;
   numeroInquerito: number;
   nomeJuiz: string;
   tribunal: string;
   varaCriminal: string;
   mandados: Mandado[];
}
