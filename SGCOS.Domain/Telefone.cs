namespace SGCOS.Domain
{
    public class Telefone
    {
        public int Id { get; set; }
        public string Numero { get; set; }
        public int Tipo { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; }
    }
}