using System;
using System.Collections.Generic;

namespace SGCOS.Domain
{
    public class Chamado
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public DateTime Hora { get; set; }
        public string Observacao { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public List<ChamadoEquipamento> ChamadosEquipamentos { get; set; }
     }
}