namespace SGCOS.Domain
{
    public class ChamadoEquipamento
    {
        public int ChamadoId { get; set; }
        public Chamado Chamado { get; set; }
        public int EquipamentoId { get; set; }
        public Equipamento Equipamento { get; set; }
    }
}