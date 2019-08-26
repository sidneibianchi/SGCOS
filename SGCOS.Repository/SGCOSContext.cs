using SGCOS.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SGCOS.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace SGCOS.Repository
{
    public class SGCOSContext : IdentityDbContext<User, Role, int,
                                IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public SGCOSContext(DbContextOptions<SGCOSContext> options) : base(options) { }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Telefone> Telefones { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Equipamento> Equipamentos { get; set; } 
        public DbSet<Servico> Servicos { get; set; } 

        #region 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});
               
                userRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                userRole.HasOne(ur => ur.User)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();

            });

            modelBuilder.Entity<Servico>().Property(Servico => Servico.ValorServico).HasColumnType("decimal(12, 10)");
        }

        #endregion 
     
    }
}