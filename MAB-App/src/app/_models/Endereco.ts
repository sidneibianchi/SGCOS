import { Comodo } from './Comodo';

export interface Endereco {
    Id: number;
    Logradouro: string;
    Numero: string;
    Complemento: string;
    Bairro: string;
    Cidade: string;
    Comodos: Comodo[];
}
