import { Telefone } from './Telefone';
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
   endereco: Endereco;
   telefones: Telefone[];
   equipamentos: Equipamento[];
}
