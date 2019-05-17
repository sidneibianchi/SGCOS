using System.Collections.Generic;

namespace MAB.Domain
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF_CNPJ { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public string Agencia { get; set; }
        public int? EnderecoId { get; set; }
        public Endereco Endereco { get; set; }
        public List<Telefone> Telefones { get; set; }
    }
}