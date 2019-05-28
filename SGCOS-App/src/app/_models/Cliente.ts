import { Telefone } from './Telefone';
import { Chamado } from './Chamado';
import { Equipamento } from './Equipamento';
import { Endereco } from './Endereco';

export class Cliente {
   constructor() {
    }

   id: number;
   nome: string;
   cpfCnpj: string;
   contato: string;
   email: string;
   complemento: string;
   endereco: Endereco;
   telefones: Telefone[];
   chamados: Chamado[];
   equipamentos: Equipamento[];
}
