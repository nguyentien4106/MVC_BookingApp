using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookingApp.Migrations
{
    public partial class edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServices_BookingInformations_BookingInformationId",
                table: "CollaboratorServices");

            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServices_Collaborators_CollaboratorId",
                table: "CollaboratorServices");

            migrationBuilder.AlterColumn<Guid>(
                name: "CollaboratorId",
                table: "CollaboratorServices",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "BookingInformationId",
                table: "CollaboratorServices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServices_BookingInformations_BookingInformationId",
                table: "CollaboratorServices",
                column: "BookingInformationId",
                principalTable: "BookingInformations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServices_Collaborators_CollaboratorId",
                table: "CollaboratorServices",
                column: "CollaboratorId",
                principalTable: "Collaborators",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServices_BookingInformations_BookingInformationId",
                table: "CollaboratorServices");

            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServices_Collaborators_CollaboratorId",
                table: "CollaboratorServices");

            migrationBuilder.AlterColumn<Guid>(
                name: "CollaboratorId",
                table: "CollaboratorServices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "BookingInformationId",
                table: "CollaboratorServices",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServices_BookingInformations_BookingInformationId",
                table: "CollaboratorServices",
                column: "BookingInformationId",
                principalTable: "BookingInformations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServices_Collaborators_CollaboratorId",
                table: "CollaboratorServices",
                column: "CollaboratorId",
                principalTable: "Collaborators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
