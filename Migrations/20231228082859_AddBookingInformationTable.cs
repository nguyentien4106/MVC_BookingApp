using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookingApp.Migrations
{
    public partial class AddBookingInformationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "UserImages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BookingInformationId",
                table: "Services",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BookingInformations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CollaboratorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: true),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsVeryfied = table.Column<bool>(type: "bit", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Information = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookingInformations_Collaborators_CollaboratorId",
                        column: x => x.CollaboratorId,
                        principalTable: "Collaborators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Services_BookingInformationId",
                table: "Services",
                column: "BookingInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingInformations_CollaboratorId",
                table: "BookingInformations",
                column: "CollaboratorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_BookingInformations_BookingInformationId",
                table: "Services",
                column: "BookingInformationId",
                principalTable: "BookingInformations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_BookingInformations_BookingInformationId",
                table: "Services");

            migrationBuilder.DropTable(
                name: "BookingInformations");

            migrationBuilder.DropIndex(
                name: "IX_Services_BookingInformationId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "UserImages");

            migrationBuilder.DropColumn(
                name: "BookingInformationId",
                table: "Services");
        }
    }
}
