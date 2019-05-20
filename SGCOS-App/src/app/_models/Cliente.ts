import { Telefone } from './Telefone';
import { Chamado } from './Chamado';
import { Equipamento } from './Equipamento';

export interface Cliente {
   id: number;
   nome: string;
   cpF_CNPJ: string;
   contato: string;
   email: string;
   agencia: string;
   telefones: Telefone[];
   chamados: Chamado[];
   equipamentos: Equipamento[];
}
