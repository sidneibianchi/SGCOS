namespace SGCOS.WebAPI.Dtos
{
    public class ServicoDto
    {
        public int Id { get; set; }
        public string Defeito { get; set; }
        public string ServicosExecutados { get; set; }
        public string PecasSubstituidas { get; set; }
        public string Observacao { get; set; }
        public string DtAtendimento { get; set; }
        public decimal ValorServico { get; set; }
        public int QtdDiasGarantia { get; set; }
        public EquipamentoDto Equipamento { get; set; }
    }
}