export interface Servico {
    id: number;
    defeito: string;
    servicosExecutados: string;
    pecasSubstituidas: string;
    observacao: string;
    dtAtendimento: Date;
    valorServico: number;
    status: boolean;
    equipamentoId: number;
}
