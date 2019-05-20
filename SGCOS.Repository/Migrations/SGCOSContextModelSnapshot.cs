﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SGCOS.Repository;

namespace SGCOS.Repository.Migrations
{
    [DbContext(typeof(SGCOSContext))]
    partial class SGCOSContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity("SGCOS.Domain.Chamado", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClienteId");

                    b.Property<DateTime>("Data");

                    b.Property<DateTime>("Hora");

                    b.Property<string>("Observacao");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("Chamados");
                });

            modelBuilder.Entity("SGCOS.Domain.ChamadoEquipamento", b =>
                {
                    b.Property<int>("ChamadoId");

                    b.Property<int>("EquipamentoId");

                    b.HasKey("ChamadoId", "EquipamentoId");

                    b.HasIndex("EquipamentoId");

                    b.ToTable("ChamadosEquipamentos");
                });

            modelBuilder.Entity("SGCOS.Domain.Cliente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Agencia");

                    b.Property<string>("CPF_CNPJ");

                    b.Property<string>("Contato");

                    b.Property<string>("Email");

                    b.Property<int?>("EnderecoId");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.HasIndex("EnderecoId")
                        .IsUnique();

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("SGCOS.Domain.Endereco", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Bairro");

                    b.Property<string>("CEP");

                    b.Property<string>("Cidade");

                    b.Property<string>("Logradouro");

                    b.Property<string>("Numero");

                    b.Property<string>("UF");

                    b.HasKey("Id");

                    b.ToTable("Enderecos");
                });

            modelBuilder.Entity("SGCOS.Domain.Equipamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClienteId");

                    b.Property<string>("Descricao");

                    b.Property<string>("Marca");

                    b.Property<string>("Modelo");

                    b.Property<string>("NrSerie");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("Equipamentos");
                });

            modelBuilder.Entity("SGCOS.Domain.Servico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Defeito");

                    b.Property<DateTime>("DtAtendimento");

                    b.Property<int>("EquipamentoId");

                    b.Property<string>("Observacao");

                    b.Property<string>("PecasSubstituidas");

                    b.Property<string>("ServicosExecutados");

                    b.Property<bool>("Status");

                    b.Property<decimal>("ValorServico");

                    b.HasKey("Id");

                    b.HasIndex("EquipamentoId");

                    b.ToTable("Servicos");
                });

            modelBuilder.Entity("SGCOS.Domain.Telefone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClienteId");

                    b.Property<string>("Numero");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("Telefones");
                });

            modelBuilder.Entity("SGCOS.Domain.Chamado", b =>
                {
                    b.HasOne("SGCOS.Domain.Cliente", "Cliente")
                        .WithMany("Chamados")
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SGCOS.Domain.ChamadoEquipamento", b =>
                {
                    b.HasOne("SGCOS.Domain.Chamado", "Chamado")
                        .WithMany("ChamadosEquipamentos")
                        .HasForeignKey("ChamadoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SGCOS.Domain.Equipamento", "Equipamento")
                        .WithMany("ChamadosEquipamentos")
                        .HasForeignKey("EquipamentoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SGCOS.Domain.Cliente", b =>
                {
                    b.HasOne("SGCOS.Domain.Endereco", "Endereco")
                        .WithOne("Cliente")
                        .HasForeignKey("SGCOS.Domain.Cliente", "EnderecoId");
                });

            modelBuilder.Entity("SGCOS.Domain.Equipamento", b =>
                {
                    b.HasOne("SGCOS.Domain.Cliente", "Cliente")
                        .WithMany("Equipamentos")
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SGCOS.Domain.Servico", b =>
                {
                    b.HasOne("SGCOS.Domain.Equipamento", "Equipamento")
                        .WithMany("Servicos")
                        .HasForeignKey("EquipamentoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SGCOS.Domain.Telefone", b =>
                {
                    b.HasOne("SGCOS.Domain.Cliente")
                        .WithMany("Telefones")
                        .HasForeignKey("ClienteId");
                });
#pragma warning restore 612, 618
        }
    }
}
