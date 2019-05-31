using System.Collections.Generic;

namespace SGCOS.WebAPI.Dtos
{
    public class EquipamentoDto
    {
        public int Id { get; set; }
        public string NrSerie { get; set; }
        public string Descricao { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public int ClienteId { get; set; }
        public List<ServicoDto> Servicos { get; set; }
    }
}