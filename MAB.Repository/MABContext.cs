using MAB.Domain;
using  Microsoft.EntityFrameworkCore;

namespace MAB.Repository
{
    public class MABContext : DbContext
    {
        public MABContext(DbContextOptions<MABContext> options) : base(options) { }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Telefone> Telefones { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        
    }
}