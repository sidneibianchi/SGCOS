using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MAB.WebAPI.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage="O Campo Nome é obrigatório")]
        public string Nome { get; set; }
        public string Visto { get; set; }
        public string Assinatura { get; set; }
        
        [Required(ErrorMessage="O Campo {0} é obrigatório")]
        public EnderecoDto Endereco { get; }
        public List<TelefoneDto> Telefones { get; set; }
    }
}