import { Telefone } from './Telefone';

export interface Cliente {
   id: number;
   nome: string ;
   cPF_CNPJ: string ;
   contato: string ;
   email: string ;
   agencia: string ;
   enderecoId?: number;
   telefones: Telefone[];
}
