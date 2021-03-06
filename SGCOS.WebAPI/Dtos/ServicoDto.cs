namespace SGCOS.WebAPI.Dtos
{
    public class ServicoDto
    {
        public int Id { get; set; }
        public int NrOrdem { get; set; }
        public string Defeito { get; set; }
        public string ServicosExecutados { get; set; }
        public string PecasSubstituidas { get; set; }
        public string Observacao { get; set; }
        public string DtAtendimento { get; set; }
        public decimal ValorServico { get; set; }
        public int QtdDiasGarantia { get; set; }
        public int EquipamentoId { get; set; }
        public bool Garantia { get; set; }
        
    }
}