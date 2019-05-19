using SGCOS.Domain;
using  Microsoft.EntityFrameworkCore;

namespace SGCOS.Repository
{
    public class SGCOSContext : DbContext
    {
        public SGCOSContext(DbContextOptions<SGCOSContext> options) : base(options) { }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Telefone> Telefones { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        
    }
}