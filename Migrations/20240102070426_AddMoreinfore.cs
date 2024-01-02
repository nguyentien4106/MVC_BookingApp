using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookingApp.Migrations
{
    public partial class AddMoreinfore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_BookingInformations_BookingInformationId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_BookingInformationId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BookingInformationId",
                table: "Services");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalInformation",
                table: "CollaboratorServices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BookingInformationId",
                table: "CollaboratorServices",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Prices",
                table: "CollaboratorServices",
                type: "float",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CollaboratorServices_BookingInformationId",
                table: "CollaboratorServices",
                column: "BookingInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServices_BookingInformations_BookingInformationId",
                table: "CollaboratorServices",
                column: "BookingInformationId",
                principalTable: "BookingInformations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServices_BookingInformations_BookingInformationId",
                table: "CollaboratorServices");

            migrationBuilder.DropIndex(
                name: "IX_CollaboratorServices_BookingInformationId",
                table: "CollaboratorServices");

            migrationBuilder.DropColumn(
                name: "AdditionalInformation",
                table: "CollaboratorServices");

            migrationBuilder.DropColumn(
                name: "BookingInformationId",
                table: "CollaboratorServices");

            migrationBuilder.DropColumn(
                name: "Prices",
                table: "CollaboratorServices");

            migrationBuilder.AddColumn<Guid>(
                name: "BookingInformationId",
                table: "Services",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_BookingInformationId",
                table: "Services",
                column: "BookingInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_BookingInformations_BookingInformationId",
                table: "Services",
                column: "BookingInformationId",
                principalTable: "BookingInformations",
                principalColumn: "Id");
        }
    }
}
