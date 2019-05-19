using System;

namespace SGCOS.Domain
{
    public class Chamado
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public DateTime Hora { get; set; }
        public string Observacao { get; set; }
    }
}