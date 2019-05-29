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
        public int QtdDiasGarantia { get; set; }          
        public int EquipamentoId { get; set; }
        public Equipamento Equipamento { get; }
        public bool Garantia { get {
            
            try
            {
                if (DtAtendimento.AddDays(QtdDiasGarantia) > DateTime.Now)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao verificar a garantia " + ex.Message);
            }
            
        }}
    }
}