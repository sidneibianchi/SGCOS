using System.Collections.Generic;

namespace SGCOS.Domain
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CpfCnpj { get; set; }
        public string Contato { get; set; }
        public string Email { get; set; }
        public List<Endereco> Enderecos { get; set; }
        public List<Telefone> Telefones { get; set; }
        public List<Equipamento> Equipamentos { get; set; }
        
    }
}