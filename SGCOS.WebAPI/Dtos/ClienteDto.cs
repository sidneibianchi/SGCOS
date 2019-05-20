using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SGCOS.WebAPI.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage="O Campo Nome é obrigatório")]
        public string Nome { get; set; }
        public string CPF_CNPJ { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public string Agencia { get; set; }
        public EnderecoDto Endereco { get; set;}
        public List<TelefoneDto> Telefones { get; set;}
        public List<ChamadoDto> Chamados { get; set;}
        public List<EquipamentoDto> Equipamentos { get; set;}
    }
}