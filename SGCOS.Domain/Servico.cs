using System;

namespace SGCOS.Domain
{
    public class Servico
    {
        public int Id { get; set; }
        public string Defeito { get; set; }
        public string ServicosExecutados { get; set; }
        public string PecasSubstituidas { get; set; }
        public string Observacao { get; set; }
        public DateTime DtAtendimento { get; set; }
        public decimal ValorServico { get; set; }
        public bool Status { get; set; }
        public int EquipamentoId { get; set; }
        public Equipamento Equipamento { get; set; }
    }
}