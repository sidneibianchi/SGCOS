using System.Collections.Generic;

namespace SGCOS.Domain
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF_CNPJ { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public string Agencia { get; set; }
        public Endereco Endereco { get; set; }
        public List<Telefone> Telefones { get; set; }
        public List<Chamado> Chamados { get; set; }
        public List<Equipamento> Equipamentos { get; set; }
        
    }
}