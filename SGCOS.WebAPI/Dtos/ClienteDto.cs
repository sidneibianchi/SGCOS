using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SGCOS.WebAPI.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }
        
        [Required (ErrorMessage = "Informe o nome do seu cliente.")]
        public string Nome { get; set; }

        [Required (ErrorMessage = "Informe o CPF ou CNPJ do seu cliente.")]
        public string CpfCnpj { get; set; }
        
        [Required(ErrorMessage = "Informe o nome de contato do seu cliente.")]
        public string Contato { get; set; }
        
        [Required (ErrorMessage = "Informe um e-mail para o seu cliente.")]
        [EmailAddress (ErrorMessage = "O email informado, deve ser um e-mail válido.")]
        public string Email { get; set; }
        public List<EnderecoDto> Enderecos { get; set;}
        public List<TelefoneDto> Telefones { get; set;}
        public List<EquipamentoDto> Equipamentos { get; set;}
    }
}