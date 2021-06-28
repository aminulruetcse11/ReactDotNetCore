using Microsoft.EntityFrameworkCore.Migrations;

namespace COREAPI.Migrations
{
    public partial class contactNoaddinemployeetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactNo",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactNo",
                table: "Employees");
        }
    }
}
