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
        public DbSet<Chamado> Chamados { get; set; }
        public DbSet<Equipamento> Equipamentos { get; set; } 
        public DbSet<Servico> Servicos { get; set; }  
        public DbSet<ChamadoEquipamento> ChamadosEquipamentos { get; set; }   

        protected override void OnModelCreating( ModelBuilder modelBuilder){
                modelBuilder.Entity<ChamadoEquipamento>()
                .HasKey(CE => new {CE.ChamadoId, CE.EquipamentoId});
        }      
    }
}