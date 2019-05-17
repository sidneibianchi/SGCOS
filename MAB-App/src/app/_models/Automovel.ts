export interface Automovel {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    cor: string;
    anoFabricacao: Date;
    anoModelo: Date;
    observacao: string;
    fl_PtPassDianteira: boolean;
    fl_PtTrasDireito: boolean;
    fl_PtTrasEsquerdo: boolean;
    fl_PtMotorista: boolean;
    fl_PortaMalas: boolean;
    fl_Motor: boolean;
    fl_AmbienteExterno: boolean;
}
