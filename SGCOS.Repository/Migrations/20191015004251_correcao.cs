using Microsoft.EntityFrameworkCore.Migrations;

namespace SGCOS.Repository.Migrations
{
    public partial class correcao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "ValorServico",
                table: "Servicos",
                type: "decimal(12, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12, 10)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "ValorServico",
                table: "Servicos",
                type: "decimal(12, 10)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12, 2)");
        }
    }
}
