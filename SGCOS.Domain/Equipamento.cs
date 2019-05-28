using System;
using System.Collections.Generic;

namespace SGCOS.Domain
{
    public class Equipamento
    {
        public int Id { get; set; }
        public string NrSerie { get; set; }
        public string Descricao { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public List<Servico> Servicos { get; set; }

    }
}