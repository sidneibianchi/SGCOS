using System.Collections.Generic;

namespace SGCOS.WebAPI.Dtos
{
    public class ChamadoDto
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public string Hora { get; set; }
        public string Observacao { get; set; }
        public ClienteDto Cliente { get; set; }
        public List<EquipamentoDto> Equipamentos { get; set; }
    }
}