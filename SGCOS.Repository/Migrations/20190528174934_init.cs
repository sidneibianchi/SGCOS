using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SGCOS.Repository.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Equipamentos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NrSerie = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(nullable: true),
                    Marca = table.Column<string>(nullable: true),
                    Modelo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipamentos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Servicos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Defeito = table.Column<string>(nullable: true),
                    ServicosExecutados = table.Column<string>(nullable: true),
                    PecasSubstituidas = table.Column<string>(nullable: true),
                    Observacao = table.Column<string>(nullable: true),
                    DtAtendimento = table.Column<DateTime>(nullable: false),
                    ValorServico = table.Column<decimal>(nullable: false),
                    QtdDiasGarantia = table.Column<int>(nullable: false),
                    EquipamentoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servicos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Servicos_Equipamentos_EquipamentoId",
                        column: x => x.EquipamentoId,
                        principalTable: "Equipamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Servicos_EquipamentoId",
                table: "Servicos",
                column: "EquipamentoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Servicos");

            migrationBuilder.DropTable(
                name: "Equipamentos");
        }
    }
}
