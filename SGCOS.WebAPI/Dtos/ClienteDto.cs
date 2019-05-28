using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SGCOS.WebAPI.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CpfCnpj { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public string complemento { get; set; }
        public EnderecoDto Endereco { get; set;}
        public List<TelefoneDto> Telefones { get; set;}
        public List<ChamadoDto> Chamados { get; set;}
        public List<EquipamentoDto> Equipamentos { get; set;}
    }
}