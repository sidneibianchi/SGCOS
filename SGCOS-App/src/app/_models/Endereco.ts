export interface Endereco {
    id: number;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    clienteId?: number;
}
